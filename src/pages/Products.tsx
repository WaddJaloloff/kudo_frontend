import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ProductModal from "@/components/ProductModal";
import { products, type Product } from "@/data/products";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-surface-dark">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-surface-dark/80 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-surface-dark-muted hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Bosh sahifa
          </Link>
          <h1 className="text-lg font-bold text-surface-dark-foreground">
            KUDO <span className="text-primary">Mahsulotlar</span>
          </h1>
        </div>
      </header>

      {/* Products Grid */}
      <main className="container mx-auto px-6 py-12">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Barcha mahsulotlar
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-surface-dark-foreground">
              Katalog
            </h2>
            <p className="mt-4 text-surface-dark-muted max-w-lg mx-auto">
              100 dan ortiq turdagi avtomobil ehtiyot qismlari va kimyoviy mahsulotlar
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {products.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 80}>
              <button
                onClick={() => setSelectedProduct(p)}
                className="w-full text-left group relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur transition-all duration-300 hover:bg-white/10 hover:border-primary/40 hover:-translate-y-1 cursor-pointer"
              >
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
                  <p className="text-sm text-surface-dark-muted leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </main>

      <ProductModal
        product={selectedProduct}
        open={!!selectedProduct}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
      />
    </div>
  );
};

export default Products;
