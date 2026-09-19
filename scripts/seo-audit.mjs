#!/usr/bin/env node
/**
 * Audits the built site in site/dist for SEO correctness.
 * Run after `npm run build`: node scripts/seo-audit.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = new URL('../site/dist/', import.meta.url).pathname;
const ORIGIN = process.env.AUDIT_ORIGIN ?? 'https://unschool.cool';

const TITLE_MAX = 62;
const DESC_MIN = 70;
const DESC_MAX = 158;

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (name.endsWith('.html')) files.push(full);
  }
  return files;
}

const pick = (html, re) => {
  const m = html.match(re);
  return m ? m[1] : null;
};

const all = (html, re) => [...html.matchAll(re)].map((m) => m[1]);

const pages = walk(DIST).sort();
const issues = [];
const add = (page, level, message) => issues.push({ page, level, message });
const seenTitles = new Map();
const seenDescriptions = new Map();
const hreflangSets = new Map();
const linkTargets = new Map();

const urlOf = (file) => {
  const rel = relative(DIST, file).split(sep).join('/');
  if (rel === '404.html') return '/404';
  return '/' + rel.replace(/index\.html$/, '');
};

const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
const sitemapUrls = new Set(all(sitemap, /<loc>([^<]+)<\/loc>/g));

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const url = urlOf(file);
  const isNoindex = /<meta name="robots" content="noindex/.test(html) || url.startsWith('/admin');

  const title = pick(html, /<title>([\s\S]*?)<\/title>/);
  const desc = pick(html, /<meta name="description" content="([^"]*)"/);
  const canonical = pick(html, /<link rel="canonical" href="([^"]+)"/);
  const h1s = all(html, /<h1[^>]*>([\s\S]*?)<\/h1>/g);
  const lang = pick(html, /<html lang="([^"]+)"/);
  const alternates = all(html, /<link rel="alternate" hreflang="([^"]+)"/g);
  const alternateHrefs = [
    ...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g),
  ];
  const ogImage = pick(html, /<meta property="og:image" content="([^"]+)"/);
  const ogTitle = pick(html, /<meta property="og:title" content="([^"]+)"/);
  const jsonLd = all(html, /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g);

  // Title
  if (!title) add(url, 'error', 'missing <title>');
  else if (title.length > TITLE_MAX)
    add(url, 'warn', `title ${title.length} chars (>${TITLE_MAX}): ${title.slice(0, 70)}…`);

  // Description. Length only matters where a snippet can be shown.
  if (!desc) add(url, 'error', 'missing meta description');
  else if (desc.length > DESC_MAX)
    add(url, 'warn', `description ${desc.length} chars (>${DESC_MAX})`);
  else if (desc.length < DESC_MIN && !isNoindex)
    add(url, 'warn', `description ${desc.length} chars (<${DESC_MIN})`);

  // Headings
  if (h1s.length === 0) add(url, 'error', 'no <h1>');
  if (h1s.length > 1) add(url, 'error', `${h1s.length} <h1> elements`);

  // Language
  if (!lang) add(url, 'error', 'missing lang attribute');

  // Canonical
  if (!canonical) add(url, 'error', 'missing canonical');
  else if (!canonical.startsWith(ORIGIN))
    add(url, 'error', `canonical points elsewhere: ${canonical}`);

  // hreflang
  if (!isNoindex) {
    if (alternates.length === 0) add(url, 'error', 'indexable page without hreflang');
    else if (!alternates.includes('x-default')) add(url, 'warn', 'hreflang without x-default');
  } else if (alternates.length > 0) {
    add(url, 'warn', 'noindex page emits hreflang');
  }

  // Social
  if (!ogTitle) add(url, 'error', 'missing og:title');
  if (!ogImage) add(url, 'error', 'missing og:image');
  else if (ogImage.endsWith('.svg'))
    add(url, 'error', 'og:image is SVG, which social networks do not render');

  // Structured data must parse
  jsonLd.forEach((block, i) => {
    try {
      JSON.parse(block);
    } catch (err) {
      add(url, 'error', `JSON-LD block ${i + 1} is invalid: ${err.message}`);
    }
  });

  // Images need alt attributes
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const noAlt = imgs.filter((tag) => !/\balt=/.test(tag));
  if (noAlt.length) add(url, 'error', `${noAlt.length} <img> without alt`);
  const noDims = imgs.filter((tag) => !/\bwidth=/.test(tag) || !/\bheight=/.test(tag));
  if (noDims.length) add(url, 'warn', `${noDims.length} <img> without width/height`);

  // Duplicate metadata dilutes the pages it is spread across.
  if (title) {
    if (seenTitles.has(title)) add(url, 'error', `title duplicates ${seenTitles.get(title)}`);
    else seenTitles.set(title, url);
  }
  if (desc && !isNoindex) {
    if (seenDescriptions.has(desc))
      add(url, 'warn', `description duplicates ${seenDescriptions.get(desc)}`);
    else seenDescriptions.set(desc, url);
  }

  // hreflang has to be reciprocal, so record the cluster for a second pass.
  if (!isNoindex) {
    const set = alternateHrefs.filter(([, code]) => code !== 'x-default').map(([, , href]) => href);
    hreflangSets.set(ORIGIN + url, new Set(set));
    if (!set.includes(ORIGIN + url)) add(url, 'error', 'hreflang cluster lacks a self-reference');
  }

  // Heading order: a skipped level breaks the document outline.
  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  levels.reduce((previous, level) => {
    if (level > previous + 1) add(url, 'warn', `heading jumps from h${previous} to h${level}`);
    return level;
  }, levels[0] ?? 1);

  // Internal links must resolve.
  all(html, /<a\b[^>]*href="(\/[^"#?]*)"/g).forEach((href) => {
    if (!linkTargets.has(href)) linkTargets.set(href, url);
  });

  // Sitemap membership
  const absolute = ORIGIN + url;
  const inSitemap = sitemapUrls.has(absolute);
  if (isNoindex && inSitemap) add(url, 'error', 'noindex page listed in sitemap');
  if (!isNoindex && !inSitemap && !url.startsWith('/404'))
    add(url, 'warn', 'indexable page missing from sitemap');
}

// Sitemap entries must exist as files
const built = new Set(pages.map((f) => ORIGIN + urlOf(f)));
for (const loc of sitemapUrls) {
  if (!built.has(loc)) add(loc, 'error', 'sitemap lists a URL that was not built');
}

// Every page named as an alternate must name the original back.
for (const [page, set] of hreflangSets) {
  for (const alternate of set) {
    if (!hreflangSets.has(alternate)) {
      add(page.replace(ORIGIN, ''), 'error', `hreflang target is not indexable: ${alternate}`);
    } else if (!hreflangSets.get(alternate).has(page)) {
      add(page.replace(ORIGIN, ''), 'error', `hreflang not reciprocated by ${alternate}`);
    }
  }
}

// Internal links must resolve to a built page or a static file.
const staticFiles = new Set();
const collectFiles = (dir, prefix = '') => {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) collectFiles(full, `${prefix}/${name}`);
    else staticFiles.add(`${prefix}/${name}`);
  }
};
collectFiles(DIST);

for (const [href, source] of linkTargets) {
  const normalized = href.endsWith('/') ? href : `${href}/`;
  const exists =
    built.has(ORIGIN + href) ||
    built.has(ORIGIN + normalized) ||
    staticFiles.has(href) ||
    href.startsWith('/api/');
  if (!exists) add(source, 'error', `links to a missing page: ${href}`);
}

const errors = issues.filter((i) => i.level === 'error');
const warnings = issues.filter((i) => i.level === 'warn');

const group = (list) => {
  const byPage = new Map();
  list.forEach(({ page, message }) => {
    if (!byPage.has(page)) byPage.set(page, []);
    byPage.get(page).push(message);
  });
  return byPage;
};

console.log(`\nSEO audit — ${pages.length} pages, origin ${ORIGIN}`);
console.log(`${errors.length} errors, ${warnings.length} warnings\n`);

for (const [label, list] of [
  ['ERROR', errors],
  ['WARN', warnings],
]) {
  if (!list.length) continue;
  console.log(`--- ${label} ---`);
  for (const [page, messages] of group(list)) {
    console.log(`${page}`);
    [...new Set(messages)].forEach((m) => console.log(`    ${m}`));
  }
  console.log();
}

process.exit(errors.length ? 1 : 0);
