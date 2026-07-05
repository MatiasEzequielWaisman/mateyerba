import type { Metadata } from "next";
import { StaticPage } from "@/components/shared/static-page";

export const metadata: Metadata = { title: "Envíos y entregas" };

export default function ShippingPage() {
  return (
    <StaticPage title="Envíos y entregas" intro="Despachamos a todo el país. Estos son los tiempos y costos estimados.">
      <p>
        <strong>CABA y GBA:</strong> 24 a 72 horas hábiles desde la confirmación del pago.
      </p>
      <p>
        <strong>Interior del país:</strong> entre 3 y 5 días hábiles según la localidad, a través de correo o cadetería.
      </p>
      <p>
        El envío es <strong>gratuito en compras superiores a $25.000</strong>. Para pedidos menores, el costo se calcula en el checkout según el destino.
      </p>
      <p>Una vez despachado tu pedido vas a recibir un correo con el número de seguimiento.</p>
    </StaticPage>
  );
}
