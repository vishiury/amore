import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "./products";

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  add: (product: Product, options?: { size?: string; color?: string; quantity?: number }) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  itemKey: (item: CartItem) => string;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "amore_cart_v1";

function keyOf(productId: string, size: string, color: string) {
  return `${productId}::${size}::${color}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, hydrated]);

  const itemKey = useCallback(
    (item: CartItem) => keyOf(item.product.id, item.size, item.color),
    [],
  );

  const add: CartContextValue["add"] = useCallback((product, options) => {
    const size = options?.size ?? product.sizes[0] ?? "Único";
    const color = options?.color ?? product.colors[0]?.name ?? "Padrão";
    const quantity = options?.quantity ?? 1;
    const k = keyOf(product.id, size, color);
    setItems((prev) => {
      const idx = prev.findIndex((i) => keyOf(i.product.id, i.size, i.color) === k);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...prev, { product, size, color, quantity }];
    });
    setIsOpen(true);
  }, []);

  const remove = useCallback((k: string) => {
    setItems((prev) => prev.filter((i) => keyOf(i.product.id, i.size, i.color) !== k));
  }, []);

  const setQty = useCallback((k: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          keyOf(i.product.id, i.size, i.color) === k ? { ...i, quantity: Math.max(1, qty) } : i,
        )
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((s, i) => s + i.quantity, 0),
      subtotal: items.reduce((s, i) => s + i.product.price * i.quantity, 0),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      toggleCart: () => setIsOpen((v) => !v),
      add,
      remove,
      setQty,
      clear,
      itemKey,
    }),
    [items, isOpen, add, remove, setQty, clear, itemKey],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
