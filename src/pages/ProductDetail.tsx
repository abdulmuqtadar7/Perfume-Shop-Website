import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Heart, Minus, Plus, Star, Truck, Shield, Leaf } from "lucide-react";
import { getProduct, products } from "../data/products";
import { useCart } from "../store/cart";
import { ProductCard } from "../components/ProductCard";

export function ProductDetail() {
  const { id } = useParams();
  const product = id ? getProduct(id) : undefined;
  const [qty, setQty] = useState(1);
  const [wish, setWish] = useState(false);
  const [size, setSize] = useState(product?.size || "100 ml");
  const addItem = useCart((s) => s.addItem);

  if (!product) return <Navigate to="/shop" replace />;

  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 3);

  return (
    <div className="container-page pt-8 pb-20">
      <Link
        to="/shop"
        className="inline-flex items-center gap-1.5 text-sm text-ink-900/60 hover:text-ink-900 transition"
      >
        <ArrowLeft size={14} /> Back to shop
      </Link>

      <div className="mt-6 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className={`relative overflow-hidden rounded-[32px] bg-gradient-to-br ${product.accent} aspect-[4/5] lg:sticky lg:top-24`}
        >
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url("${product.image}")` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/50 via-transparent to-ink-900/10" />
          <div className="absolute top-5 left-5 flex gap-2">
            {product.isNew && <span className="pill !bg-cream-50 !text-ink-900">New</span>}
            {product.bestSeller && (
              <span className="pill !bg-gold-500 !text-ink-900 !border-transparent">Best seller</span>
            )}
          </div>
          <button
            onClick={() => setWish((v) => !v)}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-cream-50/90 backdrop-blur grid place-items-center"
            aria-label="Save to wishlist"
          >
            <Heart
              size={18}
              className={`transition ${
                wish ? "fill-ink-900 text-ink-900" : "text-ink-900"
              }`}
            />
          </button>
          <div className="absolute inset-x-6 bottom-6 text-cream-50">
            <p className="text-[10px] uppercase tracking-[0.25em] opacity-80">
              {product.category} · {product.gender}
            </p>
            <h1 className="font-display text-4xl md:text-5xl mt-1">{product.name}</h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-gold-600">
            Extrait de Parfum
          </p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl leading-[1.05]">
            {product.name}
          </h2>
          <p className="mt-3 text-ink-900/70 text-lg">{product.tagline}</p>

          <div className="mt-5 flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.round(product.rating)
                      ? "fill-gold-500 text-gold-500"
                      : "text-ink-900/20"
                  }
                />
              ))}
            </div>
            <span className="font-medium">{product.rating}</span>
            <span className="text-ink-900/50">· {product.reviews} reviews</span>
          </div>

          <p className="mt-6 text-ink-900/75 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl">${product.price}</span>
            {product.originalPrice && (
              <span className="text-ink-900/40 line-through">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-sm text-ink-900/50">· {product.size}</span>
          </div>

          <div className="mt-7">
            <p className="text-[10px] uppercase tracking-[0.2em] text-ink-900/50 mb-2">
              Format
            </p>
            <div className="flex flex-wrap gap-2">
              {["30 ml", "75 ml", "100 ml"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 rounded-full text-sm border transition ${
                    size === s
                      ? "bg-ink-900 text-cream-50 border-ink-900"
                      : "bg-white/70 border-ink-900/10 hover:border-ink-900/40"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 flex items-center gap-4">
            <div className="inline-flex items-center border border-ink-900/15 rounded-full">
              <button
                onClick={() => setQty((v) => Math.max(1, v - 1))}
                className="w-10 h-10 grid place-items-center hover:text-gold-600"
                aria-label="Decrease"
              >
                <Minus size={14} />
              </button>
              <span className="w-10 text-center">{qty}</span>
              <button
                onClick={() => setQty((v) => v + 1)}
                className="w-10 h-10 grid place-items-center hover:text-gold-600"
                aria-label="Increase"
              >
                <Plus size={14} />
              </button>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => addItem(product, qty)}
              className="btn-primary flex-1"
            >
              Add to bag · ${(product.price * qty).toFixed(0)}
            </motion.button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { icon: <Truck size={16} />, label: "Free shipping > $120" },
              { icon: <Shield size={16} />, label: "30-day returns" },
              { icon: <Leaf size={16} />, label: "Cruelty-free" },
            ].map((f) => (
              <div
                key={f.label}
                className="text-xs text-ink-900/70 flex items-center gap-2 p-3 rounded-2xl bg-white/60 border border-ink-900/5"
              >
                <span className="text-gold-600">{f.icon}</span>
                {f.label}
              </div>
            ))}
          </div>

          {/* Notes pyramid */}
          <div className="mt-10">
            <h3 className="font-display text-2xl">The composition</h3>
            <div className="mt-4 space-y-3">
              {product.notes.map((n, i) => (
                <motion.div
                  key={n.type}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 border border-ink-900/5"
                >
                  <span className="shrink-0 mt-0.5 text-[10px] uppercase tracking-[0.2em] text-gold-600 w-14">
                    {n.type}
                  </span>
                  <div className="flex-1">
                    <p className="text-ink-900/80">{n.items.join(" · ")}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-24">
          <h3 className="font-display text-3xl md:text-4xl">
            You may also love
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
