import { Router } from 'express';
import { logger } from 'firebase-functions/v2';
import { siteBaseUrl } from './config';
import { findProduct, isPurchasable } from './catalog';
import { deliverOrder, type OrderRecord } from './delivery';
import { FieldValue, collections, db } from './firebase';
import { getPaymentProvider } from './payments';
import { mockSignature } from './payments/mock';
import type { OrderStatus } from './payments/provider';
import { clientIp, withinRateLimit } from './rateLimit';
import { asSlug, asString, isEmail, isLang } from './validation';

export const ordersRouter: Router = Router();
export const paymentsRouter: Router = Router();

ordersRouter.post('/', async (req, res) => {
  const body = (req.body ?? {}) as Record<string, unknown>;

  if (asString(body.company)) {
    res.status(400).json({ ok: false, error: 'invalid' });
    return;
  }

  const ip = clientIp(req);
  if (!(await withinRateLimit(`order:${ip}`, 10, 600))) {
    res.status(429).json({ ok: false, error: 'rate_limited' });
    return;
  }

  const lang = isLang(body.lang) ? body.lang : 'ru';
  const slug = asSlug(body.slug);
  const email = asString(body.email, 160);
  const name = asString(body.name, 120);

  if (!slug) {
    res.status(400).json({ ok: false, errors: { slug: 'required' } });
    return;
  }
  if (!isEmail(email)) {
    res.status(400).json({ ok: false, errors: { email: 'invalid' } });
    return;
  }

  const baseUrl = siteBaseUrl(req);

  try {
    const product = await findProduct(baseUrl, slug, lang);
    if (!product) {
      res.status(404).json({ ok: false, error: 'product_not_found' });
      return;
    }
    if (!isPurchasable(product)) {
      res.status(409).json({ ok: false, error: 'not_for_sale' });
      return;
    }

    // Price, title and currency are snapshotted from the server catalogue.
    const orderRef = await collections.orders.add({
      status: 'created' satisfies OrderStatus,
      productSlug: product.slug,
      productType: product.type,
      lang,
      title: product.title,
      price: product.price,
      currency: product.currency,
      storagePath: product.storagePath ?? null,
      email,
      name,
      provider: getPaymentProvider().name,
      isDemoProduct: product.status === 'demo',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    const provider = getPaymentProvider();
    const payment = await provider.createPayment({
      order: {
        id: orderRef.id,
        title: product.title,
        price: product.price,
        currency: product.currency,
        email,
        name,
        lang,
      },
      successUrl: `${baseUrl}/${lang}/order/${orderRef.id}/success/`,
      cancelUrl: `${baseUrl}/${lang}/shop/${product.slug}/`,
      webhookUrl: `${baseUrl}/api/payments/webhook/${provider.name}`,
    });

    await orderRef.update({
      status: 'pending' satisfies OrderStatus,
      providerRef: payment.providerRef,
      updatedAt: FieldValue.serverTimestamp(),
    });

    res.json({ ok: true, orderId: orderRef.id, redirectUrl: payment.redirectUrl });
  } catch (error) {
    logger.error('Failed to create order', error);
    res.status(500).json({ ok: false, error: 'server_error' });
  }
});

ordersRouter.get('/:id', async (req, res) => {
  const snap = await collections.orders.doc(String(req.params.id)).get();
  if (!snap.exists) {
    res.status(404).json({ ok: false, error: 'not_found' });
    return;
  }

  const order = snap.data() as Record<string, unknown>;
  res.setHeader('Cache-Control', 'no-store');
  res.json({
    ok: true,
    order: {
      id: snap.id,
      status: order.status,
      title: order.title,
      price: order.price,
      currency: order.currency,
      productSlug: order.productSlug,
      productType: order.productType,
      hasFile: Boolean(order.storagePath),
      downloadToken: order.status === 'paid' ? (order.lastDownloadToken ?? null) : null,
      emailHint: maskEmail(String(order.email ?? '')),
    },
  });
});

ordersRouter.post('/:id/resend', async (req, res) => {
  const orderId = String(req.params.id);
  const ip = clientIp(req);
  if (!(await withinRateLimit(`resend:${ip}`, 5, 900))) {
    res.status(429).json({ ok: false, error: 'rate_limited' });
    return;
  }

  const snap = await collections.orders.doc(orderId).get();
  const order = snap.data() as (OrderRecord & { status: string }) | undefined;

  if (!snap.exists || !order || order.status !== 'paid') {
    res.status(404).json({ ok: false, error: 'not_found' });
    return;
  }

  try {
    await deliverOrder(orderId, order, siteBaseUrl(req));
    res.json({ ok: true });
  } catch (error) {
    logger.error('Resend failed', error);
    res.status(500).json({ ok: false, error: 'server_error' });
  }
});

/** Applies a verified provider notification exactly once. */
export async function applyWebhook(
  input: {
    orderId: string;
    status: 'paid' | 'failed' | 'cancelled';
    providerRef: string | null;
    eventId: string;
    amount: number | null;
  },
  baseUrl: string
): Promise<'applied' | 'duplicate' | 'not_found' | 'amount_mismatch'> {
  const eventRef = collections.webhookEvents.doc(input.eventId);
  const orderRef = collections.orders.doc(input.orderId);

  const outcome = await db.runTransaction(async (tx) => {
    const [eventSnap, orderSnap] = await Promise.all([tx.get(eventRef), tx.get(orderRef)]);
    if (eventSnap.exists) return 'duplicate' as const;
    if (!orderSnap.exists) return 'not_found' as const;

    const order = orderSnap.data() as { price: number; status: string };

    if (
      input.status === 'paid' &&
      input.amount !== null &&
      Math.abs(input.amount - order.price) > 0.01
    ) {
      tx.set(eventRef, {
        orderId: input.orderId,
        status: 'amount_mismatch',
        amount: input.amount,
        createdAt: FieldValue.serverTimestamp(),
      });
      return 'amount_mismatch' as const;
    }

    tx.set(eventRef, {
      orderId: input.orderId,
      status: input.status,
      providerRef: input.providerRef,
      createdAt: FieldValue.serverTimestamp(),
    });

    // A paid order never goes backwards on a late notification.
    if (order.status === 'paid' && input.status !== 'paid') return 'duplicate' as const;

    tx.update(orderRef, {
      status: input.status,
      providerRef: input.providerRef ?? null,
      updatedAt: FieldValue.serverTimestamp(),
      ...(input.status === 'paid' ? { paidAt: FieldValue.serverTimestamp() } : {}),
    });

    return 'applied' as const;
  });

  if (outcome === 'applied' && input.status === 'paid') {
    const snap = await orderRef.get();
    const order = snap.data() as OrderRecord;
    try {
      await deliverOrder(input.orderId, order, baseUrl);
    } catch (error) {
      logger.error('Delivery failed after payment', error);
      await orderRef.update({ deliveryStatus: 'failed' });
    }
  }

  return outcome;
}

paymentsRouter.post('/webhook/:provider', async (req, res) => {
  const provider = getPaymentProvider();
  if (String(req.params.provider) !== provider.name) {
    res.status(404).json({ ok: false });
    return;
  }

  try {
    const payload = { ...(req.body ?? {}), ...(req.query ?? {}) } as Record<string, unknown>;
    const verified = await provider.verifyWebhook(payload);
    if (!verified) {
      logger.warn('Rejected payment webhook', { provider: provider.name });
      res.status(400).json({ ok: false, error: 'invalid_notification' });
      return;
    }

    const outcome = await applyWebhook(verified, siteBaseUrl(req));
    res.json({ ok: true, outcome });
  } catch (error) {
    logger.error('Webhook handling failed', error);
    res.status(500).json({ ok: false, error: 'server_error' });
  }
});

/**
 * Local payment page used by the mock provider. It mirrors the real flow:
 * the browser never sets the order status, the simulated notification does.
 */
paymentsRouter.get('/mock/:orderId', async (req, res) => {
  if (getPaymentProvider().name !== 'mock') {
    res.status(404).type('text/plain').send('Not found');
    return;
  }

  const orderId = String(req.params.orderId);
  const snap = await collections.orders.doc(orderId).get();
  if (!snap.exists) {
    res.status(404).type('text/plain').send('Order not found');
    return;
  }

  const order = snap.data() as { title: string; price: number; lang: string };
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.type('html').send(mockPaymentPage(orderId, order));
});

paymentsRouter.post('/mock/:orderId/complete', async (req, res) => {
  if (getPaymentProvider().name !== 'mock') {
    res.status(404).type('text/plain').send('Not found');
    return;
  }

  const orderId = String(req.params.orderId);
  const result = String((req.body ?? {}).result ?? 'paid');
  const status = result === 'failed' ? 'failed' : 'paid';

  const snap = await collections.orders.doc(orderId).get();
  if (!snap.exists) {
    res.status(404).type('text/plain').send('Order not found');
    return;
  }

  const order = snap.data() as { lang: string; price: number };
  const baseUrl = siteBaseUrl(req);

  // Simulates the provider's server-to-server call.
  await fetch(`${baseUrl}/api/payments/webhook/mock`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      orderId,
      status,
      amount: order.price,
      eventId: `mock_${orderId}_${status}`,
      signature: mockSignature(orderId, status),
    }),
  });

  res.redirect(303, `${baseUrl}/${order.lang}/order/${orderId}/success/`);
});

