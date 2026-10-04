// One-off image pipeline. Not part of the app bundle.
// Usage: npm install --no-save sharp && node scripts/optimize-images.mjs   (Node >= 20)
// Reads originals from assets-src/, writes AVIF + WebP at each width to public/images/.
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const SRC = "assets-src";
const OUT = "public/images";

const jobs = [
  { file: "100-percent-cover.webp", name: "100-percent-cover", widths: [800, 1600] },
  { file: "masienda-products.jpg", name: "masienda-products", widths: [800, 1600] },
  { file: "masienda-search.webp", name: "masienda-search", widths: [800, 1600] },
  { file: "masienda-cart.png", name: "masienda-cart", widths: [400, 782] },
  { file: "criquet-film.png", name: "criquet-film", widths: [800, 1600] },
  { file: "criquet-pdp.png", name: "criquet-pdp", widths: [800, 1600] },
  { file: "criquet-collection-mobile.webp", name: "criquet-collection-mobile", widths: [394] },
  { file: "iron-displays.png", name: "iron-displays", widths: [800, 1600] },
  { file: "graduation-world.png", name: "graduation-world", widths: [800, 1600] },
  { file: "catalog2cart.webp", name: "catalog2cart", widths: [800, 1600] },
  { file: "almsthre-home.png", name: "almsthre-home", widths: [800, 1600] },
  { file: "almsthre-film.png", name: "almsthre-film", widths: [800, 1440] },
  { file: "aerospray-film.png", name: "aerospray-film", widths: [800, 1280] },
  { file: "intervel-pdp.png", name: "intervel-pdp", widths: [800, 1600] },
  { file: "silent-wake-up.png", name: "silent-wake-up", widths: [800, 1600] },
  { file: "portrait.jpg", name: "portrait", widths: [440, 880] },
];

await mkdir(OUT, { recursive: true });

// Pass a name to process just that job: node scripts/optimize-images.mjs 100-percent-cover
const only = process.argv[2];

for (const { file, name, widths } of jobs.filter((j) => !only || j.name === only)) {
  for (const width of widths) {
    const base = sharp(`${SRC}/${file}`).resize({ width, withoutEnlargement: true });
    const webp = await base.clone().webp({ quality: 78 }).toFile(`${OUT}/${name}-${width}.webp`);
    const avif = await base.clone().avif({ quality: 55 }).toFile(`${OUT}/${name}-${width}.avif`);
    console.log(`${name}-${width}: ${webp.width}x${webp.height}  webp ${(webp.size / 1024).toFixed(0)}KB  avif ${(avif.size / 1024).toFixed(0)}KB`);
  }
}
