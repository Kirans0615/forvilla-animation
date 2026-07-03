# Forvilla — 30-Second Artisan Reel (template + 6 reels)

Working response to the Forvilla animation brief: a 30-second vertical reel where a
market booth **builds itself piece by piece** (the Sims-style) from SVG assets, then
tells one artisan's story — template first, then six reels from the same template
with different vendors, products, palettes, and event data.

Watch it without downloading anything:

- **Live template player** (pick a vendor, play, scrub any frame):
  https://kirans0615.github.io/forvilla-animation/
- **Six finished reels (MP4, 1080x1920, 30s, 30fps):** in [`renders/`](renders/) —
  GitHub plays them in the browser.

## Honest note on tooling

I don't ship a native .AEP file from this environment, so the deliverable here is a
**deterministic motion prototype**: hand-drawn SVG assets (structured exactly like
Figma exports), a data-driven animation template with a seekable 30-second timeline,
and the six reels rendered from it frame-by-frame (headless Chromium → ffmpeg).
[`docs/after-effects-build-spec.md`](docs/after-effects-build-spec.md) maps every
layer, pivot, keyframe, and easing to an After Effects comp structure with Essential
Graphics for the swappable fields — so the AE version is a transcription job with
zero open design questions, and the timing is already client-approvable from the
MP4s.

## What's in the repo

| Piece | Where |
|---|---|
| Storyboard / narrative flow (beat sheet with timecodes) | [`docs/storyboard.md`](docs/storyboard.md) |
| SVG asset library (booth parts, scene, UI, logo — 17 files) | [`assets/`](assets/) |
| Vendor product sheets (3 illustrated products per artisan) | [`assets/products-*.svg`](assets/) |
| The template: scene assembly + 30s timeline + player | [`index.html`](index.html) |
| Vendor data driving all six reels | [`template/configs.json`](template/configs.json) |
| Frame-exact renderer (Chromium + ffmpeg) | [`render/render.mjs`](render/render.mjs) |
| Six 30s reels | [`renders/`](renders/) |
| After Effects build spec | [`docs/after-effects-build-spec.md`](docs/after-effects-build-spec.md) |

## The six reels

All six vendors, events, and booth numbers come from the vendor dataset I built for
Forvilla's market-data assignment (github.com/Kirans0615/forvilla-assignment), so
names, booths, and venues are consistent across both projects.

1. Willow & Wick Candle Co. — Summer Makers Market, Georgetown Waterfront Park
2. Terra Luna Ceramics — Riverside Makers Bazaar, Yards Park
3. Prairie Honey Co. — Summer Makers Market, Georgetown Waterfront Park
4. Copper Fox Jewelry — Village Craft Fair, Old Town Market Square
5. Bloom & Bramble Botanicals — Handmade at the Harbor, National Harbor Plaza
6. Sweet Alchemy Bakes — Late Summer Craft Collective, Silver Spring Civic Plaza

## Reproduce the renders

```bash
npm install          # playwright
node render/render.mjs             # all six reels -> renders/*.mp4
node render/render.mjs pottery     # just one vendor
```

Producing a seventh reel is: add one entry to `template/configs.json`, draw (or
export from Figma) a three-product sheet, run the renderer. No animation edits.
