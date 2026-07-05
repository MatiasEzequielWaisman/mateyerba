import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/lib/data/products";
import { getCategoryBySlug } from "@/lib/data/categories";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ProductGallery } from "@/components/product/product-gallery";
import { PurchasePanel } from "@/components/product/purchase-panel";
import { ReviewsSection } from "@/components/product/reviews-section";
import { FaqSection } from "@/components/product/faq-section";
import { ProductRail } from "@/components/home/product-rail";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

const SITE_URL = "https://www.yerbasdelabuena.com.ar";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      url: `${SITE_URL}/producto/${product.slug}`,
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const category = getCategoryBySlug(product.categorySlug);
  const related = product.relatedSlugs.map((slug) => getProductBySlug(slug)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="container py-10">
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: category?.name ?? "Catálogo", url: `${SITE_URL}/catalogo?categoria=${product.categorySlug}` },
          { name: product.name, url: `${SITE_URL}/producto/${product.slug}` },
        ]}
      />

      <Breadcrumbs
        items={[
          { label: category?.name ?? "Catálogo", href: `/catalogo?categoria=${product.categorySlug}` },
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} />
        <PurchasePanel product={product} />
      </div>

      <div className="mt-16">
        <Tabs defaultValue="descripcion">
          <TabsList>
            <TabsTrigger value="descripcion">Descripción</TabsTrigger>
            <TabsTrigger value="opiniones">Opiniones ({product.reviewCount})</TabsTrigger>
            <TabsTrigger value="faq">Preguntas frecuentes</TabsTrigger>
          </TabsList>
          <TabsContent value="descripcion">
            <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-stone-700">
              <p>{product.description}</p>
              <ul className="grid grid-cols-2 gap-3 text-xs text-stone-500 sm:grid-cols-3">
                {product.weightGrams && <li>Peso: {product.weightGrams} g</li>}
                {product.origin && <li>Origen: {product.origin}</li>}
                <li>SKU: {product.variants[0]?.sku}</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="opiniones">
            <ReviewsSection rating={product.rating} reviewCount={product.reviewCount} reviews={product.reviews} />
          </TabsContent>
          <TabsContent value="faq">
            <FaqSection faqs={product.faqs} />
          </TabsContent>
        </Tabs>
      </div>

      {related.length > 0 && (
        <div className="mt-8 border-t border-stone-200">
          <ProductRail eyebrow="Combiná bien con" title="Productos relacionados" products={related} />
        </div>
      )}
    </div>
  );
}
