"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useState } from "react";

type Review = {
  rating: number;
  headline: string;
  body: string;
  name: string;
  date: string;
  product: string;
  grad: string;
  notes: { top: string; heart: string; base: string };
};

const REVIEWS: Review[] = [
  {
    rating: 5,
    headline: "Mughal Perfume truly stands out",
    body:
      "Mughal Perfume truly stands out among my collection. The oud and saffron are rich and regal, and silage lasts the entire day. Worth every rupee.",
    name: "Hassan A.",
    date: "Mar 12, 2026",
    product: "Mughal",
    grad: "linear-gradient(155deg,#e7cfa4,#6b3e1b)",
    notes: { top: "Saffron, pink pepper", heart: "Oud, Bulgarian rose", base: "Amber, sandalwood" },
  },
  {
    rating: 5,
    headline: "Pure & authentic attar",
    body:
      "I've bought Hajj attar in multiple places — Usman Baig's is the cleanest, most authentic pour I've found. Packaging is beautiful.",
    name: "Sumaira K.",
    date: "Feb 28, 2026",
    product: "Hajj Perfume",
    grad: "linear-gradient(155deg,#f3e6cc,#9a7a48)",
    notes: { top: "Rose, citrus zest", heart: "Oud, musk", base: "Sandalwood, amber" },
  },
  {
    rating: 5,
    headline: "My daily signature now",
    body:
      "Citrus Breeze is exactly what I wanted — bright, long-lasting, not overpowering in the office. Delivery was quick and packaging felt premium.",
    name: "Ayesha R.",
    date: "Jan 19, 2026",
    product: "Citrus Breeze",
    grad: "linear-gradient(155deg,#fff2b3,#cdbd4f)",
    notes: { top: "Bergamot, yuzu", heart: "Neroli", base: "White musk" },
  },
  {
    rating: 5,
    headline: "The best bakhoor I've tried",
    body:
      "Filled my living room within minutes. Burn time is long and the oud smokes out warm, not harsh. I've already re-ordered twice.",
    name: "Bilal S.",
    date: "Dec 04, 2025",
    product: "Bakhoor Wood",
    grad: "linear-gradient(155deg,#7a4a23,#2b130a)",
    notes: { top: "Oud wood", heart: "Smoked amber", base: "Agarwood resin" },
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % REVIEWS.length), 5500);
    return () => clearInterval(t);
  }, []);

  const prev = () => setI((x) => (x - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => setI((x) => (x + 1) % REVIEWS.length);
  const r = REVIEWS[i];

  return (
    <section aria-label="Customer reviews" className="bg-cream/70 border-y border-ink/10">
      <div className="container-x py-16 md:py-20">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-gold-dark">
              Voices of the House
            </p>
            <h2 className="serif text-[clamp(1.8rem,3.6vw,2.6rem)] mt-1">
              What our customers say
            </h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button onClick={prev} aria-label="Previous review" className="w-10 h-10 rounded-full bg-white border border-ink/10 grid place-items-center hover:bg-ink hover:text-white transition">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} aria-label="Next review" className="w-10 h-10 rounded-full bg-white border border-ink/10 grid place-items-center hover:bg-ink hover:text-white transition">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-ink/10 rounded-2xl p-6 md:p-10 shadow-card grid md:grid-cols-[1fr_auto] gap-8 items-center"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {Array.from({ length: r.rating }).map((_, k) => (
                    <Star key={k} size={16} fill="currentColor" className="stroke-0" />
                  ))}
                </div>
                <h3 className="serif text-2xl md:text-3xl mb-3">{r.headline}</h3>
                <p className="text-ink-soft leading-relaxed max-w-[60ch]">{r.body}</p>
                <div className="mt-6 flex items-center gap-3 text-sm">
                  <span className="w-9 h-9 rounded-full bg-ink text-gold grid place-items-center serif">
                    {r.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-medium">{r.name}</p>
                    <p className="text-ink-muted text-xs">{r.date}</p>
                  </div>
                </div>
              </div>
              <div className="relative w-[220px] sm:w-[240px] aspect-square rounded-xl overflow-hidden border border-ink/10 shrink-0" style={{ background: r.grad }}>
                <div className="ub-bottle" style={{ ["--bot" as string]: r.grad }}>
                  <div className="ub-label">
                    <p className="ub-label__brand">USMAN BAIG</p>
                    <p className="ub-label__name serif">{r.product}</p>
                    <div className="ub-label__notes">
                      <p className="ub-label__line">
                        <span>Top</span>
                        <span>{r.notes.top}</span>
                      </p>
                      <p className="ub-label__line ub-label__line--heart">
                        <span>Heart</span>
                        <span>{r.notes.heart}</span>
                      </p>
                      <p className="ub-label__line">
                        <span>Base</span>
                        <span>{r.notes.base}</span>
                      </p>
                    </div>
                    <p className="ub-label__tag">Lasts 12–14 hrs</p>
                  </div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {REVIEWS.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              aria-label={`Go to review ${k + 1}`}
              className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-ink" : "w-2.5 bg-ink/20 hover:bg-ink/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
