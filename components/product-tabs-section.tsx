"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { Product, ProductCategory, tabs } from "@/data/products";

export function ProductTabsSection({ title, products }: { title: string; products: Product[] }) {
  const [activeTab, setActiveTab] = useState<ProductCategory>("Premium");

  const filtered = useMemo(() => products.filter((item) => item.category === activeTab), [products, activeTab]);

  return (
    <section className="mt-16 rounded-3xl border border-neutral-200 bg-gradient-to-b from-neutral-50 to-white p-5 shadow-sm md:p-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B48A54]">Featured Collection</p>
          <h2 className="mt-2 text-3xl font-semibold text-neutral-900 md:text-4xl">{title}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                activeTab === tab
                  ? "border-[#B48A54] bg-[#B48A54] text-white shadow"
                  : "border-neutral-300 bg-white text-neutral-700 hover:border-[#B48A54] hover:text-[#B48A54]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {(filtered.length ? filtered : products.slice(0, 4)).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
