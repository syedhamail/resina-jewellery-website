"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface Product {
  id: number;
  category: string;
  name: string;
  price: number;
  image: string[];
  hoverImage: string;
  description?: string;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  // Initialize cart with localStorage data if available (client-side only)
  const getInitialCart = () => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  };

  const [cart, setCart] = useState<Product[]>(getInitialCart);
  const [isLoading, setIsLoading] = useState(false); // Removed initial loading since state is set immediately

  // Sync localStorage with state changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    console.log("Adding product to cart:", product);
    const isDuplicate = cart.some((item) => item.id === product.id);
    if (isDuplicate) {
      alert("Product is already in the cart");
      return;
    }
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (productId: number) => {
    console.log("Removing product with id:", productId);
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);