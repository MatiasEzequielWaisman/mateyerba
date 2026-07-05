"use client";

import Link from "next/link";
import { useCatalogStore } from "@/lib/store/catalog-store";
import { ProductForm } from "@/components/admin/product-form";

export function EditProductView({ slug }: { slug: string }) {
  const product = useCatalogStore((s) => s.products.find((p) => p.slug === slug));

  if (!product) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="font-display text-lg font-semibold text-forest-950">Producto no encontrado</p>
        <p className="text-sm text-stone-500">Puede que ya haya sido eliminado.</p>
        <Link href="/admin/productos" className="text-sm font-medium text-forest-800 underline-offset-4 hover:underline">
          Volver a productos
        </Link>
      </div>
    );
  }

  return <ProductForm product={product} />;
}
