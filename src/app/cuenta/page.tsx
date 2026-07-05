import type { Metadata } from "next";
import { User } from "lucide-react";
import { LoginForm } from "@/components/account/login-form";

export const metadata: Metadata = { title: "Mi cuenta" };

export default function AccountPage() {
  return (
    <div className="container flex max-w-md flex-col items-center gap-6 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-forest-900 text-cream-50">
        <User className="h-7 w-7" />
      </span>
      <div>
        <h1 className="font-display text-display-sm font-semibold text-forest-950">Ingresá a tu cuenta</h1>
        <p className="mt-2 text-sm text-stone-600">Accedé para ver tus pedidos, direcciones guardadas y favoritos.</p>
      </div>
      <LoginForm />
      <p className="text-xs text-stone-500">
        Esta es una demo de diseño: la autenticación real se conecta en la próxima etapa del proyecto.
      </p>
    </div>
  );
}
