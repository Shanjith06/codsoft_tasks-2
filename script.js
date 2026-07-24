/* ==========================================================================
   URBANCART — CORE SCRIPT
   Product data + navigation, search, modal, reveal animations, misc UI
   ========================================================================== */

/* ---------------------------------------------------------------------
   PRODUCT DATA (shared across shop / product / cart / home pages)
   --------------------------------------------------------------------- */
const PRODUCTS = [
  { id: 1,  name: "Aria Cropped Puffer Jacket",     cat: "Women",       price: 89.99,  old: 129.99, rating: 4.6, reviews: 128, badge: "sale", seed: "urban-1",  desc: "A lightweight cropped puffer with a matte finish shell and recycled fill, cut for a boxy silhouette that layers over anything." },
  { id: 2,  name: "Nova Trail Running Sneaker",     cat: "Footwear",    price: 74.50,  old: 0,      rating: 4.8, reviews: 342, badge: "hot",  seed: "urban-2",  desc: "Responsive foam midsole with a grippy multi-surface outsole, built for daily miles on pavement or trail." },
  { id: 3,  name: "Fold Leather Card Wallet",       cat: "Accessories", price: 34.00,  old: 48.00,  rating: 4.4, reviews: 89,  badge: "sale", seed: "urban-3",  desc: "Full-grain leather bifold with five card slots and a hidden bill pocket, aging to a deeper patina over time." },
  { id: 4,  name: "Echo Wireless Overear Headphones", cat: "Electronics", price: 129.00, old: 179.00, rating: 4.7, reviews: 512, badge: "sale", seed: "urban-4",  desc: "Active noise cancellation with 38-hour battery life and plush memory-foam ear cushions for all-day listening." },
  { id: 5,  name: "Drift Oversized Hoodie",         cat: "Men",         price: 54.00,  old: 0,      rating: 4.5, reviews: 201, badge: "new",  seed: "urban-5",  desc: "Heavyweight 400gsm brushed fleece with a dropped shoulder cut and kangaroo pocket." },
  { id: 6,  name: "Halo Structured Tote Bag",       cat: "Bags",        price: 68.00,  old: 92.00,  rating: 4.3, reviews: 76,  badge: "sale", seed: "urban-6",  desc: "Vegetable-tanned canvas tote reinforced with leather straps, roomy enough for a 15-inch laptop." },
  { id: 7,  name: "Cove Linen Blend Shirt",         cat: "Men",         price: 44.99,  old: 0,      rating: 4.2, reviews: 64,  badge: "",     seed: "urban-7",  desc: "Breathable linen-cotton blend with a relaxed fit, perfect for warm-weather layering." },
  { id: 8,  name: "Lumen Smart Fitness Band",       cat: "Electronics", price: 39.99,  old: 59.99,  rating: 4.1, reviews: 233, badge: "sale", seed: "urban-8",  desc: "Tracks heart rate, sleep and 20+ workout modes with a 10-day battery and AMOLED display." },
  { id: 9,  name: "Rivet Selvedge Denim Jeans",     cat: "Men",         price: 79.00,  old: 0,      rating: 4.6, reviews: 178, badge: "new",  seed: "urban-9",  desc: "Rigid 13oz selvedge denim, straight taper fit that molds to the wearer over time." },
  { id: 10, name: "Solstice Satin Slip Dress",      cat: "Women",       price: 62.00,  old: 88.00,  rating: 4.7, reviews: 145, badge: "sale", seed: "urban-10", desc: "Bias-cut satin slip dress with adjustable straps, equally at home at dinner or dressed down." },
  { id: 11, name: "Peak Insulated Water Bottle",    cat: "Accessories", price: 22.50,  old: 0,      rating: 4.5, reviews: 410, badge: "",     seed: "urban-11", desc: "Double-wall vacuum insulation keeps drinks cold 24 hours or hot for 12, in an 750ml stainless body." },
  { id: 12, name: "Vertex Mechanical Keyboard",     cat: "Electronics", price: 99.00,  old: 139.00, rating: 4.8, reviews: 287, badge: "hot",  seed: "urban-12", desc: "Hot-swappable switches with a CNC aluminum frame and per-key RGB backlighting." },
  { id: 13, name: "Marle Knit Beanie",              cat: "Accessories", price: 18.00,  old: 0,      rating: 4.0, reviews: 55,  badge: "",     seed: "urban-13", desc: "Ribbed marled wool blend beanie with a folded cuff, one size fits most." },
  { id: 14, name: "Terra Suede Chelsea Boot",       cat: "Footwear",    price: 108.00, old: 145.00, rating: 4.6, reviews: 162, badge: "sale", seed: "urban-14", desc: "Water-resistant suede uppers on a stacked rubber sole with elastic side gussets." },
  { id: 15, name: "Field Utility Crossbody Bag",    cat: "Bags",        price: 46.00,  old: 0,      rating: 4.3, reviews: 98,  badge: "new",  seed: "urban-15", desc: "Water-resistant nylon crossbody with adjustable strap and four organizer pockets." },
  { id: 16, name: "Cirrus Quilted Vest",            cat: "Women",       price: 58.00,  old: 79.00,  rating: 4.4, reviews: 121, badge: "sale", seed: "urban-16", desc: "Diamond-quilted vest with a stand collar, packable into its own zip pocket." },
  { id: 17, name: "Glide Performance Sunglasses",   cat: "Accessories", price: 49.00,  old: 0,      rating: 4.5, reviews: 134, badge: "",     seed: "urban-17", desc: "Polarized lenses with a lightweight TR-90 frame that flexes without losing shape." },
  { id: 18, name: "Basecamp Canvas Sneaker",        cat: "Footwear",    price: 42.00,  old: 58.00,  rating: 4.2, reviews: 187, badge: "sale", seed: "urban-18", desc: "Durable cotton canvas upper on a vulcanized rubber sole for everyday wear." },
  { id: 19, name: "Motion Zip-Through Track Jacket",cat: "Men",         price: 64.00,  old: 0,      rating: 4.3, reviews: 92,  badge: "new",  seed: "urban-19", desc: "Brushed-back tricot track jacket with contrast piping and zip side pockets." },
  { id: 20, name: "Bloom Wide-Leg Trousers",        cat: "Women",       price: 56.00,  old: 74.00,  rating: 4.5, reviews: 108, badge: "sale", seed: "urban-20", desc: "High-rise wide-leg trousers in a fluid drape fabric with a concealed elastic back waist." },
  { id: 21, name: "Pulse Bluetooth Speaker",        cat: "Electronics", price: 54.00,  old: 0,      rating: 4.4, reviews: 265, badge: "",     seed: "urban-21", desc: "IPX7 waterproof speaker with 360-degree sound and a 16-hour battery." },
  { id: 22, name: "Anchor Leather Belt",            cat: "Accessories", price: 28.00,  old: 36.00,  rating: 4.1, reviews: 47,  badge: "sale", seed: "urban-22", desc: "Full-grain leather belt with a matte brushed buckle, trimmable to fit." },
  { id: 23, name: "Summit Hooded Rain Shell",       cat: "Men",         price: 96.00,  old: 132.00, rating: 4.7, reviews: 156, badge: "sale", seed: "urban-23", desc: "Fully seam-taped waterproof shell with pit zips and a stowable hood." },
  { id: 24, name: "Wren Ribbed Tank Top",           cat: "Women",       price: 24.00,  old: 0,      rating: 4.0, reviews: 66,  badge: "",     seed: "urban-24", desc: "Fitted ribbed jersey tank in a soft cotton-modal blend, a warm-weather staple." },
];

