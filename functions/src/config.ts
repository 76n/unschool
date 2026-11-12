// Frankfurt: closest region to the audience, and where the existing
// unschool-cool functions already run.
export const REGION = 'europe-west3';

export const isEmulator = process.env.FUNCTIONS_EMULATOR === 'true';

function env(name: string, fallback = ''): string {
  return process.env[name]?.trim() || fallback;
}

export const config = {
  mailFrom: env('MAIL_FROM', 'Unschool <hello@unschool.cool>'),
  supportEmail: env('SUPPORT_EMAIL', 'hello@unschool.cool'),

  adminEmails: env('ADMIN_EMAILS')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean),

  /** The CRM owns leads, products, coupons and orders; nothing reaches it while empty. */
  crmUrl: env('CRM_URL'),
  crmSchoolId: env('CRM_SCHOOL_ID', 'unschool'),
};
