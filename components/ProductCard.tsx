"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Eye, Star } from "lucide-react";
import { Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart, addToWishlist, wishlistItems } = useStore();
  const [hovered, setHovered] = useState(false);
  const isWishlisted = wishlistItems.some((p) => p.id === product.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group bg-white border border-gray-100 hover:border-gold/30 hover:shadow-lg transition-all duration-300 flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div className="relative overflow-hidden bg-cream aspect-square">
        {/* Discount badge */}
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 z-10 bg-gold text-charcoal text-xs font-bold px-2 py-1">
            -{product.discount}%
          </div>
        )}
        {product.badge && (
          <div className="absolute top-2 right-2 z-10 bg-charcoal text-white text-xs font-medium px-2 py-1">
            {product.badge}
          </div>
        )}

        {/* Images with hover crossfade */}
        <div className="relative w-full h-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className={`object-cover transition-opacity duration-500 ${
              hovered ? "opacity-0" : "opacity-100"
            }`}
            unoptimized
          />
          <Image
            src={product.image2}
            alt={`${product.title} alternate`}
            fill
            className={`object-cover transition-opacity duration-500 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
            unoptimized
          />
        </div>

        {/* Hover overlay with actions */}
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/30 flex items-center justify-center gap-3 pointer-events-none"
        >
          <motion.button
            initial={false}
            animate={{ scale: hovered ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              e.stopPropagation();
              addToWishlist(product);
            }}
            className={`pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors duration-200
              ${isWishlisted ? "bg-gold text-charcoal" : "bg-white text-charcoal hover:bg-gold"}`}
            aria-label="Add to wishlist"
          >
            <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
          </motion.button>
          <motion.button
            initial={false}
            animate={{ scale: hovered ? 1 : 0.8 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="pointer-events-auto w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gold transition-colors duration-200 text-charcoal"
            aria-label="Quick view"
          >
            <Eye size={16} />
          </motion.button>
        </motion.div>
      </div>

      {/* Product info */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-playfair text-sm font-semibold text-charcoal leading-snug mb-1 line-clamp-2">
          {product.title}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={
                i < Math.floor(product.rating)
                  ? "text-gold fill-gold"
                  : "text-gray-300 fill-gray-300"
              }
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-charcoal font-inter">
            Rs. {product.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-400 line-through font-inter">
            Rs. {product.originalPrice.toLocaleString()}
          </span>
        </div>

        {/* Add to cart */}
        <button
          onClick={() => addToCart(product)}
          className="mt-auto w-full py-2.5 text-xs font-semibold tracking-widest uppercase font-inter border border-charcoal text-charcoal
            hover:bg-gold hover:border-gold hover:text-charcoal transition-all duration-300"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
