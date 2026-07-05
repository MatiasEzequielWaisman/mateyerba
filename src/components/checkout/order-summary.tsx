import { ProductArt } from "@/components/product/product-art";
import { cartSubtotal, type CartLine } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";

export function OrderSummary({ lines, shippingCost = 0 }: { lines: CartLine[]; shippingCost?: number }) {
  const subtotal = cartSubtotal(lines);

  return (
    <div className="rounded-lg border border-stone-200 bg-cream-50 p-6 shadow-soft">
      <h2 className="mb-4 font-display text-lg font-semibold text-forest-950">Resumen del pedido</h2>
      <ul className="mb-4 flex flex-col gap-4">
        {lines.map((line) => (
          <li key={line.variantId} className="flex gap-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md">
              <ProductArt placeholder={line.image} />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-forest-900 text-[0.65rem] font-bold text-cream-50">
                {line.quantity}
              </span>
            </div>
            <div className="flex flex-1 flex-col text-sm">
              <span className="font-medium text-forest-950 line-clamp-1">{line.name}</span>
              <span className="text-xs text-stone-500">{line.variantLabel}</span>
            </div>
            <span className="text-sm font-semibold text-forest-950">{formatPrice(line.price * line.quantity)}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-2 border-t border-stone-200 pt-4 text-sm">
        <div className="flex justify-between text-stone-600">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-stone-600">
          <span>Envío</span>
          <span>{shippingCost === 0 ? "Gratis" : formatPrice(shippingCost)}</span>
        </div>
        <div className="mt-2 flex justify-between border-t border-stone-200 pt-3 font-display text-base font-semibold text-forest-950">
          <span>Total</span>
          <span>{formatPrice(subtotal + shippingCost)}</span>
        </div>
      </div>
    </div>
  );
}
