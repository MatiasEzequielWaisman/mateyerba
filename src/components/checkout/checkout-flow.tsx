"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Truck, CreditCard, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrderSummary } from "@/components/checkout/order-summary";
import { useCartStore, cartSubtotal } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "envio", label: "Envío", icon: Truck },
  { id: "pago", label: "Pago", icon: CreditCard },
  { id: "confirmacion", label: "Confirmación", icon: Check },
] as const;

type PaymentMethod = "tarjeta" | "mercado-pago" | "transferencia";

export function CheckoutFlow() {
  const lines = useCartStore((s) => s.lines);
  const clear = useCartStore((s) => s.clear);
  const [stepIndex, setStepIndex] = useState(0);
  const [payment, setPayment] = useState<PaymentMethod>("tarjeta");
  const [completed, setCompleted] = useState(false);
  const [orderNumber] = useState(() => `NDM-${Math.floor(100000 + Math.random() * 900000)}`);

  const subtotal = cartSubtotal(lines);
  const shippingCost = subtotal >= 25000 || subtotal === 0 ? 0 : 3500;

  if (lines.length === 0 && !completed) {
    return (
      <div className="container flex flex-col items-center gap-4 py-24 text-center">
        <p className="font-display text-xl font-semibold text-forest-950">Tu carrito está vacío</p>
        <p className="text-sm text-stone-500">Agregá productos antes de finalizar la compra.</p>
        <Button asChild>
          <Link href="/catalogo">Ir al catálogo</Link>
        </Button>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="container flex flex-col items-center gap-4 py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-olive-100 text-olive-700">
          <PartyPopper className="h-8 w-8" />
        </span>
        <h1 className="font-display text-display-sm font-semibold text-forest-950">¡Gracias por tu compra!</h1>
        <p className="max-w-md text-sm text-stone-600">
          Tu pedido <strong>{orderNumber}</strong> fue confirmado. Te enviamos un correo con el detalle y el seguimiento del envío.
        </p>
        <Button asChild>
          <Link href="/catalogo">Seguir comprando</Link>
        </Button>
      </div>
    );
  }

  function goNext() {
    setStepIndex((i) => Math.min(STEPS.length - 1, i + 1));
  }
  function goBack() {
    setStepIndex((i) => Math.max(0, i - 1));
  }
  function handleConfirm() {
    setCompleted(true);
    clear();
  }

  return (
    <div className="container py-10">
      <nav aria-label="Progreso del checkout" className="mx-auto mb-10 flex max-w-xl items-center justify-between">
        {STEPS.map((step, i) => (
          <div key={step.id} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-2">
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition",
                  i < stepIndex && "border-forest-800 bg-forest-800 text-cream-50",
                  i === stepIndex && "border-forest-800 text-forest-900",
                  i > stepIndex && "border-stone-300 text-stone-400"
                )}
              >
                {i < stepIndex ? <Check className="h-4 w-4" /> : <step.icon className="h-4 w-4" />}
              </span>
              <span className={cn("text-xs font-medium", i <= stepIndex ? "text-forest-900" : "text-stone-400")}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn("mx-2 h-0.5 flex-1", i < stepIndex ? "bg-forest-800" : "bg-stone-200")} />
            )}
          </div>
        ))}
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="min-h-[360px]">
          <AnimatePresence mode="wait">
            {stepIndex === 0 && (
              <motion.div
                key="envio"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="mb-6 font-display text-xl font-semibold text-forest-950">Datos de envío</h2>
                <form
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    goNext();
                  }}
                >
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="nombre">Nombre completo</Label>
                    <Input id="nombre" required placeholder="Ana Pérez" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input id="email" type="email" required placeholder="ana@email.com" />
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input id="direccion" required placeholder="Av. Siempreviva 742" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="ciudad">Ciudad</Label>
                    <Input id="ciudad" required placeholder="Buenos Aires" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="cp">Código postal</Label>
                    <Input id="cp" required placeholder="1000" />
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      Continuar al pago
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {stepIndex === 1 && (
              <motion.div
                key="pago"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="mb-6 font-display text-xl font-semibold text-forest-950">Método de pago</h2>
                <div className="flex flex-col gap-3">
                  {(
                    [
                      { id: "tarjeta", label: "Tarjeta de crédito o débito" },
                      { id: "mercado-pago", label: "Mercado Pago" },
                      { id: "transferencia", label: "Transferencia bancaria" },
                    ] as const
                  ).map((option) => (
                    <label
                      key={option.id}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3.5 transition",
                        payment === option.id ? "border-forest-800 bg-forest-50" : "border-stone-200 hover:border-stone-300"
                      )}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={payment === option.id}
                        onChange={() => setPayment(option.id)}
                        className="h-4 w-4 accent-forest-800"
                      />
                      <span className="text-sm font-medium text-forest-900">{option.label}</span>
                    </label>
                  ))}
                </div>

                {payment === "tarjeta" && (
                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <Label htmlFor="numero-tarjeta">Número de tarjeta</Label>
                      <Input id="numero-tarjeta" required placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="vencimiento">Vencimiento</Label>
                      <Input id="vencimiento" required placeholder="MM/AA" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" required placeholder="123" />
                    </div>
                  </div>
                )}

                <div className="mt-6 flex gap-3">
                  <Button variant="outline" onClick={goBack}>
                    Volver
                  </Button>
                  <Button onClick={goNext}>Revisar pedido</Button>
                </div>
              </motion.div>
            )}

            {stepIndex === 2 && (
              <motion.div
                key="confirmacion"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="mb-6 font-display text-xl font-semibold text-forest-950">Confirmá tu pedido</h2>
                <p className="mb-6 text-sm text-stone-600">
                  Revisá el resumen antes de confirmar. Vas a pagar{" "}
                  <strong>{formatPrice(subtotal + shippingCost)}</strong> con{" "}
                  {payment === "tarjeta" ? "tarjeta" : payment === "mercado-pago" ? "Mercado Pago" : "transferencia bancaria"}.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={goBack}>
                    Volver
                  </Button>
                  <Button size="lg" variant="accent" onClick={handleConfirm}>
                    Confirmar compra
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <OrderSummary lines={lines} shippingCost={shippingCost} />
        </div>
      </div>
    </div>
  );
}
