import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PromoBanner() {
  return (
    <section className="container py-16">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 px-8 py-14 text-center shadow-elevated md:px-16 md:text-left">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-forest-950/10 blur-3xl" />
        <div className="relative flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-forest-950/70">
              Por tiempo limitado
            </p>
            <h3 className="font-display text-display-sm font-semibold text-forest-950 md:text-display-md">
              Envío gratis desde $25.000
            </h3>
            <p className="mt-2 max-w-md text-forest-950/80">
              Armá tu pedido de yerbas, mates y accesorios y llevate el envío sin cargo a todo el país.
            </p>
          </div>
          <Button asChild size="lg" variant="primary">
            <Link href="/catalogo">Comprar ahora</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
