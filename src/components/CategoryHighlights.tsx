"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Block = { title: string; subtitle?: string; className?: string; gradient: string };

const BLOCKS: Block[] = [
  {
    title: "Perfume's Spray",
    subtitle: "For him & her",
    className: "md:col-span-2 md:row-span-2 aspect-[5/4] md:aspect-auto",
    gradient: "linear-gradient(140deg,#1a120a 0%,#5a3a1b 55%,#b8935a 100%)",
  },
  {
    title: "Womens",
    subtitle: "Floral & soft",
    gradient: "linear-gradient(140deg,#f4c9ce 0%,#b26676 100%)",
  },
  {
    title: "Oud Attar",
    subtitle: "Pure, aged oud",
    gradient: "linear-gradient(140deg,#3a1f0b 0%,#8a5a2a 100%)",
  },
  {
    title: "Bakhoor Wood",
    subtitle: "Slow-burn chips",
    gradient: "linear-gradient(140deg,#2b1a0f 0%,#7a4a23 100%)",
  },
  {
    title: "Bakhoor Burner",
    subtitle: "Brass mabkhara",
    gradient: "linear-gradient(140deg,#e0ba66 0%,#8a5f1d 100%)",
  },
  {
    title: "French Attars",
    subtitle: "Grasse absolutes",
    gradient: "linear-gradient(140deg,#fff2d0 0%,#c9a05b 100%)",
  },
  {
    title: "Arabic Attars",
    subtitle: "Mukhalat & oud",
    gradient: "linear-gradient(140deg,#2c1205 0%,#a6703b 100%)",
  },
];

export default function CategoryHighlights() {
  return (
    <section id="categories" className="container-x py-14 md:py-20">
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-gold-dark">
            Curated
          </p>
          <h2 className="serif text-[clamp(1.8rem,3.6vw,2.6rem)] mt-1">
            Shop by Category
          </h2>
        </div>
        <a
          href="#shop"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-gold"
        >
          View all <ArrowUpRight size={14} />
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[200px] gap-3 md:gap-4">
        {BLOCKS.map((b, i) => (
          <motion.a
            key={b.title}
            href="#shop"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.04 }}
            className={`group relative overflow-hidden rounded-xl ${b.className ?? ""}`}
            style={{ background: b.gradient }}
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition" />
            <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
              <p className="text-[10px] uppercase tracking-[0.22em] opacity-80">
                {b.subtitle}
              </p>
              <p className="serif text-xl sm:text-2xl">{b.title}</p>
              <span className="mt-2 inline-flex items-center gap-1.5 text-xs opacity-90 group-hover:text-gold transition">
                Shop now <ArrowUpRight size={12} />
              </span>
            </div>
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 grid place-items-center backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 transition">
              <ArrowUpRight size={16} className="text-white" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
