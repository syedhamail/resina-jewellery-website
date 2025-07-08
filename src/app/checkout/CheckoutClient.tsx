"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "../context/CartProvider";
import Image from "next/image";
import products from "../data/products";
import Header from "../components/header";
import Footer from "../components/footer";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Link from "next/link";

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
const db = getFirestore(app);

interface Product {
  id: number;
  category: string;
  name: string;
  price: number;
  image: string[];
  hoverImage: string;
  description?: string;
}

export default function Checkout() {
  const [checkoutItems, setCheckoutItems] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    addressLine1: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const { cart, removeFromCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const buyNowId = searchParams.get("buyNow");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setIsLoading(false);
      console.log("Auth State Changed - User:", user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (!isLoggedIn) {
      router.push("/login?redirect=/checkout");
      return;
    }
    if (buyNowId) {
      const product = products.find((p) => p.id === parseInt(buyNowId, 10));
      if (product) {
        setCheckoutItems([product]);
        setQuantities({ [product.id]: 1 });
      }
    } else {
      setCheckoutItems([...cart]);
      const initialQuantities = cart.reduce((acc, item) => {
        acc[item.id] = 1;
        return acc;
      }, {} as { [key: number]: number });
      setQuantities(initialQuantities);
    }
  }, [buyNowId, cart, isLoggedIn, isLoading, router]);

  const handleRemove = (id: number) => {
    setCheckoutItems(checkoutItems.filter((item) => item.id !== id));
    const newQuantities = { ...quantities };
    delete newQuantities[id];
    setQuantities(newQuantities);
    removeFromCart(id);
  };

  const handleQuantityChange = (id: number, delta: number) => {
    setQuantities((prev) => {
      const newQty = Math.max(1, (prev[id] || 1) + delta);
      return { ...prev, [id]: newQty };
    });
  };

  const getItemTotal = (item: Product) => {
    return (item.price * (quantities[item.id] || 1)).toFixed(2);
  };

  const subtotal = checkoutItems.reduce((sum, item) => sum + item.price * (quantities[item.id] || 1), 0).toFixed(2);
  const shipping = 200.00;
  const total = (parseFloat(subtotal) + shipping).toFixed(2);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmOrder = async () => {
    if (
      !shippingAddress.fullName ||
      !shippingAddress.addressLine1 ||
      !shippingAddress.city ||
      !shippingAddress.postalCode ||
      !shippingAddress.country
    ) {
      alert("Please fill in all shipping address fields.");
      return;
    }
    const orderDetails = {
      items: checkoutItems.map((item) => ({
        name: item.name,
        quantity: quantities[item.id] || 1,
        price: item.price,
        total: getItemTotal(item),
      })),
      shippingAddress,
      total: total,
      orderId: `ORDER_${Date.now()}`,
      status: "Pending",
      userId: auth.currentUser?.uid || "anonymous",
      timestamp: new Date().toISOString(),
    };
    console.log("Attempting to save order:", orderDetails);
    try {
      await addDoc(collection(db, "orders"), orderDetails);
      setShowNotification(true);
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Failed to save order. Please try again. Check console for details.");
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <main className="bg-[#FAF3EB] min-h-screen">
      {/* Header Section */}
      <Header />

      {/* Checkout Section */}
      <section className="text-gray-700 body-font py-12">
        <div className="container mx-auto px-4 lg:px-0">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: "'Georgia', serif" }}>
            Checkout
          </h2>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Items List */}
            <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-xl p-4 sm:p-6">
              {checkoutItems.length === 0 ? (
                <div className="text-center py-8 sm:py-10">
                  <p className="text-gray-500 text-sm sm:text-base">Your cart is empty</p>
                  <Link href="/products" className="mt-3 inline-block text-indigo-600 hover:text-indigo-800 text-sm sm:text-base">
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-6">
                  {checkoutItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
                    >
                      {/* Product Image and Info */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-4 space-y-3 sm:space-y-0">
                        <div className="relative w-full sm:w-20 h-40 sm:h-20">
                          <Image
                            src={item.image[0]}
                            alt={item.name}
                            fill
                            className="object-cover rounded-md"
                            sizes="(max-width: 640px) 100vw, 80px"
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-base sm:text-lg font-medium text-gray-900 line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-gray-600 text-sm sm:text-base">
                            Price: Rs {item.price.toFixed(2)}
                          </p>

                          {/* Quantity Controls - Mobile */}
                          <div className="sm:hidden mt-2 flex items-center justify-between">
                            <div className="flex items-center">
                              <button
                                onClick={() => handleQuantityChange(item.id, -1)}
                                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l hover:bg-gray-300"
                              >
                                -
                              </button>
                              <span className="px-4 py-1 bg-white border-t border-b border-gray-200">
                                {quantities[item.id] || 1}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.id, 1)}
                                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r hover:bg-gray-300"
                              >
                                +
                              </button>
                            </div>
                            <p className="text-gray-800 font-semibold">
                              Rs {getItemTotal(item)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls - Desktop */}
                      <div className="hidden sm:flex items-center space-x-4">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 bg-white border-t border-b border-gray-200">
                            {quantities[item.id] || 1}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>

                        <p className="text-gray-800 font-semibold min-w-[100px] text-right">
                          Rs {getItemTotal(item)}
                        </p>

                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-red-500 hover:text-red-700 font-medium transition-colors ml-4"
                        >
                          Remove
                        </button>
                      </div>

                      {/* Remove Button - Mobile */}
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="sm:hidden mt-2 text-red-500 hover:text-red-700 font-medium transition-colors self-end"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Summary & Shipping Card */}
            <div className="lg:w-1/3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary & Shipping</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">Rs {subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Rs 200.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span>Rs {total}</span>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-lg font-medium mb-2">Shipping Address</h4>
                <div className="grid grid-cols-1 gap-2">
                  <input
                    type="text"
                    name="fullName"
                    value={shippingAddress.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="text"
                    name="addressLine1"
                    value={shippingAddress.addressLine1}
                    onChange={handleInputChange}
                    placeholder="Address Line 1"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="text"
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={handleInputChange}
                    placeholder="Postal Code"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="text"
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleInputChange}
                    placeholder="Pakistan"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Payment Method</h4>
              <div className="bg-white p-4 rounded-lg shadow-inner mb-4">
                <label className="flex items-center space-x-2 text-gray-700">
                  <input type="radio" name="paymentMethod" value="cod" checked className="text-purple-600 focus:ring-purple-500" />
                  <span className="font-medium">Cash on Delivery</span>
                  <span className="text-sm text-gray-500">(Pay when you receive your order)</span>
                </label>
              </div>
              <button
                onClick={handleConfirmOrder}
                className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md"
              >
                Confirm Order
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Notification */}
      {showNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-purple-100 to-pink-200 rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 transform transition-all duration-300">
            <button
              onClick={handleCloseNotification}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl font-bold leading-none"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center" style={{ fontFamily: "'Georgia', serif" }}>
              Order Confirmed!
            </h3>
            <p className="text-gray-700 mb-4 text-center">Thank you for your order. We’ll deliver it soon.</p>
            <div className="bg-white p-4 rounded-lg mb-4">
              <p className="text-gray-800"><strong>Total:</strong> Rs {total}</p>
              <p className="text-gray-800"><strong>Shipping to:</strong> {shippingAddress.fullName}, {shippingAddress.addressLine1}, {shippingAddress.city}</p>
            </div>
            <p className="text-sm text-gray-600 italic text-center">Track your order soon with our upcoming feature!</p>
            <div className="flex justify-center mt-4">
              <svg
                className="w-12 h-12 text-green-500 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-center mt-2 text-gray-500">Shukriya, Your order will delivered in 3-4 days. Enjoy your purchase! 🎉</p>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <div className="mt-20">
        <Footer />
      </div>
    </main>
  );
}