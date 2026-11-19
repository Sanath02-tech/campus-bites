"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import { getCanteen } from "@/data/canteens";
import { pickupSlots } from "@/data/users";
import Button from "@/components/Button";
import Card from "@/components/Card";
import EmptyState from "@/components/EmptyState";
import Input from "@/components/Input";
import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import QuantityStepper from "@/components/QuantityStepper";
import Select from "@/components/Select";

const PACKING_FEE = 5;

export default function CartPage() {
  const router = useRouter();
  const { cartItems, canteenId, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const { placeOrder } = useOrders();

  const [pickupSlot, setPickupSlot] = useState(pickupSlots[0]);
  const [note, setNote] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [placing, setPlacing] = useState(false);

  if (placing) return <Loader label="Placing your order..." />;

  if (cartItems.length === 0) {
    return <EmptyState title="Your cart is empty" actionLabel="Browse menu" actionHref="/menu" />;
  }

  const canteen = getCanteen(canteenId);
  const total = subtotal + PACKING_FEE;

  function handlePlaceClick() {
    if (!user) {
      router.push("/login?next=/cart");
      return;
    }
    setConfirmOpen(true);
  }

  function handleConfirm() {
    setConfirmOpen(false);
    setPlacing(true);
    // fake delay so the loading state is visible
    setTimeout(() => {
      const order = placeOrder({ cartItems, canteenId, total, pickupSlot, note });
      clearCart();
      router.push(`/orders/${order.id}`);
    }, 1000);
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Your cart</h1>
      <p className="text-sm text-muted">Ordering from {canteen?.name}</p>

      <div>
        {cartItems.map(({ item, quantity }) => (
          <div key={item.id} className="flex items-center gap-3 border-b border-border py-2">
            <span className="flex-1">{item.name}</span>
            <QuantityStepper quantity={quantity} onChange={(q) => updateQuantity(item.id, q)} />
            <span className="w-14 text-right">₹{item.price * quantity}</span>
            <button onClick={() => removeFromCart(item.id)} className="text-sm text-error hover:underline">
              Remove
            </button>
          </div>
        ))}
      </div>

      <Card className="flex flex-col gap-3">
        <Select
          id="slot"
          label="Pickup time"
          options={pickupSlots}
          value={pickupSlot}
          onChange={(e) => setPickupSlot(e.target.value)}
        />
        <Input
          id="note"
          label="Note for the canteen (optional)"
          multiline
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="text-sm">
          <p>Subtotal: ₹{subtotal}</p>
          <p>Packing fee: ₹{PACKING_FEE}</p>
          <p className="text-base font-bold">Total: ₹{total}</p>
          <p className="text-muted">Pay at the counter (UPI / cash).</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handlePlaceClick}>{user ? "Place order" : "Login to place order"}</Button>
          <Button variant="outline" onClick={clearCart}>
            Clear cart
          </Button>
        </div>
      </Card>

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Confirm your order">
        <p className="text-sm">Canteen: {canteen?.name}</p>
        <p className="text-sm">Pickup: {pickupSlot}</p>
        <p className="mb-4 text-sm">Total: ₹{total}</p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setConfirmOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </div>
      </Modal>
    </div>
  );
}
