import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog/catalog-view";
import { CatalogSkeleton } from "@/components/catalog/catalog-skeleton";

export const metadata: Metadata = {
  title: "Catálogo completo",
  description:
    "Explorá yerbas, mates, bombillas, termos, alfajores, galletitas y accesorios. Filtrá por marca, precio, categoría y disponibilidad.",
};

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="container py-10"><CatalogSkeleton /></div>}>
      <CatalogView />
    </Suspense>
  );
}
