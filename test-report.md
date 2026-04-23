# Test Report — Usman Baig Fragrance (PR #2)

- **Live preview:** https://out-kgryfokh.devinapps.com
- **PR:** https://github.com/abdulmuqtadar7/Perfume-Shop-Website/pull/2
- **Devin session:** https://app.devin.ai/sessions/fb432c37212a4b7fb4642403421df806
- **Viewports:** desktop ~1440×900, mobile ~400×982 (Chrome responsive mode)
- **Tester methodology:** live preview end-to-end via browser UI; no curl/API calls; no code changes during testing.

## Summary
All 9 runtime assertions passed. One minor note on test T5 (detailed below) — a misclick landed on Add-to-Cart instead of the modal's qty "+", so qty was bumped from 1→2 via the cart-drawer stepper instead of the modal stepper. The cart math, persistence, and free-shipping threshold were still fully exercised. Everything else worked first time.

## Results

| # | Test | Result |
| - | ---- | ------ |
| T1 | Announcement bar rotates between the two messages (`💥 Flat 38% OFF…` ↔ `🚚 Free Shipping above Rs. 3,999…`) | passed |
| T2 | Mega-menu hover on "Premium Attars" reveals 2-column panel (Origin: French/Arabic/Pure · Ingredient: Oud/Mukhalat) | passed |
| T3 | Trending Now + Attar chip narrows grid to exactly 1 card (**Shahi Oud Attar · Rs. 1,850**). Hajj (premium) correctly hidden. | passed |
| T4 | Quick View on Hajj opens with: title, `4.9 · 418 reviews`, `6ml roll-on`/`12ml roll-on` chips, Top/Heart/Base notes, live Rs. 3,100 on Add-to-Cart button | passed |
| T5 | Cart drawer after add: line qty=2 · Rs. 6,200 · subtotal Rs. 6,200 · header badge "2" · `🚚 You've unlocked free shipping!` hint | passed* |
| T6 | Hard reload (Ctrl+Shift+R) — cart still shows qty 2, subtotal Rs. 6,200 (Zustand persist to `ub-cart`) | passed |
| T7 | Wishlist: heart filled on Mughal, rose badge "1", drawer shows Mughal Rs. 3,100 with Add-to-cart + Remove | passed |
| M1 | Mobile burger (~400px): drawer opens with 8 accordion groups; Type expands to Soft/Fresh/Woody/Fruity/Sweet | passed |
| M2 | Mobile Trending Now lays out as 2 columns (Mughal | Hajj) | passed |

\* *T5 note: my click on the modal's `+` button landed on the adjacent `Add to Cart` pill (qty=1 was added). I bumped qty to 2 via the cart drawer's `+`. All assertions (line total, subtotal, free-ship threshold, badge count) still verified — just via the drawer stepper rather than the modal stepper.*

## Evidence

### T1 — Announcement bar (second message visible after rotation)
![T1](https://app.devin.ai/attachments/51af2097-791f-4c49-95cb-2130efae5ae2/screenshot_f3a5e85898c34e8f9960291810ac6cf2.png)

### T2 — Premium Attars mega-menu (2 columns)
![T2](https://app.devin.ai/attachments/2d4126c5-f4af-4c6a-acc6-b43407133078/screenshot_2f1779958d6e4bda9c7a9983d1e4bae6.png)

### T3 — Trending + Attar filter narrows to Shahi Oud Attar only
![T3](https://app.devin.ai/attachments/6f5e9d76-8ef6-4fb8-aca9-1260fcaae635/screenshot_a41b8fb683224ef29fa4f7bec6d719bb.png)

### T4 — Quick View for Hajj Perfume with size variants + live price
![T4](https://app.devin.ai/attachments/a12a48fd-5910-49eb-8fbf-b04538b5d97c/screenshot_9d9108e9072a42b895fd3c552fd535c7.png)

### T5 — Cart with qty=2 and "free shipping unlocked"
![T5](https://app.devin.ai/attachments/53604374-25b1-4f1f-bf49-5aeb2879aa7b/screenshot_8a1a4f3457a447e4babd91a24b428cab.png)

### T6 — Cart persists after hard reload
![T6](https://app.devin.ai/attachments/165164cd-69b1-4d36-9f8f-5db0ed0ecea2/screenshot_f9a5d226ae7d4ecc96ad207d13aa035b.png)

### T7 — Wishlist drawer
![T7](https://app.devin.ai/attachments/7c2e98fe-290a-4271-97f4-3e11629ad8a2/screenshot_4808e869e9584981a655295a22d7b372.png)

### M1 — Mobile burger (8 accordion groups)
![M1a](https://app.devin.ai/attachments/704bf285-c5aa-44dd-9a15-98602c1ecc1a/screenshot_851bdbfcc38e4c40979f3aca43c533fe.png)

### M1 — Type accordion expansion
![M1b](https://app.devin.ai/attachments/9a80d936-4208-4b2d-b160-36e59ae2e29f/screenshot_b2512bdad7c8411d8db2c72cc29939a2.png)

### M2 — 2-column product grid
![M2](https://app.devin.ai/attachments/11fbd862-ffe7-4313-a3cb-e2f689839200/screenshot_59a5969c2b4245e2a25f3f2be98bf34d.png)

## Not proven / out of scope
- **Checkout integration:** `CHECKOUT · Rs. X,XXX.XX` button not wired to any payment provider (expected — spec says storefront only).
- **Real product imagery:** bottle illustrations are pure-CSS gradients (by design).
- **Search submit:** header search opens an input but isn't backed by a search index.
- **Chat widget backend:** canned UX only, no real conversation.
- **Accessibility audit & Lighthouse performance scores:** not part of this runtime pass.
