import { Router, type Response } from 'express';
import { logger } from 'firebase-functions/v2';
import { crmIntakeKey } from './crm';
import { config } from './config';
import { clientIp, withinRateLimit } from './rateLimit';
import { asSlug, asString } from './validation';

const TIMEOUT_MS = 15000;
const TOKEN_RE = /^[A-Za-z0-9_-]{24,64}$/;

export const shopRouter: Router = Router();

/** Coupon codes are upper case in the CRM; visitors may type them in any case. */
export const asCoupon = (value: unknown) => asString(value, 40).toUpperCase() || null;

async function callCrm(res: Response, path: string, body?: unknown) {
  const key = crmIntakeKey.value();
  if (!config.crmUrl || !key) {
    res.status(503).json({ ok: false, error: 'unavailable' });
    return;
  }
  try {
    const response = await fetch(`${config.crmUrl}/api/shop/${config.crmSchoolId}${path}`, {
      method: body === undefined ? 'GET' : 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const result = (await response.json().catch(() => ({}))) as Record<string, unknown>;
    if (response.status >= 500) logger.error('CRM shop failed', { path, status: response.status });
    res.setHeader('Cache-Control', 'no-store');
    res.status(response.status).json({ ok: response.ok, ...result });
  } catch (error) {
    logger.error('CRM shop is unreachable', error);
    res.status(502).json({ ok: false, error: 'unavailable' });
  }
}

const limited = async (res: Response, key: string, limit: number) => {
  if (await withinRateLimit(key, limit, 600)) return false;
  res.status(429).json({ ok: false, error: 'rate_limited' });
  return true;
};

shopRouter.post('/quote', async (req, res) => {
  const body = (req.body ?? {}) as Record<string, unknown>;
  if (await limited(res, `quote:${clientIp(req)}`, 60)) return;
  await callCrm(res, '/quote', {
    productId: asSlug(body.productId),
    coupon: asCoupon(body.coupon),
  });
});

shopRouter.post('/coupons/check', async (req, res) => {
  const body = (req.body ?? {}) as Record<string, unknown>;
  if (await limited(res, `coupon:${clientIp(req)}`, 30)) return;
  await callCrm(res, '/coupons/check', { code: asCoupon(body.code) ?? '' });
});

shopRouter.post('/orders', async (req, res) => {
  const body = (req.body ?? {}) as Record<string, unknown>;
  if (asString(body.company)) {
    res.status(400).json({ ok: false, error: 'shop.invalid' });
    return;
  }
  if (await limited(res, `order:${clientIp(req)}`, 10)) return;
  const buyer = (body.buyer ?? {}) as Record<string, unknown>;
  const utm = (body.utm ?? {}) as Record<string, unknown>;
  await callCrm(res, '/orders', {
    productId: asSlug(body.productId),
    coupon: asCoupon(body.coupon),
    locale: asString(body.locale, 2),
    buyer: {
      firstName: asString(buyer.firstName, 60),
      lastName: asString(buyer.lastName, 60),
      phone: asString(buyer.phone, 40),
      country: asString(buyer.country, 2) || null,
      email: asString(buyer.email, 120),
    },
    method: asString(body.method, 10) || null,
    acceptTerms: body.acceptTerms === true,
    marketing: body.marketing === true,
    childName: asString(body.childName, 120),
    utm: Object.fromEntries(
      Object.entries(utm)
        .map(([name, value]) => [name, asString(value, 120)])
        .filter(([, value]) => value)
    ),
    returnUrl: asString(body.returnUrl, 300),
  });
});

shopRouter.get('/orders/:token', async (req, res) => {
  const token = String(req.params.token);
  if (!TOKEN_RE.test(token)) {
    res.status(404).json({ ok: false, error: 'shop.orderNotFound' });
    return;
  }
  await callCrm(res, `/orders/${token}`);
});

shopRouter.post('/orders/:token/resend', async (req, res) => {
  const token = String(req.params.token);
  if (!TOKEN_RE.test(token)) {
    res.status(404).json({ ok: false, error: 'shop.orderNotFound' });
    return;
  }
  if (await limited(res, `resend:${clientIp(req)}`, 5)) return;
  await callCrm(res, `/orders/${token}/resend`, {});
});
