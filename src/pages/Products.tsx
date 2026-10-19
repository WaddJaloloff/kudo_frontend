import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Plus, Minus, ShoppingCart, Search } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ProductModal from "@/components/ProductModal";
import { CartDrawer } from "@/components/CartDrawer";
import { useCart } from "@/context/CartContext";
import { useLang, LangSwitcher } from "@/context/LangContext";
import Footer from "@/components/Footer";

interface ApiProduct {
  id: number;
  nomi: string;
  tavsifi: string;
  rasmlar: { id: number; rasm: string; asosiy: boolean }[];
  kategoriyalar: string[];
  mahsulot_kategoriyasi: string;
  avtomobillar: string[];
  xususiyatlar: { id: number; sarlavha: string }[];
  asosiy_rasm?: string;
}

const Products = () => {
  const { t } = useLang();
  const { items, addToCart, updateQty } = useCart();
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.flatMap((p) => p.kategoriyalar)));
    return cats;
  }, [products]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let result = activeCategory === "ALL"
      ? products
      : products.filter((p) => p.kategoriyalar.includes(activeCategory));
    if (q) {
      result = result.filter(
        (p) =>
          p.nomi.toLowerCase().includes(q) ||
          p.mahsulot_kategoriyasi.toLowerCase().includes(q) ||
          p.tavsifi?.toLowerCase().includes(q) ||
          p.kategoriyalar.some((k) => k.toLowerCase().includes(q))
      );
    }
    return result;
  }, [activeCategory, products, search]);

  useEffect(() => {
    fetch("/api/products/")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // Auto-open product from URL ?pid=X
  useEffect(() => {
    if (loading || products.length === 0) return;
    const pid = searchParams.get("pid");
    if (pid) {
      const found = products.find((p) => String(p.id) === pid);
      if (found) setSelectedProduct(found);
    }
  }, [loading, products, searchParams]);

  const handleOpenProduct = (product: ApiProduct) => {
    setSelectedProduct(product);
    setSearchParams({ pid: String(product.id) }, { replace: true });
  };

  const handleCloseModal = (open: boolean) => {
    if (!open) {
      setSelectedProduct(null);
      setSearchParams({}, { replace: true });
    }
  };

  const getCartItem = (id: number) => items.find((i) => i.id === id);

  const handleAddToCart = (e: React.MouseEvent, product: ApiProduct) => {
    e.stopPropagation();
    // If product has compatible cars, open modal for car selection
    if (product.avtomobillar.length > 0) {
      handleOpenProduct(product);
      return;
    }
    addToCart({
      id: product.id,
      nomi: product.nomi,
      asosiy_rasm:
        product.asosiy_rasm ??
        product.rasmlar.find((r) => r.asosiy)?.rasm ??
        product.rasmlar[0]?.rasm ??
        null,
      avtomobillar: [],
    });
  };

  const handleUpdateQty = (e: React.MouseEvent, id: number, delta: number) => {
    e.stopPropagation();
    updateQty(id, delta);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-[3px] border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-primary/10 bg-primary shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-foreground/70 hover:text-primary-foreground transition-colors shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{t.home}</span>
          </Link>
          <h1 className="text-base font-bold text-primary-foreground flex-1 min-w-0">
            KUDO <span className="text-primary-foreground/80">{t.catalog}</span>
          </h1>
          <div className="flex items-center gap-2 shrink-0">
            <LangSwitcher />
            <CartDrawer variant="catalog" />
          </div>
        </div>
      </header>

      {/* Products Grid */}
      <main className="container mx-auto px-4 py-10 flex-1">
        <ScrollReveal>
          <div className="text-center mb-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
              {t.catalog}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              {t.catalog}
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto text-sm">
              {t.productCount}
            </p>
          </div>
        </ScrollReveal>

        {/* Live Search */}
        <ScrollReveal>
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-xl border-2 border-primary/30 bg-background pl-9 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="text-base leading-none">×</span>
              </button>
            )}
          </div>
        </ScrollReveal>

        {/* Category Tabs */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              key="ALL"
              onClick={() => setActiveCategory("ALL")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === "ALL"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-secondary text-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {t.allCats}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-secondary text-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* No results */}
        {filtered.length === 0 && (
          <div className="text-center py-32 text-muted-foreground">
            <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">{t.noResults}</p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {filtered.map((p, i) => {
            const mainImage = p.rasmlar.find((img) => img.asosiy)?.rasm || p.rasmlar[0]?.rasm;
            const cartItem = getCartItem(p.id);

            return (
              <ScrollReveal key={p.id} delay={i * 60}>
                <div
                  onClick={() => handleOpenProduct(p)}
                  className="group relative rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40 hover:-translate-y-1 cursor-pointer flex flex-col"
                >
                  {/* Image */}
                  <div className="overflow-hidden bg-secondary/30 aspect-square">
                    {mainImage ? (
                      <img
                        src={mainImage}
                        alt={p.nomi}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                        <ShoppingCart className="w-10 h-10" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-3 flex-1 flex flex-col">
                    <div className="flex flex-wrap gap-1 mb-1.5">
                      {p.avtomobillar.slice(0, 2).map((avto) => (
                        <span
                          key={avto}
                          className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary"
                        >
                          {avto}
                        </span>
                      ))}
                      {p.avtomobillar.length > 2 && (
                        <span className="inline-block rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                          +{p.avtomobillar.length - 2}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors flex-1">
                      {p.nomi}
                    </h3>
                    <div className="mt-1 text-[10px] font-semibold text-muted-foreground">
                      {p.mahsulot_kategoriyasi}
                    </div>
                  </div>

                  {/* Cart counter — bottom, stops propagation */}
                  <div
                    className="px-3 pb-3 pt-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {cartItem ? (
                      <div className="flex items-center justify-between bg-primary/10 rounded-xl px-2 py-1.5 border border-primary/20">
                        <button
                          onClick={(e) => handleUpdateQty(e, p.id, -1)}
                          className="w-7 h-7 rounded-lg bg-white border border-border flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors shadow-sm"
                        >
                          <Minus className="w-3.5 h-3.5 text-gray-600" />
                        </button>
                        <span className="text-sm font-bold text-primary min-w-[20px] text-center">
                          {cartItem.soni}
                        </span>
                        <button
                          onClick={(e) => handleUpdateQty(e, p.id, 1)}
                          className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5 text-white" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => handleAddToCart(e, p)}
                        className="w-full flex items-center justify-center gap-1.5 bg-primary text-primary-foreground rounded-xl py-2 text-xs font-bold hover:bg-primary/90 active:scale-95 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        {t.addToCart}
                      </button>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </main>

      <ProductModal
        product={selectedProduct}
        open={!!selectedProduct}
        onOpenChange={handleCloseModal}
      />
      <Footer />
    </div>
  );
};

export default Products;
