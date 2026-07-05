"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, ProductVariant } from "@/lib/types";

export interface CartLine {
  productSlug: string;
  variantId: string;
  name: string;
  image: string;
  price: number;
  variantLabel: string;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  couponCode: string | null;
  open: () => void;
  close: () => void;
  toggle: () => void;
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  applyCoupon: (code: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      couponCode: null,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      addItem: (product, variant, quantity = 1) => {
        const existing = get().lines.find((l) => l.variantId === variant.id);
        const price = product.price + (variant.priceDelta ?? 0);
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.variantId === variant.id ? { ...l, quantity: l.quantity + quantity } : l
            ),
            isOpen: true,
          });
          return;
        }
        set({
          lines: [
            ...get().lines,
            {
              productSlug: product.slug,
              variantId: variant.id,
              name: product.name,
              image: product.images[0]?.placeholder ?? "",
              price,
              variantLabel: variant.label,
              quantity,
            },
          ],
          isOpen: true,
        });
      },
      removeItem: (variantId) => set({ lines: get().lines.filter((l) => l.variantId !== variantId) }),
      setQuantity: (variantId, quantity) =>
        set({
          lines: get()
            .lines.map((l) => (l.variantId === variantId ? { ...l, quantity } : l))
            .filter((l) => l.quantity > 0),
        }),
      applyCoupon: (code) => set({ couponCode: code }),
      clear: () => set({ lines: [], couponCode: null }),
    }),
    { name: "ydb-cart" }
  )
);

export function cartSubtotal(lines: CartLine[]) {
  return lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
}

export function cartCount(lines: CartLine[]) {
  return lines.reduce((sum, l) => sum + l.quantity, 0);
}
