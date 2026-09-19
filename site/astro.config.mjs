// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

const API_TARGET = process.env.API_PROXY_TARGET ?? 'http://127.0.0.1:5321';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://unschool.cool',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  image: {
    responsiveStyles: true,
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: 'Rubik',
        cssVariable: '--font-brand',
        weights: [400, 500, 600, 700],
        styles: ['normal'],
        subsets: ['latin', 'cyrillic', 'hebrew'],
        fallbacks: ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      // Display face for Latin and Cyrillic pages.
      {
        provider: fontProviders.google(),
        name: 'Literata',
        cssVariable: '--font-display-latin',
        weights: [700],
        styles: ['normal'],
        subsets: ['latin', 'cyrillic'],
        fallbacks: ['Georgia', 'serif'],
      },
      // Display face for Hebrew pages, so RTL keeps the same editorial voice.
      {
        provider: fontProviders.google(),
        name: 'Frank Ruhl Libre',
        cssVariable: '--font-display-hebrew',
        weights: [700],
        styles: ['normal'],
        subsets: ['latin', 'hebrew'],
        fallbacks: ['Georgia', 'serif'],
      },
    ],
  },
  vite: {
    server: {
      // The Firebase Hosting emulator applies the /api rewrites, so dev traffic
      // reaches the same URLs it will hit in production.
      proxy: {
        '/api': {
          target: API_TARGET,
          changeOrigin: true,
        },
      },
    },
  },
});
