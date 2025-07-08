import { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading Checkout...</div>}>
      <CheckoutClient />
    </Suspense>
  );
}
