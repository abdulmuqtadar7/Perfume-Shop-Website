"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useCart, useUI, useWish } from "@/lib/store";

type MegaCol = { title: string; items: string[] };

const MENU: { label: string; cols: MegaCol[] }[] = [
  {
    label: "Gender",
    cols: [
      { title: "Shop", items: ["Men", "Women", "Unisex"] },
      { title: "Featured", items: ["Mughal", "Noor", "Rose Oud"] },
    ],
  },
  {
    label: "Season",
    cols: [
      { title: "By Season", items: ["Summer", "Winter", "All-season"] },
      { title: "Edits", items: ["Light & Fresh", "Warm & Spiced", "Signature Woods"] },
    ],
  },
  {
    label: "Perfumes Sale",
    cols: [
      { title: "Sale", items: ["Men", "Women", "Unisex"] },
      { title: "Hot Deals", items: ["Flat 38% Off", "Buy 1 Get 1", "Under Rs. 2,000"] },
    ],
  },
  {
    label: "Type",
    cols: [{ title: "Scent Family", items: ["Soft", "Fresh", "Woody", "Fruity", "Sweet"] }],
  },
  {
    label: "Range",
    cols: [{ title: "Price Range", items: ["Affordable", "Premium"] }],
  },
  {
    label: "Sillage",
    cols: [{ title: "Projection", items: ["Soft", "Medium", "Strong"] }],
  },
  {
    label: "Premium Attars",
    cols: [
      { title: "Origin", items: ["French", "Arabic", "Pure"] },
      { title: "Ingredient", items: ["Oud", "Mukhalat"] },
    ],
  },
  {
    label: "Bakhoor's",
    cols: [{ title: "Shop Bakhoor", items: ["Bakhoor Wood", "Burner"] }],
  },
];

export default function Header() {
  const cart = useCart((s) => s.lines);
  const wish = useWish((s) => s.ids);
  const cartHydrated = useCart((s) => s.hydrated);
  const wishHydrated = useWish((s) => s.hydrated);

  const setCartOpen = useUI((s) => s.setCart);
  const setWishOpen = useUI((s) => s.setWish);
  const setMobileNav = useUI((s) => s.setMobileNav);
  const mobileNavOpen = useUI((s) => s.mobileNavOpen);
  const searchOpen = useUI((s) => s.searchOpen);
  const setSearchOpen = useUI((s) => s.setSearch);

  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cartCount = cartHydrated ? cart.reduce((n, l) => n + l.qty, 0) : 0;
  const wishCount = wishHydrated ? wish.length : 0;

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 transition-[background,border-color,box-shadow] duration-300",
        scrolled ? "bg-white/95 backdrop-blur border-b border-ink/10 shadow-sm" : "bg-white"
      )}
    >
      <div className="container-x h-16 flex items-center gap-4">
        <button
          className="lg:hidden p-2 -ml-2"
          onClick={() => setMobileNav(!mobileNavOpen)}
          aria-label="Open menu"
        >
          {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <a href="#" className="flex items-center gap-2 shrink-0">
          <span className="grid place-items-center w-9 h-9 rounded-full bg-ink text-gold serif text-lg">
            UB
          </span>
          <span className="serif text-lg sm:text-xl leading-none">
            Usman Baig <span className="text-gold italic">Fragrance</span>
          </span>
        </a>

        <nav
          className="hidden lg:flex items-center gap-5 xl:gap-7 flex-1 justify-center text-[13.5px]"
          onMouseLeave={() => setHover(null)}
        >
          {MENU.map((m) => (
            <div
              key={m.label}
              className="relative"
              onMouseEnter={() => setHover(m.label)}
            >
              <button className="flex items-center gap-1 py-2 text-ink-soft hover:text-ink transition">
                {m.label}
                <ChevronDown size={14} className="opacity-60" />
              </button>
              <AnimatePresence>
                {hover === m.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-3"
                  >
                    <div className="bg-white border border-ink/10 shadow-card rounded-lg p-5 min-w-[260px] grid grid-cols-[max-content_max-content] gap-6">
                      {m.cols.map((c) => (
                        <div key={c.title}>
                          <p className="text-[11px] uppercase tracking-[.18em] text-ink-muted mb-2">
                            {c.title}
                          </p>
                          <ul className="space-y-1.5">
                            {c.items.map((it) => (
                              <li key={it}>
                                <a
                                  href="#shop"
                                  className="text-sm text-ink-soft hover:text-gold transition"
                                >
                                  {it}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
          <IconButton
            label="Search"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search size={20} />
          </IconButton>
          <IconButton label="Account">
            <User size={20} />
          </IconButton>
          <IconButton
            label="Wishlist"
            onClick={() => setWishOpen(true)}
            count={wishCount}
            dotColor="bg-rose-500 text-white"
          >
            <Heart size={20} />
          </IconButton>
          <IconButton
            label="Cart"
            onClick={() => setCartOpen(true)}
            count={cartCount}
            dotColor="bg-gold text-ink"
          >
            <ShoppingBag size={20} />
          </IconButton>
        </div>
      </div>

      {/* Expanding search */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-ink/10 overflow-hidden bg-white"
          >
            <div className="container-x py-4 flex gap-3">
              <Search className="mt-2.5 text-ink-muted" size={18} />
              <input
                autoFocus
                placeholder='Try "Mughal", "oud", "jasmine attar"…'
                className="flex-1 py-2 text-base outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-sm text-ink-muted hover:text-ink"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function IconButton({
  children,
  label,
  onClick,
  count,
  dotColor,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  count?: number;
  dotColor?: string;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="relative w-10 h-10 grid place-items-center rounded-full hover:bg-ink/5 transition"
    >
      {children}
      {typeof count === "number" && count > 0 && (
        <span
          className={clsx(
            "absolute top-1 right-1 min-w-[18px] h-[18px] rounded-full text-[11px] font-semibold grid place-items-center px-1",
            dotColor
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
