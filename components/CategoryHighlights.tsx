"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export default function CategoryHighlights() {
  return (
    <section id="categories" className="py-16 sm:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-gold text-xs tracking-[0.3em] uppercase font-inter mb-2">
            Browse By Category
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-charcoal mb-2">
            Shop by Category
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[200px]">
          {CATEGORIES.map((cat, i) => (
            <motion.a
              key={cat.id}
              href={cat.href}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`relative overflow-hidden group cursor-pointer
                ${i === 0 ? "col-span-2 row-span-2" : ""}
                ${i === 5 ? "col-span-2" : ""}
              `}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-4 sm:p-5">
                <h3 className="font-playfair text-white text-lg sm:text-xl font-semibold leading-tight mb-1">
                  {cat.name}
                </h3>
                <p className="text-gray-300 text-xs font-inter mb-2 hidden sm:block">
                  {cat.description}
                </p>
                <span className="inline-flex items-center gap-1 text-gold text-xs font-semibold uppercase tracking-wider font-inter group-hover:gap-2 transition-all duration-200">
                  Shop Now <ArrowRight size={12} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
