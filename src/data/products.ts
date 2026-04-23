export type Note = { type: "Top" | "Heart" | "Base"; items: string[] };

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  size: string;
  category: "Floral" | "Woody" | "Oriental" | "Citrus" | "Gourmand";
  gender: "Unisex" | "Feminine" | "Masculine";
  rating: number;
  reviews: number;
  featured?: boolean;
  bestSeller?: boolean;
  isNew?: boolean;
  image: string;
  accent: string;
  notes: Note[];
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const products: Product[] = [
  {
    id: "noir-velours",
    name: "Noir Velours",
    tagline: "Deep oud & midnight rose",
    description:
      "An intoxicating composition of Cambodian oud, Turkish rose, and smoked vanilla. A signature scent for bold evenings and quiet revelations.",
    price: 189,
    originalPrice: 220,
    size: "100 ml",
    category: "Oriental",
    gender: "Unisex",
    rating: 4.9,
    reviews: 218,
    featured: true,
    bestSeller: true,
    image: img("photo-1541643600914-78b084683601"),
    accent: "from-[#3a1d1d] to-[#0E0B08]",
    notes: [
      { type: "Top", items: ["Saffron", "Bergamot", "Pink Pepper"] },
      { type: "Heart", items: ["Turkish Rose", "Iris", "Jasmine"] },
      { type: "Base", items: ["Cambodian Oud", "Vanilla", "Amber"] },
    ],
  },
  {
    id: "soleil-dore",
    name: "Soleil Doré",
    tagline: "Golden citrus & sun-warmed amber",
    description:
      "A luminous cascade of Sicilian bergamot and neroli softened by honeyed amber. Effortless elegance in a single breath.",
    price: 165,
    size: "100 ml",
    category: "Citrus",
    gender: "Unisex",
    rating: 4.8,
    reviews: 142,
    featured: true,
    isNew: true,
    image: img("photo-1592945403244-b3fbafd7f539"),
    accent: "from-[#C79A4B] to-[#E8CE8F]",
    notes: [
      { type: "Top", items: ["Bergamot", "Neroli", "Grapefruit"] },
      { type: "Heart", items: ["Orange Blossom", "Ylang-Ylang"] },
      { type: "Base", items: ["Amber", "White Musk", "Cedarwood"] },
    ],
  },
  {
    id: "jardin-secret",
    name: "Jardin Secret",
    tagline: "Dew-kissed peony & white tea",
    description:
      "A whispered promise of a private garden at dawn — soft peony, magnolia, and green tea over a bed of creamy sandalwood.",
    price: 148,
    size: "75 ml",
    category: "Floral",
    gender: "Feminine",
    rating: 4.7,
    reviews: 301,
    featured: true,
    image: img("photo-1563170351-be82bc888aa4"),
    accent: "from-[#f3c7c1] to-[#C89A8C]",
    notes: [
      { type: "Top", items: ["White Tea", "Pear", "Bergamot"] },
      { type: "Heart", items: ["Peony", "Magnolia", "Lily of the Valley"] },
      { type: "Base", items: ["Sandalwood", "Cashmeran", "Soft Musk"] },
    ],
  },
  {
    id: "cedre-fume",
    name: "Cèdre Fumé",
    tagline: "Smoked cedar & leather",
    description:
      "A striking structure of charred cedar, Texas leather, and vetiver. Architectural, sculpted, unmistakable.",
    price: 172,
    size: "100 ml",
    category: "Woody",
    gender: "Masculine",
    rating: 4.8,
    reviews: 176,
    bestSeller: true,
    image: img("photo-1615634260167-c8cdede054de"),
    accent: "from-[#3b2a1d] to-[#1A140F]",
    notes: [
      { type: "Top", items: ["Black Pepper", "Cardamom", "Elemi"] },
      { type: "Heart", items: ["Smoked Cedar", "Leather", "Tobacco"] },
      { type: "Base", items: ["Vetiver", "Patchouli", "Benzoin"] },
    ],
  },
  {
    id: "reverie-blanche",
    name: "Rêverie Blanche",
    tagline: "Milky almond & tonka bean",
    description:
      "A soft, edible daydream. Sweet almond, orris butter, and tonka bean layered over warm vanilla and white musks.",
    price: 158,
    size: "75 ml",
    category: "Gourmand",
    gender: "Feminine",
    rating: 4.9,
    reviews: 412,
    isNew: true,
    image: img("photo-1588405748880-12d1d2a59d75"),
    accent: "from-[#f5ead9] to-[#e3cfa9]",
    notes: [
      { type: "Top", items: ["Almond Blossom", "Pear", "Bergamot"] },
      { type: "Heart", items: ["Orris Butter", "Heliotrope", "Jasmine Sambac"] },
      { type: "Base", items: ["Tonka Bean", "Vanilla", "White Musk"] },
    ],
  },
  {
    id: "mer-indigo",
    name: "Mer Indigo",
    tagline: "Salt spray & blue cypress",
    description:
      "A cool plunge into cypress, seaweed absolute, and driftwood. Minimalist freshness with a mineral edge.",
    price: 154,
    size: "100 ml",
    category: "Woody",
    gender: "Unisex",
    rating: 4.6,
    reviews: 98,
    image: img("photo-1557053910-d9eadeed1c58"),
    accent: "from-[#2a3a4a] to-[#0E0B08]",
    notes: [
      { type: "Top", items: ["Sea Salt", "Yuzu", "Juniper"] },
      { type: "Heart", items: ["Blue Cypress", "Seaweed", "Violet Leaf"] },
      { type: "Base", items: ["Driftwood", "Ambergris", "Moss"] },
    ],
  },
  {
    id: "rose-noire",
    name: "Rose Noire",
    tagline: "Black tea & bulgarian rose",
    description:
      "An intimate affair: Bulgarian rose absolute swirled with smoky black tea and raw honey.",
    price: 178,
    size: "100 ml",
    category: "Floral",
    gender: "Feminine",
    rating: 4.8,
    reviews: 254,
    bestSeller: true,
    image: img("photo-1594035910387-fea47794261f"),
    accent: "from-[#5a1f2b] to-[#2A1F17]",
    notes: [
      { type: "Top", items: ["Black Tea", "Pink Pepper", "Raspberry"] },
      { type: "Heart", items: ["Bulgarian Rose", "Geranium", "Honey"] },
      { type: "Base", items: ["Patchouli", "Oud", "Sandalwood"] },
    ],
  },
  {
    id: "ambre-celeste",
    name: "Ambre Céleste",
    tagline: "Amber resin & frankincense",
    description:
      "Sacred amber warmed by frankincense, myrrh, and a breath of cardamom smoke. Meditative and enveloping.",
    price: 195,
    size: "100 ml",
    category: "Oriental",
    gender: "Unisex",
    rating: 4.9,
    reviews: 189,
    featured: true,
    image: img("photo-1523293182086-7651a899d37f"),
    accent: "from-[#8a5a2b] to-[#2A1F17]",
    notes: [
      { type: "Top", items: ["Cardamom", "Pink Pepper", "Mandarin"] },
      { type: "Heart", items: ["Frankincense", "Myrrh", "Labdanum"] },
      { type: "Base", items: ["Amber Resin", "Benzoin", "Vanilla"] },
    ],
  },
  {
    id: "figue-sauvage",
    name: "Figue Sauvage",
    tagline: "Green fig & milky coconut",
    description:
      "A Mediterranean reverie — crushed fig leaves, creamy coconut water, and sun-baked stone.",
    price: 142,
    originalPrice: 165,
    size: "75 ml",
    category: "Gourmand",
    gender: "Unisex",
    rating: 4.7,
    reviews: 167,
    isNew: true,
    image: img("photo-1610461888750-10bfc601b874"),
    accent: "from-[#a8c28a] to-[#3a4a22]",
    notes: [
      { type: "Top", items: ["Green Fig", "Coconut Water", "Bergamot"] },
      { type: "Heart", items: ["Fig Leaf", "Iris", "Almond Milk"] },
      { type: "Base", items: ["Cedarwood", "Tonka", "White Musk"] },
    ],
  },
];

export const categories = [
  { id: "Floral", label: "Floral", hint: "Soft petals & dew" },
  { id: "Woody", label: "Woody", hint: "Smoke, cedar & stone" },
  { id: "Oriental", label: "Oriental", hint: "Oud, amber & spice" },
  { id: "Citrus", label: "Citrus", hint: "Sun-drenched zest" },
  { id: "Gourmand", label: "Gourmand", hint: "Edible daydreams" },
] as const;

export const getProduct = (id: string) => products.find((p) => p.id === id);
