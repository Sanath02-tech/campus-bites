"use client";

import { useSyncExternalStore } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import Loader from "./Loader";

const noop = () => () => {};

// true in the browser, false while rendering on the server
function useIsClient() {
  return useSyncExternalStore(noop, () => true, () => false);
}

// Wraps the whole app so every page can use Auth, Cart and Order state.
// The state is saved in localStorage (browser only), so we render the app
// only in the browser — otherwise server HTML and browser HTML would differ.
export default function Providers({ children }) {
  const isClient = useIsClient();

  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>{isClient ? children : <Loader label="Loading CampusBites..." />}</OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}
