# Usman Baig Fragrance - Next.js Storefront

A fully responsive premium e-commerce storefront built with **Next.js (App Router)**, **Tailwind CSS**, and **Framer Motion**.

## Implemented pages

- `/` - Home storefront with premium hero, value propositions, trending products, category highlights, and rotating testimonials
- `/shop` - Product listing with search, filters, tabs, and sort
- `/product/[slug]` - Product detail with notes breakdown and related products
- `/checkout` - Checkout form, payment options, cart summary, and order history
- `/assistant` - Dedicated AI concierge chat page

## Global storefront features

- Animated announcement bar and mega-menu navigation
- Expanding search, wishlist/cart counters, and slide-out cart drawer
- Product cards with image swap on hover, discount badge, wishlist, and quick view modal
- Floating chat widget for instant support
- Newsletter and multi-column footer with social/payment utilities
- LocalStorage-backed cart, wishlist, and order state management

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Deploy to GitHub Pages (branch workflow)

- Workflow file: `.github/workflows/deploy-pages.yml`
- Trigger: pushes to `copilot/add-items-to-shop` (and manual `workflow_dispatch`)
- Output: static export from `out/` published to GitHub Pages

Before first deployment, enable **Settings → Pages → Build and deployment → Source: GitHub Actions**.
