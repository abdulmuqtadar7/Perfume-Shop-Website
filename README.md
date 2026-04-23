# Maison Noir — Perfume Shop

A responsive, single-page perfume ecommerce storefront. No build step required — just open `index.html` in a browser or serve the folder with any static HTTP server.

## Features
- Luxury brand design with serif/sans type pairing, warm cream + noir + gold palette
- Animated CSS-only hero bottle with floating motion, ambient glow, and marquee
- 8-product catalog with family filters (floral, woody, oriental, citrus)
- Quick-view modal with size selection and live pricing
- Slide-in cart drawer with quantity controls and persistent `localStorage`
- Scroll-reveal animations via IntersectionObserver
- Mobile nav, collapsible sections, fully responsive down to 360px
- Respects `prefers-reduced-motion`

## Run locally
```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Structure
```
index.html
assets/
  styles.css
  app.js
```
