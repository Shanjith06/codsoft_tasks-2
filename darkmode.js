/* ==========================================================================
   URBANCART — DARK MODE TOGGLE
   ========================================================================== */
(function darkMode(){
  const KEY = "urbancart_theme";
  const saved = localStorage.getItem(KEY);

  if(saved === "dark"){
    document.body.classList.add("dark-mode");
  } else if(!saved && window.matchMedia("(prefers-color-scheme: dark)").matches){
    // Respect system preference on first visit only
    document.body.classList.add("dark-mode");
  }

  function syncToggles(){
    const isDark = document.body.classList.contains("dark-mode");
    document.querySelectorAll(".dm-toggle .dm-knob").forEach(knob => {
      knob.innerHTML = isDark ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    syncToggles();
    document.querySelectorAll(".dm-toggle").forEach(toggle => {
      toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem(KEY, document.body.classList.contains("dark-mode") ? "dark" : "light");
        syncToggles();
      });
    });
  });
})();
