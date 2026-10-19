import { Shield, Truck, BadgeCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/context/LangContext";

const WhyChooseSection = () => {
  const { t } = useLang();

  const features = [
    {
      icon: Shield,
      title: t.feat1Title,
      description: t.feat1Desc,
      stat: "100%",
      statLabel: t.statOriginal,
    },
    {
      icon: BadgeCheck,
      title: t.feat2Title,
      description: t.feat2Desc,
      stat: "10+",
      statLabel: t.statDealers,
    },
    {
      icon: Truck,
      title: t.feat3Title,
      description: t.feat3Desc,
      stat: "24/7",
      statLabel: t.statService,
    },
  ];

  // Split "Nima uchun KUDO?" / "Почему KUDO?" / "Why KUDO?" around "KUDO"
  const titleParts = t.whyKudo.split("KUDO");

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              {t.advantagesLabel}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              {titleParts[0]}<span className="text-primary">KUDO</span>{titleParts[1]}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 120}>
              <div className="group relative rounded-2xl border border-border bg-card p-8 text-center transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 hover:border-primary/30">
                {/* Icon */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon className="h-7 w-7" />
                </div>

                {/* Stat */}
                <div className="text-3xl font-black text-foreground mb-1">{f.stat}</div>
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">{f.statLabel}</div>

                <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
