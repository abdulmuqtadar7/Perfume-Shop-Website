"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function CartDrawer() {
  const { isCartOpen, toggleCart, cartItems, removeFromCart, updateQty, cartSubtotal } =
    useStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-50"
            onClick={toggleCart}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-charcoal" />
                <h2 className="font-playfair text-lg font-semibold text-charcoal">
                  Your Cart
                </h2>
                {cartItems.length > 0 && (
                  <span className="bg-gold text-charcoal text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center font-inter">
                    {cartItems.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={toggleCart}
                className="p-1 text-gray-400 hover:text-charcoal transition-colors"
                aria-label="Close cart"
              >
                <X size={22} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4 px-5">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
                  <ShoppingBag size={48} className="text-gray-200" />
                  <p className="text-gray-400 font-inter text-sm">
                    Your cart is empty
                  </p>
                  <button
                    onClick={toggleCart}
                    className="px-6 py-2.5 bg-gold text-charcoal text-xs font-bold tracking-widest uppercase font-inter"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-5">
                  {cartItems.map(({ product, quantity }) => (
                    <li key={product.id} className="flex gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0 bg-cream">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-playfair text-sm font-semibold text-charcoal leading-snug mb-1 line-clamp-2">
                          {product.title}
                        </h4>
                        <p className="text-gold font-bold text-sm font-inter">
                          Rs. {product.price.toLocaleString()}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          {/* Qty controls */}
                          <div className="flex items-center border border-gray-200">
                            <button
                              onClick={() => updateQty(product.id, quantity - 1)}
                              className="p-1.5 hover:bg-cream transition-colors text-charcoal"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-3 text-xs font-medium font-inter text-charcoal">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQty(product.id, quantity + 1)}
                              className="p-1.5 hover:bg-cream transition-colors text-charcoal"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-100 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm font-inter">Subtotal</span>
                  <span className="font-playfair text-xl font-bold text-charcoal">
                    Rs. {cartSubtotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-inter">
                  Shipping calculated at checkout
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gold text-charcoal py-4 text-xs font-bold tracking-widest uppercase font-inter hover:bg-gold-dark transition-colors duration-200"
                >
                  Proceed to Checkout
                </motion.button>
                <button
                  onClick={toggleCart}
                  className="w-full text-center text-xs text-gray-400 hover:text-charcoal transition-colors font-inter underline"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
