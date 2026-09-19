import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL('https://unschool.cool')).origin;

  // Checkout, order and success pages carry a noindex tag instead of a Disallow:
  // blocking the crawl would hide that tag and let linked URLs be indexed anyway.
  const body = `User-agent: *
Allow: /

Disallow: /api/

Sitemap: ${origin}/sitemap.xml
`;

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
