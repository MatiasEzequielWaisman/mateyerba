"use client";

import { Send } from "lucide-react";
import { toast } from "sonner";

export function FooterNewsletterForm() {
  return (
    <form
      className="mt-6 flex max-w-sm gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("¡Gracias por suscribirte!");
        (e.target as HTMLFormElement).reset();
      }}
      aria-label="Suscribirse al newsletter"
    >
      <label htmlFor="footer-newsletter" className="sr-only">
        Tu correo electrónico
      </label>
      <input
        id="footer-newsletter"
        type="email"
        required
        placeholder="Tu correo electrónico"
        className="h-11 flex-1 rounded-full border border-cream-50/20 bg-cream-50/10 px-4 text-sm text-cream-50 placeholder:text-cream-100/50 focus-visible:border-gold-300"
      />
      <button
        type="submit"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-500 text-forest-950 transition hover:bg-gold-400"
        aria-label="Suscribirme"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
