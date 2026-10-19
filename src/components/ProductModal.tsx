import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Check, ShoppingCart, Plus, Minus, Phone, Copy, Share2, AlertCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";
import { useState, useEffect, useRef } from "react";

interface ApiProduct {
  id: number;
  nomi: string;
  tavsifi: string;
  rasmlar: { id: number; rasm: string; asosiy: boolean }[];
  kategoriyalar: string[];
  avtomobillar: string[];
  xususiyatlar: { id: number; sarlavha: string }[];
  asosiy_rasm?: string;
}

interface ProductModalProps {
  product: ApiProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductDetails = ({ product }: { product: ApiProduct }) => {
  const { t } = useLang();
  const { addToCart, updateQty, items, setCarForItem } = useCart();
  const [copied, setCopied] = useState(false);
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [carError, setCarError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const carSectionRef = useRef<HTMLDivElement>(null);

  const cartItem = items.find((i) => i.id === product.id);

  // Sync selectedCar with cart item or reset when product changes
  useEffect(() => {
    setSelectedCar(cartItem?.mashina_turi ?? null);
    setCarError(false);
  }, [product.id]);

  const handleCarSelect = (avto: string) => {
    setSelectedCar(avto);
    setCarError(false);
    // If already in cart, update it immediately
    if (cartItem) {
      setCarForItem(product.id, avto);
    }
  };

  const handleAddToCart = () => {
    if (product.avtomobillar.length > 0 && !selectedCar) {
      setCarError(true);
      setShakeKey(k => k + 1); // trigger shake every time
      // Scroll car section into view
      carSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
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
      avtomobillar: product.avtomobillar,
      mashina_turi: selectedCar ?? undefined,
    });
  };

  const productUrl = `${window.location.origin}/products?pid=${product.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = productUrl;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: product.nomi, text: product.nomi, url: productUrl });
        return;
      } catch {}
    }
    handleCopy();
  };

  const canShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div className="space-y-5">
      {/* Shake animation style */}
      <style>{`
        @keyframes kudo-shake {
          0%,100% { transform: translateX(0); }
          15% { transform: translateX(-6px); }
          30% { transform: translateX(6px); }
          45% { transform: translateX(-5px); }
          60% { transform: translateX(5px); }
          75% { transform: translateX(-3px); }
          90% { transform: translateX(3px); }
        }
        .kudo-shake { animation: kudo-shake 0.5s ease; }
      `}</style>

      {/* Carousel */}
      {product.rasmlar.length > 0 && (
        <div className="rounded-xl overflow-hidden border border-border bg-secondary/20 w-full min-w-0">
          <Swiper modules={[Navigation]} navigation spaceBetween={10} slidesPerView={1}>
            {product.rasmlar.map((img) => (
              <SwiperSlide key={img.id}>
                <img
                  src={img.rasm}
                  alt={product.nomi}
                  className="w-full object-contain max-h-[240px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Car type warning banner — only shown when error */}
      {carError && product.avtomobillar.length > 0 && (
        <div
          key={shakeKey}
          className="kudo-shake flex items-center gap-2.5 rounded-xl bg-red-50 border-2 border-red-400 px-4 py-3 text-red-700"
        >
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
          <p className="text-sm font-bold">{t.carTypeRequired}</p>
        </div>
      )}

      {/* Car selection chips */}
      {product.avtomobillar.length > 0 && (
        <div ref={carSectionRef} className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {t.selectCarType}
          </p>
          <div
            key={`chips-${shakeKey}`}
            className={`flex flex-wrap gap-2 rounded-xl transition-all ${carError ? "p-2 bg-red-50/60 border border-red-200" : ""}`}
          >
            {product.avtomobillar.map((avto, i) => {
              const isSelected = selectedCar === avto;
              return (
                <button
                  key={i}
                  onClick={() => handleCarSelect(avto)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all border ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                      : carError
                      ? "bg-red-50 text-red-700 border-red-300 hover:bg-red-100 hover:scale-105"
                      : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:scale-105"
                  }`}
                >
                  {isSelected && <span className="mr-1">✓</span>}
                  {avto}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tavsif */}
      {product.tavsifi && (
        <p className="text-muted-foreground leading-relaxed text-sm">{product.tavsifi}</p>
      )}

      {/* Xususiyatlar */}
      {product.xususiyatlar.length > 0 && (
        <div>
          <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2.5">
            {t.features}
          </h4>
          <ul className="space-y-1.5">
            {product.xususiyatlar.map((f) => (
              <li key={f.id} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                {f.sarlavha}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cart controls */}
      <div className="space-y-2.5 pt-1">
        {cartItem ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-primary/10 border border-primary/25 rounded-xl px-4 py-3">
              <button
                onClick={() => updateQty(product.id, -1)}
                className="w-9 h-9 rounded-lg bg-white border border-border flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors shadow-sm"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <div className="text-center">
                <p className="text-lg font-extrabold text-primary">{cartItem.soni}</p>
                <p className="text-xs text-muted-foreground">{t.inCart}</p>
              </div>
              <button
                onClick={() => updateQty(product.id, 1)}
                className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 w-full rounded-xl px-6 py-3.5 text-base font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 active:scale-[0.98] transition-all"
          >
            <ShoppingCart className="w-5 h-5" />
            {t.addToCart}
          </button>
        )}

        <a
          href="tel:+998997364444"
          className="flex items-center justify-center gap-2 w-full rounded-xl border border-primary/30 px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
        >
          <Phone className="w-4 h-4" />
          {t.call} →
        </a>

        {/* Copy / Share URL */}
        <div className="flex gap-2 pt-0.5">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-border px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-500" />
                <span className="text-green-600">{t.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                {t.productLink}
              </>
            )}
          </button>
          {canShare && (
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-border px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              {t.share}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductModal = ({ product, open, onOpenChange }: ProductModalProps) => {
  const isMobile = useIsMobile();
  if (!product) return null;

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="rounded-t-3xl bg-background border-border max-h-[90vh] overflow-y-auto px-5 pb-8 pt-5"
        >
          <SheetHeader className="text-left mb-5">
            <SheetTitle className="text-xl font-extrabold text-foreground leading-tight">
              {product.nomi}
            </SheetTitle>
            <SheetDescription className="sr-only">
              {product.nomi} haqida batafsil ma&apos;lumot
            </SheetDescription>
          </SheetHeader>
          <ProductDetails product={product} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-hidden bg-background border-border rounded-2xl p-0">
        <div className="overflow-y-auto overflow-x-hidden max-h-[85vh] p-6">
          <DialogHeader className="text-left mb-4">
            <DialogTitle className="text-xl font-extrabold text-foreground leading-tight">
              {product.nomi}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {product.nomi} haqida batafsil ma&apos;lumot
            </DialogDescription>
          </DialogHeader>
          <ProductDetails product={product} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
