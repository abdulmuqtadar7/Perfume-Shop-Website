"use client";

import { Hero } from "@/components/hero";
import { ProductTabsSection } from "@/components/product-tabs-section";
import { categoryHighlights, testimonials } from "@/data/products";
import { useStore } from "@/context/store-context";
import { Headset, RefreshCcw, Star, Truck } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { products } = useStore();
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % testimonials.length);
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white">
      <Hero />

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-12 md:px-6 md:pb-24">
        <div className="grid grid-cols-1 gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:grid-cols-3 md:p-6">
          <article className="flex items-start gap-3 rounded-xl border border-neutral-100 bg-neutral-50 p-4">
            <RefreshCcw className="mt-1 h-5 w-5 text-[#B48A54]" />
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-neutral-900">Easy Exchange</h3>
              <p className="text-xs text-neutral-600 md:text-sm">15-day exchange on eligible fragrances.</p>
            </div>
          </article>
          <article className="flex items-start gap-3 rounded-xl border border-neutral-100 bg-neutral-50 p-4">
            <Truck className="mt-1 h-5 w-5 text-[#B48A54]" />
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-neutral-900">Fast Delivery</h3>
              <p className="text-xs text-neutral-600 md:text-sm">Nationwide delivery in 4–5 working days.</p>
            </div>
          </article>
          <article className="flex items-start gap-3 rounded-xl border border-neutral-100 bg-neutral-50 p-4">
            <Headset className="mt-1 h-5 w-5 text-[#B48A54]" />
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-neutral-900">Concierge Support</h3>
              <p className="text-xs text-neutral-600 md:text-sm">Premium support available seven days a week.</p>
            </div>
          </article>
        </div>

        <ProductTabsSection title="Trending Now" products={products.filter((item) => item.section === "Trending Now")} />

        <section className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B48A54]">Collections</p>
              <h2 className="mt-2 text-3xl font-semibold text-neutral-900 md:text-4xl">Category Highlights</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {categoryHighlights.slice(0, 4).map((item) => (
              <article key={item.title} className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100">
                <img src={item.image} alt={item.title} className="h-64 w-full object-cover transition duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <p className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-black/40 px-3 py-1 text-sm font-semibold text-white">
                  {item.title}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-6 rounded-3xl border border-neutral-200 bg-gradient-to-r from-neutral-900 to-neutral-800 p-6 text-white md:grid-cols-[1.2fr_1fr] md:p-10">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E8C998]">Customer Love</p>
            <h2 className="text-3xl font-semibold md:text-4xl">What clients say about our fragrances</h2>
            <p className="text-sm text-white/80 md:text-base">Each order is curated to deliver premium quality, long-lasting scent trails, and luxury unboxing moments.</p>
          </div>
          <article className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
            <div className="mb-3 flex items-center gap-1 text-[#E8C998]">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Star key={`${testimonials[reviewIndex].id}-${starIndex}`} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <h3 className="text-lg font-semibold">{testimonials[reviewIndex].title}</h3>
            <p className="mt-3 text-sm text-white/80">{testimonials[reviewIndex].body}</p>
            <div className="mt-5 flex items-center gap-3">
              <img src={testimonials[reviewIndex].image} alt={testimonials[reviewIndex].name} className="h-11 w-11 rounded-full object-cover ring-2 ring-white/40" />
              <p className="text-sm text-white/90">
                {testimonials[reviewIndex].name} <span className="text-white/60">• {testimonials[reviewIndex].date}</span>
              </p>
            </div>
          </article>
        </section>
      </section>
    </div>
  );
}
