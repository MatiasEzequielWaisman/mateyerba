import { Truck, ShieldCheck, CreditCard, Headset } from "lucide-react";

const BENEFITS = [
  { icon: Truck, title: "Envíos a todo el país", description: "Recibilo en la puerta de tu casa en 24-72hs." },
  { icon: ShieldCheck, title: "Compra 100% segura", description: "Pagos protegidos y datos encriptados." },
  { icon: CreditCard, title: "Medios de pago", description: "Tarjetas, Mercado Pago y transferencia." },
  { icon: Headset, title: "Atención personalizada", description: "Te ayudamos por WhatsApp o email." },
];

export function Benefits() {
  return (
    <section className="border-y border-stone-200 bg-cream-100">
      <div className="container grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
        {BENEFITS.map((b) => (
          <div key={b.title} className="flex flex-col items-center gap-3 text-center md:flex-row md:text-left">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest-900 text-cream-50">
              <b.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-forest-950">{b.title}</p>
              <p className="text-xs text-stone-500">{b.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
