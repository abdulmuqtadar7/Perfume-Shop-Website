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
  accentFrom: string;
  accentTo: string;
  notes: Note[];
};

type Shape = "classic" | "flacon" | "column" | "apothecary";

const bottle = (from: string, to: string, monogram: string, shape: Shape) => {
  const bodies: Record<Shape, string> = {
    classic: `
      <rect x="-80" y="-110" width="160" height="240" rx="16" fill="url(#glass)" stroke="rgba(255,255,255,0.22)" stroke-width="1"/>
      <rect x="-68" y="-98" width="6" height="200" rx="3" fill="#fff" opacity="0.25"/>`,
    flacon: `
      <path d="M -92 -110 Q -100 20 -60 140 L 60 140 Q 100 20 92 -110 Z" fill="url(#glass)" stroke="rgba(255,255,255,0.22)" stroke-width="1"/>
      <path d="M -78 -96 Q -84 10 -54 118" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity="0.22" fill="none"/>`,
    column: `
      <rect x="-62" y="-120" width="124" height="260" rx="6" fill="url(#glass)" stroke="rgba(255,255,255,0.22)" stroke-width="1"/>
      <rect x="-52" y="-108" width="4" height="230" rx="2" fill="#fff" opacity="0.28"/>
      <rect x="46" y="-108" width="4" height="230" rx="2" fill="#fff" opacity="0.14"/>`,
    apothecary: `
      <path d="M -86 -96 Q -86 120 -40 140 L 40 140 Q 86 120 86 -96 L 70 -96 L 70 -110 L -70 -110 L -70 -96 Z" fill="url(#glass)" stroke="rgba(255,255,255,0.22)" stroke-width="1"/>
      <rect x="-72" y="-82" width="5" height="200" rx="2" fill="#fff" opacity="0.24"/>`,
  };

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" preserveAspectRatio="xMidYMid slice">
<defs>
<radialGradient id="bg" cx="50%" cy="38%" r="72%">
  <stop offset="0%" stop-color="${from}" stop-opacity="1"/>
  <stop offset="100%" stop-color="${to}" stop-opacity="1"/>
</radialGradient>
<linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0%" stop-color="${from}" stop-opacity="0.92"/>
  <stop offset="45%" stop-color="#ffffff" stop-opacity="0.14"/>
  <stop offset="100%" stop-color="${to}" stop-opacity="0.92"/>
</linearGradient>
<linearGradient id="label" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0%" stop-color="#fbf7ef"/>
  <stop offset="100%" stop-color="#efe4cf"/>
</linearGradient>
<radialGradient id="glow" cx="50%" cy="20%" r="55%">
  <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35"/>
  <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
</radialGradient>
</defs>
<rect width="600" height="750" fill="url(#bg)"/>
<rect width="600" height="750" fill="url(#glow)"/>
<g transform="translate(300,400)">
<ellipse cx="0" cy="168" rx="150" ry="14" fill="#000" opacity="0.22"/>
<rect x="-34" y="-180" width="68" height="42" rx="3" fill="#1a120b"/>
<rect x="-34" y="-144" width="68" height="6" fill="#caa363"/>
<rect x="-14" y="-138" width="28" height="28" fill="#1a120b" opacity="0.9"/>
${bodies[shape]}
<rect x="-56" y="-40" width="112" height="96" rx="3" fill="url(#label)"/>
<text x="0" y="-14" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="13" fill="#1a120b" letter-spacing="2">MAISON</text>
<text x="0" y="2" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="13" fill="#caa363" letter-spacing="2">AURA</text>
<line x1="-32" y1="10" x2="32" y2="10" stroke="#1a120b" stroke-opacity="0.35"/>
<text x="0" y="28" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="12" fill="#1a120b">${monogram}</text>
<text x="0" y="46" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="7" fill="#1a120b" opacity="0.55" letter-spacing="1.5">GRASSE · FRANCE</text>
</g>
</svg>`;

  const encoded = encodeURIComponent(svg.replace(/\s+/g, " ").trim())
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29");
  return `data:image/svg+xml;utf8,${encoded}`;
};

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
    image: bottle("#5a2a30", "#0E0B08", "Oud · Rose", "flacon"),
    accent: "from-[#3a1d1d] to-[#0E0B08]",
    accentFrom: "#5a2a30",
    accentTo: "#0E0B08",
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
    image: bottle("#E8CE8F", "#b5762b", "Bergamot · Amber", "classic"),
    accent: "from-[#C79A4B] to-[#E8CE8F]",
    accentFrom: "#E8CE8F",
    accentTo: "#b5762b",
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
    image: bottle("#f6d9d3", "#b07b78", "Peony · Tea", "apothecary"),
    accent: "from-[#f3c7c1] to-[#C89A8C]",
    accentFrom: "#f6d9d3",
    accentTo: "#b07b78",
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
    image: bottle("#4f3420", "#1A140F", "Cedar · Leather", "column"),
    accent: "from-[#3b2a1d] to-[#1A140F]",
    accentFrom: "#4f3420",
    accentTo: "#1A140F",
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
    image: bottle("#f5ead9", "#c6a877", "Almond · Tonka", "flacon"),
    accent: "from-[#f5ead9] to-[#e3cfa9]",
    accentFrom: "#f5ead9",
    accentTo: "#c6a877",
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
    image: bottle("#3b5a7a", "#0E0B08", "Cypress · Salt", "column"),
    accent: "from-[#2a3a4a] to-[#0E0B08]",
    accentFrom: "#3b5a7a",
    accentTo: "#0E0B08",
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
    image: bottle("#7a2b39", "#2A1F17", "Rose · Black Tea", "apothecary"),
    accent: "from-[#5a1f2b] to-[#2A1F17]",
    accentFrom: "#7a2b39",
    accentTo: "#2A1F17",
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
    image: bottle("#b87a35", "#2A1F17", "Amber · Incense", "classic"),
    accent: "from-[#8a5a2b] to-[#2A1F17]",
    accentFrom: "#b87a35",
    accentTo: "#2A1F17",
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
    image: bottle("#b8cc92", "#3a4a22", "Fig · Coconut", "apothecary"),
    accent: "from-[#a8c28a] to-[#3a4a22]",
    accentFrom: "#b8cc92",
    accentTo: "#3a4a22",
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
