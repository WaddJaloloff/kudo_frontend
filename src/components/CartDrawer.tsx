import { useEffect, useRef, useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";
import { useNavigate } from "react-router-dom";

interface CartDrawerProps {
  /** "catalog" — red icon on solid white bg (for red header in Products page)
   *  default  — white icon on white/15 translucent bg (for hero / dark backgrounds) */
  variant?: "catalog";
}

export const CartDrawer = ({ variant }: CartDrawerProps) => {
  const { items, totalCount, updateQty, removeFromCart, clearCart, setCarForItem } = useCart();
  const { t } = useLang();
  const navigate = useNavigate();
  const [bounce, setBounce] = useState(false);
  const prevCount = useRef(totalCount);

  useEffect(() => {
    if (totalCount > prevCount.current) {
      setBounce(false);
      requestAnimationFrame(() => {
        setBounce(true);
        const tid = setTimeout(() => setBounce(false), 650);
        return () => clearTimeout(tid);
      });
    }
    prevCount.current = totalCount;
  }, [totalCount]);

  const isCatalog = variant === "catalog";

  return (
    <>
      <style>{`
        @keyframes cartBadgePop {
          0%   { transform: scale(1); }
          25%  { transform: scale(1.5); }
          55%  { transform: scale(0.85); }
          80%  { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        .cart-badge-pop {
          animation: cartBadgePop 0.55s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        /* Hide the default shadcn SheetContent close button */
        .cart-drawer-content > button.absolute {
          display: none !important;
        }
      `}</style>
      <Sheet>
        <SheetTrigger asChild>
          <button
            className={`relative rounded-full transition-colors ${
              isCatalog
                ? "p-2 bg-white hover:bg-white/90"
                : "p-2.5 bg-white/15 hover:bg-white/25"
            }`}
          >
            <ShoppingCart
              className={
                isCatalog
                  ? "h-5 w-5 text-primary"
                  : "h-5 w-5 text-white"
              }
            />
            {totalCount > 0 && (
              <span
                className={`absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold shadow-md ${bounce ? "cart-badge-pop" : ""}`}
              >
                {totalCount > 99 ? "99+" : totalCount}
              </span>
            )}
          </button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="cart-drawer-content w-full sm:max-w-md flex flex-col bg-background border-border p-0"
        >
          {/* Header with custom close button on RIGHT */}
          <SheetHeader className="border-b border-border px-5 py-4 shrink-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <ShoppingCart className="h-5 w-5 text-primary shrink-0" />
                <SheetTitle className="text-foreground leading-none">{t.cart}</SheetTitle>
                {totalCount > 0 && (
                  <span className="text-sm font-normal text-muted-foreground whitespace-nowrap shrink-0">
                    — {t.itemCount(totalCount)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-muted-foreground hover:text-destructive transition-colors px-2.5 py-1.5 rounded-md hover:bg-destructive/10 font-medium"
                  >
                    {t.clearCart}
                  </button>
                )}
                <SheetClose asChild>
                  <button className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </SheetClose>
              </div>
            </div>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center p-8">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                <ShoppingCart className="h-8 w-8 text-muted-foreground/40" />
              </div>
              <p className="font-semibold text-foreground">{t.cartEmpty}</p>
              <p className="text-sm text-muted-foreground">{t.cartEmptyDesc}</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 rounded-xl border border-border bg-card"
                  >
                    {item.asosiy_rasm && (
                      <div className="w-16 h-16 rounded-lg bg-secondary flex-shrink-0 overflow-hidden">
                        <img
                          src={item.asosiy_rasm}
                          alt={item.nomi}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground line-clamp-2 leading-tight">
                        {item.nomi}
                      </p>
                      {item.avtomobillar && item.avtomobillar.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {item.avtomobillar.map((avto, i) => {
                            const isSelected = item.mashina_turi === avto;
                            return (
                              <button
                                key={i}
                                onClick={() => setCarForItem(item.id, avto)}
                                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold transition-all border ${
                                  isSelected
                                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                    : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                                }`}
                              >
                                {isSelected && "✓ "}{avto}
                              </button>
                            );
                          })}
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-2.5">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="h-7 w-7 rounded-lg border border-border flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-bold text-foreground w-6 text-center tabular-nums">
                          {item.soni}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
                        >
                          <Plus className="h-3 w-3 text-white" />
                        </button>
                      </div>
                    </div>
                    {/* Delete button — bigger and vertically centered */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1.5 self-center flex-shrink-0 h-8 w-8 rounded-lg hover:bg-destructive/10 flex items-center justify-center"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-border px-4 py-4 shrink-0">
                <button
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3.5 rounded-xl text-base hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-primary/25"
                  onClick={() => navigate("/order")}
                >
                  {t.placeOrder}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
