"use client";

import { createContext, useContext } from "react";
import { usePersistentState } from "@/lib/usePersistentState";

const OrderContext = createContext(null);

// Order status is simulated from the time since the order was placed,
// so the tracker "moves" during a demo without any backend.
export const ORDER_STEPS = [
  { key: "placed", label: "Order placed", afterSeconds: 0 },
  { key: "preparing", label: "Preparing", afterSeconds: 15 },
  { key: "ready", label: "Ready for pickup", afterSeconds: 45 },
];

export function getOrderStatus(order, now) {
  if (order.pickedUp) return { key: "picked", label: "Picked up", stepIndex: ORDER_STEPS.length };
  const elapsed = (now - order.placedAt) / 1000;
  let stepIndex = 0;
  ORDER_STEPS.forEach((step, i) => {
    if (elapsed >= step.afterSeconds) stepIndex = i;
  });
  return { ...ORDER_STEPS[stepIndex], stepIndex };
}

// A sample past order so the Orders page is not empty on first load
const sampleOrders = [
  {
    id: "CB-1042",
    canteenId: "main-canteen",
    items: [
      { id: 1, name: "Masala Dosa", price: 50, quantity: 1, emoji: "🥞" },
      { id: 8, name: "Filter Coffee", price: 20, quantity: 2, emoji: "☕" },
    ],
    total: 90,
    pickupSlot: "11:00 AM break",
    note: "",
    placedAt: new Date("2026-11-18T10:40:00").getTime(),
    pickedUp: true,
  },
];

export function OrderProvider({ children }) {
  const [orders, setOrders] = usePersistentState("cb-orders", sampleOrders);

  function placeOrder({ cartItems, canteenId, total, pickupSlot, note }) {
    const order = {
      id: `CB-${Math.floor(1000 + Math.random() * 9000)}`,
      canteenId,
      items: cartItems.map(({ item, quantity }) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity,
        emoji: item.emoji,
      })),
      total,
      pickupSlot,
      note,
      placedAt: Date.now(),
      pickedUp: false,
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  }

  function markPickedUp(orderId) {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, pickedUp: true } : o)));
  }

  function getOrder(orderId) {
    return orders.find((o) => o.id === orderId);
  }

  return (
    <OrderContext.Provider value={{ orders, placeOrder, markPickedUp, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used inside <OrderProvider>");
  return ctx;
}
