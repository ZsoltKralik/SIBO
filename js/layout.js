/* =========================================================================
   SIBO Plate — Shared layout (vanilla JS, no build, works from file://)
   Injects the header + footer on every page, marks the active tab, and owns
   the theme toggle, mobile-nav toggle and reveal-on-scroll behaviour.
   Loads on every page BEFORE app.js.
   ========================================================================= */
(function () {
  "use strict";

  /* The tab bar — single source of truth for navigation. */
  const NAV = [
    { href: "index.html",      label: "Home",            page: "home" },
    { href: "foods.html",      label: "Food&nbsp;List",  page: "foods" },
    { href: "swaps.html",      label: "Swaps",           page: "swaps" },
    { href: "snacks.html",     label: "Snacks",          page: "snacks" },
    { href: "meals.html",      label: "A&nbsp;Day's&nbsp;Food", page: "meals" },
    { href: "recipes.html",    label: "Recipes",         page: "recipes" },
    { href: "eating-out.html", label: "Eating&nbsp;Out", page: "eatout" },
    { href: "journey.html",    label: "The&nbsp;Journey",page: "journey" }
  ];

  const active = document.body.dataset.page || "";

  const navLinks = NAV.map(n => {
    const on = n.page === active;
    return `<a href="${n.href}"${on ? ' class="is-active" aria-current="page"' : ""}>${n.label}</a>`;
  }).join("");

  const headerHTML = `
    <header class="site-header" id="top">
      <div class="header-inner">
        <a class="brand" href="index.html" aria-label="SIBO Plate home">
          <span class="brand-mark" aria-hidden="true">🍃</span>
          <span class="brand-text">SIBO&nbsp;Plate</span>
        </a>
        <nav class="main-nav" aria-label="Primary">${navLinks}</nav>
        <div class="header-actions">
          <button id="themeToggle" class="icon-btn" type="button" aria-label="Toggle dark mode" title="Toggle light / dark">
            <span class="theme-icon">🌙</span>
          </button>
          <button id="navToggle" class="icon-btn nav-toggle" type="button" aria-label="Open menu" aria-expanded="false">☰</button>
        </div>
      </div>
    </header>`;

  const footerHTML = `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand"><span aria-hidden="true">🍃</span> SIBO&nbsp;Plate</div>
        <p class="footer-note">
          Built as a free, educational reference following the Low-FODMAP framework. Not a substitute for
          personalised medical or dietetic advice. Always confirm your own tolerances with a professional.
        </p>
        <p class="footer-meta"><a href="index.html">Home</a> · <a href="#top" class="to-top">Back to top ↑</a></p>
      </div>
    </footer>`;

  document.body.insertAdjacentHTML("afterbegin", headerHTML);
  document.body.insertAdjacentHTML("beforeend", footerHTML);

  /* --------------------------- THEME TOGGLE --------------------------- */
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector(".theme-icon");
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    try { localStorage.setItem("sibo-theme", theme); } catch (e) {}
  }
  (function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem("sibo-theme"); } catch (e) {}
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(saved || (prefersDark ? "dark" : "light"));
  })();
  themeToggle.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
  });

  /* --------------------------- MOBILE NAV --------------------------- */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.querySelector(".main-nav");
  navToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  Array.from(mainNav.querySelectorAll("a")).forEach(a =>
    a.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );

  /* --------------------------- BACK TO TOP --------------------------- */
  const toTop = document.querySelector(".to-top");
  if (toTop) toTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* --------------------------- REVEAL ON SCROLL --------------------------- */
  const revealTargets = Array.from(document.querySelectorAll(".section, .disclaimer"));
  revealTargets.forEach(el => el.classList.add("reveal"));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.06 });
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add("in"));
  }
})();
