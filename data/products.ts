export type ProductCategory = "Premium" | "Affordable" | "Bakhoor" | "Perfume" | "Attar";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  notes: string[];
  section: "Trending Now" | "Best Sellers" | "New Arrivals";
  category: ProductCategory;
  gender: "Men" | "Women" | "Unisex";
  originalPrice: number;
  price: number;
  rating: number;
  discountPercent: number;
  image: string;
  hoverImage: string;
};

export const tabs: ProductCategory[] = ["Premium", "Affordable", "Bakhoor", "Perfume", "Attar"];

export const products: Product[] = [
  {
    id: "mughal",
    slug: "mughal",
    name: "Mughal",
    description: "A regal oriental signature with saffron, amber, and smoked vanilla.",
    notes: ["Saffron", "Rose", "Amber", "Smoked Vanilla"],
    section: "Trending Now",
    category: "Premium",
    gender: "Men",
    originalPrice: 5000,
    price: 3100,
    rating: 4.9,
    discountPercent: 38,
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "hajj-perfume",
    slug: "hajj-perfume",
    name: "Hajj Perfume",
    description: "Fresh musk and oud harmony crafted for spiritual calm and confidence.",
    notes: ["White Musk", "Cedar", "Oud", "Ambergris"],
    section: "Trending Now",
    category: "Attar",
    gender: "Unisex",
    originalPrice: 3600,
    price: 2399,
    rating: 4.8,
    discountPercent: 33,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "oud-royale",
    slug: "oud-royale",
    name: "Oud Royale",
    description: "Dense, luxurious oud with leather and dark spices for evening wear.",
    notes: ["Cambodian Oud", "Leather", "Cardamom", "Patchouli"],
    section: "Best Sellers",
    category: "Perfume",
    gender: "Men",
    originalPrice: 5800,
    price: 4200,
    rating: 4.7,
    discountPercent: 28,
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "velvet-bloom",
    slug: "velvet-bloom",
    name: "Velvet Bloom",
    description: "Elegant floral-fruity profile with creamy woods and long lasting sillage.",
    notes: ["Pear", "Jasmine", "Iris", "Sandalwood"],
    section: "Best Sellers",
    category: "Premium",
    gender: "Women",
    originalPrice: 4900,
    price: 3490,
    rating: 4.8,
    discountPercent: 29,
    image: "https://images.unsplash.com/photo-1615641300850-8dbfbb0fa9d4?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1595425964079-6b7b7d3e69dc?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "bakhoor-wood",
    slug: "bakhoor-wood",
    name: "Bakhoor Wood",
    description: "Rich incense wood chips for serene home and gathering fragrance rituals.",
    notes: ["Resin", "Cedar", "Labdanum", "Frankincense"],
    section: "New Arrivals",
    category: "Bakhoor",
    gender: "Unisex",
    originalPrice: 3200,
    price: 2190,
    rating: 4.6,
    discountPercent: 31,
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "daily-fresh",
    slug: "daily-fresh",
    name: "Daily Fresh",
    description: "Budget-friendly fresh citrus scent for office and daily wear.",
    notes: ["Bergamot", "Green Apple", "Vetiver", "Musk"],
    section: "New Arrivals",
    category: "Affordable",
    gender: "Men",
    originalPrice: 2800,
    price: 1699,
    rating: 4.5,
    discountPercent: 39,
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59ca6?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "french-attar",
    slug: "french-attar",
    name: "French Attar",
    description: "Concentrated attar inspired by French floral elegance and soft powdery trails.",
    notes: ["Neroli", "Violet", "Tonka", "Musk"],
    section: "Trending Now",
    category: "Attar",
    gender: "Women",
    originalPrice: 4300,
    price: 2999,
    rating: 4.7,
    discountPercent: 30,
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1631730359585-38a4935cbec4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "burner-pro",
    slug: "burner-pro",
    name: "Bakhoor Burner",
    description: "Minimal ceramic burner for an elegant and safe bakhoor experience.",
    notes: ["Ceramic Build", "Heat Shield", "Matte Gold Accent"],
    section: "Best Sellers",
    category: "Bakhoor",
    gender: "Unisex",
    originalPrice: 4500,
    price: 3350,
    rating: 4.6,
    discountPercent: 26,
    image: "https://images.unsplash.com/photo-1528747045269-390fe33c19d3?auto=format&fit=crop&w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=900&q=80",
  },
];

export const sections: Array<Product["section"]> = ["Trending Now", "Best Sellers", "New Arrivals"];

export const categoryHighlights = [
  { title: "Perfume's Spray", image: "https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?auto=format&fit=crop&w=900&q=80" },
  { title: "Womens", image: "https://images.unsplash.com/photo-1619994403073-2cec9118f32d?auto=format&fit=crop&w=900&q=80" },
  { title: "Oud Attar", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80" },
  { title: "Bakhoor Wood", image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=900&q=80" },
  { title: "Bakhoor Burner", image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=900&q=80" },
  { title: "French Attars", image: "https://images.unsplash.com/photo-1595425964079-6b7b7d3e69dc?auto=format&fit=crop&w=900&q=80" },
  { title: "Arabic Attars", image: "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?auto=format&fit=crop&w=900&q=80" },
];

export const testimonials = [
  {
    id: 1,
    title: "Mughal Perfume truly stands out",
    body: "Projection is powerful, and the scent remains smooth and premium for hours. One of the best purchases I have made this year.",
    name: "Adeel Khan",
    date: "12 Jan 2026",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    title: "Perfect signature for daily wear",
    body: "Daily Fresh exceeded expectations in this price range. Fresh opening, clean dry-down, and quick delivery.",
    name: "Mahnoor Tariq",
    date: "28 Feb 2026",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59ca6?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    title: "Excellent quality bakhoor",
    body: "The wood quality is exceptional and the aroma fills the room beautifully. Packaging and support were both excellent.",
    name: "Hamza Rehman",
    date: "05 Mar 2026",
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=300&q=80",
  },
];
