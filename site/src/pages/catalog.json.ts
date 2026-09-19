import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/**
 * Server-side source of truth for prices. Cloud Functions read this file so a
 * browser can never decide what an order costs.
 */
export const GET: APIRoute = async () => {
  const products = await getCollection('products');

  const payload = products
    .filter((product) => product.data.published !== false)
    .map(({ data }) => ({
      slug: data.slug,
      lang: data.lang,
      title: data.title,
      type: data.type,
      price: data.price,
      currency: data.currency,
      status: data.status,
      storagePath: data.storagePath ?? null,
      supportContact: data.supportContact,
    }));

  return new Response(JSON.stringify(payload), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=60',
    },
  });
};
