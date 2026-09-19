export type OrderStatus = 'created' | 'pending' | 'paid' | 'failed' | 'cancelled' | 'refunded';

export interface PaymentOrder {
  id: string;
  title: string;
  price: number;
  currency: 'ILS';
  email: string;
  name: string;
  lang: string;
}

export interface CreatePaymentInput {
  order: PaymentOrder;
  successUrl: string;
  cancelUrl: string;
  webhookUrl: string;
}

export interface CreatePaymentResult {
  redirectUrl: string;
  providerRef: string | null;
}

export interface WebhookResult {
  orderId: string;
  status: Extract<OrderStatus, 'paid' | 'failed' | 'cancelled'>;
  providerRef: string | null;
  /** Used to make repeated notifications idempotent. */
  eventId: string;
  amount: number | null;
}

export interface PaymentProvider {
  readonly name: string;
  createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult>;
  /** Returns null when the payload cannot be trusted. */
  verifyWebhook(payload: Record<string, unknown>): Promise<WebhookResult | null>;
}
