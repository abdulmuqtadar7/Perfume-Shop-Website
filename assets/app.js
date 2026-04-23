/* Maison Noir — front-end logic */

// ---------- Data ----------
const PRODUCTS = [
  {
    id: "velours",
    name: "N° 01 — Velours",
    family: "floral",
    price: 145,
    badge: "Bestseller",
    notes: "Iris · Ambrette · Cashmeran",
    top: "Bergamot, pink pepper",
    heart: "Iris pallida, ambrette, violet",
    base: "Cashmeran, sandalwood, musk",
    desc: "A hush of iris and ambrette draped over warm skin — a whisper of cashmere at dusk.",
    art: "linear-gradient(145deg,#f3d9db 0%,#d9a7ae 100%)"
  },
  {
    id: "boise",
    name: "N° 02 — Boisé",
    family: "woody",
    price: 165,
    badge: "New",
    notes: "Sandalwood · Cedar · Vetiver",
    top: "Pink pepper, elemi",
    heart: "Mysore sandalwood, cedar",
    base: "Vetiver, leather, benzoin",
    desc: "Dry woods warmed by Haitian vetiver — the scent of a sun-bleached library at noon.",
    art: "linear-gradient(145deg,#c8a47a 0%,#6b4a30 100%)"
  },
  {
    id: "nuitor",
    name: "N° 03 — Nuit d'Or",
    family: "oriental",
    price: 195,
    badge: "Limited",
    notes: "Oud · Amber · Saffron",
    top: "Saffron, bergamot",
    heart: "Rose absolute, oud",
    base: "Amber, labdanum, benzoin",
    desc: "Midnight resins and a glow of saffron — opulent, slow, unapologetic.",
    art: "linear-gradient(145deg,#6a2f24 0%,#1f0f0c 100%)"
  },
  {
    id: "soleil",
    name: "N° 04 — Soleil Pâle",
    family: "citrus",
    price: 125,
    notes: "Bergamot · Neroli · Yuzu",
    top: "Calabrian bergamot, yuzu",
    heart: "Neroli, orange blossom",
    base: "White musk, cedar",
    desc: "Sunlight on linen. Bright Calabrian bergamot over a bed of pale woods.",
    art: "linear-gradient(145deg,#f6e1a0 0%,#c6b45a 100%)"
  },
  {
    id: "tubereuse",
    name: "N° 05 — Tubéreuse Noire",
    family: "floral",
    price: 175,
    badge: "Bestseller",
    notes: "Tuberose · Jasmine · Smoke",
    top: "Green mandarin, galbanum",
    heart: "Tuberose absolute, jasmine",
    base: "Smoked woods, vanilla",
    desc: "A tuberose gone quiet — smoke in the wings, honeyed jasmine centerstage.",
    art: "linear-gradient(145deg,#e9c8d4 0%,#6d2a3f 100%)"
  },
  {
    id: "cedre",
    name: "N° 06 — Cèdre Blanc",
    family: "woody",
    price: 135,
    notes: "Cedar · Violet · Iris",
    top: "Aldehydes, violet leaf",
    heart: "White cedar, iris",
    base: "Soft musks, tonka",
    desc: "Cold Himalayan cedar softened with violet and iris — clean, architectural, quiet.",
    art: "linear-gradient(145deg,#e7e2d5 0%,#8c836f 100%)"
  },
  {
    id: "ambre",
    name: "N° 07 — Ambre Rouge",
    family: "oriental",
    price: 185,
    notes: "Amber · Rose · Vanilla",
    top: "Pink pepper, cinnamon bark",
    heart: "Damask rose, amber",
    base: "Madagascan vanilla, patchouli",
    desc: "A velvet amber stitched with rose and vanilla — the warmth of a candlelit room.",
    art: "linear-gradient(145deg,#e3a684 0%,#6a2410 100%)"
  },
  {
    id: "yuzu",
    name: "N° 08 — Yuzu Sel",
    family: "citrus",
    price: 115,
    badge: "New",
    notes: "Yuzu · Sea Salt · Tea",
    top: "Yuzu, lemon zest",
    heart: "White tea, salt accord",
    base: "Driftwood, ambroxan",
    desc: "Yuzu peel and a spray of sea salt — a walk on a pale beach at first light.",
    art: "linear-gradient(145deg,#d7e7c7 0%,#4f7a76 100%)"
  }
];

// ---------- Helpers ----------
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const fmt = (n) => `$${n.toFixed(0)}`;

// ---------- Product grid ----------
const grid = $("#productGrid");

