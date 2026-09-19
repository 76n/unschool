// Frankfurt: closest region to the audience, and where the existing
// unschool-cool functions already run.
export const REGION = 'europe-west3';

export const isEmulator = process.env.FUNCTIONS_EMULATOR === 'true';

function env(name: string, fallback = ''): string {
  return process.env[name]?.trim() || fallback;
}

function flag(name: string, fallback = false): boolean {
  const value = env(name);
  if (!value) return fallback;
  return ['1', 'true', 'yes'].includes(value.toLowerCase());
}

export const config = {
  /** Where diagnostic requests are delivered. */
  schoolEmail: env('SCHOOL_EMAIL', 'hello@unschool.cool'),
  mailFrom: env('MAIL_FROM', 'Unschool <hello@unschool.cool>'),
  supportEmail: env('SUPPORT_EMAIL', 'hello@unschool.cool'),

  /** "mock" until Grow credentials are in place. */
  paymentProvider: env('PAYMENT_PROVIDER', 'mock'),

  grow: {
    userId: env('GROW_USER_ID'),
    pageCode: env('GROW_PAGE_CODE'),
    apiKey: env('GROW_API_KEY'),
    sandbox: flag('GROW_SANDBOX', true),
  },

  /** Demo products are never purchasable in production. */
  allowDemoOrders: flag('ALLOW_DEMO_ORDERS', isEmulator),

  adminEmails: env('ADMIN_EMAILS')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean),

  downloadTtlMinutes: Number(env('DOWNLOAD_TTL_MINUTES', '4320')),
  catalogCacheSeconds: Number(env('CATALOG_CACHE_SECONDS', '60')),
};

export function siteBaseUrl(req: { protocol: string; get(name: string): string | undefined }) {
  const host = req.get('x-forwarded-host') ?? req.get('host') ?? 'unschool.cool';
  const protocol = host.startsWith('127.0.0.1') || host.startsWith('localhost') ? 'http' : 'https';
  return `${protocol}://${host}`;
}
