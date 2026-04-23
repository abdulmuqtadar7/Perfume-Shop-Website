import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { ArrowRight, Sparkles, Leaf, Droplet, Award } from "lucide-react";
import { products, categories } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { SectionHeader } from "../components/Section";

export function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bottleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const bottleRot = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  const featured = products.filter((p) => p.featured).slice(0, 6);
  const bestSellers = products.filter((p) => p.bestSeller);

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative overflow-hidden min-h-[92vh] flex items-center"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-gold-400/30 blur-3xl" />
          <div className="absolute -bottom-32 -right-24 w-[420px] h-[420px] rounded-full bg-rose-nude/30 blur-3xl" />
        </div>

        <div className="container-page grid lg:grid-cols-2 gap-10 items-center pt-10 pb-20">
          <motion.div style={{ y: textY, opacity: textOpacity }}>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pill"
            >
              <Sparkles size={14} className="text-gold-500" />
              New seasonal collection · Spring 2025
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-display text-5xl md:text-7xl leading-[0.95]"
            >
              Perfume is the <em className="not-italic shimmer-text">invisible</em>
              <br />
              thread of memory.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="mt-6 text-lg text-ink-900/70 max-w-lg leading-relaxed"
            >
              Small-batch fragrances composed in Grasse, France. Each bottle is a
              hand-poured, slow-made ritual — designed to linger long after the
              evening ends.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link to="/shop" className="btn-primary group">
                Shop the collection
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link to="/about" className="btn-outline">
                Our craft
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="mt-10 flex items-center gap-6 text-xs text-ink-900/60"
            >
              <Stat icon={<Leaf size={14} />} label="Natural extracts" />
              <Stat icon={<Droplet size={14} />} label="30% concentration" />
              <Stat icon={<Award size={14} />} label="Hand-poured in Grasse" />
            </motion.div>
          </motion.div>

          <div className="relative h-[420px] md:h-[560px]">
            <motion.div
              style={{ y: bottleY, rotate: bottleRot }}
              className="absolute inset-0 grid place-items-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative animate-float"
              >
                <div className="absolute -inset-10 rounded-full bg-gradient-to-br from-gold-400/40 to-rose-nude/30 blur-2xl" />
                <HeroBottle />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="hidden md:block absolute top-10 -left-4 card px-4 py-3 text-xs max-w-[180px]"
            >
              <p className="font-medium">Noir Velours</p>
              <p className="text-ink-900/60 mt-0.5">
                Oud · Rose · Smoke
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.75 }}
              className="hidden md:flex absolute bottom-16 -right-2 card px-4 py-3 items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gold-500/20 grid place-items-center">
                <Sparkles size={14} className="text-gold-600" />
              </div>
              <div className="text-xs">
                <p className="font-medium">4.9 / 5</p>
                <p className="text-ink-900/60">12,400+ reviews</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] uppercase text-ink-900/40 hidden md:block">
          Scroll to explore
        </div>
      </section>

      {/* Marquee */}
      <section className="border-y border-ink-900/5 bg-white/50 backdrop-blur">
        <div className="overflow-hidden py-5">
          <motion.div
            className="flex gap-12 whitespace-nowrap font-display text-xl md:text-2xl text-ink-900/40"
            animate={{ x: [0, -800] }}
            transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
          >
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex gap-12">
                {[
                  "Maison Aura",
                  "· Grasse, France ·",
                  "Extrait de Parfum",
                  "· Small-batch ·",
                  "Hand-poured",
                  "· Natural essences ·",
                  "Cruelty-free",
                  "· Est. 2019 ·",
                ].map((t) => (
                  <span key={`${i}-${t}`}>{t}</span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <SectionHeader
            eyebrow="Families"
            title={<>Find your <em className="not-italic">scent family</em>.</>}
            description="Every nose remembers a different story. Begin with a family that speaks to you."
          />
          <Link to="/shop" className="text-sm inline-flex items-center gap-1.5 hover:text-gold-600 transition">
            Browse all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
            >
              <Link
                to={`/shop?category=${c.id}`}
                className="group card p-6 flex flex-col gap-2 h-full hover:-translate-y-1 hover:shadow-glow transition-all"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-ink-900/40">
                  0{i + 1}
                </span>
                <h3 className="font-display text-2xl">{c.label}</h3>
                <p className="text-sm text-ink-900/60">{c.hint}</p>
                <ArrowRight
                  size={16}
                  className="mt-2 text-ink-900/40 group-hover:text-gold-600 group-hover:translate-x-1 transition-all"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container-page py-12 md:py-20">
        <SectionHeader
          eyebrow="Featured"
          title={<>Editor's <em className="not-italic">reveries</em> this season.</>}
          description="Curated by our perfumers — compositions that define the mood of the moment."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Story band */}
      <section className="container-page py-20">
        <div className="relative card overflow-hidden p-8 md:p-14 lg:p-20">
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-32 -right-20 w-[480px] h-[480px] rounded-full bg-gold-400/25 blur-3xl" />
            <div className="absolute -bottom-40 -left-20 w-[420px] h-[420px] rounded-full bg-rose-nude/25 blur-3xl" />
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="pill">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                The atelier
              </span>
              <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.05]">
                A slow craft in a <em className="not-italic shimmer-text">hurried</em> world.
              </h2>
              <p className="mt-5 text-ink-900/70 leading-relaxed">
                Our compositions are aged a minimum of six weeks, decanted by hand,
                and quality-checked by our founding perfumer. We work with essences
                from ethical cooperatives in Bulgaria, Madagascar, and the south of
                France.
              </p>
              <Link to="/about" className="btn-outline mt-8">
                Read our story
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { v: "06+", l: "Weeks of maceration" },
                { v: "100%", l: "Natural essences" },
                { v: "30%", l: "Parfum concentration" },
                { v: "2019", l: "Founded in Grasse" },
              ].map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="rounded-2xl bg-white/70 border border-ink-900/5 p-5"
                >
                  <p className="font-display text-3xl shimmer-text">{s.v}</p>
                  <p className="text-sm text-ink-900/60 mt-1">{s.l}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Best sellers */}
      <section className="container-page py-12 md:py-20">
        <SectionHeader
          eyebrow="Most loved"
          title={<>The <em className="not-italic">signatures</em>.</>}
          description="Scents that have become part of our community's daily ritual."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
          {bestSellers.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-page py-20">
        <SectionHeader
          eyebrow="Words from our community"
          title={<>Scented <em className="not-italic">memories</em>.</>}
          align="center"
        />
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            {
              q: "Noir Velours is the most compliment-heavy perfume I have ever worn. It feels like wearing velvet at midnight.",
              n: "Hana · Tokyo",
            },
            {
              q: "I bought Soleil Doré on a whim in Paris and now I can't imagine summer without it. Pure sunshine in a bottle.",
              n: "Lucía · Madrid",
            },
            {
              q: "The packaging alone made me cry a little. Then I smelled Rêverie Blanche and forgot my own name.",
              n: "Priya · London",
            },
          ].map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card p-7"
            >
              <span className="font-display text-5xl text-gold-500 leading-none">“</span>
              <p className="mt-2 text-ink-900/80 leading-relaxed">{t.q}</p>
              <footer className="mt-5 text-sm text-ink-900/60">— {t.n}</footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-page py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-ink-900 text-cream-50 px-8 py-14 md:px-16 md:py-20"
        >
          <div className="absolute -top-20 -right-10 w-80 h-80 rounded-full bg-gold-500/25 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 w-80 h-80 rounded-full bg-rose-nude/15 blur-3xl" />
          <div className="relative max-w-xl">
            <span className="pill !bg-cream-50/10 !text-cream-50/80 !border-cream-50/10">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              Membership
            </span>
            <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.05]">
              Enter the private <em className="not-italic shimmer-text">atelier</em>.
            </h2>
            <p className="mt-4 text-cream-50/70">
              Early access to new releases, hand-written notes from our
              perfumers, and invitations to scent salons in Paris, New York, and
              Tokyo.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md"
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                className="flex-1 bg-cream-50/10 border border-cream-50/15 text-cream-50 placeholder:text-cream-50/40 px-5 py-3 rounded-full focus:outline-none focus:border-gold-500"
              />
              <button type="submit" className="btn-gold">
                Join
              </button>
            </form>
          </div>
        </motion.div>
      </section>
    </>
  );
}

