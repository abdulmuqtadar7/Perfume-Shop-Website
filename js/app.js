/* =========================================================
   Maison Velour — Shared app behaviour
   - Cart state (localStorage)
   - Cart drawer
   - Mobile menu
   - Scroll-reveal animations
   - Header scrolled state
   - Bottle SVG renderer
   - Toast notifications
   ========================================================= */

(function () {
  "use strict";

  /* ---------- Utilities ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Prices are stored and displayed in Pakistani Rupees (PKR).
  const fmtPrice = (n) =>
    "Rs " +
    new Intl.NumberFormat("en-PK", {
      maximumFractionDigits: 0,
    }).format(n);

  const byId = (id) => (window.PRODUCTS || []).find((p) => p.id === id);

  /* ---------- Bottle SVG ---------- */
  // Renders a stylised perfume bottle tinted with the product's palette.
  function bottleSVG(product, { className = "bottle" } = {}) {
    const id = "g-" + product.id.replace(/[^a-z0-9]/gi, "");
    const { liquid, cap, label } = product.colors;
    return `
<svg class="${className}" viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="${id}-liq" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${liquid}" stop-opacity="0.85"/>
      <stop offset="70%" stop-color="${liquid}"/>
      <stop offset="100%" stop-color="${liquid}" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="${id}-glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55"/>
      <stop offset="40%" stop-color="#ffffff" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.22"/>
    </linearGradient>
    <linearGradient id="${id}-cap" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${cap}"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.6"/>
    </linearGradient>
  </defs>

  <!-- cap -->
  <rect x="78" y="18" width="44" height="44" rx="6" fill="url(#${id}-cap)"/>
  <rect x="78" y="18" width="44" height="6" rx="3" fill="#000" opacity="0.3"/>

  <!-- neck -->
  <rect x="88" y="62" width="24" height="20" fill="${cap}" opacity="0.85"/>
  <rect x="84" y="78" width="32" height="10" rx="3" fill="${cap}" opacity="0.7"/>

  <!-- bottle body -->
  <path d="M50 95 Q50 88 60 88 H140 Q150 88 150 95 V240 Q150 260 130 260 H70 Q50 260 50 240 Z"
        fill="url(#${id}-liq)" />

  <!-- glass highlight -->
  <path d="M50 95 Q50 88 60 88 H140 Q150 88 150 95 V240 Q150 260 130 260 H70 Q50 260 50 240 Z"
        fill="url(#${id}-glass)" />

  <!-- label -->
  <rect x="68" y="150" width="64" height="74" rx="4" fill="${label}" opacity="0.92"/>
  <rect x="76" y="162" width="48" height="2" fill="${cap}" opacity="0.4"/>
  <text x="100" y="185" text-anchor="middle"
        font-family="Cormorant Garamond, serif"
        font-size="15" font-style="italic" fill="${cap}">
    ${product.name.split(" ")[0]}
  </text>
  <text x="100" y="202" text-anchor="middle"
        font-family="Inter, sans-serif" font-size="6"
        letter-spacing="2" fill="${cap}" opacity="0.7">
    MAISON VELOUR
  </text>
  <rect x="76" y="210" width="48" height="2" fill="${cap}" opacity="0.4"/>

  <!-- side shadow -->
  <path d="M50 100 Q50 88 60 88 H68 V260 H70 Q50 260 50 240 Z" fill="#000" opacity="0.12"/>
</svg>`;
  }
  window.bottleSVG = bottleSVG;

  /* ---------- Header scrolled state ---------- */
  function initHeader() {
    const header = $(".site-header");
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  function initMobileMenu() {
    const toggle = $(".menu-toggle");
    const menu = $(".mobile-menu");
    if (!toggle || !menu) return;
    const close = $(".close-menu", menu);
    const open = () => {
      menu.classList.add("open");
      document.body.style.overflow = "hidden";
    };
    const closeMenu = () => {
      menu.classList.remove("open");
      document.body.style.overflow = "";
    };
    toggle.addEventListener("click", open);
    close && close.addEventListener("click", closeMenu);
    $$(".mobile-menu nav a", document).forEach((a) =>
      a.addEventListener("click", closeMenu)
    );
  }

  /* ---------- Scroll reveal ---------- */
  let revealObserver = null;
  function observeReveal(root = document) {
    const els = $$(".reveal:not(.inview), .reveal-stagger:not(.inview)", root);
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("inview"));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("inview");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
    }
    els.forEach((el) => revealObserver.observe(el));
  }

  function initReveal() {
    observeReveal(document);
  }

  /* ---------- Cart ---------- */
  const CART_KEY = "mv_cart_v1";

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    document.dispatchEvent(
      new CustomEvent("cart:change", { detail: { cart } })
    );
  }

  function addToCart(productId, size) {
    const p = byId(productId);
    if (!p) return;
    const sz = size || p.sizes[p.sizes.length - 1];
    const cart = loadCart();
    const key = `${productId}::${sz.ml}`;
    const existing = cart.find((i) => i.key === key);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        key,
        id: productId,
        name: p.name,
        ml: sz.ml,
        price: sz.price,
        qty: 1,
      });
    }
    saveCart(cart);
    showToast(`${p.name} — added to bag`);
    openDrawer();
  }

  function updateQty(key, delta) {
    const cart = loadCart();
    const item = cart.find((i) => i.key === key);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      const idx = cart.indexOf(item);
      cart.splice(idx, 1);
    }
    saveCart(cart);
  }

  function removeItem(key) {
    const cart = loadCart().filter((i) => i.key !== key);
    saveCart(cart);
  }

  function cartTotals() {
    const cart = loadCart();
    const items = cart.reduce((n, i) => n + i.qty, 0);
    const subtotal = cart.reduce((n, i) => n + i.qty * i.price, 0);
    return { cart, items, subtotal };
  }

  window.MV = Object.assign(window.MV || {}, {
    loadCart,
    saveCart,
    addToCart,
    updateQty,
    removeItem,
    cartTotals,
    fmtPrice,
    byId,
    bottleSVG,
    observeReveal,
  });

  /* ---------- Cart drawer ---------- */
  let drawer, backdrop;

  function openDrawer() {
    drawer && drawer.classList.add("open");
    backdrop && backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer && drawer.classList.remove("open");
    backdrop && backdrop.classList.remove("open");
    document.body.style.overflow = "";
  }

  function renderDrawer() {
    if (!drawer) return;
    const { cart, items, subtotal } = cartTotals();
    const itemsEl = $(".cart-items", drawer);
    const subtotalEl = $(".cart-subtotal .total", drawer);
    const checkoutBtn = $(".cart-checkout", drawer);
    const countBadge = $(".cart-count");

    if (countBadge) {
      countBadge.textContent = items;
      countBadge.classList.toggle("visible", items > 0);
    }

    if (subtotalEl) subtotalEl.textContent = fmtPrice(subtotal);
    if (checkoutBtn) checkoutBtn.toggleAttribute("disabled", items === 0);

    if (!itemsEl) return;

    if (cart.length === 0) {
      itemsEl.innerHTML = `
        <div class="cart-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
            <path d="M6 6h15l-1.5 9h-12z"/>
            <circle cx="9" cy="20" r="1.5"/>
            <circle cx="18" cy="20" r="1.5"/>
            <path d="M6 6 4 2H1"/>
          </svg>
          <h4>Your bag is empty</h4>
          <p>Discover our signature fragrances.</p>
          <a href="shop.html" class="btn btn-ghost">Explore the shop</a>
        </div>`;
      return;
    }

    itemsEl.innerHTML = cart
      .map((item) => {
        const product = byId(item.id);
        return `
        <div class="cart-item" data-key="${item.key}">
          <div class="thumb">${product ? bottleSVG(product) : ""}</div>
          <div>
            <div class="name">${item.name}</div>
            <div class="meta">${item.ml} ml · Eau de Parfum</div>
            <div class="qty" data-key="${item.key}">
              <button data-action="dec" aria-label="Decrease">−</button>
              <span>${item.qty}</span>
              <button data-action="inc" aria-label="Increase">+</button>
            </div>
          </div>
          <div class="right">
            <button class="remove" data-action="remove" data-key="${item.key}">Remove</button>
            <div class="price">${fmtPrice(item.price * item.qty)}</div>
          </div>
        </div>`;
      })
      .join("");
  }

  function initDrawer() {
    drawer = $(".cart-drawer");
    backdrop = $(".drawer-backdrop");
    if (!drawer) return;

    const triggers = $$("[data-open-cart]");
    triggers.forEach((t) => t.addEventListener("click", openDrawer));

    const closeBtn = $(".close-cart", drawer);
    closeBtn && closeBtn.addEventListener("click", closeDrawer);
    backdrop && backdrop.addEventListener("click", closeDrawer);

    drawer.addEventListener("click", (e) => {
      const target = e.target.closest("[data-action]");
      if (!target) return;
      const action = target.dataset.action;
      const key =
        target.dataset.key ||
        target.closest(".qty")?.dataset.key ||
        target.closest(".cart-item")?.dataset.key;
      if (!key) return;
      if (action === "inc") updateQty(key, 1);
      else if (action === "dec") updateQty(key, -1);
      else if (action === "remove") removeItem(key);
    });

    document.addEventListener("cart:change", renderDrawer);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDrawer();
    });
    renderDrawer();
  }

  /* ---------- Toast ---------- */
  let toastEl = null;
  let toastTimer = null;
  function showToast(message) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 6 9 17l-5-5"/>
      </svg>
      <span>${message}</span>`;
    requestAnimationFrame(() => toastEl.classList.add("show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2400);
  }

  /* ---------- Active nav link ---------- */
  function initActiveNav() {
    const path = location.pathname.split("/").pop() || "index.html";
    $$(".nav a, .mobile-menu nav a").forEach((a) => {
      const href = a.getAttribute("href");
      if (href === path) a.classList.add("active");
    });
  }

  /* ---------- Year ---------- */
  function initYear() {
    const y = new Date().getFullYear();
    $$("[data-year]").forEach((el) => (el.textContent = y));
  }

  /* ---------- Quick add on cards ---------- */
  function initQuickAdd() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-add]");
      if (!btn) return;
      e.preventDefault();
      addToCart(btn.dataset.add);
    });
  }

  /* ---------- Newsletter ---------- */
  function initNewsletter() {
    $$(".newsletter-form").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = $("input", form);
        showToast("Thank you — welcome to the maison.");
        input.value = "";
      });
    });
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initMobileMenu();
    initReveal();
    initDrawer();
    initActiveNav();
    initYear();
    initQuickAdd();
    initNewsletter();
  });
})();
