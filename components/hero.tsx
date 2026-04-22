"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative isolate min-h-[78vh] overflow-hidden">
      <img
        src="https://picsum.photos/seed/luxury-perfume-hero/1920/1100"
        alt="Premium fragrance hero"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(180,138,84,0.24),transparent_42%)]" />
      <div className="relative mx-auto flex min-h-[78vh] w-full max-w-7xl items-center px-4 py-24 md:px-6 md:py-32">
        <div className="max-w-3xl">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="inline-flex rounded-full border border-[#d7b88a]/60 bg-black/30 px-4 py-1.5 text-xs uppercase tracking-[0.28em] text-[#E8C998]">
          Luxury Fragrance House
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-6 max-w-3xl text-4xl font-semibold leading-tight text-white drop-shadow-xl md:text-6xl"
          >
            Discover timeless scents crafted for modern elegance.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="mt-5 max-w-xl text-base text-white/90 md:text-lg"
          >
            Explore premium perfumes, attars, and bakhoor collections with clean design, smooth checkout, and concierge support.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Link
              href="/shop"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-md border border-[#B48A54] bg-[#B48A54] px-8 text-sm font-semibold tracking-wider text-white transition hover:bg-transparent hover:text-[#f2dcc0]"
            >
              SHOP NOW
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
