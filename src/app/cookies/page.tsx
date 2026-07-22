import type { Metadata } from "next";
import { StaticPage } from "@/components/shared/static-page";

export const metadata: Metadata = { title: "Política de cookies" };

export default function CookiesPage() {
  return (
    <StaticPage title="Política de cookies">
      <p>Usamos cookies propias y de terceros para recordar tu carrito, tus preferencias y mejorar el rendimiento del sitio.</p>
      <p>Podés deshabilitar las cookies desde la configuración de tu navegador, aunque algunas funciones (como el carrito) podrían dejar de funcionar correctamente.</p>
      <p>No utilizamos cookies de seguimiento con fines publicitarios de terceros.</p>
    </StaticPage>
  );
}
