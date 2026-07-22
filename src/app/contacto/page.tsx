import type { Metadata } from "next";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { StaticPage } from "@/components/shared/static-page";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = { title: "Contacto" };

export default function ContactPage() {
  return (
    <StaticPage title="Contacto" intro="¿Tenés dudas sobre un pedido o un producto? Escribinos, te respondemos a la brevedad.">
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-forest-700" /> hola@negociodemate.com.ar
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MessageCircle className="h-4 w-4 text-forest-700" /> +54 9 11 0000-0000
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-forest-700" /> Buenos Aires, Argentina
        </div>
      </div>
      <ContactForm />
    </StaticPage>
  );
}
