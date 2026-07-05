"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  return (
    <form
      className="flex w-full flex-col gap-4 text-left"
      onSubmit={(e) => {
        e.preventDefault();
        toast.info("La autenticación se conecta en la próxima etapa del proyecto.");
      }}
    >
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input id="email" type="email" placeholder="ana@email.com" required />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Contraseña</Label>
        <Input id="password" type="password" placeholder="••••••••" required />
      </div>
      <Button size="lg" type="submit" className="w-full">
        Ingresar
      </Button>
    </form>
  );
}
