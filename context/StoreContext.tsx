"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Product } from "@/data/products";

interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreContextType {
  cartItems: CartItem[];
  wishlistItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  isChatOpen: boolean;
  toggleChat: () => void;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  cartCount: number;
  wishlistCount: number;
  cartSubtotal: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const addToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id));
  }, []);

  const updateQty = useCallback((id: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.product.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === id ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const addToWishlist = useCallback((product: Product) => {
    setWishlistItems((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  }, []);

  const removeFromWishlist = useCallback((id: number) => {
    setWishlistItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const toggleCart = useCallback(() => setIsCartOpen((v) => !v), []);
  const toggleChat = useCallback(() => setIsChatOpen((v) => !v), []);
  const openQuickView = useCallback((product: Product) => setQuickViewProduct(product), []);
  const closeQuickView = useCallback(() => setQuickViewProduct(null), []);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const wishlistCount = useMemo(() => wishlistItems.length, [wishlistItems]);

  const cartSubtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      wishlistItems,
      addToCart,
      removeFromCart,
      updateQty,
      addToWishlist,
      removeFromWishlist,
      isCartOpen,
      toggleCart,
      isChatOpen,
      toggleChat,
      quickViewProduct,
      openQuickView,
      closeQuickView,
      cartCount,
      wishlistCount,
      cartSubtotal,
    }),
    [
      cartItems,
      wishlistItems,
      addToCart,
      removeFromCart,
      updateQty,
      addToWishlist,
      removeFromWishlist,
      isCartOpen,
      toggleCart,
      isChatOpen,
      toggleChat,
      quickViewProduct,
      openQuickView,
      closeQuickView,
      cartCount,
      wishlistCount,
      cartSubtotal,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextType {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
