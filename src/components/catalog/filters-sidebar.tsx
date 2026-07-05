"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/data/categories";
import { brands } from "@/lib/data/brands";
import { formatPrice } from "@/lib/utils";
import type { Availability, CategorySlug } from "@/lib/types";

const AVAILABILITY_LABELS: Record<Availability, string> = {
  in_stock: "En stock",
  low_stock: "Últimas unidades",
  out_of_stock: "Sin stock",
};

export const PRICE_MIN = 0;
export const PRICE_MAX = 140000;

export interface CatalogFiltersState {
  categories: CategorySlug[];
  brands: string[];
  availability: Availability[];
  priceMin: number;
  priceMax: number;
}

export function FiltersSidebar({
  filters,
  onChange,
  onClear,
}: {
  filters: CatalogFiltersState;
  onChange: (patch: Partial<CatalogFiltersState>) => void;
  onClear: () => void;
}) {
  function toggle<T>(list: T[], value: T): T[] {
    return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-display text-base font-semibold text-forest-950">Filtros</h2>
        <Button variant="link" size="sm" onClick={onClear}>
          Limpiar
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["categoria", "marca", "precio", "disponibilidad"]}>
        <AccordionItem value="categoria">
          <AccordionTrigger>Categoría</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-3">
              {categories.map((c) => (
                <label key={c.slug} className="flex cursor-pointer items-center gap-2.5">
                  <Checkbox
                    checked={filters.categories.includes(c.slug)}
                    onCheckedChange={() => onChange({ categories: toggle(filters.categories, c.slug) })}
                  />
                  <span className="text-sm text-forest-900">{c.name}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="marca">
          <AccordionTrigger>Marca</AccordionTrigger>
          <AccordionContent>
            <div className="flex max-h-52 flex-col gap-3 overflow-y-auto pr-1">
              {brands.map((b) => (
                <label key={b.slug} className="flex cursor-pointer items-center gap-2.5">
                  <Checkbox
                    checked={filters.brands.includes(b.slug)}
                    onCheckedChange={() => onChange({ brands: toggle(filters.brands, b.slug) })}
                  />
                  <span className="text-sm text-forest-900">{b.name}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="precio">
          <AccordionTrigger>Precio</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4 px-1">
              <Slider
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={1000}
                value={[filters.priceMin, filters.priceMax]}
                onValueChange={([min, max]) => onChange({ priceMin: min!, priceMax: max! })}
              />
              <div className="flex items-center justify-between text-xs text-stone-600">
                <span>{formatPrice(filters.priceMin)}</span>
                <span>{formatPrice(filters.priceMax)}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="disponibilidad">
          <AccordionTrigger>Disponibilidad</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-3">
              {(Object.keys(AVAILABILITY_LABELS) as Availability[]).map((a) => (
                <label key={a} className="flex cursor-pointer items-center gap-2.5">
                  <Checkbox
                    checked={filters.availability.includes(a)}
                    onCheckedChange={() => onChange({ availability: toggle(filters.availability, a) })}
                  />
                  <span className="text-sm text-forest-900">{AVAILABILITY_LABELS[a]}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
