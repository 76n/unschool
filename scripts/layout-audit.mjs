#!/usr/bin/env node
/**
 * Checks the built site in Chromium, WebKit and Firefox, across languages,
 * viewport widths and text sizes. On every page it fails when visible text or an
 * image sits outside the content column that `.wrap` defines, when an element
 * sticks out of its container, when a closed select at the default text size is
 * too narrow for one of its options, or when a word breaks in the middle. It also opens every flyout (the Programs panel,
 * the language menu, the mobile menu and the sticky call-to-action bar) to fail
 * when text overflows its box, leaves its panel or the viewport, crowds its
 * neighbour, or when names in one list stop lining up.
 * Run after `npm run build`: node scripts/layout-audit.mjs
 */
import { createReadStream, readdirSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, relative, sep } from 'node:path';
import { chromium, firefox, webkit } from 'playwright';

const DIST = new URL('../site/dist/', import.meta.url).pathname;

const ENGINES = { chromium, webkit, firefox };
const LANGS = ['ru', 'he', 'en'];
const WIDTHS = [320, 360, 375, 390, 414, 768, 1024, 1199, 1200, 1280, 1366, 1440, 1920, 2560];
/**
 * 1.25 and 1.5 enlarge the page's root font size while the rem breakpoints stay
 * put: the worst case for overflow. Words may wrap there, but nothing may spill.
 */
const TEXT_SCALES = [1, 1.25, 1.5];
/**
 * Every other page is checked at a phone, a tablet, a desktop and a very wide
 * (or zoomed-out) width, with large text where layouts are tightest.
 */
const SWEEP = [
  { width: 320, scale: 1.5 },
  { width: 360, scale: 1 },
  { width: 768, scale: 1.5 },
  { width: 1200, scale: 1 },
  { width: 1200, scale: 1.5 },
  { width: 2560, scale: 1 },
];
/**
 * A larger font in the browser's own settings, which also moves the rem
 * breakpoints. Here no word may break either. WebKit offers no such setting.
 * Pages are checked where the screen holds at least 240px of default-size text
 * (a 360px phone at 150%); narrower than any phone, only overflow is checked.
 */
const BROWSER_TEXT_ENGINES = ['chromium', 'firefox'];
const BROWSER_TEXT_SCALES = [1.25, 1.5];
const BROWSER_TEXT_WIDTHS = [320, 360, 414, 768, 1200];
const MIN_TEXT_ROOM_PX = 240;
const MIN_GAP_PX = 6;
const MAX_REPORTED_PER_PAGE = 3;

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.json': 'application/json',
};

function isFile(path) {
  try {
    return statSync(path).isFile();
  } catch {
    return false;
  }
}

function resolveFile(url) {
  const path = decodeURIComponent(new URL(url, 'http://localhost').pathname);
  const file = join(DIST, path);
  if (!file.startsWith(DIST)) return null;
  if (isFile(file)) return file;
  const index = join(file, 'index.html');
  return isFile(index) ? index : null;
}

function pageUrls(dir = DIST, urls = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) pageUrls(full, urls);
    else if (name === 'index.html') {
      const rel = relative(DIST, dir).split(sep).join('/');
      urls.push(rel ? `/${rel}/` : '/');
    }
  }
  return urls.sort();
}

/**
 * Runs inside the page: finds visible text and images outside the `.wrap`
 * content column, elements that stick out of their container, selects that cut
 * off an option and, when `checkWords` is set, words broken in the middle.
 */
