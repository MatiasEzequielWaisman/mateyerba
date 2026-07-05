import type { Metadata } from "next";
import { StaticPage } from "@/components/shared/static-page";

export const metadata: Metadata = { title: "Términos y condiciones" };

export default function TermsPage() {
  return (
    <StaticPage title="Términos y condiciones">
      <p>Al utilizar este sitio aceptás las condiciones de compra, uso y navegación descriptas a continuación.</p>
      <p>Los precios publicados incluyen impuestos de ley y están expresados en pesos argentinos (ARS).</p>
      <p>Nos reservamos el derecho de modificar precios y stock sin previo aviso, respetando siempre las compras ya confirmadas.</p>
      <p>El uso indebido del sitio, incluyendo intentos de fraude, habilita a la tienda a cancelar la cuenta y el pedido asociado.</p>
    </StaticPage>
  );
}
