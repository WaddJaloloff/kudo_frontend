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
import { Navigation } from "swiper/modules"; // <-- to'g'ri import
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  avtomobillar: string[];   // yangi, mahsulotga bog‘langan avtomobillar

  xususiyatlar: {
    id: number;
    sarlavha: string;
  }[];

  asosiy_rasm?: string; // optional, API da mavjud
}


interface ProductModalProps {
  product: ApiProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


const ProductDetails = ({ product }: { product: ApiProduct }) => {
  return (
    <div className="space-y-6">
      {/* Carousel */}
      <div className="rounded-2xl overflow-hidden max-w-md mx-auto">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={10}
          slidesPerView={1}
          className="aspect-video"
        >
          {product.rasmlar.map((img) => (
            <SwiperSlide key={img.id}>
              <img
                src={img.rasm}
                alt={product.nomi}
                className="w-full h-full object-cover rounded-2xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Kategoriyalar */}

      {/* Avtomobillar */}
      <div className="flex flex-wrap gap-2 justify-start">
        {product.avtomobillar.map((avto, i) => (
          <span
            key={i}
            className="inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary"
          >
            {avto}
          </span>
        ))}
      </div>
      {/* Umumiy ma'lumotlar */}
      <div>
        <p className="text-muted-foreground leading-relaxed">{product.tavsifi}</p>
      </div>

      {/* Xususiyatlar */}
      {product.xususiyatlar.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">
            Xususiyatlari
          </h4>
          <ul className="space-y-2">
            {product.xususiyatlar.map((f) => (
              <li
                key={f.id}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                {f.sarlavha}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Buyurtma berish tugmasi */}
      <a
        href="tel:+998997364444"
        className="block w-full text-center rounded-lg bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40"
      >
        Buyurtma berish →
      </a>
    </div>
  );
};



const ProductModal = ({
  product,
  open,
  onOpenChange,
}: ProductModalProps) => {
  const isMobile = useIsMobile();

  if (!product) return null;

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="rounded-t-3xl bg-background border-border max-h-[85vh] overflow-y-auto px-6 pb-10 pt-6"
        >
          <SheetHeader className="text-left mb-6">
            <SheetTitle className="text-2xl font-extrabold text-foreground">
              {product.nomi}
            </SheetTitle>
            <SheetDescription className="sr-only">
              {product.nomi} haqida batafsil ma'lumot
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
            {product.nomi}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {product.nomi} haqida batafsil ma'lumot
          </DialogDescription>
        </DialogHeader>

        <ProductDetails product={product} />
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
