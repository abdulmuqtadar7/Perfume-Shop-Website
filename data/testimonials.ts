export interface Testimonial {
  id: number;
  name: string;
  date: string;
  rating: number;
  headline: string;
  body: string;
  productThumbnail: string;
  location: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Ahmed Raza",
    date: "November 2024",
    rating: 5,
    headline: "Absolutely mesmerizing fragrance!",
    body: "I ordered the Mughal Emperor Oud and I am beyond impressed. The longevity is incredible — still going strong after 12 hours. Received so many compliments at a wedding. Will definitely reorder.",
    productThumbnail:
      "https://placehold.co/80x80/2d1b0e/D4AF37?text=Mughal",
    location: "Lahore, Pakistan",
  },
  {
    id: 2,
    name: "Fatima Malik",
    date: "October 2024",
    rating: 5,
    headline: "Perfect gift for Hajj",
    body: "The Hajj Mubarak Attar was a wonderful gift for my parents before their pilgrimage. The scent is pure, clean, and spiritually uplifting. Packaging was beautiful and delivery was fast.",
    productThumbnail:
      "https://placehold.co/80x80/3d2b1e/D4AF37?text=Hajj",
    location: "Karachi, Pakistan",
  },
  {
    id: 3,
    name: "Omar Farooq",
    date: "September 2024",
    rating: 5,
    headline: "The Midnight Black Oud is a masterpiece",
    body: "Worth every rupee! The Midnight Black Oud has incredible projection and depth. I've tried many expensive brands but nothing compares to this. The bottle is also exquisite.",
    productThumbnail:
      "https://placehold.co/80x80/0d0d0d/D4AF37?text=Midnight",
    location: "Islamabad, Pakistan",
  },
  {
    id: 4,
    name: "Sana Khalid",
    date: "December 2024",
    rating: 5,
    headline: "Rose Oud is my signature scent now",
    body: "I've been using Rose Oud Elixir for 3 months and it has become my absolute signature scent. The rose and oud combination is perfectly balanced — feminine yet powerful. Fast shipping too!",
    productThumbnail:
      "https://placehold.co/80x80/6b2d3e/D4AF37?text=Rose+Oud",
    location: "Faisalabad, Pakistan",
  },
  {
    id: 5,
    name: "Bilal Hassan",
    date: "November 2024",
    rating: 4,
    headline: "Royal Bakhoor is perfect for home",
    body: "The Royal Bakhoor Chips transformed my living room. The scent is rich, authentic, and long-lasting. My guests always ask what I'm burning. Packaging could be slightly better but the product is excellent.",
    productThumbnail:
      "https://placehold.co/80x80/3d2b0e/D4AF37?text=Bakhoor",
    location: "Multan, Pakistan",
  },
  {
    id: 6,
    name: "Zara Ahmed",
    date: "October 2024",
    rating: 5,
    headline: "Exceptional quality and service",
    body: "Ordered the French Oud Collection as an anniversary gift for my husband. He absolutely loves it! The fragrance is sophisticated and unique. Customer service was also very helpful with my queries. Highly recommend!",
    productThumbnail:
      "https://placehold.co/80x80/2d1f4a/D4AF37?text=French+Oud",
    location: "Rawalpindi, Pakistan",
  },
];
