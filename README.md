# Parth Pandey — Shopify Developer portfolio

The "Storefront Specimen" redesign: a bone-coloured, hairline-ruled, 12-column editorial site whose navigation borrows commerce patterns (variant swatches, a cart-drawer nav, spec-sheet cards, case studies laid out like product pages). Desktop and mobile layouts are built separately. See `CLAUDE.md` for the full brief and `design_handoff/` for the source design.

## Stack

Vite 6 · React 18 · TypeScript (strict) · react-router-dom 7 · CSS Modules with a token layer in `src/styles/tokens.css`. Fonts are self-hosted through Fontsource. The site has no animation library and no third-party scripts.

## Commands

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build
npm run lint
npm run preview   # serve the production build
```

## Routes

- `/`: the homepage
- `/work`: every project, filterable by type (the homepage shows only `featured` ones)
- `/work/:slug`: case studies (`100-percent`, `masienda`, `iron-displays`, `graduation-world`, `catalog2cart`, `almsthre`). Unknown slugs redirect to `/`.
- `/services`: fixed-scope services with a services "cart"
- `/book`, `/book/sent`: consultation booking. With `site.calendly` set, `/book` embeds Calendly inline; without it, it falls back to a slot picker that composes an email (there is no booking backend)

Deep links survive a reload through `vercel.json` (Vercel) and `public/_redirects` (Netlify).

## Content

All copy lives in `src/data/`: projects, capabilities, experience, hero variants, plus site details and contact links.

## Location, timezone and Calendly

Parth works from Kathmandu, Nepal. `src/data/locale.ts` is the one place that says so: the `Asia/Kathmandu` timezone, the `NPT` label, `en-NP`, and the currencies (NPR locally; service prices stay in USD). Every time on the site is a real instant formatted through `Intl` with that timezone, so the +05:45 offset comes from the browser's timezone database and is never typed in. `index.html`'s JSON-LD repeats the city and country.

To turn on Calendly, set `calendly` in `src/data/site.ts` to the event's public link (for example `https://calendly.com/you/30min`). It's a public URL, not a secret, so no env vars or API token are involved. In Calendly itself, set **Account → Time zone** and the event's availability to **Asia/Kathmandu**. Visitors then see slots converted to their own time zone. The embed is a plain iframe, with no Calendly script on the page. It prefills the first custom question with the services in the cart, and it clears the cart once a booking is made.

## Analytics

Google Analytics 4 loads from `index.html`. `src/analytics.ts` adds these events on top of GA's automatic page views, outbound links and PDF downloads:

- `add_to_cart` / `remove_from_cart`: a service added to or removed from the services cart (GA4 ecommerce items, priced in USD)
- `cta_click`: any link into `/services` or `/book`, with `link_text`, `link_url` and `page_path`
- `email_click`: any email link, with `link_text` and `page_path`
- `generate_lead`: a booking made through Calendly or the email form, with the services in the cart

## SEO

Every page's title, description, link-preview image and structured data (schema.org JSON-LD) live in `src/data/seo.ts`. Pages read them at runtime through `useDocumentMeta`. After `vite build`, `scripts/prerender.mjs` writes one HTML file per route (`dist/work/intervel.html` and so on) with that page's tags and a plain-HTML copy of its content, so crawlers and link previews see the right page without running JavaScript. `cleanUrls` in `vercel.json` serves those files at `/work/intervel`. The same script writes `dist/sitemap.xml`, so a new project is added to the sitemap automatically. `public/robots.txt` points crawlers at it.

Link-preview images are 1200×630 JPGs in `public/images/og/`: one per project cover, plus `default.jpg` for every other page. They come from the image script below (`node scripts/optimize-images.mjs og`).

## Images

The original screenshots live in `assets-src/` and are not served. To regenerate the AVIF/WebP outputs in `public/images/`, run this with Node 20 or later:

```bash
npm install --no-save sharp
node scripts/optimize-images.mjs
```

To add a screenshot to a project, put the original in `assets-src/`, add a job to the script, run it, then set `image` on the project in `src/data/projects.ts`.

## Adding project videos

Short, silent screen recordings (10–30 s) work best. Put the compressed files in `public/videos/` and add them to the project in `src/data/projects.ts`:

```ts
videos: [
  { name: "masienda-quick-add", width: 1280, height: 800, caption: "Quick add from the collection grid" },
  { name: "masienda-cart", width: 1280, height: 800, caption: "Rebuy cart with upsells", cover: true },
],
```

- The first clip plays in the desktop hover preview on the homepage and replaces the screenshot on mobile work rows.
- A clip marked `cover: true` replaces the case study's cover image; the others appear under "How it feels to shop".
- Clips load only when scrolled near, play muted while on screen, and have a pause button. Under reduced motion they wait for the visitor to press play.

Compress each recording with [ffmpeg](https://ffmpeg.org) (`brew install ffmpeg`) before adding it; keep each file under ~3 MB:

```bash
ffmpeg -i input.mov -an -vf "scale=1280:-2,fps=30" -c:v libx264 -crf 28 -preset slow -movflags +faststart public/videos/name.mp4
```

Optionally add a WebM next to it and set `webm: true`:

```bash
ffmpeg -i input.mov -an -vf "scale=1280:-2,fps=30" -c:v libvpx-vp9 -crf 38 -b:v 0 public/videos/name.webm
```
