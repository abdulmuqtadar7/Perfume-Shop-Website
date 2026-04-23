/* Home page bootstrap */
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const products = window.PRODUCTS || [];
    const bottleSVG = window.bottleSVG;
    const fmtPrice = window.MV.fmtPrice;

    // Hero bottle: featured product
    const heroBottle = document.getElementById("hero-bottle");
    if (heroBottle && products.length) {
      heroBottle.innerHTML = bottleSVG(products[0], { className: "bottle" });
    }

    // Story bottle: second product
    const storyBottle = document.getElementById("story-bottle");
    if (storyBottle && products.length > 7) {
      storyBottle.innerHTML = bottleSVG(products[7], { className: "bottle" });
    }

    // Featured grid: first 6 products
    const grid = document.getElementById("featured-grid");
    if (grid) {
      grid.innerHTML = products
        .slice(0, 6)
        .map((p) => renderCard(p))
        .join("");
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
  });
})();