// Convenience helpers
function productImage(seed, size = 600){
  return `https://picsum.photos/seed/${seed}/${size}/${size}`;
}
function productGallery(product){
  return [1,2,3,4].map(n => productImage(product.seed + "-" + n, 700));
}
function formatPrice(n){ return "$" + n.toFixed(2); }
function starString(rating){
  const full = Math.round(rating);
  return "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(0, 5 - full);
}
function discountPct(price, old){
  if(!old || old <= price) return 0;
  return Math.round(((old - price) / old) * 100);
}
function getProductById(id){ return PRODUCTS.find(p => p.id === Number(id)); }

/* ---------------------------------------------------------------------
   LOADING SCREEN
   --------------------------------------------------------------------- */
window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");
  if(!loader) return;
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
    setTimeout(() => loader.remove(), 500);
  }, 600);
});

/* ---------------------------------------------------------------------
   NAVBAR: scroll shrink/hide + active link
   --------------------------------------------------------------------- */
(function navbarBehavior(){
  const nav = document.getElementById("navbar");
  if(!nav) return;
  let lastY = window.scrollY;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    nav.classList.toggle("nav-scrolled", y > 10);
    if(y > lastY && y > 160){
      nav.classList.add("nav-hidden");
    } else {
      nav.classList.remove("nav-hidden");
    }
    lastY = y;
    toggleBackToTop();
  }, { passive: true });

  // Highlight current page link
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-drawer a").forEach(a => {
    const href = a.getAttribute("href");
    if(href === path || (path === "" && href === "index.html")){
      a.classList.add("active");
    }
  });
})();

