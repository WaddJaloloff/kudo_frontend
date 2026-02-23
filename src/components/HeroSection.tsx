import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToCatalog = () => {
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="KUDO automotive parts" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 text-center md:text-left">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary-foreground mb-6 animate-fade-in">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            +15 yillik tajriba
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-primary-foreground leading-[1.1] mb-6 animate-fade-up">
            KUDO{" "}
            <span className="text-primary">Uzbekistan</span>
          </h1>

          <p className="text-lg md:text-xl text-surface-dark-muted max-w-xl mb-4 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            Avtomobil ehtiyot qismlari va avtokimyo mahsulotlari — sifat kafolati bilan.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 mb-10 animate-fade-up" style={{ animationDelay: "0.25s" }}>
            {[
              { value: "15+", label: "Yillik tajriba" },
              { value: "100+", label: "Mahsulotlar" },
              { value: "20+", label: "Dilerlar" },
            ].map((s) => (
              <div key={s.label} className="text-left">
                <div className="text-2xl md:text-3xl font-extrabold text-primary-foreground">{s.value}</div>
                <div className="text-sm text-surface-dark-muted">{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.35s" }}>
            <a
              href="https://t.me/kudouz_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-cta-blue px-8 py-4 text-base font-bold text-cta-blue-foreground shadow-lg shadow-cta-blue/30 transition-all duration-300 hover:shadow-xl hover:shadow-cta-blue/40 hover:-translate-y-0.5"
            >
              Qalbaki ekanligini tekshiring!
            </a>
            <button
              onClick={scrollToCatalog}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary-foreground/20 bg-primary-foreground/5 px-8 py-4 text-base font-semibold text-primary-foreground backdrop-blur transition-all duration-300 hover:bg-primary-foreground/10 hover:-translate-y-0.5"
            >
              Mahsulotlarni ko'rish ↓
            </button>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
