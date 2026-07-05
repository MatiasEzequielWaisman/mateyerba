"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { AutoGrid, AutoGridItem } from "@/components/shared/auto-grid";
import { ProductCard } from "@/components/product/product-card";
import { FiltersSidebar, PRICE_MIN, PRICE_MAX, type CatalogFiltersState } from "@/components/catalog/filters-sidebar";
import { ActiveFilters } from "@/components/catalog/active-filters";
import { SortSelect } from "@/components/catalog/sort-select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCatalogStore } from "@/lib/store/catalog-store";
import { getCategoryBySlug } from "@/lib/data/categories";
import { filterProducts, sortProducts } from "@/lib/data";
import type { Availability, CategorySlug, SortOption } from "@/lib/types";

function parseFilters(params: URLSearchParams): CatalogFiltersState {
  return {
    categories: (params.get("categoria")?.split(",").filter(Boolean) ?? []) as CategorySlug[],
    brands: params.get("marca")?.split(",").filter(Boolean) ?? [],
    availability: (params.get("disponibilidad")?.split(",").filter(Boolean) ?? []) as Availability[],
    priceMin: params.get("precioMin") ? Number(params.get("precioMin")) : PRICE_MIN,
    priceMax: params.get("precioMax") ? Number(params.get("precioMax")) : PRICE_MAX,
  };
}

export function CatalogView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const products = useCatalogStore((s) => s.products);

  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);
  const sort = (searchParams.get("orden") as SortOption | null) ?? "featured";
  const search = searchParams.get("q") ?? undefined;
  const onlyFeatured = searchParams.get("destacados") === "1";
  const onlyNew = searchParams.get("nuevo") === "1";
  const onlyBestSellers = searchParams.get("mas-vendidos") === "1";
  const onlyOnSale = searchParams.get("ofertas") === "1";

  const singleCategory = filters.categories.length === 1 ? getCategoryBySlug(filters.categories[0]!) : undefined;

  function updateParams(patch: Record<string, string | null>) {
    const next = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(patch)) {
      if (value == null || value === "") next.delete(key);
      else next.set(key, value);
    }
    router.push(`/catalogo${next.toString() ? `?${next}` : ""}`, { scroll: false });
  }

  function handleFiltersChange(patch: Partial<CatalogFiltersState>) {
    const merged = { ...filters, ...patch };
    updateParams({
      categoria: merged.categories.length ? merged.categories.join(",") : null,
      marca: merged.brands.length ? merged.brands.join(",") : null,
      disponibilidad: merged.availability.length ? merged.availability.join(",") : null,
      precioMin: merged.priceMin !== PRICE_MIN ? String(merged.priceMin) : null,
      precioMax: merged.priceMax !== PRICE_MAX ? String(merged.priceMax) : null,
    });
  }

  function handleClear() {
    router.push("/catalogo", { scroll: false });
  }

  const filtered = useMemo(() => {
    let base = filterProducts(products, {
      categories: filters.categories,
      brands: filters.brands,
      availability: filters.availability,
      priceMin: filters.priceMin > PRICE_MIN ? filters.priceMin : undefined,
      priceMax: filters.priceMax < PRICE_MAX ? filters.priceMax : undefined,
      search,
    });
    if (onlyFeatured) base = base.filter((p) => p.isFeatured);
    if (onlyNew) base = base.filter((p) => p.isNew);
    if (onlyBestSellers) base = base.filter((p) => p.isBestSeller);
    if (onlyOnSale) base = base.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price);
    return sortProducts(base, sort);
  }, [products, filters, search, sort, onlyFeatured, onlyNew, onlyBestSellers, onlyOnSale]);

  return (
    <div className="container py-10">
      <Breadcrumbs items={[{ label: singleCategory ? singleCategory.name : "Catálogo" }]} />

      <div className="mt-4 mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-display-sm font-semibold text-forest-950 md:text-display-md">
            {singleCategory ? singleCategory.name : search ? `Resultados para "${search}"` : "Todo el catálogo"}
          </h1>
          <p className="mt-2 text-sm text-stone-500">{filtered.length} productos</p>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <FiltersSidebar filters={filters} onChange={handleFiltersChange} onClear={handleClear} />
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 lg:hidden">
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <SlidersHorizontal className="h-4 w-4" /> Filtros
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filtros</SheetTitle>
                  </SheetHeader>
                  <div className="overflow-y-auto px-6 py-5">
                    <FiltersSidebar filters={filters} onChange={handleFiltersChange} onClear={handleClear} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <div className="ml-auto">
              <SortSelect value={sort} onChange={(value) => updateParams({ orden: value === "featured" ? null : value })} />
            </div>
          </div>

          <div className="mb-6">
            <ActiveFilters filters={filters} onChange={handleFiltersChange} />
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-stone-300 py-24 text-center">
              <p className="font-display text-lg font-semibold text-forest-950">No encontramos productos</p>
              <p className="text-sm text-stone-500">Probá ajustar los filtros o buscar otro término.</p>
              <Button variant="outline" onClick={handleClear}>
                Limpiar filtros
              </Button>
            </div>
          ) : (
            <AutoGrid className="gap-x-5 gap-y-10">
              {filtered.map((product) => (
                <AutoGridItem key={product.id} className="w-[calc((100%-1.25rem)/2)] md:w-[calc((100%-2.5rem)/3)]">
                  <ProductCard product={product} />
                </AutoGridItem>
              ))}
            </AutoGrid>
          )}
        </div>
      </div>
    </div>
  );
}
