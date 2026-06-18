#!/usr/bin/env python3
"""
SIBO Plate — image generator  (LOCAL DEV TOOL — never shipped to the site)
==========================================================================
Generates the food/recipe imagery the site references in assets/img/.
Runs on your machine only; the published static site contains no API key
and makes no API calls — it just loads the generated image files.

Providers:
  --provider openai    (default)  OpenAI GPT Image  ->  needs OPENAI_API_KEY
  --provider leonardo              Leonardo.ai       ->  needs LEONARDO_API_KEY
Keys are read from ../.env (git-ignored) or the environment.

USAGE
  python tools/generate_images.py --dry-run                       # preview prompts only
  python tools/generate_images.py --only roast-chicken-tray-bake  # single test image
  python tools/generate_images.py --type recipes                  # all 40 recipe photos
  python tools/generate_images.py --type categories               # all 11 category icons
  python tools/generate_images.py                                 # everything
  python tools/generate_images.py --quality low                   # cheaper (OpenAI)
  python tools/generate_images.py --provider leonardo --model albedo

Existing files are skipped (cheap, idempotent re-runs) unless --force.
Pillow (optional, `pip install pillow`) -> optimised WebP; otherwise PNG.
"""
import argparse, base64, io, json, os, time, urllib.request, urllib.error
from pathlib import Path

ROOT     = Path(__file__).resolve().parent.parent
ENV_PATH = ROOT / ".env"
MANIFEST = Path(__file__).resolve().parent / "image_manifest.json"
OUT      = ROOT / "assets" / "img"

# ---------- OpenAI GPT Image (default) ----------
OAI_API     = "https://api.openai.com/v1"
OAI_SIZE    = "1024x1024"
OAI_QUALITY = "medium"                                          # low | medium | high
OAI_PRICE   = {"low": 0.016, "medium": 0.042, "high": 0.167}   # ~USD / 1024² image (estimate)

# ---------- Leonardo.ai (alternative) ----------
LEO_API    = "https://cloud.leonardo.ai/api/rest/v1"
LEO_API_V2 = "https://cloud.leonardo.ai/api/rest/v2"   # GPT Image models live here
# GPT Image via Leonardo (string model ids, NOT UUIDs) — use --model gpt-image-2
LEO_GPT_MODELS = ("gpt-image-2", "gpt-image-1.5")
LEO_MODELS = {
    "albedo":  "2067ae52-33fd-4a82-bb92-c2c55e7d2786",  # AlbedoBase XL
    "vision":  "5c232a9e-9061-4777-980a-ddc8e65647c6",  # Leonardo Vision XL
    "kino":    "aa77f04e-3eec-4034-9c07-d0f619684628",  # Leonardo Kino XL
    "phoenix": "de7d3faf-762f-48e0-b3b7-9d0ac3a3fcf3",  # Phoenix 1.0
    "flux":    "b2614463-296c-462a-9586-aafdb8f00e36",  # Flux Dev
    "lucid":   "05ce0082-2d80-4a2d-8653-4d1c85e2418e",  # Lucid Realism
}
LEO_DEFAULT_MODEL = "albedo"
LEO_W = LEO_H = 1024
LEO_ALCHEMY = False

# ---------- shared ----------
WEBP_MAX_W, WEBP_QUALITY = 896, 82
STYLE_RECIPE = ("realistic professional food photography, photorealistic, natural daylight, "
                "overhead shot styled on a light dish, fresh vibrant ingredients, clean minimal "
                "pale background, shallow depth of field, appetising, high detail, no text, no watermark")
STYLE_ICON   = ("clean modern 3d icon, single centered subject, soft studio lighting, smooth matte "
                "finish, soft pastel mint-green background, gentle soft shadow, minimal, friendly, "
                "cohesive app-icon style, no text, no labels, no words, no watermark")
STYLE_LOGO   = ("modern minimalist circular app-icon logo badge, fresh green gradient background, "
                "simple clean white leaf-and-plate symbol centered, flat design, soft shadow, "
                "no text, no words, no letters, no watermark")
NEGATIVE     = ("text, words, letters, watermark, logo, hands, fingers, blurry, low quality, "
                "oversaturated, plastic, artificial, messy, cluttered, deep fried, greasy")

# Per-type output sub-directory under assets/img/ and prompt style
TYPE_DIR   = {"recipes": "recipes", "categories": "categories",
              "recipe_categories": "recipe-cats", "cuisines": "cuisines", "logo": ""}
TYPE_STYLE = {"recipes": STYLE_RECIPE, "categories": STYLE_ICON, "recipe_categories": STYLE_ICON,
              "cuisines": STYLE_ICON, "logo": STYLE_LOGO}
