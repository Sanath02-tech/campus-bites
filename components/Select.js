// Labelled dropdown
export default function Select({ label, id, options, className = "", ...props }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm">
          {label}
        </label>
      )}
      <select id={id} className="w-full rounded border border-border px-2 py-1.5" {...props}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
