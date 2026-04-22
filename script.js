const products = [
  {
    id: "velour-elixir",
    name: "Velour Elixir",
    category: "Warm & Spicy",
    notes: "Saffron, amber, vanilla",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1615634262417-d4f79f755511?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "luna-petale",
    name: "Luna Pétale",
    category: "Floral Fresh",
    notes: "Rose, peony, musk",
    price: 114,
    image:
      "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "oud-minuit",
    name: "Oud Minuit",
    category: "Woody Intense",
    notes: "Oud, cedar, patchouli",
    price: 148,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "aurore-citrus",
    name: "Aurore Citrus",
    category: "Citrus Aromatic",
    notes: "Bergamot, neroli, green tea",
    price: 102,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "opal-bloom",
    name: "Opal Bloom",
    category: "Floral Fresh",
    notes: "Jasmine, tuberose, pear",
    price: 119,
    image:
      "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ember-atelier",
    name: "Ember Atelier",
    category: "Warm & Spicy",
    notes: "Tonka, cinnamon, incense",
    price: 136,
    image:
      "https://images.unsplash.com/photo-1610240644455-3edc55c375fe?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sable-iris",
    name: "Sable Iris",
    category: "Woody Intense",
    notes: "Iris, vetiver, suede",
    price: 141,
    image:
      "https://images.unsplash.com/photo-1595425964073-0f04d40f2c4f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ciel-neroli",
    name: "Ciel Neroli",
    category: "Citrus Aromatic",
    notes: "Neroli, lemon zest, amberwood",
    price: 108,
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80",
  },
];

const storageKeys = {
  cart: "lueur_cart",
  orders: "lueur_orders",
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
let orderFallbackCounter = 0;

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const productGrid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#search");
const categoryFilter = document.querySelector("#category-filter");
const catalogStatus = document.querySelector("#catalog-status");
const cartList = document.querySelector("#cart-list");
const cartSubtotal = document.querySelector("#cart-subtotal");
const cartStatus = document.querySelector("#cart-status");
const checkoutForm = document.querySelector("#checkout-form");
const checkoutStatus = document.querySelector("#checkout-status");
const clearCartButton = document.querySelector("#clear-cart");
const paymentMethod = document.querySelector("#payment-method");
const paymentDetail = document.querySelector("#payment-detail");
const paymentDetailText = document.querySelector("#payment-detail-text");
const orderHistory = document.querySelector("#order-history");
const productCount = document.querySelector("#product-count");
const cartCount = document.querySelector("#cart-count");
const orderCount = document.querySelector("#order-count");
const chatWindow = document.querySelector("#chat-window");
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const quickQuestions = document.querySelector("#quick-questions");

const formatPrice = (value) => currencyFormatter.format(value);
const generateOrderId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  orderFallbackCounter += 1;
  return `order-${Date.now()}-${orderFallbackCounter}`;
};

const setStatus = (element, message, type = "") => {
  if (!(element instanceof HTMLElement)) return;
  element.textContent = message;
  element.classList.remove("success", "error");
  if (type) {
    element.classList.add(type);
  }
};

const persistData = () => {
  localStorage.setItem(storageKeys.cart, JSON.stringify(cart));
  localStorage.setItem(storageKeys.orders, JSON.stringify(orders));
};

const updateStats = () => {
  if (productCount) productCount.textContent = String(products.length);
  if (cartCount) {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = String(totalCount);
  }
  if (orderCount) orderCount.textContent = String(orders.length);
};

const getFilteredProducts = () => {
  const query = searchInput instanceof HTMLInputElement ? searchInput.value.trim().toLowerCase() : "";
  const category = categoryFilter instanceof HTMLSelectElement ? categoryFilter.value : "all";

  return products.filter((product) => {
    const queryMatches =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.notes.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);
    const categoryMatches = category === "all" || product.category === category;
    return queryMatches && categoryMatches;
  });
};

const renderProducts = () => {
  if (!(productGrid instanceof HTMLElement)) return;

  const filteredProducts = getFilteredProducts();
  if (!filteredProducts.length) {
    productGrid.innerHTML = "";
    setStatus(catalogStatus, "No perfumes found. Try a different filter.", "error");
    return;
  }

  setStatus(catalogStatus, `${filteredProducts.length} perfume(s) available.`, "success");
  productGrid.innerHTML = filteredProducts
    .map(
      (product) => `
      <article class="product-card">
        <img src="${product.image}" alt="${product.name} perfume bottle" />
        <div class="product-card-body">
          <p class="label">${product.category}</p>
          <h3>${product.name}</h3>
          <p>${product.notes}</p>
          <div class="price-row">
            <span class="price">${formatPrice(product.price)}</span>
            <button class="btn btn-primary" type="button" data-add-product="${product.id}">Add to Cart</button>
          </div>
        </div>
      </article>
      `
    )
    .join("");
};

