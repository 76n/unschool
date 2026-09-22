import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';
import { DEFAULT_LANG, LANGS, type Lang } from '~/i18n/config';

type LocalizedKey = 'subjects' | 'stages' | 'programs' | 'teachers' | 'products' | 'pages';

/** Order in which a missing translation is replaced by a published one. */
const FALLBACK_ORDER: Lang[] = [DEFAULT_LANG, 'en', 'he'];

export type Localized<C extends LocalizedKey> = {
  entry: CollectionEntry<C>;
  isFallback: boolean;
  sourceLang: Lang;
};

async function published<C extends LocalizedKey>(collection: C) {
  return (await getCollection(collection)).filter(
    (entry) => (entry.data as { published: boolean }).published !== false
  );
}

export async function listByLang<C extends LocalizedKey>(
  collection: C,
  lang: Lang
): Promise<CollectionEntry<C>[]> {
  const entries = await published(collection);
  return entries.filter((entry) => (entry.data as { lang: Lang }).lang === lang);
}

/** Every slug that exists in at least one language, so all routes are generated. */
export async function listSlugs<C extends LocalizedKey>(collection: C): Promise<string[]> {
  const entries = await published(collection);
  return [...new Set(entries.map((entry) => (entry.data as { slug: string }).slug))];
}

export async function findLocalized<C extends LocalizedKey>(
  collection: C,
  lang: Lang,
  slug: string
): Promise<Localized<C> | null> {
  const entries = await published(collection);
  const bySlug = entries.filter((entry) => (entry.data as { slug: string }).slug === slug);
  if (bySlug.length === 0) return null;

  const exact = bySlug.find((entry) => (entry.data as { lang: Lang }).lang === lang);
  if (exact) return { entry: exact, isFallback: false, sourceLang: lang };

  for (const candidate of [...FALLBACK_ORDER, ...LANGS]) {
    const match = bySlug.find((entry) => (entry.data as { lang: Lang }).lang === candidate);
    if (match) return { entry: match, isFallback: true, sourceLang: candidate };
  }
  return null;
}

/** Languages in which a slug is genuinely published, used for hreflang. */
export async function translatedLangs<C extends LocalizedKey>(
  collection: C,
  slug: string
): Promise<Lang[]> {
  const entries = await published(collection);
  return entries
    .filter((entry) => (entry.data as { slug: string }).slug === slug)
    .map((entry) => (entry.data as { lang: Lang }).lang);
}

export async function listFaq(lang: Lang) {
  const entries = await getCollection('faq');
  return entries
    .filter((entry) => entry.data.lang === lang)
    .sort((a, b) => a.data.order - b.data.order);
}

export function sortByOrder<T extends { data: { order: number; title?: string; name?: string } }>(
  entries: T[]
): T[] {
  return [...entries].sort((a, b) => a.data.order - b.data.order);
}

export type AnyCollection = CollectionKey;