function auditPage({ maxReported, checkWords, checkSelects }) {
  const probe = document.createElement('div');
  probe.className = 'wrap';
  document.body.append(probe);
  const column = contentBox(probe);
  probe.remove();

  function contentBox(el) {
    const box = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    return {
      left: box.left + parseFloat(style.borderLeftWidth) + parseFloat(style.paddingLeft),
      right: box.right - parseFloat(style.borderRightWidth) - parseFloat(style.paddingRight),
    };
  }

  const describe = (el) => {
    const parts = [];
    for (
      let node = el;
      node && node !== document.body && parts.length < 3;
      node = node.parentElement
    ) {
      const classes = [...node.classList].filter((name) => !name.startsWith('astro-'));
      parts.unshift([node.localName, ...classes].join('.'));
    }
    return parts.join(' > ');
  };

  // Only what a reader can see counts: unrendered content (a closed menu),
  // decorations marked aria-hidden, the parts an overflow container clips away
  // and anything parked above the page (the skip link) are left out.
  const visibleSpan = (el, rect) => {
    if (rect.bottom <= 0 || !el.checkVisibility()) return null;
    let { left, right } = rect;
    for (let node = el; node && node !== document.body; node = node.parentElement) {
      if (node.getAttribute('aria-hidden') === 'true') return null;
      const style = getComputedStyle(node);
      if (style.overflowX !== 'visible' || style.clipPath !== 'none') {
        const clip = node.getBoundingClientRect();
        left = Math.max(left, clip.left);
        right = Math.min(right, clip.right);
      }
    }
    return right - left >= 2 ? { left, right } : null;
  };
  const outside = (span, box) => span.left < box.left - 0.5 || span.right > box.right + 0.5;
  const where = (span, box) =>
    `${Math.round(span.left)} to ${Math.round(span.right)}, room is ${Math.round(box.left)} to ${Math.round(box.right)}`;

  const problems = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const text = node.textContent.trim().replace(/\s+/g, ' ');
    if (!text) continue;
    const range = document.createRange();
    range.selectNodeContents(node);
    const span = [...range.getClientRects()]
      .map((rect) => visibleSpan(node.parentElement, rect))
      .find((visible) => visible && outside(visible, column));
    if (span) {
      problems.push(
        `"${text.slice(0, 50)}" is outside the content column (${where(span, column)})`
      );
    }
  }
  for (const img of document.querySelectorAll('img')) {
    const span = visibleSpan(img, img.getBoundingClientRect());
    if (span && outside(span, column)) {
      problems.push(
        `image ${img.getAttribute('src')} is outside the content column (${where(span, column)})`
      );
    }
  }

  // Positioned elements (badges, flyouts) are covered by the text check above
  // and by auditFlyouts; negative margins are deliberate bleeds.
  for (const el of document.body.querySelectorAll('*')) {
    const style = getComputedStyle(el);
    if (['absolute', 'fixed'].includes(style.position) || style.display === 'contents') continue;
    if (parseFloat(style.marginLeft) < 0 || parseFloat(style.marginRight) < 0) continue;
    let container = el.parentElement;
    while (container && ['inline', 'contents'].includes(getComputedStyle(container).display)) {
      container = container.parentElement;
    }
    if (!container || container === document.body) continue;
    if (getComputedStyle(container).overflowX !== 'visible') continue;
    const rect = el.getBoundingClientRect();
    if (rect.width < 1 || !visibleSpan(el, rect)) continue;
    const box = contentBox(container);
    if (outside(rect, box)) {
      problems.push(`${describe(el)} sticks out of its container (${where(rect, box)})`);
    }
  }

  // A closed select shows the chosen option on one line, so at the default text
  // size every option must fit. With large text phones show it in their own picker.
  const ruler = document.createElement('canvas').getContext('2d');
  for (const select of checkSelects ? document.querySelectorAll('select') : []) {
    if (!visibleSpan(select, select.getBoundingClientRect())) continue;
    const style = getComputedStyle(select);
    ruler.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const room =
      select.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    const cut = [...select.options].find(
      (option) => ruler.measureText(option.text).width > room + 1
    );
    if (cut)
      problems.push(`${describe(select)} cuts off "${cut.text}" (${Math.floor(room)}px of room)`);
  }

  // A word may only break across lines where the browser hyphenates it or where
  // the element opts in with overflow-wrap: anywhere (long email addresses).
  const words = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (checkWords && words.nextNode()) {
    const node = words.currentNode;
    const el = node.parentElement;
    if (!node.textContent.trim() || !visibleSpan(el, el.getBoundingClientRect())) continue;
    const style = getComputedStyle(el);
    if (style.hyphens === 'auto' || style.overflowWrap === 'anywhere') continue;
    for (const match of node.textContent.matchAll(/[^\s\-\u2010\u2013\u2014/\u00AD\u05BE]{2,}/g)) {
      const range = document.createRange();
      range.setStart(node, match.index);
      range.setEnd(node, match.index + match[0].length);
      const rects = [...range.getClientRects()].filter((rect) => rect.width > 0);
      if (rects.length < 2) continue;
      const tops = rects.map((rect) => rect.top);
      if (Math.max(...tops) - Math.min(...tops) > rects[0].height / 2) {
        problems.push(`"${match[0]}" breaks mid-word in ${describe(el)}`);
      }
    }
  }

  if (problems.length <= maxReported) return problems;
  return [...problems.slice(0, maxReported), `and ${problems.length - maxReported} more`];
}

