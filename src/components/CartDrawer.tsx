"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { productById } from "@/lib/products";
import { useCart, useUI } from "@/lib/store";
import { rs } from "@/lib/format";

export default function CartDrawer() {
  const open = useUI((s) => s.cartOpen);
  const setOpen = useUI((s) => s.setCart);
  const pushToast = useUI((s) => s.pushToast);

  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);

  const subtotal = lines.reduce((n, l) => {
    const p = productById(l.productId);
    return n + (p ? p.price * l.qty : 0);
  }, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="c-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] bg-black/40"
            onClick={() => setOpen(false)}
          />
          <motion.aside
            key="cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 w-[min(460px,96vw)] bg-white z-[75] flex flex-col"
          >
            <header className="px-5 h-16 flex items-center justify-between border-b border-ink/10">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} />
                <p className="serif text-xl">Your Cart</p>
                <span className="text-xs text-ink-muted">
                  ({lines.reduce((n, l) => n + l.qty, 0)})
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 grid place-items-center rounded-full hover:bg-ink/5"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {lines.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto rounded-full bg-ink/5 grid place-items-center text-ink-muted">
                    <ShoppingBag size={22} />
                  </div>
                  <p className="serif text-xl mt-4">Your cart is empty</p>
                  <p className="text-sm text-ink-muted mt-1">
                    Discover our signature perfumes & attars.
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-6 px-6 py-3 rounded-full bg-ink text-white text-sm hover:bg-gold hover:text-ink transition"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-ink/10">
                  {lines.map((l) => {
                    const p = productById(l.productId);
                    if (!p) return null;
                    return (
                      <li key={l.lineId} className="py-4 flex gap-3">
                        <div
                          className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-ink/10"
                          style={{ background: p.art }}
                        >
                          <div className="ub-bottle" style={{ ["--bot" as string]: p.art }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-3">
                            <div className="min-w-0">
                              <p className="serif text-[17px] truncate">{p.name}</p>
                              <p className="text-xs text-ink-muted uppercase tracking-wider">
                                {l.variant ?? p.category}
                              </p>
                            </div>
                            <button
                              className="text-ink-muted hover:text-rose-500"
                              onClick={() => {
                                remove(l.lineId);
                                pushToast(`${p.name} removed`);
                              }}
                              aria-label="Remove"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="inline-flex items-center border border-ink/15 rounded-full">
                              <button
                                onClick={() => setQty(l.lineId, -1)}
                                className="w-8 h-8 grid place-items-center"
                                aria-label="Decrease"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-8 text-center text-sm">{l.qty}</span>
                              <button
                                onClick={() => setQty(l.lineId, +1)}
                                className="w-8 h-8 grid place-items-center"
                                aria-label="Increase"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <p className="font-semibold">{rs(p.price * l.qty)}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <footer className="border-t border-ink/10 p-5 space-y-3 bg-cream/40">
                <div className="flex justify-between text-sm">
                  <span className="text-ink-muted">Subtotal</span>
                  <span className="font-semibold">{rs(subtotal)}</span>
                </div>
                <p className="text-xs text-ink-muted">
                  {subtotal >= 3999
                    ? "🚚 You've unlocked free shipping!"
                    : `Add ${rs(3999 - subtotal)} more for free shipping.`}
                </p>
                <button
                  onClick={() => pushToast("Checkout is a demo — wire up your payment provider.")}
                  className="w-full py-3.5 rounded-full bg-gold text-ink font-medium hover:bg-ink hover:text-white transition-colors duration-300"
                >
                  CHECKOUT · {rs(subtotal)}
                </button>
                <button
                  onClick={() => clear()}
                  className="w-full text-xs text-ink-muted hover:text-ink"
                >
                  Clear cart
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
