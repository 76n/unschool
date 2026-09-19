import { logger } from 'firebase-functions/v2';
import { config, isEmulator } from './config';
import { FieldValue, collections } from './firebase';

interface MailInput {
  to: string;
  subject: string;
  text: string;
  html?: string;
  /** Groups messages in the admin view: lead notification, receipt, delivery. */
  kind: 'lead' | 'receipt' | 'delivery';
  relatedId?: string;
}

/**
 * Queues a message for the Firebase "Trigger Email" extension, which writes
 * its delivery state back onto the same document.
 */
export async function queueMail(input: MailInput): Promise<string> {
  const doc = await collections.mail.add({
    to: input.to,
    from: config.mailFrom,
    replyTo: config.supportEmail,
    kind: input.kind,
    relatedId: input.relatedId ?? null,
    createdAt: FieldValue.serverTimestamp(),
    message: {
      subject: input.subject,
      text: input.text,
      html: input.html ?? `<pre style="font: inherit">${escapeHtml(input.text)}</pre>`,
    },
  });

  if (isEmulator) {
    logger.info(`[mail:${input.kind}] to ${input.to} — ${input.subject}\n${input.text}`);
  }

  return doc.id;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
