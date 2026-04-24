import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag, Star } from "lucide-react";
import type { Product } from "../data/products";
import { useCart } from "../store/cart";

type Props = { product: Product; index?: number };

export function ProductCard({ product, index = 0 }: Props) {
  const addItem = useCart((s) => s.addItem);
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link to={`/shop/${product.id}`} className="block">
        <div
          className={`relative overflow-hidden rounded-3xl aspect-[4/5] bg-gradient-to-br ${product.accent}`}
        >
          <div
            className="absolute inset-0 bg-center bg-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            style={{ backgroundImage: `url("${product.image}")` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/55 via-ink-900/10 to-transparent" />

          <div className="absolute top-4 left-4 flex gap-2">
            {product.isNew && (
              <span className="pill !bg-cream-50 !text-ink-900">New</span>
            )}
            {product.bestSeller && (
              <span className="pill !bg-gold-500 !text-ink-900 !border-transparent">
                Best seller
              </span>
            )}
            {hasDiscount && (
              <span className="pill !bg-rose-nude !text-ink-900 !border-transparent">
                Save ${(product.originalPrice! - product.price).toFixed(0)}
              </span>
            )}
          </div>

          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-cream-50">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-cream-50/70">
                {product.category} · {product.gender}
              </p>
              <h3 className="font-display text-xl md:text-2xl leading-tight mt-1">
                {product.name}
              </h3>
            </div>
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                addItem(product);
              }}
              whileTap={{ scale: 0.92 }}
              whileHover={{ y: -2 }}
              aria-label={`Add ${product.name} to cart`}
              className="shrink-0 w-11 h-11 rounded-full bg-cream-50 text-ink-900 grid place-items-center shadow-soft opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            >
              <ShoppingBag size={17} />
            </motion.button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 px-1">
          <div>
            <p className="text-sm text-ink-900/60">{product.tagline}</p>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-ink-900/60">
              <Star size={12} className="fill-gold-500 text-gold-500" />
              <span className="font-medium text-ink-900">{product.rating}</span>
              <span>· {product.reviews} reviews</span>
            </div>
          </div>
          <div className="text-right">
            {hasDiscount && (
              <span className="text-xs text-ink-900/40 line-through mr-1">
                ${product.originalPrice}
              </span>
            )}
            <span className="font-display text-lg">${product.price}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
