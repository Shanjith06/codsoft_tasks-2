/* ==========================================================================
   URBANCART — CART & PRODUCT CARD RENDERING
   ========================================================================== */

const Cart = {
  key: "urbancart_cart_demo",
  get(){ try{ return JSON.parse(localStorage.getItem(this.key)) || []; }catch(e){ return []; } },
  set(items){ localStorage.setItem(this.key, JSON.stringify(items)); this.updateBadge(); },
  itemCount(){ return this.get().reduce((sum, i) => sum + i.qty, 0); },
  add(id, qty = 1){
    id = Number(id);
    const items = this.get();
    const existing = items.find(i => i.id === id);
    if(existing){ existing.qty += qty; }
    else { items.push({ id, qty }); }
    this.set(items);
  },
  updateQty(id, qty){
    id = Number(id);
    let items = this.get();
    if(qty <= 0){ items = items.filter(i => i.id !== id); }
    else {
      const existing = items.find(i => i.id === id);
      if(existing) existing.qty = qty;
    }
    this.set(items);
  },
  remove(id){
    id = Number(id);
    this.set(this.get().filter(i => i.id !== id));
  },
  clear(){ this.set([]); },
  detailed(){
    return this.get().map(i => ({ ...i, product: getProductById(i.id) })).filter(i => i.product);
  },
  subtotal(){ return this.detailed().reduce((sum, i) => sum + i.product.price * i.qty, 0); },
  updateBadge(){
    const count = this.itemCount();
    document.querySelectorAll(".cart-count").forEach(el => el.textContent = count);
  }
};
document.addEventListener("DOMContentLoaded", () => Cart.updateBadge());

/* ---------------------------------------------------------------------
   PRODUCT CARD MARKUP (shared: home, shop, related products)
   --------------------------------------------------------------------- */
function renderProductCard(p){
  const discount = discountPct(p.price, p.old);
  const badgeMap = {
    sale: `<span class="badge badge-sale">-${discount}%</span>`,
    new:  `<span class="badge badge-new">New</span>`,
    hot:  `<span class="badge badge-hot">Hot</span>`
  };
  const badgeHtml = p.badge ? (badgeMap[p.badge] || "") : "";
  const isWished = typeof Wishlist !== "undefined" && Wishlist.has(p.id);
  return `
  <article class="product-card reveal" data-id="${p.id}" data-cat="${p.cat}" data-price="${p.price}" data-rating="${p.rating}">
    <div class="product-thumb">
      ${badgeHtml}
      <a href="product.html?id=${p.id}">
        <img src="${productImage(p.seed)}" alt="${p.name}" loading="lazy">
      </a>
      <div class="product-quick-actions">
        <button class="qa-btn wishlist-btn ${isWished ? "active" : ""}" title="Add to wishlist" data-id="${p.id}"><i class="fa-solid fa-heart"></i></button>
        <button class="qa-btn quickview-btn" title="Quick view" data-id="${p.id}"><i class="fa-solid fa-eye"></i></button>
      </div>
    </div>
    <div class="product-info">
      <span class="product-cat">${p.cat}</span>
      <a href="product.html?id=${p.id}"><h3 class="product-name">${p.name}</h3></a>
      <div class="product-rating"><span class="stars">${starString(p.rating)}</span> (${p.reviews})</div>
      <div class="product-price-row">
        <span class="price-now">${formatPrice(p.price)}</span>
        ${p.old > 0 ? `<span class="price-old">${formatPrice(p.old)}</span>` : ""}
      </div>
      <button class="add-cart-btn" data-id="${p.id}"><i class="fa-solid fa-bag-shopping"></i> Add to Cart</button>
    </div>
  </article>`;
}

function renderProductGrid(container, products){
  if(!container) return;
  container.innerHTML = products.length
    ? products.map(renderProductCard).join("")
    : `<div class="empty-state"><i class="fa-solid fa-box-open" style="font-size:48px;margin-bottom:14px;display:block;"></i>No products match your filters.</div>`;
  // Trigger reveal for newly injected cards
  requestAnimationFrame(() => {
    container.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
  });
}

/* ---------------------------------------------------------------------
   GLOBAL EVENT DELEGATION: add-to-cart / wishlist / quick-view buttons
   Works across all pages since buttons are injected dynamically
   --------------------------------------------------------------------- */
document.addEventListener("click", e => {
  const addBtn = e.target.closest(".add-cart-btn");
  if(addBtn){
    const id = addBtn.dataset.id;
    Cart.add(id, 1);
    const p = getProductById(id);
    addBtn.classList.add("added");
    addBtn.innerHTML = `<i class="fa-solid fa-check"></i> Added`;
    showToast(`${p.name} added to cart`, "fa-bag-shopping");
    setTimeout(() => {
      addBtn.classList.remove("added");
      addBtn.innerHTML = `<i class="fa-solid fa-bag-shopping"></i> Add to Cart`;
    }, 1600);
    if(document.body.dataset.page === "cart") renderCartPage();
    return;
  }

  const wishBtn = e.target.closest(".wishlist-btn");
  if(wishBtn){
    const id = wishBtn.dataset.id;
    const nowActive = Wishlist.toggle(id);
    wishBtn.classList.toggle("active", nowActive);
    showToast(nowActive ? "Added to wishlist" : "Removed from wishlist", "fa-heart");
    return;
  }

  const qvBtn = e.target.closest(".quickview-btn");
  if(qvBtn){
    openQuickView(qvBtn.dataset.id);
    return;
  }

  if(e.target.closest(".modal-close")){
    closeQuickView();
    return;
  }

  // Quick view modal's own add-to-cart / wishlist buttons
  const qvAdd = e.target.closest(".qv-add-cart");
  if(qvAdd){
    const overlay = document.getElementById("quick-view-modal");
    const id = overlay.dataset.productId;
    const qty = Number(overlay.querySelector(".qty-control input")?.value || 1);
    Cart.add(id, qty);
    const p = getProductById(id);
    showToast(`${p.name} added to cart`, "fa-bag-shopping");
    closeQuickView();
    return;
  }
  const qvWish = e.target.closest(".qv-add-wish");
  if(qvWish){
    const overlay = document.getElementById("quick-view-modal");
    const id = overlay.dataset.productId;
    const nowActive = Wishlist.toggle(id);
    qvWish.classList.toggle("active", nowActive);
    showToast(nowActive ? "Added to wishlist" : "Removed from wishlist", "fa-heart");
    return;
  }

  // Quick view qty +/-
  const qtyBtn = e.target.closest(".qty-control button");
  if(qtyBtn){
    const input = qtyBtn.parentElement.querySelector("input");
    let val = Number(input.value) || 1;
    val = qtyBtn.dataset.action === "inc" ? val + 1 : Math.max(1, val - 1);
    input.value = val;
    return;
  }
});

