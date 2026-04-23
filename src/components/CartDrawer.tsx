import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart, selectCartTotal } from "../store/cart";
import { useEffect } from "react";

export function CartDrawer() {
  const { isOpen, closeCart, items, updateQuantity, removeItem } = useCart();
  const total = useCart(selectCartTotal);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            aria-label="Close cart"
            className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
            className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-cream-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-ink-900/5">
              <h3 className="font-display text-xl">Your atelier bag</h3>
              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-full hover:bg-ink-900/5 grid place-items-center"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {items.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-16 h-16 rounded-full bg-ink-900/5 grid place-items-center mb-4">
                    <span className="text-2xl">✨</span>
                  </div>
                  <p className="font-display text-lg">Your bag is empty</p>
                  <p className="text-sm text-ink-900/60 mt-1 max-w-[240px]">
                    Every scent is a chapter waiting to begin.
                  </p>
                  <Link
                    to="/shop"
                    onClick={closeCart}
                    className="btn-primary mt-6"
                  >
                    Discover fragrances
                  </Link>
                </div>
              )}

              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  className="flex gap-4 p-3 rounded-2xl bg-white/70 border border-ink-900/5"
                >
                  <div
                    className={`w-20 h-24 rounded-xl bg-gradient-to-br ${item.product.accent} bg-cover bg-center shrink-0`}
                    style={{ backgroundImage: `url(${item.product.image})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-display text-base truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-ink-900/50">
                          {item.product.size} · {item.product.category}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-ink-900/40 hover:text-ink-900"
                        aria-label="Remove"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="inline-flex items-center border border-ink-900/10 rounded-full">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-7 h-7 grid place-items-center hover:text-gold-600"
                          aria-label="Decrease"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-6 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-7 h-7 grid place-items-center hover:text-gold-600"
                          aria-label="Increase"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <span className="font-medium">
                        ${(item.product.price * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {items.length > 0 && (
              <div className="border-t border-ink-900/5 px-6 py-5 space-y-3 bg-white/60 backdrop-blur">
                <div className="flex items-center justify-between text-sm text-ink-900/60">
                  <span>Subtotal</span>
                  <span>${total.toFixed(0)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-ink-900/60">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-ink-900/5">
                  <span className="font-display text-lg">Total</span>
                  <span className="font-display text-xl">${total.toFixed(0)}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="btn-primary w-full"
                >
                  Proceed to checkout
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full text-sm text-ink-900/60 hover:text-ink-900 py-1"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
