export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  color: string;
  href: string;
  gridArea?: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Perfume Spray",
    description: "Elegant long-lasting sprays",
    image: "https://placehold.co/600x400/1a1a2e/D4AF37?text=Perfume+Spray",
    color: "#1a1a2e",
    href: "#",
    gridArea: "span-2",
  },
  {
    id: 2,
    name: "Women's Collection",
    description: "Floral & feminine fragrances",
    image: "https://placehold.co/400x500/6b2d3e/D4AF37?text=Womens",
    color: "#6b2d3e",
    href: "#",
  },
  {
    id: 3,
    name: "Oud Attar",
    description: "Pure oil-based oud perfumes",
    image: "https://placehold.co/400x400/2d1b0e/D4AF37?text=Oud+Attar",
    color: "#2d1b0e",
    href: "#",
  },
  {
    id: 4,
    name: "Bakhoor Wood",
    description: "Premium agarwood chips",
    image: "https://placehold.co/400x400/3d2b0e/D4AF37?text=Bakhoor+Wood",
    color: "#3d2b0e",
    href: "#",
  },
  {
    id: 5,
    name: "Bakhoor Burner",
    description: "Artistic incense burners",
    image: "https://placehold.co/400x400/1a2d1a/D4AF37?text=Bakhoor+Burner",
    color: "#1a2d1a",
    href: "#",
  },
  {
    id: 6,
    name: "French Attars",
    description: "French-inspired oil perfumes",
    image: "https://placehold.co/600x400/2d1f4a/D4AF37?text=French+Attars",
    color: "#2d1f4a",
    href: "#",
    gridArea: "span-2",
  },
  {
    id: 7,
    name: "Arabic Attars",
    description: "Traditional Middle-Eastern scents",
    image: "https://placehold.co/400x400/4a2d0e/D4AF37?text=Arabic+Attars",
    color: "#4a2d0e",
    href: "#",
  },
];
