#!/usr/bin/env node
/**
 * Renders the brand social cards and raster icons into site/public.
 * Output is committed, so this only needs re-running when the brand changes.
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import sharp from 'sharp';

const PUBLIC = new URL('../site/public/', import.meta.url).pathname;
const IMAGES = join(PUBLIC, 'images');
mkdirSync(IMAGES, { recursive: true });

const CREAM = '#fbf7ef';
const PURPLE = '#655c97';
const INK = '#1e1b33';
const YELLOW = '#f5c64f';

const SANS = "'Rubik', 'Helvetica Neue', 'Arial Hebrew', Arial, sans-serif";

const CARDS = {
  ru: {
    tagline: 'Математика, английский и иврит',
    sub: 'Онлайн-занятия для школьников в Израиле',
    note: 'Бесплатная диагностическая встреча',
    rtl: false,
  },
  he: {
    tagline: 'מתמטיקה, אנגלית ועברית',
    sub: 'שיעורים אונליין לתלמידי בית ספר בישראל',
    note: 'פגישת אבחון ראשונה — חינם',
    rtl: true,
  },
  en: {
    tagline: 'Maths, English and Hebrew',
    sub: 'Online lessons for school students in Israel',
    note: 'Free diagnostic meeting',
    rtl: false,
  },
};

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** SVG rendering offers no text metrics, so advance width is approximated per weight. */
const textWidth = (text, size, weight = 400) => text.length * size * (weight >= 600 ? 0.56 : 0.52);

const fitSize = (text, maxWidth, maxSize, weight) => {
  let size = maxSize;
  while (size > 20 && textWidth(text, size, weight) > maxWidth) size -= 1;
  return size;
};

const MARGIN = 80;
const CONTENT = 1200 - MARGIN * 2;

function card({ tagline, sub, note, rtl }) {
  const x = rtl ? 1200 - MARGIN : MARGIN;
  const anchor = rtl ? 'end' : 'start';

  const taglineSize = fitSize(tagline, CONTENT, 70, 700);
  const subSize = fitSize(sub, CONTENT, 38, 400);
  const noteSize = fitSize(note, CONTENT - 80, 27, 500);
  const pillWidth = Math.round(textWidth(note, noteSize, 500) + 72);
  const pillX = rtl ? x - pillWidth : x;
  const ruleWidth = Math.min(380, Math.round(textWidth(tagline, taglineSize, 700)));

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${CREAM}"/>
  <circle cx="${rtl ? 150 : 1050}" cy="110" r="220" fill="${PURPLE}" opacity="0.08"/>
  <circle cx="${rtl ? 60 : 1140}" cy="560" r="150" fill="${YELLOW}" opacity="0.18"/>

  <g transform="translate(${rtl ? 1200 - MARGIN - 72 : MARGIN} 70)">
    <rect width="72" height="72" rx="18" fill="${PURPLE}"/>
    <text x="36" y="53" text-anchor="middle" font-family="${SANS}" font-size="44" font-weight="700" fill="${CREAM}">u</text>
    <text x="${rtl ? -20 : 92}" y="52" text-anchor="${rtl ? 'end' : 'start'}" font-family="${SANS}" font-size="38" font-weight="600" fill="${INK}" letter-spacing="-0.5">unschool</text>
  </g>

  <text x="${x}" y="300" text-anchor="${anchor}" font-family="${SANS}" font-size="${taglineSize}" font-weight="700" fill="${INK}" letter-spacing="-1.5">${escape(tagline)}</text>
  <rect x="${rtl ? x - ruleWidth : x}" y="322" width="${ruleWidth}" height="14" rx="7" fill="${YELLOW}"/>
  <text x="${x}" y="405" text-anchor="${anchor}" font-family="${SANS}" font-size="${subSize}" font-weight="400" fill="#5b586e">${escape(sub)}</text>

  <g transform="translate(${pillX} 480)">
    <rect width="${pillWidth}" height="72" rx="36" fill="${PURPLE}"/>
    <text x="${pillWidth / 2}" y="47" text-anchor="middle" font-family="${SANS}" font-size="${noteSize}" font-weight="500" fill="${CREAM}">${escape(note)}</text>
  </g>
</svg>`;
}

const icon = (
  size
) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${PURPLE}"/>
  <text x="32" y="46" text-anchor="middle" font-family="${SANS}" font-size="40" font-weight="700" fill="${CREAM}">u</text>
</svg>`;

const render = (svg, file) => sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(file);

for (const [lang, spec] of Object.entries(CARDS)) {
  await render(card(spec), join(IMAGES, `og-${lang}.png`));
}

for (const size of [180, 192, 512]) {
  const name = size === 180 ? 'apple-touch-icon.png' : `icon-${size}.png`;
  await render(icon(size), join(PUBLIC, name));
}

// Product covers ship as SVG for the page, but Google product rich results and
// social networks both need a raster copy.
const PRODUCTS = join(IMAGES, 'products');
for (const file of readdirSync(PRODUCTS).filter((f) => f.endsWith('.svg'))) {
  const art = await sharp(readFileSync(join(PRODUCTS, file)), { density: 300 })
    .resize(900, 500, { fit: 'inside' })
    .png()
    .toBuffer();

  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: CREAM },
  })
    .composite([{ input: art, gravity: 'centre' }])
    .png({ compressionLevel: 9 })
    .toFile(join(PRODUCTS, `${basename(file, '.svg')}.png`));
}

writeFileSync(
  join(PUBLIC, 'site.webmanifest'),
  JSON.stringify(
    {
      name: 'Unschool',
      short_name: 'Unschool',
      description: 'Online Maths, English and Hebrew lessons for school students in Israel.',
      start_url: '/',
      display: 'browser',
      background_color: CREAM,
      theme_color: PURPLE,
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      ],
    },
    null,
    2
  ) + '\n'
);

console.log('Generated social cards, icons and web manifest.');
