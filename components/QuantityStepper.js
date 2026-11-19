// – 2 + control used on the menu and in the cart
export default function QuantityStepper({ quantity, onChange }) {
  return (
    <span className="inline-flex items-center gap-2">
      <button onClick={() => onChange(quantity - 1)} className="rounded border border-border px-2" aria-label="Decrease quantity">
        −
      </button>
      <span>{quantity}</span>
      <button onClick={() => onChange(quantity + 1)} className="rounded border border-border px-2" aria-label="Increase quantity">
        +
      </button>
    </span>
  );
}
