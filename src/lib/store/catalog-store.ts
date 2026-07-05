"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products as seedProducts } from "@/lib/data/products";
import type { Product, ProductVariant } from "@/lib/types";

interface CatalogState {
  products: Product[];
  updateProduct: (slug: string, patch: Partial<Product>) => void;
  updateVariant: (slug: string, variantId: string, patch: Partial<ProductVariant>) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (slug: string) => void;
  resetToSeed: () => void;
}

/**
 * Client-only "admin" catalog: seeded from the static product list and
 * persisted to localStorage. This is what powers the /admin panel's
 * create/edit/delete actions. There is no backend behind it yet — see
 * docs/ADMIN_PANEL.md for the real-persistence migration plan. Storefront
 * surfaces that should reflect admin edits (catalog, home rails, wishlist,
 * product purchase panel) read from this store instead of the static seed;
 * statically generated product pages still render the build-time seed for
 * SEO and only pick up edits after a rebuild.
 */
export const useCatalogStore = create<CatalogState>()(
  persist(
    (set, get) => ({
      products: seedProducts,
      updateProduct: (slug, patch) =>
        set({ products: get().products.map((p) => (p.slug === slug ? { ...p, ...patch } : p)) }),
      updateVariant: (slug, variantId, patch) =>
        set({
          products: get().products.map((p) =>
            p.slug !== slug
              ? p
              : { ...p, variants: p.variants.map((v) => (v.id === variantId ? { ...v, ...patch } : v)) }
          ),
        }),
      addProduct: (product) => set({ products: [product, ...get().products] }),
      deleteProduct: (slug) => set({ products: get().products.filter((p) => p.slug !== slug) }),
      resetToSeed: () => set({ products: seedProducts }),
    }),
    { name: "ydb-admin-catalog" }
  )
);
