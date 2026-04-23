"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import AnnouncementBar from "./AnnouncementBar";
import { useStore } from "@/context/StoreContext";

interface NavItem {
  label: string;
  items: string[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Gender", items: ["Men", "Women", "Unisex"] },
  { label: "Season", items: ["Summer", "Winter", "All Season", "Spring"] },
  {
    label: "Perfumes Sale",
    items: ["Flat 38% OFF", "Bundle Deals", "Clearance Sale"],
  },
  {
    label: "Type",
    items: ["Eau de Parfum", "Eau de Toilette", "Attar/Oil", "Bakhoor"],
  },
  {
    label: "Range",
    items: ["Under Rs. 1,000", "Rs. 1,000–2,500", "Rs. 2,500–5,000", "Premium"],
  },
  {
    label: "Sillage",
    items: ["Light", "Moderate", "Heavy", "Projection King"],
  },
  {
    label: "Premium Attars",
    items: ["Oud Attars", "French Attars", "Arabic Attars", "Rose Attars"],
  },
  {
    label: "Premium Bakhoors",
    items: ["Bakhoor Chips", "Bakhoor Tablets", "Bakhoor Burners", "Gift Sets"],
  },
];

export default function Navbar() {
  const { cartCount, wishlistCount, toggleCart } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <AnnouncementBar />
      <nav
        className={`bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left: hamburger + logo */}
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden p-1 text-charcoal hover:text-gold transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
              <span className="font-playfair text-lg sm:text-xl font-semibold text-charcoal whitespace-nowrap">
                Usman Baig Fragrance
              </span>
            </div>

            {/* Center: mega-menu (desktop) */}
            <div
              ref={dropdownRef}
              className="hidden lg:flex items-center gap-0.5"
            >
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-3 py-5 text-sm font-medium text-charcoal hover:text-gold transition-colors">
                    {item.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${
                        activeDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 w-48 bg-white border border-gray-100 shadow-xl rounded-sm z-50 py-2"
                      >
                        {item.items.map((sub) => (
                          <a
                            key={sub}
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-cream hover:text-gold transition-colors"
                          >
                            {sub}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right: icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <AnimatePresence mode="wait">
                {searchOpen ? (
                  <motion.div
                    key="search-input"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 180, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <input
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search fragrances..."
                      className="w-full border-b border-gold outline-none text-sm py-1 px-2 text-charcoal placeholder-gray-400"
                      onBlur={() => {
                        if (!searchQuery) setSearchOpen(false);
                      }}
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <button
                className="p-2 text-charcoal hover:text-gold transition-colors"
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="Search"
              >
                {searchOpen ? <X size={20} /> : <Search size={20} />}
              </button>

              <button
                className="p-2 text-charcoal hover:text-gold transition-colors hidden sm:block"
                aria-label="Account"
              >
                <User size={20} />
              </button>

              <button className="p-2 text-charcoal hover:text-gold transition-colors relative" aria-label="Wishlist">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gold text-charcoal text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                className="p-2 text-charcoal hover:text-gold transition-colors relative"
                onClick={toggleCart}
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gold text-charcoal text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-72 bg-white z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-playfair text-lg font-semibold text-charcoal">
                  Menu
                </span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X size={22} className="text-charcoal" />
                </button>
              </div>
              <div className="py-2">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label}>
                    <button
                      className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-charcoal hover:bg-cream"
                      onClick={() =>
                        setMobileExpanded((v) =>
                          v === item.label ? null : item.label
                        )
                      }
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          mobileExpanded === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === item.label && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden bg-cream"
                        >
                          {item.items.map((sub) => (
                            <a
                              key={sub}
                              href="#"
                              className="block px-8 py-2.5 text-sm text-gray-600 hover:text-gold"
                            >
                              {sub}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
