"use client";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("¡Gracias! Te vamos a responder a la brevedad.");
        (e.target as HTMLFormElement).reset();
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="nombre">Nombre</Label>
          <Input id="nombre" placeholder="Tu nombre" required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input id="email" type="email" placeholder="tu@email.com" required />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="mensaje">Mensaje</Label>
        <textarea
          id="mensaje"
          rows={5}
          required
          placeholder="¿En qué te podemos ayudar?"
          className="w-full rounded-md border border-stone-300 bg-cream-50 px-4 py-3 text-sm text-forest-900 placeholder:text-stone-400 focus-visible:border-forest-600"
        />
      </div>
      <Button type="submit" size="lg" className="w-fit">
        Enviar mensaje
      </Button>
    </form>
  );
}
