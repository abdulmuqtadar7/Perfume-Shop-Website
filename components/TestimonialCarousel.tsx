"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const total = TESTIMONIALS.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const testimonial = TESTIMONIALS[current];

  return (
    <section className="py-16 sm:py-20 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gold text-xs tracking-[0.3em] uppercase font-inter mb-2">
            Customer Stories
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-2">
            What Our Customers Say
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
        </div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4 }}
              className="bg-white/5 border border-white/10 rounded-sm p-8 sm:p-10 text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < testimonial.rating
                        ? "text-gold fill-gold"
                        : "text-gray-600 fill-gray-600"
                    }
                  />
                ))}
              </div>

              {/* Headline */}
              <h3 className="font-playfair text-white text-xl sm:text-2xl font-semibold italic mb-4">
                &ldquo;{testimonial.headline}&rdquo;
              </h3>

              {/* Body */}
              <p className="text-gray-300 text-sm sm:text-base font-inter leading-relaxed mb-8 max-w-xl mx-auto">
                {testimonial.body}
              </p>

              {/* Customer info */}
              <div className="flex items-center justify-center gap-4">
                <Image
                  src={testimonial.productThumbnail}
                  alt={`${testimonial.name}'s product`}
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-gold"
                  unoptimized
                />
                <div className="text-left">
                  <p className="text-white font-semibold text-sm font-inter">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-400 text-xs font-inter">
                    {testimonial.location} · {testimonial.date}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 w-10 h-10 bg-white/10 hover:bg-gold/80 text-white rounded-full flex items-center justify-center transition-colors duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 w-10 h-10 bg-white/10 hover:bg-gold/80 text-white rounded-full flex items-center justify-center transition-colors duration-200"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-6 h-2 bg-gold"
                  : "w-2 h-2 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
