import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Award, Leaf, Sparkles } from "lucide-react";
import { SectionHeader } from "../components/Section";

export function About() {
  return (
    <div>
      <section className="container-page pt-14 pb-10">
        <span className="pill">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
          Since 2019 · Grasse, France
        </span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-5 font-display text-5xl md:text-7xl leading-[0.95] max-w-4xl"
        >
          We make perfume the <em className="not-italic shimmer-text">old way</em>.
          Slowly, by hand, with patience.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="mt-6 max-w-2xl text-lg text-ink-900/70 leading-relaxed"
        >
          Maison Aura was founded by Louise Marchand and Kaveh Saeidi in a small
          atelier on Rue Droite, in the hills above Grasse. Our compositions are
          aged a minimum of six weeks before being hand-poured into heavy glass.
        </motion.p>
      </section>

      <section className="container-page py-10 grid md:grid-cols-3 gap-6">
        {[
          {
            icon: <Leaf className="text-gold-600" />,
            t: "Ethical sourcing",
            d: "We partner directly with growers — Bulgarian rose farmers, Madagascan vanilla cooperatives, Italian bergamot orchards.",
          },
          {
            icon: <Award className="text-gold-600" />,
            t: "Small-batch craft",
            d: "No perfume leaves our atelier until Louise has personally signed off on every batch.",
          },
          {
            icon: <Sparkles className="text-gold-600" />,
            t: "30% concentration",
            d: "Our extraits are composed at luxurious 30% concentration — a single application lingers all day.",
          },
        ].map((f, i) => (
          <motion.div
            key={f.t}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="card p-7"
          >
            <div className="w-12 h-12 rounded-2xl bg-gold-500/15 grid place-items-center">
              {f.icon}
            </div>
            <h3 className="mt-5 font-display text-2xl">{f.t}</h3>
            <p className="mt-2 text-ink-900/70 leading-relaxed">{f.d}</p>
          </motion.div>
        ))}
      </section>

      <section className="container-page py-16 md:py-24">
        <SectionHeader
          eyebrow="The craft"
          title={<>From a single petal to a <em className="not-italic">finished extrait</em>.</>}
        />
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          {[
            { n: "01", t: "Harvest", d: "Hand-picked at dawn, when volatiles are richest." },
            { n: "02", t: "Extract", d: "Traditional enfleurage and steam distillation." },
            { n: "03", t: "Compose", d: "Louise builds the accord over six to eight weeks." },
            { n: "04", t: "Age", d: "Each bottle rests at 14°C in dark cellar for six weeks." },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative card p-6"
            >
              <p className="shimmer-text font-display text-4xl">{s.n}</p>
              <h4 className="mt-3 font-display text-xl">{s.t}</h4>
              <p className="mt-2 text-sm text-ink-900/70">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-page py-10">
        <div className="card overflow-hidden p-10 md:p-16 text-center">
          <h3 className="font-display text-3xl md:text-4xl max-w-2xl mx-auto">
            Every bottle carries a piece of a morning in Grasse.
          </h3>
          <Link to="/shop" className="btn-primary mt-8">
            Explore the collection
          </Link>
        </div>
      </section>
    </div>
  );
}
