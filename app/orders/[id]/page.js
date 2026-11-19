import { Suspense } from "react";
import Loader from "@/components/Loader";
import OrderDetailView from "./OrderDetailView";

// The order ID comes from the URL, so the client view is wrapped in Suspense
export default function OrderDetailPage() {
  return (
    <Suspense fallback={<Loader label="Loading order..." />}>
      <OrderDetailView />
    </Suspense>
  );
}
