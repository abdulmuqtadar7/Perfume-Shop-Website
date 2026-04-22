"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-[72vh]">
      <img
        src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1800&q=80"
        alt="Premium fragrance hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-32 text-white">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="uppercase tracking-[0.28em] text-xs text-[#D7B88A]">
          Luxury Fragrance House
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mt-4 text-4xl md:text-6xl leading-tight font-semibold max-w-3xl">
          Discover timeless scents crafted for modern elegance.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="mt-5 text-white/90 max-w-xl">
          Explore premium perfumes, attars, and bakhoor collections with clean design, smooth checkout, and concierge support.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Link href="/shop" className="inline-block mt-8 h-12 px-8 leading-[48px] rounded-md bg-[#B48A54] text-white border border-[#B48A54] hover:bg-transparent hover:text-white transition">
            SHOP NOW
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
