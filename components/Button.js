import Link from "next/link";

const variants = {
  primary: "bg-primary text-white border border-primary hover:bg-primary-dark",
  outline: "bg-white text-text border border-border hover:bg-gray-100",
};

// Reusable button. Pass `href` to render it as a link instead of a <button>.
export default function Button({ children, variant = "primary", href, className = "", ...props }) {
  const classes = `inline-block rounded px-3 py-1.5 text-sm disabled:opacity-50 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
