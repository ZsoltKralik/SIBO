# CLAUDE.md - SIBO Plate

Context for an AI assistant picking up this repo cold. Human docs:
[`README.md`](README.md) (overview, editing, publishing) and
[`tools/README.md`](tools/README.md) (image pipeline). Read this file first.

## What this is
**SIBO Plate** is a free, **static, fully-offline** website giving **Low-FODMAP**
eating guidance for people with **SIBO** (Small Intestinal Bacterial Overgrowth):
a searchable food list, "eat this, not that" swaps, 78 recipes, a 7-day meal plan,
and an eating-out guide. It is framed **positively** (what you *can* eat, not just
restrictions).

- Location: `C:\CLAUDE\SIBO` · GitHub: `https://github.com/ZsoltKralik/SIBO` (branch `main`).
- **Status: work in progress, NOT launched.** Owner will host on **Cloudflare**
  (custom domain) once ready. Do **not** publish or enable GitHub Pages. Keep `main`
  in sync as the project evolves.
- `gh` CLI is **not** installed; plain `git` is configured (push works).

## Hard constraints - do not break these
- **No build step, no framework, no package manager, no CDNs, no bundler.** Plain
  HTML + CSS + vanilla JS. It must run by opening the files or `python -m http.server`.
- **Fully offline / `file://`-compatible.** No runtime `fetch`, no external requests,
  self-hosted font. The published site **never holds an API key or calls an API**.
- **All asset paths are relative** (`css/...`, `js/...`, `assets/...`, `foods.html`) so it
  works from root or any subpath. Never use leading-slash absolute URLs.
- **`.env` (the real API key) is git-ignored - never commit it.** Only `.env.example`
  is committed.
- Framework is **Low-FODMAP (Monash University)**. Food ratings/portions follow it;
  **verify a rating before asserting** it (sources are listed on the Journey page /
  README). Do not broaden the site to other diets - this was a deliberate decision.
- Do **not** rename "**Small** Intestinal Bacterial Overgrowth" - unrelated to the
  yellow pill label, which is now "**Moderate**".

## Architecture
Every page loads three scripts, in this order: **`js/data.js` → `js/layout.js` → `js/app.js`**.

- **`js/data.js`** - ALL site content, as plain global arrays/objects (no fetch). This
  is the file to edit for content changes.
- **`js/layout.js`** - injects the shared `<header>` + `<footer>` into every page via
  `insertAdjacentHTML` (no fetch → works offline). The `NAV` array is the **single
  source of truth** for the tab bar. Marks the active tab from `document.body.dataset.page`.
  Also owns: theme toggle (persisted in `localStorage` key `sibo-theme`), mobile nav,
  back-to-top, and reveal-on-scroll. The reveal is a progressive enhancement that must
  **never** gate content: sections already in view are shown synchronously (so a tall
  above-the-fold section like the food list paints on load), and only below-the-fold
  ones are animated in via an `IntersectionObserver` at `threshold:0`. Do not go back
  to a positive visibility ratio - it is unreachable for elements taller than the
  viewport and leaves that content stuck at `opacity:0` until scrolled.
- **`js/app.js`** - renders page content. It is **page-aware**: each block runs only if
  its target container exists, via a `fill(id, html)` helper (`if (!el) return`) and
  IIFE early-returns. The **same** `app.js` drives every page and renders only what's
  present.

Each page's HTML = `<head>` (page-specific `<title>`/`<meta description>`, favicon
`assets/img/logo.webp`, font preload, `css/styles.css`) + `<body data-page="KEY">`
containing that page's `<section>`(s) with **empty container divs** that `app.js` fills,
then the three `<script>` tags.

## Pages (7) - file → `data-page` → main container ids
| File | key | filled containers |
|---|---|---|
| `index.html` | `home` | `#glanceEat` `#glanceAvoid` `#principles` (+ static quick-links) |
| `foods.html` | `foods` | `#catFilters` `#foodSearch` `#resultCount` `#foodGrid` `#noResults` |
| `swaps.html` | `swaps` | `#swapGrid` |
| `meals.html` | `meals` | `#weekPlan` (7-day plan; a horizontal scroll strip - see note below) |
| `recipes.html` | `recipes` | `#recipeFilters` `#recipeCount` `#recipeGrid` + `#recipeModal`/`#modalBody` |
| `eating-out.html` | `eatout` | `#cuisineGrid` |
| `journey.html` | `journey` | `#phaseTrack` (+ static FAQ) `#tipGrid` `#sourceList` |

(There is no Snacks page - snacks were merged into the Food List as a category.)

The **Week's Food** plan is a simple **horizontal scroll strip** (Mon -> Sun, left to
right, always starting at Monday). `app.js` renders the day cards straight into
`#weekPlan.week-track` - a `scroll-snap` flex row of fixed-width `.day-card`s that the
user scrolls by swipe / trackpad / scrollbar. No JS or buttons drive it, so every load
starts at the left (Monday).

