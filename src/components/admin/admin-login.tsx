"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminAuthStore } from "@/lib/store/admin-auth-store";

export function AdminLogin() {
  const login = useAdminAuthStore((s) => s.login);
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (login(password)) {
      toast.success("Bienvenido al panel de administración");
    } else {
      toast.error("Contraseña incorrecta");
    }
    setPassword("");
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-lg border border-stone-200 bg-cream-50 p-8 shadow-card">
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-forest-900 text-cream-50">
          <ShieldCheck className="h-6 w-6" />
        </span>
        <h1 className="mb-1 font-display text-xl font-semibold text-forest-950">Panel de administración</h1>
        <p className="mb-6 text-sm text-stone-500">Ingresá la contraseña para gestionar el catálogo.</p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="admin-password">Contraseña</Label>
            <Input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" size="lg" className="w-full">
            Ingresar
          </Button>
        </form>
        <p className="mt-6 text-xs text-stone-400">
          Modo demo: este acceso solo protege la interfaz en el navegador, no reemplaza autenticación real de
          servidor.
        </p>
      </div>
    </div>
  );
}
