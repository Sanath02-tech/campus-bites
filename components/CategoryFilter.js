// Row of buttons used to filter the menu by category or canteen
export default function CategoryFilter({ options, selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const value = typeof option === "string" ? option : option.value;
        const label = typeof option === "string" ? option : option.label;
        const active = value === selected;
        return (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className={`rounded border px-2 py-1 text-sm ${
              active ? "border-primary bg-primary text-white" : "border-border bg-white"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
