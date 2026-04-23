"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useUI } from "@/lib/store";

const GROUPS = [
  { label: "Gender", items: ["Men", "Women", "Unisex"] },
  { label: "Season", items: ["Summer", "Winter"] },
  { label: "Perfumes Sale", items: ["Men", "Women"] },
  { label: "Type", items: ["Soft", "Fresh", "Woody", "Fruity", "Sweet"] },
  { label: "Range", items: ["Affordable", "Premium"] },
  { label: "Sillage", items: ["Soft", "Medium", "Strong"] },
  {
    label: "Premium Attars",
    items: ["French", "Arabic", "Pure", "Oud", "Mukhalat"],
  },
  { label: "Bakhoor's", items: ["Bakhoor Wood", "Burner"] },
];

export default function MobileNav() {
  const open = useUI((s) => s.mobileNavOpen);
  const setOpen = useUI((s) => s.setMobileNav);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="mn-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[55] bg-black/40 lg:hidden"
            onClick={() => setOpen(false)}
          />
          <motion.aside
            key="mn"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 bottom-0 w-[min(340px,88vw)] bg-white z-[60] overflow-y-auto lg:hidden"
          >
            <div className="px-5 pt-16 pb-10">
              <ul className="divide-y divide-ink/10">
                {GROUPS.map((g) => {
                  const active = expanded === g.label;
                  return (
                    <li key={g.label}>
                      <button
                        className="w-full flex items-center justify-between py-3.5 text-ink"
                        onClick={() => setExpanded(active ? null : g.label)}
                      >
                        <span className="serif text-xl">{g.label}</span>
                        <ChevronDown
                          size={18}
                          className={`transition ${active ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {active && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-1"
                          >
                            <div className="pb-4 space-y-1.5">
                              {g.items.map((it) => (
                                <li key={it}>
                                  <a
                                    href="#shop"
                                    onClick={() => setOpen(false)}
                                    className="block py-1.5 text-sm text-ink-soft hover:text-gold"
                                  >
                                    {it}
                                  </a>
                                </li>
                              ))}
                            </div>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 pt-4 border-t border-ink/10 space-y-3 text-sm text-ink-soft">
                <a href="#" className="block">Sign in / Register</a>
                <a href="#" className="block">Store locator</a>
                <a href="#contact" className="block">Contact us</a>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
