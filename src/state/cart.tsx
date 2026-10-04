import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { formatPrice, getService } from "../data/services";
import { CartContext, type CartItem, type CartLine, type CartValue } from "./useCart";

const KEY = "pp_cart";

function load(): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (c): c is CartItem => typeof c?.id === "string" && typeof c?.tier === "number" && !!getService(c.id),
    );
  } catch {
    return [];
  }
}

const consultation: CartLine = { id: null, name: "Consultation call", detail: "30 min · video", price: "Free", amount: 0 };

/** A "cart" of services to discuss on a free call. Nothing is ever charged. */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(load);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable: the cart lasts for this visit */
    }
  }, [items]);

  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const add = useCallback((id: string, tier: number) => {
    setItems((prev) => prev.filter((c) => c.id !== id).concat({ id, tier }));
    setOpen(true);
  }, []);
  const remove = useCallback((id: string) => setItems((prev) => prev.filter((c) => c.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartValue>(() => {
    const serviceLines = items.flatMap((c): CartLine[] => {
      const s = getService(c.id);
      if (!s) return [];
      const t = s.tiers[c.tier] ?? s.tiers[0];
      return [{ id: s.id, name: s.name, detail: `${t.label} · ${t.time}`, price: `From ${formatPrice(t.price)}${s.unit ?? ""}`, amount: t.price }];
    });
    const sum = serviceLines.reduce((a, l) => a + l.amount, 0);
    return {
      items,
      lines: [consultation, ...serviceLines],
      total: sum ? `From ${formatPrice(sum)}` : "Free",
      isOpen,
      open,
      close,
      add,
      remove,
      clear,
    };
  }, [items, isOpen, open, close, add, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