const renderCart = () => {
  if (!(cartList instanceof HTMLElement) || !(cartSubtotal instanceof HTMLElement)) return;

  if (!cart.length) {
    cartList.innerHTML = '<li class="cart-item"><p>Your cart is empty.</p></li>';
    cartSubtotal.textContent = formatPrice(0);
    updateStats();
    return;
  }

  const rows = cart
    .map(
      (item) => `
      <li class="cart-item">
        <div>
          <p class="item-name">${item.name}</p>
          <p>${formatPrice(item.price)} each</p>
        </div>
        <label>
          Qty
          <input type="number" min="1" value="${item.quantity}" data-qty-product="${item.id}" />
        </label>
        <button class="btn btn-ghost" type="button" data-remove-product="${item.id}">Remove</button>
      </li>
      `
    )
    .join("");

  cartList.innerHTML = rows;
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartSubtotal.textContent = formatPrice(subtotal);
  updateStats();
};

const renderOrders = () => {
  if (!(orderHistory instanceof HTMLElement)) return;

  if (!orders.length) {
    orderHistory.innerHTML = "";
    return;
  }

  const latestOrders = orders.slice(-3).reverse();
  orderHistory.innerHTML = latestOrders
    .map(
      (order) => `
      <article>
        <strong>Order #${order.id}</strong>
        <p>${order.name} • ${order.paymentMethod}</p>
        <p>${order.items.length} item(s) • ${formatPrice(order.total)}</p>
      </article>
      `
    )
    .join("");
};

const addToCart = (productId) => {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  setStatus(cartStatus, `${product.name} added to cart.`, "success");
  persistData();
  renderCart();
};

const removeFromCart = (productId) => {
  const existing = cart.find((item) => item.id === productId);
  cart = cart.filter((item) => item.id !== productId);
  if (existing) {
    setStatus(cartStatus, `${existing.name} removed from cart.`, "success");
  }
  persistData();
  renderCart();
};

const updateQuantity = (productId, value) => {
  const quantity = Number(value);
  const existingItem = cart.find((item) => item.id === productId);
  if (!Number.isFinite(quantity) || quantity < 1) {
    setStatus(cartStatus, "Quantity must be at least 1.", "error");
    const input = cartList?.querySelector(`input[data-qty-product="${productId}"]`);
    if (input instanceof HTMLInputElement && existingItem) {
      input.value = String(existingItem.quantity);
    }
    return;
  }

  cart = cart.map((item) => (item.id === productId ? { ...item, quantity } : item));
  persistData();
  renderCart();
};

const clearCart = () => {
  cart = [];
  persistData();
  renderCart();
  setStatus(cartStatus, "Cart has been cleared.", "success");
};

const updatePaymentDetailLabel = () => {
  if (!(paymentMethod instanceof HTMLSelectElement)) return;
  if (!(paymentDetail instanceof HTMLInputElement)) return;
  if (!(paymentDetailText instanceof HTMLElement)) return;

  const method = paymentMethod.value;

  if (method === "Cash on Delivery") {
    paymentDetail.placeholder = "Optional delivery instructions";
    paymentDetail.required = false;
    paymentDetailText.textContent = "Delivery Notes";
    return;
  }

  paymentDetail.required = true;
  if (method === "PayPal") {
    paymentDetail.placeholder = "PayPal email";
    paymentDetailText.textContent = "PayPal Account";
    return;
  }

  if (method === "Apple Pay") {
    paymentDetail.placeholder = "Apple Pay ID";
    paymentDetailText.textContent = "Apple Pay Details";
    return;
  }

  paymentDetail.placeholder = "Card number ending in...";
  paymentDetailText.textContent = "Card Details";
};

const createOrder = (formData) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const newOrder = {
    id: generateOrderId(),
    name: formData.get("name"),
    email: formData.get("email"),
    address: formData.get("address"),
    phone: formData.get("phone"),
    paymentMethod: formData.get("paymentMethod"),
    total: subtotal,
    items: cart,
  };

  orders.push(newOrder);
  cart = [];
  persistData();
  renderCart();
  renderOrders();
  updateStats();
  setStatus(
    checkoutStatus,
    `Order #${newOrder.id} placed successfully. Payment method: ${newOrder.paymentMethod}.`,
    "success"
  );
};

