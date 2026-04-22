const products = [
  {
    id: "noir-amber",
    name: "Noir Amber Extrait",
    category: "Warm & Spicy",
    mood: "Evening Signature",
    concentration: "Extrait de Parfum",
    price: 168,
    size: "100ml",
    notes: ["Saffron", "Incense", "Smoked Vanilla"],
    description:
      "A rich amber composition with glowing resins, dark spice, and soft sweetness for elegant evening wear.",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "velvet-rose",
    name: "Velvet Rose Mist",
    category: "Floral",
    mood: "Romantic Daywear",
    concentration: "Eau de Parfum",
    price: 132,
    size: "90ml",
    notes: ["Rose", "Peony", "White Musk"],
    description:
      "A luminous floral perfume that layers velvet rose petals with airy musk and soft peony freshness.",
    image:
      "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "cedar-veil",
    name: "Cedar Veil",
    category: "Woody",
    mood: "Minimal & Clean",
    concentration: "Extrait de Parfum",
    price: 154,
    size: "100ml",
    notes: ["Cedar", "Iris", "Suede"],
    description:
      "Smooth woods and powdery iris create a polished scent for professionals who prefer understated luxury.",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "citrus-halo",
    name: "Citrus Halo",
    category: "Fresh Citrus",
    mood: "Bright Everyday",
    concentration: "Eau de Parfum",
    price: 118,
    size: "100ml",
    notes: ["Bergamot", "Neroli", "Green Tea"],
    description:
      "An uplifting citrus halo with sparkling neroli and a clean green tea dry-down.",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "midnight-oud",
    name: "Midnight Oud",
    category: "Woody",
    mood: "Bold Statement",
    concentration: "Extrait de Parfum",
    price: 179,
    size: "100ml",
    notes: ["Oud", "Leather", "Patchouli"],
    description:
      "A powerful oud leather composition crafted for collectors who love depth, projection, and drama.",
    image:
      "https://images.unsplash.com/photo-1610240644455-3edc55c375fe?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "pearl-bloom",
    name: "Pearl Bloom",
    category: "Floral",
    mood: "Soft Luxury",
    concentration: "Eau de Parfum",
    price: 126,
    size: "85ml",
    notes: ["Jasmine", "Pear", "Cashmere"],
    description:
      "A silky floral-fruit composition with delicate jasmine and a clean cashmere finish.",
    image:
      "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "saffron-noir",
    name: "Saffron Noir",
    category: "Warm & Spicy",
    mood: "Night Out",
    concentration: "Extrait de Parfum",
    price: 162,
    size: "100ml",
    notes: ["Saffron", "Plum", "Labdanum"],
    description:
      "A shadowy saffron perfume wrapped in juicy plum and resinous warmth.",
    image:
      "https://images.unsplash.com/photo-1595425964073-0f04d40f2c4f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "linen-neroli",
    name: "Linen Neroli",
    category: "Fresh Citrus",
    mood: "Clean Summer",
    concentration: "Eau de Parfum",
    price: 112,
    size: "90ml",
    notes: ["Neroli", "Lemon", "Amberwood"],
    description:
      "A crisp citrus blend that feels like sunlit linen and a polished white shirt.",
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80",
  },
];

