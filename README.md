# 🍽️ SIBO Plate

A calm, expertly-researched, **locally-hosted** guide to eating well with **SIBO**
(Small Intestinal Bacterial Overgrowth).

Instead of a flat list of "can't eat" foods, it tells you **what to eat instead** —
practical food lists, grab-and-go snacks, a sample day, real recipes, and an
"order-this-not-that" guide for eating out.

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
| **The basics** | Why FODMAPs matter and the few rules that do most of the work |
| **Food list** | A searchable, filterable database with 🟢 enjoy / 🟡 portion / 🔴 avoid ratings |
| **Eat this, not that** | Swap cards — pizza, pasta, garlic bread, ramen, milkshakes and more |
| **Snacks** | Grab-and-go options that won't trigger symptoms |
| **A day on a plate** | A full, easy low-FODMAP sample day |
| **Recipes** | Six gut-friendly recipes (start with the garlic-infused oil) |
| **Eating out** | What to order / skip across 8 cuisines |
| **Tips & FAQ** | Kitchen habits, meal spacing, and the main expert diet approaches |

Features: light/dark mode, live search & filtering, responsive layout, printable,
and fully offline.

---

## 📁 Project structure

```
SIBO/
├── index.html        # Page structure & content sections
├── css/
│   └── styles.css     # All styling + light/dark theming
├── js/
│   ├── data.js        # The food / swap / recipe / cuisine database (edit here)
│   └── app.js         # Rendering, search, filters, modal, theme toggle
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

Leading clinical and FODMAP resources, including Monash University (the FODMAP
research pioneers), Cleveland Clinic, Dr. Mark Pimentel / Cedars-Sinai
(low-fermentation diet), and Dr. Allison Siebecker's SIBO work. Full links are in
the **"Researched from"** section at the bottom of the site.
