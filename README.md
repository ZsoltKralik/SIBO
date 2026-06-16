# 🍽️ SIBO Plate

A free, expertly-researched, **multi-page static** guide to eating well with **SIBO**
(Small Intestinal Bacterial Overgrowth), built on the **Low-FODMAP framework**.
Runs locally or publishes free to the web.

Instead of a flat list of "can't eat" foods, it tells you **what to eat instead** —
a searchable database of **260+ foods** (including popular & fast-food items like
McDonald's, cola, KFC and apple pie), grab-and-go snacks, a sample day, real recipes,
and an "order-this-not-that" guide for eating out. Trigger foods show a quick
**"try instead"** alternative so you're never left guessing.

---

## ▶️ How to open it

It's a plain **multi-page static** website with **no dependencies and no build step**.
Open `index.html` (the Home page) and use the top tabs to move between pages.

### Option 1 — Just double-click (simplest)
Open `index.html` in any modern browser (Chrome, Edge, Firefox). Every page works
straight from `file://`.

### Option 2 — Run a tiny local server (recommended)
A local server avoids any browser quirks and gives you a clean `localhost` URL.

**Python** (already on most machines):
```bash
cd C:\CLAUDE\SIBO
python -m http.server 8000
```
Then visit **http://localhost:8000**

**Node.js** (if you prefer):
```bash
cd C:\CLAUDE\SIBO
npx serve .
```

---

## 🧭 What's inside

Each tab is now its own page (see structure below).

| Tab / page | What it gives you |
|---|---|
| **Home** (`index.html`) | The whole diet at a glance — eat/avoid cheat sheet, four golden rules, quick links |
| **Food list** | A searchable, filterable database of 260+ foods with 🟢 enjoy / 🟡 small / 🔴 avoid ratings, portion notes, and "try instead" hints |
| **Eat this, not that** | Swap cards — Big Mac, pizza, cola, KFC, apple pie, ramen and more |
| **Snacks** | Grab-and-go options that won't trigger symptoms |
| **A day's food** | A full, easy Low-FODMAP sample day |
| **Recipes** | Six gut-friendly recipes (start with the garlic-infused oil) |
| **Eating out** | What to order / skip across 8 cuisines |
| **The journey** | The three Low-FODMAP phases (elimination → reintroduction → personalisation) + FAQ |

Features: a fresh-green, modern-wellbeing design with a self-hosted font, light/dark
mode, live search & filtering, responsive layout, printable, and **fully offline** (no CDNs).

---

## 📁 Project structure

```
SIBO/
├── index.html         # Home (hero, at-a-glance, quick links)
├── foods.html         # Food List (searchable explorer)
├── swaps.html         # Eat this, not that
├── snacks.html        # Grab-and-go snacks
├── meals.html         # A day's food
├── recipes.html       # Recipes (+ modal)
├── eating-out.html    # Eating out by cuisine
├── journey.html       # The 3 phases, FAQ, tips, sources
├── css/
│   └── styles.css     # All styling + light/dark green "modern-wellbeing" theming
├── js/
│   ├── data.js        # Food / swap / recipe / cuisine database (edit here)
│   ├── layout.js      # Shared header/footer, active tab, theme, mobile nav
│   └── app.js         # Page-aware content rendering (search, filters, modal)
├── fonts/             # Self-hosted Nunito Sans (offline, no CDN)
├── .nojekyll          # Lets GitHub Pages serve the files as-is
└── README.md
```

- **Add/edit a food, swap, or recipe:** everything lives in **`js/data.js`** — edit the arrays and refresh.
- **Add or rename a tab:** the nav is defined once in **`js/layout.js`**; `app.js` renders only the containers that exist on each page, so pages stay simple.

---

## 🌍 Publish it free (GitHub Pages)

The site is ready to host as-is — all paths are relative, so it works from a
project subpath, from `file://`, or any static host.

1. Push to GitHub (done): repo **`ZsoltKralik/SIBO`**.
2. In the repo: **Settings → Pages → Source: "Deploy from a branch" → Branch
   `main` / `/ (root)` → Save**.
3. After ~1 minute it's live at **https://zsoltkralik.github.io/SIBO/**.

(A custom domain can be added later under the same Pages settings.)

---

## ⚕️ Important disclaimer

This site is **educational guidance, not medical advice**. SIBO is a medical
condition and food tolerance is highly individual. The strict elimination phase is
meant to be **temporary** (typically 2–6 weeks) and followed by structured
reintroduction. Please work with your doctor or a registered dietitian.

---

## 📚 Researched from

Leading clinical and Low-FODMAP resources, including Monash University (the FODMAP
research pioneers), Cleveland Clinic, and specialist IBS/SIBO dietitians for the
fast-food and branded items. Notably, ratings reflect current evidence — e.g. Monash's
finding that **regular cola *and* Coke Zero are high-FODMAP** (fructans). Full links
are in the **"Researched from"** section at the bottom of the site.
