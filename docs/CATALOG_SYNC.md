# Catalog sync — status and plan

## Why the catalog is seed data, not a live scrape

This project was built to redesign `yerbasdelabuena.com.ar` while keeping its
catalog intact. The build environment used to generate this codebase runs
behind an egress allowlist that only permits package registries
(npmjs.org, jsr.io, pypi.org, etc.) — direct requests to
`yerbasdelabuena.com.ar` are rejected at the network layer (`403` on the
CONNECT tunnel, confirmed via the proxy's own status endpoint). There was no
way to fetch a single page, image, or product listing from the source site
from inside this session.

Rather than leaving the storefront empty or hand-waving the data, the data
layer (`src/lib/data/`) ships with **37 representative products** across all
seven categories the source store carries (yerbas, mates, bombillas, termos,
alfajores, galletitas, accesorios), with realistic Argentine brands, pricing
in ARS, variants, stock states (including several `out_of_stock` and
`low_stock` items — deliberately, since the brief calls out not omitting
sold-out products), reviews, and FAQs. It's seed data for a real design and
architecture, not a mock of a mock.

## How to actually sync the real catalog

The storefront never imports product data directly — every page reads
through `src/lib/sync/adapter.ts`'s `CatalogSyncAdapter` interface. Today
`localSeedAdapter` backs it. To go live:

1. **Confirm the source platform.** Most Argentine stores of this shape run
   on Tiendanube (Nuvemshop) or a similar SaaS platform. Tiendanube
   storefronts expose a JSON listing (commonly paginated) and/or a
   `sitemap.xml` that enumerates every product URL, including out-of-stock
   ones — that sitemap is the reliable way to discover 100% of SKUs without
   missing any, rather than relying on category pages, which sometimes hide
   sold-out items.
2. **Read structured data per product**, not the rendered HTML. Product
   pages on these platforms almost always embed JSON-LD (`Product`, `Offer`,
   `AggregateRating`) or `og:*`/microdata tags with canonical price, SKU,
   images, and `availability` (`InStock`/`OutOfStock`/`LimitedAvailability`).
   Parsing that structured block is far more stable than scraping CSS
   selectors that change with every theme update.
3. **Normalize into this project's types** (`src/lib/types.ts`): map the
   source category taxonomy onto `CategorySlug`, dedupe/create `Brand`
   entries, and populate `ProductVariant[]` from the source's option/SKU
   matrix.
4. **Implement `remoteSourceAdapter.fetchAll()`** in
   `src/lib/sync/adapter.ts` with the logic above, then point
   `scripts/sync-catalog.ts`'s `activeAdapter` at it.
5. **Persist to a real datastore.** For production scale, swap the in-memory
   array for a Postgres table (or the CMS of choice) behind the same
   adapter interface, and run the sync on a schedule (cron/queue worker) so
   price and stock changes propagate automatically — see
   `docs/ARCHITECTURE.md` for the suggested schema.
6. **Images**: once reachable, download and re-host product photography on
   a CDN (or an image-optimization proxy) rather than hot-linking the source
   domain; swap `ProductArt` (the generative placeholder used throughout this
   codebase in its absence) for `next/image` pointed at the CDN URL — every
   image-consuming component already expects the same `aspect-square,
   object-cover` box, so this is a drop-in change.

## Real photos: what's in place today

Four categories (yerbas, mates, bombillas, alfajores) ship with a real,
freely-licensed photo (CC-BY-SA, sourced from Wikimedia Commons) applied as
the first gallery image across all their products — see
`CATEGORY_STOCK_PHOTOS` in `src/lib/data/products.ts`. These are **generic
representative photos**, not each brand's exact packaging: this environment's
network policy blocks the page-fetch tool too (confirmed 403 even on
Wikipedia), so there was no way to browse to a specific brand's product page
and verify an exact-match photo URL. Commons was usable specifically because
its `upload.wikimedia.org` file URLs are deterministic — computable from a
documented md5-hash-of-filename scheme — so the URL could be constructed and
trusted without needing to fetch-and-verify the page first.

Termos, galletitas, and accesorios don't have a confidently-relevant Commons
match and keep the generative placeholder. Every image gracefully falls back
to that placeholder if a URL 404s or fails to load (see `ProductArt`), so
this is a safe, low-risk improvement rather than an all-or-nothing bet.

For real per-product photography (each brand's actual packaging), use the
"URL de imagen principal" field in `/admin` — see `docs/ADMIN_PANEL.md`.

## Validating the data layer

`yarn sync:catalog` runs `scripts/sync-catalog.ts` against whichever
adapter is active, prints product/out-of-stock counts, and fails if it finds
duplicate slugs — a cheap sanity check to run in CI once a real adapter is
wired up.
