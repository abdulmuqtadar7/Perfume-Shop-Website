"use client";

import { Heart } from "lucide-react";
import { useStore } from "@/context/store-context";

export function ProductActions({ productId }: { productId: string }) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  return (
    <div className="flex gap-3 mt-6">
      <button className="h-12 px-8 rounded-md bg-[#B48A54] text-white" onClick={() => addToCart(productId)}>
        Add to Cart
      </button>
      <button
        className={`h-12 px-5 rounded-md border flex items-center gap-2 ${isInWishlist(productId) ? "text-red-500 border-red-200" : "border-neutral-300"}`}
        onClick={() => toggleWishlist(productId)}
      >
        <Heart size={16} className={isInWishlist(productId) ? "fill-current" : ""} />
        Wishlist
      </button>
    </div>
  );
}
