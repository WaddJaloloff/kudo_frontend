import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import { products } from "@/data/products";

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
            <ScrollReveal key={p.id} delay={i * 80}>
              <div className="group relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur transition-all duration-300 hover:bg-white/10 hover:border-primary/40 hover:-translate-y-1">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary mb-3">
                    {p.category}
                  </span>
                  <h3 className="text-lg font-bold text-surface-dark-foreground mb-1 group-hover:text-primary transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-sm text-surface-dark-muted leading-relaxed">{p.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={500}>
          <div className="text-center mt-14">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5"
            >
              Ko'proq ko'rish →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CatalogSection;
