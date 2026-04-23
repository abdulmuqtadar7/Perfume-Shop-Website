"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function StoreCallout() {
  return (
    <section className="py-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
        {/* Left: store image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative min-h-[320px] lg:min-h-0"
        >
          <Image
            src="https://placehold.co/800x600/2d1b0e/D4AF37?text=Our+Store"
            alt="Usman Baig Store"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
        </motion.div>

        {/* Right: content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="bg-charcoal flex items-center justify-center px-10 py-16 sm:px-16"
        >
          <div className="max-w-md">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-inter mb-4">
              Visit Us In Person
            </p>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              Visit <span className="text-gold">Usman Baig</span>
            </h2>
            <p className="text-gray-300 font-inter text-base leading-relaxed mb-8">
              Step into the world of luxury scents at our physical store in
              Bahria Orchard, Lahore. Experience our full collection personally
              — smell before you buy, get expert fragrance consultations, and
              discover exclusive in-store-only deals.
            </p>

            <div className="flex items-start gap-3 mb-8 text-gray-400">
              <MapPin size={18} className="text-gold mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-semibold text-sm font-inter">
                  Bahria Orchard, Lahore
                </p>
                <p className="text-xs font-inter mt-0.5">
                  Phase 1, Main Boulevard — Open 10am to 10pm, Daily
                </p>
              </div>
            </div>

            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-gold text-gold font-inter font-semibold text-sm tracking-widest uppercase
                hover:bg-gold hover:text-charcoal transition-all duration-300"
            >
              Get Directions
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
