import { createContext, useContext } from "react";

export type CartItem = { id: string; tier: number };

export type CartLine = {
  id: string | null;
  name: string;
  detail: string;
  price: string;
  amount: number;
};

export type CartValue = {
  items: CartItem[];
  /** The free consultation first, then one line per service. */
  lines: CartLine[];
  total: string;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (id: string, tier: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const CartContext = createContext<CartValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
