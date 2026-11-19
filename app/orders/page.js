"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useOrders, getOrderStatus } from "@/context/OrderContext";
import { getCanteen } from "@/data/canteens";
import { formatDateTime } from "@/lib/format";
import { useNow } from "@/lib/useNow";
import EmptyState from "@/components/EmptyState";

export default function OrdersPage() {
  const { user } = useAuth();
  const { orders } = useOrders();
  const now = useNow();

  if (!user) {
    return <EmptyState title="Login to see your orders" actionLabel="Login" actionHref="/login?next=/orders" />;
  }

  if (orders.length === 0) {
    return <EmptyState title="No orders yet" actionLabel="Browse menu" actionHref="/menu" />;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">My orders</h1>
      <div>
        {orders.map((order) => {
          const status = getOrderStatus(order, now);
          const canteen = getCanteen(order.canteenId);
          return (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="flex items-center gap-3 border-b border-border py-2 hover:bg-gray-50"
            >
              <div className="flex-1">
                <p className="font-medium">
                  #{order.id} · {canteen?.name}
                </p>
                <p className="text-sm text-muted">
                  ₹{order.total} · {formatDateTime(order.placedAt)}
                </p>
              </div>
              <span className="text-sm">{status.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
