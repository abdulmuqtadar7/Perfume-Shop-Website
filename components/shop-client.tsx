"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/context/store-context";
import { tabs } from "@/data/products";

export function ShopClient({ initialQuery = "" }: { initialQuery?: string }) {
  const { products } = useStore();
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [sort, setSort] = useState<"featured" | "low" | "high">("featured");

  const filtered = useMemo(() => {
    const lower = query.toLowerCase();
    let result = products.filter((item) => {
      const matchText = [item.name, item.category, item.description, ...item.notes].join(" ").toLowerCase().includes(lower);
      const matchTab = activeTab === "All" || item.category === activeTab;
      return matchText && matchTab;
    });

    if (sort === "low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "high") result = [...result].sort((a, b) => b.price - a.price);

    return result;
  }, [products, query, activeTab, sort]);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between mb-6">
        <h1 className="text-3xl font-semibold">Shop Fragrances</h1>
        <div className="flex flex-wrap gap-2">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" className="h-10 px-3 rounded-md border border-neutral-300 min-w-[220px]" />
          <select value={sort} onChange={(e) => setSort(e.target.value as "featured" | "low" | "high")} className="h-10 px-3 rounded-md border border-neutral-300">
            <option value="featured">Sort: Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {["All", ...tabs].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm border ${activeTab === tab ? "bg-neutral-900 text-white" : "bg-white text-neutral-700"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filtered.length === 0 && <p className="mt-8 text-neutral-500">No products found for your current filters.</p>}
    </section>
  );
}
