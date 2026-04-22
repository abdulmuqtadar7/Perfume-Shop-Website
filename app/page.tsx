"use client";

import { Hero } from "@/components/hero";
import { ProductTabsSection } from "@/components/product-tabs-section";
import { categoryHighlights, sections, testimonials } from "@/data/products";
import { useStore } from "@/context/store-context";
import { Headset, RefreshCcw, Truck } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { products } = useStore();
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Hero />

      <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-10 relative z-10">
        <div className="grid md:grid-cols-3 gap-4 bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
          <article className="flex gap-3">
            <RefreshCcw className="text-[#B48A54]" />
            <div>
              <h3 className="font-semibold">Long-Lasting & Easy Exchange</h3>
              <p className="text-sm text-neutral-600">15-day easy exchange policy.</p>
            </div>
          </article>
          <article className="flex gap-3">
            <Truck className="text-[#B48A54]" />
            <div>
              <h3 className="font-semibold">Fast Delivery</h3>
              <p className="text-sm text-neutral-600">Delivery in 4–5 working days.</p>
            </div>
          </article>
          <article className="flex gap-3">
            <Headset className="text-[#B48A54]" />
            <div>
              <h3 className="font-semibold">24/7 Customer Support</h3>
              <p className="text-sm text-neutral-600">Concierge-grade support all week.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6">
        {sections.map((section) => (
          <ProductTabsSection key={section} title={section} products={products.filter((item) => item.section === section)} />
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-16">
        <h2 className="text-3xl font-semibold mb-6">Category Highlights</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[170px]">
          {categoryHighlights.map((item, idx) => (
            <article
              key={item.title}
              className={`relative rounded-2xl overflow-hidden group ${idx % 3 === 0 ? "lg:row-span-2" : ""}`}
            >
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              <div className="absolute inset-0 bg-black/35 grid place-items-end p-4">
                <p className="text-white font-semibold bg-black/40 px-3 py-1 rounded-full text-sm">{item.title}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-16">
        <h2 className="text-3xl font-semibold mb-6">Customer Reviews</h2>
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <motion.article key={testimonials[reviewIndex].id} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} className="grid md:grid-cols-[120px_1fr] gap-4 items-start">
            <img src={testimonials[reviewIndex].image} alt={testimonials[reviewIndex].title} className="w-[120px] h-[120px] object-cover rounded-xl" />
            <div>
              <p className="text-amber-500">★★★★★</p>
              <h3 className="text-xl font-semibold mt-1">{testimonials[reviewIndex].title}</h3>
              <p className="text-neutral-600 mt-2">{testimonials[reviewIndex].body}</p>
              <p className="text-sm mt-3 text-neutral-500">
                {testimonials[reviewIndex].name} • {testimonials[reviewIndex].date}
              </p>
            </div>
          </motion.article>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-16">
        <div className="grid lg:grid-cols-2 rounded-2xl overflow-hidden border border-neutral-200">
          <img src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1300&q=80" alt="Physical store" className="w-full h-[320px] lg:h-full object-cover" />
          <div className="p-8 md:p-10 bg-neutral-900 text-white flex flex-col justify-center">
            <h2 className="text-3xl font-semibold">Visit Usman Baig</h2>
            <p className="mt-4 text-white/80">
              Step into the world of luxury scents at our physical store. Explore authentic collections, guided sampling, and personal recommendations.
            </p>
            <Link href="https://maps.google.com" className="mt-6 h-11 px-6 rounded-md bg-[#B48A54] text-white w-fit leading-[44px]">
              Get Direction
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
