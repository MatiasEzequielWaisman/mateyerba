# Yerbas de la Buena — rediseño premium

Rediseño completo del ecommerce de yerbas, mates y accesorios, con una
identidad visual nueva (verde bosque, oliva, crema y acentos dorados),
construido en Next.js 14 + TypeScript + Tailwind CSS.

> **Sobre el catálogo:** el entorno donde se generó este proyecto no tiene
> acceso de red al sitio original (`yerbasdelabuena.com.ar`) — solo a
> registros de paquetes (npm/yarn, etc.), confirmado contra la política de red del
> proxy. Por eso el catálogo incluido es un set de datos representativo (37
> productos reales del rubro: yerbas, mates, bombillas, termos, alfajores,
> galletitas y accesorios, con stock, variantes y marcas argentinas),
> preparado detrás de una capa de sincronización (`src/lib/sync/adapter.ts`)
> lista para conectarse al catálogo real apenas se ejecute desde un entorno
> con acceso al sitio de origen. El plan de migración está en
> [`docs/CATALOG_SYNC.md`](./docs/CATALOG_SYNC.md).

## Empezar

```bash
yarn install
yarn dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Qué hace |
|---|---|
| `yarn dev` | Servidor de desarrollo |
| `yarn build` | Build de producción |
| `yarn start` | Sirve el build de producción |
| `yarn lint` | ESLint (config `next/core-web-vitals`) |
| `yarn typecheck` | `tsc --noEmit` |
| `yarn sync:catalog` | Valida la capa de datos del catálogo (ver `scripts/sync-catalog.ts`) |

## Documentación

- [`docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md) — tokens de color,
  tipografía, espaciado, elevación, motion y componentes.
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — estructura de carpetas,
  flujo de datos, estrategia de renderizado y roadmap de escalabilidad.
- [`docs/CATALOG_SYNC.md`](./docs/CATALOG_SYNC.md) — por qué el catálogo es
  data de referencia y cómo conectar el sitio real.
- [`docs/ADMIN_PANEL.md`](./docs/ADMIN_PANEL.md) — alcance y límites del
  panel de administración, y el camino a un backend real.

## Funcionalidades principales

- **Home**: hero, buscador, categorías, destacados, novedades, más vendidos,
  ofertas, marcas, beneficios, banner promocional, newsletter, feed de
  Instagram.
- **Catálogo** (`/catalogo`): filtros por categoría/marca/precio/disponibilidad
  sincronizados con la URL, orden (destacados, más vendidos, precio,
  recientes), quick view, favoritos, badges (oferta/nuevo/sin stock/envío
  gratis).
- **Ficha de producto** (`/producto/[slug]`): galería con zoom, variantes,
  cuotas, stock, compra inmediata, wishlist, compartir, opiniones, FAQ y
  relacionados.
- **Carrito**: drawer lateral con cantidad editable, cupón, envío gratis
  progresivo y sugeridos.
- **Checkout** (`/checkout`): flujo de 3 pasos (envío → pago → confirmación).
- **SEO**: metadata por página, JSON-LD (`Organization`, `Product`,
  `BreadcrumbList`), `sitemap.xml`, `robots.txt`.
- **Panel de administración** (`/admin`): dashboard, gestión de productos y
  stock (alta/edición/baja) para el dueño de la tienda. Es una demo de
  interfaz sin backend — ver [`docs/ADMIN_PANEL.md`](./docs/ADMIN_PANEL.md)
  para el alcance real y el camino a producción.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Radix UI · Framer
Motion · Zustand · TanStack React Query · Sonner.
