"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer id="contact" className="bg-ink text-white mt-4">
      {/* Newsletter */}
      <div className="container-x py-14 md:py-16 border-b border-white/10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-gold">
              Member&apos;s Benefit
            </p>
            <h2 className="serif text-[clamp(1.6rem,3vw,2.2rem)] mt-2">
              Receive our latest updates.
            </h2>
            <p className="text-white/60 text-sm mt-2 max-w-[50ch]">
              Sign up and be the first to know about new launches, limited
              editions and private events.
            </p>
          </div>
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) {
                setDone(true);
                setEmail("");
              }
            }}
            className="flex gap-3 bg-white/5 border border-white/15 rounded-full p-1.5 md:justify-self-end md:min-w-[520px] focus-within:border-gold transition"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none text-white placeholder:text-white/40"
            />
            <button className="px-6 py-2.5 rounded-full bg-gold text-ink font-medium text-sm hover:bg-gold-light transition whitespace-nowrap">
              SIGN UP
            </button>
          </motion.form>
        </div>
        {done && (
          <p className="mt-3 text-xs text-gold">
            Thanks for subscribing — check your inbox.
          </p>
        )}
      </div>

      {/* Columns */}
      <div className="container-x py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <p className="serif text-2xl">Usman Baig <span className="text-gold italic">Fragrance</span></p>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li className="flex gap-2"><MapPin size={16} className="text-gold mt-0.5 shrink-0" /> Bahria Orchard, Lahore, Pakistan</li>
            <li className="flex gap-2"><Phone size={16} className="text-gold mt-0.5 shrink-0" /> +92 300 123 4567</li>
            <li className="flex gap-2"><Mail size={16} className="text-gold mt-0.5 shrink-0" /> hello@usmanbaig.pk</li>
          </ul>
          <div className="mt-5 flex gap-2">
            {[Facebook, Youtube, Twitter].map((I, k) => (
              <a
                key={k}
                href="#"
                aria-label="Social link"
                className="w-9 h-9 rounded-full border border-white/15 grid place-items-center hover:bg-gold hover:text-ink hover:border-gold transition"
              >
                <I size={16} />
              </a>
            ))}
          </div>
        </div>

        <FooterCol
          title="Shop By"
          items={["Affordable", "Premium", "Summer", "Men", "Women"]}
        />
        <FooterCol
          title="Customer Service"
          items={["Blogs", "Contact Us", "Shipping Policy", "Privacy Policy", "Terms", "Refund Policy"]}
        />
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold mb-4">
            Accepted Payments
          </p>
          <div className="flex flex-wrap gap-2">
            {["VISA", "MC", "AMEX", "JAZZ", "EASY", "COD"].map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 text-[11px] tracking-widest bg-white/5 border border-white/10 rounded text-white/80"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-6 text-xs text-white/50">
            Cash on delivery available nationwide. Easy returns within 15 days.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© 2026 Usman Baig Fragrance. All rights reserved.</p>
          <p>Crafted with care in Lahore.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-gold mb-4">{title}</p>
      <ul className="space-y-2.5 text-sm text-white/70">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="hover:text-gold transition">{i}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
