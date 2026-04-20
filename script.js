/* ===================================================
   PARC DE FARIS — Main JavaScript
   =================================================== */

'use strict';

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
if (navbar) {
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ===== FADE UP ON SCROLL ===== */
const fadeEls = document.querySelectorAll('.fade-up');
if (fadeEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => observer.observe(el));
}

/* ===== SIZE BUTTONS ===== */
document.querySelectorAll('.size-opts').forEach(group => {
  group.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      group.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});

/* ===== CART ===== */
let cart = [];

function updateCartUI() {
  const badge = document.getElementById('cartBadge');
  const list = document.getElementById('cartItemsList');
  const footer = document.getElementById('cartFooter');
  const total = document.getElementById('cartTotal');
  if (!list) return;

  if (badge) {
    badge.textContent = cart.length;
    badge.classList.toggle('show', cart.length > 0);
  }

  if (cart.length === 0) {
    list.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    if (footer) footer.style.display = 'none';
  } else {
    list.innerHTML = cart.map((item, i) => `
      <div class="cart-item">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>Rs. ${item.price.toLocaleString()}</p>
        </div>
        <button class="cart-item-del" onclick="removeFromCart(${i})" aria-label="Remove">&times;</button>
      </div>
    `).join('');
    if (footer) footer.style.display = 'block';
    const sum = cart.reduce((a, b) => a + b.price, 0);
    if (total) total.textContent = 'Rs. ' + sum.toLocaleString();
  }
}

window.addToCart = function(name, price) {
  cart.push({ name, price });
  updateCartUI();
  openCart();
};

window.removeFromCart = function(idx) {
  cart.splice(idx, 1);
  updateCartUI();
};

function openCart() {
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');
  if (overlay && drawer) {
    overlay.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeCart() {
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');
  if (overlay && drawer) {
    overlay.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }
}

const cartBtn = document.getElementById('cartBtn');
const cartClose = document.getElementById('cartClose');
const cartOverlay = document.getElementById('cartOverlay');
if (cartBtn) cartBtn.addEventListener('click', openCart);
if (cartClose) cartClose.addEventListener('click', closeCart);
if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

/* ===== COUNTDOWN TIMER ===== */
const cdTarget = new Date();
cdTarget.setDate(cdTarget.getDate() + 7);
cdTarget.setHours(23, 59, 59, 0);

function updateCountdown() {
  const now = new Date();
  const diff = cdTarget - now;
  if (diff <= 0) return;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  const pad = n => String(n).padStart(2, '0');
  const d = document.getElementById('cd-days');
  const h = document.getElementById('cd-hours');
  const m = document.getElementById('cd-mins');
  const s = document.getElementById('cd-secs');
  if (d) d.textContent = pad(days);
  if (h) h.textContent = pad(hours);
  if (m) m.textContent = pad(mins);
  if (s) s.textContent = pad(secs);
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ===== SHOP FILTERS ===== */
const productGrid = document.getElementById('productGrid');
const noResults = document.getElementById('noResults');
const shopCount = document.getElementById('shopCount');

function getActiveFilters() {
  const checked = Array.from(document.querySelectorAll('#filterSidebar input[type="checkbox"]:checked, #filterDrawer input[type="checkbox"]:checked'));
  return [...new Set(checked.map(cb => cb.dataset.filter))];
}

function getSearchTerm() {
  const s = document.getElementById('searchInput');
  const sm = document.getElementById('searchInputMobile');
  return (s ? s.value : '') || (sm ? sm.value : '');
}

function applyFilters() {
  if (!productGrid) return;
  const activeFilters = getActiveFilters();
  const searchTerm = getSearchTerm().toLowerCase().trim();
  const cards = productGrid.querySelectorAll('.product-card');
  let visible = 0;

  cards.forEach(card => {
    const tags = (card.dataset.tags || '').toLowerCase();
    const name = (card.querySelector('h3')?.textContent || '').toLowerCase();
    const badge = (card.querySelector('.pc-badge')?.textContent || '').toLowerCase();

    const matchesSearch = !searchTerm || name.includes(searchTerm) || badge.includes(searchTerm) || tags.includes(searchTerm);
    const matchesFilters = activeFilters.length === 0 || activeFilters.every(f => {
      const tagWords = tags.split(/\s+/);
      return tagWords.includes(f);
    });

    const show = matchesSearch && matchesFilters;
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });

  if (shopCount) shopCount.textContent = `Showing ${visible} product${visible !== 1 ? 's' : ''}`;
  if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
}

function clearFilters() {
  document.querySelectorAll('input[type="checkbox"][data-filter]').forEach(cb => { cb.checked = false; });
  const s1 = document.getElementById('searchInput');
  const s2 = document.getElementById('searchInputMobile');
  if (s1) s1.value = '';
  if (s2) s2.value = '';
  applyFilters();
}

document.querySelectorAll('input[type="checkbox"][data-filter]').forEach(cb => {
  cb.addEventListener('change', () => {
    // Sync checkboxes with same data-filter across sidebar and drawer
    const val = cb.dataset.filter;
    document.querySelectorAll(`input[type="checkbox"][data-filter="${val}"]`).forEach(other => {
      other.checked = cb.checked;
    });
    applyFilters();
  });
});

['searchInput', 'searchInputMobile'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', applyFilters);
});

const clearBtn = document.getElementById('clearFilters');
const clearBtnM = document.getElementById('clearFiltersMobile');
if (clearBtn) clearBtn.addEventListener('click', clearFilters);
if (clearBtnM) clearBtnM.addEventListener('click', clearFilters);

/* ===== FILTER GROUP TOGGLES ===== */
document.querySelectorAll('.fgroup-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    const opts = btn.nextElementSibling;
    if (opts) opts.classList.toggle('collapsed', expanded);
  });
});