/* ---------------------------------------------------------------------
   CART PAGE RENDER
   --------------------------------------------------------------------- */
let appliedCoupon = null;
const COUPONS = {
  "SAVE10": 0.10,
  "WELCOME20": 0.20,
  "URBAN15": 0.15
};

function renderCartPage(){
  const list = document.getElementById("cart-items-list");
  const emptyState = document.getElementById("cart-empty-state");
  const summaryBox = document.getElementById("cart-summary-box");
  if(!list) return;

  const items = Cart.detailed();

  if(items.length === 0){
    list.innerHTML = "";
    list.style.display = "none";
    if(emptyState) emptyState.style.display = "block";
    if(summaryBox) summaryBox.style.display = "none";
    return;
  }
  list.style.display = "block";
  if(emptyState) emptyState.style.display = "none";
  if(summaryBox) summaryBox.style.display = "block";

  list.innerHTML = items.map(i => `
    <div class="cart-item" data-id="${i.id}">
      <div class="cart-item-info">
        <img src="${productImage(i.product.seed, 200)}" alt="${i.product.name}">
        <div>
          <div class="ci-name">${i.product.name}</div>
          <div class="ci-meta">${i.product.cat}</div>
          <button class="remove-item" data-id="${i.id}"><i class="fa-solid fa-trash-can"></i> Remove</button>
        </div>
      </div>
      <div class="ci-price" data-label="Price">${formatPrice(i.product.price)}</div>
      <div data-label="Quantity">
        <div class="qty-control cart-qty" data-id="${i.id}">
          <button data-action="dec">−</button>
          <input type="text" value="${i.qty}" readonly>
          <button data-action="inc">+</button>
        </div>
      </div>
      <div class="ci-line-total" data-label="Total"><b>${formatPrice(i.product.price * i.qty)}</b></div>
      <div></div>
    </div>
  `).join("");

  updateOrderSummary();
}

function updateOrderSummary(){
  const subtotal = Cart.subtotal();
  const items = Cart.detailed();
  const shipping = subtotal > 0 ? (subtotal > 75 ? 0 : 6.99) : 0;
  const discount = appliedCoupon ? subtotal * COUPONS[appliedCoupon] : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + tax + shipping;

  const setText = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
  setText("sum-subtotal", formatPrice(subtotal));
  setText("sum-shipping", shipping === 0 ? (subtotal > 0 ? "Free" : "$0.00") : formatPrice(shipping));
  setText("sum-tax", formatPrice(tax));
  setText("sum-total", formatPrice(total));
  setText("sum-item-count", items.reduce((s,i)=>s+i.qty,0));

  const discountRow = document.getElementById("sum-discount-row");
  if(discountRow){
    if(discount > 0){
      discountRow.style.display = "flex";
      setText("sum-discount", "−" + formatPrice(discount));
    } else {
      discountRow.style.display = "none";
    }
  }
}

// Quantity +/- and remove, delegated
document.addEventListener("click", e => {
  const qtyCtrl = e.target.closest(".cart-qty");
  if(qtyCtrl && e.target.closest("button")){
    const id = qtyCtrl.dataset.id;
    const input = qtyCtrl.querySelector("input");
    let val = Number(input.value);
    const action = e.target.closest("button").dataset.action;
    val = action === "inc" ? val + 1 : val - 1;
    if(val <= 0){
      Cart.remove(id);
    } else {
      Cart.updateQty(id, val);
    }
    renderCartPage();
    return;
  }
  const removeBtn = e.target.closest(".remove-item");
  if(removeBtn){
    Cart.remove(removeBtn.dataset.id);
    showToast("Item removed from cart", "fa-trash-can");
    renderCartPage();
    return;
  }
});

// Coupon apply
document.getElementById("coupon-form")?.addEventListener("submit", e => {
  e.preventDefault();
  const input = document.getElementById("coupon-input");
  const code = input.value.trim().toUpperCase();
  if(COUPONS[code]){
    appliedCoupon = code;
    showToast(`Coupon "${code}" applied — ${COUPONS[code]*100}% off`, "fa-tag");
    input.value = "";
  } else {
    showToast("Invalid or expired coupon code", "fa-triangle-exclamation");
  }
  updateOrderSummary();
});

// Checkout button (UI only demo)
document.getElementById("checkout-btn")?.addEventListener("click", () => {
  if(Cart.itemCount() === 0){
    showToast("Your cart is empty", "fa-cart-shopping");
    return;
  }
  showToast("This is a demo store — checkout is not connected to payments.", "fa-circle-info");
});

// Initialize cart page rendering if present
if(document.getElementById("cart-items-list")){
  document.addEventListener("DOMContentLoaded", renderCartPage);
}
