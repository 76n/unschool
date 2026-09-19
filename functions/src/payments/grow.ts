import { config } from '../config';
import type {
  CreatePaymentInput,
  CreatePaymentResult,
  PaymentProvider,
  WebhookResult,
} from './provider';

const ENDPOINT = {
  live: 'https://secure.meshulam.co.il/api/light/server/1.0',
  sandbox: 'https://sandbox.meshulam.co.il/api/light/server/1.0',
};

/**
 * Grow (Meshulam) light server API. Enabled only once credentials are set, so
 * production never falls back to a simulated payment.
 */
export class GrowProvider implements PaymentProvider {
  readonly name = 'grow';

  private get baseUrl(): string {
    return config.grow.sandbox ? ENDPOINT.sandbox : ENDPOINT.live;
  }

  static isConfigured(): boolean {
    return Boolean(config.grow.userId && config.grow.pageCode && config.grow.apiKey);
  }

  async createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    if (!GrowProvider.isConfigured()) {
      throw new Error('Grow credentials are missing');
    }

    const body = new URLSearchParams({
      pageCode: config.grow.pageCode,
      userId: config.grow.userId,
      apiKey: config.grow.apiKey,
      sum: input.order.price.toFixed(2),
      successUrl: input.successUrl,
      cancelUrl: input.cancelUrl,
      description: input.order.title,
      pageField: JSON.stringify({
        fullName: input.order.name,
        email: input.order.email,
      }),
      cField1: input.order.id,
      notifyUrl: input.webhookUrl,
    });

    const response = await fetch(`${this.baseUrl}/createPaymentProcess`, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    });

    const payload = (await response.json()) as {
      status?: number;
      data?: { url?: string; processId?: string | number; processToken?: string };
      err?: { message?: string };
    };

    if (payload.status !== 1 || !payload.data?.url) {
      throw new Error(payload.err?.message ?? 'Grow rejected the payment request');
    }

    return {
      redirectUrl: payload.data.url,
      providerRef: String(payload.data.processId ?? payload.data.processToken ?? ''),
    };
  }

  async verifyWebhook(payload: Record<string, unknown>): Promise<WebhookResult | null> {
    const orderId = String(payload.cField1 ?? payload.customFields ?? '');
    const processId = String(payload.processId ?? '');
    const transactionId = String(payload.transactionId ?? payload.asmachta ?? '');
    if (!orderId || !processId) return null;

    // Ask Grow directly rather than trusting the posted status.
    const body = new URLSearchParams({
      pageCode: config.grow.pageCode,
      userId: config.grow.userId,
      apiKey: config.grow.apiKey,
      processId,
      processToken: String(payload.processToken ?? ''),
    });

    const response = await fetch(`${this.baseUrl}/approveTransaction`, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    });

    const result = (await response.json()) as {
      status?: number;
      data?: { statusCode?: string | number; sum?: string | number };
    };

    const approved = result.status === 1 && String(result.data?.statusCode ?? '') === '2';

    return {
      orderId,
      status: approved ? 'paid' : 'failed',
      providerRef: transactionId || processId,
      eventId: `grow_${processId}_${transactionId || 'none'}`,
      amount: result.data?.sum === undefined ? null : Number(result.data.sum),
    };
  }
}