## Content model (all globals live in `js/data.js`)
```
FOOD_CATEGORIES = [ { id, label, icon } ]                  // food-list filter chips; id matches FOODS.cat
FOODS           = [ { name, cat, status, note, instead? } ]// status "green"|"yellow"|"red" => Enjoy|Moderate|Avoid
CHEAT_SHEET     = { eat:[{group,items}], avoid:[...] }        // Home "at a glance"
PRINCIPLES      = [ { icon, title, body } ]                 // Home golden rules
SWAPS           = [ { icon, avoid, avoidWhy, eat, eatHow } ]
WEEK_PLAN       = [ { day, meals:[ { slot, icon, title, detail } ] } ]   // 7 days × 4 meals
RECIPE_CATS     = [ { id, label, icon } ]                  // recipe filter chips
RECIPES         = [ { meal, icon, name, tagline, time, serves, why, ingredients[], steps[], safety } ]
RECIPE_SLUGS    = [ "marinara", ... ]                        // ORDER-LOCKED to RECIPES (image filenames)
CUISINES        = [ { icon, name, verdict, verdictLabel, order[], skip[] } ]  // verdict "best"|"ok"|"tricky"
CUISINE_SLUGS   = [ "japanese", ... ]                        // ORDER-LOCKED to CUISINES (image filenames)
PHASES          = [ { num, name, duration, color, blurb } ]// color "red"|"yellow"|"green"
TIPS, SOURCES   = ...                                        // Journey page
```
**Key invariants**
- `RECIPE_SLUGS[i]` ↔ `RECIPES[i]` and `CUISINE_SLUGS[i]` ↔ `CUISINES[i]` are **index-aligned**.
  If you add/remove/reorder a recipe or cuisine, update the matching slug (and image file)
  at the same index. Recipe cards/modal are keyed by each recipe's **original index**, so
  filtering does not break the modal lookup.
- `RECIPES[].meal` must be a `RECIPE_CATS` id. `FOODS[].cat` must be a `FOOD_CATEGORIES` id.

## Imagery (recipe photos, icons, logo)
- All images are **pre-generated locally with GPT Image 2** (OpenAI's model, accessed via
  the **Leonardo API**) and committed as WebP under `assets/img/`:
  `recipes/<RECIPE_SLUGS slug>.webp`, `categories/<FOOD_CATEGORIES id>.webp`,
  `recipe-cats/<RECIPE_CATS id>.webp`, `cuisines/<CUISINE_SLUGS slug>.webp`, and `logo.webp`.
- The site references the **files** and **falls back to the item's emoji** if a file is
  missing (`onerror` → a `.noimg` class). So images are optional and the site never breaks.
- Generator: `tools/generate_images.py` (Python stdlib + optional Pillow), driven by
  `tools/image_manifest.json`. Full details in [`tools/README.md`](tools/README.md).
- Regenerate (the command the site was built with):
  `python tools/generate_images.py --provider leonardo --model gpt-image-2 --quality low`
  Flags: `--only <slug>`, `--type recipes|categories|recipe_categories|cuisines|logo`,
  `--force` (overwrite). Cost ≈ **8 Leonardo tokens + ~$0.012 per image** at LOW.
- **The owner specifically wants GPT Image 2** for this project and is token/cost-conscious
  - do **not** substitute a different model or run a batch without explicit approval. GPT
  Image 2 is created via Leonardo `POST /api/rest/v2/generations` (params nested under
  `parameters`) but **retrieved via the v1 `GET /api/rest/v1/generations/{id}`**.
- The API key lives only in `.env` (`LEONARDO_API_KEY`) - never ship it in the site.

## Run / preview / verify
- Serve: `python -m http.server 8000` (config in `.claude/launch.json`, name `sibo`) →
  http://localhost:8000. Or just open `index.html`.
- **Cache gotcha:** the dev server + browser aggressively cache `data.js`/`app.js`/
  `layout.js` and `styles.css`. After editing shared assets, hard-refresh (Ctrl+F5)
  or bump the relative `?v=...` query string used in the HTML includes. (Screenshot
  capture has been unreliable in this environment - verify via the DOM/console instead.)
- There are no tests or linters. Verify a change by loading the affected page(s) and
  confirming the browser console is **error-free** and the expected counts render.

## Conventions
- Match the existing compact, column-aligned style in `data.js`; keep comments light.
- Any new UI must stay offline and degrade gracefully (emoji/text fallback).
- **Plain hyphens only** in all copy. Never use em dashes, en dashes, or the ellipsis
  glyph; write "-" and "..." instead. The owner wants the text to read as human-written,
  not AI-generated.
- Git: keep `main` synced; **commit only when the user asks**; clear messages; end commit
  messages with a `Co-Authored-By:` trailer.

## Roadmap (parked - not started)
Favourites + shopping list · reintroduction tracker · FODMAP-stack meal builder · instant
food checker · per-food FODMAP-type tags & filtering · PWA offline install · full WCAG/SEO
pass · About/methodology page · deep-linkable food URLs · i18n.