/* ===== MOBILE FILTER DRAWER ===== */
const mobileFilterBtn = document.getElementById('mobileFilterBtn');
const filterDrawer = document.getElementById('filterDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawerClose = document.getElementById('drawerClose');

function openDrawer() {
  if (!filterDrawer || !drawerOverlay) return;
  filterDrawer.classList.add('open');
  drawerOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  if (!filterDrawer || !drawerOverlay) return;
  filterDrawer.classList.remove('open');
  drawerOverlay.classList.remove('show');
  document.body.style.overflow = '';
}

if (mobileFilterBtn) mobileFilterBtn.addEventListener('click', openDrawer);
if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

/* ===== CONTACT FORM ===== */
window.handleContactForm = function(e) {
  e.preventDefault();
  const msg = document.getElementById('formSuccess');
  if (msg) { msg.style.display = 'block'; e.target.reset(); }
};

/* ===== CHATBOT ===== */
const chatbotFab = document.getElementById('chatbotFab');
const chatbotWin = document.getElementById('chatbotWin');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMsgs = document.getElementById('chatbotMsgs');
const chatbotQR = document.getElementById('chatbotQR');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');

let chatbotStep = 0;
let chatbotData = {};

const chatbotFlow = [
  {
    bot: "Bonjour! 🌙 Welcome to Parc de Faris.\n\nAre you looking for a fragrance for yourself or as a gift?",
    replies: ["For Myself", "As a Gift", "Browse Collection", "Place Order"]
  },
  {
    bot: "Wonderful! What type of scent do you prefer?",
    replies: ["Oud / Arabic", "Fresh / Light", "Floral / Rose", "Woody / Amber", "Sweet / Fruity"]
  },
  {
    bot: "Great choice! What is your budget range?",
    replies: ["Under Rs. 2,000", "Rs. 2,000 – Rs. 4,000", "Rs. 4,000 – Rs. 7,000", "No limit — best quality"]
  },
  {
    bot: "Perfect! To complete your order, please share your WhatsApp number and we'll send you the details. 🛍️",
    replies: []
  }
];

function addMsg(text, sender) {
  if (!chatbotMsgs) return;
  const div = document.createElement('div');
  div.className = `cmsg ${sender}`;
  div.textContent = text;
  chatbotMsgs.appendChild(div);
  chatbotMsgs.scrollTop = chatbotMsgs.scrollHeight;
}

function showReplies(replies) {
  if (!chatbotQR) return;
  chatbotQR.innerHTML = '';
  replies.forEach(r => {
    const btn = document.createElement('button');
    btn.className = 'qr-btn';
    btn.textContent = r;
    btn.addEventListener('click', () => handleReply(r));
    chatbotQR.appendChild(btn);
  });
}

function handleReply(text) {
  addMsg(text, 'user');
  chatbotData['reply_' + chatbotStep] = text;
  chatbotQR.innerHTML = '';
  chatbotStep++;

  if (text === 'Browse Collection') {
    setTimeout(() => { addMsg("Sure! You can browse all our products on the shop page. Click here → shop.html", 'bot'); }, 600);
    return;
  }
  if (text === 'Place Order') {
    setTimeout(() => {
      addMsg("To place an order, tap the WhatsApp button below and we'll assist you immediately! 🛍️", 'bot');
      const btn = document.createElement('a');
      btn.href = 'https://wa.me/923001234567?text=I+want+to+place+an+order+from+Parc+de+Faris';
      btn.target = '_blank';
      btn.rel = 'noopener';
      btn.textContent = '💬 Order on WhatsApp';
      btn.style.cssText = 'display:block;margin:8px 18px;padding:10px 16px;background:#25D366;color:#fff;border-radius:20px;text-align:center;font-size:0.85rem;';
      chatbotMsgs.appendChild(btn);
      chatbotMsgs.scrollTop = chatbotMsgs.scrollHeight;
    }, 600);
    return;
  }

  const step = chatbotFlow[chatbotStep];
  if (step) {
    setTimeout(() => {
      addMsg(step.bot, 'bot');
      if (step.replies.length) showReplies(step.replies);
    }, 700);
  } else {
    setTimeout(() => {
      addMsg("Thank you! Our team will reach out to you on WhatsApp shortly. Have a wonderful day! 🌙", 'bot');
    }, 700);
  }
}

function handleUserInput() {
  const val = chatbotInput?.value?.trim();
  if (!val) return;
  chatbotInput.value = '';
  addMsg(val, 'user');
  chatbotQR.innerHTML = '';

  // Simple phone number detection
  if (/\d{10,}/.test(val.replace(/\s/g, ''))) {
    setTimeout(() => {
      addMsg("Thank you! We've saved your number. Our team will contact you on WhatsApp within a few minutes. 🎁", 'bot');
    }, 700);
    return;
  }

  setTimeout(() => {
    addMsg("Thank you for your message! For faster assistance, please use the quick reply buttons or contact us on WhatsApp. 💬", 'bot');
  }, 700);
}

if (chatbotFab) {
  chatbotFab.addEventListener('click', () => {
    chatbotWin.classList.toggle('open');
    if (chatbotWin.classList.contains('open') && chatbotMsgs && chatbotMsgs.children.length === 0) {
      setTimeout(() => {
        addMsg(chatbotFlow[0].bot, 'bot');
        showReplies(chatbotFlow[0].replies);
      }, 400);
    }
  });
}

if (chatbotClose) chatbotClose.addEventListener('click', () => chatbotWin?.classList.remove('open'));

if (chatbotSend) chatbotSend.addEventListener('click', handleUserInput);
if (chatbotInput) {
  chatbotInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleUserInput(); });
}
