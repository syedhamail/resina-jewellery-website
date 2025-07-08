import { Suspense } from "react";
import ResetPasswordClient from "./ResetPasswordClient";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <ResetPasswordClient />
    </Suspense>
  );
}
