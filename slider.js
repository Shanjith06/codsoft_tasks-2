/* ==========================================================================
   URBANCART — SLIDER / CAROUSEL LOGIC
   Handles: homepage promo slider, product image gallery, scroll carousels
   ========================================================================== */

/* ---------------------------------------------------------------------
   PROMO SLIDER (homepage — rotating promotional banners)
   --------------------------------------------------------------------- */
(function promoSlider(){
  const slider = document.querySelector(".promo-slider");
  if(!slider) return;
  const track = slider.querySelector(".promo-track");
  const slides = Array.from(slider.querySelectorAll(".promo-slide"));
  const dotsWrap = slider.querySelector(".promo-dots");
  const prevBtn = slider.querySelector(".promo-prev");
  const nextBtn = slider.querySelector(".promo-next");
  let index = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "promo-dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(i){
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dotsWrap.querySelectorAll(".promo-dot").forEach((d, di) => d.classList.toggle("active", di === index));
    resetTimer();
  }
  function next(){ goTo(index + 1); }
  function prev(){ goTo(index - 1); }
  function resetTimer(){
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  prevBtn?.addEventListener("click", prev);
  nextBtn?.addEventListener("click", next);
  resetTimer();
})();

/* ---------------------------------------------------------------------
   PRODUCT GALLERY (product details page)
   --------------------------------------------------------------------- */
function initProductGallery(images){
  const mainImg = document.getElementById("gallery-main-img");
  const thumbsWrap = document.getElementById("gallery-thumbs");
  if(!mainImg || !thumbsWrap) return;

  thumbsWrap.innerHTML = images.map((src, i) => `
    <img src="${src}" alt="Product view ${i + 1}" class="${i === 0 ? "active" : ""}" data-index="${i}">
  `).join("");

  thumbsWrap.querySelectorAll("img").forEach(thumb => {
    thumb.addEventListener("click", () => {
      thumbsWrap.querySelectorAll("img").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      mainImg.style.opacity = "0";
      setTimeout(() => {
        mainImg.src = thumb.src;
        mainImg.style.opacity = "1";
      }, 180);
    });
  });

  mainImg.src = images[0];
  mainImg.style.transition = "opacity 0.25s ease";

  // Gallery arrows (optional, if present)
  const prevBtn = document.getElementById("gallery-prev");
  const nextBtn = document.getElementById("gallery-next");
  let current = 0;
  function show(i){
    current = (i + images.length) % images.length;
    thumbsWrap.querySelectorAll("img")[current].click();
  }
  prevBtn?.addEventListener("click", () => show(current - 1));
  nextBtn?.addEventListener("click", () => show(current + 1));
}

/* ---------------------------------------------------------------------
   HORIZONTAL SCROLL CAROUSEL (best sellers / related products on mobile)
   Adds arrow-button scroll for any [data-scroll-carousel] wrapper
   --------------------------------------------------------------------- */
document.querySelectorAll("[data-scroll-carousel]").forEach(wrapper => {
  const track = wrapper.querySelector(".carousel-track");
  const prevBtn = wrapper.querySelector(".carousel-prev");
  const nextBtn = wrapper.querySelector(".carousel-next");
  if(!track) return;
  const scrollAmount = () => track.clientWidth * 0.8;
  prevBtn?.addEventListener("click", () => track.scrollBy({ left: -scrollAmount(), behavior: "smooth" }));
  nextBtn?.addEventListener("click", () => track.scrollBy({ left: scrollAmount(), behavior: "smooth" }));
});
