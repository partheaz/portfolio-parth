// One-off image pipeline. Not part of the app bundle.
// Usage: npm install --no-save sharp && node scripts/optimize-images.mjs   (Node >= 20)
// Reads originals from assets-src/, writes AVIF + WebP at each width to public/images/.
// Jobs marked `og` (project covers) also get a 1200x630 JPG in public/images/og/ for link previews;
// `og` is the crop position. The default card for every other page is og/default.jpg.
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const SRC = "assets-src";
const OUT = "public/images";

const jobs = [
  { file: "100-percent-cover.webp", name: "100-percent-cover", og: "top", widths: [800, 1600] },
  { file: "masienda-products.jpg", name: "masienda-products", og: "centre", widths: [800, 1600] },
  { file: "masienda-search.webp", name: "masienda-search", widths: [800, 1600] },
  { file: "masienda-cart.png", name: "masienda-cart", widths: [400, 782] },
  { file: "criquet-film.png", name: "criquet-film", widths: [800, 1600] },
  { file: "criquet-pdp.png", name: "criquet-pdp", og: "centre", widths: [800, 1600] },
  { file: "criquet-collection-mobile.webp", name: "criquet-collection-mobile", widths: [394] },
  { file: "iron-displays.png", name: "iron-displays", og: "centre", widths: [800, 1600] },
  { file: "graduation-world.png", name: "graduation-world", og: "centre", widths: [800, 1600] },
  { file: "catalog2cart.webp", name: "catalog2cart", og: "centre", widths: [800, 1600] },
  { file: "almsthre-home.png", name: "almsthre-home", og: "centre", widths: [800, 1600] },
  { file: "almsthre-film.png", name: "almsthre-film", widths: [800, 1440] },
  { file: "aerospray-film.png", name: "aerospray-film", og: "centre", widths: [800, 1280] },
  { file: "intervel-pdp.png", name: "intervel-pdp", og: "centre", widths: [800, 1600] },
  { file: "silent-wake-up.png", name: "silent-wake-up", og: "centre", widths: [800, 1600] },
  { file: "slide-chat.png", name: "slide-chat", og: "centre", widths: [800, 1600] },
  { file: "slide-cart.png", name: "slide-cart", widths: [800, 1600] },
  { file: "portrait.jpg", name: "portrait", widths: [440, 880] },
];

await mkdir(OUT, { recursive: true });

// Pass a name to process just that job: node scripts/optimize-images.mjs 100-percent-cover
// Pass "og" to rebuild only the link-preview JPGs.
const only = process.argv[2];
const ogOnly = only === "og";

const OG = { width: 1200, height: 630 };
await mkdir(`${OUT}/og`, { recursive: true });

for (const { file, name, widths, og } of jobs.filter((j) => !only || ogOnly || j.name === only)) {
  if (og) {
    const out = await sharp(`${SRC}/${file}`)
      .resize({ ...OG, fit: "cover", position: og })
      .flatten({ background: "#131412" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(`${OUT}/og/${name}.jpg`);
    console.log(`og/${name}: ${(out.size / 1024).toFixed(0)}KB`);
  }
  if (ogOnly) continue;
  for (const width of widths) {
    const base = sharp(`${SRC}/${file}`).resize({ width, withoutEnlargement: true });
    const webp = await base.clone().webp({ quality: 78 }).toFile(`${OUT}/${name}-${width}.webp`);
    const avif = await base.clone().avif({ quality: 55 }).toFile(`${OUT}/${name}-${width}.avif`);
    console.log(`${name}-${width}: ${webp.width}x${webp.height}  webp ${(webp.size / 1024).toFixed(0)}KB  avif ${(avif.size / 1024).toFixed(0)}KB`);
  }
}

// Default link preview: name and role on the site's dark background, portrait on the right.
if (!only || ogOnly) {
  const portrait = await sharp(`${SRC}/portrait.jpg`).resize({ width: 504, height: OG.height, fit: "cover", position: "top" }).toBuffer();
  const text = `<svg width="${OG.width}" height="${OG.height}" xmlns="http://www.w3.org/2000/svg">
    <style>
      .mono { font: 500 20px Menlo, monospace; letter-spacing: 3px; fill: #8f8c86; }
      .big { font: 700 84px Helvetica, Arial, sans-serif; letter-spacing: -2px; fill: #f2ede4; }
      .sub { font: 400 28px Helvetica, Arial, sans-serif; fill: #c9c4bb; }
    </style>
    <rect x="72" y="92" width="10" height="10" rx="5" fill="#C6F24D"/>
    <text x="96" y="103" class="mono">PARTH PANDEY · KATHMANDU</text>
    <text x="72" y="270" class="big">Shopify Web</text>
    <text x="72" y="362" class="big">Developer</text>
    <text x="72" y="450" class="sub">Custom themes, Shopify apps,</text>
    <text x="72" y="492" class="sub">migrations and integrations.</text>
    <text x="72" y="566" class="mono">PARTHEAZPANDEY.SPACE</text>
  </svg>`;
  const out = await sharp({ create: { ...OG, channels: 3, background: "#131412" } })
    .composite([{ input: Buffer.from(text), left: 0, top: 0 }, { input: portrait, left: OG.width - 504, top: 0 }])
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(`${OUT}/og/default.jpg`);
  console.log(`og/default: ${(out.size / 1024).toFixed(0)}KB`);
}
