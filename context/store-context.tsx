"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Product, products } from "@/data/products";

type CartItem = { productId: string; quantity: number };
type Order = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  city: string;
  paymentMethod: string;
  subtotal: number;
  items: CartItem[];
};

type StoreContextType = {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  cartOpen: boolean;
  setCartOpen: (value: boolean) => void;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartCount: number;
  wishlistCount: number;
  cartSubtotal: number;
  createOrder: (order: Omit<Order, "id" | "createdAt">) => void;
  findProduct: (idOrSlug: string) => Product | undefined;
};

const StoreContext = createContext<StoreContextType | null>(null);

const CART_KEY = "the-essence-cart";
const WISHLIST_KEY = "the-essence-wishlist";
const ORDERS_KEY = "the-essence-orders";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem(WISHLIST_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem(ORDERS_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  const addToCart = (productId: string, quantity = 1) => {
    setCart((prev) => {
      const found = prev.find((item) => item.productId === productId);
      if (found) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }
      return [...prev, { productId, quantity }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) => prev.map((item) => (item.productId === productId ? { ...item, quantity } : item)));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
  const wishlistCount = wishlist.length;

  const cartSubtotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.productId);
        return sum + (product?.price ?? 0) * item.quantity;
      }, 0),
    [cart],
  );

  const createOrder = (order: Omit<Order, "id" | "createdAt">) => {
    setOrders((prev) => [
      {
        ...order,
        id: `ORD-${Math.floor(Math.random() * 900000 + 100000)}`,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
    setCart([]);
  };

  const findProduct = (idOrSlug: string) => products.find((p) => p.id === idOrSlug || p.slug === idOrSlug);

  const value: StoreContextType = {
    products,
    cart,
    wishlist,
    orders,
    cartOpen,
    setCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    isInWishlist,
    cartCount,
    wishlistCount,
    cartSubtotal,
    createOrder,
    findProduct,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
