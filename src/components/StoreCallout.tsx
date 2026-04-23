"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function StoreCallout() {
  return (
    <section className="container-x py-14 md:py-20">
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 rounded-2xl overflow-hidden border border-ink/10 bg-white">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative min-h-[320px] md:min-h-[460px]"
          style={{
            background:
              "linear-gradient(150deg,#1a120a 0%,#402310 45%,#8a5a2a 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.25),transparent_40%)]" />
          <div className="absolute inset-6 md:inset-10 rounded-lg border border-gold/25">
            <div className="absolute left-10 right-10 top-10 bottom-10 grid grid-cols-3 gap-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-md border border-gold/20 bg-black/20 relative overflow-hidden"
                >
                  <div
                    className="absolute left-1/2 -translate-x-1/2 bottom-2 w-[60%] h-[60%] rounded-sm"
                    style={{
                      background:
                        "linear-gradient(155deg,rgba(255,255,255,.22),rgba(184,147,90,.65),rgba(55,34,16,.9))",
                      boxShadow:
                        "inset 0 0 0 1px rgba(255,255,255,.1), 0 4px 8px rgba(0,0,0,.35)",
                    }}
                  />
                </div>
              ))}
            </div>
            <span className="absolute bottom-4 left-6 text-gold/80 text-xs tracking-[0.3em] uppercase">
              Flagship · Bahria Orchard, Lahore
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-7 md:p-12 flex flex-col justify-center"
        >
          <p className="text-[11px] uppercase tracking-[0.22em] text-gold-dark">
            Visit Usman Baig
          </p>
          <h2 className="serif text-[clamp(1.8rem,3.6vw,2.6rem)] mt-2 leading-tight">
            Step into a world of
            <br /> luxury scents.
          </h2>
          <p className="mt-4 text-ink-soft leading-relaxed max-w-[52ch]">
            Our flagship showroom in Bahria Orchard, Lahore is home to our full
            range of attars, bakhoors and signature perfumes. Our fragrance
            advisors will help you discover a scent that&apos;s unmistakably yours.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-ink-soft">
            <li className="flex gap-2"><span className="text-gold">·</span> Complimentary fragrance consultation</li>
            <li className="flex gap-2"><span className="text-gold">·</span> Scent journaling & layering demos</li>
            <li className="flex gap-2"><span className="text-gold">·</span> Exclusive in-store launches</li>
          </ul>
          <a
            href="https://maps.google.com/?q=Bahria+Orchard+Lahore"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 self-start mt-8 px-6 py-3.5 rounded-full bg-ink text-white text-sm font-medium hover:bg-gold hover:text-ink transition-colors duration-300"
          >
            <MapPin size={16} />
            Get Direction
          </a>
        </motion.div>
      </div>
    </section>
  );
}
