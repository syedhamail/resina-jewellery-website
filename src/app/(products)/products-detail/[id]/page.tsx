"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import products from "../../../data/products";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import React, { useState, useEffect } from "react";
import { useCart } from "../../../context/CartProvider";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBncpf8PPEHrCBcztoQVf_8fDh5SDTNE1s",
  authDomain: "resina-website.firebaseapp.com",
  projectId: "resina-website",
  storageBucket: "resina-website.appspot.com",
  messagingSenderId: "44423735107",
  appId: "1:44423735107:web:92c20ea60bbe9ccbd2f1f6",
  measurementId: "G-74QTMJTCPJ"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

// This is the key fix - using the correct type definition
type PageProps = {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function Page({ params }: PageProps) {
  const productId = parseInt(params.id, 10);
  const product = products.find((p) => p.id === productId);

  if (!product) notFound();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  const { addToCart } = useCart();

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.image.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.image.length) % product.image.length);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAddToCart = () => {
    if (isLoading) return;
    if (!isLoggedIn) {
      window.location.href = `/login?redirect=/products-detail/${productId}`;
      return;
    }
    addToCart(product);
    setNotification("Product added to cart");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBuyNow = () => {
    if (isLoading) return;
    if (!isLoggedIn) {
      window.location.href = `/login?redirect=/products-detail/${productId}`;
      return;
    }
    addToCart(product);
    window.location.href = `/checkout?buyNow=${productId}`;
  };

  return (
    <main className="bg-[#FAF3EB]">
      <Header />

      <section className="text-gray-600 body-font mb-10">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col md:flex-row -m-4">
            <div className="md:w-1/2 p-4">
              <div className="relative rounded overflow-hidden">
                <Image
                  alt={product.name}
                  className="object-cover object-center w-full h-[480px]"
                  src={product.image[currentImageIndex]}
                  width={270}
                  height={480}
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-end pr-4">
                  <button
                    onClick={handlePrevImage}
                    className="bg-gray-900 text-white p-2 rounded-full mr-2 hover:bg-gray-700 transition-colors"
                    aria-label="Previous Image"
                  >
                    ←
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="bg-gray-900 text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
                    aria-label="Next Image"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 p-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
              <h3 className="text-gray-500 text-sm tracking-widest mb-2">{product.category}</h3>
              <p className="text-lg font-medium mb-4">Rs {product.price.toFixed(2)}</p>
              <h2 className="font-bold -mb-3">Product Details</h2>
              {product.description && (
                <div className="text-gray-600 mb-6">
                  <div dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, "<br />") }} />
                </div>
              )}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade">
          {notification}
        </div>
      )}

      <Footer />

      <style jsx>{`
        @keyframes fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade {
          animation: fade 0.3s ease-in-out;
        }
      `}</style>
    </main>
  );
}