#!/usr/bin/env node
// Render reels: steps the template's deterministic seek() frame by frame in
// headless Chromium, screenshots each frame, and assembles MP4s with ffmpeg.
//
// Usage:  node render/render.mjs [vendorKey ...]     (default: all six)
//         FRAMES_ONLY=t0,t1,... node render/render.mjs candles   (QA stills)
import { chromium } from "playwright";
import { execFileSync, spawn } from "node:child_process";
import { mkdirSync, rmSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import http from "node:http";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FPS = 30, DUR = 30, PORT = Number(process.env.PORT) || 8642;
const MIME = { ".html": "text/html", ".svg": "image/svg+xml", ".json": "application/json" };

const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(new URL(req.url, "http://x").pathname));
  try {
    const body = readFileSync(p.endsWith("/") ? p + "index.html" : p);
    res.writeHead(200, { "content-type": MIME[path.extname(p)] ?? "application/octet-stream" });
    res.end(body);
  } catch { res.writeHead(404); res.end(); }
});
await new Promise(r => server.listen(PORT, r));

const cfgs = JSON.parse(readFileSync(path.join(ROOT, "template/configs.json")));
const vendors = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(cfgs);
const qaFrames = process.env.FRAMES_ONLY?.split(",").map(Number);

const browser = await chromium.launch();
for (const key of vendors) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto(`http://127.0.0.1:${PORT}/index.html?vendor=${key}&render=1`);
  await page.waitForFunction("window.__ready === true");
  await page.waitForTimeout(200);

  if (qaFrames) {
    mkdirSync(path.join(ROOT, "render/qa"), { recursive: true });
    for (const t of qaFrames) {
      await page.evaluate(s => window.seekTo(s), t);
      await page.screenshot({ path: path.join(ROOT, `render/qa/${key}_${t.toFixed(2)}.png`) });
    }
    await page.close();
    continue;
  }

  const frameDir = path.join(ROOT, `render/frames_${key}`);
  rmSync(frameDir, { recursive: true, force: true });
  mkdirSync(frameDir, { recursive: true });
  const total = FPS * DUR;
  const t0 = Date.now();
  for (let f = 0; f < total; f++) {
    await page.evaluate(s => window.seekTo(s), f / FPS);
    await page.screenshot({ path: path.join(frameDir, `f${String(f).padStart(4, "0")}.png`) });
    if (f % 150 === 0) console.log(`${key}: frame ${f}/${total} (${((Date.now()-t0)/1000)|0}s)`);
  }
  await page.close();

  const slug = cfgs[key].name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const out = path.join(ROOT, `renders/forvilla-reel-${slug}.mp4`);
  execFileSync("ffmpeg", ["-y", "-framerate", String(FPS), "-i", path.join(frameDir, "f%04d.png"),
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-preset", "slow",
    "-movflags", "+faststart", out], { stdio: "inherit" });
  rmSync(frameDir, { recursive: true, force: true });
  console.log(`${key}: wrote ${out}`);
}
await browser.close();
server.close();