function Stat({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-6 h-6 rounded-full bg-ink-900/5 grid place-items-center text-gold-600">
        {icon}
      </span>
      <span>{label}</span>
    </div>
  );
}

function HeroBottle() {
  return (
    <svg
      width="340"
      height="440"
      viewBox="0 0 340 440"
      className="drop-shadow-2xl"
      aria-hidden
    >
      <defs>
        <linearGradient id="glass" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#f3e0b5" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#c79a4b" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#6b4620" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="cap" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0E0B08" />
          <stop offset="100%" stopColor="#2A1F17" />
        </linearGradient>
        <linearGradient id="shine" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* cap */}
      <rect x="135" y="20" width="70" height="56" rx="6" fill="url(#cap)" />
      <rect x="125" y="68" width="90" height="14" rx="3" fill="url(#cap)" />
      {/* neck */}
      <rect x="150" y="82" width="40" height="22" fill="#8b6a3a" />
      {/* body */}
      <path
        d="M70 120 Q70 100 100 100 H240 Q270 100 270 120 V380 Q270 410 240 410 H100 Q70 410 70 380 Z"
        fill="url(#glass)"
        stroke="#3a2a14"
        strokeOpacity="0.3"
        strokeWidth="2"
      />
      {/* shine */}
      <rect x="85" y="120" width="20" height="260" fill="url(#shine)" opacity="0.7" />
      {/* label */}
      <rect
        x="100"
        y="220"
        width="140"
        height="110"
        rx="4"
        fill="#fbf7f2"
        stroke="#c79a4b"
        strokeWidth="1.2"
      />
      <text
        x="170"
        y="260"
        textAnchor="middle"
        fontFamily="Playfair Display, serif"
        fontStyle="italic"
        fontSize="22"
        fill="#2A1F17"
      >
        Maison
      </text>
      <text
        x="170"
        y="288"
        textAnchor="middle"
        fontFamily="Playfair Display, serif"
        fontSize="26"
        fontWeight="600"
        fill="#0E0B08"
      >
        AURA
      </text>
      <text
        x="170"
        y="312"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="9"
        letterSpacing="4"
        fill="#2A1F17"
      >
        EXTRAIT · 100ML
      </text>
    </svg>
  );
}
