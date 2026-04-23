"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const MESSAGES = [
  "💥 Flat 38% OFF + Free Shipping on All Perfumes – Limited Time Offer! ✨",
  "🚚 Free Shipping on All Products Above Rs. 3,999 – Shop Now!",
];

export default function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % MESSAGES.length), 3800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-ink text-white text-[12px] sm:text-[13px] tracking-wide overflow-hidden">
      <div className="container-x relative h-9 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={i}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -18, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="whitespace-nowrap"
          >
            {MESSAGES[i]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
