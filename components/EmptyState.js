import Button from "./Button";

// Shown when a list has nothing in it (empty cart, no orders, no search results)
export default function EmptyState({ title, message, actionLabel, actionHref }) {
  return (
    <div className="rounded border border-dashed border-border p-8 text-center">
      <p className="font-bold">{title}</p>
      {message && <p className="mt-1 text-sm text-muted">{message}</p>}
      {actionLabel && actionHref && (
        <Button href={actionHref} className="mt-3">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
