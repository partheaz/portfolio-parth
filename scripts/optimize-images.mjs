// One-off image pipeline. Not part of the app bundle.
// Usage: npm install --no-save sharp && node scripts/optimize-images.mjs   (Node >= 20)
// Reads originals from assets-src/, writes AVIF + WebP at each width to public/images/.
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const SRC = "assets-src";
const OUT = "public/images";

const jobs = [
  { file: "100-percent-home.png", name: "100-percent-home", widths: [800, 1600] },
  { file: "100-percent.png", name: "100-percent", widths: [800, 1600] },
  { file: "iron-displays.png", name: "iron-displays", widths: [800, 1600] },
  { file: "graduation-world.png", name: "graduation-world", widths: [800, 1600] },
  { file: "catalog2cart.webp", name: "catalog2cart", widths: [800, 1600] },
  { file: "portrait.jpg", name: "portrait", widths: [576] },
];

await mkdir(OUT, { recursive: true });

for (const { file, name, widths } of jobs) {
  for (const width of widths) {
    const base = sharp(`${SRC}/${file}`).resize({ width, withoutEnlargement: true });
    const webp = await base.clone().webp({ quality: 78 }).toFile(`${OUT}/${name}-${width}.webp`);
    const avif = await base.clone().avif({ quality: 55 }).toFile(`${OUT}/${name}-${width}.avif`);
    console.log(`${name}-${width}: ${webp.width}x${webp.height}  webp ${(webp.size / 1024).toFixed(0)}KB  avif ${(avif.size / 1024).toFixed(0)}KB`);
  }
}
