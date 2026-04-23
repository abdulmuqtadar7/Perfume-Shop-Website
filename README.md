# Maison Aura — Perfume E-commerce Store

A modern, animated, fully responsive perfume e-commerce storefront. Built with React, TypeScript, Vite, TailwindCSS, Framer Motion and Zustand.

## Features

- **Home** — parallax hero, animated bottle illustration, marquee, scent family cards, featured + best-seller grids, atelier story, testimonials, newsletter.
- **Shop** — filterable/sortable catalog with category chips, gender filter, price range, live search, and a mobile filter drawer.
- **Product detail** — large animated hero image, notes pyramid (top / heart / base), size selector, quantity stepper, related scents.
- **Cart drawer + full cart page** — persistent via `localStorage`, quantity updates, animated entry/exit, shipping threshold.
- **Checkout** — multi-section form with animated success state.
- **About / Contact / 404** — rounded out with consistent motion and typography.
- **Header + footer** — sticky navbar with scroll elevation, animated mobile drawer, cart badge, newsletter signup, socials.
- **Animations** — page transitions, scroll-reveal, hero parallax, floating bottle, shimmer gold text, micro-interactions on hover/tap.
- **Responsive** — mobile-first, tested from 375px up through ultra-wide.

## Stack

- [Vite](https://vitejs.dev/) + React 19 + TypeScript
- [TailwindCSS 3](https://tailwindcss.com/) with a custom luxury palette (cream / ink / gold / rose-nude)
- [Framer Motion](https://www.framer.com/motion/) for scroll + page transitions
- [React Router 7](https://reactrouter.com/)
- [Zustand](https://github.com/pmndrs/zustand) (with `persist` middleware) for the cart
- [lucide-react](https://lucide.dev/) icons

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview built output
npm run lint     # eslint
```

The app runs at `http://localhost:5173` by default.

## Project structure

```
src/
├── components/      Navbar, Footer, ProductCard, CartDrawer, Section, ScrollToTop
├── data/            products.ts — mock product catalog
├── pages/           Home, Shop, ProductDetail, Cart, Checkout, About, Contact, NotFound
├── store/           Zustand cart store
├── App.tsx          layout shell with animated route transitions
├── main.tsx         router + root
└── index.css        Tailwind + design tokens
```

## Customizing the catalog

Edit `src/data/products.ts` to add, remove, or re-price products. Each entry includes a gradient `accent`, a hero `image` URL, and a `notes` pyramid used on the product detail page.

## License

MIT
