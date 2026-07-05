"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Pencil, Trash2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ProductArt } from "@/components/product/product-art";
import { useCatalogStore } from "@/lib/store/catalog-store";
import { categories } from "@/lib/data/categories";
import { getBrandBySlug } from "@/lib/data/brands";
import { formatPrice } from "@/lib/utils";
import type { CategorySlug } from "@/lib/types";

export function ProductsTable() {
  const products = useCatalogStore((s) => s.products);
  const deleteProduct = useCatalogStore((s) => s.deleteProduct);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategorySlug | "all">("all");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category !== "all" && p.categorySlug !== category) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        if (!p.name.toLowerCase().includes(q) && !(getBrandBySlug(p.brandSlug)?.name.toLowerCase().includes(q))) {
          return false;
        }
      }
      return true;
    });
  }, [products, search, category]);

  function handleDelete(slug: string, name: string) {
    if (confirm(`¿Eliminar "${name}" del catálogo?`)) {
      deleteProduct(slug);
      toast.success(`${name} eliminado`);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-display-sm font-semibold text-forest-950">Productos</h1>
          <p className="mt-1 text-sm text-stone-500">{filtered.length} de {products.length} productos</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o marca…"
            className="pl-11"
          />
        </div>
        <Select value={category} onValueChange={(v) => setCategory(v as CategorySlug | "all")}>
          <SelectTrigger className="w-full sm:w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.slug} value={c.slug}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto rounded-lg border border-stone-200 bg-cream-50 shadow-soft">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-stone-200 bg-cream-100 text-xs uppercase tracking-wide text-stone-500">
            <tr>
              <th className="px-4 py-3 font-medium">Producto</th>
              <th className="px-4 py-3 font-medium">Categoría</th>
              <th className="px-4 py-3 font-medium">Precio</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {filtered.map((p) => (
              <tr key={p.slug} className="align-middle">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md">
                      <ProductArt placeholder={p.images[0]?.placeholder ?? ""} />
                    </div>
                    <div>
                      <p className="font-medium text-forest-950">{p.name}</p>
                      <p className="text-xs text-stone-500">{getBrandBySlug(p.brandSlug)?.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-stone-600">{categories.find((c) => c.slug === p.categorySlug)?.name}</td>
                <td className="px-4 py-3 font-medium text-forest-950">{formatPrice(p.price)}</td>
                <td className="px-4 py-3 text-stone-600">{p.stock}</td>
                <td className="px-4 py-3">
                  {p.availability === "out_of_stock" && <Badge variant="outOfStock">Sin stock</Badge>}
                  {p.availability === "low_stock" && <Badge variant="sale">Últimas unidades</Badge>}
                  {p.availability === "in_stock" && <Badge variant="freeShipping">En stock</Badge>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/productos/${p.slug}`}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-forest-800 transition hover:bg-forest-900/5"
                      aria-label={`Editar ${p.name}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(p.slug, p.name)}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-destructive transition hover:bg-destructive/10"
                      aria-label={`Eliminar ${p.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-stone-500">
                  No se encontraron productos con esos filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
