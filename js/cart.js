/* Cart / Checkout page */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("cart-root");
    const { fmtPrice, byId, bottleSVG } = window.MV;

    function render() {
      const { cart, items, subtotal } = window.MV.cartTotals();
      const shipping = items === 0 ? 0 : subtotal >= 120 ? 0 : 12;
      const tax = Math.round(subtotal * 0.08);
      const total = subtotal + shipping + tax;

      if (items === 0) {
        root.innerHTML = `
          <div class="empty-cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3">
              <path d="M6 6h15l-1.5 9h-12z"/>
              <circle cx="9" cy="20" r="1.5"/>
              <circle cx="18" cy="20" r="1.5"/>
              <path d="M6 6 4 2H1"/>
            </svg>
            <h3>Your bag is empty</h3>
            <p style="color:var(--muted); margin-bottom:1.5rem">
              When you find a fragrance that speaks to you, add it here.
            </p>
            <a href="shop.html" class="btn btn-primary">Explore the shop</a>
          </div>`;
        return;
      }

      root.innerHTML = `
        <div class="checkout-grid">
          <div>
            <div class="form-block">
              <h3>Your items</h3>
              <div id="line-items"></div>
            </div>

            <div class="form-block">
              <h3>Contact</h3>
              <div class="form-row single">
                <div class="field">
                  <label>Email</label>
                  <input type="email" placeholder="you@example.com" required />
                </div>
              </div>
            </div>

            <div class="form-block">
              <h3>Shipping</h3>
              <div class="form-row">
                <div class="field">
                  <label>First name</label>
                  <input type="text" placeholder="Amélie" required />
                </div>
                <div class="field">
                  <label>Last name</label>
                  <input type="text" placeholder="Laurent" required />
                </div>
              </div>
              <div class="form-row single">
                <div class="field">
                  <label>Address</label>
                  <input type="text" placeholder="12 Rue Saint-Honoré" required />
                </div>
              </div>
              <div class="form-row">
                <div class="field">
                  <label>City</label>
                  <input type="text" placeholder="Paris" required />
                </div>
                <div class="field">
                  <label>Postal code</label>
                  <input type="text" placeholder="75001" required />
                </div>
              </div>
              <div class="form-row">
                <div class="field">
                  <label>Country</label>
                  <select>
                    <option>France</option>
                    <option>United Kingdom</option>
                    <option>Italy</option>
                    <option>United States</option>
                    <option>Japan</option>
                    <option>Other</option>
                  </select>
                </div>
                <div class="field">
                  <label>Phone</label>
                  <input type="tel" placeholder="+33 1 23 45 67 89" />
                </div>
              </div>
            </div>

            <div class="form-block">
              <h3>Payment</h3>
              <div class="form-row single">
                <div class="field">
                  <label>Card number</label>
                  <input type="text" placeholder="4242 4242 4242 4242" inputmode="numeric" />
                </div>
              </div>
              <div class="form-row">
                <div class="field">
                  <label>Expiry</label>
                  <input type="text" placeholder="MM / YY" inputmode="numeric" />
                </div>
                <div class="field">
                  <label>CVC</label>
                  <input type="text" placeholder="123" inputmode="numeric" />
                </div>
              </div>
            </div>
          </div>

          <aside class="order-summary">
            <h3>Order summary</h3>
            <div id="summary-lines"></div>
            <div class="totals">
              <div class="line"><span>Subtotal</span><span>${fmtPrice(subtotal)}</span></div>
              <div class="line"><span>Shipping</span><span>${shipping === 0 ? "Complimentary" : fmtPrice(shipping)}</span></div>
              <div class="line"><span>Estimated tax</span><span>${fmtPrice(tax)}</span></div>
              <div class="grand"><span>Total</span><span>${fmtPrice(total)}</span></div>
            </div>
            <button class="btn btn-primary" id="place-order" style="width:100%; margin-top:1.25rem">
              Place Order
            </button>
            <p style="font-size:0.78rem; color:var(--muted); text-align:center; margin-top:0.75rem">
              Secure checkout · 30-day returns · Complimentary samples
            </p>
          </aside>
        </div>
      `;

      // Fill line items (full)
      const lineRoot = document.getElementById("line-items");
      lineRoot.innerHTML = cart
        .map((item) => {
          const p = byId(item.id);
          return `
          <div class="cart-item" data-key="${item.key}" style="background:var(--bg); margin-bottom:0.75rem">
            <div class="thumb">${p ? bottleSVG(p) : ""}</div>
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

      // Summary lines (compact)
      const sumRoot = document.getElementById("summary-lines");
      sumRoot.innerHTML = cart
        .map((item) => {
          const p = byId(item.id);
          return `
          <div class="order-line">
            <div class="thumb">${p ? bottleSVG(p) : ""}</div>
            <div>
              <div class="name">${item.name}</div>
              <div class="meta">${item.ml} ml · Qty ${item.qty}</div>
            </div>
            <div>${fmtPrice(item.price * item.qty)}</div>
          </div>`;
        })
        .join("");

      // Wire line item actions
      lineRoot.addEventListener("click", (e) => {
        const target = e.target.closest("[data-action]");
        if (!target) return;
        const action = target.dataset.action;
        const key =
          target.dataset.key ||
          target.closest(".qty")?.dataset.key ||
          target.closest(".cart-item")?.dataset.key;
        if (!key) return;
        if (action === "inc") window.MV.updateQty(key, 1);
        else if (action === "dec") window.MV.updateQty(key, -1);
        else if (action === "remove") window.MV.removeItem(key);
      });

      document.getElementById("place-order").addEventListener("click", (e) => {
        e.preventDefault();
        // Simulate successful order
        window.MV.saveCart([]);
        root.innerHTML = `
          <div class="empty-cart" style="padding:5rem 2rem">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" style="color:var(--gold-dark); opacity:1">
              <circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>
            </svg>
            <h3>Merci.</h3>
            <p style="color:var(--muted); margin-bottom:1.5rem; max-width:40ch; margin-inline:auto">
              Your order has been received. A confirmation has been sent to your inbox —
              expect your fragrance, gently wrapped, within 3–5 business days.
            </p>
            <a href="shop.html" class="btn btn-primary">Continue shopping</a>
          </div>`;
      });
    }

    render();
    document.addEventListener("cart:change", render);
  });
})();
