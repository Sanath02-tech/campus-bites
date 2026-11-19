"use client";

import { ORDER_STEPS } from "@/context/OrderContext";

// Shows the steps as text: Order placed → Preparing → Ready for pickup
export default function OrderStatusTracker({ stepIndex }) {
  return (
    <p className="text-sm">
      {ORDER_STEPS.map((step, i) => (
        <span key={step.key}>
          <span className={i <= stepIndex ? "font-bold text-primary" : "text-muted"}>
            {i < stepIndex ? "✓ " : ""}
            {step.label}
          </span>
          {i < ORDER_STEPS.length - 1 && <span className="text-muted"> → </span>}
        </span>
      ))}
    </p>
  );
}
