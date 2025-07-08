"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { initializeApp } from "firebase/app";
import Header from "../components/header";
import Footer from "../components/footer";

// Your Firebase config (replace with your own from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBncpf8PPEHrCBcztoQVf_8fDh5SDTNE1s",
  authDomain: "resina-website.firebaseapp.com",
  projectId: "resina-website",
  storageBucket: "resina-website.firebasestorage.app",
  messagingSenderId: "44423735107",
  appId: "1:44423735107:web:92c20ea60bbe9ccbd2f1f6",
  measurementId: "G-74QTMJTCPJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
      router.push("/"); // Redirect to home or dashboard
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleForgetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setError("Password reset email sent. Check your inbox.");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (

    <main className="bg-[#FAF3EB]">

      {/*Header Section*/}
      <Header />

      {/*Login Section*/}
      <section className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Georgia', serif" }}>
            Login
          </h1>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white p-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Login
            </button>
          </form>
          <p className="mt-2 text-sm text-gray-600">
            <button
              onClick={handleForgetPassword}
              className="text-indigo-600 hover:text-indigo-500 underline"
            >
              Forget Password?
            </button>
          </p>
          <p className="mt-4 text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <a href="/signup" className="text-indigo-600 hover:text-indigo-500">
              Sign up
            </a>
          </p>
        </div>
      </section>

      {/*Footer Section*/}
      <Footer />

    </main>
  );
}