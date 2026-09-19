import { createHmac } from 'node:crypto';
import type {
  CreatePaymentInput,
  CreatePaymentResult,
  PaymentProvider,
  WebhookResult,
} from './provider';

const MOCK_SECRET = process.env.MOCK_PAYMENT_SECRET ?? 'unschool-mock-secret';

export function mockSignature(orderId: string, status: string): string {
  return createHmac('sha256', MOCK_SECRET)
    .update(`${orderId}:${status}`)
    .digest('hex')
    .slice(0, 32);
}

/**
 * Stands in for the real provider until Grow credentials exist. It follows the
 * same shape: the browser is redirected to a payment page, and the order only
 * becomes paid through a server-to-server notification.
 */
export class MockProvider implements PaymentProvider {
  readonly name = 'mock';

  async createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    const url = new URL(input.webhookUrl);
    url.pathname = `/api/payments/mock/${input.order.id}`;
    url.search = '';
    return { redirectUrl: url.toString(), providerRef: `mock_${input.order.id}` };
  }

  async verifyWebhook(payload: Record<string, unknown>): Promise<WebhookResult | null> {
    const orderId = String(payload.orderId ?? '');
    const status = String(payload.status ?? '');
    const signature = String(payload.signature ?? '');

    if (!orderId || !['paid', 'failed', 'cancelled'].includes(status)) return null;
    if (signature !== mockSignature(orderId, status)) return null;

    return {
      orderId,
      status: status as WebhookResult['status'],
      providerRef: `mock_${orderId}`,
      eventId: String(payload.eventId ?? `mock_${orderId}_${status}`),
      amount: payload.amount === undefined ? null : Number(payload.amount),
    };
  }
}
