import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { DEFAULT_LANG, LANGS, type Lang } from '~/i18n/config';
import { localePath } from '~/i18n/routes';
import { STAGES, SUBJECTS } from '~/data/taxonomy';

type Entry = { path: string; langs: Lang[] };

/** Only published, indexable public pages. Checkout, orders and admin stay out. */
async function collectEntries(): Promise<Entry[]> {
  const all: Entry[] = [];
  const everywhere = [...LANGS];

  const staticPaths = ['', 'teachers', 'diagnostic', 'shop'];
  staticPaths.forEach((path) => all.push({ path, langs: everywhere }));

  SUBJECTS.forEach((subject) => all.push({ path: `subjects/${subject}`, langs: everywhere }));
  STAGES.forEach((stage) => all.push({ path: `stages/${stage}`, langs: everywhere }));

  const collections = [
    { name: 'programs' as const, prefix: 'programs' },
    { name: 'products' as const, prefix: 'shop' },
    { name: 'teachers' as const, prefix: 'teachers' },
    { name: 'pages' as const, prefix: '' },
  ];

  for (const { name, prefix } of collections) {
    const entries = (await getCollection(name)).filter(
      (entry) => (entry.data as { published: boolean }).published !== false
    );

    const bySlug = new Map<string, Lang[]>();
    entries.forEach((entry) => {
      const { slug, lang } = entry.data as { slug: string; lang: Lang };
      bySlug.set(slug, [...(bySlug.get(slug) ?? []), lang]);
    });

    bySlug.forEach((langs, slug) => {
      all.push({ path: prefix ? `${prefix}/${slug}` : slug, langs });
    });
  }

  return all;
}

export const GET: APIRoute = async ({ site }) => {
  const origin = (site ?? new URL('https://unschool.cool')).origin;
  const entries = await collectEntries();

  const urls = entries
    .flatMap((entry) =>
      entry.langs.map((lang) => {
        const loc = `${origin}${localePath(lang, entry.path)}`;
        const alternates = entry.langs
          .map(
            (alt) =>
              `    <xhtml:link rel="alternate" hreflang="${alt}" href="${origin}${localePath(alt, entry.path)}" />`
          )
          .join('\n');
        const defaultLang = entry.langs.includes(DEFAULT_LANG) ? DEFAULT_LANG : entry.langs[0];
        const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${origin}${localePath(defaultLang, entry.path)}" />`;

        return `  <url>\n    <loc>${loc}</loc>\n${alternates}\n${xDefault}\n  </url>`;
      })
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { 'content-type': 'application/xml; charset=utf-8' },
  });
};
