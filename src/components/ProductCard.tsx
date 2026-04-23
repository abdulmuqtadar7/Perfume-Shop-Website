"use client";

import { Eye, Heart } from "lucide-react";
import clsx from "clsx";
import type { Product } from "@/lib/types";
import { rs } from "@/lib/format";
import { useCart, useUI, useWish } from "@/lib/store";

export default function ProductCard({ p, index = 0 }: { p: Product; index?: number }) {
  const add = useCart((s) => s.add);
  const toggleWish = useWish((s) => s.toggle);
  const wished = useWish((s) => s.ids.includes(p.id));
  const wishHydrated = useWish((s) => s.hydrated);
  const setQuickView = useUI((s) => s.setQuickView);
  const setCartOpen = useUI((s) => s.setCart);
  const pushToast = useUI((s) => s.pushToast);

  const isWished = wishHydrated && wished;

  const onAdd = () => {
    if (p.variants && p.variants.length > 0) {
      setQuickView(p.id);
      return;
    }
    add(p.id);
    setCartOpen(true);
    pushToast(`${p.name} added to cart`);
  };

  const staggerDelay = (index % 4) * 100;

  return (
    <article
      data-aos="zoom-in-up"
      data-aos-delay={staggerDelay}
      className="group relative bg-white border border-ink/10 rounded-xl overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-1 hover:border-transparent transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden">
        <div
          className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
          style={{ background: p.art }}
        />
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: p.artHover }}
        />

        {/* Bottle with a minimal house label — brand / name / subtitle */}
        <div className="ub-bottle" style={{ ["--bot" as string]: p.art }}>
          <div className="ub-label ub-label--minimal">
            <p className="ub-label__brand">USMAN BAIG</p>
            <p className="ub-label__name serif">{p.name}</p>
            <p className="ub-label__tag">{p.subtitle}</p>
          </div>
        </div>

        <span className="absolute top-3 left-3 z-10 bg-ink text-white text-[11px] font-semibold tracking-wide px-2 py-1 rounded">
          -{p.discountPct}%
        </span>

        {/* Hover icon rail */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <button
            aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
            onClick={() => {
              toggleWish(p.id);
              pushToast(isWished ? "Removed from wishlist" : "Added to wishlist");
            }}
            className={clsx(
              "w-9 h-9 grid place-items-center rounded-full shadow-sm border border-ink/10 backdrop-blur-sm transition",
              isWished ? "bg-rose-500 text-white" : "bg-white/90 hover:bg-white text-ink"
            )}
          >
            <Heart size={16} fill={isWished ? "currentColor" : "none"} />
          </button>
          <button
            aria-label="Quick view"
            onClick={() => setQuickView(p.id)}
            className="w-9 h-9 grid place-items-center rounded-full bg-white/90 hover:bg-white text-ink border border-ink/10 shadow-sm transition"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>

      <div className="bg-white p-4 md:p-5 flex flex-col items-center text-center gap-1 flex-1">
        <h3 className="serif text-base md:text-lg leading-snug line-clamp-1 w-full">
          {p.name}
        </h3>
        <div className="mt-1 flex items-baseline justify-center gap-2 flex-wrap">
          <span className="price-strike whitespace-nowrap">{rs(p.originalPrice)}</span>
          <span className="price-now whitespace-nowrap">{rs(p.price)}</span>
        </div>

        <button
          onClick={onAdd}
          className="mt-3 w-full px-6 py-3 rounded-full text-[13px] md:text-sm font-semibold tracking-wide bg-ink text-white hover:bg-gold hover:text-ink hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
        >
          {p.variants && p.variants.length > 0 ? "Choose Options" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
