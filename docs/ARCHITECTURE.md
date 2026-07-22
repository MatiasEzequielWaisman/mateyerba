# Architecture

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Radix UI primitives
(shadcn-style, hand-rolled) · Framer Motion · Zustand · TanStack React Query ·
Sonner (toasts).

## Folder structure

```
src/
  app/                     Routes (App Router)
    layout.tsx             Root layout: fonts, providers, header/footer, cart drawer
    page.tsx                Home
    catalogo/               Catalog (filters, sort)
    producto/[slug]/         Product detail
    checkout/                Checkout flow
    favoritos/, cuenta/       Wishlist, account stub
    contacto/, envios/, ...   Static/legal pages
    sitemap.ts, robots.ts     SEO plumbing
  components/
    ui/                     Design-system primitives (button, badge, sheet, dialog, ...)
    layout/                 Header, footer, mobile nav, cart drawer, search bar
    home/                   Hero, category grid, product rail, brand strip, ...
    catalog/                Filters sidebar, sort select, catalog view
    product/                Card, gallery, purchase panel, reviews, FAQ
    checkout/               Step flow, order summary
    shared/                 Breadcrumbs, section heading, static page shell
    seo/                    JSON-LD helpers
    providers/              React Query provider
  lib/
    types.ts                 Domain types (Product, Category, Brand, ...)
    data/                     Seed catalog + query/filter/sort helpers
    sync/                     CatalogSyncAdapter interface + local/remote adapters
    store/                    Zustand stores (cart, wishlist)
    utils.ts                  cn(), price/installment formatting
scripts/
  sync-catalog.ts             CLI entry for catalog sync/validation
docs/
  DESIGN_SYSTEM.md, ARCHITECTURE.md, CATALOG_SYNC.md
```

## Data flow

Every page reads product/category/brand data from `src/lib/data/*`, which is
backed by `CatalogSyncAdapter` (`src/lib/sync/adapter.ts`). No component
imports the seed JSON directly except the data layer itself — swapping the
seed for a real database/API means implementing one adapter and changing one
import, not touching UI code. See `docs/CATALOG_SYNC.md` for the concrete
migration plan.

Client-side state (cart, wishlist) lives in Zustand stores with
`persist` (localStorage), so a refresh doesn't lose the cart. React Query is
wired up via `QueryProvider` for future use once product/catalog data moves
behind a real HTTP API (today everything is synchronous local data, so
nothing calls `useQuery` yet — the provider exists so adding, say, a "recently
viewed" or "live stock" endpoint later doesn't require re-plumbing the app).

## Rendering strategy

- Home and product detail pages are server components (`generateStaticParams`
  on the product route pre-renders every product at build time).
- The catalog page is client-rendered (`useSearchParams`/`useRouter` drive
  filter state through the URL, so filters are shareable/bookmarkable links,
  e.g. `/catalogo?categoria=yerbas&orden=price_asc`), wrapped in `<Suspense>`
  with a skeleton fallback per Next's requirement for `useSearchParams`.
- Checkout and cart are fully client-side; this repo has no payment gateway
  wired up (see "What's stubbed" below).

## What's stubbed vs. production-ready

Production-ready: design system, component architecture, SEO plumbing
(metadata, sitemap, robots, JSON-LD), catalog filtering/sorting, cart/wishlist
persistence, responsive layout, accessibility baseline.

Intentionally stubbed (flagged in code comments where relevant):
- **Catalog data** is realistic seed data, not a live feed — see
  `docs/CATALOG_SYNC.md`.
- **Product photography** is generative placeholder art
  (`components/product/product-art.tsx`), not real photos.
- **Checkout** collects shipping/payment info and shows a confirmation, but
  does not call a real payment gateway (Mercado Pago, Stripe, etc.) or create
  a persisted order — wiring that up is the next milestone once a backend/DB
  is chosen.
- **Auth** (`/cuenta`) is a static form; no session/JWT handling.

## Scaling from here

1. **Backend**: introduce a database (Postgres via Prisma/Drizzle is a
   natural fit) with `products`, `variants`, `categories`, `brands`, `orders`
   tables mirroring `src/lib/types.ts`; expose it through Next.js Route
   Handlers under `app/api/*` and have `remoteSourceAdapter` (or a new
   `dbAdapter`) read from it instead of the in-memory seed.
2. **Catalog sync**: run `scripts/sync-catalog.ts` (or its future
   `remoteSourceAdapter`) on a schedule (cron/queue) once the source site or
   a real supplier feed is reachable.
3. **Search**: swap the client-side `filterProducts`/`sortProducts` for a
   real search index (Algolia/Meilisearch/Postgres full-text) once the
   catalog outgrows in-memory filtering (hundreds to low-thousands of SKUs is
   the practical ceiling for the current approach).
4. **Payments**: integrate Mercado Pago (dominant in AR) and/or Stripe behind
   the existing `checkout-flow.tsx` step structure — the UI steps
   (envío → pago → confirmación) already match a typical payment-gateway
   redirect/webhook flow.
5. **Images**: once real photography is available, host it on a CDN and
   swap `ProductArt` for `next/image` per `docs/DESIGN_SYSTEM.md`.
6. **i18n**: copy is Spanish (Argentina) throughout; if expanding to other
   locales, extract strings into a dictionary and use `next-intl` or the
   App Router's built-in i18n routing.
