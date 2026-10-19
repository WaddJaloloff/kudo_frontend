import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft, CheckCircle2, Loader2, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";
import { YandexMap } from "@/components/YandexMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface OrderForm {
  ism: string;
  telefon: string;
  izoh: string;
}

const Order: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalCount, clearCart } = useCart();
  const { t } = useLang();
  const [location, setLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [locationError, setLocationError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderForm>();

  if (items.length === 0 && !success) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6 text-center">
        <ShoppingCart className="w-16 h-16 text-muted-foreground/30" />
        <h2 className="text-xl font-semibold text-foreground">{t.cartEmpty}</h2>
        <p className="text-muted-foreground">{t.cartEmptyDesc}</p>
        <Button onClick={() => navigate("/products")} variant="outline">
          {t.goToProducts}
        </Button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">{t.orderSuccess}</h2>
          <p className="text-muted-foreground">{t.orderSuccessDesc}</p>
        </div>
        <Button
          onClick={() => navigate("/")}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
        >
          {t.goHome}
        </Button>
      </div>
    );
  }

  const onSubmit = async (data: OrderForm) => {
    if (!location) {
      setLocationError(true);
      return;
    }
    setLocationError(false);
    setServerError(null);
    setSubmitting(true);

    const payload = {
      ism: data.ism.trim(),
      telefon: data.telefon.trim(),
      izoh: data.izoh?.trim() || "",
      latitude: location.lat,
      longitude: location.lng,
      manzil: location.address,
      mahsulotlar: items.map((item) => ({
        id: item.id,
        nomi: item.nomi,
        soni: item.soni,
        mashina_turi: item.mashina_turi || "",
      })),
    };

    try {
      const res = await fetch("/api/buyurtmalar/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err?.detail || err?.message || "Xatolik yuz berdi.";
        setServerError(msg);
        setSubmitting(false);
        return;
      }

      clearCart();
      setSuccess(true);
    } catch {
      setServerError("Internet aloqasini tekshiring.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header — full width */}
      <header className="sticky top-0 z-40 bg-card border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <h1 className="font-semibold text-foreground text-lg">{t.orderTitle}</h1>
        </div>
      </header>

      {/* Two-column layout on desktop, single column on mobile */}
      <div className="max-w-6xl mx-auto px-4 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">

          {/* LEFT COLUMN — form + map */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Personal info */}
            <div className="bg-card rounded-xl border p-4 space-y-3.5">
              <h2 className="font-semibold text-foreground text-sm">{t.personalInfo}</h2>

              {/* Name */}
              <div className="space-y-1.5">
                <Label htmlFor="ism" className="text-sm font-medium">
                  {t.name} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="ism"
                  placeholder={t.namePlaceholder}
                  {...register("ism", {
                    required: t.nameRequired,
                    minLength: { value: 2, message: t.nameMin },
                  })}
                  className={errors.ism ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.ism && (
                  <p className="text-xs text-destructive">{errors.ism.message}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label htmlFor="telefon" className="text-sm font-medium">
                  {t.phone} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="telefon"
                  placeholder={t.phonePlaceholder}
                  type="tel"
                  {...register("telefon", {
                    required: t.phoneRequired,
                    validate: (val) => {
                      const digits = val.replace(/\D/g, "");
                      return digits.length >= 9 || t.phoneInvalid;
                    },
                  })}
                  className={errors.telefon ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.telefon && (
                  <p className="text-xs text-destructive">{errors.telefon.message}</p>
                )}
              </div>


              {/* Comment */}
              <div className="space-y-1.5">
                <Label htmlFor="izoh" className="text-sm font-medium">{t.comment}</Label>
                <Textarea
                  id="izoh"
                  placeholder={t.commentPlaceholder}
                  rows={2}
                  {...register("izoh")}
                  className="resize-none"
                />
              </div>
            </div>

            {/* Location */}
            <div className="bg-card rounded-xl border p-4 space-y-3">
              <div>
                <h2 className="font-semibold text-foreground text-sm">
                  {t.deliveryAddress} <span className="text-destructive">*</span>
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">{t.mapHint}</p>
              </div>
              <YandexMap
                onLocationSelect={(lat, lng, address) => {
                  setLocation({ lat, lng, address });
                  setLocationError(false);
                }}
                selectedLat={location?.lat}
                selectedLng={location?.lng}
              />
              {location && (
                <p className="text-xs text-green-600 dark:text-green-400 font-medium flex gap-1 items-start">
                  <span className="mt-px">✓</span>
                  <span>{location.address}</span>
                </p>
              )}
              {locationError && (
                <p className="text-xs text-destructive">{t.locationRequired}</p>
              )}
            </div>

            {/* Server error (mobile inline) */}
            {serverError && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3 text-sm text-destructive">
                {serverError}
              </div>
            )}

            {/* Submit button — visible on mobile inside form, hidden on desktop (moved to right column) */}
            <div className="lg:hidden">
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-5 rounded-xl text-base h-auto"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t.sending}
                  </>
                ) : (
                  t.confirm
                )}
              </Button>
            </div>
          </form>

          {/* RIGHT COLUMN — cart summary + submit (desktop only) */}
          <div className="hidden lg:flex flex-col gap-4 sticky top-20">
            {/* Cart summary */}
            <div className="bg-card rounded-xl border p-4">
              <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
                <ShoppingCart className="w-4 h-4 text-primary" />
                {t.cartSummary} — {t.itemCount(totalCount)}
              </h2>
              <div className="space-y-1.5">
                {items.map((item) => (
                  <div key={item.id} className="text-sm space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex-1 line-clamp-1 mr-2">{item.nomi}</span>
                      <span className="text-foreground font-medium whitespace-nowrap tabular-nums">× {item.soni}</span>
                    </div>
                    {item.mashina_turi && (
                      <p className="text-xs text-primary font-medium">🚗 {item.mashina_turi}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Server error (desktop sidebar) */}
            {serverError && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3 text-sm text-destructive">
                {serverError}
              </div>
            )}

            {/* Submit button — desktop sidebar */}
            <Button
              type="submit"
              form="order-form-desktop"
              disabled={submitting}
              onClick={handleSubmit(onSubmit)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-5 rounded-xl text-base h-auto"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t.sending}
                </>
              ) : (
                t.confirm
              )}
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Order;