function productCard(p) {
  return `
    <article class="card reveal" data-id="${p.id}" data-family="${p.family}" style="--art:${p.art}">
      <button class="card__art" aria-label="View ${p.name}">
        ${p.badge ? `<span class="card__badge">${p.badge}</span>` : ""}
        <div class="card__mini-bottle" aria-hidden="true"></div>
        <span class="card__quick">Quick view</span>
      </button>
      <div class="card__body">
        <div class="card__meta">
          <span>${p.family}</span>
          <span>extrait</span>
        </div>
        <h3 class="card__title">${p.name}</h3>
        <p class="card__notes">${p.notes}</p>
        <div class="card__row">
          <span class="card__price">${fmt(p.price)} · 50ml</span>
          <button class="link-soft" data-add="${p.id}">Add</button>
        </div>
      </div>
    </article>`;
}

function renderGrid(filter = "all") {
  const list = filter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.family === filter);
  grid.innerHTML = list.map(productCard).join("");
  // observe newly added reveals
  $$(".card.reveal", grid).forEach(el => revealObserver.observe(el));
  // wire quick-view & add
  $$(".card__art", grid).forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.closest(".card").dataset.id;
      openModal(id);
    });
  });
  $$("[data-add]", grid).forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.getAttribute("data-add");
      addToCart(id, 50);
    });
  });
}

// ---------- Filters ----------
$$(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    $$(".chip").forEach(c => { c.classList.remove("is-active"); c.setAttribute("aria-selected", "false"); });
    chip.classList.add("is-active");
    chip.setAttribute("aria-selected", "true");
    renderGrid(chip.dataset.filter);
  });
});