const storageKeys = {
  cart: "the_essence_cart",
  orders: "the_essence_orders",
  wishlist: "the_essence_wishlist",
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const getSavedData = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

let cart = getSavedData(storageKeys.cart, []);
let orders = getSavedData(storageKeys.orders, []);
let wishlist = getSavedData(storageKeys.wishlist, []);
let fallbackOrderCounter = orders.length;
const checkoutListenerState = { bound: false };
const assistantListenerState = { bound: false };

const page = document.body.dataset.page || "";
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

const saveStore = () => {
  localStorage.setItem(storageKeys.cart, JSON.stringify(cart));
  localStorage.setItem(storageKeys.orders, JSON.stringify(orders));
  localStorage.setItem(storageKeys.wishlist, JSON.stringify(wishlist));
};

const formatPrice = (value) => currencyFormatter.format(value);
const paymentLabels = {
  card: "Credit / Debit Card",
  paypal: "PayPal",
  "apple-pay": "Apple Pay",
  "cash-on-delivery": "Cash on Delivery",
};
const getPaymentLabel = (value) => paymentLabels[value] || "Payment";

const setStatus = (element, message, type = "") => {
  if (!(element instanceof HTMLElement)) return;
  element.textContent = message;
  element.classList.remove("success", "error");
  if (type) element.classList.add(type);
};

const generateOrderId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  fallbackOrderCounter += 1;
  return `essence-order-${Date.now()}-${fallbackOrderCounter}-${Math.floor(Math.random() * 100000)}`;
};

const findProduct = (id) => products.find((product) => product.id === id);
const cartItemCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);
const cartSubtotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
const isWishlisted = (productId) => wishlist.includes(productId);
const safeImageUrl = (value) => {
  try {
    const parsed = new URL(value);
    if (parsed.protocol === "https:" || parsed.protocol === "http:") {
      return parsed.toString();
    }
  } catch {}
  return products[0].image;
};
const escapeHTML = (value) =>
  String(value).replace(/[&<>"']/g, (character) => {
    const replacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return replacements[character] || character;
  });

const renderSharedCounts = () => {
  document.querySelectorAll("[data-cart-count]").forEach((node) => {
    node.textContent = String(cartItemCount());
  });
  document.querySelectorAll("[data-wishlist-count]").forEach((node) => {
    node.textContent = String(wishlist.length);
  });
  document.querySelectorAll("[data-product-count]").forEach((node) => {
    node.textContent = String(products.length);
  });
  document.querySelectorAll("[data-order-count]").forEach((node) => {
    node.textContent = String(orders.length);
  });
};

const renderProductCard = (product) => `
  <article class="product-card card">
    <div class="product-card-image">
      <img src="${safeImageUrl(product.image)}" alt="${escapeHTML(product.name)} perfume bottle" />
      <div class="product-actions-top">
        <span class="badge">${escapeHTML(product.category)}</span>
        <button
          class="icon-btn ${isWishlisted(product.id) ? "active" : ""}"
          type="button"
          aria-label="Toggle wishlist"
          data-toggle-wishlist="${product.id}"
        >♥</button>
      </div>
    </div>
    <div class="product-card-body">
      <div class="product-meta">
        <span>${escapeHTML(product.mood)}</span>
        <span>${escapeHTML(product.concentration)}</span>
      </div>
      <h3>${escapeHTML(product.name)}</h3>
      <p>${escapeHTML(product.description)}</p>
      <div class="price-row">
        <span class="price">${formatPrice(product.price)}</span>
        <div class="hero-actions">
          <a class="btn btn-secondary" href="./product.html?id=${product.id}">Details</a>
          <button class="btn btn-primary" type="button" data-add-product="${product.id}">Add</button>
        </div>
      </div>
    </div>
  </article>
`;

const toggleWishlist = (productId) => {
  wishlist = isWishlisted(productId)
    ? wishlist.filter((id) => id !== productId)
    : [...wishlist, productId];
  saveStore();
  renderSharedCounts();
  if (page === "home") renderHomePage();
  if (page === "shop") renderShopPage();
  if (page === "product") renderProductPage();
};

const addToCart = (productId) => {
  const product = findProduct(productId);
  if (!product) return;
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
  }
  saveStore();
  renderSharedCounts();
  const targetStatus = document.querySelector("#catalog-status") || document.querySelector("#cart-status");
  setStatus(targetStatus, `${product.name} added to cart.`, "success");
  if (page === "checkout") renderCheckoutPage();
};

