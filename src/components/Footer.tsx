import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

const iconBase = "w-4 h-4";
const Instagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={iconBase}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
  </svg>
);
const Twitter = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={iconBase}>
    <path d="M18.244 2H21.5l-7.45 8.513L23 22h-6.844l-5.36-6.74L4.7 22H1.44l7.97-9.104L1 2h7.02l4.843 6.185L18.244 2zm-2.4 18h1.9L7.25 3.9H5.23l10.614 16.1z" />
  </svg>
);
const Facebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={iconBase}>
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="mt-24 bg-ink-900 text-cream-50">
      <div className="container-page py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 max-w-md">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-block w-8 h-8 rounded-lg bg-gradient-to-br from-gold-500 to-gold-600" />
            <span className="font-display text-xl tracking-[0.18em] uppercase">
              Maison <span className="shimmer-text">Aura</span>
            </span>
          </div>
          <p className="text-cream-50/70 leading-relaxed">
            Handcrafted perfumes composed in Grasse, France. Each scent is a story
            — a private moment, bottled.
          </p>
          <form
            className="mt-8 flex items-center gap-2 p-1.5 rounded-full border border-cream-50/15 bg-cream-50/5"
            onSubmit={(e) => e.preventDefault()}
          >
            <Mail className="ml-3 text-cream-50/60" size={16} />
            <input
              type="email"
              placeholder="Join the atelier newsletter"
              className="flex-1 bg-transparent px-2 py-2 text-sm placeholder:text-cream-50/40 focus:outline-none"
            />
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="btn-gold !py-2 !px-5 text-sm"
              type="submit"
            >
              Subscribe
            </motion.button>
          </form>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.18em] text-cream-50/60 mb-4">
            Explore
          </h4>
          <ul className="space-y-2.5">
            <li><Link to="/shop" className="hover:text-gold-400 transition-colors">Shop all</Link></li>
            <li><Link to="/shop?category=Floral" className="hover:text-gold-400 transition-colors">Floral</Link></li>
            <li><Link to="/shop?category=Woody" className="hover:text-gold-400 transition-colors">Woody</Link></li>
            <li><Link to="/shop?category=Oriental" className="hover:text-gold-400 transition-colors">Oriental</Link></li>
            <li><Link to="/about" className="hover:text-gold-400 transition-colors">Our story</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.18em] text-cream-50/60 mb-4">
            Assistance
          </h4>
          <ul className="space-y-2.5">
            <li><Link to="/contact" className="hover:text-gold-400 transition-colors">Contact</Link></li>
            <li><a href="#" className="hover:text-gold-400 transition-colors">Shipping & returns</a></li>
            <li><a href="#" className="hover:text-gold-400 transition-colors">Gift services</a></li>
            <li><a href="#" className="hover:text-gold-400 transition-colors">FAQ</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-50/10">
        <div className="container-page py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-50/50">
          <p>© {new Date().getFullYear()} Maison Aura. Crafted with care.</p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Instagram" className="hover:text-gold-400 transition"><Instagram /></a>
            <a href="#" aria-label="Twitter" className="hover:text-gold-400 transition"><Twitter /></a>
            <a href="#" aria-label="Facebook" className="hover:text-gold-400 transition"><Facebook /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