$$(".col-card").forEach(card => {
  card.addEventListener("click", () => {
    const filter = card.dataset.filter;
    const targetChip = $$(".chip").find(c => c.dataset.filter === filter);
    if (targetChip) targetChip.click();
    $("#shop").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ---------- Cart ----------
const CART_KEY = "maison-noir-cart";
let cart = loadCart();

function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function saveCart() { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

function priceFor(p, size) {
  const base = p.price;
  if (size === 30) return Math.round(base * 0.66);
  if (size === 100) return Math.round(base * 1.55);
  return base;
}

function addToCart(id, size = 50) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const lineId = `${id}-${size}`;
  const existing = cart.find(l => l.lineId === lineId);
  if (existing) existing.qty += 1;
  else cart.push({ lineId, id, size, qty: 1 });
  saveCart();
  renderCart();
  bumpCart();
  toast(`${p.name} — ${size}ml added`);
}

function removeFromCart(lineId) {
  cart = cart.filter(l => l.lineId !== lineId);
  saveCart();
  renderCart();
}

function setQty(lineId, delta) {
  const line = cart.find(l => l.lineId === lineId);
  if (!line) return;
  line.qty = Math.max(1, line.qty + delta);
  saveCart();
  renderCart();
}

function bumpCart() {
  const btn = $("#cartBtn");
  btn.classList.add("bump");
  setTimeout(() => btn.classList.remove("bump"), 520);
}

function renderCart() {
  const pill = $("#cartPill");
  const cartBtn = $("#cartBtn");
  const count = cart.reduce((n, l) => n + l.qty, 0);
  pill.textContent = count;
  cartBtn.classList.toggle("has-items", count > 0);

  const empty = $("#cartEmpty");
  const list = $("#cartList");
  const subtotalEl = $("#cartSubtotal");
  const checkoutBtn = $("#checkoutBtn");

  if (cart.length === 0) {
    empty.style.display = "grid";
    list.innerHTML = "";
    subtotalEl.textContent = "$0";
    checkoutBtn.disabled = true;
    return;
  }

  empty.style.display = "none";
  let subtotal = 0;
  list.innerHTML = cart.map(line => {
    const p = PRODUCTS.find(x => x.id === line.id);
    const price = priceFor(p, line.size);
    subtotal += price * line.qty;
    return `
      <li class="cart-item">
        <div class="cart-item__art" style="--art:${p.art}"></div>
        <div class="cart-item__body">
          <h4 class="cart-item__title">${p.name}</h4>
          <p class="cart-item__meta">${p.family} · ${line.size}ml</p>
          <div class="cart-item__qty">
            <button aria-label="Decrease" data-qty="${line.lineId}" data-delta="-1">−</button>
            <span>${line.qty}</span>
            <button aria-label="Increase" data-qty="${line.lineId}" data-delta="1">+</button>
          </div>
        </div>
        <div class="cart-item__right">
          <span class="cart-item__price">${fmt(price * line.qty)}</span>
          <button class="cart-item__remove" data-remove="${line.lineId}">Remove</button>
        </div>
      </li>`;
  }).join("");

  subtotalEl.textContent = fmt(subtotal);
  checkoutBtn.disabled = false;

  $$("[data-qty]", list).forEach(btn => {
    btn.addEventListener("click", () => setQty(btn.dataset.qty, parseInt(btn.dataset.delta, 10)));
  });
  $$("[data-remove]", list).forEach(btn => {
    btn.addEventListener("click", () => removeFromCart(btn.dataset.remove));
  });
}

// Drawer open/close
const scrim = $("#scrim");
const drawer = $("#cartDrawer");

function openCart() {
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  scrim.hidden = false;
  requestAnimationFrame(() => scrim.classList.add("is-open"));
  document.body.style.overflow = "hidden";
}
function closeCart() {
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  scrim.classList.remove("is-open");
  setTimeout(() => { scrim.hidden = true; }, 350);
  document.body.style.overflow = "";
}

$("#cartBtn").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
scrim.addEventListener("click", closeCart);
$$("[data-close-cart]").forEach(b => b.addEventListener("click", closeCart));
$("#checkoutBtn").addEventListener("click", () => {
  toast("Demo checkout — wire up Stripe to complete.");
});

// ---------- Modal ----------
const modal = $("#modal");
let currentProduct = null;

function openModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  currentProduct = p;
  $("#modalTitle").textContent = p.name;
  $("#modalFamily").innerHTML = `<span class="eyebrow__dot"></span>${p.family} · extrait`;
  $("#modalDesc").textContent = p.desc;
  $("#modalPrice").textContent = `${fmt(p.price)} · 50ml`;
  $("#modalArt").style.setProperty("--art", p.art);
  $("#modalNotes").innerHTML = `
    <div class="note-row"><span>Top</span><span>${p.top}</span></div>
    <div class="note-row"><span>Heart</span><span>${p.heart}</span></div>
    <div class="note-row"><span>Base</span><span>${p.base}</span></div>
  `;
  // price labels per size
  const p30 = priceFor(p, 30), p100 = priceFor(p, 100);
  const labels = $$(".modal__sizes label em");
  labels[0].textContent = fmt(p30);
  labels[1].textContent = fmt(p.price);
  labels[2].textContent = fmt(p100);
  // default to 50
  $$("input[name=size]").forEach(r => r.checked = r.value === "50");

  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

$$("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));

$("#modalAdd").addEventListener("click", () => {
  if (!currentProduct) return;
  const size = parseInt($("input[name=size]:checked").value, 10);
  addToCart(currentProduct.id, size);
  closeModal();
  openCart();
});

// ESC to close
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (modal.getAttribute("aria-hidden") === "false") closeModal();
  else if (drawer.classList.contains("is-open")) closeCart();
  else if ($("#mobileMenu").classList.contains("is-open")) closeMenu();
});

// ---------- Mobile menu ----------
const burger = $("#burger");
const mobileMenu = $("#mobileMenu");

function openMenu() {
  mobileMenu.classList.add("is-open");
  mobileMenu.setAttribute("aria-hidden", "false");
  burger.classList.add("is-open");
  burger.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}
function closeMenu() {
  mobileMenu.classList.remove("is-open");
  mobileMenu.setAttribute("aria-hidden", "true");
  burger.classList.remove("is-open");
  burger.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}
burger.addEventListener("click", () => {
  if (mobileMenu.classList.contains("is-open")) closeMenu(); else openMenu();
});
$$(".mobile-menu a").forEach(a => a.addEventListener("click", closeMenu));

// ---------- Newsletter ----------
$("#nlForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = e.currentTarget.querySelector("input");
  const email = input.value.trim();
  const note = $("#nlNote");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    note.textContent = "Please enter a valid email.";
    note.style.color = "#e7b9ac";
    return;
  }
  note.textContent = "Thank you — you're on the list.";
  note.style.color = "";
  input.value = "";
});

// ---------- Toast ----------
let toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.innerHTML = `<span class="toast__dot"></span>${msg}`;
  el.classList.add("is-open");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("is-open"), 2400);
}

// ---------- Reveal on scroll ----------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-in");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

$$(".reveal").forEach(el => revealObserver.observe(el));

// ---------- Search & account (stubs) ----------
$("#searchBtn").addEventListener("click", () => toast("Search coming soon — try a note like 'iris'."));
$("#accountBtn").addEventListener("click", () => toast("Account — demo only."));

// ---------- Nav scroll state ----------
const nav = $("#nav");
const onScroll = () => {
  nav.classList.toggle("is-scrolled", window.scrollY > 10);
};
document.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------- Init ----------
$("#year").textContent = new Date().getFullYear();
renderGrid();
renderCart();
