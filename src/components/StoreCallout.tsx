"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const SHELF = [
  { name: "Mughal", line: "EDP · 100ml", grad: "linear-gradient(155deg,#e7cfa4,#6b3e1b)" },
  { name: "Hajj", line: "Attar · 12ml", grad: "linear-gradient(155deg,#f3e6cc,#9a7a48)" },
  { name: "Sultan", line: "Oud · 50ml", grad: "linear-gradient(155deg,#caa06b,#3f2110)" },
  { name: "Noor", line: "EDP · 100ml", grad: "linear-gradient(155deg,#f4c9ce,#b26676)" },
  { name: "Shahi", line: "Attar · 12ml", grad: "linear-gradient(155deg,#d8a967,#5a3212)" },
  { name: "Royale", line: "Mukhalat · 6ml", grad: "linear-gradient(155deg,#b8935a,#3a1f0b)" },
  { name: "Bakhoor", line: "Wood · 40g", grad: "linear-gradient(155deg,#7a4a23,#2b130a)" },
  { name: "Citrus", line: "EDT · 75ml", grad: "linear-gradient(155deg,#fff2b3,#cdbd4f)" },
  { name: "Rose Oud", line: "Parfum · 50ml", grad: "linear-gradient(155deg,#d49ba0,#5a2a2a)" },
];

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
            <div className="absolute left-10 right-10 top-10 bottom-14 grid grid-cols-3 gap-3">
              {SHELF.map((b, i) => (
                <div
                  key={i}
                  className="rounded-md border border-gold/20 bg-black/25 relative overflow-hidden flex items-end justify-center pb-1.5"
                >
                  {/* mini bottle */}
                  <div
                    className="relative w-[72%] h-[82%] rounded-[3px_3px_6px_6px] overflow-hidden"
                    style={{
                      background: b.grad,
                      boxShadow:
                        "inset 0 0 0 1px rgba(255,255,255,.18), inset 0 6px 10px rgba(255,255,255,.12), inset 0 -8px 12px rgba(0,0,0,.3), 0 6px 10px rgba(0,0,0,.4)",
                    }}
                  >
                    {/* cap */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[44%] h-[11%] bg-[#0f0f0f] rounded-b-[2px]" />
                    {/* label */}
                    <div className="absolute left-[10%] right-[10%] top-[22%] bottom-[14%] rounded-[2px] bg-[rgba(250,247,242,.95)] flex flex-col items-center justify-center px-[4%] py-[6%] text-center gap-[2px] shadow-[inset_0_0_0_1px_rgba(0,0,0,.1)]">
                      <p className="text-[6px] tracking-[0.2em] uppercase text-[#8a6a3c] font-semibold leading-none">
                        U.B.
                      </p>
                      <p className="serif text-[10px] leading-[1.05] text-[#1a120a] w-full">
                        {b.name}
                      </p>
                      <p className="text-[6px] tracking-[0.12em] uppercase text-[#a6773c] w-full leading-[1.15]">
                        {b.line}
                      </p>
                      <p className="text-[5.5px] tracking-[0.2em] uppercase text-[#8a6a3c] pt-[2px] mt-[2px] border-t border-black/10 w-full leading-none">
                        N° {String(i + 1).padStart(2, "0")}
                      </p>
                    </div>
                  </div>
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