const removeFromCart = (productId) => {
  cart = cart.filter((item) => item.id !== productId);
  saveStore();
  renderSharedCounts();
  renderCheckoutPage();
  setStatus(document.querySelector("#cart-status"), "Item removed from cart.", "success");
};

const updateCartQty = (productId, quantity) => {
  const parsed = Number(quantity);
  const cartInput = document.querySelector(`[data-qty-product="${productId}"]`);
  const existing = cart.find((item) => item.id === productId);
  const maxQuantity = 99;

  if (!Number.isFinite(parsed) || parsed < 1 || parsed > maxQuantity || !existing) {
    if (cartInput instanceof HTMLInputElement && existing) {
      cartInput.value = String(existing.quantity);
    }
    setStatus(document.querySelector("#cart-status"), `Quantity must be between 1 and ${maxQuantity}.`, "error");
    return;
  }

  existing.quantity = parsed;
  saveStore();
  renderSharedCounts();
  renderCheckoutPage();
};

const clearCart = () => {
  cart = [];
  saveStore();
  renderSharedCounts();
  renderCheckoutPage();
  setStatus(document.querySelector("#cart-status"), "Cart cleared successfully.", "success");
};

const handleNewsletter = () => {
  const newsletterForm = document.querySelector("[data-newsletter-form]");
  const newsletterStatus = document.querySelector("[data-newsletter-status]");

  newsletterForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!(newsletterForm instanceof HTMLFormElement)) return;
    newsletterForm.reset();
    setStatus(newsletterStatus, "You're subscribed to The Essence launch list.", "success");
  });
};

const renderHomePage = () => {
  const featuredGrid = document.querySelector("#home-featured");
  if (!(featuredGrid instanceof HTMLElement)) return;
  featuredGrid.innerHTML = products.slice(0, 3).map(renderProductCard).join("");
};

const getShopResults = () => {
  const searchInput = document.querySelector("#search");
  const categoryFilter = document.querySelector("#category-filter");
  const sortFilter = document.querySelector("#sort-filter");

  const query = searchInput instanceof HTMLInputElement ? searchInput.value.trim().toLowerCase() : "";
  const category = categoryFilter instanceof HTMLSelectElement ? categoryFilter.value : "all";
  const sort = sortFilter instanceof HTMLSelectElement ? sortFilter.value : "featured";
  const matchesQuery = (text) => text.toLowerCase().includes(query);

  const filtered = products.filter((product) => {
    const queryMatch =
      !query ||
      matchesQuery(product.name) ||
      matchesQuery(product.category) ||
      matchesQuery(product.mood) ||
      product.notes.some((note) => matchesQuery(note));
    const categoryMatch = category === "all" || product.category === category;
    return queryMatch && categoryMatch;
  });

  if (sort === "featured") {
    return filtered;
  }

  const sorters = {
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    "name-asc": (a, b) => a.name.localeCompare(b.name),
  };

  return [...filtered].sort(sorters[sort] || sorters["name-asc"]);
};

const renderShopPage = () => {
  const shopGrid = document.querySelector("#shop-grid");
  const categoryFilter = document.querySelector("#category-filter");
  const status = document.querySelector("#catalog-status");
  if (!(shopGrid instanceof HTMLElement)) return;

  if (categoryFilter instanceof HTMLSelectElement && categoryFilter.options.length === 1) {
    [...new Set(products.map((product) => product.category))].forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }

  const results = getShopResults();
  shopGrid.innerHTML = results.map(renderProductCard).join("");
  setStatus(status, `${results.length} fragrance(s) ready to shop.`, results.length ? "success" : "error");
};

