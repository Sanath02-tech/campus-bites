"use client";

import { createContext, useContext } from "react";
import { usePersistentState } from "@/lib/usePersistentState";

const CartContext = createContext(null);

// Cart rule: one order = one canteen (you pick up from one counter)
export function CartProvider({ children }) {
  // each entry: { item, quantity }
  const [cartItems, setCartItems] = usePersistentState("cb-cart", []);

  const canteenId = cartItems.length > 0 ? cartItems[0].item.canteenId : null;

  function addToCart(item) {
    if (canteenId && canteenId !== item.canteenId) {
      return {
        ok: false,
        error: "Your cart has items from another canteen. Clear the cart to order from here.",
      };
    }
    setCartItems((prev) => {
      const existing = prev.find((entry) => entry.item.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.item.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    return { ok: true };
  }

  function updateQuantity(itemId, quantity) {
    setCartItems((prev) =>
      quantity <= 0
        ? prev.filter((entry) => entry.item.id !== itemId)
        : prev.map((entry) => (entry.item.id === itemId ? { ...entry, quantity } : entry))
    );
  }

  function removeFromCart(itemId) {
    setCartItems((prev) => prev.filter((entry) => entry.item.id !== itemId));
  }

  function clearCart() {
    setCartItems([]);
  }

  function getQuantity(itemId) {
    return cartItems.find((entry) => entry.item.id === itemId)?.quantity ?? 0;
  }

  const totalItems = cartItems.reduce((sum, entry) => sum + entry.quantity, 0);
  const subtotal = cartItems.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        canteenId,
        totalItems,
        subtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
