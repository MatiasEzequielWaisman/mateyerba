"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useCatalogStore } from "@/lib/store/catalog-store";
import { createProduct as buildProduct } from "@/lib/data/product-factory";
import { categories } from "@/lib/data/categories";
import { brands } from "@/lib/data/brands";
import type { Availability, CategorySlug, Product } from "@/lib/types";

const AVAILABILITY_OPTIONS: { value: Availability; label: string }[] = [
  { value: "in_stock", label: "En stock" },
  { value: "low_stock", label: "Últimas unidades" },
  { value: "out_of_stock", label: "Sin stock" },
];

interface VariantRow {
  id?: string;
  label: string;
  stock: number;
  availability: Availability;
}

interface FormState {
  name: string;
  brandSlug: string;
  categorySlug: CategorySlug;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice: number | "";
  stock: number;
  availability: Availability;
  freeShipping: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  variants: VariantRow[];
}

function toFormState(product?: Product): FormState {
  if (!product) {
    return {
      name: "",
      brandSlug: brands[0]!.slug,
      categorySlug: categories[0]!.slug,
      shortDescription: "",
      description: "",
      price: 0,
      compareAtPrice: "",
      stock: 0,
      availability: "in_stock",
      freeShipping: false,
      isNew: true,
      isBestSeller: false,
      isFeatured: false,
      variants: [{ label: "Único", stock: 0, availability: "in_stock" }],
    };
  }
  return {
    name: product.name,
    brandSlug: product.brandSlug,
    categorySlug: product.categorySlug,
    shortDescription: product.shortDescription,
    description: product.description,
    price: product.price,
    compareAtPrice: product.compareAtPrice ?? "",
    stock: product.stock,
    availability: product.availability,
    freeShipping: product.freeShipping,
    isNew: product.isNew,
    isBestSeller: product.isBestSeller,
    isFeatured: product.isFeatured,
    variants: product.variants.map((v) => ({ id: v.id, label: v.label, stock: v.stock, availability: v.availability })),
  };
}

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const addProduct = useCatalogStore((s) => s.addProduct);
  const updateProduct = useCatalogStore((s) => s.updateProduct);
  const [form, setForm] = useState<FormState>(() => toFormState(product));
  const isEdit = Boolean(product);

  function updateVariantRow(index: number, patch: Partial<VariantRow>) {
    setForm((f) => ({ ...f, variants: f.variants.map((v, i) => (i === index ? { ...v, ...patch } : v)) }));
  }

  function addVariantRow() {
    setForm((f) => ({ ...f, variants: [...f.variants, { label: "", stock: 0, availability: "in_stock" }] }));
  }

  function removeVariantRow(index: number) {
    setForm((f) => ({ ...f, variants: f.variants.filter((_, i) => i !== index) }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (isEdit && product) {
      updateProduct(product.slug, {
        name: form.name,
        brandSlug: form.brandSlug,
        categorySlug: form.categorySlug,
        shortDescription: form.shortDescription,
        description: form.description,
        price: form.price,
        compareAtPrice: form.compareAtPrice === "" ? undefined : Number(form.compareAtPrice),
        stock: form.stock,
        availability: form.availability,
        freeShipping: form.freeShipping,
        isNew: form.isNew,
        isBestSeller: form.isBestSeller,
        isFeatured: form.isFeatured,
        variants: form.variants.map((v, i) => ({
          id: v.id ?? `${product.slug}-var-${i}`,
          label: v.label,
          stock: v.stock,
          availability: v.availability,
          sku: product.variants[i]?.sku ?? `YDB-${product.slug.toUpperCase().slice(0, 6)}-${i + 1}`,
        })),
      });
      toast.success(`${form.name} actualizado`);
      router.push("/admin/productos");
      return;
    }

    const newProduct = buildProduct({
      name: form.name,
      brandSlug: form.brandSlug,
      categorySlug: form.categorySlug,
      price: form.price,
      compareAtPrice: form.compareAtPrice === "" ? undefined : Number(form.compareAtPrice),
      availability: form.availability,
      stock: form.stock,
      isNew: form.isNew,
      isBestSeller: form.isBestSeller,
      isFeatured: form.isFeatured,
      freeShipping: form.freeShipping,
      shortDescription: form.shortDescription,
      description: form.description,
      variants: form.variants.map((v) => ({ label: v.label, stock: v.stock, availability: v.availability })),
    });
    addProduct(newProduct);
    toast.success(`${form.name} creado`);
    router.push("/admin/productos");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-display-sm font-semibold text-forest-950">
          {isEdit ? `Editar ${product!.name}` : "Nuevo producto"}
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          {isEdit
            ? "Los cambios se reflejan al instante en el catálogo y home de este navegador."
            : "El producto se agrega al catálogo con imágenes, reseñas y FAQ genéricas de su categoría."}
        </p>
      </div>

      <section className="grid gap-4 rounded-lg border border-stone-200 bg-cream-50 p-6 shadow-soft sm:grid-cols-2">
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Marca</Label>
          <Select value={form.brandSlug} onValueChange={(v) => setForm((f) => ({ ...f, brandSlug: v }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {brands.map((b) => (
                <SelectItem key={b.slug} value={b.slug}>
                  {b.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Categoría</Label>
          <Select value={form.categorySlug} onValueChange={(v) => setForm((f) => ({ ...f, categorySlug: v as CategorySlug }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.slug} value={c.slug}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="shortDescription">Descripción corta</Label>
          <Input
            id="shortDescription"
            required
            value={form.shortDescription}
            onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))}
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="description">Descripción completa</Label>
          <textarea
            id="description"
            required
            rows={4}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="w-full rounded-md border border-stone-300 bg-cream-50 px-4 py-3 text-sm text-forest-900 placeholder:text-stone-400 focus-visible:border-forest-600"
          />
        </div>
      </section>

      <section className="grid gap-4 rounded-lg border border-stone-200 bg-cream-50 p-6 shadow-soft sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="price">Precio</Label>
          <Input
            id="price"
            type="number"
            min={0}
            required
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="compareAtPrice">Precio anterior (oferta)</Label>
          <Input
            id="compareAtPrice"
            type="number"
            min={0}
            value={form.compareAtPrice}
            onChange={(e) => setForm((f) => ({ ...f, compareAtPrice: e.target.value === "" ? "" : Number(e.target.value) }))}
            placeholder="Opcional"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="stock">Stock total</Label>
          <Input
            id="stock"
            type="number"
            min={0}
            required
            value={form.stock}
            onChange={(e) => setForm((f) => ({ ...f, stock: Number(e.target.value) }))}
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-3">
          <Label>Disponibilidad</Label>
          <Select value={form.availability} onValueChange={(v) => setForm((f) => ({ ...f, availability: v as Availability }))}>
            <SelectTrigger className="sm:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {AVAILABILITY_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-6 sm:col-span-3">
          {(
            [
              { key: "freeShipping", label: "Envío gratis" },
              { key: "isNew", label: "Nuevo" },
              { key: "isBestSeller", label: "Más vendido" },
              { key: "isFeatured", label: "Destacado" },
            ] as const
          ).map((flag) => (
            <label key={flag.key} className="flex cursor-pointer items-center gap-2.5">
              <Checkbox
                checked={form[flag.key]}
                onCheckedChange={(checked) => setForm((f) => ({ ...f, [flag.key]: Boolean(checked) }))}
              />
              <span className="text-sm text-forest-900">{flag.label}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-stone-200 bg-cream-50 p-6 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-forest-950">Variantes</h2>
          <Button type="button" variant="outline" size="sm" onClick={addVariantRow}>
            <Plus className="h-4 w-4" /> Agregar variante
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          {form.variants.map((variant, i) => (
            <div key={variant.id ?? i} className="grid grid-cols-1 gap-3 rounded-md border border-stone-200 p-3 sm:grid-cols-[2fr_1fr_1fr_auto]">
              <Input
                placeholder="Etiqueta (ej. 500 g)"
                required
                value={variant.label}
                onChange={(e) => updateVariantRow(i, { label: e.target.value })}
              />
              <Input
                type="number"
                min={0}
                placeholder="Stock"
                value={variant.stock}
                onChange={(e) => updateVariantRow(i, { stock: Number(e.target.value) })}
              />
              <Select value={variant.availability} onValueChange={(v) => updateVariantRow(i, { availability: v as Availability })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABILITY_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <button
                type="button"
                onClick={() => removeVariantRow(i)}
                disabled={form.variants.length <= 1}
                className="flex h-11 w-11 items-center justify-center rounded-md text-destructive transition hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Quitar variante"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="flex gap-3">
        <Button type="submit" size="lg">
          {isEdit ? "Guardar cambios" : "Crear producto"}
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={() => router.push("/admin/productos")}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
