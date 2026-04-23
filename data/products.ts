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
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1594035910387-fea47714263f?q=80&w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1594035910387-fea47714263f?q=80&w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1628191139872-5bae3f4c3ea2?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1590736969955-71cc94901144?q=80&w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1628191139872-5bae3f4c3ea2?q=80&w=800&auto=format&fit=crop",
  },
];

export const sections: Array<Product["section"]> = ["Trending Now", "Best Sellers", "New Arrivals"];

export const categoryHighlights = [
  { title: "Perfume Spray", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop" },
  { title: "Womens", image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=800&auto=format&fit=crop" },
  { title: "Oud Attar", image: "https://images.unsplash.com/photo-1628191139872-5bae3f4c3ea2?q=80&w=800&auto=format&fit=crop" },
  { title: "Bakhoor Wood", image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=800&auto=format&fit=crop" },
  { title: "Bakhoor Burner", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop" },
  { title: "French Attars", image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=800&auto=format&fit=crop" },
  { title: "Arabic Attars", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop" },
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
