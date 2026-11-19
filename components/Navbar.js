"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const links = [
  { href: "/menu", label: "Menu" },
  { href: "/orders", label: "My Orders" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <header className="border-b border-border">
      <nav className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3">
        <Link href="/" className="mr-auto text-lg font-bold">
          Campus<span className="text-primary">Bites</span>
        </Link>

        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname.startsWith(link.href) ? "font-bold text-primary" : "hover:underline"}
          >
            {link.label}
          </Link>
        ))}

        <Link href="/cart" className={pathname === "/cart" ? "font-bold text-primary" : "hover:underline"}>
          Cart ({totalItems})
        </Link>

        {user ? (
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        ) : (
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
