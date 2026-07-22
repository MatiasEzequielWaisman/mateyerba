import type { MetadataRoute } from "next";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";

const SITE_URL = "https://www.negociodemate.com.ar";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/catalogo",
    "/favoritos",
    "/preguntas-frecuentes",
    "/envios",
    "/cambios-y-devoluciones",
    "/contacto",
    "/terminos",
    "/privacidad",
    "/cookies",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${SITE_URL}/catalogo?categoria=${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  const productRoutes = products.map((p) => ({
    url: `${SITE_URL}/producto/${p.slug}`,
    lastModified: p.syncedAt,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
