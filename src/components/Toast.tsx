"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useUI } from "@/lib/store";

export default function Toast() {
  const toast = useUI((s) => s.toast);
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[90] pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-ink text-white text-sm px-5 py-3 rounded-full shadow-card-hover"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
