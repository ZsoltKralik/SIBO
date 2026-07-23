# 🍃 SIBO Plate

A free, expertly-researched, **multi-page static** guide to eating well with **SIBO**
(Small Intestinal Bacterial Overgrowth), built on the **Low-FODMAP framework**.
Runs locally or publishes free to the web.

Instead of a flat list of "can't eat" foods, it tells you **what to eat instead** -
a searchable database of **300+ foods** (including popular & fast-food items like
McDonald's, cola, KFC and apple pie), grab-and-go snacks, a 7-day meal plan, real recipes,
and an "order-this-not-that" guide for eating out. Trigger foods show a quick
**"try instead"** alternative so you're never left guessing.

> ⚠️ **Educational guidance, not medical advice.** See the [disclaimer](#️-important-disclaimer).

---

## Contents
- [How to open it](#️-how-to-open-it)
- [What's inside](#-whats-inside)
- [Project structure](#-project-structure)
- [How it works (architecture)](#️-how-it-works-architecture)
- [Editing the content](#️-editing-the-content)
- [Adding a new page / tab](#-adding-a-new-page--tab)
- [Publishing (Cloudflare Pages / GitHub Pages)](#-publishing)
- [Methodology & sources](#-methodology--sources)
- [Roadmap / parked ideas](#️-roadmap--parked-ideas)
- [Disclaimer](#️-important-disclaimer)

---

## ▶️ How to open it

It's a plain **multi-page static** website with **no dependencies and no build step**.
Open `index.html` (the Home page) and use the top tabs to move between pages.

**Option 1 - Just double-click (simplest):** open `index.html` in any modern browser
(Chrome, Edge, Firefox). Every page works straight from `file://`.

**Option 2 - Run a tiny local server (recommended):**
```bash
cd C:\CLAUDE\SIBO
python -m http.server 8000      # then visit http://localhost:8000
# or:  npx serve .
```

---

## 🧭 What's inside

Each tab is its own page.

| Tab / page | What it gives you |
|---|---|
| **Home** (`index.html`) | The whole diet at a glance - eat/avoid cheat sheet, four golden rules, quick links |
| **Food List** (`foods.html`) | Searchable, filterable database of 300+ foods (incl. a **Snacks** category) with 🟢 enjoy / 🟡 moderate / 🔴 avoid ratings, portion notes, and "try instead" hints |
| **Swaps** (`swaps.html`) | "Eat this, not that" cards - Big Mac, pizza, cola, KFC, apple pie, ramen and more |
| **A Week's Food** (`meals.html`) | A full 7-day Low-FODMAP meal plan (breakfast / lunch / dinner / snack each day) shown as a **horizontal scroll strip** you swipe or scroll left-to-right through the week (always starting on Monday), mostly drawn from the recipes |
| **Recipes** (`recipes.html`) | 78 gut-friendly recipes across 8 categories (basics, breakfast, mains, soups, salads, snacks, sweets, drinks), filterable by type |
| **Eating Out** (`eating-out.html`) | What to order / skip across 21 cuisines (Japanese, Vietnamese, café, seafood, Brazilian, French, Korean, pub, bakery and more) |
| **The Journey** (`journey.html`) | The three Low-FODMAP phases (elimination → reintroduction → personalisation), FAQ, tips, sources |

Features: a fresh-green, modern-wellbeing design with a self-hosted font, light/dark
mode, live search & filtering, a recipe modal, responsive layout, printable, and
**fully offline** (no CDNs, no trackers).

---

## 📁 Project structure

```
SIBO/
├── index.html         # Home (hero, at-a-glance, quick links)
├── foods.html         # Food List (searchable explorer)
├── swaps.html         # Eat this, not that
├── meals.html         # A week's food (7-day meal plan)
├── recipes.html       # Recipes (+ modal)
├── eating-out.html    # Eating out by cuisine
├── journey.html       # The 3 phases, FAQ, tips, sources
├── css/
│   └── styles.css     # All styling + light/dark green "modern-wellbeing" theming
├── js/
│   ├── data.js        # ALL content lives here (foods, swaps, recipes, ...) - edit this
│   ├── layout.js      # Shared header/footer, active tab, theme, mobile nav, back-to-top
│   └── app.js         # Page-aware content rendering (search, filters, recipe modal)
├── fonts/             # Self-hosted Nunito Sans (offline, no CDN)
├── assets/
│   └── img/           # Pre-generated recipe photos + category icons (referenced by the site)
├── tools/             # Local-only image generator - NOT shipped with the site
│   ├── generate_images.py   # Leonardo / OpenAI GPT Image → assets/img/
│   ├── image_manifest.json  # what to generate (slugs + prompts)
│   └── README.md            # how to run it
├── .env.example       # Copy to .env (git-ignored) for the image-generator API key
├── .nojekyll          # Lets GitHub Pages serve the files as-is
└── README.md
```

---

## 🛠️ How it works (architecture)

A deliberately simple, **build-free** static site. Three scripts load on every page,
in order: `data.js` → `layout.js` → `app.js`.

- **`data.js`** defines plain global arrays/objects (the entire content of the site).
  No fetching - it's just `<script>` globals, so everything works from `file://`.
- **`layout.js`** injects the shared **header + footer** into every page (so the nav
  lives in exactly one place), marks the **active tab** from `<body data-page="...">`,
  and wires the **theme toggle**, **mobile nav**, **back-to-top**, and reveal-on-scroll.
- **`app.js`** renders the page content. It is **page-aware**: each block runs only if
  its target element exists on the current page (via a small `fill(id, html)` guard and
  `if (!el) return` checks). The *same* `app.js` therefore drives all 7 pages and only
  renders what's present - no per-page scripts.
- **Imagery** (recipe photos, food-category / recipe-category / cuisine icons, and the logo)
  is **pre-generated locally** with **GPT Image 2** (via the Leonardo API - see `tools/`) and
  committed as plain WebP files under `assets/img/`. The site just references them and **falls
  back to an emoji** if an image is missing - so it stays fully offline and the published site
  never calls an API or holds a key.
- Shared CSS/JS includes may use a small relative cache-busting query string
  (`css/styles.css?v=...`, `js/app.js?v=...`). Keep it relative; bump it when the
  local browser keeps serving an old shared asset.

Each page's HTML is just `<head>` (page-specific `<title>`/description) + `<body
data-page="...">` containing that page's section(s) + the three script tags. All asset
paths are **relative** (`css/...`, `js/...`, `fonts/...`, `foods.html`), so the site works
unchanged from `file://`, a project subpath (e.g. `.../SIBO/`), or a domain root.

---

## ✏️ Editing the content

**Everything users read lives in [`js/data.js`](js/data.js).** Edit the arrays and refresh -
no build. The main shapes:

```js
// Food list. status is "green" (enjoy) | "yellow" (moderate) | "red" (avoid).
// `instead` is optional and shows a "try instead" hint (used mainly on red items).
FOODS = [
  { name: "Steak (plain grilled)", cat: "popular", status: "green",
    note: "Just meat, salt & pepper = zero FODMAPs." },
  { name: "Cola / soft drinks", cat: "drink", status: "red",
    note: "Monash found cola high in fructans.", instead: "Soda water, lemonade or tea" },
];

FOOD_CATEGORIES = [ { id: "popular", label: "Popular & Fast Food", icon: "🍟" }, ... ];
//                    └ a food's `cat` must match one of these `id`s

CHEAT_SHEET = { eat: [ { group, items } ], avoid: [ { group, items } ] };   // Home panels
PRINCIPLES  = [ { icon, title, body } ];                                    // Home golden rules
SWAPS       = [ { icon, avoid, avoidWhy, eat, eatHow } ];                    // Swaps page
WEEK_PLAN   = [ { day, meals: [ { slot, icon, title, detail } ] } ];         // A Week's Food (7 days)
RECIPE_CATS = [ { id, label, icon } ];                                       // Recipe filter chips
RECIPES     = [ { meal, icon, name, tagline, time, serves, why,
                  ingredients: [], steps: [], safety } ];                    // Recipes (+ filter + modal)
                // meal: a RECIPE_CATS id  (powers the on-page filter)
RECIPE_SLUGS  = [ "marinara", ... ];                   // image filename per recipe (same order as RECIPES)
CUISINES    = [ { icon, name, verdict, verdictLabel, order: [], skip: [] } ];// Eating Out
                // verdict: "best" | "ok" | "tricky"  (colours the badge)
CUISINE_SLUGS = [ "japanese", ... ];                   // image filename per cuisine (same order as CUISINES)
PHASES      = [ { num, name, duration, color, blurb } ];                     // Journey
                // color: "red" | "yellow" | "green"  (colours the top bar)
TIPS        = [ { icon, title, body } ];                                     // Journey
SOURCES     = [ { name, url } ];                                             // Journey
```

To **add a food**: append an object to `FOODS` with a `cat` that matches a category `id`.
The hero "300+" stat, the result counts, and all filters update automatically.

---

## ➕ Adding a new page / tab

1. **Create `mytab.html`** - copy any sub-page (e.g. `swaps.html`), set
   `<body data-page="mytab">`, update `<title>`/description, and put a `<section>` with a
   unique container id (e.g. `<div id="myGrid"></div>`) inside `<main>`.
2. **Add the nav entry** in [`js/layout.js`](js/layout.js) → the `NAV` array:
   `{ href: "mytab.html", label: "My&nbsp;Tab", page: "mytab" }`.
3. **Render its content** in [`js/app.js`](js/app.js): add the data to `data.js`, then
   `fill("myGrid", ...)` (it no-ops on every other page automatically).
4. (Optional) add a quick-link card on the Home page (`index.html`).

The header/footer, active-tab highlight, theme and back-to-top all come for free.

---

## 🌍 Publishing

All paths are relative, so the site hosts as-is anywhere. Two free options:

### Cloudflare Pages (planned)
1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick
   the `SIBO` repo.
2. Build settings: **Framework preset = None**, **Build command = *(leave empty)***,
   **Build output directory = `/`**. Deploy.
3. Every push to `main` auto-deploys. Add a **custom domain** under the project's
   *Custom domains* tab - Cloudflare handles DNS + HTTPS automatically.

### GitHub Pages (alternative)
Repo **Settings → Pages → Source: "Deploy from a branch" → `main` / `/ (root)`**.
Live at `https://zsoltkralik.github.io/SIBO/` after ~1 minute. (`.nojekyll` is already
included so the files are served as-is.)

---

## 📚 Methodology & sources

Ratings follow the **Low-FODMAP framework**, primarily **Monash University's** lab-tested
food data - the most evidence-based elimination approach for SIBO/IBS. Whole-food ratings
and portion thresholds reflect Monash "green-light" servings. **Branded / fast-food** items
are rated from published specialist IBS/SIBO dietitian guidance (recipes vary by country, so
they're a starting point, not a guarantee). Ratings reflect current evidence - e.g. Monash's
finding that **regular cola *and* Coke Zero are high-FODMAP** (fructans).

Full source links are listed on the site's **The Journey** page and in `SOURCES` in
[`js/data.js`](js/data.js).

---

## 🗺️ Roadmap / parked ideas

Not built yet - candidates for future work (owner will prioritise):

- Favourites + printable shopping list (saved in `localStorage`)
- Reintroduction tracker (Phase 2) and/or a simple food-symptom journal
- Meal "FODMAP-stack" builder (warn when small portions stack into a high-FODMAP meal)
- Instant food checker on the Home page / in the header
- Per-food **FODMAP-type tags** (fructan / lactose / polyol / GOS / fructose) + filtering
- Installable **PWA** (offline app for use while shopping)
- Full **accessibility (WCAG AA)** + SEO/Open-Graph pass
- **About / methodology** page (who made it, how rated, last-updated) for public credibility
- Deep-linkable food URLs; multi-language

---

## ⚕️ Important disclaimer

This site is **educational guidance, not medical advice**. SIBO is a medical condition and
food tolerance is highly individual. The strict elimination phase is meant to be
**temporary** (typically 2-6 weeks) and followed by structured reintroduction. Always work
with your doctor or a registered dietitian.
