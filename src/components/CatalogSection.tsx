import ScrollReveal from "./ScrollReveal";

const products = [
  {
    name: "Motor moyi",
    category: "Moylar",
    description: "Yuqori sifatli sintetik va yarim sintetik motor moylari",
  },
  {
    name: "Tormoz suyuqligi",
    category: "Suyuqliklar",
    description: "DOT 3, DOT 4 standartidagi tormoz suyuqliklari",
  },
  {
    name: "Antifriz",
    category: "Sovutish",
    description: "Sovutish tizimi uchun yuqori samarali antifrizlar",
  },
  {
    name: "Filtrlash tizimlari",
    category: "Filtrlar",
    description: "Havo, moy va yoqilg'i filtrlari — barcha markalar uchun",
  },
  {
    name: "Akkumulyatorlar",
    category: "Elektr",
    description: "Uzoq muddatli va ishonchli akkumulyator batareyalar",
  },
  {
    name: "Avtokimyo",
    category: "Kimyo",
    description: "Tozalash, himoya va parvarishlash vositalari",
  },
];

const CatalogSection = () => {
  return (
    <section id="catalog" className="py-20 md:py-28 bg-surface-dark">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Katalog</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-surface-dark-foreground">
              Mahsulotlar
            </h2>
            <p className="mt-4 text-surface-dark-muted max-w-lg mx-auto">
              100 dan ortiq turdagi avtomobil ehtiyot qismlari va kimyoviy mahsulotlar
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {products.map((p, i) => (
            <ScrollReveal key={p.name} delay={i * 80}>
              <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur transition-all duration-300 hover:bg-white/10 hover:border-primary/40 hover:-translate-y-1">
                {/* Category badge */}
                <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary mb-4">
                  {p.category}
                </span>
                <h3 className="text-lg font-bold text-surface-dark-foreground mb-2 group-hover:text-primary transition-colors">
                  {p.name}
                </h3>
                <p className="text-sm text-surface-dark-muted leading-relaxed">{p.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={500}>
          <div className="text-center mt-14">
            <a
              href="https://t.me/kudouz_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5"
            >
              Buyurtma berish →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CatalogSection;
