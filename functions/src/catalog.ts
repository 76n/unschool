import { config } from './config';
import type { Lang } from './validation';

export interface CatalogProduct {
  slug: string;
  lang: Lang;
  title: string;
  type: 'workbook' | 'taskset' | 'course' | 'other';
  price: number;
  currency: 'ILS';
  status: 'demo' | 'published';
  storagePath?: string;
  supportContact: string;
}

let cache: { at: number; products: CatalogProduct[] } | null = null;

/**
 * The catalogue is published by the static site build, so prices always come
 * from the server rather than from the browser.
 */
export async function loadCatalog(baseUrl: string): Promise<CatalogProduct[]> {
  const fresh = cache && Date.now() - cache.at < config.catalogCacheSeconds * 1000;
  if (fresh && cache) return cache.products;

  const response = await fetch(`${baseUrl}/catalog.json`);
  if (!response.ok) {
    throw new Error(`Catalog unavailable (${response.status})`);
  }

  const products = (await response.json()) as CatalogProduct[];
  cache = { at: Date.now(), products };
  return products;
}

export async function findProduct(
  baseUrl: string,
  slug: string,
  lang: Lang
): Promise<CatalogProduct | null> {
  const products = await loadCatalog(baseUrl);
  return (
    products.find((product) => product.slug === slug && product.lang === lang) ??
    products.find((product) => product.slug === slug) ??
    null
  );
}

export function isPurchasable(product: CatalogProduct): boolean {
  if (product.status === 'published') return true;
  return config.allowDemoOrders;
}
