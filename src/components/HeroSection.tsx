import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LayoutGrid, Phone } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import kudoLogo from "@/assets/kudo.png";
import { useLang, LangSwitcher } from "@/context/LangContext";
import { CartDrawer } from "@/components/CartDrawer";
import { useCart } from "@/context/CartContext";

const HeroSection = () => {
  const { t, lang } = useLang();
  const { totalCount } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="KUDO automotive parts" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
      </div>

      {/* Top bar — transparent, scroll-aware dark overlay */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between sm:justify-end sm:gap-3 px-5 py-4 sm:px-8 sm:py-5 transition-all duration-300 ${
          scrolled ? "bg-black/70 backdrop-blur-md" : ""
        }`}
      >
        <LangSwitcher />
        <div className="flex items-center gap-2">
          <a
            href="tel:+998997364444"
            aria-label="Call KUDO"
            className="p-2.5 rounded-full bg-white/15 hover:bg-white/30 transition-colors"
          >
            <Phone className="h-5 w-5 text-white" />
          </a>
          {totalCount > 0 && <CartDrawer />}
          <Link
            to="/products"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/40 hover:bg-primary/90 hover:shadow-primary/60 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200"
          >
            <LayoutGrid className="w-4 h-4" />
            {t.catalog}
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 pt-28 pb-28 sm:pb-20 text-center md:text-left">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary-foreground mb-6 animate-fade-in">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            +14 {lang === "uz" ? "yillik tajriba" : lang === "ru" ? "лет опыта" : "years experience"}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-primary-foreground leading-[1.1] mb-6 animate-fade-up flex items-center gap-4 flex-wrap">
            <img src={kudoLogo} alt="KUDO" className="h-10 sm:h-12 md:h-16 w-auto object-contain" />
            <span>{lang === "ru" ? "УЗБЕКИСТАН" : "UZBEKISTAN"}</span>
          </h1>

          <p className="text-lg md:text-xl text-surface-dark-muted max-w-xl mb-4 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            {lang === "uz"
              ? "Avtomobil ehtiyot qismlari va avtokimyo mahsulotlari — sifat kafolati bilan."
              : lang === "ru"
              ? "Автозапчасти и автохимия — с гарантией качества."
              : "Auto parts and car care products — quality guaranteed."}
          </p>

          <div className="flex flex-wrap gap-6 mb-10 animate-fade-up" style={{ animationDelay: "0.25s" }}>
            {[
              { value: "14+", label: lang === "uz" ? "Yillik tajriba" : lang === "ru" ? "Лет опыта" : "Years exp." },
              { value: "200+", label: lang === "uz" ? "Mahsulotlar" : lang === "ru" ? "Товаров" : "Products" },
              { value: "10+", label: lang === "uz" ? "Dilerlar" : lang === "ru" ? "Дилеров" : "Dealers" },
            ].map((s) => (
              <div key={s.label} className="text-left">
                <div className="text-2xl md:text-3xl font-extrabold text-primary-foreground">{s.value}</div>
                <div className="text-sm text-surface-dark-muted">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden sm:flex flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.35s" }}>
            <a
              href="https://t.me/kudouz_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-cta-blue px-8 py-4 text-base font-bold text-cta-blue-foreground shadow-lg shadow-cta-blue/30 transition-all duration-300 hover:shadow-xl hover:shadow-cta-blue/40 hover:-translate-y-0.5"
            >
              {lang === "uz" ? "Qalbaki ekanligini tekshiring!" : lang === "ru" ? "Проверить оригинальность!" : "Check authenticity!"}
            </a>
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2.5 rounded-lg border-2 border-primary-foreground/30 bg-primary-foreground/10 px-8 py-4 text-base font-semibold text-primary-foreground backdrop-blur transition-all duration-300 hover:bg-primary-foreground/20 hover:border-primary-foreground/50 hover:-translate-y-0.5"
            >
              <LayoutGrid className="w-4 h-4 opacity-80" />
              {t.catalog}
            </Link>
          </div>

          {/* Mobile CTAs — Telegram only (catalog is fixed at bottom) */}
          <div className="flex sm:hidden mt-2 animate-fade-up" style={{ animationDelay: "0.35s" }}>
            <a
              href="https://t.me/kudouz_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-cta-blue px-6 py-4 text-base font-bold text-cta-blue-foreground shadow-lg shadow-cta-blue/30"
            >
              {lang === "uz" ? "Qalbaki ekanligini tekshiring!" : lang === "ru" ? "Проверить оригинальность!" : "Check authenticity!"}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Mobile fixed sticky catalog button — pulsing glow for attention */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-50 flex justify-center px-8 pt-6 pb-4 bg-gradient-to-t from-black/80 to-transparent">
        <Link
          to="/products"
          className="relative flex items-center justify-center gap-2 w-full max-w-xs rounded-xl bg-primary px-6 py-3 text-base font-bold text-primary-foreground shadow-lg shadow-primary/40 overflow-hidden"
        >
          {/* Pulsing ring for attention */}
          <span className="absolute inset-0 rounded-xl border-2 border-primary/70 animate-ping opacity-60 pointer-events-none" />
          <LayoutGrid className="w-4 h-4 relative z-10" />
          <span className="relative z-10">{t.catalog}</span>
        </Link>
      </div>

    </section>
  );
};

export default HeroSection;
