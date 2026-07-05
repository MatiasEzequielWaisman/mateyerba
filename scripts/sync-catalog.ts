/**
 * CLI entry point for catalog synchronization.
 *
 * Run with `npm run sync:catalog`. Today this only validates the local seed
 * adapter (useful in CI to make sure the data layer stays well-formed); once
 * `remoteSourceAdapter` is implemented (see src/lib/sync/adapter.ts and
 * docs/CATALOG_SYNC.md), swap the `activeAdapter` below to point at it.
 */
import { localSeedAdapter, type CatalogSyncAdapter } from "../src/lib/sync/adapter";

const activeAdapter: CatalogSyncAdapter = localSeedAdapter;

async function main() {
  console.log(`Running catalog sync with adapter: ${activeAdapter.id}`);
  const products = await activeAdapter.fetchAll();

  const slugs = new Set<string>();
  const duplicates: string[] = [];
  for (const product of products) {
    if (slugs.has(product.slug)) duplicates.push(product.slug);
    slugs.add(product.slug);
  }

  const outOfStock = products.filter((p) => p.availability === "out_of_stock").length;

  console.log(`Products found: ${products.length}`);
  console.log(`Out of stock:   ${outOfStock}`);
  console.log(`Duplicates:     ${duplicates.length}${duplicates.length ? ` (${duplicates.join(", ")})` : ""}`);

  if (duplicates.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
