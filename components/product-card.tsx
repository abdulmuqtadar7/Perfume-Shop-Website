"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, Heart, Star } from "lucide-react";
import { Product } from "@/data/products";
import { useStore } from "@/context/store-context";

function currency(value: number) {
  return new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(value);
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  return (
    <>
      <motion.article layout className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition hover:-translate-y-1 hover:shadow-[0_14px_42px_rgba(0,0,0,0.12)]">
        <div className="relative overflow-hidden bg-neutral-100">
          <span className="absolute left-3 top-3 z-10 rounded-full bg-neutral-900 px-2.5 py-1 text-xs font-semibold text-white shadow">-{product.discountPercent}%</span>
          <Link href={`/product/${product.slug}`}>
            <img src={product.image} alt={product.name} className="aspect-square w-full object-cover transition duration-300 group-hover:opacity-0 group-hover:scale-105" />
            <img
              src={product.hoverImage}
              alt={product.name}
              className="absolute inset-0 aspect-square w-full object-cover opacity-0 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
            />
          </Link>
          <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-0 transition group-hover:opacity-100">
            <button onClick={() => toggleWishlist(product.id)} className="grid h-9 w-9 place-items-center rounded-full bg-white shadow">
              <Heart size={16} className={isInWishlist(product.id) ? "fill-current text-red-500" : ""} />
            </button>
            <button onClick={() => setQuickViewOpen(true)} className="grid h-9 w-9 place-items-center rounded-full bg-white shadow">
              <Eye size={16} />
            </button>
          </div>
        </div>
        <div className="space-y-2 p-4">
          <Link href={`/product/${product.slug}`} className="text-lg font-semibold text-neutral-900 transition hover:text-[#B48A54]">{product.name}</Link>
          <div className="flex items-center gap-1 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-current" : ""} />
            ))}
            <span className="text-xs text-neutral-500 ml-1">{product.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="line-through text-neutral-400">{currency(product.originalPrice)}</span>
            <span className="font-bold text-neutral-900">{currency(product.price)}</span>
          </div>
          <button onClick={() => addToCart(product.id)} className="h-10 w-full rounded-md bg-[#B48A54] text-sm font-semibold tracking-wide text-white transition hover:bg-neutral-900">
            Add to Cart
          </button>
        </div>
      </motion.article>

      <AnimatePresence>
        {quickViewOpen && (
          <motion.div className="fixed inset-0 bg-black/60 z-50 grid place-items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="max-w-lg w-full bg-white rounded-2xl p-6">
              <h3 className="text-2xl font-semibold">{product.name}</h3>
              <p className="mt-3 text-neutral-600">{product.description}</p>
              <p className="mt-4 text-sm font-semibold">Notes Breakdown</p>
              <ul className="mt-2 text-sm text-neutral-600 list-disc pl-5">
                {product.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
              <div className="mt-6 flex justify-end gap-3">
                <button className="h-10 px-5 rounded-md border" onClick={() => setQuickViewOpen(false)}>Close</button>
                <button className="h-10 px-5 rounded-md bg-[#B48A54] text-white" onClick={() => { addToCart(product.id); setQuickViewOpen(false); }}>
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
