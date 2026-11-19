// Labelled input. Renders a <textarea> when `multiline` is true.
export default function Input({ label, id, multiline = false, className = "", ...props }) {
  const fieldClasses = "w-full rounded border border-border px-2 py-1.5";

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm">
          {label}
        </label>
      )}
      {multiline ? (
        <textarea id={id} rows={2} className={fieldClasses} {...props} />
      ) : (
        <input id={id} className={fieldClasses} {...props} />
      )}
    </div>
  );
}
