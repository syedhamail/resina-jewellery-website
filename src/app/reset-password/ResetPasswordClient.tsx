"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAuth, confirmPasswordReset } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";

// Prevent Firebase reinitialization
const firebaseConfig = {
  apiKey: "AIzaSyBncpf8PPEHrCBcztoQVf_8fDh5SDTNE1s",
  authDomain: "resina-website.firebaseapp.com",
  projectId: "resina-website",
  storageBucket: "resina-website.firebasestorage.app",
  messagingSenderId: "44423735107",
  appId: "1:44423735107:web:92c20ea60bbe9ccbd2f1f6",
  measurementId: "G-74QTMJTCPJ",
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}
const auth = getAuth();

export default function ResetPasswordClient() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const actionCode = searchParams.get("oobCode");
    if (!actionCode) {
      setError("Invalid or expired reset link.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const actionCode = searchParams.get("oobCode");

    if (!actionCode) return setError("No reset code found.");
    if (newPassword !== confirmPassword) return setError("Passwords do not match.");
    if (newPassword.length < 6) return setError("Password must be at least 6 characters.");

    try {
      await confirmPasswordReset(auth, actionCode, newPassword);
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#FAF3EB]">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4">Success</h1>
          <p className="text-green-600">Password updated! Redirecting to login...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FAF3EB]">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Reset Password</h1>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              placeholder="Confirm new password"
            />
          </div>
          <button type="submit" className="w-full bg-gray-900 text-white p-2 rounded hover:bg-gray-700 transition">
            Update Password
          </button>
        </form>
      </div>
    </main>
  );
}
