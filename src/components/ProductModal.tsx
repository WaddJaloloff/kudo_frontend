import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import type { Product } from "@/data/products";
import { Check } from "lucide-react";

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductModal = ({ product, open, onOpenChange }: ProductModalProps) => {
  if (!product) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-3xl bg-surface-dark border-white/10 max-h-[85vh] overflow-y-auto px-6 pb-10 pt-6">
        <SheetHeader className="text-left mb-6">
          <SheetTitle className="text-2xl font-extrabold text-surface-dark-foreground">
            {product.name}
          </SheetTitle>
          <SheetDescription className="sr-only">
            {product.name} haqida batafsil ma'lumot
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          <div className="rounded-2xl overflow-hidden aspect-video max-w-md mx-auto">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary mb-3">
              {product.category}
            </span>
            <p className="text-surface-dark-muted leading-relaxed">{product.details}</p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-surface-dark-foreground uppercase tracking-wider mb-3">
              Xususiyatlari
            </h4>
            <ul className="space-y-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-surface-dark-muted">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <a
            href="https://t.me/kudouz_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center rounded-lg bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40"
          >
            Buyurtma berish →
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProductModal;
