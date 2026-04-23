/* Product detail page */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const products = window.PRODUCTS || [];
    const bottleSVG = window.bottleSVG;
    const fmtPrice = window.MV.fmtPrice;

    const params = new URLSearchParams(location.search);
    const id = params.get("id") || (products[0] && products[0].id);
    const product = window.MV.byId(id) || products[0];
    if (!product) return;

    document.title = `${product.name} · Maison Velour`;

    // State
    let selectedSize = product.sizes[product.sizes.length - 1];

    const root = document.getElementById("pdp-root");
    root.innerHTML = `
      <div class="pdp-media reveal">
        ${bottleSVG(product, { className: "bottle" })}
      </div>
      <div class="pdp-info reveal">
        <div class="crumbs">
          <a href="index.html">Home</a> · <a href="shop.html">Shop</a> · <span>${product.name}</span>
        </div>
        <h1>${product.name}</h1>
        <div class="eyebrow" style="margin-top:0.5rem">${product.tagline} · ${product.gender}</div>
        <div class="price" id="pdp-price">${fmtPrice(selectedSize.price)}</div>
        <p class="description">${product.description}</p>

        <div class="pdp-options">
          <div class="option-row">
            <h5>Size</h5>
            <div class="size-options" id="size-options">
              ${product.sizes
                .map(
                  (s, i) => `
                <button class="size-option ${i === product.sizes.length - 1 ? "active" : ""}"
                        data-ml="${s.ml}" data-price="${s.price}">
                  ${s.ml} ml · ${fmtPrice(s.price)}
                </button>`
                )
                .join("")}
            </div>
          </div>

          <div class="option-row">
            <h5>Olfactive Pyramid</h5>
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:1rem; margin-top:0.5rem">
              <div>
                <div class="eyebrow" style="font-size:0.65rem">Top</div>
                <div style="font-family:var(--font-display); font-size:1.05rem; margin-top:0.25rem">
                  ${product.top.join(", ")}
                </div>
              </div>
              <div>
                <div class="eyebrow" style="font-size:0.65rem">Heart</div>
                <div style="font-family:var(--font-display); font-size:1.05rem; margin-top:0.25rem">
                  ${product.heart.join(", ")}
                </div>
              </div>
              <div>
                <div class="eyebrow" style="font-size:0.65rem">Base</div>
                <div style="font-family:var(--font-display); font-size:1.05rem; margin-top:0.25rem">
                  ${product.base.join(", ")}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pdp-actions">
          <button class="btn btn-primary" id="pdp-add">Add to Bag · <span id="pdp-add-price">${fmtPrice(selectedSize.price)}</span></button>
          <a class="btn btn-ghost" href="cart.html">Checkout</a>
        </div>

        <div class="pdp-meta">
          <div class="cell">
            <span class="icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M3 7h13l3 4h2v6h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
              </svg>
            </span>
            <strong>Free shipping</strong>
            <span>on orders over $120, worldwide.</span>
          </div>
          <div class="cell">
            <span class="icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M4 7v10M4 12h12M16 7v10"/><path d="m20 9-4 3 4 3"/>
              </svg>
            </span>
            <strong>Refillable</strong>
            <span>Send bottle back for 20% refill credit.</span>
          </div>
          <div class="cell">
            <span class="icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
              </svg>
            </span>
            <strong>Aged 9 months</strong>
            <span>Minimum maceration before bottling.</span>
          </div>
        </div>
      </div>
    `;

    // Trigger reveal for newly-injected nodes
    window.MV.observeReveal(root);

    // Size switching
    const priceEl = document.getElementById("pdp-price");
    const addPriceEl = document.getElementById("pdp-add-price");
    const sizeOptions = document.getElementById("size-options");

    sizeOptions.addEventListener("click", (e) => {
      const btn = e.target.closest(".size-option");
      if (!btn) return;
      sizeOptions
        .querySelectorAll(".size-option")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const ml = Number(btn.dataset.ml);
      selectedSize = product.sizes.find((s) => s.ml === ml);
      priceEl.textContent = fmtPrice(selectedSize.price);
      addPriceEl.textContent = fmtPrice(selectedSize.price);
    });

    document.getElementById("pdp-add").addEventListener("click", () => {
      window.MV.addToCart(product.id, selectedSize);
    });

    // Related products (4 others)
    const relatedGrid = document.getElementById("related-grid");
    if (relatedGrid) {
      const related = products
        .filter((p) => p.id !== product.id)
        .sort(
          (a, b) =>
            (a.category === product.category ? -1 : 0) -
            (b.category === product.category ? -1 : 0)
        )
        .slice(0, 4);
      relatedGrid.innerHTML = related
        .map((p) => {
          const priceBlock = p.oldPrice
            ? `<span>${fmtPrice(p.price)}</span><span class="old">${fmtPrice(p.oldPrice)}</span>`
            : `<span>${fmtPrice(p.price)}</span>`;
          return `
          <a class="product-card" href="product.html?id=${p.id}">
            <div class="media">
              ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
              ${bottleSVG(p)}
              <button class="quick-add" data-add="${p.id}" aria-label="Quick add ${p.name}" onclick="event.preventDefault(); event.stopPropagation();">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </button>
            </div>
            <div class="info">
              <span class="category">${p.category} · ${p.gender}</span>
              <span class="name">${p.name}</span>
              <span class="price">${priceBlock}</span>
            </div>
          </a>`;
        })
        .join("");
    }
  });
})();
