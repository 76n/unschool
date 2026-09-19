import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL('https://unschool.cool')).origin;

  const body = `User-agent: *
Allow: /

Disallow: /admin/
Disallow: /api/
Disallow: /ru/checkout/
Disallow: /he/checkout/
Disallow: /en/checkout/
Disallow: /ru/order/
Disallow: /he/order/
Disallow: /en/order/
Disallow: /ru/diagnostic/success/
Disallow: /he/diagnostic/success/
Disallow: /en/diagnostic/success/

Sitemap: ${origin}/sitemap.xml
`;

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
