# Maison Velour — Perfume Shop Website

A responsive, animated, static ecommerce storefront for a fictional luxury
perfume house. No build step, no framework — just hand-crafted HTML, CSS and
vanilla JavaScript.

## Features

- **Home** with animated hero, floating bottle, scroll-reveal sections, a
  marquee of fragrance names, featured grid, olfactive collections, brand
  story, pillars, and newsletter.
- **Shop** with sidebar filters (family, gender, price), sorting, URL state,
  and a responsive product grid.
- **Product detail** with tinted bottle illustration, size selector, olfactive
  pyramid, and related products.
- **Cart & Checkout** with line-item editing, live totals, shipping/tax
  estimation, and a simulated "Merci" order confirmation.
- **About** with timeline, values and perfumer bio.
- **Shared layout** (header, mobile menu, cart drawer, footer) injected via
  `js/layout.js`, so every page stays consistent.
- **Cart drawer** slides in from the right with backdrop blur and persistent
  state in `localStorage`.
- **Mobile-first** responsive design — two-column product grid on phones,
  four-column on desktop, collapsed filters, sliding menu.
- **Tasteful animations** — intersection-observer scroll reveals, staggered
  fades, floating hero bottle, pulsing glow, marquee, and smooth hover lifts.
- **Respects `prefers-reduced-motion`**.

## Structure

```
index.html          home
shop.html           product grid + filters
product.html        product detail (?id=...)
cart.html           checkout
about.html          story / values / timeline

css/styles.css      design system + all components
js/layout.js        injects header, mobile menu, cart drawer, footer
js/products.js      product catalogue
js/app.js           shared cart, drawer, reveal, toast, bottle SVG
js/home.js          home page bootstrap
js/shop.js          shop filtering & sorting
js/product.js       product detail page
js/cart.js          checkout page
```

## Running locally

No build tooling required. Serve the folder with any static server:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Or open `index.html` directly in a browser.

## Customisation

- **Products** live in `js/products.js`. Each product declares a `colors`
  palette (`liquid`, `cap`, `label`) which the SVG bottle illustrator uses to
  tint its bottle — so adding a new product gives you a new unique bottle for
  free.
- **Design tokens** (colors, fonts, spacing, easing) live in `:root` inside
  `css/styles.css`.

## Credits

- Fonts: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond)
  and [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts.
- All illustrations are inline SVG generated from product palettes.

Made for `abdulmuqtadar7/Perfume-Shop-Website`.