/* ---------------------------------------------------------------------
   MOBILE DRAWER
   --------------------------------------------------------------------- */
(function mobileDrawer(){
  const hamburger = document.getElementById("hamburger");
  const drawer = document.getElementById("mobile-drawer");
  const backdrop = document.getElementById("drawer-backdrop");
  if(!hamburger || !drawer) return;

  function openDrawer(){
    hamburger.classList.add("open");
    drawer.classList.add("open");
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeDrawer(){
    hamburger.classList.remove("open");
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
  }
  hamburger.addEventListener("click", () => {
    drawer.classList.contains("open") ? closeDrawer() : openDrawer();
  });
  backdrop.addEventListener("click", closeDrawer);
  drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", closeDrawer));
})();

/* ---------------------------------------------------------------------
   SEARCH OVERLAY
   --------------------------------------------------------------------- */
(function searchOverlay(){
  const trigger = document.getElementById("search-trigger");
  const overlay = document.getElementById("search-overlay");
  const closeBtn = document.getElementById("search-close");
  const input = document.getElementById("search-input");
  const results = document.getElementById("search-results");
  if(!trigger || !overlay) return;

  function open(){
    overlay.classList.add("active");
    setTimeout(() => input.focus(), 150);
  }
  function close(){
    overlay.classList.remove("active");
    input.value = "";
    if(results) results.innerHTML = "";
  }
  trigger.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", e => { if(e.target === overlay) close(); });
  document.addEventListener("keydown", e => { if(e.key === "Escape") close(); });

  if(input){
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      if(!results) return;
      if(q.length < 1){ results.innerHTML = ""; return; }
      const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q)).slice(0, 6);
      results.innerHTML = matches.length ? matches.map(p => `
        <a href="product.html?id=${p.id}" class="search-result-item">
          <img src="${productImage(p.seed, 100)}" alt="${p.name}">
          <div>
            <div class="sr-name">${p.name}</div>
            <div class="sr-price">${formatPrice(p.price)}</div>
          </div>
        </a>`).join("") : `<p class="sr-empty">No products found for "${q}"</p>`;
    });
  }
})();

/* ---------------------------------------------------------------------
   BACK TO TOP
   --------------------------------------------------------------------- */
function toggleBackToTop(){
  const btn = document.getElementById("back-to-top");
  if(!btn) return;
  btn.classList.toggle("show", window.scrollY > 500);
}
document.getElementById("back-to-top")?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------------------------------------------------------------------
   REVEAL ON SCROLL
   --------------------------------------------------------------------- */
