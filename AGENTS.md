# AGENTS.md

This project's full agent/AI context lives in **[`CLAUDE.md`](CLAUDE.md)** — start there.

Quick orientation:
- **Static, offline, no-build** site (plain HTML/CSS/vanilla JS). No frameworks, no CDNs,
  no package manager. Runs via `python -m http.server 8000` or by opening `index.html`.
- All content is in **`js/data.js`**; shared header/footer in `js/layout.js`; page-aware
  rendering in `js/app.js`.
- Images are **pre-generated locally** (GPT Image 2 via the Leonardo API) and committed
  under `assets/img/`; the site only references files and falls back to emoji. See
  [`tools/README.md`](tools/README.md).
- **Never commit `.env`.** Status: work in progress, not launched. Keep `main` synced.

Human-facing docs: [`README.md`](README.md).
