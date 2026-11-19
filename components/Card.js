// Simple bordered box, reused on many pages
export default function Card({ children, className = "" }) {
  return <div className={`rounded border border-border p-4 ${className}`}>{children}</div>;
}
