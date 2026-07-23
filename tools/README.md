# SIBO Plate - image pipeline (local dev tool)

These scripts pre-generate the food/recipe imagery used by the site. They run on
**your machine only**. The published site stays 100% static and offline - it
references the generated image **files** in `assets/img/` and never touches an API
or your key.

## How it works

```
.env (OPENAI_API_KEY / LEONARDO_API_KEY)   ← your key(s), git-ignored, never committed
tools/image_manifest.json                  ← what to generate (slug + title/subject + optional prompt)
tools/generate_images.py                   ← calls the provider, writes assets/img/<type>/<slug>.webp
assets/img/recipes/*.webp                  ← committed output (referenced by the site)
assets/img/categories/*.webp               ← food-category icons
assets/img/recipe-cats/*.webp              ← recipe-category icons
assets/img/cuisines/*.webp                 ← cuisine icons
assets/img/logo-v2.webp                    ← current brand logo / favicon (`logo.webp` retained for rollback)
```

1. Put your key in `../.env` (copy from `../.env.example`):
   - `OPENAI_API_KEY=...`  ← **default provider (GPT Image)**
   - `LEONARDO_API_KEY=...`  ← optional, used with `--provider leonardo`
2. (Optional, recommended) install Pillow so output is optimised WebP, not large PNG:
   `pip install pillow`
3. Generate:

```bash
# What the live site was built with - GPT Image 2 via the Leonardo API, LOW quality:
python tools/generate_images.py --provider leonardo --model gpt-image-2 --quality low

python tools/generate_images.py --dry-run                                              # preview prompts, spend nothing
python tools/generate_images.py --provider leonardo --model gpt-image-2 --type recipes  # 78 recipe photos
python tools/generate_images.py --provider leonardo --model gpt-image-2 --type cuisines # 21 cuisine icons
# --type one of: recipes | categories | recipe_categories | cuisines | logo
```

- Existing files are **skipped** (cheap, idempotent re-runs) unless you pass `--force`.
- `--quality low|medium|high` controls GPT Image quality/cost (default **medium**; the site uses **low**).
- **GPT Image 2** runs via `--provider leonardo --model gpt-image-2` (Leonardo's v2 API). Leonardo's own
  models work too (`--model phoenix|flux|vision|kino|lucid|albedo`), as does OpenAI-direct
  (`--provider openai`, needs `OPENAI_API_KEY`).
- One failed image won't abort the batch - just re-run to fill any gaps.

## Cost & settings

- **GPT Image 2 via Leonardo** (what the site uses), 1024×1024, LOW: ~**8 Leonardo tokens + ~$0.012**
  per image. The full set (78 recipes + 12 + 8 + 21 icons + logo = 120) ≈ **~$1.4 + ~960 tokens**.
- **OpenAI-direct** (`--provider openai`): ~low $0.016 / medium $0.042 / high $0.167 per 1024² image.
- **Leonardo's own SDXL models** (e.g. AlbedoBase XL): ~11 tokens/image, alchemy off.
- Output is downscaled to ≤896px wide WebP (q82) for fast page loads.
- Tune `OAI_*`, `LEO_*`, `WEBP_*` and the `STYLE_*` prompt fragments at the top of
  `generate_images.py`.

## Regenerating one image you don't like

```bash
python tools/generate_images.py --only caprese-salad --force
```
