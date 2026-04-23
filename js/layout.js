/* =========================================================
   Maison Velour — Shared layout partials
   Injects header, mobile menu, cart drawer, and footer into
   placeholder elements on every page so there is no build step.
   ========================================================= */
(function () {
  "use strict";

  const HEADER_HTML = `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="index.html" aria-label="Maison Velour home">
          <svg class="brand-mark" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="14" y="6" width="20" height="10" rx="2" fill="currentColor"/>
            <rect x="18" y="16" width="12" height="6" fill="currentColor" opacity="0.75"/>
            <path d="M10 24 Q10 22 12 22 H36 Q38 22 38 24 V40 Q38 44 34 44 H14 Q10 44 10 40 Z"
                  fill="currentColor" opacity="0.9"/>
            <rect x="16" y="30" width="16" height="8" rx="1.5" fill="#b8935b"/>
          </svg>
          <span>Maison Velour</span>
        </a>

        <nav class="nav" aria-label="Primary">
          <a href="index.html">Home</a>
          <a href="shop.html">Shop</a>
          <a href="about.html">Story</a>
          <a href="cart.html">Checkout</a>
        </nav>

        <div class="header-actions">
          <button class="icon-btn search" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          </button>
          <a href="cart.html" class="icon-btn account" aria-label="Account">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>
          </a>
          <button class="icon-btn cart" data-open-cart aria-label="Open cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 6h15l-1.5 9h-12z"/>
              <circle cx="9" cy="20" r="1.5"/>
              <circle cx="18" cy="20" r="1.5"/>
              <path d="M6 6 4 2H1"/>
            </svg>
            <span class="cart-count" aria-live="polite">0</span>
          </button>
          <button class="icon-btn menu-toggle" aria-label="Open menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
              <path d="M4 7h16M4 12h16M4 17h16"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  `;

  const MOBILE_MENU_HTML = `
    <aside class="mobile-menu" aria-label="Mobile menu">
      <button class="icon-btn close-menu" aria-label="Close menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <path d="M6 6l12 12M6 18L18 6"/>
        </svg>
      </button>
      <nav aria-label="Mobile primary">
        <a href="index.html">Home</a>
        <a href="shop.html">Shop</a>
        <a href="about.html">Story</a>
        <a href="cart.html">Checkout</a>
      </nav>
      <div class="menu-footer">
        Paris · London · Tokyo<br/>
        hello@maisonvelour.com
      </div>
    </aside>
  `;

  const CART_DRAWER_HTML = `
    <div class="drawer-backdrop" aria-hidden="true"></div>
    <aside class="cart-drawer" aria-label="Shopping bag">
      <div class="cart-header">
        <h3>Your Bag</h3>
        <button class="icon-btn close-cart" aria-label="Close bag">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <path d="M6 6l12 12M6 18L18 6"/>
          </svg>
        </button>
      </div>
      <div class="cart-items" role="list"></div>
      <div class="cart-footer">
        <div class="cart-subtotal">
          <span>Subtotal</span>
          <span class="total">$0</span>
        </div>
        <p class="note">Complimentary shipping on orders over $120 · Samples with every order</p>
        <a class="btn btn-primary cart-checkout" href="cart.html">Checkout</a>
      </div>
    </aside>
  `;

  const FOOTER_HTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <h4>Maison Velour</h4>
            <p>An independent perfume house crafting slow-made fragrance from rare, ethically sourced botanicals.</p>
            <div class="socials" style="margin-top:1rem">
              <a href="#" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></a>
              <a href="#" aria-label="Pinterest"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M9 20c1-4 1-6 2-10M9 10c-.5-2 1-4 3-4s4 2 4 5-2 5-4 5c-1 0-2-.5-2-1.5"/></svg></a>
              <a href="#" aria-label="TikTok"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M15 3v10.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M15 3c.5 2.5 2.5 4 4.5 4"/></svg></a>
            </div>
          </div>
          <div class="footer-col">
            <h5>Shop</h5>
            <ul>
              <li><a href="shop.html">All Fragrances</a></li>
              <li><a href="shop.html?category=Oriental">Oriental</a></li>
              <li><a href="shop.html?category=Floral">Floral</a></li>
              <li><a href="shop.html?category=Woody">Woody</a></li>
              <li><a href="shop.html?gender=Women">Women</a></li>
              <li><a href="shop.html?gender=Men">Men</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h5>Maison</h5>
            <ul>
              <li><a href="about.html">Our Story</a></li>
              <li><a href="about.html#craft">Craftsmanship</a></li>
              <li><a href="about.html#journal">Journal</a></li>
              <li><a href="#">Stockists</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h5>Help</h5>
            <ul>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Shipping &amp; Returns</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Care Guide</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© <span data-year>2025</span> Maison Velour. Crafted in Grasse.</span>
          <span>Privacy · Terms · Cookies</span>
        </div>
      </div>
    </footer>
  `;

  function inject(id, html) {
    const el = document.getElementById(id);
    if (el) el.outerHTML = html;
  }

  // Inject immediately (before DOMContentLoaded listeners in app.js)
  inject("site-header", HEADER_HTML);
  inject("mobile-menu", MOBILE_MENU_HTML);
  inject("cart-drawer", CART_DRAWER_HTML);
  inject("site-footer", FOOTER_HTML);
})();
