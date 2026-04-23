"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-white to-[#f1e6d3]" />
        <div className="absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full bg-gold/25 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full bg-[#a6703b]/15 blur-3xl" />
      </div>

      <div className="container-x grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center py-16 lg:py-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-gold-dark"
          >
            <span className="w-2 h-2 rounded-full bg-gold shadow-[0_0_0_4px_rgba(184,147,90,.18)]" />
            Signature Collection · 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="serif mt-4 text-[clamp(2.4rem,6vw,5.2rem)] leading-[1.02] tracking-tight"
          >
            Where heritage
            <br />
            meets <span className="italic text-gold">silage.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 max-w-[48ch] text-ink-soft text-[15px] leading-relaxed"
          >
            Premium Attars, Bakhoors and modern perfumes blended in the tradition
            of the subcontinent. Flat <b className="text-ink">38% off</b> + free
            shipping on all perfumes — for a limited time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#shop"
              className="group inline-flex items-center gap-2 bg-ink text-white px-6 py-3.5 rounded-full text-sm font-medium tracking-wide
                         hover:bg-gold hover:text-ink transition-colors duration-300"
            >
              SHOP NOW
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#categories"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium border border-ink/20 hover:border-ink text-ink-soft hover:text-ink transition"
            >
              Explore Attars
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 pt-6 border-t border-ink/10 grid grid-cols-3 max-w-md gap-6"
          >
            {[
              ["38%", "FLAT OFF"],
              ["4–5", "DAYS DELIVERY"],
              ["15d", "EASY EXCHANGE"],
            ].map(([n, t]) => (
              <div key={t as string}>
                <p className="serif text-2xl">{n}</p>
                <p className="text-[11px] tracking-[0.18em] uppercase text-ink-muted mt-1">
                  {t}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative h-[420px] sm:h-[520px]"
        >
          <FancyBottle />
          <div className="absolute top-12 left-0 bg-white/70 backdrop-blur border border-ink/10 rounded-full px-4 py-2 text-xs tracking-widest uppercase text-ink-soft shadow-sm animate-[float_6s_ease-in-out_infinite]">
            Oud · Rose · Saffron
          </div>
          <div className="absolute bottom-16 right-0 bg-white/70 backdrop-blur border border-ink/10 rounded-full px-4 py-2 text-xs tracking-widest uppercase text-ink-soft shadow-sm animate-[float_6s_ease-in-out_infinite_-3s]">
            Lahore · Pakistan
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes float {
          0%,100%{ transform: translateY(0); }
          50%    { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}

function FancyBottle() {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0 grid place-items-center"
    >
      <div className="relative w-[240px] sm:w-[300px] aspect-[2/3]">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[42%] h-[9%] rounded-md bg-gradient-to-b from-ink to-black shadow-md" />
        <div className="absolute left-1/2 -translate-x-1/2 top-[9%] w-[22%] h-[6%] bg-gradient-to-b from-ink-soft to-black" />
        <div
          className="absolute left-0 right-0 top-[15%] bottom-0 rounded-[14px_14px_22px_22px] overflow-hidden"
          style={{
            background:
              "linear-gradient(155deg, rgba(255,255,255,.2) 0%, rgba(207,169,116,.5) 28%, rgba(184,147,90,.75) 60%, rgba(90,63,36,.85) 100%)",
            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,.2), inset 8px 10px 40px rgba(255,255,255,.22), inset -8px -12px 40px rgba(20,18,15,.28), 0 30px 60px -20px rgba(20,18,15,.55)",
          }}
        >
          <div className="absolute left-[10%] top-[4%] w-[22%] h-[80%] rounded-full bg-gradient-to-b from-white/55 to-transparent blur-md opacity-70" />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[66%] py-[14%] px-[8%] text-center bg-cream/95 text-ink shadow"
            style={{ border: "1px solid rgba(20,18,15,.08)" }}
          >
            <p className="text-[10px] sm:text-xs tracking-[0.26em] uppercase text-ink-muted">
              Usman Baig
            </p>
            <span className="block mx-auto mt-1 mb-1 w-8 h-px bg-gold" />
            <p className="serif text-base sm:text-lg">Mughal Edition</p>
            <p className="text-[9px] sm:text-[10px] tracking-[0.18em] uppercase text-ink-muted mt-1">
              Extrait de Parfum
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
