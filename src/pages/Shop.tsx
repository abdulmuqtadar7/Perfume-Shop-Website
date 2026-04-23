import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { products, categories } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { SectionHeader } from "../components/Section";

const GENDERS = ["Feminine", "Masculine", "Unisex"] as const;
const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "priceAsc", label: "Price: low to high" },
  { id: "priceDesc", label: "Price: high to low" },
  { id: "rating", label: "Highest rated" },
  { id: "newest", label: "Newest" },
] as const;

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState<string>(searchParams.get("category") || "All");
  const [gender, setGender] = useState<string>(searchParams.get("gender") || "All");
  const [sort, setSort] = useState<(typeof SORTS)[number]["id"]>("featured");
  const [price, setPrice] = useState<number>(220);
  const [query, setQuery] = useState("");
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (category !== "All") params.category = category;
    if (gender !== "All") params.gender = gender;
    setSearchParams(params, { replace: true });
  }, [category, gender, setSearchParams]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (gender !== "All" && p.gender !== gender) return false;
      if (p.price > price) return false;
      if (query && !`${p.name} ${p.tagline} ${p.category}`
        .toLowerCase()
        .includes(query.toLowerCase())) return false;
      return true;
    });
    switch (sort) {
      case "priceAsc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "priceDesc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
      case "newest": list = [...list].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew)); break;
    }
    return list;
  }, [category, gender, sort, price, query]);

  const reset = () => {
    setCategory("All");
    setGender("All");
    setPrice(220);
    setQuery("");
  };

  return (
    <div className="container-page pt-10 pb-24">
      <SectionHeader
        eyebrow="The collection"
        title={<>Every <em className="not-italic shimmer-text">reverie</em> you've been missing.</>}
        description={`${products.length} extraits composed in small batches. Filter by family, mood, or price to find yours.`}
      />

      <div className="mt-10 grid lg:grid-cols-[260px_1fr] gap-10">
        {/* Desktop filters */}
        <aside className="hidden lg:block sticky top-24 self-start">
          <Filters
            category={category}
            setCategory={setCategory}
            gender={gender}
            setGender={setGender}
            price={price}
            setPrice={setPrice}
            query={query}
            setQuery={setQuery}
            reset={reset}
          />
        </aside>

        <div>
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <button
              onClick={() => setMobileFilters(true)}
              className="lg:hidden btn-outline !py-2 !px-4 text-sm"
            >
              <SlidersHorizontal size={14} /> Filters
            </button>
            <p className="text-sm text-ink-900/60 hidden lg:block">
              Showing <span className="font-medium text-ink-900">{filtered.length}</span> of {products.length}
            </p>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-ink-900/60">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="bg-white/70 border border-ink-900/10 rounded-full px-3 py-1.5 text-sm focus:outline-none focus:border-gold-500"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </label>
          </div>

          {filtered.length === 0 ? (
            <div className="card p-10 text-center">
              <p className="font-display text-2xl">Nothing here — yet.</p>
              <p className="text-ink-900/60 mt-2">Try another family or loosen the filters.</p>
              <button onClick={reset} className="btn-outline mt-5">Reset filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilters(false)}
              className="absolute inset-0 bg-ink-900/50"
              aria-label="Close filters"
            />
            <motion.aside
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
              className="absolute bottom-0 left-0 right-0 bg-cream-50 rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl">Filter</h3>
                <button
                  onClick={() => setMobileFilters(false)}
                  className="w-9 h-9 rounded-full hover:bg-ink-900/5 grid place-items-center"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
              <Filters
                category={category}
                setCategory={setCategory}
                gender={gender}
                setGender={setGender}
                price={price}
                setPrice={setPrice}
                query={query}
                setQuery={setQuery}
                reset={reset}
              />
              <button
                onClick={() => setMobileFilters(false)}
                className="btn-primary w-full mt-6"
              >
                Show {filtered.length} results
              </button>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

type FiltersProps = {
  category: string;
  setCategory: (v: string) => void;
  gender: string;
  setGender: (v: string) => void;
  price: number;
  setPrice: (v: number) => void;
  query: string;
  setQuery: (v: string) => void;
  reset: () => void;
};

function Filters({
  category,
  setCategory,
  gender,
  setGender,
  price,
  setPrice,
  query,
  setQuery,
  reset,
}: FiltersProps) {
  return (
    <div className="space-y-7">
      <div>
        <label className="text-[10px] uppercase tracking-[0.2em] text-ink-900/50">
          Search
        </label>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rose, oud, citrus..."
          className="mt-2 w-full bg-white/70 border border-ink-900/10 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-gold-500"
        />
      </div>

      <FilterGroup label="Family">
        <div className="flex flex-wrap gap-2">
          <Chip active={category === "All"} onClick={() => setCategory("All")}>
            All
          </Chip>
          {categories.map((c) => (
            <Chip
              key={c.id}
              active={category === c.id}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </Chip>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Mood">
        <div className="flex flex-wrap gap-2">
          <Chip active={gender === "All"} onClick={() => setGender("All")}>
            All
          </Chip>
          {GENDERS.map((g) => (
            <Chip key={g} active={gender === g} onClick={() => setGender(g)}>
              {g}
            </Chip>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label={`Max price · $${price}`}>
        <input
          type="range"
          min={100}
          max={220}
          step={5}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full accent-ink-900"
        />
        <div className="flex justify-between text-xs text-ink-900/50 mt-1">
          <span>$100</span>
          <span>$220</span>
        </div>
      </FilterGroup>

      <button
        onClick={reset}
        className="text-sm text-ink-900/60 hover:text-ink-900 underline underline-offset-4"
      >
        Reset all
      </button>
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-ink-900/50 mb-2.5">
        {label}
      </p>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-sm transition-all ${
        active
          ? "bg-ink-900 text-cream-50 shadow-soft"
          : "bg-white/70 border border-ink-900/10 hover:border-ink-900/30"
      }`}
    >
      {children}
    </button>
  );
}
