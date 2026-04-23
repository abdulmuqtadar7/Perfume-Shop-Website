"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, Minus, Plus, Star, X } from "lucide-react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { productById } from "@/lib/products";
import { useCart, useUI, useWish } from "@/lib/store";
import { rs } from "@/lib/format";

export default function QuickViewModal() {
  const quickViewId = useUI((s) => s.quickViewId);
  const setQuickView = useUI((s) => s.setQuickView);
  const setCartOpen = useUI((s) => s.setCart);
  const pushToast = useUI((s) => s.pushToast);
  const add = useCart((s) => s.add);
  const toggleWish = useWish((s) => s.toggle);
  const wished = useWish((s) => s.ids);

  const p = quickViewId ? productById(quickViewId) : null;
  const [variant, setVariant] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (p) {
      setVariant(p.variants?.[0] ?? null);
      setQty(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p?.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setQuickView(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setQuickView]);

  return (
    <AnimatePresence>
      {p && (
        <>
          <motion.div
            key="qv-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
            onClick={() => setQuickView(null)}
          />
          <motion.div
            key="qv"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[85] grid place-items-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setQuickView(null);
            }}
          >
            <div className="relative bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-card-hover grid md:grid-cols-2 gap-0 md:gap-6 max-h-[90vh]">
              <button
                onClick={() => setQuickView(null)}
                className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur grid place-items-center border border-ink/10 hover:bg-ink hover:text-white transition"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div
                className="relative min-h-[280px] md:min-h-[480px]"
                style={{ background: p.art }}
              >
                <div className="ub-bottle" style={{ ["--bot" as string]: p.art }}>
                  <div className="ub-label">
                    <p className="ub-label__brand">USMAN BAIG</p>
                    <p className="ub-label__name serif">{p.name}</p>
                    <p className="ub-label__tag">{p.category}</p>
                  </div>
                </div>
                <span className="absolute top-4 left-4 bg-ink text-white text-[11px] font-semibold tracking-wide px-2 py-1 rounded">
                  -{p.discountPct}%
                </span>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto">
                <p className="text-[11px] uppercase tracking-[0.22em] text-gold-dark">
                  {p.category} · {p.gender}
                </p>
                <h3 className="serif text-3xl mt-1">{p.name}</h3>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span className="flex items-center gap-0.5 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < Math.round(p.rating) ? "currentColor" : "none"}
                        className="stroke-current"
                      />
                    ))}
                  </span>
                  <span className="text-ink-muted">
                    {p.rating.toFixed(1)} · {p.reviews} reviews
                  </span>
                </div>

                <div className="mt-4 flex items-baseline gap-3">
                  <span className="serif text-2xl text-ink">{rs(p.price)}</span>
                  <span className="text-ink-muted line-through text-sm">
                    {rs(p.originalPrice)}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Save {p.discountPct}%
                  </span>
                </div>

                <p className="mt-4 text-sm text-ink-soft leading-relaxed">
                  {p.description}
                </p>

                {p.notes.top !== "—" && (
                  <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
                    <NoteBox label="Top" value={p.notes.top} />
                    <NoteBox label="Heart" value={p.notes.heart} />
                    <NoteBox label="Base" value={p.notes.base} />
                  </div>
                )}

                {p.variants && p.variants.length > 0 && (
                  <div className="mt-5">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-ink-muted mb-2">
                      Size
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.variants.map((v) => (
                        <button
                          key={v}
                          onClick={() => setVariant(v)}
                          className={clsx(
                            "px-4 py-2 rounded-full border text-sm transition",
                            variant === v
                              ? "bg-ink text-white border-ink"
                              : "border-ink/15 text-ink-soft hover:border-ink"
                          )}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex items-center justify-between text-sm border-t border-ink/10 pt-4">
                  <span className="text-ink-muted uppercase tracking-[0.18em] text-[11px]">
                    Line total
                  </span>
                  <span className="serif text-xl text-ink">{rs(p.price * qty)}</span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="inline-flex items-center border border-ink/15 rounded-full">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 grid place-items-center"
                      aria-label="Decrease"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm">{qty}</span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      className="w-10 h-10 grid place-items-center"
                      aria-label="Increase"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      for (let i = 0; i < qty; i++) add(p.id, variant ?? undefined);
                      setQuickView(null);
                      setCartOpen(true);
                      pushToast(`${p.name} added to cart`);
                    }}
                    className="flex-1 px-6 py-3 rounded-full bg-ink text-white text-sm font-semibold tracking-wide hover:bg-gold hover:text-ink hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      toggleWish(p.id);
                      pushToast(
                        wished.includes(p.id)
                          ? "Removed from wishlist"
                          : "Added to wishlist"
                      );
                    }}
                    aria-label="Wishlist"
                    className={clsx(
                      "w-12 h-12 grid place-items-center rounded-full border transition",
                      wished.includes(p.id)
                        ? "bg-rose-500 text-white border-rose-500"
                        : "border-ink/15 hover:border-ink"
                    )}
                  >
                    <Heart
                      size={18}
                      fill={wished.includes(p.id) ? "currentColor" : "none"}
                    />
                  </button>
                </div>

                <p className="mt-4 text-xs text-ink-muted">
                  🚚 Free shipping on orders above Rs. 3,999 · 15-day easy exchange
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function NoteBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-cream/60 border border-ink/10 p-3">
      <p className="text-[10px] uppercase tracking-[0.2em] text-gold-dark">
        {label}
      </p>
      <p className="text-sm mt-1 text-ink-soft">{value}</p>
    </div>
  );
}
