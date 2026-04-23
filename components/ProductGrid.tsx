"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import ProductCard from "./ProductCard";
import { useStore } from "@/context/StoreContext";

type Tab = "All" | "Premium" | "Affordable" | "Bakhoor" | "Perfume" | "Attar";

const TABS: Tab[] = ["All", "Premium", "Affordable", "Bakhoor", "Perfume", "Attar"];

const SECTIONS = [
  { key: "best-sellers", label: "Best Sellers", ids: [1, 2, 5, 10, 12, 6] },
  { key: "trending", label: "Trending Now", ids: [3, 8, 9, 11, 7, 13] },
  { key: "new-arrivals", label: "New Arrivals", ids: [4, 14, 6, 3, 1, 2] },
] as const;

export default function ProductGrid() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const { openQuickView } = useStore();

  const filtered = activeTab === "All"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeTab);

  return (
    <section id="products" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-gold text-xs tracking-[0.3em] uppercase font-inter mb-2">
            Our Collection
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-charcoal mb-2">
            Featured Products
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
        </div>

        {/* Tab bar */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap mb-10">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 text-xs sm:text-sm font-medium font-inter tracking-wider uppercase transition-colors duration-200
                ${activeTab === tab ? "text-charcoal" : "text-gray-500 hover:text-charcoal"}`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                />
              )}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={openQuickView}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Section labels */}
        <div className="mt-20 space-y-16">
          {SECTIONS.map((section) => {
            const sectionProducts = section.ids
              .map((id) => PRODUCTS.find((p) => p.id === id))
              .filter(Boolean);
            return (
              <div key={section.key}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-charcoal">
                      {section.label}
                    </h3>
                    <div className="w-10 h-0.5 bg-gold mt-2" />
                  </div>
                  <a href="#" className="text-xs text-gold uppercase tracking-widest font-inter hover:underline">
                    View All →
                  </a>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {sectionProducts.map(
                    (product) =>
                      product && (
                        <ProductCard
                          key={`${section.key}-${product.id}`}
                          product={product}
                          onQuickView={openQuickView}
                        />
                      )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
