"use client";

import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { MdShoppingCart, MdMenu, MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartProvider";
import Image from "next/image";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Your Firebase config
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

interface Product {
  id: number;
  category: string;
  name: string;
  price: number;
  image: string[];
  hoverImage: string;
  description?: string;
}

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, addToCart, removeFromCart } = useCart();
  const [userInitial, setUserInitial] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState<string>("#6b7280"); // Default gray color
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [logoutMessage, setLogoutMessage] = useState<string | null>(null);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const initial = user.displayName?.charAt(0) || user.email?.charAt(0) || "U";
        setUserInitial(initial.toUpperCase());
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        setBgColor(randomColor);
        setIsLoggedIn(true);
      } else {
        setUserInitial(null);
        setIsLoggedIn(false);
      }
      setIsLoading(false); // Authentication check complete
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserInitial(null);
      setIsLoggedIn(false);
      setLogoutMessage("You've been logged out");
      setTimeout(() => setLogoutMessage(null), 3000); // Hide after 3 seconds
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleCheckout = () => {
    if (isLoading) return; // Wait for auth check
    if (!isLoggedIn) {
      window.location.href = "/login?redirect=/";
      return;
    }
    if (cart.length > 0) {
      window.location.href = "/checkout";
    }
  };

  const handleUserClick = () => {
    if (isLoggedIn) {
      window.location.href = "/user";
    }
  };

  return (
    <main>
      {/* Top Banner */}
      <div className="bg-black text-white text-xs md:text-[13px] p-2 md:p-3 text-center">
        <h1>Free Home Shipping above Rs: 3999</h1>
      </div>

      {/* Header */}
      <header className="text-gray-400">
        <div className="flex justify-between items-center p-4 md:p-5 max-w-7xl mx-auto">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-black"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center text-black">
            <h1
              className="text-xl md:text-2xl bg-gradient-to-r from-purple-500 to-pink-600 text-transparent bg-clip-text hover:scale-105 transition-transform duration-300"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              RESINA JEWELLERY
            </h1>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6 font-semibold text-[110%]">
            <Link href="/" className="mr-5 hover:text-slate-600 hover:scale-105 transition-transform duration-300">
              Home
            </Link>
            <Link href="/aboutus" className="mr-5 hover:text-slate-600 hover:scale-105 transition-transform duration-300">
              About
            </Link>
            <Link href="/products" className="mr-5 hover:text-slate-600 hover:scale-105 transition-transform duration-300">
              Shop
            </Link>
            <Link href="#contact" className="mr-5 hover:text-slate-600 hover:scale-105 transition-transform duration-300">
              Contact us
            </Link>
          </div>

          {/* User/Cart Section */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <span className="hidden md:inline text-sm">Pakistan | PKR Rs</span>
            <div className="flex items-center space-x-4">
              <span
                onClick={toggleCart}
                className="relative cursor-pointer"
              >
                <MdShoppingCart className="text-black w-[20px] h-[20px]" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </span>
              {isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <div
                    onClick={handleUserClick}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:scale-105 transition-transform duration-300"
                    style={{ backgroundColor: bgColor }}
                  >
                    {userInitial}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="hidden md:block text-black text-sm hover:text-gray-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/login">
                  <CgProfile className="text-black font-bolder w-[20px] h-[20px] hover:scale-105 transition-transform duration-300" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-4 py-2 space-y-3">
              <Link 
                href="/" 
                className="block py-2 hover:text-slate-600"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <Link 
                href="/aboutus" 
                className="block py-2 hover:text-slate-600"
                onClick={toggleMobileMenu}
              >
                About
              </Link>
              <Link 
                href="/products" 
                className="block py-2 hover:text-slate-600"
                onClick={toggleMobileMenu}
              >
                Shop
              </Link>
              <Link 
                href="#contact" 
                className="block py-2 hover:text-slate-600"
                onClick={toggleMobileMenu}
              >
                Contact us
              </Link>
              {isLoggedIn && (
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                  className="block py-2 text-black text-left w-full hover:text-gray-600"
                >
                  Logout
                </button>
              )}
              <div className="pt-2 border-t border-gray-200">
                <span className="text-sm text-gray-500">Pakistan | PKR Rs</span>
              </div>
            </div>
          </div>
        )}

        {/* Logout Notification */}
        {logoutMessage && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade">
            {logoutMessage}
          </div>
        )}

        {/* Cart Sidebar */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50">
            <div 
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={toggleCart}
            ></div>
            <div className="absolute top-0 right-0 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white h-full shadow-lg p-4 md:p-6 overflow-y-auto">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                Your Cart
              </h2>
              <button
                onClick={toggleCart}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
              {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
              ) : (
                <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-2 border-b border-gray-200">
                      <Image
                        src={item.image[0]}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm md:text-md font-medium text-gray-900">{item.name}</h3>
                        <p className="text-gray-600">Rs {item.price.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {cart.length > 0 && (
                <button
                  onClick={handleCheckout}
                  className="mt-6 w-full bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
                >
                  Checkout
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Animation for Notification */}
      <style jsx>{`
        @keyframes fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade {
          animation: fade 0.3s ease-in-out;
        }
      `}</style>
    </main>
  );
}