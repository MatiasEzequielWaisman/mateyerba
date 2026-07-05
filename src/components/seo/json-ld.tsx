import type { Product } from "@/lib/types";
import { getBrandBySlug } from "@/lib/data/brands";

const SITE_URL = "https://www.yerbasdelabuena.com.ar";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Yerbas de la Buena",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: ["https://www.instagram.com/", "https://www.facebook.com/"],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function ProductJsonLd({ product }: { product: Product }) {
  const brand = getBrandBySlug(product.brandSlug);
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    sku: product.variants[0]?.sku,
    brand: brand ? { "@type": "Brand", name: brand.name } : undefined,
    aggregateRating:
      product.reviewCount > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          }
        : undefined,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/producto/${product.slug}`,
      priceCurrency: "ARS",
      price: product.price,
      availability:
        product.availability === "out_of_stock"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
