import express from 'express';
import { onRequest } from 'firebase-functions/v2/https';
import { setGlobalOptions } from 'firebase-functions/v2';
import { REGION } from './config';
import { adminRouter } from './admin';
import { downloadRouter } from './delivery';
import { leadsRouter } from './leads';
import { ordersRouter, paymentsRouter } from './orders';

setGlobalOptions({ region: REGION, maxInstances: 10 });

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '64kb' }));
app.use(express.urlencoded({ extended: false, limit: '64kb' }));

app.use('/api/leads', leadsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/download', downloadRouter);
app.use('/api/admin', adminRouter);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use((_req, res) => {
  res.status(404).json({ ok: false, error: 'not_found' });
});

export const api = onRequest(app);

const SUPPORTED = ['he', 'ru', 'en'] as const;
const DEFAULT_LANG = 'ru';

/** Sends "/" to the visitor's language, falling back to Russian. */
export const rootRedirect = onRequest((req, res) => {
  const header = req.get('accept-language') ?? '';

  const preferred = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { tag: tag.toLowerCase().split('-')[0], q: q ? Number(q) : 1 };
    })
    .filter((entry) => entry.tag)
    .sort((a, b) => b.q - a.q)
    .find((entry) => (SUPPORTED as readonly string[]).includes(entry.tag));

  const lang = preferred?.tag ?? DEFAULT_LANG;

  res.setHeader('Cache-Control', 'private, max-age=0, must-revalidate');
  res.setHeader('Vary', 'Accept-Language');
  res.redirect(302, `/${lang}/`);
});
