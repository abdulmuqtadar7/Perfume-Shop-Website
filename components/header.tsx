"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useStore } from "@/context/store-context";
import { useRouter } from "next/navigation";

const announcements = [
  "💥 Flat 38% OFF + Free Shipping on All Perfumes – Limited Time Offer! ✨",
  "🚚 Free Shipping on All Products Above Rs. 3,999 – Shop Now!",
];

const megaMenu = {
  Gender: ["Men", "Women"],
  Season: ["Summer", "Winter"],
  "Perfumes Sale": ["Men", "Women"],
  Type: ["Soft", "Fresh", "Woody", "Fruity", "Sweet"],
  Range: ["Affordable", "Premium"],
  "Sillage / Project": ["Soft", "Medium", "Strong"],
  "Premium Attars": ["French", "Arabic", "Pure", "Oud", "Mukhalat"],
  "Premium Bakhoor's": ["Bukhoor Wood", "Burner"],
};

export function Header() {
  const { cartCount, wishlistCount, setCartOpen } = useStore();
  const [activeMessage, setActiveMessage] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMessage((prev) => (prev + 1) % announcements.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const navLinks = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "Assistant", href: "/assistant" },
      { label: "Checkout", href: "/checkout" },
    ],
    [],
  );

  const onSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = query.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-neutral-200">
      <div className="bg-neutral-900 text-white text-center h-10 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.p
            key={activeMessage}
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 flex items-center justify-center px-4 text-xs md:text-sm"
          >
            {announcements[activeMessage]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="h-20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 rounded-md border border-neutral-200" onClick={() => setMobileOpen((v) => !v)}>
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <Link href="/" className="text-lg md:text-2xl tracking-wide font-semibold text-neutral-900">
              Usman Baig <span className="text-[#B48A54]">Fragrance</span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-5 text-sm">
            {Object.entries(megaMenu).map(([title, options]) => (
              <div className="group relative" key={title}>
                <button className="hover:text-[#B48A54] transition-colors">{title}</button>
                <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute top-8 left-0 w-48 bg-white border border-neutral-200 shadow-xl rounded-xl p-3 z-50">
                  {options.map((option) => (
                    <Link
                      href={`/shop?q=${encodeURIComponent(option)}`}
                      className="block py-1.5 text-neutral-600 hover:text-[#B48A54]"
                      key={option}
                    >
                      {option}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <form onSubmit={onSubmitSearch} className="flex items-center">
              <motion.input
                animate={{ width: searchOpen ? 170 : 0, opacity: searchOpen ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                placeholder="Search fragrances"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-9 bg-neutral-50 border border-neutral-200 rounded-l-md px-3 text-sm outline-none"
              />
              <button
                type={searchOpen ? "submit" : "button"}
                onClick={() => setSearchOpen((v) => !v)}
                className="h-9 w-9 grid place-items-center border border-neutral-200 rounded-md md:rounded-l-none"
              >
                <Search size={16} />
              </button>
            </form>
            <Link href="/checkout" className="h-9 w-9 grid place-items-center border border-neutral-200 rounded-md">
              <User size={16} />
            </Link>
            <button className="relative h-9 w-9 grid place-items-center border border-neutral-200 rounded-md" aria-label="wishlist">
              <Heart size={16} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 text-[10px] w-4 h-4 rounded-full bg-[#B48A54] text-white grid place-items-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button onClick={() => setCartOpen(true)} className="relative h-9 w-9 grid place-items-center border border-neutral-200 rounded-md">
              <ShoppingBag size={16} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-[10px] w-4 h-4 rounded-full bg-[#B48A54] text-white grid place-items-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-4 border-t border-neutral-100">
            <div className="flex flex-col gap-2 mt-3">
              {navLinks.map((item) => (
                <Link href={item.href} key={item.href} className="py-2 text-sm text-neutral-700" onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
