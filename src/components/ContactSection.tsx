import { Phone, MapPin, Clock, Send, Instagram, UserCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const contacts = [
  {
    icon: Phone,
    title: "Telefon",
    value: "+998 99 736-44-44",
    href: "tel:+998997364444",
  },
  {
    icon: MapPin,
    title: "Manzil",
    value: "Sergeli Avto Bozor, 3/2/15, Toshkent",
    href: "https://www.google.com/maps/place/41%C2%B013'53.6%22N+69%C2%B012'51.9%22E/@41.231544,69.214419,16z/data=!4m4!3m3!8m2!3d41.2315556!4d69.2144167?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    icon: Clock,
    title: "Ish vaqti",
    value: "8:00 - 17:00",
    href: undefined,
  },
  {
    icon: Send,
    title: "Telegram Bot",
    value: "@kudouz_bot",
    href: "https://t.me/kudouz_bot",
  },
  {
    icon: UserCheck,
    title: "Telegram Admin",
    value: "@KUDO_UZB",
    href: "https://t.me/KUDO_UZB",
  },
  {
    icon: Instagram,
    title: "Instagram",
    value: "@kudo.uzbekistan",
    href: "https://www.instagram.com/kudo.uzbekistan/?hl=en",
  },
];

const ContactSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Aloqa</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Biz bilan bog'laning</h2>
            <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-primary" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
          {contacts.map((c, i) => {
            const inner = (
              <div className="group relative rounded-2xl border border-border/60 bg-card p-6 md:p-8 text-center transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-1 h-full flex flex-col items-center justify-center cursor-pointer">
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-300" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{c.title}</h3>
                  <p className="text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300 break-words">
                    {c.value}
                  </p>
                </div>
              </div>
            );

            return (
              <ScrollReveal key={c.title} delay={i * 80}>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("tel:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="h-full">{inner}</div>
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
