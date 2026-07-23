/* =========================================================================
   SIBO Plate - Shared layout (vanilla JS, no build, works from file://)
   Injects the header + footer on every page, marks the active tab, and owns
   the theme toggle, mobile-nav toggle and reveal-on-scroll behaviour.
   Loads on every page BEFORE app.js.
   ========================================================================= */
(function () {
  "use strict";

  /* The tab bar - single source of truth for navigation. */
  const NAV = [
    { href: "index.html",      label: "Home",            page: "home" },
    { href: "foods.html",      label: "Food&nbsp;List",  page: "foods" },
    { href: "swaps.html",      label: "Swaps",           page: "swaps" },
    { href: "meals.html",      label: "A&nbsp;Week's&nbsp;Food", page: "meals" },
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
          <span class="brand-mark" aria-hidden="true"><img src="assets/img/logo.webp" alt="" class="brand-logo" onerror="this.closest('.brand-mark').classList.add('noimg')"><span class="brand-emoji">🍃</span></span>
          <span class="brand-text">SIBO&nbsp;Plate</span>
        </a>
        <nav class="main-nav" aria-label="Primary">${navLinks}</nav>
        <div class="header-actions">
          <div class="palette">
            <button id="paletteToggle" class="icon-btn" type="button" aria-label="Change colour theme" aria-haspopup="true" aria-expanded="false" title="Colour theme">
              <span class="palette-dot" aria-hidden="true"></span>
            </button>
            <div id="paletteMenu" class="palette-menu" role="menu" aria-label="Colour theme"></div>
          </div>
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
        <div class="footer-brand"><span class="brand-mark footer-mark" aria-hidden="true"><img src="assets/img/logo.webp" alt="" class="brand-logo" onerror="this.closest('.brand-mark').classList.add('noimg')"><span class="brand-emoji">🍃</span></span> SIBO&nbsp;Plate</div>
        <p class="footer-note">
          Built as a free, educational reference following the Low-FODMAP framework. Not a substitute for
          personalised medical or dietetic advice. Always confirm your own tolerances with a professional.
        </p>
        <p class="footer-meta"><a href="index.html">Home</a> · <a href="#top" class="to-top">Back to top ↑</a></p>
        <p class="footer-credit">Produced by SPECTRA STUDIO.</p>
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

  /* --------------------------- PALETTE PICKER --------------------------- */
  /* Colour themes, orthogonal to light/dark. Sets data-palette on <html>; the
     CSS re-skins the brand tokens per theme. Green ("Meadow") is the default. */
  const PALETTES = [
    { id: "green",    name: "Meadow",   c: ["#10b981", "#0b774c"] },
    { id: "ocean",    name: "Ocean",    c: ["#06b6d4", "#0a6b84"] },
    { id: "sunset",   name: "Sunset",   c: ["#f97316", "#ab4c22"] },
    { id: "berry",    name: "Berry",    c: ["#db2777", "#98285f"] },
    { id: "twilight", name: "Twilight", c: ["#7c3aed", "#4338ca"] }
  ];
  const paletteToggle = document.getElementById("paletteToggle");
  const paletteMenu = document.getElementById("paletteMenu");

  paletteMenu.innerHTML =
    '<p class="palette-menu-title">Colour theme</p>' +
    PALETTES.map(p =>
      `<button class="palette-opt" type="button" role="menuitemradio" aria-checked="false" data-pal="${p.id}">` +
        `<span class="palette-sw" style="background:linear-gradient(135deg,${p.c[0]},${p.c[1]})" aria-hidden="true"></span>` +
        `<span>${p.name}</span><span class="check" aria-hidden="true">✓</span>` +
      `</button>`
    ).join("");

  function applyPalette(id) {
    const p = PALETTES.find(x => x.id === id) || PALETTES[0];
    document.documentElement.setAttribute("data-palette", p.id);
    try { localStorage.setItem("sibo-palette", p.id); } catch (e) {}
    Array.from(paletteMenu.querySelectorAll(".palette-opt")).forEach(b => {
      const on = b.dataset.pal === p.id;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-checked", String(on));
    });
  }
  (function initPalette() {
    let saved = null;
    try { saved = localStorage.getItem("sibo-palette"); } catch (e) {}
    applyPalette(saved || "green");
  })();

  function togglePaletteMenu(open) {
    paletteMenu.classList.toggle("open", open);
    paletteToggle.setAttribute("aria-expanded", String(open));
  }
  paletteToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePaletteMenu(!paletteMenu.classList.contains("open"));
  });
  paletteMenu.addEventListener("click", (e) => {
    const btn = e.target.closest(".palette-opt");
    if (!btn) return;
    applyPalette(btn.dataset.pal);
    togglePaletteMenu(false);
  });
  document.addEventListener("click", (e) => {
    if (paletteMenu.classList.contains("open") && !e.target.closest(".palette")) togglePaletteMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") togglePaletteMenu(false);
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
  /* The fade-up is a progressive enhancement and must never gate content:
     anything already in view is revealed synchronously (so the food list - one
     ~12,500px section - shows on first paint without waiting on the observer),
     and only below-the-fold sections are animated in as they scroll into view.
     An earlier version observed every section with a 0.06 visibility ratio,
     which is unreachable for any element taller than viewport / 0.06 - so the
     food list stayed at opacity:0 until a scroll happened to nudge it. */
  const revealTargets = Array.from(document.querySelectorAll(".section, .disclaimer"));
  revealTargets.forEach(el => el.classList.add("reveal"));

  const revealNow = (el) => el.classList.add("in");
  const inViewport = (el) => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top < vh && r.bottom > 0;
  };

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { revealNow(en.target); io.unobserve(en.target); } });
    }, { threshold: 0 });
    revealTargets.forEach(el => inViewport(el) ? revealNow(el) : io.observe(el));
  } else {
    revealTargets.forEach(revealNow);
  }
})();
