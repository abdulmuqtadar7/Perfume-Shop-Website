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
      <motion.article layout className="group rounded-2xl border border-neutral-200 bg-white overflow-hidden">
        <div className="relative">
          <span className="absolute top-3 left-3 z-10 bg-neutral-900 text-white text-xs px-2 py-1 rounded">-{product.discountPercent}%</span>
          <Link href={`/product/${product.slug}`}>
            <img src={product.image} alt={product.name} className="w-full aspect-square object-cover group-hover:opacity-0 transition duration-300" />
            <img
              src={product.hoverImage}
              alt={product.name}
              className="w-full aspect-square object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
            />
          </Link>
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
            <button onClick={() => toggleWishlist(product.id)} className="w-9 h-9 bg-white rounded-full grid place-items-center shadow">
              <Heart size={16} className={isInWishlist(product.id) ? "fill-current text-red-500" : ""} />
            </button>
            <button onClick={() => setQuickViewOpen(true)} className="w-9 h-9 bg-white rounded-full grid place-items-center shadow">
              <Eye size={16} />
            </button>
          </div>
        </div>
        <div className="p-4 space-y-2">
          <Link href={`/product/${product.slug}`} className="font-semibold text-neutral-900 hover:text-[#B48A54]">{product.name}</Link>
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
          <button onClick={() => addToCart(product.id)} className="w-full h-10 rounded-md bg-[#B48A54] text-white hover:bg-neutral-900 transition">
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
