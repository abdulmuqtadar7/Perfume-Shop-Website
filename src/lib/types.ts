export type Category = "premium" | "affordable" | "bakhoor" | "perfume" | "attar";
export type Gender = "men" | "women" | "unisex";
export type Section = "trending" | "bestsellers" | "new";

export type Product = {
  id: string;
  name: string;
  category: Category;
  gender: Gender;
  sections: Section[];
  price: number;
  originalPrice: number;
  discountPct: number;
  art: string;      // front gradient
  artHover: string; // secondary gradient (hover)
  rating: number;   // 0-5
  reviews: number;
  description: string;
  notes: { top: string; heart: string; base: string };
  variants?: string[]; // if present, card says "Choose Options"
};

export type CartLine = {
  lineId: string;
  productId: string;
  qty: number;
  variant?: string;
};
