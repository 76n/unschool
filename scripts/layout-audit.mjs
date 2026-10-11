#!/usr/bin/env node
/**
 * Opens every flyout on the built site (the Programs panel, the language menu,
 * the mobile menu and the sticky call-to-action bar) in Chromium, WebKit and
 * Firefox, across languages, viewport widths and text sizes, and fails when text
 * overflows its box, leaves its panel or the viewport, crowds its neighbour, or
 * when names in one list stop lining up.
 * Run after `npm run build`: node scripts/layout-audit.mjs
 */
import { createReadStream, readdirSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, relative, sep } from 'node:path';
import { chromium, firefox, webkit } from 'playwright';

const DIST = new URL('../site/dist/', import.meta.url).pathname;

const ENGINES = { chromium, webkit, firefox };
const LANGS = ['ru', 'he', 'en'];
const WIDTHS = [320, 360, 375, 390, 414, 768, 1024, 1199, 1200, 1280, 1366, 1440, 1920];
/** 1.25 and 1.5 stand in for a larger browser font setting, without the breakpoints that would follow it. */
const TEXT_SCALES = [1, 1.25, 1.5];
/** Every page is also checked once at a phone and a desktop width. */
const SWEEP_WIDTHS = [360, 1200];
const MIN_GAP_PX = 6;

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

/** Runs inside the page: opens each flyout and measures it. */
function auditFlyouts({ minGap, scale }) {
  document.documentElement.style.fontSize = `${scale * 100}%`;
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

const runs = [];
for (const lang of LANGS) {
  for (const width of WIDTHS) {
    for (const scale of TEXT_SCALES) runs.push({ path: `/${lang}/`, width, scale });
  }
}
for (const path of pageUrls()) {
  for (const width of SWEEP_WIDTHS) runs.push({ path, width, scale: 1 });
}

const failures = [];
for (const [engineName, engine] of Object.entries(ENGINES)) {
  const browser = await engine.launch();
  const page = await browser.newPage();
  for (const { path, width, scale } of runs) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(origin + path, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const problems = await page.evaluate(auditFlyouts, { minGap: MIN_GAP_PX, scale });
    for (const problem of problems) {
      failures.push(`${engineName} ${path} ${width}px, text ${scale * 100}%: ${problem}`);
    }
  }
  await browser.close();
}
server.close();

const unique = [...new Set(failures)];
console.log(
  `\nLayout audit: ${runs.length} page and viewport combinations in ${Object.keys(ENGINES).length} browsers`
);
if (unique.length > 0) {
  for (const failure of unique) console.log(`  ✗ ${failure}`);
  console.log(`${unique.length} problems\n`);
  process.exit(1);
}
console.log('0 problems\n');
