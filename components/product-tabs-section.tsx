"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { Product, ProductCategory, tabs } from "@/data/products";

export function ProductTabsSection({ title, products }: { title: string; products: Product[] }) {
  const [activeTab, setActiveTab] = useState<ProductCategory>("Premium");

  const filtered = useMemo(() => products.filter((item) => item.category === activeTab), [products, activeTab]);

  return (
    <section className="mt-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <h2 className="text-3xl font-semibold text-neutral-900">{title}</h2>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                activeTab === tab ? "bg-neutral-900 text-white border-neutral-900" : "bg-white text-neutral-700 border-neutral-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {(filtered.length ? filtered : products.slice(0, 4)).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
