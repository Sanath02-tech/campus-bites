"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getMenuItem } from "@/data/menu";
import { getCanteen } from "@/data/canteens";
import { useCart } from "@/context/CartContext";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";
import QuantityStepper from "@/components/QuantityStepper";

export default function MenuItemView() {
  const { id } = useParams();
  const item = getMenuItem(id);
  const { addToCart, updateQuantity, getQuantity } = useCart();
  const [error, setError] = useState("");

  if (!item) {
    return <EmptyState title="Item not found" actionLabel="Back to menu" actionHref="/menu" />;
  }

  const canteen = getCanteen(item.canteenId);
  const quantity = getQuantity(item.id);
  const orderable = item.available && canteen?.isOpen;

  function handleAdd() {
    const result = addToCart(item);
    setError(result.ok ? "" : result.error);
  }

  return (
    <div className="flex flex-col gap-3">
      <Link href="/menu" className="text-sm hover:underline">
        ← Back to menu
      </Link>

      <h1 className="text-2xl font-bold">{item.name}</h1>
      <p>
        <Badge color={item.veg ? "success" : "error"}>{item.veg ? "Veg" : "Non-veg"}</Badge>{" "}
        <span className="text-sm text-muted">· {item.category}</span>
      </p>
      <p className="text-lg font-bold">₹{item.price}</p>
      <p>{item.description}</p>

      <ul className="text-sm text-muted">
        <li>Canteen: {canteen?.name} ({canteen?.location})</li>
        <li>Ready in: about {item.prepTime} minutes</li>
        <li>Timings: {canteen?.timings}</li>
      </ul>

      <div>
        {!orderable ? (
          <span className="text-muted">{!canteen?.isOpen ? "Canteen is closed now" : "Sold out today"}</span>
        ) : quantity > 0 ? (
          <span className="flex items-center gap-4">
            <QuantityStepper quantity={quantity} onChange={(q) => updateQuantity(item.id, q)} />
            <Button href="/cart">Go to cart</Button>
          </span>
        ) : (
          <Button onClick={handleAdd}>Add to cart</Button>
        )}
      </div>
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
}
