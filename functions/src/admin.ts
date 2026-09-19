import { Router, type NextFunction, type Request, type Response } from 'express';
import { logger } from 'firebase-functions/v2';
import { config, siteBaseUrl } from './config';
import { deliverOrder, type OrderRecord } from './delivery';
import { FieldValue, auth, collections } from './firebase';

export const adminRouter: Router = Router();

interface AdminRequest extends Request {
  adminEmail?: string;
}

async function requireAdmin(req: AdminRequest, res: Response, next: NextFunction): Promise<void> {
  const header = req.get('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';

  if (!token) {
    res.status(401).json({ ok: false, error: 'unauthorized' });
    return;
  }

  try {
    const decoded = await auth.verifyIdToken(token);
    const email = (decoded.email ?? '').toLowerCase();

    if (!email || !config.adminEmails.includes(email)) {
      res.status(403).json({ ok: false, error: 'forbidden' });
      return;
    }

    req.adminEmail = email;
    next();
  } catch (error) {
    logger.warn('Admin token rejected', error);
    res.status(401).json({ ok: false, error: 'unauthorized' });
  }
}

adminRouter.use(requireAdmin);

adminRouter.get('/session', (req: AdminRequest, res) => {
  res.json({ ok: true, email: req.adminEmail });
});

adminRouter.get('/leads', async (_req, res) => {
  const snap = await collections.leads.orderBy('createdAt', 'desc').limit(100).get();
  res.setHeader('Cache-Control', 'no-store');
  res.json({
    ok: true,
    leads: snap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        createdAt: toIso(data.createdAt),
        lang: data.lang,
        subject: data.subject,
        grade: data.grade,
        goal: data.goal,
        teachingLanguage: data.teachingLanguage,
        parentName: data.parentName,
        contact: data.contact,
        contactMethod: data.contactMethod,
        notes: data.notes,
        handled: Boolean(data.handled),
      };
    }),
  });
});

adminRouter.post('/leads/:id/handled', async (req, res) => {
  const handled = Boolean((req.body ?? {}).handled ?? true);
  await collections.leads.doc(String(req.params.id)).update({
    handled,
    handledAt: handled ? FieldValue.serverTimestamp() : null,
  });
  res.json({ ok: true });
});

adminRouter.get('/orders', async (_req, res) => {
  const snap = await collections.orders.orderBy('createdAt', 'desc').limit(100).get();
  res.setHeader('Cache-Control', 'no-store');
  res.json({
    ok: true,
    orders: snap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        createdAt: toIso(data.createdAt),
        paidAt: toIso(data.paidAt),
        status: data.status,
        title: data.title,
        price: data.price,
        currency: data.currency,
        productSlug: data.productSlug,
        email: data.email,
        provider: data.provider,
        providerRef: data.providerRef ?? null,
        deliveryStatus: data.deliveryStatus ?? null,
        isDemoProduct: Boolean(data.isDemoProduct),
      };
    }),
  });
});

adminRouter.post('/orders/:id/resend', async (req, res) => {
  const orderId = String(req.params.id);
  const snap = await collections.orders.doc(orderId).get();
  const order = snap.data() as (OrderRecord & { status: string }) | undefined;

  if (!order || order.status !== 'paid') {
    res.status(404).json({ ok: false, error: 'not_found' });
    return;
  }

  try {
    await deliverOrder(orderId, order, siteBaseUrl(req));
    res.json({ ok: true });
  } catch (error) {
    logger.error('Admin resend failed', error);
    res.status(500).json({ ok: false, error: 'server_error' });
  }
});

adminRouter.get('/mail', async (_req, res) => {
  const snap = await collections.mail.orderBy('createdAt', 'desc').limit(50).get();
  res.setHeader('Cache-Control', 'no-store');
  res.json({
    ok: true,
    mail: snap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        createdAt: toIso(data.createdAt),
        to: data.to,
        kind: data.kind,
        relatedId: data.relatedId ?? null,
        subject: data.message?.subject ?? '',
        // Written back by the Trigger Email extension.
        state: data.delivery?.state ?? 'queued',
        error: data.delivery?.error ?? null,
      };
    }),
  });
});

function toIso(value: unknown): string | null {
  if (value && typeof value === 'object' && 'toDate' in value) {
    return (value as { toDate(): Date }).toDate().toISOString();
  }
  return null;
}
