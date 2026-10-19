import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: number;
  nomi: string;
  asosiy_rasm: string | null;
  soni: number;
  avtomobillar: string[];
  mashina_turi?: string;
}

interface CartContextType {
  items: CartItem[];
  totalCount: number;
  addToCart: (product: Omit<CartItem, "soni">) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, delta: number) => void;
  clearCart: () => void;
  setCarForItem: (id: number, mashina_turi: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "kudo_cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : [];
      // Migrate old cart items without avtomobillar field
      return parsed.map((item: CartItem) => ({
        ...item,
        avtomobillar: item.avtomobillar ?? [],
      }));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const totalCount = items.reduce((s, i) => s + i.soni, 0);

  const addToCart = (product: Omit<CartItem, "soni">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, soni: i.soni + 1, mashina_turi: product.mashina_turi ?? i.mashina_turi }
            : i
        );
      }
      return [...prev, { ...product, soni: 1 }];
    });
  };

  const removeFromCart = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => i.id === id ? { ...i, soni: i.soni + delta } : i)
        .filter((i) => i.soni > 0)
    );
  };

  const setCarForItem = (id: number, mashina_turi: string) => {
    setItems((prev) =>
      prev.map((i) => i.id === id ? { ...i, mashina_turi } : i)
    );
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, totalCount, addToCart, removeFromCart, updateQty, clearCart, setCarForItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
