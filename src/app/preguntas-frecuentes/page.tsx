import type { Metadata } from "next";
import { StaticPage } from "@/components/shared/static-page";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const metadata: Metadata = { title: "Preguntas frecuentes" };

const FAQS = [
  { q: "¿Cuánto tarda en llegar mi pedido?", a: "Entre 24 y 72 horas hábiles en CABA y GBA, y hasta 5 días hábiles en el resto del país." },
  { q: "¿Puedo pagar en cuotas?", a: "Sí, ofrecemos hasta 12 cuotas sin interés con las principales tarjetas de crédito." },
  { q: "¿Cómo hago un cambio o devolución?", a: "Tenés 30 días desde la recepción para solicitar un cambio o devolución sin cargo, siempre que el producto esté sin usar." },
  { q: "¿Hacen envíos a todo el país?", a: "Sí, despachamos a las 24 provincias a través de correos y cadetería según la zona." },
  { q: "¿Cómo sé si un producto tiene stock?", a: "El stock se actualiza en tiempo real en la ficha de cada producto, con badges de 'Sin stock' o 'Últimas unidades'." },
];

export default function FaqPage() {
  return (
    <StaticPage title="Preguntas frecuentes" intro="Encontrá respuestas rápidas sobre envíos, pagos, cambios y devoluciones.">
      <Accordion type="multiple">
        {FAQS.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger>{faq.q}</AccordionTrigger>
            <AccordionContent>{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </StaticPage>
  );
}