/** Runs inside the page: opens each flyout and measures it. */
function auditFlyouts({ minGap }) {
  const problems = [];
  const rtl = document.documentElement.dir === 'rtl';
  const visible = (el) => Boolean(el) && getComputedStyle(el).display !== 'none';

  const textRects = (root) => {
    const rects = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.textContent.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      for (const rect of range.getClientRects()) {
        rects.push({ node, text: node.textContent.trim(), rect });
      }
    }
    return rects;
  };

  const check = (panel, name) => {
    const box = panel.getBoundingClientRect();
    if (box.width === 0 || box.height === 0) {
      problems.push(`${name}: did not open`);
      return;
    }
    if (box.left < -0.5 || box.right > innerWidth + 0.5) {
      problems.push(
        `${name}: leaves the viewport (${Math.round(box.left)} to ${Math.round(box.right)} of ${innerWidth})`
      );
    }

    for (const el of panel.querySelectorAll('*')) {
      if (el.getClientRects().length === 0 || getComputedStyle(el).display === 'inline') continue;
      if (el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 1) {
        const text = el.textContent.trim().replace(/\s+/g, ' ').slice(0, 50);
        problems.push(
          `${name}: "${text}" is ${el.scrollWidth}px wide in a ${el.clientWidth}px box`
        );
      }
    }

    for (const { text, rect } of textRects(panel)) {
      if (
        rect.left < box.left - 0.5 ||
        rect.right > box.right + 0.5 ||
        rect.bottom > box.bottom + 0.5
      ) {
        problems.push(`${name}: "${text}" sticks out of the panel`);
      }
    }

    // Engines may split one text node into several rects, so the gap is measured
    // between separate text nodes, each taken as the union of its rects on a line.
    for (const link of panel.querySelectorAll('a')) {
      const lines = new Map();
      for (const { node, rect } of textRects(link)) {
        const line = Math.round(rect.top);
        const byNode = lines.get(line) ?? new Map();
        const union = byNode.get(node);
        byNode.set(
          node,
          union
            ? { left: Math.min(union.left, rect.left), right: Math.max(union.right, rect.right) }
            : { left: rect.left, right: rect.right }
        );
        lines.set(line, byNode);
      }
      for (const byNode of lines.values()) {
        const spans = [...byNode.values()].sort((a, b) => a.left - b.left);
        for (let i = 1; i < spans.length; i++) {
          const space = spans[i].left - spans[i - 1].right;
          if (space < minGap) {
            const text = link.textContent.trim().replace(/\s+/g, ' ');
            problems.push(`${name}: only ${space.toFixed(1)}px between the parts of "${text}"`);
          }
        }
      }
    }

    for (const list of panel.querySelectorAll('.mega-panel ul')) {
      const starts = [...list.querySelectorAll('a')].map((link) => {
        const rects = textRects(link);
        const label = rects[rects.length - 1].rect;
        return rtl ? label.right : label.left;
      });
      if (Math.max(...starts) - Math.min(...starts) > 1) {
        problems.push(`${name}: names in one list do not line up`);
      }
    }
  };

  const header = document.querySelector('.header-inner');
  if (!header) return problems;

  if (visible(document.querySelector('.desk-nav'))) {
    const mega = document.querySelector('.mega');
    mega.open = true;
    check(document.querySelector('.mega-panel'), 'Programs panel');
    mega.open = false;

    const bar = header.getBoundingClientRect();
    for (const item of header.children) {
      const rect = item.getBoundingClientRect();
      if (rect.left < bar.left - 0.5 || rect.right > bar.right + 0.5) {
        problems.push(`header: .${item.classList[0]} does not fit in the bar`);
      }
    }
  } else {
    const toggle = document.querySelector('[data-menu-toggle]');
    toggle.click();
    check(document.querySelector('#site-menu .wrap'), 'mobile menu');
    toggle.click();
  }

  const langSwitch = document.querySelector('.lang-switch');
  langSwitch.open = true;
  check(document.querySelector('.lang-menu'), 'language menu');
  langSwitch.open = false;

  const sticky = document.querySelector('[data-sticky-cta]');
  if (sticky) {
    sticky.hidden = false;
    sticky.setAttribute('data-visible', '');
    sticky.style.transition = 'none';
    if (visible(sticky)) check(sticky, 'sticky bar');
  }

  return problems;
}

