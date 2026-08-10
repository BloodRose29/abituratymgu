/* ============================================================
   ТюмГУ | Общие интерактивы: мобильное меню, аккордеоны FAQ
   ============================================================ */

(function () {
  "use strict";

  /* Мобильное меню */
  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector(".menu-toggle");
    var nav = document.querySelector(".main-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        nav.classList.toggle("open");
      });
    }

    /* FAQ-аккордеон */
    document.querySelectorAll(".faq-q").forEach(function (q) {
      q.addEventListener("click", function () {
        var item = q.closest(".faq-item");
        item.classList.toggle("open");
      });
    });
  });
})();