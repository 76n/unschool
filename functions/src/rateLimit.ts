import { FieldValue, collections } from './firebase';

/**
 * Fixed-window counter in Firestore. Enough to stop scripted spam without
 * adding another service.
 */
export async function withinRateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<boolean> {
  const windowStart = Math.floor(Date.now() / (windowSeconds * 1000));
  const docId = `${key}:${windowStart}`.replace(/\//g, '_');
  const ref = collections.rateLimits.doc(docId);

  return collections.rateLimits.firestore.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const count = (snap.data()?.count as number | undefined) ?? 0;
    if (count >= limit) return false;

    tx.set(
      ref,
      {
        count: FieldValue.increment(1),
        expiresAt: new Date((windowStart + 1) * windowSeconds * 1000),
      },
      { merge: true }
    );
    return true;
  });
}

export function clientIp(req: { ip?: string; get(name: string): string | undefined }): string {
  const forwarded = req.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.ip ?? 'unknown';
}