const renderProductPage = () => {
  const detailContainer = document.querySelector("#product-detail");
  const relatedGrid = document.querySelector("#related-grid");
  if (!(detailContainer instanceof HTMLElement) || !(relatedGrid instanceof HTMLElement)) return;

  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get("id");
  const requestedProduct = findProduct(requestedId);
  const product = requestedProduct || products[0];
  const related = products.filter((item) => item.id !== product.id).slice(0, 3);
  const notFoundMessage = requestedId && !requestedProduct
    ? `<p class="status-message error">Requested product was not found. Showing a featured fragrance instead.</p>`
    : "";

  detailContainer.innerHTML = `
    <article class="card product-detail-media">
      <img src="${safeImageUrl(product.image)}" alt="${escapeHTML(product.name)} perfume bottle" />
    </article>
    <article class="card product-detail-copy">
      ${notFoundMessage}
      <p class="eyebrow">${escapeHTML(product.category)}</p>
      <h1>${escapeHTML(product.name)}</h1>
      <div class="product-detail-meta">
        <span>${escapeHTML(product.mood)}</span>
        <span>${escapeHTML(product.concentration)}</span>
        <span>${escapeHTML(product.size)}</span>
      </div>
      <p>${escapeHTML(product.description)}</p>
      <div class="note-list">
        ${product.notes.map((note) => `<span class="note-chip">${escapeHTML(note)}</span>`).join("")}
      </div>
      <div class="size-selector">
        <span class="size-chip">50ml travel edition</span>
        <span class="size-chip">${escapeHTML(product.size)} full bottle</span>
        <span class="size-chip">Discovery duo available</span>
      </div>
      <div class="product-detail-actions">
        <span class="price">${formatPrice(product.price)}</span>
        <div class="hero-actions">
          <button class="btn btn-secondary ${isWishlisted(product.id) ? "active" : ""}" type="button" data-toggle-wishlist="${product.id}">
            ${isWishlisted(product.id) ? "Wishlisted" : "Save to wishlist"}
          </button>
          <button class="btn btn-primary" type="button" data-add-product="${product.id}">Add to cart</button>
        </div>
      </div>
    </article>
  `;

  relatedGrid.innerHTML = related.map(renderProductCard).join("");
};

const updatePaymentField = () => {
  const paymentMethod = document.querySelector("#payment-method");
  const paymentDetail = document.querySelector("#payment-detail");
  const paymentText = document.querySelector("#payment-detail-text");

  if (!(paymentMethod instanceof HTMLSelectElement)) return;
  if (!(paymentDetail instanceof HTMLInputElement)) return;
  if (!(paymentText instanceof HTMLElement)) return;

  const method = paymentMethod.value;
  paymentDetail.required = method !== "cash-on-delivery";

  if (method === "paypal") {
    paymentText.textContent = "PayPal account";
    paymentDetail.placeholder = "PayPal email";
    return;
  }

  if (method === "apple-pay") {
    paymentText.textContent = "Apple Pay details";
    paymentDetail.placeholder = "Apple Pay identifier";
    return;
  }

  if (method === "cash-on-delivery") {
    paymentText.textContent = "Delivery note";
    paymentDetail.placeholder = "Optional instructions for delivery";
    return;
  }

  paymentText.textContent = "Payment details";
  paymentDetail.placeholder = "Card or wallet identifier";
};