(function revealOnScroll(){
  const els = document.querySelectorAll(".reveal");
  if(!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
})();

/* ---------------------------------------------------------------------
   ANIMATED COUNTERS
   --------------------------------------------------------------------- */
(function animatedCounters(){
  const counters = document.querySelectorAll("[data-count]");
  if(!counters.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const duration = 1400;
      const start = performance.now();
      function tick(now){
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        el.textContent = (target % 1 === 0 ? Math.floor(val) : val.toFixed(1)) + suffix;
        if(p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => io.observe(el));
})();

/* ---------------------------------------------------------------------
   TOAST NOTIFICATIONS
   --------------------------------------------------------------------- */
function showToast(message, icon = "fa-circle-check"){
  let container = document.getElementById("toast-container");
  if(!container){
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid ${icon} toast-icon"></i><span>${message}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 2600);
}

/* ---------------------------------------------------------------------
   WISHLIST (localStorage-free, session-based demo state via window var + persisted in localStorage for continuity)
   --------------------------------------------------------------------- */
const Wishlist = {
  key: "urbancart_wishlist_demo",
  get(){ try{ return JSON.parse(localStorage.getItem(this.key)) || []; }catch(e){ return []; } },
  set(list){ localStorage.setItem(this.key, JSON.stringify(list)); },
  has(id){ return this.get().includes(Number(id)); },
  toggle(id){
    id = Number(id);
    let list = this.get();
    if(list.includes(id)){ list = list.filter(x => x !== id); }
    else { list.push(id); }
    this.set(list);
    this.updateBadge();
    return list.includes(id);
  },
  updateBadge(){
    const count = this.get().length;
    document.querySelectorAll(".wishlist-count").forEach(el => el.textContent = count);
  }
};
document.addEventListener("DOMContentLoaded", () => Wishlist.updateBadge());

document.getElementById("wishlist-trigger")?.addEventListener("click", () => {
  const items = Wishlist.get();
  if(items.length === 0){
    showToast("Your wishlist is empty", "fa-heart-crack");
  } else {
    const names = items.map(id => getProductById(id)?.name).filter(Boolean).slice(0, 3).join(", ");
    showToast(`Wishlist (${items.length}): ${names}${items.length > 3 ? "…" : ""}`, "fa-heart");
  }
});

/* ---------------------------------------------------------------------
   QUICK VIEW MODAL
   --------------------------------------------------------------------- */
function openQuickView(id){
  const p = getProductById(id);
  if(!p) return;
  const overlay = document.getElementById("quick-view-modal");
  if(!overlay) return;
  const discount = discountPct(p.price, p.old);
  overlay.querySelector(".modal-img img").src = productImage(p.seed, 700);
  overlay.querySelector(".qv-cat").textContent = p.cat;
  overlay.querySelector(".qv-name").textContent = p.name;
  overlay.querySelector(".qv-stars").textContent = starString(p.rating);
  overlay.querySelector(".qv-reviews").textContent = `(${p.reviews} reviews)`;
  overlay.querySelector(".qv-price-now").textContent = formatPrice(p.price);
  const oldEl = overlay.querySelector(".qv-price-old");
  if(p.old > 0){ oldEl.textContent = formatPrice(p.old); oldEl.style.display = "inline"; }
  else { oldEl.style.display = "none"; }
  overlay.querySelector(".qv-desc").textContent = p.desc;
  overlay.querySelector(".qv-view-link").href = `product.html?id=${p.id}`;
  overlay.dataset.productId = p.id;
  const qtyInput = overlay.querySelector(".qty-control input");
  if(qtyInput) qtyInput.value = 1;
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeQuickView(){
  const overlay = document.getElementById("quick-view-modal");
  if(!overlay) return;
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}
document.getElementById("quick-view-modal")?.addEventListener("click", e => {
  if(e.target.id === "quick-view-modal") closeQuickView();
});

/* ---------------------------------------------------------------------
   FAQ ACCORDION
   --------------------------------------------------------------------- */
document.querySelectorAll(".faq-item").forEach(item => {
  const q = item.querySelector(".faq-q");
  const a = item.querySelector(".faq-a");
  q?.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach(other => {
      if(other !== item){
        other.classList.remove("open");
        other.querySelector(".faq-a").style.maxHeight = null;
      }
    });
    item.classList.toggle("open", !isOpen);
    a.style.maxHeight = !isOpen ? a.scrollHeight + "px" : null;
  });
});

/* ---------------------------------------------------------------------
   NEWSLETTER + CONTACT FORM (frontend-only demo submission)
   --------------------------------------------------------------------- */
document.getElementById("newsletter-form")?.addEventListener("submit", e => {
  e.preventDefault();
  showToast("Subscribed! Welcome to the UrbanCart list.", "fa-envelope-open-text");
  e.target.reset();
});
document.getElementById("contact-form")?.addEventListener("submit", e => {
  e.preventDefault();
  showToast("Message sent — we'll reply within 24 hours.", "fa-paper-plane");
  e.target.reset();
});

/* ---------------------------------------------------------------------
   COUNTDOWN TIMER (offer banner)
   --------------------------------------------------------------------- */
(function countdown(){
  const els = document.querySelectorAll("[data-countdown]");
  if(!els.length) return;
  let target = Date.now() + 1000 * (3600 * 26 + 60 * 42); // demo: ~26h42m from load
  els.forEach(container => {
    function render(){
      let diff = Math.max(0, target - Date.now());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const boxes = container.querySelectorAll(".cd-box b");
      if(boxes[0]) boxes[0].textContent = String(h).padStart(2,"0");
      if(boxes[1]) boxes[1].textContent = String(m).padStart(2,"0");
      if(boxes[2]) boxes[2].textContent = String(s).padStart(2,"0");
    }
    render();
    setInterval(render, 1000);
  });
})();

/* ---------------------------------------------------------------------
   TAB SWITCHER (product details page)
   --------------------------------------------------------------------- */
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const group = btn.closest(".tabs-wrap");
    group.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    group.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    group.querySelector(`#${btn.dataset.tab}`).classList.add("active");
  });
});

/* ---------------------------------------------------------------------
   SMOOTH SCROLL for in-page anchors
   --------------------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const id = a.getAttribute("href");
    if(id.length < 2) return;
    const target = document.querySelector(id);
    if(target){
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 90, behavior: "smooth" });
    }
  });
});
