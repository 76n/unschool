import { defineSecret } from 'firebase-functions/params';
import { logger } from 'firebase-functions/v2';
import { config } from './config';

export const crmIntakeKey = defineSecret('CRM_INTAKE_KEY');

const TIMEOUT_MS = 5000;

/**
 * Hands a stored lead to the CRM intake API. Resolves to false instead of throwing:
 * the lead is already saved here and the team is notified, so a CRM outage never
 * fails the visitor's request.
 */
export async function forwardToCrm(payload: Record<string, unknown>): Promise<boolean> {
  const key = crmIntakeKey.value();
  if (!config.crmIntakeUrl || !key) return false;

  try {
    const response = await fetch(config.crmIntakeUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (response.ok) return true;
    logger.error('CRM intake rejected the lead', {
      status: response.status,
      body: await response.text(),
    });
  } catch (error) {
    logger.error('CRM intake is unreachable', error);
  }
  return false;
}