function maskEmail(email: string): string {
  const [user, domain] = email.split('@');
  if (!domain) return '';
  const visible = user.slice(0, 2);
  return `${visible}${'*'.repeat(Math.max(user.length - 2, 1))}@${domain}`;
}

function mockPaymentPage(
  orderId: string,
  order: { title: string; price: number; lang: string }
): string {
  const escaped = order.title.replace(/</g, '&lt;');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>Mock payment — Unschool</title>
<style>
  body { font-family: system-ui, sans-serif; background: #fbf7ef; color: #1e1b33; margin: 0;
         display: grid; place-items: center; min-height: 100vh; padding: 1rem; }
  .card { background: #fff; border: 1px solid #e6e1d5; border-radius: 16px; padding: 1.5rem;
          max-width: 24rem; width: 100%; }
  h1 { font-size: 1.25rem; margin: 0 0 .5rem; }
  .warn { background: #fdf3dc; border-radius: 10px; padding: .75rem; font-size: .875rem; }
  .row { display: flex; justify-content: space-between; margin: 1rem 0; font-weight: 600; }
  button { width: 100%; min-height: 3rem; border-radius: 12px; border: 0; font: inherit;
           font-weight: 600; cursor: pointer; margin-top: .5rem; }
  .pay { background: #655c97; color: #fff; }
  .fail { background: #fff; color: #a32b2b; border: 1px solid #d6d0c2; }
</style>
</head>
<body>
  <div class="card">
    <h1>Mock payment page</h1>
    <p class="warn">Simulated provider. No real payment is taken, and this page is never served
    once a real provider is configured.</p>
    <div class="row"><span>${escaped}</span><span>${order.price} ₪</span></div>
    <form method="post" action="/api/payments/mock/${orderId}/complete">
      <button class="pay" name="result" value="paid" type="submit">Pay ${order.price} ₪</button>
      <button class="fail" name="result" value="failed" type="submit">Simulate failure</button>
    </form>
  </div>
</body>
</html>`;
}

export { maskEmail };
