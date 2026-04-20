// ===== GLOBAL STATE =====
let cart = [];
let chatbotState = 'idle';
let chatbotData = {};

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollAnimations();
    initCart();
    initChatbot();
    initSidebarFilters();
    initContactForm();
    initSizeButtons();
});

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
}

// ===== CART FUNCTIONALITY =====
function initCart() {
    const cartOverlay = document.getElementById('cartOverlay');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartClose = document.getElementById('cartClose');

    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }
}

function addToCart(name, price) {
    cart.push({ name, price, id: Date.now() });
    updateCartUI();
    openCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');

    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        if (cartFooter) cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Rs. ${item.price.toLocaleString()}</p>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">&times;</button>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        if (cartTotal) cartTotal.textContent = `Rs. ${total.toLocaleString()}`;
        if (cartFooter) cartFooter.style.display = 'block';
    }
}

function openCart() {
    const cartOverlay = document.getElementById('cartOverlay');
    const cartDrawer = document.getElementById('cartDrawer');
    if (cartOverlay) cartOverlay.classList.add('active');
    if (cartDrawer) cartDrawer.classList.add('active');
}

function closeCart() {
    const cartOverlay = document.getElementById('cartOverlay');
    const cartDrawer = document.getElementById('cartDrawer');
    if (cartOverlay) cartOverlay.classList.remove('active');
    if (cartDrawer) cartDrawer.classList.remove('active');
}

// ===== CHATBOT =====
function initChatbot() {
    const chatbotBtn = document.getElementById('chatbotBtn');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');

    if (!chatbotBtn) return;

    chatbotBtn.addEventListener('click', () => {
        chatbotWindow.classList.add('active');
        chatbotBtn.style.display = 'none';
        if (chatbotState === 'idle') {
            chatbotState = 'greeting';
            addBotMessage("Assalam o Alaikum! I'm here to help you find your perfect scent. 🌹");
            setTimeout(() => {
                showQuickReplies(['Browse Attars', 'Browse Oils', 'Gift Ideas', 'Place Order']);
            }, 500);
        }
    });

    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
        chatbotBtn.style.display = 'flex';
    });

    chatbotSend.addEventListener('click', sendUserMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendUserMessage();
    });
}

function sendUserMessage() {
    const input = document.getElementById('chatbotInput');
    const text = input.value.trim();
    if (!text) return;

    addUserMessage(text);
    input.value = '';
    clearQuickReplies();

    setTimeout(() => processUserInput(text), 600);
}

function addBotMessage(text) {
    const messages = document.getElementById('chatbotMessages');
    const msg = document.createElement('div');
    msg.className = 'chat-message bot';
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
}

function addUserMessage(text) {
    const messages = document.getElementById('chatbotMessages');
    const msg = document.createElement('div');
    msg.className = 'chat-message user';
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
}

function showQuickReplies(options) {
    const container = document.getElementById('chatbotQuickReplies');
    container.innerHTML = options.map(opt =>
        `<button class="quick-reply-btn" onclick="handleQuickReply('${opt}')">${opt}</button>`
    ).join('');
}

function clearQuickReplies() {
    const container = document.getElementById('chatbotQuickReplies');
    if (container) container.innerHTML = '';
}

function handleQuickReply(text) {
    addUserMessage(text);
    clearQuickReplies();
    setTimeout(() => processUserInput(text), 600);
}

function processUserInput(text) {
    const lower = text.toLowerCase();

    switch (chatbotState) {
        case 'greeting':
            if (lower.includes('attar')) {
                addBotMessage("We have a wonderful collection of attars! Our best sellers are Mughal Oud (Rs. 3,500) and Oud Al Taif (Rs. 4,800). Would you like to visit our shop?");
                showQuickReplies(['Visit Shop', 'Place Order', 'More Info']);
            } else if (lower.includes('oil')) {
                addBotMessage("Our perfume oils are 100% organic! Try Office Musk (Rs. 1,800) or Saffron Gold (Rs. 6,500). Pure and long-lasting!");
                showQuickReplies(['Visit Shop', 'Place Order', 'More Info']);
            } else if (lower.includes('gift')) {
                addBotMessage("Looking for a gift? Our Classic Burner Set (Rs. 1,800) comes in beautiful packaging — perfect for any occasion! 🎁");
                showQuickReplies(['Order Gift Set', 'Browse More', 'Place Order']);
            } else if (lower.includes('order') || lower.includes('place')) {
                chatbotState = 'ask_scent';
                addBotMessage("Great! Let's find the perfect fragrance for you. What scent family do you prefer?");
                showQuickReplies(['Woody', 'Floral', 'Musky']);
            } else if (lower.includes('shop') || lower.includes('visit')) {
                addBotMessage("You can browse our full collection on the Shop page. Let me know if you need help choosing!");
                showQuickReplies(['Browse Attars', 'Browse Oils', 'Place Order']);
            } else {
                addBotMessage("I'd love to help you! You can browse our collection or I can help you place an order. What would you like?");
                showQuickReplies(['Browse Attars', 'Browse Oils', 'Gift Ideas', 'Place Order']);
            }
            break;

        case 'ask_scent':
            chatbotData.scent = text;
            chatbotState = 'ask_budget';
            addBotMessage(`${text} fragrances are lovely! What's your budget range?`);
            showQuickReplies(['Under Rs. 2,000', 'Rs. 2,000 - 4,000', 'Above Rs. 4,000']);
            break;

        case 'ask_budget':
            chatbotData.budget = text;
            chatbotState = 'ask_size';
            addBotMessage("What size would you prefer?");
            showQuickReplies(['6ml', '12ml', '20ml']);
            break;

        case 'ask_size':
            chatbotData.size = text;
            chatbotState = 'ask_name';
            addBotMessage("Perfect choice! Please share your name so we can prepare your order.");
            break;

        case 'ask_name':
            chatbotData.name = text;
            chatbotState = 'ask_whatsapp';
            addBotMessage(`Thank you, ${text}! Please share your WhatsApp number and we'll contact you to confirm the order.`);
            break;

        case 'ask_whatsapp':
            chatbotData.whatsapp = text;
            chatbotState = 'done';
            addBotMessage(`Thank you, ${chatbotData.name}! We'll contact you on WhatsApp shortly to confirm your order. 🌟\n\nOrder Summary:\n• Scent: ${chatbotData.scent}\n• Budget: ${chatbotData.budget}\n• Size: ${chatbotData.size}`);
            setTimeout(() => {
                addBotMessage("Is there anything else I can help you with?");
                showQuickReplies(['Browse More', 'No, Thank You']);
            }, 1000);
            break;

        case 'done':
            if (lower.includes('no') || lower.includes('thank')) {
                addBotMessage("Thank you for choosing Fragrance House! Have a blessed day. 🌹");
            } else {
                chatbotState = 'greeting';
                processUserInput(text);
            }
            break;

        default:
            chatbotState = 'greeting';
            processUserInput(text);
    }
}

