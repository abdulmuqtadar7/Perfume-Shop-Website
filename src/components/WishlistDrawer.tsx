"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, ShoppingBag, Trash2, X } from "lucide-react";
import { productById } from "@/lib/products";
import { useCart, useUI, useWish } from "@/lib/store";
import { rs } from "@/lib/format";

export default function WishlistDrawer() {
  const open = useUI((s) => s.wishOpen);
  const setOpen = useUI((s) => s.setWish);
  const setCartOpen = useUI((s) => s.setCart);
  const pushToast = useUI((s) => s.pushToast);

  const ids = useWish((s) => s.ids);
  const toggle = useWish((s) => s.toggle);
  const add = useCart((s) => s.add);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="w-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] bg-black/40"
            onClick={() => setOpen(false)}
          />
          <motion.aside
            key="wish"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 w-[min(460px,96vw)] bg-white z-[75] flex flex-col"
          >
            <header className="px-5 h-16 flex items-center justify-between border-b border-ink/10">
              <div className="flex items-center gap-2">
                <Heart size={18} />
                <p className="serif text-xl">Your Wishlist</p>
                <span className="text-xs text-ink-muted">({ids.length})</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 grid place-items-center rounded-full hover:bg-ink/5"
                aria-label="Close wishlist"
              >
                <X size={18} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {ids.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto rounded-full bg-ink/5 grid place-items-center text-ink-muted">
                    <Heart size={22} />
                  </div>
                  <p className="serif text-xl mt-4">No favourites yet</p>
                  <p className="text-sm text-ink-muted mt-1">
                    Tap the heart on any product to save it.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-ink/10">
                  {ids.map((id) => {
                    const p = productById(id);
                    if (!p) return null;
                    return (
                      <li key={id} className="py-4 flex gap-3">
                        <div
                          className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-ink/10"
                          style={{ background: p.art }}
                        >
                          <div className="ub-bottle" style={{ ["--bot" as string]: p.art }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="serif text-[17px] truncate">{p.name}</p>
                          <p className="text-xs text-ink-muted uppercase tracking-wider">
                            {p.category}
                          </p>
                          <p className="mt-1 font-semibold text-sm">{rs(p.price)}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              onClick={() => {
                                add(p.id);
                                setOpen(false);
                                setCartOpen(true);
                                pushToast(`${p.name} added to cart`);
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink text-white text-xs hover:bg-gold hover:text-ink transition"
                            >
                              <ShoppingBag size={12} />
                              Add to cart
                            </button>
                            <button
                              onClick={() => toggle(p.id)}
                              className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-rose-500"
                            >
                              <Trash2 size={12} /> Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
