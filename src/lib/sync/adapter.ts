import type { Product } from "@/lib/types";
import { products as seedProducts } from "@/lib/data/products";

/**
 * Contract every catalog source must implement. The storefront only ever talks
 * to this interface — swapping the seed data for a live feed from the source
 * store means writing one new adapter, not touching UI code.
 */
export interface CatalogSyncAdapter {
  /** Human readable id shown in sync logs/dashboards. */
  id: string;
  fetchAll(): Promise<Product[]>;
}

/**
 * Default adapter: ships with this repo so the storefront runs standalone.
 * See docs/CATALOG_SYNC.md for why this exists instead of a live scrape.
 */
export const localSeedAdapter: CatalogSyncAdapter = {
  id: "local-seed",
  async fetchAll() {
    return seedProducts;
  },
};

/**
 * Placeholder for the real integration. Most Argentine storefronts of this
 * kind run on Tiendanube/Nube or a similar platform exposing a storefront
 * JSON API (commonly `/products.json` with pagination) plus per-product
 * pages that carry structured data (JSON-LD `Product`/`Offer`). A real
 * implementation would:
 *
 *   1. Paginate the storefront product listing endpoint (or sitemap.xml)
 *      until it stops returning new items — this is how every product,
 *      including out-of-stock ones, is discovered without omissions.
 *   2. For each product, read the JSON-LD/microdata block for canonical
 *      price, SKU, images, and `availability` (InStock/OutOfStock).
 *   3. Normalize categories/brands to this project's `CategorySlug`/`Brand`
 *      types and upsert into the database (see docs/CATALOG_SYNC.md).
 *   4. Run on a schedule (cron/queue) so stock and pricing stay current.
 *
 * This adapter is intentionally unimplemented: fetching the reference site
 * from this environment is blocked by network policy (only package
 * registries are reachable), so there is nothing to scrape from here. Wiring
 * it up is a matter of implementing `fetchAll()` below once run from an
 * environment with access to the source domain, and swapping
 * `activeAdapter` in `scripts/sync-catalog.ts`.
 */
export const remoteSourceAdapter: CatalogSyncAdapter = {
  id: "remote-source (not yet implemented)",
  async fetchAll() {
    throw new Error(
      "remoteSourceAdapter.fetchAll() is not implemented — see docs/CATALOG_SYNC.md for the integration plan."
    );
  },
};
