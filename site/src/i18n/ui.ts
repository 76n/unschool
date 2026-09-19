import { DEFAULT_LANG, type Lang } from './config';
import en from './locales/en.json';
import he from './locales/he.json';
import ru from './locales/ru.json';

export type UiKey = keyof typeof ru;

const dictionaries: Record<Lang, Partial<Record<UiKey, string>>> = { ru, he, en };

/** Looks up a UI string, falling back to Russian and finally to the key itself. */
export function t(lang: Lang, key: UiKey, params?: Record<string, string | number>): string {
  const raw = dictionaries[lang]?.[key] ?? dictionaries[DEFAULT_LANG][key] ?? key;
  if (!params) return raw;
  return raw.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match
  );
}

export function useTranslations(lang: Lang) {
  return (key: UiKey, params?: Record<string, string | number>) => t(lang, key, params);
}
