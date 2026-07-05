"use client";

import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/product/quantity-selector";
import { ProductArt } from "@/components/product/product-art";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useCartStore, cartSubtotal } from "@/lib/store/cart";
import { getBestSellerProducts } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 25000;

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const setOpen = useCartStore((s) => s.close);
  const lines = useCartStore((s) => s.lines);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const couponCode = useCartStore((s) => s.couponCode);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const [couponInput, setCouponInput] = useState("");

  const subtotal = cartSubtotal(lines);
  const missingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const suggestions = getBestSellerProducts()
    .filter((p) => !lines.some((l) => l.productSlug === p.slug))
    .slice(0, 3);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && setOpen()}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader className="flex-row items-center justify-between">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" /> Tu carrito
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
              <ShoppingBag className="h-10 w-10 text-stone-300" />
              <p className="text-sm text-stone-500">Tu carrito está vacío.</p>
              <SheetClose asChild>
                <Button variant="outline" asChild>
                  <Link href="/catalogo">Ver catálogo</Link>
                </Button>
              </SheetClose>
            </div>
          ) : (
            <>
              {missingForFreeShipping > 0 ? (
                <p className="mb-4 rounded-md bg-olive-50 px-3 py-2 text-xs text-olive-800">
                  Te faltan <strong>{formatPrice(missingForFreeShipping)}</strong> para envío gratis.
                </p>
              ) : (
                <p className="mb-4 rounded-md bg-olive-50 px-3 py-2 text-xs font-medium text-olive-800">
                  ¡Tenés envío gratis en este pedido!
                </p>
              )}

              <ul className="flex flex-col gap-4">
                {lines.map((line) => (
                  <li key={line.variantId} className="flex gap-3">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md">
                      <ProductArt placeholder={line.image} />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <Link href={`/producto/${line.productSlug}`} className="text-sm font-medium text-forest-950 hover:underline">
                        {line.name}
                      </Link>
                      <span className="text-xs text-stone-500">{line.variantLabel}</span>
                      <div className="mt-1 flex items-center justify-between">
                        <QuantitySelector
                          quantity={line.quantity}
                          onChange={(qty) => setQuantity(line.variantId, qty)}
                        />
                        <span className="text-sm font-semibold text-forest-950">
                          {formatPrice(line.price * line.quantity)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(line.variantId)}
                      aria-label={`Quitar ${line.name} del carrito`}
                      className="h-fit text-stone-400 transition hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>

              {suggestions.length > 0 && (
                <div className="mt-8">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-500">
                    También te puede interesar
                  </p>
                  <div className="flex gap-3 overflow-x-auto pb-1">
                    {suggestions.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/producto/${p.slug}`}
                        className="w-24 shrink-0 text-center"
                      >
                        <div className="mb-1.5 overflow-hidden rounded-md">
                          <ProductArt placeholder={p.images[0]?.placeholder ?? ""} />
                        </div>
                        <span className="line-clamp-2 text-[0.7rem] text-forest-900">{p.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-stone-200 px-6 py-5">
            <form
              className="mb-4 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (!couponInput.trim()) return;
                applyCoupon(couponInput.trim().toUpperCase());
                toast.success(`Cupón ${couponInput.trim().toUpperCase()} aplicado`);
                setCouponInput("");
              }}
            >
              <Input
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Código de cupón"
                className="h-10 flex-1 text-xs"
                aria-label="Código de cupón"
              />
              <Button type="submit" variant="outline" size="sm">
                Aplicar
              </Button>
            </form>
            {couponCode && (
              <p className="mb-3 text-xs font-medium text-olive-700">Cupón aplicado: {couponCode}</p>
            )}
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-stone-600">Subtotal</span>
              <span className="font-display text-lg font-semibold text-forest-950">{formatPrice(subtotal)}</span>
            </div>
            <p className="mb-4 text-xs text-stone-500">Envío e impuestos calculados en el checkout.</p>
            <SheetClose asChild>
              <Button asChild size="lg" className="w-full">
                <Link href="/checkout">Finalizar compra</Link>
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