const renderCheckoutPage = () => {
  const cartList = document.querySelector("#cart-list");
  const subtotalNode = document.querySelector("#cart-subtotal");
  const totalNode = document.querySelector("#cart-total");
  const orderHistory = document.querySelector("#order-history");
  if (!(cartList instanceof HTMLElement) || !(subtotalNode instanceof HTMLElement) || !(totalNode instanceof HTMLElement)) {
    return;
  }

  if (!cart.length) {
    cartList.innerHTML = `<li class="cart-item"><div class="cart-item-info"><strong>Your cart is empty</strong><span>Visit the shop page to add fragrances.</span></div></li>`;
  } else {
    cartList.innerHTML = cart
      .map(
        (item) => `
          <li class="cart-item">
            <div class="cart-item-info">
              <strong>${escapeHTML(item.name)}</strong>
              <span>${formatPrice(item.price)} each</span>
            </div>
            <input class="qty-input" type="number" min="1" value="${item.quantity}" data-qty-product="${item.id}" aria-label="Quantity for ${escapeHTML(item.name)}" />
            <button class="btn btn-secondary" type="button" data-remove-product="${item.id}">Remove</button>
          </li>
        `
      )
      .join("");
  }

  subtotalNode.textContent = formatPrice(cartSubtotal());
  totalNode.textContent = formatPrice(cartSubtotal());

  if (orderHistory instanceof HTMLElement) {
    orderHistory.innerHTML = orders.length
      ? orders
          .slice(-3)
          .reverse()
          .map(
            (order) => `
              <article>
                <strong>Order ${escapeHTML(order.id)}</strong>
                <p>${escapeHTML(order.name)} • ${escapeHTML(getPaymentLabel(order.paymentMethod))} • ${escapeHTML(order.deliveryWindow)}</p>
                <p>${order.items.length} item(s) • ${formatPrice(order.total)}</p>
              </article>
            `
          )
          .join("")
      : "";
  }
};

const handleCheckoutSubmit = () => {
  const checkoutForm = document.querySelector("#checkout-form");
  const checkoutStatus = document.querySelector("#checkout-status");
  if (checkoutListenerState.bound || !(checkoutForm instanceof HTMLFormElement)) return;

  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!cart.length) {
      setStatus(checkoutStatus, "Add at least one product before checkout.", "error");
      return;
    }

    const formData = new FormData(checkoutForm);
    const paymentMethod = String(formData.get("paymentMethod") || "").trim();
    const paymentDetail = String(formData.get("paymentDetail") || "").trim();

    if (!paymentMethod) {
      setStatus(checkoutStatus, "Please choose a payment method.", "error");
      return;
    }

    if (paymentMethod !== "cash-on-delivery" && !paymentDetail) {
      setStatus(checkoutStatus, "Please provide payment details.", "error");
      return;
    }

    const order = {
      id: generateOrderId(),
      name: String(formData.get("name") || "Guest"),
      paymentMethod,
      deliveryWindow: String(formData.get("deliveryWindow") || "Standard"),
      total: cartSubtotal(),
      items: cart.map((item) => ({ ...item })),
    };

    orders.push(order);
    cart = [];
    saveStore();
    renderSharedCounts();
    renderCheckoutPage();
    checkoutForm.reset();
    updatePaymentField();
    setStatus(checkoutStatus, `Order ${order.id} placed successfully.`, "success");
  });

  checkoutListenerState.bound = true;
};

const assistantReply = (message) => {
  const text = message.toLowerCase();

  if (text.includes("hello") || text.includes("hi")) {
    return "Hello — I’m The Essence AI concierge. I can help with product recommendations, shipping, payments, and your cart.";
  }
  if (text.includes("recommend") || text.includes("best") || text.includes("suggest")) {
    return "For a rich evening scent, try Noir Amber Extrait or Midnight Oud. For fresh everyday wear, Citrus Halo and Linen Neroli are excellent picks.";
  }
  if (text.includes("cart")) {
    if (!cart.length) return "Your cart is currently empty. Visit Shop to add perfumes you’d like to purchase.";
    const preview = cart.slice(0, 3).map((item) => `${item.name} x${item.quantity}`).join(", ");
    const remainder = cart.length > 3 ? ` and ${cart.length - 3} more item(s)` : "";
    return `Your cart contains ${preview}${remainder}.`;
  }
  if (text.includes("wishlist")) {
    return wishlist.length
      ? `You currently have ${wishlist.length} saved fragrance(s) in your wishlist.`
      : "Your wishlist is empty at the moment.";
  }
  if (text.includes("ship") || text.includes("delivery")) {
    return "We dispatch most orders within 24 hours and offer Standard, Express, and Gift delivery options at checkout.";
  }
  if (text.includes("pay") || text.includes("card") || text.includes("paypal") || text.includes("apple")) {
    return "We support Credit/Debit Card, PayPal, Apple Pay, and Cash on Delivery depending on your location.";
  }
  if (text.includes("gift")) {
    return "Pearl Bloom and Velvet Rose Mist are top gift choices, and every full-size order can be paired with luxury packaging.";
  }
  return "Ask me about scent recommendations, payment methods, delivery timing, cart status, or the best perfume for a specific mood.";
};

