'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type CartItem = {
  productId: string;
  title: string;
  price: number;
  image: string;
  slug: string;
  quantity: number;
  inStock: boolean;
};

interface CartContextType {
  cart: CartItem[];
  itemCount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateQuantity: (productId: string, quantity: number) => void;
  refreshCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  itemCount: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  updateQuantity: () => {},
  refreshCart: () => {},
});

const STORAGE_KEY = 'local_cart';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState<number>(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    refreshCart();
  }, []);

  const saveCart = (items: CartItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    setCart(items);
    setItemCount(items.reduce((total, item) => total + item.quantity, 0));
  };

  const refreshCart = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      setCart(parsed);
      setItemCount(parsed.reduce((acc: number, item: CartItem) => acc + item.quantity, 0));
    } catch {
      setCart([]);
      setItemCount(0);
    }
  };

  const addToCart = (item: CartItem) => {
    const existing = cart.find((i) => i.productId === item.productId);
    let updated: CartItem[];

    if (existing) {
      updated = cart.map((i) =>
        i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i
      );
    } else {
      updated = [...cart, item];
    }

    saveCart(updated);
  };

  const removeFromCart = (productId: string) => {
    const updated = cart.filter((item) => item.productId !== productId);
    saveCart(updated);
  };

  const clearCart = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCart([]);
    setItemCount(0);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const updated = cart.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );
    saveCart(updated);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        refreshCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
