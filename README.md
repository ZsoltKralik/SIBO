# 🍽️ SIBO Plate

A calm, expertly-researched, **locally-hosted** guide to eating well with **SIBO**
(Small Intestinal Bacterial Overgrowth), built on the **Low-FODMAP framework**.

Instead of a flat list of "can't eat" foods, it tells you **what to eat instead** —
a searchable database of **260+ foods** (including popular & fast-food items like
McDonald's, cola, KFC and apple pie), grab-and-go snacks, a sample day, real recipes,
and an "order-this-not-that" guide for eating out. Trigger foods show a quick
**"try instead"** alternative so you're never left guessing.

---

## ▶️ How to open it

It's a plain static website with **no dependencies and no build step**.

### Option 1 — Just double-click (simplest)
Open `index.html` in any modern browser (Chrome, Edge, Firefox). Everything works
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

| Section | What it gives you |
|---|---|
| **At a glance** | The whole diet in one view — an eat/avoid cheat sheet + the four golden rules |
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
├── index.html         # Page structure & content sections
├── css/
│   └── styles.css     # All styling + light/dark green "modern-wellbeing" theming
├── js/
│   ├── data.js        # The food / swap / recipe / cuisine database (edit here)
│   └── app.js         # Rendering, search, filters, modal, theme toggle
├── fonts/             # Self-hosted Nunito Sans (offline, no CDN)
└── README.md
```

Want to add or tweak a food, swap, or recipe? Everything lives in **`js/data.js`** —
edit the arrays and refresh the page.

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
