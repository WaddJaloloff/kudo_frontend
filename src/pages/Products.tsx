import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import ProductModal from "@/components/ProductModal";


interface ApiProduct {
  id: number;
  nomi: string;
  tavsifi: string;

  rasmlar: {
    id: number;
    rasm: string;
    asosiy: boolean;
  }[];

  kategoriyalar: string[]; // faqat string

  xususiyatlar: {
    id: number;
    sarlavha: string;
  }[];

  asosiy_rasm?: string; // optional, API da mavjud
}


const ALL_CATEGORY = "Barchasi";

const Products = () => {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.flatMap((p) => p.kategoriyalar)));
    return [ALL_CATEGORY, ...cats];
  }, [products]);


  const filtered = useMemo(
    () =>
      activeCategory === ALL_CATEGORY
        ? products
        : products.filter((p) => p.kategoriyalar.includes(activeCategory)),
    [activeCategory, products]
  );






  useEffect(() => {
    fetch("/api/products/")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error("API error:", err));
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Mahsulotlar yuklanmoqda...
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-primary/10 bg-primary shadow-md">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Bosh sahifa
          </Link>
          <h1 className="text-lg font-bold text-primary-foreground">
            KUDO <span className="text-primary-foreground/80">Mahsulotlar</span>
          </h1>
        </div>
      </header>

      {/* Products Grid */}
      <main className="container mx-auto px-6 py-12">
        <ScrollReveal>
          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Barcha mahsulotlar
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Katalog
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              100 dan ortiq turdagi avtomobil ehtiyot qismlari va kimyoviy mahsulotlar
            </p>
          </div>
        </ScrollReveal>

        {/* Category Tabs */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 cursor-pointer ${activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-secondary text-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {
            filtered.map((p, i) => {
              // asosiy rasmni aniqlash
              const mainImage = p.rasmlar.find(img => img.asosiy)?.rasm || p.rasmlar[0]?.rasm;

              // asosiy kategoriya (birinchi)
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
                {p.kategoriyalar.join(", ")}
              </span>


              return (
                <ScrollReveal key={p.id} delay={i * 80}>
                  <button
                    onClick={() => setSelectedProduct(p)}
                    className="w-full text-left group relative rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40 hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={mainImage}
                        alt={p.nomi}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-1 justify-start">
                        {p.kategoriyalar.map((cat) => (
                          <span
                            key={cat}
                            className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-1"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>



                      <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {p.nomi}
                      </h3>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {p.tavsifi}
                      </p>
                    </div>
                  </button>
                </ScrollReveal>
              );
            })

          }
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
