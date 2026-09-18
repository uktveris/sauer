(() => {
  "use strict";

  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (navToggle && header && siteNav) {
    navToggle.addEventListener("click", () => {
      const open = header.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        header.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const langEls = document.querySelectorAll("[data-en]");
  langEls.forEach((el) => {
    if (el.dataset.lt === undefined) el.dataset.lt = el.textContent;
  });

  function setLang(lang) {
    langEls.forEach((el) => {
      const next = lang === "en" ? el.dataset.en : el.dataset.lt;
      if (next !== undefined) el.textContent = next;
    });
    document.documentElement.lang = lang;
    document.querySelectorAll(".lang-toggle").forEach((btn) => {
      btn.textContent = lang === "en" ? "LT" : "EN";
    });
    try {
      localStorage.setItem("sauer-lang", lang);
    } catch (e) {
      /* ignore unavailable storage */
    }
  }

  let initialLang = "lt";
  try {
    const stored = localStorage.getItem("sauer-lang");
    if (stored === "en" || stored === "lt") initialLang = stored;
  } catch (e) {
    /* ignore unavailable storage */
  }

  document.querySelectorAll(".lang-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = document.documentElement.lang === "en" ? "en" : "lt";
      setLang(current === "en" ? "lt" : "en");
    });
  });

  setLang(initialLang);
})();
