// Loading state
export default function Loader({ label = "Loading..." }) {
  return (
    <p className="py-8 text-center text-muted" role="status">
      {label}
    </p>
  );
}
