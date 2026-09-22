import type { Lang } from '~/i18n/config';

const LOCALE: Record<Lang, string> = {
  ru: 'ru-IL',
  he: 'he-IL',
  en: 'en-IL',
};

export function formatPrice(lang: Lang, amount: number): string {
  return new Intl.NumberFormat(LOCALE[lang], {
    style: 'currency',
    currency: 'ILS',
    maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount);
}

export function formatDate(lang: Lang, iso: string): string {
  return new Intl.DateTimeFormat(LOCALE[lang], { dateStyle: 'long' }).format(new Date(iso));
}