const server = createServer((req, res) => {
  const file = resolveFile(req.url ?? '/');
  if (!file) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, {
    'content-type': CONTENT_TYPES[extname(file)] ?? 'application/octet-stream',
  });
  createReadStream(file).pipe(res);
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;

const homePaths = LANGS.map((lang) => `/${lang}/`);
const runs = [];
for (const path of homePaths) {
  for (const width of WIDTHS) {
    for (const scale of TEXT_SCALES) runs.push({ path, width, scale });
  }
}
for (const path of pageUrls()) {
  if (homePaths.includes(path)) continue;
  for (const { width, scale } of SWEEP) runs.push({ path, width, scale });
}

const browserTextRuns = new Map(
  BROWSER_TEXT_SCALES.map((scale) => [
    scale,
    pageUrls().flatMap((path) =>
      BROWSER_TEXT_WIDTHS.filter((width) => width / scale >= MIN_TEXT_ROOM_PX).map((width) => ({
        path,
        width,
        scale,
      }))
    ),
  ])
);

/** Opens a page whose browser default font size is `px`, as a reader's setting would. */
async function openWithFontSize(engineName, px) {
  if (engineName === 'firefox') {
    const groups = ['x-western', 'x-cyrillic', 'he'];
    const browser = await firefox.launch({
      firefoxUserPrefs: Object.fromEntries(
        groups.map((group) => [`font.size.variable.${group}`, px])
      ),
    });
    return { browser, page: await browser.newPage() };
  }
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const session = await page.context().newCDPSession(page);
  await session.send('Page.setFontSizes', {
    fontSizes: { standard: px, fixed: Math.round((px * 13) / 16) },
  });
  return { browser, page };
}

const failures = [];
async function audit(page, label, runs, { scaleRoot }) {
  for (const { path, width, scale } of runs) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(origin + path, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    if (scaleRoot) {
      await page.evaluate((scale) => {
        document.documentElement.style.fontSize = `${scale * 100}%`;
      }, scale);
    }
    const problems = [
      ...(await page.evaluate(auditPage, {
        maxReported: MAX_REPORTED_PER_PAGE,
        checkWords: !scaleRoot || scale === 1,
        checkSelects: scale === 1,
      })),
      ...(await page.evaluate(auditFlyouts, { minGap: MIN_GAP_PX })),
    ];
    for (const problem of problems) {
      const text = scaleRoot ? 'text' : 'browser text';
      failures.push(`${label} ${path} ${width}px, ${text} ${scale * 100}%: ${problem}`);
    }
  }
}

for (const [engineName, engine] of Object.entries(ENGINES)) {
  const browser = await engine.launch();
  await audit(await browser.newPage(), engineName, runs, { scaleRoot: true });
  await browser.close();
}
for (const engineName of BROWSER_TEXT_ENGINES) {
  for (const [scale, scaleRuns] of browserTextRuns) {
    const { browser, page } = await openWithFontSize(engineName, Math.round(16 * scale));
    await audit(page, engineName, scaleRuns, { scaleRoot: false });
    await browser.close();
  }
}
server.close();

const unique = [...new Set(failures)];
const browserTextCount = [...browserTextRuns.values()].reduce((sum, list) => sum + list.length, 0);
console.log(
  `\nLayout audit: ${runs.length} page and viewport combinations in ${Object.keys(ENGINES).length} browsers, ` +
    `plus ${browserTextCount} with a larger browser font in ${BROWSER_TEXT_ENGINES.length}`
);
if (unique.length > 0) {
  for (const failure of unique) console.log(`  ✗ ${failure}`);
  console.log(`${unique.length} problems\n`);
  process.exit(1);
}
console.log('0 problems\n');
