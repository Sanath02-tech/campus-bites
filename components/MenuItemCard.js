"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getCanteen } from "@/data/canteens";
import Badge from "./Badge";
import Button from "./Button";
import QuantityStepper from "./QuantityStepper";

// One food item in the menu list. Reads/writes the cart through CartContext.
export default function MenuItemCard({ item }) {
  const { addToCart, updateQuantity, getQuantity } = useCart();
  const [error, setError] = useState("");
  const quantity = getQuantity(item.id);
  const canteen = getCanteen(item.canteenId);
  const orderable = item.available && canteen?.isOpen;

  function handleAdd() {
    const result = addToCart(item);
    setError(result.ok ? "" : result.error);
  }

  return (
    <div className="border-b border-border py-3">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Link href={`/menu/${item.id}`} className="font-medium hover:underline">
            {item.name}
          </Link>{" "}
          <Badge color={item.veg ? "success" : "error"}>{item.veg ? "Veg" : "Non-veg"}</Badge>
          <p className="text-sm text-muted">
            {canteen?.name} · {item.prepTime} min
          </p>
        </div>
        <span className="w-14 text-right">₹{item.price}</span>
        <div className="w-24 text-right">
          {!orderable ? (
            <span className="text-sm text-muted">{!canteen?.isOpen ? "Closed" : "Sold out"}</span>
          ) : quantity > 0 ? (
            <QuantityStepper quantity={quantity} onChange={(q) => updateQuantity(item.id, q)} />
          ) : (
            <Button variant="outline" onClick={handleAdd}>
              Add
            </Button>
          )}
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
}
