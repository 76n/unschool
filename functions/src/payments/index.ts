import { config } from '../config';
import { GrowProvider } from './grow';
import { MockProvider } from './mock';
import type { PaymentProvider } from './provider';

let provider: PaymentProvider | null = null;

export function getPaymentProvider(): PaymentProvider {
  if (provider) return provider;

  if (config.paymentProvider === 'grow') {
    if (!GrowProvider.isConfigured()) {
      throw new Error('PAYMENT_PROVIDER is "grow" but Grow credentials are missing');
    }
    provider = new GrowProvider();
  } else {
    provider = new MockProvider();
  }

  return provider;
}

export function isMockProvider(): boolean {
  return getPaymentProvider().name === 'mock';
}
