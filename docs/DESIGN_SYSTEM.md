# Design system — Yerbas de la Buena

A premium, nature-inspired design system built for conversion and calm. Full
tokens live in `tailwind.config.ts`; this doc explains the reasoning so the
system scales consistently as the product grows.

## Color

| Token | Role | Example |
|---|---|---|
| `forest.900/950` | Primary text, primary buttons, header/footer backgrounds | `#142B23` / `#0C1B16` |
| `forest.50–800` | Primary brand scale (hero gradients, category tiles, links) | |
| `olive.*` | Secondary brand accent — badges, secondary CTAs, brand strip | |
| `cream.50–300` | Base page background, card surfaces | `#FAF6EC` |
| `beige.100–400` | Secondary neutral surface (brand strip, category art) | |
| `gold.*` | Accent — sale badges, promo banner, primary highlight actions | `#C08A4E` |
| `stone.*` | Neutral text/border scale (cool gray, not pure gray) | |
| `destructive` | Errors, remove actions | `#B3402C` |

Rule of thumb: **forest for trust and primary actions, gold for urgency and
highlights, olive/beige/cream for calm neutral space.** Never use gold for
more than one focal element per screen — it loses impact otherwise.

## Typography

- **Display / headings** — Manrope (`font-display`), semibold, tight tracking
  (`-0.01em` to `-0.02em` at large sizes). Used for all `h1`–`h3` and product
  names.
- **Body / UI** — Inter (`font-sans`), regular/medium. Used for paragraphs,
  labels, buttons, form fields.
- Type scale (`display-sm` → `display-2xl`) is defined in
  `tailwind.config.ts` under `fontSize`, tuned so the hero headline reads
  confidently at `display-xl`/`display-2xl` while section headings stay at
  `display-sm`/`display-md`.

## Spacing & layout

- Base spacing follows Tailwind's default 4px scale, extended with `18`,
  `22`, `30` (`4.5rem`/`5.5rem`/`7.5rem`) for the generous section padding
  premium sites use (`py-16`–`py-24` between major sections).
  Container padding widens progressively (`1.25rem` → `2.5rem`) so content
  never feels cramped against the viewport edge on large screens.
- Corner radii scale from `xs` (0.25rem, inputs) to `2xl` (2rem, hero
  panels), with a `pill` token for fully-rounded buttons/badges.

## Elevation

Four shadow tokens (`soft`, `card`, `elevated`, `premium`) use a warm
forest-tinted shadow color (`rgb(20 43 35 / …)`) instead of pure black, so
elevation reads as depth rather than a harsh drop shadow — consistent with
the "quality premium" brief.

## Motion

- Global easing curve: `cubic-bezier(0.22, 1, 0.36, 1)` (`ease-premium`) —
  used across Framer Motion transitions, Tailwind transitions, and Radix
  primitives for a consistent "settle" feel.
- Framer Motion handles content reveals (`ProductCard` fade/slide-in on
  scroll, checkout step transitions). Tailwind's `animate-*` utilities (plus
  `tailwindcss-animate` for Radix state transitions) handle discrete
  open/close state changes (dialogs, sheets, accordions) to avoid shipping
  Framer Motion for things CSS already does well.

## Components

All primitives live in `src/components/ui/` (button, badge, card, input,
select, checkbox, slider, tabs, accordion, sheet/drawer, dialog, skeleton,
toaster) built on Radix UI primitives + `class-variance-authority` for
variants — the same pattern shadcn/ui popularized, hand-rolled here to avoid
a CLI dependency in this environment.

Domain components layer on top:
- `components/product/*` — card, gallery, badges, price, rating, quick view,
  purchase panel, reviews, FAQ.
- `components/catalog/*` — filters sidebar, sort, active filter pills,
  skeleton grid.
- `components/layout/*` — header, mobile nav, footer, cart drawer.
- `components/checkout/*` — step flow, order summary.

## Product imagery placeholder

Real product photography could not be fetched in this environment (see
`docs/CATALOG_SYNC.md`). `components/product/product-art.tsx` renders
deterministic, category-tinted generative artwork (gradient + icon) instead
of a broken `<img>` or a generic gray box, so every screen still reads as
"designed" rather than "unfinished." It exposes the same
`aspect-square`/`object-cover` box every image-consuming component expects,
so swapping in `next/image` + real CDN photography later is a one-line change
per component, not a redesign.

## Accessibility

- Visible focus rings (`:focus-visible`) tuned to the forest palette, not the
  browser default blue, so the ring survives on cream backgrounds.
- Skip-to-content link (`.skip-link`) at the top of `RootLayout`.
- All interactive icons carry `aria-label`; toggles use `aria-pressed`;
  quantity/step controls announce via `aria-live`.
- Color is never the only signal — badges pair color with text (e.g. "Sin
  stock" badge, not just gray).
