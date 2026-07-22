import type { Metadata } from "next";
import { StaticPage } from "@/components/shared/static-page";

export const metadata: Metadata = { title: "Política de privacidad" };

export default function PrivacyPage() {
  return (
    <StaticPage title="Política de privacidad">
      <p>Recopilamos únicamente los datos necesarios para procesar tu compra y mejorar tu experiencia: nombre, contacto y dirección de envío.</p>
      <p>Nunca compartimos tu información con terceros con fines comerciales sin tu consentimiento explícito.</p>
      <p>Tus datos de pago se procesan a través de pasarelas certificadas y no se almacenan en nuestros servidores.</p>
      <p>Podés solicitar la eliminación de tus datos personales escribiéndonos desde la sección de contacto.</p>
    </StaticPage>
  );
}
