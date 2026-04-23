"use client";

import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Block = {
  title: string;
  subtitle: string;
  desc: string;
  className?: string;
  gradient: string;
  motif: ReactNode;
};

// Shared motif sizing — keeps the art big enough to read from across the tile.
const motifClass =
  "pointer-events-none absolute -right-4 -top-4 md:-right-6 md:-top-8 w-[58%] md:w-[52%] max-w-[280px] text-white/90 drop-shadow-[0_8px_18px_rgba(0,0,0,.35)] opacity-95 group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-500";

const BLOCKS: Block[] = [
  {
    title: "Perfume's Spray",
    subtitle: "For him & her",
    desc: "EDP sprays blended for modern wear.",
    className: "md:col-span-2 md:row-span-2 aspect-[5/4] md:aspect-auto",
    gradient: "linear-gradient(140deg,#1a120a 0%,#5a3a1b 55%,#b8935a 100%)",
    motif: <SpraybottleMotif />,
  },
  {
    title: "Womens",
    subtitle: "Floral & soft",
    desc: "Rose, jasmine, peony, musk.",
    gradient: "linear-gradient(140deg,#f4c9ce 0%,#b26676 100%)",
    motif: <RoseMotif />,
  },
  {
    title: "Oud Attar",
    subtitle: "Pure, aged oud",
    desc: "Alcohol-free oil, years in oak.",
    gradient: "linear-gradient(140deg,#3a1f0b 0%,#8a5a2a 100%)",
    motif: <VialMotif />,
  },
  {
    title: "Bakhoor Wood",
    subtitle: "Slow-burn chips",
    desc: "Oud wood soaked in attar.",
    gradient: "linear-gradient(140deg,#2b1a0f 0%,#7a4a23 100%)",
    motif: <WoodChipMotif />,
  },
  {
    title: "Bakhoor Burner",
    subtitle: "Brass mabkhara",
    desc: "Hand-finished burners.",
    gradient: "linear-gradient(140deg,#e0ba66 0%,#8a5f1d 100%)",
    motif: <MabkharaMotif />,
  },
  {
    title: "French Attars",
    subtitle: "Grasse absolutes",
    desc: "Rose de mai, neroli, iris.",
    gradient: "linear-gradient(140deg,#fff2d0 0%,#c9a05b 100%)",
    motif: <FlaconMotif />,
  },
  {
    title: "Arabic Attars",
    subtitle: "Mukhalat & oud",
    desc: "Blends from Hejaz and Najd.",
    gradient: "linear-gradient(140deg,#2c1205 0%,#a6703b 100%)",
    motif: <DecanterMotif />,
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

      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[190px] md:auto-rows-[220px] gap-3 md:gap-4">
        {BLOCKS.map((b, i) => (
          <a
            key={b.title}
            href="#shop"
            data-aos="fade-up"
            data-aos-delay={i * 80}
            className={`group relative overflow-hidden rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${b.className ?? ""}`}
            style={{ background: b.gradient }}
          >
            {/* darken-on-rest → clear-on-hover */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />

            {/* category-specific illustration */}
            {b.motif}

            {/* soft fade behind text so labels stay legible */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
              <p className="text-[10px] uppercase tracking-[0.22em] opacity-80">
                {b.subtitle}
              </p>
              <p className="serif text-xl sm:text-2xl leading-tight">{b.title}</p>
              <p className="mt-1 text-[12px] leading-snug text-white/80 max-w-[22ch]">
                {b.desc}
              </p>
              <span className="mt-2 inline-flex items-center gap-1.5 text-xs opacity-90 group-hover:text-gold transition">
                Shop now <ArrowUpRight size={12} />
              </span>
            </div>

            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 grid place-items-center backdrop-blur-sm border border-white/25 opacity-0 group-hover:opacity-100 transition">
              <ArrowUpRight size={16} className="text-white" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Motifs (inline SVG, purely decorative) ---------------- */

function SpraybottleMotif() {
  return (
    <svg viewBox="0 0 200 200" className={motifClass} aria-hidden>
      <defs>
        <linearGradient id="sprayGlass" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".9" />
          <stop offset="1" stopColor="#fff" stopOpacity=".35" />
        </linearGradient>
      </defs>
      {/* atomizer bulb */}
      <circle cx="62" cy="70" r="22" fill="url(#sprayGlass)" opacity=".9" />
      <line x1="80" y1="72" x2="110" y2="72" stroke="#fff" strokeWidth="3" />
      {/* cap */}
      <rect x="108" y="42" width="30" height="20" rx="3" fill="#fff" opacity=".9" />
      {/* body */}
      <rect x="100" y="62" width="70" height="108" rx="10" fill="url(#sprayGlass)" opacity=".92" />
      <rect x="110" y="96" width="50" height="40" rx="4" fill="#fff" opacity=".25" />
      {/* spray dots */}
      <g fill="#fff" opacity=".85">
        <circle cx="50" cy="56" r="2.2" />
        <circle cx="42" cy="64" r="1.6" />
        <circle cx="46" cy="78" r="1.8" />
        <circle cx="34" cy="72" r="1.3" />
      </g>
    </svg>
  );
}

function RoseMotif() {
  return (
    <svg viewBox="0 0 200 200" className={motifClass} aria-hidden>
      <g fill="#fff" opacity=".92">
        <circle cx="100" cy="88" r="14" />
        <path d="M100 74 C120 70, 138 84, 132 104 C150 98, 160 120, 142 132 C154 148, 138 166, 120 158 C118 176, 92 178, 84 162 C66 172, 48 158, 56 140 C40 136, 38 114, 58 110 C50 92, 70 76, 88 84 C88 74, 94 70, 100 74 Z" opacity=".75" />
      </g>
      {/* stem + leaf */}
      <path
        d="M108 134 C112 160, 120 180, 140 190"
        stroke="#fff"
        strokeWidth="3"
        fill="none"
        opacity=".75"
      />
      <path
        d="M128 168 Q150 160, 158 180 Q140 184, 128 168 Z"
        fill="#fff"
        opacity=".75"
      />
    </svg>
  );
}

function VialMotif() {
  return (
    <svg viewBox="0 0 200 200" className={motifClass} aria-hidden>
      {/* dropper top */}
      <rect x="80" y="30" width="40" height="14" rx="2" fill="#fff" opacity=".9" />
      <rect x="86" y="44" width="28" height="10" rx="2" fill="#fff" opacity=".75" />
      <rect x="94" y="54" width="12" height="18" fill="#fff" opacity=".55" />
      {/* body */}
      <path
        d="M74 72 h52 v86 a26 26 0 0 1 -52 0 z"
        fill="#fff"
        opacity=".85"
      />
      {/* liquid */}
      <path
        d="M80 118 h40 v38 a20 20 0 0 1 -40 0 z"
        fill="#b8935a"
        opacity=".85"
      />
      {/* highlight */}
      <rect x="84" y="82" width="6" height="40" rx="3" fill="#fff" opacity=".55" />
    </svg>
  );
}

function WoodChipMotif() {
  return (
    <svg viewBox="0 0 200 200" className={motifClass} aria-hidden>
      <g fill="#fff" opacity=".88">
        {/* three chips */}
        <path d="M30 120 l50 -30 l30 20 l-40 40 Z" />
        <path d="M90 90 l60 -20 l20 30 l-50 30 Z" opacity=".8" />
        <path d="M60 160 l50 -10 l18 26 l-46 16 Z" opacity=".75" />
      </g>
      {/* smoke wisps */}
      <g stroke="#fff" strokeWidth="2.5" fill="none" opacity=".55" strokeLinecap="round">
        <path d="M100 70 C110 58, 92 48, 108 34" />
        <path d="M132 64 C142 50, 124 42, 138 28" />
      </g>
    </svg>
  );
}

function MabkharaMotif() {
  return (
    <svg viewBox="0 0 200 200" className={motifClass} aria-hidden>
      {/* bowl */}
      <path
        d="M50 130 Q50 170 100 170 Q150 170 150 130 Z"
        fill="#fff"
        opacity=".92"
      />
      {/* stem */}
      <rect x="94" y="170" width="12" height="16" fill="#fff" opacity=".85" />
      {/* base */}
      <rect x="74" y="186" width="52" height="8" rx="2" fill="#fff" opacity=".9" />
      {/* rim */}
      <rect x="48" y="126" width="104" height="8" rx="3" fill="#fff" opacity=".75" />
      {/* ember */}
      <circle cx="100" cy="146" r="10" fill="#ff8a3d" opacity=".8" />
      {/* smoke */}
      <g stroke="#fff" strokeWidth="3" fill="none" opacity=".6" strokeLinecap="round">
        <path d="M96 120 C110 104, 84 92, 100 70" />
        <path d="M112 118 C124 104, 104 92, 118 74" />
      </g>
    </svg>
  );
}

function FlaconMotif() {
  return (
    <svg viewBox="0 0 200 200" className={motifClass} aria-hidden>
      {/* stopper */}
      <rect x="90" y="32" width="20" height="12" rx="2" fill="#ffffff" opacity=".9" />
      <rect x="80" y="44" width="40" height="8" rx="2" fill="#ffffff" opacity=".75" />
      {/* round flacon */}
      <circle cx="100" cy="118" r="62" fill="#fff" opacity=".88" />
      {/* liquid */}
      <path
        d="M44 118 a56 56 0 0 0 112 0 l0 0 a56 40 0 0 1 -112 0 Z"
        fill="#c9a05b"
        opacity=".75"
      />
      {/* label */}
      <rect x="76" y="108" width="48" height="24" rx="2" fill="#fff" opacity=".95" />
      {/* highlight */}
      <ellipse cx="78" cy="92" rx="12" ry="22" fill="#fff" opacity=".55" />
    </svg>
  );
}

function DecanterMotif() {
  return (
    <svg viewBox="0 0 200 200" className={motifClass} aria-hidden>
      {/* ornate cap */}
      <path
        d="M100 20 L110 40 L120 36 L116 54 L84 54 L80 36 L90 40 Z"
        fill="#fff"
        opacity=".9"
      />
      {/* neck */}
      <rect x="92" y="54" width="16" height="18" fill="#fff" opacity=".85" />
      {/* body — tear drop */}
      <path
        d="M100 72 C160 80, 170 170, 100 190 C30 170, 40 80, 100 72 Z"
        fill="#fff"
        opacity=".88"
      />
      {/* engraving */}
      <path
        d="M70 130 Q100 110, 130 130 M70 148 Q100 130, 130 148"
        stroke="#3a1f0b"
        strokeWidth="2"
        fill="none"
        opacity=".6"
      />
      {/* liquid glint */}
      <ellipse cx="82" cy="110" rx="10" ry="20" fill="#fff" opacity=".5" />
    </svg>
  );
}
