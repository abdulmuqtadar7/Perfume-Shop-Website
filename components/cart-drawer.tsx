"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useStore } from "@/context/store-context";

function money(value: number) {
  return new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(value);
}

export function CartDrawer() {
  const { cartOpen, setCartOpen, cart, findProduct, updateQuantity, removeFromCart, cartSubtotal } = useStore();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div className="fixed inset-0 bg-black/40 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="h-16 px-5 border-b flex items-center justify-between">
              <h3 className="font-semibold">Your Cart</h3>
              <button onClick={() => setCartOpen(false)} aria-label="Close cart"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 && <p className="text-neutral-500">Your cart is empty.</p>}
              {cart.map((item) => {
                const product = findProduct(item.productId);
                if (!product) return null;
                return (
                  <article key={item.productId} className="border border-neutral-200 rounded-xl p-3">
                    <div className="flex gap-3">
                      <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-neutral-500">{money(product.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button className="w-7 h-7 border rounded grid place-items-center" onClick={() => updateQuantity(item.productId, item.quantity - 1)}><Minus size={14} /></button>
                          <span>{item.quantity}</span>
                          <button className="w-7 h-7 border rounded grid place-items-center" onClick={() => updateQuantity(item.productId, item.quantity + 1)}><Plus size={14} /></button>
                          <button className="ml-auto text-neutral-500" onClick={() => removeFromCart(item.productId)}><Trash2 size={14} /></button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="border-t p-5 space-y-3">
              <div className="flex justify-between font-semibold">
                <span>Subtotal</span>
                <span>{money(cartSubtotal)}</span>
              </div>
              <Link href="/checkout" onClick={() => setCartOpen(false)} className="block h-11 rounded-md bg-[#B48A54] text-white text-center leading-[44px]">
                Proceed to Checkout
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
