"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ExternalLink } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function FloatingChatWidget() {
  const { isChatOpen, toggleChat } = useStore();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat popup */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25, type: "spring", stiffness: 260, damping: 20 }}
            className="w-72 bg-white rounded-sm shadow-2xl border border-gray-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-charcoal px-4 py-4 flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                  <span className="font-playfair text-charcoal font-bold text-sm">UB</span>
                </div>
                {/* Online indicator */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-charcoal rounded-full" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm font-inter">Usman Baig Team</p>
                <p className="text-gray-400 text-xs font-inter">Typically replies within an hour</p>
              </div>
              <button
                onClick={toggleChat}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              <div className="bg-cream rounded-sm p-3 mb-4">
                <p className="text-charcoal text-sm font-inter leading-relaxed">
                  👋 Welcome to Usman Baig Fragrance! How can we help you find your perfect scent today?
                </p>
              </div>

              <div className="space-y-2 mb-5">
                {[
                  "Browse our collection",
                  "Track my order",
                  "Ask about a fragrance",
                ].map((option) => (
                  <button
                    key={option}
                    className="w-full text-left text-xs font-inter text-charcoal border border-gray-200 px-3 py-2.5 hover:border-gold hover:bg-cream transition-all duration-200"
                  >
                    {option}
                  </button>
                ))}
              </div>

              <motion.a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 w-full bg-gold text-charcoal py-3 text-xs font-bold tracking-widest uppercase font-inter hover:bg-gold-dark transition-colors duration-200"
              >
                Start Chat <ExternalLink size={13} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className="w-14 h-14 bg-gold rounded-full shadow-lg flex items-center justify-center text-charcoal hover:bg-gold-dark transition-colors duration-200"
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait">
          {isChatOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
