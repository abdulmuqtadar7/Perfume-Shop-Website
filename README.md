# Usman Baig Fragrance

A premium e-commerce storefront for **Usman Baig Fragrance** — perfumes, attars and bakhoors — built with **Next.js (App Router)**, **Tailwind CSS**, **Framer Motion** and **Zustand**.

## Features

- Sticky header with mega-menu dropdowns (Gender · Season · Type · Range · Sillage · Premium Attars · Bakhoor's) and expanding search.
- Sliding announcement bar (flat 38% off + free-shipping messages).
- Animated hero with floating perfume bottle, dual-CTA and inline KPIs.
- Three tabbed product grids: **Trending Now**, **Best Sellers**, **New Arrivals** — each filterable by Premium / Affordable / Bakhoor / Perfume / Attar.
- Product cards with image-swap-on-hover, discount badge, wishlist + quick-view icon rail and "Add to Cart" / "Choose Options".
- Quick-view modal with size variants, quantity stepper, notes breakdown and live price total.
- Masonry category highlights.
- Auto-rotating testimonial carousel.
- Split-screen "Visit Usman Baig" physical-store callout with _Get Direction_ CTA.
- Newsletter signup + 4-column footer with contact / shop-by / customer-service / payments columns.
- Slide-out cart drawer and wishlist drawer, both persisted in `localStorage` via Zustand middleware.
- Floating chat widget with canned advisor replies.
- Fully responsive — mobile burger menu, 2-col product grid on phone, full-width drawers.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Production build (static export)

```bash
npm run build      # writes /out
```

`next.config.mjs` uses `output: "export"` + `images.unoptimized` so the app deploys as a fully static site to any CDN.

## Project structure

```
src/
├── app/
│   ├── layout.tsx        # fonts (Inter + Cormorant Garamond), metadata
│   ├── page.tsx          # composes every section
│   └── globals.css
├── components/           # 15 presentational + drawer components
└── lib/
    ├── products.ts       # 15-item product catalog
    ├── store.ts          # Zustand stores (cart, wishlist, UI)
    ├── types.ts
    └── format.ts
```
