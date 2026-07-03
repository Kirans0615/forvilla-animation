# After Effects Build Spec — Forvilla Artisan Reel

How to rebuild this exact template as a production AEP. The prototype in this repo
is the animatic-of-record: every layer, pivot, and keyframe below is already proven
on screen, so the AE build is transcription, not design work.

## Project structure

```
Forvilla_Reel_v01.aep
├── 01_MAIN (1080x1920, 30fps, 30:00)        <- render this
│   ├── [adjustment] camera null: push-in 8:00-9:00, pull-back 14:12-15:09
│   ├── 10_INTRO (precomp)                    0:00-2:21
│   ├── 20_BUILD (precomp)                    2:15-8:00
│   ├── 30_PRODUCTS (precomp)                 8:00-14:12
│   ├── 40_MAKER (precomp)                    15:00-20:12
│   ├── 50_WHERE (precomp)                    20:18-25:06
│   └── 60_CTA (precomp)                      25:06-30:00
├── ASSETS/svg (imported Figma exports, converted to shape layers)
├── ASSETS/vendor_sheets (one folder per artisan: products p1-p3, palette swatches)
└── DATA (Essential Graphics text: names, story lines, event, booth, handle)
```

## Importing the SVGs

1. Export each element from Figma as SVG (this repo's `assets/` mirrors that export).
2. Import into AE and convert to shape layers ("Create Shapes from Vector Layer"),
   or paste paths directly from Figma for single elements. Keep one shape layer per
   animated part: posts, counter, canopy, sign, bunting, products, avatar, pin, logo.
3. Set anchor points to the physical pivot before animating:
   sign → rope top-center; canopy → top edge; ground/trees → base center;
   products → base center. (The prototype's transforms document each pivot.)

## Key animations (frame numbers at 30fps)

| Layer | Frames | Animation | Easing |
|---|---|---|---|
| Ground | 75–93 | scale 0→100% | overshoot (see expression below) |
| Trees L/R | 90–108 / 95–113 | scale 0→100% from base | overshoot |
| Posts | 105–125 | position Y, drop 900px | overshoot |
| Counter | 126–146 | position Y, rise 420px | overshoot |
| Canopy | 147–167 | position Y drop + scale Y 125→100% | elastic settle |
| Sign | 171–207 | rotation -85°→0° around rope pivot | elastic settle |
| Bunting | 195–216 | scale X 0→100% (draw across counter) | ease out |
| Sparkles | 212–240 | staggered scale+rise+rotate, 2-frame offsets | ease out |
| Products 1/2/3 | 270 / 327 / 384 (+18) | scale 0→105% at base pivot | overshoot |
| Label chips | +8 after each product | rise 30px + scale 60→100% | overshoot |
| Avatar | 450–471 | position X slide-in 320px | overshoot |
| Story card | 465–483 | pop + per-line opacity stagger | overshoot |
| Where card | 618–639 | position Y rise 360px | overshoot |
| Pin | 642–660, loop to 738 | drop + `bounce` on Y | overshoot + hold bounce |
| Scene → phone | 756–789 | master null scale 100→38%, phone frame rises | ease in-out |
| CTA logo | 804–825, pulse after | scale 0→90%, then 3% sine pulse | overshoot |

Overshoot expression (drop on scale/position instead of hand-tuning curves):

```
// ease-out back, c = 1.70158
t = Math.min(1, Math.max(0, (time - inPoint) / dur));
c = 1.70158; s = 1 + (c+1)*Math.pow(t-1,3) + c*Math.pow(t-1,2);
```

## Template reusability (the part that makes 6 reels cheap)

1. All vendor-specific values live in **Essential Graphics**: two sign lines, three
   product names, two story lines, handle, event name/date/venue, booth number.
2. Palette: canopy/bunting/accent colors are Fill effects driven by a control layer
   — one color control per swatch in `template/configs.json`.
3. Product artwork: each vendor's three products are a precomp
   (`vendor_sheets/<vendor>/p1..p3`); swapping the precomp source swaps the goods.
4. Producing reel N is: duplicate MAIN → pick vendor sheet → fill Essential
   Graphics → render. No keyframes touched. That's exactly how the six MP4s in
   `renders/` were produced from `template/configs.json` in the prototype.

## Render settings

H.264 (via Adobe Media Encoder), 1080x1920, 30fps, ~10-12 Mbps VBR, AAC silent or
music bed as supplied. The repo's MP4s used the same geometry: libx264, CRF 20.
