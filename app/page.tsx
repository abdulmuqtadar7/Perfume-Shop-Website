"use client";

import { Hero } from "@/components/hero";
import { ProductTabsSection } from "@/components/product-tabs-section";
import { useStore } from "@/context/store-context";

export default function HomePage() {
  const { products } = useStore();

  return (
    <div className="bg-white">
      <Hero />

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-12 md:px-6 md:pb-24">
        <ProductTabsSection title="Trending Now" products={products.filter((item) => item.section === "Trending Now")} />
      </section>
    </div>
  );
}
