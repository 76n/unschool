export const LANGS = ['ru', 'he', 'en'] as const;
export type Lang = (typeof LANGS)[number];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const PHONE_RE = /^[+]?[\d\s()-]{7,20}$/;

export function asString(value: unknown, max = 500): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

/** Normalises a multi-select field, which arrives as an array of labels. */
export function asStringList(value: unknown, maxItems = 10, maxLength = 120): string[] {
  const items = Array.isArray(value) ? value : [value];
  return items
    .map((item) => asString(item, maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

export function isEmail(value: string): boolean {
  return EMAIL_RE.test(value);
}

export function isPhone(value: string): boolean {
  return PHONE_RE.test(value);
}

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (LANGS as readonly string[]).includes(value);
}

/** Strips characters that could break out of a slug path. */
export function asSlug(value: unknown): string {
  return asString(value, 120).replace(/[^a-z0-9-]/gi, '');
}

export class ValidationError extends Error {
  constructor(
    message: string,
    readonly field?: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}
