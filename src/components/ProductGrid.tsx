"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { products } from "@/lib/products";
import type { Category, Section } from "@/lib/types";
import ProductCard from "./ProductCard";
import { AnimatePresence, motion } from "framer-motion";

const CATS: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "premium", label: "Premium" },
  { key: "affordable", label: "Affordable" },
  { key: "bakhoor", label: "Bakhoor" },
  { key: "perfume", label: "Perfume" },
  { key: "attar", label: "Attar" },
];

export default function ProductGrid({
  title,
  section,
  id,
}: {
  title: string;
  section: Section;
  id?: string;
}) {
  const [cat, setCat] = useState<Category | "all">("all");

  const list = useMemo(() => {
    const base = products.filter((p) => p.sections.includes(section));
    if (cat === "all") return base;
    if (cat === "perfume")
      return base.filter((p) => p.category === "premium" || p.category === "affordable");
    return base.filter((p) => p.category === cat);
  }, [cat, section]);

  return (
    <section id={id} className="container-x py-14 md:py-20">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-gold-dark">
            Explore
          </p>
          <h2 className="serif text-[clamp(1.8rem,3.6vw,2.6rem)] mt-1">
            {title}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 no-scrollbar overflow-x-auto">
          {CATS.map((c) => (
            <button
              key={c.key}
              onClick={() => setCat(c.key)}
              className={clsx(
                "px-3.5 py-1.5 rounded-full text-sm border transition whitespace-nowrap",
                cat === c.key
                  ? "bg-ink text-white border-ink"
                  : "border-ink/15 text-ink-soft hover:border-ink hover:text-ink"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${section}-${cat}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {list.length === 0 ? (
            <p className="col-span-full text-ink-muted text-sm py-12 text-center border border-dashed border-ink/15 rounded-xl">
              No products in this category yet.
            </p>
          ) : (
            list.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
