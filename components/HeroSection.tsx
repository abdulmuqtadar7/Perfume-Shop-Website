"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://placehold.co/1920x1080/1a1a1a/2a2a2a?text=."
          alt="Hero background"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      {/* Decorative gold lines */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="absolute bottom-1/4 right-0 w-1/3 h-px bg-gradient-to-l from-transparent via-gold/40 to-transparent" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gold text-sm tracking-[0.3em] uppercase mb-4 font-inter"
        >
          Usman Baig Fragrance
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-playfair text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
        >
          Discover Your{" "}
          <span className="text-gold italic">Signature</span>
          <br />
          Scent
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-gray-300 text-base sm:text-lg md:text-xl mb-10 font-inter max-w-2xl mx-auto leading-relaxed"
        >
          Premium Fragrances Crafted for the Discerning Connoisseur
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#products"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-4 bg-gold text-charcoal font-inter font-semibold text-sm tracking-[0.15em] uppercase
              hover:bg-charcoal hover:text-gold border-2 border-gold transition-all duration-300 min-w-[180px] text-center"
          >
            Shop Now
          </motion.a>
          <motion.a
            href="#categories"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-4 bg-transparent text-white font-inter font-semibold text-sm tracking-[0.15em] uppercase
              border-2 border-white/50 hover:border-gold hover:text-gold transition-all duration-300 min-w-[180px] text-center"
          >
            Explore Collections
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto"
        >
          {[
            { value: "500+", label: "Fragrances" },
            { value: "50K+", label: "Happy Customers" },
            { value: "10+", label: "Years of Craft" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-gold font-playfair text-2xl font-bold">{stat.value}</p>
              <p className="text-gray-400 text-xs font-inter tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-2 bg-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
