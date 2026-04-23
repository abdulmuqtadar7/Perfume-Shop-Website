"use client";

import { motion } from "framer-motion";
import { RefreshCw, Truck, Headphones } from "lucide-react";

const VALUES = [
  {
    icon: RefreshCw,
    title: "Long-Lasting & Easy Exchange",
    subtitle: "15-day exchange policy",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    subtitle: "4–5 working days",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    subtitle: "Always here to help",
  },
];

export default function ValuePropositionBar() {
  return (
    <section className="bg-cream border-y border-gray-200 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
          {VALUES.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`flex items-center gap-4 justify-center sm:justify-start
                ${i < VALUES.length - 1 ? "sm:border-r sm:border-gray-300" : ""}
                sm:px-6 first:pl-0 last:pr-0`}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                <item.icon size={22} className="text-gold" />
              </div>
              <div>
                <p className="font-semibold text-charcoal text-sm font-inter">
                  {item.title}
                </p>
                <p className="text-gray-500 text-xs mt-0.5 font-inter">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
