# Panel de administración (`/admin`)

## Qué es

Un panel para gestionar el catálogo como "dueño de tienda": dashboard con
métricas (productos totales, sin stock, destacados, valor de inventario),
listado con búsqueda y filtro por categoría, y formularios de alta/edición
con precio, stock, disponibilidad, variantes y flags (nuevo/destacado/más
vendido/envío gratis).

Acceso: enlace "Admin" al pie del sitio, o directo en `/admin`.
Contraseña demo: `yerbas-admin-2026` (ver limitaciones más abajo).

## Cómo funciona (y sus límites, importante)

Este proyecto no tiene backend ni base de datos — todo el catálogo vive en
`src/lib/data/products.ts` como datos estáticos. El panel de administración
no cambia eso: en lugar de escribir a un servidor, guarda las ediciones en
un store de Zustand persistido en `localStorage` del navegador
(`src/lib/store/catalog-store.ts`), seedeado con el catálogo estático.

Esto significa:

- **Los cambios son locales a ese navegador.** Si editás un producto desde
  tu laptop, no se replican a otra computadora ni a otros visitantes del
  sitio — es una demo de la interfaz de gestión, no un CMS multi-usuario.
- **Las páginas de producto estáticas** (`/producto/[slug]`, generadas en
  build time vía `generateStaticParams` para SEO) muestran la galería,
  descripción, reseñas y FAQ del catálogo de build. El panel de compra
  (`PurchasePanel`) sí lee el store en vivo, así que precio/stock/badges
  editados se ven reflejados ahí sin rebuild; pero un rebuild + redeploy
  (o una migración a backend real) es necesario para que nombre/descripción
  cambien en el HTML servido a buscadores.
- **La autenticación es solo una gate de UI**, no seguridad real: la
  contraseña vive en el bundle de JavaScript del cliente
  (`src/lib/store/admin-auth-store.ts`) y la validación corre en el
  navegador. Cualquiera con acceso a devtools puede leerla o simplemente
  setear `isAdmin: true` en localStorage. **No usar así en producción.**

## Qué se puede hacer

- Ver métricas generales (`/admin`).
- Buscar/filtrar productos por nombre, marca o categoría (`/admin/productos`).
- Editar un producto existente: nombre, marca, categoría, descripciones,
  precio, precio de oferta, stock, disponibilidad, flags y variantes
  (`/admin/productos/[slug]`).
- Eliminar un producto del catálogo (con confirmación).
- Crear un producto nuevo (`/admin/productos/nuevo`) — se generan
  automáticamente imágenes placeholder, reseñas y FAQ genéricas de su
  categoría vía la misma fábrica que usa el catálogo semilla
  (`src/lib/data/product-factory.ts`).
- Restablecer todo a los datos originales desde el botón "Restablecer
  datos" en el panel.

## Camino a producción real

1. **Backend + base de datos**: mover `Product`/`Category`/`Brand` a tablas
   reales (Postgres vía Prisma/Drizzle, según lo planteado en
   `docs/ARCHITECTURE.md`) y exponerlas vía Route Handlers (`app/api/admin/*`).
2. **Auth real**: reemplazar `admin-auth-store.ts` por sesiones de servidor
   (NextAuth/Auth.js, JWT firmado, o el proveedor de identidad que se elija),
   con el gate de `/admin/layout.tsx` verificando esa sesión en el servidor,
   no en el cliente.
3. **Store → API**: cambiar `useCatalogStore` para que sus acciones
   (`updateProduct`, `deleteProduct`, `addProduct`) llamen a esos endpoints
   en vez de mutar `localStorage`, con React Query (ya está provisto por
   `QueryProvider`) para cache/invalidación.
4. **Imágenes**: agregar subida real de fotos (S3/Cloudinary/similar) para
   reemplazar `ProductArt`, el placeholder generativo usado en toda la
   tienda.