const appendChatMessage = (message, role) => {
  const chatWindow = document.querySelector("#chat-window");
  if (!(chatWindow instanceof HTMLElement)) return;
  const bubble = document.createElement("div");
  bubble.className = `chat-message ${role}`;
  bubble.textContent = message;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
};

const renderAssistantPage = () => {
  const quickQuestions = document.querySelector("#quick-questions");
  const chatWindow = document.querySelector("#chat-window");
  if (!(quickQuestions instanceof HTMLElement) || !(chatWindow instanceof HTMLElement)) return;

  if (!chatWindow.childElementCount) {
    appendChatMessage(
      "Welcome to The Essence AI concierge. I’m here to help you choose fragrances and complete your order.",
      "bot"
    );
  }

  quickQuestions.innerHTML = [
    "Recommend a warm fragrance",
    "What payment methods are available?",
    "How fast is shipping?",
    "Show my cart status",
    "Best perfume for gifting",
  ]
    .map((prompt) => `<button type="button" data-chat-prompt="${escapeHTML(prompt)}">${escapeHTML(prompt)}</button>`)
    .join("");
};

const bindAssistantEvents = () => {
  const chatForm = document.querySelector("#chat-form");
  const chatInput = document.querySelector("#chat-input");
  const quickQuestions = document.querySelector("#quick-questions");
  if (assistantListenerState.bound || !(chatForm instanceof HTMLFormElement) || !(quickQuestions instanceof HTMLElement)) {
    return;
  }

  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!(chatInput instanceof HTMLInputElement)) return;
    const question = chatInput.value.trim();
    if (!question) return;
    appendChatMessage(question, "user");
    appendChatMessage(assistantReply(question), "bot");
    chatInput.value = "";
  });

  quickQuestions.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const prompt = target.getAttribute("data-chat-prompt");
    if (!prompt) return;
    appendChatMessage(prompt, "user");
    appendChatMessage(assistantReply(prompt), "bot");
  });

  assistantListenerState.bound = true;
};

const bindGlobalEvents = () => {
  menuToggle?.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav?.classList.toggle("open");
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const addId = target.getAttribute("data-add-product");
    if (addId) addToCart(addId);

    const wishlistId = target.getAttribute("data-toggle-wishlist");
    if (wishlistId) toggleWishlist(wishlistId);

    const removeId = target.getAttribute("data-remove-product");
    if (removeId) removeFromCart(removeId);
  });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.matches("#search") || target.matches("#category-filter") || target.matches("#sort-filter")) {
      renderShopPage();
    }

    if (target.matches("#payment-method")) {
      updatePaymentField();
    }

    if (target instanceof HTMLInputElement) {
      const productId = target.getAttribute("data-qty-product");
      if (productId) updateCartQty(productId, target.value);
    }
  });

  document.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.matches("#search")) {
      renderShopPage();
    }
  });

  document.querySelector("#clear-cart")?.addEventListener("click", clearCart);
};

const initPage = () => {
  renderSharedCounts();
  handleNewsletter();
  bindGlobalEvents();

  if (page === "home") renderHomePage();
  if (page === "shop") renderShopPage();
  if (page === "product") renderProductPage();
  if (page === "checkout") {
    renderCheckoutPage();
    handleCheckoutSubmit();
    updatePaymentField();
  }
  if (page === "assistant") {
    renderAssistantPage();
    bindAssistantEvents();
  }
};

initPage();
