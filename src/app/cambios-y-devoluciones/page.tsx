import type { Metadata } from "next";
import { StaticPage } from "@/components/shared/static-page";

export const metadata: Metadata = { title: "Cambios y devoluciones" };

export default function ReturnsPage() {
  return (
    <StaticPage title="Cambios y devoluciones" intro="Queremos que estés 100% conforme con tu compra.">
      <p>Tenés 30 días corridos desde la recepción del pedido para solicitar un cambio o devolución sin cargo.</p>
      <p>El producto debe estar sin usar, con su packaging original y el comprobante de compra.</p>
      <p>Por tratarse de productos alimenticios, los cambios de yerbas, alfajores y galletitas solo proceden ante fallas de fabricación o errores de envío.</p>
      <p>Para iniciar un cambio, escribinos desde la sección de contacto indicando tu número de pedido.</p>
    </StaticPage>
  );
}