ALL_TYPES  = ["recipes", "categories", "recipe_categories", "cuisines", "logo"]


def load_env(p):
    env = {}
    if p.exists():
        for line in p.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                env[k.strip()] = v.strip().strip('"').strip("'")
    return env

ENV = load_env(ENV_PATH)
def key(name): return os.environ.get(name) or ENV.get(name)


def http_json(url, headers, body=None, method="GET", timeout=180):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        raise RuntimeError(f"HTTP {e.code} {method} {url}\n{e.read().decode(errors='replace')}")


def http_bytes(url, headers=None, timeout=180):
    req = urllib.request.Request(url, headers=headers or {"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


# ---------- OpenAI ----------
def oai_pick_model(want):
    """Use --model if given, else auto-detect the newest gpt-image-* the key can see."""
    if want:
        return want
    data = http_json(f"{OAI_API}/models", {"authorization": f"Bearer {key('OPENAI_API_KEY')}"}).get("data", [])
    ids = sorted(m["id"] for m in data if str(m.get("id", "")).startswith("gpt-image"))
    for pref in ("gpt-image-2", "gpt-image-1"):
        hit = [i for i in ids if i.startswith(pref)]
        if hit:
            return sorted(hit)[-1]
    return ids[-1] if ids else "gpt-image-1"


def oai_generate(prompt, model, quality):
    h = {"authorization": f"Bearer {key('OPENAI_API_KEY')}", "content-type": "application/json"}
    body = {"model": model, "prompt": prompt, "size": OAI_SIZE, "quality": quality, "n": 1}
    d = http_json(f"{OAI_API}/images/generations", h, body, "POST", timeout=240)
    item = (d.get("data") or [{}])[0]
    if item.get("b64_json"):
        return base64.b64decode(item["b64_json"])
    if item.get("url"):
        return http_bytes(item["url"])
    raise RuntimeError("OpenAI returned no image data")


# ---------- Leonardo ----------
def leo_generate(prompt, model, quality="low"):
    h = {"authorization": f"Bearer {key('LEONARDO_API_KEY')}", "accept": "application/json",
         "content-type": "application/json"}
    if str(model) in LEO_GPT_MODELS or str(model).startswith("gpt-image"):
        # OpenAI GPT Image via Leonardo's v2 API — params nest under "parameters"
        body = {"public": False, "model": model, "parameters": {
            "quality": quality.upper(), "prompt": prompt, "quantity": 1,
            "width": LEO_W, "height": LEO_H, "prompt_enhance": "OFF"}}
        gid = (http_json(f"{LEO_API_V2}/generations", h, body, "POST").get("generate") or {}).get("generationId")
    else:
        model_id = LEO_MODELS.get(model, model)
        body = {"modelId": model_id, "prompt": prompt, "negative_prompt": NEGATIVE,
                "num_images": 1, "width": LEO_W, "height": LEO_H, "alchemy": LEO_ALCHEMY, "public": False}
        gid = (http_json(f"{LEO_API}/generations", h, body, "POST").get("sdGenerationJob") or {}).get("generationId")
    if not gid:
        raise RuntimeError("No generationId returned")
    # Retrieve via the v1 generations endpoint — v2 is POST-only (no GET).
    for _ in range(60):
        g = http_json(f"{LEO_API}/generations/{gid}", h).get("generations_by_pk") or {}
        if g.get("status") == "COMPLETE":
            imgs = g.get("generated_images") or []
            return http_bytes(imgs[0]["url"]) if imgs else None
        if g.get("status") == "FAILED":
            raise RuntimeError("Leonardo generation FAILED")
        time.sleep(3)
    raise RuntimeError("Leonardo timed out")


def leo_balance():
    h = {"authorization": f"Bearer {key('LEONARDO_API_KEY')}", "accept": "application/json"}
    ud = (http_json(f"{LEO_API}/me", h).get("user_details") or [{}])[0]
    return ud.get("apiPaidTokens")


# ---------- shared ----------
def write_image(raw, dest_noext):
    dest_noext.parent.mkdir(parents=True, exist_ok=True)
    try:
        from PIL import Image
        im = Image.open(io.BytesIO(raw)).convert("RGB")
        if im.width > WEBP_MAX_W:
            im = im.resize((WEBP_MAX_W, round(im.height * WEBP_MAX_W / im.width)))
        out = dest_noext.with_suffix(".webp")
        im.save(out, "WEBP", quality=WEBP_QUALITY, method=6)
    except Exception:
        out = dest_noext.with_suffix(".png")
        out.write_bytes(raw)
    return out


def build_prompt(entry, kind, provider):
    if entry.get("prompt"):
        return entry["prompt"]
    subject = entry.get("title") or entry.get("subject") or entry.get("label") or ""
    return f'{subject}. {TYPE_STYLE.get(kind, STYLE_ICON)}'


def main():
    ap = argparse.ArgumentParser(description="Generate SIBO Plate images (OpenAI GPT Image or Leonardo)")
    ap.add_argument("--provider", choices=["openai", "leonardo"], default="openai")
    ap.add_argument("--type", choices=ALL_TYPES, help="limit to one type")
    ap.add_argument("--only", help="generate a single slug")
    ap.add_argument("--limit", type=int, help="cap number of images")
    ap.add_argument("--model", help="OpenAI model id, or a Leonardo alias/id")
    ap.add_argument("--quality", choices=["low", "medium", "high"], default=OAI_QUALITY, help="OpenAI quality")
    ap.add_argument("--force", action="store_true", help="re-generate even if the file exists")
    ap.add_argument("--dry-run", action="store_true", help="print prompts only")
    a = ap.parse_args()

    if a.provider == "openai" and not key("OPENAI_API_KEY"):
        raise SystemExit("No OPENAI_API_KEY found in .env or environment.")
    if a.provider == "leonardo" and not key("LEONARDO_API_KEY"):
        raise SystemExit("No LEONARDO_API_KEY found in .env or environment.")

    man = json.loads(MANIFEST.read_text(encoding="utf-8"))
    jobs = []
    for kind in ([a.type] if a.type else ALL_TYPES):
        for e in man.get(kind, []):
            if a.only and e["slug"] != a.only:
                continue
            jobs.append((kind, e))
    if a.limit:
        jobs = jobs[:a.limit]
    if not jobs:
        raise SystemExit("No matching manifest entries.")

    if a.provider == "openai":
        model = oai_pick_model(a.model)
        per = OAI_PRICE.get(a.quality, 0)
        print(f"{len(jobs)} image(s) | OpenAI {model} | {OAI_SIZE} | quality={a.quality}")
        print(f"Estimated cost: ~${per * len(jobs):.2f}  (~${per:.3f}/image, billed to your OpenAI account)")
    else:
        requested = a.model or LEO_DEFAULT_MODEL
        if requested in LEO_GPT_MODELS or str(requested).startswith("gpt-image"):
            model = requested
            print(f"{len(jobs)} image(s) | Leonardo {model} (v2) | {LEO_W}x{LEO_H} | quality={a.quality.upper()}")
        else:
            model = LEO_MODELS.get(requested, requested)
            print(f"{len(jobs)} image(s) | Leonardo {model} | {LEO_W}x{LEO_H} | alchemy={LEO_ALCHEMY}")

    if a.dry_run:
        for kind, e in jobs:
            print(f"  [{kind}] {e['slug']}\n      {build_prompt(e, kind, a.provider)}")
        return

    before = leo_balance() if a.provider == "leonardo" else None
    done = 0
    failed = []
    for i, (kind, e) in enumerate(jobs, 1):
        subdir = TYPE_DIR.get(kind, kind)
        dest = (OUT / subdir / e["slug"]) if subdir else (OUT / e["slug"])
        if not a.force and (dest.with_suffix(".webp").exists() or dest.with_suffix(".png").exists()):
            print(f"[{i}/{len(jobs)}] skip {kind}/{e['slug']} (exists)")
            continue
        print(f"[{i}/{len(jobs)}] {kind}/{e['slug']} ...")
        try:
            prompt = build_prompt(e, kind, a.provider)
            raw = oai_generate(prompt, model, a.quality) if a.provider == "openai" else leo_generate(prompt, model, a.quality)
            if not raw:
                print("    no image returned"); failed.append(e["slug"]); continue
            out = write_image(raw, dest)
            print(f"    saved {out.relative_to(ROOT)} ({len(raw) // 1024} KB source)")
            done += 1
        except Exception as ex:                       # one failure shouldn't abort the batch
            print(f"    FAILED {e['slug']}: {ex}")
            failed.append(e["slug"])
        time.sleep(0.5)

    if a.provider == "leonardo":
        after = leo_balance()
        spent = (before - after) if (before is not None and after is not None) else "?"
        print(f"Done. {done} image(s). Leonardo tokens spent: {spent}  (balance {before} -> {after})")
    else:
        print(f"Done. {done} image(s). Approx OpenAI cost: ~${OAI_PRICE.get(a.quality, 0) * done:.2f}")
    if failed:
        print(f"FAILED ({len(failed)}): {', '.join(failed)}")
        print("Re-run the same command to retry just these (existing files are skipped without --force).")


if __name__ == "__main__":
    main()
