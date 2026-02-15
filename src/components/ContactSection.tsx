import { Phone, MapPin, Clock, Send, Instagram } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const ContactSection = () => {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-foreground/5" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-primary-foreground/5" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/70 mb-3">Aloqa</p>
            <h2 className="text-3xl md:text-4xl font-extrabold">Biz bilan bog'laning</h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
            {
              icon: Send,
              title: "Telegram",
              value: "@kudouz_bot",
              href: "https://t.me/kudouz_bot",
            },
            {
              icon: Instagram,
              title: "Instagram",
              value: "@kudo.uzbekistan",
              href: "https://www.instagram.com/kudo.uzbekistan/",
            },
          ].map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 100}>
              <div className="rounded-2xl bg-primary-foreground/10 backdrop-blur-sm p-6 text-center hover:bg-primary-foreground/15 transition-colors duration-300">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/20">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70 mb-2">{c.title}</h3>
                {c.href ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold hover:underline underline-offset-4 transition-colors"
                  >
                    {c.value}
                  </a>
                ) : (
                  <p className="text-base font-semibold">{c.value}</p>
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
