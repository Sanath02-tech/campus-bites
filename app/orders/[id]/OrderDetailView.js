"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useOrders, getOrderStatus } from "@/context/OrderContext";
import { getCanteen } from "@/data/canteens";
import { formatDateTime } from "@/lib/format";
import { useNow } from "@/lib/useNow";
import Button from "@/components/Button";
import Card from "@/components/Card";
import EmptyState from "@/components/EmptyState";
import OrderStatusTracker from "@/components/OrderStatusTracker";

const statusMessage = {
  placed: "The canteen has received your order.",
  preparing: "Your food is being prepared.",
  ready: "Your order is ready. Show the order ID at the counter.",
  picked: "Order picked up. Enjoy your meal!",
};

export default function OrderDetailView() {
  const { id } = useParams();
  const { getOrder, markPickedUp } = useOrders();
  const now = useNow();
  const order = getOrder(id);

  if (!order) {
    return <EmptyState title="Order not found" actionLabel="My orders" actionHref="/orders" />;
  }

  const status = getOrderStatus(order, now);
  const canteen = getCanteen(order.canteenId);

  return (
    <div className="flex flex-col gap-4">
      <Link href="/orders" className="text-sm hover:underline">
        ← All orders
      </Link>

      <h1 className="text-2xl font-bold">Order #{order.id}</h1>

      <Card className="flex flex-col gap-2">
        <OrderStatusTracker stepIndex={status.stepIndex} />
        <p>{statusMessage[status.key]}</p>
        {status.key === "ready" && (
          <div>
            <Button onClick={() => markPickedUp(order.id)}>I&apos;ve picked it up</Button>
          </div>
        )}
      </Card>

      <div>
        <h2 className="mb-1 font-bold">Details</h2>
        <p className="text-sm text-muted">
          {canteen?.name} · placed {formatDateTime(order.placedAt)} · pickup: {order.pickupSlot}
        </p>
        <ul className="my-2">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between border-b border-border py-1">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        {order.note && <p className="text-sm">Note: {order.note}</p>}
        <p className="font-bold">Total: ₹{order.total}</p>
      </div>
    </div>
  );
}
