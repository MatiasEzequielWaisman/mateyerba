import { Hero } from "@/components/home/hero";
import { CategoryGrid } from "@/components/home/category-grid";
import { ProductRail } from "@/components/home/product-rail";
import { BrandStrip } from "@/components/home/brand-strip";
import { Benefits } from "@/components/home/benefits";
import { PromoBanner } from "@/components/home/promo-banner";
import { Newsletter } from "@/components/home/newsletter";
import { InstagramFeed } from "@/components/home/instagram-feed";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <CategoryGrid />
      <ProductRail
        eyebrow="Selección premium"
        title="Productos destacados"
        description="Lo mejor de nuestro catálogo, elegido por su calidad excepcional."
        filter="featured"
        cta={{ label: "Ver todos los destacados", href: "/catalogo?destacados=1" }}
      />
      <PromoBanner />
      <ProductRail eyebrow="Recién llegados" title="Novedades" filter="new" cta={{ label: "Ver novedades", href: "/catalogo?nuevo=1" }} />
      <ProductRail
        eyebrow="Los favoritos"
        title="Más vendidos"
        filter="bestseller"
        cta={{ label: "Ver más vendidos", href: "/catalogo?mas-vendidos=1" }}
      />
      <ProductRail
        eyebrow="Aprovechá"
        title="Ofertas de la semana"
        filter="onsale"
        cta={{ label: "Ver todas las ofertas", href: "/catalogo?ofertas=1" }}
      />
      <BrandStrip />
      <InstagramFeed />
      <Newsletter />
    </>
  );
}
