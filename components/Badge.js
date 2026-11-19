const colors = {
  default: "text-muted",
  success: "text-success",
  error: "text-error",
  primary: "text-primary",
};

// Small coloured label, e.g. "Veg", "Open", "Ready"
export default function Badge({ children, color = "default", className = "" }) {
  return <span className={`text-xs font-medium ${colors[color]} ${className}`}>{children}</span>;
}
