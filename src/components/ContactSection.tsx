import { Phone, MapPin, Clock } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const ContactSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Aloqa</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Biz bilan bog'laning</h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: Phone,
              title: "Telefon",
              value: "+998 99 736-44-44",
              href: "tel:+998997364444",
            },
            {
              icon: MapPin,
              title: "Manzil",
              value: "Sergeli 3/2/15, Sergeli Avto Bozor, Toshkent",
              href: "https://maps.google.com/?q=Sergeli+Car+Market+Tashkent",
            },
            {
              icon: Clock,
              title: "Ish vaqti",
              value: "Dushanba — Shanba, 09:00 — 18:00",
              href: undefined,
            },
          ].map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 120}>
              <div className="text-center group">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">{c.title}</h3>
                {c.href ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {c.value}
                  </a>
                ) : (
                  <p className="text-base font-semibold text-foreground">{c.value}</p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
