"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("¡Gracias por suscribirte! Revisá tu correo para confirmar.");
    setEmail("");
  }

  return (
    <section className="bg-forest-900 py-16">
      <div className="container flex flex-col items-center gap-6 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream-50/10">
          <Mail className="h-6 w-6 text-cream-50" />
        </span>
        <div>
          <h3 className="font-display text-display-sm font-semibold text-cream-50">
            Sumate a nuestra comunidad matera
          </h3>
          <p className="mt-2 max-w-md text-sm text-cream-100/70">
            Novedades, recetas de cebado y descuentos exclusivos, directo a tu correo.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            aria-label="Tu correo electrónico"
            className="border-cream-50/20 bg-cream-50/10 text-cream-50 placeholder:text-cream-100/50"
          />
          <Button type="submit" variant="accent" size="default">
            Suscribirme
          </Button>
        </form>
      </div>
    </section>
  );
}
