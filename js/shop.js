/* Shop page — filtering, sorting, and URL state */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const products = window.PRODUCTS || [];
    const bottleSVG = window.bottleSVG;
    const fmtPrice = window.MV.fmtPrice;

    const state = {
      category: "All",
      gender: "All",
      price: "all",
      sort: "featured",
    };

    // Read initial query params
    const q = new URLSearchParams(location.search);
    if (q.get("category")) state.category = q.get("category");
    if (q.get("gender")) state.gender = q.get("gender");

    // Build filter buttons
    const catUl = document.getElementById("filter-category");
    const genUl = document.getElementById("filter-gender");
    const priceUl = document.getElementById("filter-price");
    const sortSel = document.getElementById("sort-select");
    const grid = document.getElementById("shop-grid");
    const empty = document.getElementById("empty-state");
    const count = document.getElementById("results-count");

    catUl.innerHTML = window.CATEGORIES
      .map(
        (c) =>
          `<li><button data-category="${c}" class="${c === state.category ? "active" : ""}">${c}</button></li>`
      )
      .join("");

    genUl.innerHTML = window.GENDERS
      .map(
        (g) =>
          `<li><button data-gender="${g}" class="${g === state.gender ? "active" : ""}">${g}</button></li>`
      )
      .join("");

    // Click handlers
    catUl.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-category]");
      if (!btn) return;
      state.category = btn.dataset.category;
      activate(catUl, btn);
      render();
    });

    genUl.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-gender]");
      if (!btn) return;
      state.gender = btn.dataset.gender;
      activate(genUl, btn);
      render();
    });

    priceUl.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-price]");
      if (!btn) return;
      state.price = btn.dataset.price;
      activate(priceUl, btn);
      render();
    });

    sortSel.addEventListener("change", () => {
      state.sort = sortSel.value;
      render();
    });

    function activate(ul, btn) {
      ul.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    }

    function applyFilters(items) {
      let out = items.slice();
      if (state.category !== "All")
        out = out.filter((p) => p.category === state.category);
      if (state.gender !== "All")
        out = out.filter((p) => p.gender === state.gender);
      if (state.price !== "all") {
        const [min, max] = state.price.split("-").map(Number);
        out = out.filter((p) => p.price >= min && p.price <= max);
      }
      switch (state.sort) {
        case "price-asc":
          out.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          out.sort((a, b) => b.price - a.price);
          break;
        case "name":
          out.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          break;
      }
      return out;
    }

    function renderCard(p) {
      const priceBlock = p.oldPrice
        ? `<span>${fmtPrice(p.price)}</span><span class="old">${fmtPrice(p.oldPrice)}</span>`
        : `<span>${fmtPrice(p.price)}</span>`;
      return `
      <a class="product-card" href="product.html?id=${p.id}" aria-label="${p.name}">
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
    }

    function render() {
      const list = applyFilters(products);
      count.textContent =
        list.length === 1 ? "1 fragrance" : `${list.length} fragrances`;
      if (list.length === 0) {
        grid.innerHTML = "";
        empty.hidden = false;
      } else {
        empty.hidden = true;
        grid.innerHTML = list.map(renderCard).join("");
      }

      // Persist in URL
      const params = new URLSearchParams();
      if (state.category !== "All") params.set("category", state.category);
      if (state.gender !== "All") params.set("gender", state.gender);
      const qs = params.toString();
      history.replaceState(null, "", qs ? `?${qs}` : location.pathname);
    }

    render();
  });
})();
