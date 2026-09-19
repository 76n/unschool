import { randomBytes } from 'node:crypto';
import { Router } from 'express';
import { logger } from 'firebase-functions/v2';
import { config } from './config';
import { FieldValue, Timestamp, bucket, collections } from './firebase';
import { ORDER_DELIVERY, formatIls } from './emails';
import { queueMail } from './mail';
import { isLang, type Lang } from './validation';

export interface OrderRecord {
  lang: string;
  title: string;
  price: number;
  currency: string;
  email: string;
  storagePath?: string | null;
  productType?: string;
}

async function issueDownloadToken(orderId: string): Promise<string> {
  const token = randomBytes(24).toString('hex');
  const expiresAt = Timestamp.fromMillis(Date.now() + config.downloadTtlMinutes * 60_000);

  await collections.downloads.doc(token).set({
    orderId,
    expiresAt,
    downloads: 0,
    createdAt: FieldValue.serverTimestamp(),
  });

  return token;
}

/**
 * Creates a fresh time-limited link and emails it. Used both after payment and
 * when the buyer or an administrator asks for the email again.
 */
export async function deliverOrder(
  orderId: string,
  order: OrderRecord,
  baseUrl: string
): Promise<{ token: string | null; mailId: string }> {
  const lang: Lang = isLang(order.lang) ? order.lang : 'ru';
  const copy = ORDER_DELIVERY[lang];

  let token: string | null = null;
  let link = `${baseUrl}/${lang}/order/${orderId}/success/`;

  if (order.storagePath) {
    token = await issueDownloadToken(orderId);
    link = `${baseUrl}/api/download/${token}`;
  }

  const mailId = await queueMail({
    to: order.email,
    subject: copy.subject(order.title),
    text: copy.body({
      title: order.title,
      price: formatIls(order.price),
      link,
      orderId,
    }),
    kind: 'delivery',
    relatedId: orderId,
  });

  await collections.orders.doc(orderId).update({
    deliveredAt: FieldValue.serverTimestamp(),
    deliveryMailId: mailId,
    deliveryStatus: 'sent',
    lastDownloadToken: token,
  });

  return { token, mailId };
}

export const downloadRouter: Router = Router();

downloadRouter.get('/:token', async (req, res) => {
  const token = String(req.params.token ?? '');
  const snap = await collections.downloads.doc(token).get();

  if (!snap.exists) {
    res.status(404).type('text/plain').send('This download link is not valid.');
    return;
  }

  const data = snap.data() as { orderId: string; expiresAt: Timestamp };
  if (data.expiresAt.toMillis() < Date.now()) {
    res
      .status(410)
      .type('text/plain')
      .send('This download link has expired. Please request a new email.');
    return;
  }

  const orderSnap = await collections.orders.doc(data.orderId).get();
  const order = orderSnap.data() as (OrderRecord & { status: string }) | undefined;

  if (!order || order.status !== 'paid' || !order.storagePath) {
    res.status(403).type('text/plain').send('This order does not have a downloadable file.');
    return;
  }

  try {
    const file = bucket.file(order.storagePath);
    const [exists] = await file.exists();
    if (!exists) {
      logger.error(`Missing storage object for order ${data.orderId}: ${order.storagePath}`);
      res.status(404).type('text/plain').send('The file is not available. Please contact support.');
      return;
    }

    await collections.downloads.doc(token).update({
      downloads: FieldValue.increment(1),
      lastDownloadAt: FieldValue.serverTimestamp(),
    });

    const filename = order.storagePath.split('/').pop() ?? 'unschool-material';
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Cache-Control', 'private, no-store');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');

    file
      .createReadStream()
      .on('error', (error) => {
        logger.error('Download stream failed', error);
        res.destroy();
      })
      .pipe(res);
  } catch (error) {
    logger.error('Download failed', error);
    res.status(500).type('text/plain').send('Download failed. Please contact support.');
  }
});
