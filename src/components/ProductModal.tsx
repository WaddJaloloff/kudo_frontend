import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { Product } from "@/data/products";
import { Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductDetails = ({ product }: { product: Product }) => (
  <div className="space-y-6">
    <div className="rounded-2xl overflow-hidden aspect-video max-w-md mx-auto">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
    </div>

    <div>
      <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary mb-3">
        {product.category}
      </span>
      <p className="text-muted-foreground leading-relaxed">{product.details}</p>
    </div>

    <div>
      <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">
        Xususiyatlari
      </h4>
      <ul className="space-y-2">
        {product.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
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
);

const ProductModal = ({ product, open, onOpenChange }: ProductModalProps) => {
  const isMobile = useIsMobile();

  if (!product) return null;

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="rounded-t-3xl bg-background border-border max-h-[85vh] overflow-y-auto px-6 pb-10 pt-6">
          <SheetHeader className="text-left mb-6">
            <SheetTitle className="text-2xl font-extrabold text-foreground">
              {product.name}
            </SheetTitle>
            <SheetDescription className="sr-only">
              {product.name} haqida batafsil ma'lumot
            </SheetDescription>
          </SheetHeader>
          <ProductDetails product={product} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto bg-background border-border rounded-2xl">
        <DialogHeader className="text-left mb-4">
          <DialogTitle className="text-2xl font-extrabold text-foreground">
            {product.name}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {product.name} haqida batafsil ma'lumot
          </DialogDescription>
        </DialogHeader>
        <ProductDetails product={product} />
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
