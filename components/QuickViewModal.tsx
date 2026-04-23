"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Heart, ShoppingBag, Star } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView, addToCart, addToWishlist, wishlistItems } =
    useStore();
  const isWishlisted = quickViewProduct
    ? wishlistItems.some((p) => p.id === quickViewProduct.id)
    : false;

  return (
    <AnimatePresence>
      {quickViewProduct && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50"
            onClick={closeQuickView}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="fixed z-50 inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2
              sm:w-[680px] sm:max-h-[90vh] bg-white shadow-2xl overflow-y-auto rounded-sm"
          >
            {/* Close button */}
            <button
              onClick={closeQuickView}
              className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 hover:bg-charcoal hover:text-white rounded-full flex items-center justify-center transition-all duration-200 text-charcoal shadow"
              aria-label="Close quick view"
            >
              <X size={16} />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-square bg-cream">
                <Image
                  src={quickViewProduct.image}
                  alt={quickViewProduct.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {quickViewProduct.discount > 0 && (
                  <div className="absolute top-3 left-3 bg-gold text-charcoal text-xs font-bold px-2 py-1">
                    -{quickViewProduct.discount}%
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-6 sm:p-8 flex flex-col">
                {quickViewProduct.badge && (
                  <span className="inline-block bg-cream text-gold text-xs font-semibold px-2 py-1 mb-3 self-start font-inter tracking-wider uppercase">
                    {quickViewProduct.badge}
                  </span>
                )}

                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-charcoal mb-2 leading-tight">
                  {quickViewProduct.title}
                </h2>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < Math.floor(quickViewProduct.rating)
                          ? "text-gold fill-gold"
                          : "text-gray-300 fill-gray-300"
                      }
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1 font-inter">
                    ({quickViewProduct.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl font-bold text-charcoal font-inter">
                    Rs. {quickViewProduct.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-400 line-through font-inter">
                    Rs. {quickViewProduct.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-green-600 font-semibold font-inter">
                    Save {quickViewProduct.discount}%
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm font-inter leading-relaxed mb-5">
                  {quickViewProduct.description}
                </p>

                {/* Notes */}
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-widest font-semibold font-inter text-charcoal mb-2">
                    Fragrance Notes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.notes.map((note) => (
                      <span
                        key={note}
                        className="text-xs bg-cream text-charcoal px-3 py-1 border border-gold/30 font-inter"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 mt-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      addToCart(quickViewProduct);
                      closeQuickView();
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-gold text-charcoal py-3.5 text-xs font-bold tracking-widest uppercase font-inter hover:bg-gold-dark transition-colors duration-200"
                  >
                    <ShoppingBag size={15} />
                    Add to Cart
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => addToWishlist(quickViewProduct)}
                    className={`w-full flex items-center justify-center gap-2 border-2 py-3.5 text-xs font-bold tracking-widest uppercase font-inter transition-all duration-200
                      ${isWishlisted
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-charcoal text-charcoal hover:border-gold hover:text-gold"
                      }`}
                  >
                    <Heart
                      size={15}
                      fill={isWishlisted ? "currentColor" : "none"}
                    />
                    {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
