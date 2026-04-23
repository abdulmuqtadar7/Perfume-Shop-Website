# Test Plan — Usman Baig Fragrance (PR #2)

**Live preview:** https://out-kgryfokh.devinapps.com
**PR:** https://github.com/abdulmuqtadar7/Perfume-Shop-Website/pull/2
**Code references:**
- Hero/sections → `src/app/page.tsx`
- Product filter logic → `src/components/ProductGrid.tsx:20–29`
- Quick View → `src/components/QuickViewModal.tsx:150–160`
- Cart math → `src/components/CartDrawer.tsx:18–21, 124–132`
- Persistence → `src/lib/store.ts` (`name: "ub-cart"`)
- Hajj variants → `src/lib/products.ts:30` (`variants: ["6ml roll-on", "12ml roll-on"]`, price `3100`)

## What changed

Brand new Next.js + Tailwind + Framer Motion storefront with mega-menu header, 3 tabbed product grids, quick-view, wishlist + cart drawers (localStorage-persisted), chat widget, and mobile drawer nav.

## Primary end-to-end flow (desktop, ~1440×900)

### T1 — Announcement bar rotation
- **Action:** load `/`, observe announcement bar for ~5 s
- **Pass:** bar alternates between
  - `💥 Flat 38% OFF + Free Shipping on All Perfumes – Limited Time Offer! ✨`
  - `🚚 Free Shipping on All Products Above Rs. 3,999 – Shop Now!`
- **Fail:** only one message, or no animation visible

### T2 — Mega-menu dropdown
- **Action:** hover "Premium Attars" on the sticky header
- **Pass:** floating panel appears with two columns — **Origin** (French/Arabic/Pure) and **Ingredient** (Oud/Mukhalat)
- **Fail:** no panel, or wrong items, or only one column

### T3 — Trending Now tab filter
- **Action:** scroll to "Trending Now" section, click the **Attar** chip
- **Pass:** grid shows exactly **1 card — "Shahi Oud Attar"** (only attar-category product tagged `trending`)
- **Fail:** more than one card, different product, or Hajj Perfume appears here (Hajj is `premium`, not `attar`)

### T4 — Quick View with size variants (Hajj Perfume)
- **Action:** reset filter to **All**, click **"Choose Options"** on Hajj Perfume card
- **Pass:** modal opens with:
  - Title "Hajj Perfume", rating row "4.9 · 418 reviews"
  - Two size chips: `6ml roll-on` and `12ml roll-on` (first selected)
  - Quantity stepper defaulting to 1
  - Add-to-Cart button text ends in `Rs. 3,100.00` (price × qty)
  - Three note boxes: Top "Rose, citrus zest", Heart "Oud, musk", Base "Sandalwood, amber"
- **Fail:** no modal, missing variant chips, wrong price, or static (non-live) total

### T5 — Qty + Add to cart + live total
- **Action:** in the Hajj modal, press `+` once (qty → 2), then click "Add to Cart"
- **Pass:**
  - Modal closes, cart drawer slides in from right
  - Cart line reads "Hajj Perfume" with qty **2** and line total **Rs. 6,200.00**
  - Drawer subtotal reads **Rs. 6,200.00**
  - Cart badge in header shows **2**
  - Free-shipping hint reads **"🚚 You've unlocked free shipping!"** (since 6200 ≥ 3999)
- **Fail:** qty 1 instead of 2, wrong subtotal, or "Add Rs. X more for free shipping" text appears

### T6 — Cart persistence (the localStorage assertion)
- **Action:** close the drawer (ESC or click scrim), then **hard reload** the page (Ctrl+Shift+R)
- **Pass:**
  - After reload the cart badge still shows **2** (from localStorage key `ub-cart`)
  - Opening the drawer still shows Hajj Perfume qty 2 with subtotal **Rs. 6,200.00**
- **Fail:** badge shows 0, drawer is empty

### T7 — Wishlist add + drawer + count
- **Action:** hover any product card (e.g. "Mughal"), click the heart icon in the hover rail; click the header wishlist icon
- **Pass:** heart turns red/filled, wishlist badge shows **1**, drawer opens with "Mughal" line item and a working "Add to cart" pill
- **Fail:** heart doesn't toggle, no badge, or drawer empty

## Mobile flow (Chrome DevTools, 390×844 iPhone 14)

### M1 — Mobile nav burger
- **Action:** at 390 px, tap burger (top-left)
- **Pass:** left-side drawer slides in, 8 accordion groups (Gender, Season, Perfumes Sale, Type, Range, Sillage, Premium Attars, Bakhoor's). Tapping "Type" expands to show 5 items (Soft, Fresh, Woody, Fruity, Sweet)
- **Fail:** no drawer, full-viewport desktop nav visible, or accordion doesn't expand

### M2 — 2-column product grid
- **Action:** scroll to "Trending Now" on mobile
- **Pass:** grid lays out in **2 columns** (not 3 or 4)
- **Fail:** 1-column or 3+-column layout

## Regression / smoke checks
Brief visual pass on: Hero renders with floating bottle, Value props 3-col, Category highlights asymmetric grid, Testimonials carousel (auto-rotates), Store Callout "Get Direction" button, Footer has 4 columns + socials + © 2026, Chat widget button bottom-right.

## Evidence
- One continuous screen recording with annotations for each `Tx`/`Mx` test.
- 4–6 screenshots for the PR comment (hero, Hajj quick-view, cart after qty=2, cart after reload, mobile burger+grid).
