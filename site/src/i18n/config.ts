export const LANGS = ['ru', 'he', 'en'] as const;

export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = 'ru';

const RTL_LANGS = new Set<Lang>(['he']);

export const LANG_SHORT_LABEL: Record<Lang, string> = {
  ru: 'RU',
  he: 'HE',
  en: 'EN',
};

export const LANG_NAME: Record<Lang, string> = {
  ru: 'Русский',
  he: 'עברית',
  en: 'English',
};

export const OG_LOCALE: Record<Lang, string> = {
  ru: 'ru_RU',
  he: 'he_IL',
  en: 'en_US',
};

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (LANGS as readonly string[]).includes(value);
}

export function dirOf(lang: Lang): 'rtl' | 'ltr' {
  return RTL_LANGS.has(lang) ? 'rtl' : 'ltr';
}

export function isRtl(lang: Lang): boolean {
  return RTL_LANGS.has(lang);
}

export function langParams() {
  return LANGS.map((lang) => ({ params: { lang } }));
}
