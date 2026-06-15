/* =========================================================================
   SIBO Plate — App logic (vanilla JS, no build step, works from file://)
   ========================================================================= */
(function () {
  "use strict";

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const STATUS_LABEL = { green: "Enjoy", yellow: "Small", red: "Avoid" };

  /* --------------------------- THEME TOGGLE --------------------------- */
  const themeToggle = $("#themeToggle");
  const themeIcon = $(".theme-icon", themeToggle);
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
  const navToggle = $("#navToggle");
  const mainNav = $(".main-nav");
  navToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  $$(".main-nav a").forEach(a => a.addEventListener("click", () => {
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }));

  /* --------------------------- HERO STAT --------------------------- */
  const roundFoods = Math.floor(FOODS.length / 10) * 10;
  $("#statFoods").textContent = roundFoods + "+";

  /* --------------------------- AT A GLANCE --------------------------- */
  $("#glanceEat").innerHTML = CHEAT_SHEET.eat.map(r =>
    `<li><span class="g-group">${r.group}</span><span class="g-items">${r.items}</span></li>`).join("");
  $("#glanceAvoid").innerHTML = CHEAT_SHEET.avoid.map(r =>
    `<li><span class="g-group">${r.group}</span><span class="g-items">${r.items}</span></li>`).join("");

  $("#principles").innerHTML = PRINCIPLES.map(p => `
    <article class="principle">
      <div class="principle-icon" aria-hidden="true">${p.icon}</div>
      <h3>${p.title}</h3>
      <p>${p.body}</p>
    </article>`).join("");

  /* --------------------------- FOOD EXPLORER --------------------------- */
  const state = { status: "all", cat: "all", query: "" };
  const foodGrid = $("#foodGrid");
  const catFilters = $("#catFilters");
  const resultCount = $("#resultCount");
  const noResults = $("#noResults");

  catFilters.innerHTML = [`<button class="cat-chip is-active" data-cat="all">All categories</button>`]
    .concat(FOOD_CATEGORIES.map(c =>
      `<button class="cat-chip" data-cat="${c.id}"><span aria-hidden="true">${c.icon}</span> ${c.label}</button>`
    )).join("");

  function foodCard(f) {
    const instead = f.instead
      ? `<div class="food-instead">→ try instead: <b>${f.instead}</b></div>` : "";
    return `
      <article class="food-card s-${f.status}">
        <div class="food-card-top">
          <span class="food-name">${f.name}</span>
          <span class="food-badge">${STATUS_LABEL[f.status]}</span>
        </div>
        <p class="food-note">${f.note}</p>
        ${instead}
      </article>`;
  }

  function renderFoods() {
    const q = state.query.trim().toLowerCase();
    const list = FOODS.filter(f => {
      if (state.status !== "all" && f.status !== state.status) return false;
      if (state.cat !== "all" && f.cat !== state.cat) return false;
      if (q && !(f.name.toLowerCase().includes(q) ||
                 f.note.toLowerCase().includes(q) ||
                 (f.instead && f.instead.toLowerCase().includes(q)))) return false;
      return true;
    });
    foodGrid.innerHTML = list.map(foodCard).join("");
    noResults.hidden = list.length !== 0;
    const g = list.filter(f => f.status === "green").length;
    const y = list.filter(f => f.status === "yellow").length;
    const r = list.filter(f => f.status === "red").length;
    resultCount.textContent = list.length
      ? `${list.length} foods · ${g} enjoy · ${y} small portions · ${r} to avoid`
      : "";
  }

  $$(".chip-status").forEach(btn => btn.addEventListener("click", () => {
    $$(".chip-status").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    state.status = btn.dataset.status;
    renderFoods();
  }));
  catFilters.addEventListener("click", (e) => {
    const btn = e.target.closest(".cat-chip");
    if (!btn) return;
    $$(".cat-chip", catFilters).forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    state.cat = btn.dataset.cat;
    renderFoods();
  });
  $("#foodSearch").addEventListener("input", (e) => { state.query = e.target.value; renderFoods(); });
  renderFoods();

  /* --------------------------- SWAPS --------------------------- */
  $("#swapGrid").innerHTML = SWAPS.map(s => `
    <article class="swap-card">
      <div class="swap-head">
        <span class="swap-emoji" aria-hidden="true">${s.icon}</span>
        <h3>${s.avoid}</h3>
      </div>
      <div class="swap-row avoid">
        <span class="swap-tag">✕ Instead of</span>
        <div class="swap-title">${s.avoid}</div>
        <div class="swap-detail">${s.avoidWhy}</div>
      </div>
      <div class="swap-arrow"><span aria-hidden="true">↓</span></div>
      <div class="swap-row eat">
        <span class="swap-tag">✓ Enjoy</span>
        <div class="swap-title">${s.eat}</div>
        <div class="swap-detail">${s.eatHow}</div>
      </div>
    </article>`).join("");

  /* --------------------------- SNACKS --------------------------- */
  $("#snackGrid").innerHTML = SNACKS.map(s => `
    <article class="snack-card">
      <span class="snack-emoji" aria-hidden="true">${s.icon}</span>
      <div>
        <div class="snack-name">${s.name}</div>
        <div class="snack-note">${s.note}</div>
      </div>
    </article>`).join("");

  /* --------------------------- MEAL PLAN --------------------------- */
  $("#mealTimeline").innerHTML = MEAL_PLAN.map(m => `
    <div class="meal-row">
      <div class="meal-slot"><span class="meal-emoji" aria-hidden="true">${m.icon}</span> ${m.slot}</div>
      <div class="meal-main">
        <h3>${m.title}</h3>
        <p>${m.detail}</p>
        <p class="meal-alt">${m.alt}</p>
      </div>
    </div>`).join("");

  /* --------------------------- RECIPES + MODAL --------------------------- */
  $("#recipeGrid").innerHTML = RECIPES.map((r, i) => `
    <button class="recipe-card" data-recipe="${i}">
      <span class="recipe-emoji" aria-hidden="true">${r.icon}</span>
      <h3>${r.name}</h3>
      <p class="recipe-tagline">${r.tagline}</p>
      <div class="recipe-meta"><span>⏱️ ${r.time}</span><span>🍽️ ${r.serves}</span></div>
      <div class="recipe-open">Open recipe →</div>
    </button>`).join("");

  const modal = $("#recipeModal");
  const modalBody = $("#modalBody");
  let lastFocused = null;

  function openRecipe(i) {
    const r = RECIPES[i];
    if (!r) return;
    modalBody.innerHTML = `
      <span class="modal-emoji" aria-hidden="true">${r.icon}</span>
      <h2 id="modalTitle">${r.name}</h2>
      <p class="modal-tagline">${r.tagline}</p>
      <div class="modal-meta"><span class="pill">⏱️ ${r.time}</span><span class="pill">🍽️ ${r.serves}</span></div>
      <div class="modal-why"><strong>Why it works:</strong> ${r.why}</div>
      <p class="modal-section-title">Ingredients</p>
      <ul class="modal-ingredients">${r.ingredients.map(x => `<li>${x}</li>`).join("")}</ul>
      <p class="modal-section-title">Method</p>
      <ol class="modal-steps">${r.steps.map(x => `<li>${x}</li>`).join("")}</ol>
      ${r.safety ? `<div class="modal-safety">⚠️ ${r.safety}</div>` : ""}`;
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $(".modal-close", modal).focus();
  }
  function closeRecipe() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }
  $("#recipeGrid").addEventListener("click", (e) => {
    const card = e.target.closest("[data-recipe]");
    if (card) openRecipe(Number(card.dataset.recipe));
  });
  modal.addEventListener("click", (e) => { if (e.target.hasAttribute("data-close")) closeRecipe(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeRecipe(); });

  /* --------------------------- CUISINES --------------------------- */
  $("#cuisineGrid").innerHTML = CUISINES.map(c => `
    <article class="cuisine-card">
      <div class="cuisine-head">
        <span class="cuisine-emoji" aria-hidden="true">${c.icon}</span>
        <h3>${c.name}</h3>
        <span class="verdict ${c.verdict}">${c.verdictLabel}</span>
      </div>
      <p class="cuisine-list-label order">✓ Order this</p>
      <ul class="cuisine-list order">${c.order.map(x => `<li>${x}</li>`).join("")}</ul>
      <hr class="cuisine-divider" />
      <p class="cuisine-list-label skip">✕ Skip / ask to change</p>
      <ul class="cuisine-list skip">${c.skip.map(x => `<li>${x}</li>`).join("")}</ul>
    </article>`).join("");

  /* --------------------------- PHASES --------------------------- */
  $("#phaseTrack").innerHTML = PHASES.map(p => `
    <article class="phase-card p-${p.color}">
      <div class="phase-num">${p.num}</div>
      <h3>${p.name}</h3>
      <span class="phase-duration">${p.duration}</span>
      <p>${p.blurb}</p>
    </article>`).join("");

  /* --------------------------- TIPS --------------------------- */
  $("#tipGrid").innerHTML = TIPS.map(t => `
    <article class="tip-card">
      <span class="tip-emoji" aria-hidden="true">${t.icon}</span>
      <div><h3>${t.title}</h3><p>${t.body}</p></div>
    </article>`).join("");

  /* --------------------------- SOURCES --------------------------- */
  $("#sourceList").innerHTML = SOURCES.map(s =>
    `<li><a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.name}</a></li>`).join("");

  /* --------------------------- REVEAL ON SCROLL --------------------------- */
  const revealTargets = $$(".section, .disclaimer");
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
