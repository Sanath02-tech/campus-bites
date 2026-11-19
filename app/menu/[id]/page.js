import { Suspense } from "react";
import Loader from "@/components/Loader";
import MenuItemView from "./MenuItemView";

// The item ID comes from the URL, so the client view is wrapped in Suspense
export default function MenuItemPage() {
  return (
    <Suspense fallback={<Loader label="Loading dish..." />}>
      <MenuItemView />
    </Suspense>
  );
}