const assistantReplies = {
  greeting:
    "Hi! I'm your Lueur AI assistant. I can suggest perfumes, explain payment options, and help with your cart.",
  shipping: "We dispatch within 24 hours and share tracking details by email once your order is placed.",
  payment:
    "We support Card, PayPal, Apple Pay, and Cash on Delivery. Choose a method during checkout.",
  order: "To place an order: add items to cart, fill checkout details, choose payment method, and submit.",
  recommendation:
    "If you like warm scents, try Velour Elixir or Ember Atelier. For fresh daytime wear, pick Ciel Neroli.",
  cart: () => {
    if (!cart.length) return "Your cart is empty right now. Browse perfumes and click Add to Cart.";
    const summary = cart.map((item) => `${item.name} x${item.quantity}`).join(", ");
    return `Your cart currently has: ${summary}.`;
  },
};

const botAnswer = (message) => {
  const text = message.toLowerCase();

  if (text.includes("hello") || text.includes("hi")) return assistantReplies.greeting;
  if (text.includes("ship") || text.includes("delivery")) return assistantReplies.shipping;
  if (text.includes("pay") || text.includes("card")) return assistantReplies.payment;
  if (text.includes("recommend") || text.includes("best") || text.includes("suggest")) {
    return assistantReplies.recommendation;
  }
  if (text.includes("order") || text.includes("checkout")) return assistantReplies.order;
  if (text.includes("cart")) {
    return typeof assistantReplies.cart === "function" ? assistantReplies.cart() : "";
  }

  return "I can help with recommendations, cart details, shipping, and payments. Ask me anything about your shopping journey.";
};

const appendChatMessage = (content, role) => {
  if (!(chatWindow instanceof HTMLElement)) return;

  const message = document.createElement("div");
  message.className = `chat-message ${role}`;
  message.textContent = content;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
};

const setQuickQuestions = () => {
  if (!(quickQuestions instanceof HTMLElement)) return;

  const prompts = [
    "Recommend a perfume",
    "What payment methods do you support?",
    "How fast is shipping?",
    "Show my cart status",
  ];

  quickQuestions.innerHTML = prompts
    .map((prompt) => `<button type="button" data-prompt="${prompt}">${prompt}</button>`)
    .join("");
};

const bootstrap = () => {
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("open");
    });
  }

  if (categoryFilter instanceof HTMLSelectElement) {
    const categories = [...new Set(products.map((product) => product.category))];
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }

  productGrid?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const productId = target.getAttribute("data-add-product");
    if (productId) addToCart(productId);
  });

  cartList?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const productId = target.getAttribute("data-remove-product");
    if (productId) removeFromCart(productId);
  });

  cartList?.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    const productId = target.getAttribute("data-qty-product");
    if (productId) updateQuantity(productId, target.value);
  });

  clearCartButton?.addEventListener("click", clearCart);

  searchInput?.addEventListener("input", renderProducts);
  categoryFilter?.addEventListener("change", renderProducts);

  paymentMethod?.addEventListener("change", updatePaymentDetailLabel);

  checkoutForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!cart.length) {
      setStatus(checkoutStatus, "Add at least one item to cart before checkout.", "error");
      return;
    }

    if (!(checkoutForm instanceof HTMLFormElement)) return;
    const formData = new FormData(checkoutForm);
    const payment = String(formData.get("paymentMethod") || "").trim();
    const detail = String(formData.get("paymentDetail") || "").trim();

    if (!payment) {
      setStatus(checkoutStatus, "Please select a payment method.", "error");
      return;
    }

    if (payment !== "Cash on Delivery" && !detail) {
      setStatus(checkoutStatus, "Please provide valid payment details.", "error");
      return;
    }

    createOrder(formData);
    checkoutForm.reset();
    updatePaymentDetailLabel();
  });

  chatForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!(chatInput instanceof HTMLInputElement)) return;
    const message = chatInput.value.trim();
    if (!message) return;
    appendChatMessage(message, "user");
    appendChatMessage(botAnswer(message), "bot");
    chatInput.value = "";
  });

  quickQuestions?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const prompt = target.getAttribute("data-prompt");
    if (!prompt) return;
    appendChatMessage(prompt, "user");
    appendChatMessage(botAnswer(prompt), "bot");
  });

  renderProducts();
  renderCart();
  renderOrders();
  updateStats();
  updatePaymentDetailLabel();
  setQuickQuestions();
  appendChatMessage(assistantReplies.greeting, "bot");
};

bootstrap();