// ===== SIDEBAR FILTERS (SHOP PAGE) =====
function initSidebarFilters() {
    const sidebar = document.getElementById('filterSidebar');
    if (!sidebar) return;

    const filterToggleBtn = document.getElementById('filterToggleBtn');
    const sidebarClose = document.getElementById('sidebarClose');
    const filterOverlay = document.getElementById('filterOverlay');
    const clearFilters = document.getElementById('clearFilters');
    const searchFilter = document.getElementById('searchFilter');
    const searchFilterMobile = document.getElementById('searchFilterMobile');

    // Toggle sections
    sidebar.querySelectorAll('.filter-section-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('.toggle-icon');
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !isExpanded);
            content.classList.toggle('collapsed');
            icon.textContent = isExpanded ? '+' : '−';
        });
    });

    // Checkbox filter changes
    sidebar.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', applySidebarFilters);
    });

    // Search
    if (searchFilter) {
        searchFilter.addEventListener('input', applySidebarFilters);
    }
    if (searchFilterMobile) {
        searchFilterMobile.addEventListener('input', () => {
            if (searchFilter) searchFilter.value = searchFilterMobile.value;
            applySidebarFilters();
        });
    }

    // Mobile toggle
    if (filterToggleBtn) {
        filterToggleBtn.addEventListener('click', () => {
            sidebar.classList.add('active');
            filterOverlay.classList.add('active');
        });
    }

    // Close sidebar
    function closeSidebar() {
        sidebar.classList.remove('active');
        filterOverlay.classList.remove('active');
    }

    if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
    if (filterOverlay) filterOverlay.addEventListener('click', closeSidebar);

    // Clear all
    if (clearFilters) {
        clearFilters.addEventListener('click', () => {
            sidebar.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                cb.checked = false;
            });
            if (searchFilter) searchFilter.value = '';
            if (searchFilterMobile) searchFilterMobile.value = '';
            applySidebarFilters();
        });
    }
}

function applySidebarFilters() {
    const cards = document.querySelectorAll('#shopGrid .product-card');
    const searchFilter = document.getElementById('searchFilter');
    const search = searchFilter ? searchFilter.value.toLowerCase() : '';

    // Gather all checked filters grouped by data-filter attribute
    const activeFilters = {};
    document.querySelectorAll('.filter-sidebar input[type="checkbox"]:checked').forEach(cb => {
        const filterGroup = cb.dataset.filter;
        const filterValue = cb.value;
        if (!activeFilters[filterGroup]) activeFilters[filterGroup] = [];
        activeFilters[filterGroup].push(filterValue);
    });

    cards.forEach(card => {
        const cardName = (card.dataset.name || '').toLowerCase();
        let matchSearch = !search || cardName.includes(search);

        let matchAllFilters = true;

        for (const [group, values] of Object.entries(activeFilters)) {
            const cardData = (card.dataset[group] || '').toLowerCase();
            // Split card data into individual tokens and match against selected values
            const cardTokens = cardData.split(/\s+/).filter(Boolean);
            const matchGroup = values.some(val =>
                cardTokens.some(token => token === val)
            );
            if (!matchGroup) {
                matchAllFilters = false;
                break;
            }
        }

        card.style.display = (matchSearch && matchAllFilters) ? '' : 'none';
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formBtn = form.querySelector('button[type="submit"]');

        formBtn.textContent = 'Message Sent! ✓';
        formBtn.style.background = '#25D366';

        setTimeout(() => {
            formBtn.textContent = 'Send Message';
            formBtn.style.background = '';
            form.reset();
        }, 3000);
    });
}

// ===== SIZE BUTTONS =====
function initSizeButtons() {
    document.querySelectorAll('.size-options').forEach(group => {
        group.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                group.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    });
}
