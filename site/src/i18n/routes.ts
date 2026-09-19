import type { Lang } from './config';

/** Builds a trailing-slash path inside a language tree: localePath('he', 'shop') -> /he/shop/ */
export function localePath(lang: Lang, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `/${lang}/${clean}/` : `/${lang}/`;
}

/** Swaps the language segment of a path while keeping the slug intact. */
export function switchLangPath(currentPath: string, targetLang: Lang): string {
  const clean = currentPath.replace(/^\/+/, '');
  const segments = clean.split('/').filter(Boolean);
  if (segments.length === 0) return `/${targetLang}/`;
  segments[0] = targetLang;
  return `/${segments.join('/')}/`;
}

export function absoluteUrl(path: string, site: URL | string | undefined): string {
  const origin = site ? new URL(site).origin : 'https://unschool.cool';
  return new URL(path, origin).toString();
}
