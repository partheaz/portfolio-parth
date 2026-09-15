# CLAUDE.md — Portfolio redesign: "Storefront Specimen"

This file is the working brief for rebuilding Parth Pandey's portfolio. It is written so an agent can run the whole redesign unattended (e.g. a Claude Code cloud session) and hand back a reviewable PR.

**Source of truth, in priority order:**
1. This file (decisions made for *this repo* — stack, routes, real data, mobile spec).
2. `design_handoff/README.md` — the design handoff (tokens, screen specs, copy).
3. `design_handoff/portfolio.dc.html` — the high-fidelity prototype. Markup = exact inline style values. The `class Component` at the bottom (from `projects = [` onward) holds all content data; lift it verbatim.
4. `design_handoff/support.js` — prototype runtime. **Never read it for implementation, never port it, never import it.**

If this file and the handoff disagree, this file wins (it accounts for the existing repo and real data).

---

## 0. Goal in one sentence

Replace the current dark "Brittany Chiang"-style site with the Storefront Specimen design — a bone-coloured, hairline-ruled, 12-column editorial site whose navigation primitives are commerce primitives (variant swatches, cart-drawer nav, spec-sheet cards, PDP-shaped case studies) — built separately and deliberately for **desktop** and **mobile**.

Within ~5 seconds a visitor must read: *serious Shopify engineer who builds sophisticated e-commerce.*

---

## 1. Repo facts & commands

- Stack already in place: **Vite 6 + React 18 + TypeScript (strict) + react-router-dom v7**. Keep it. Do **not** migrate to Next.js (the handoff's Next.js suggestion assumed greenfield).
- Package manager: npm (`package-lock.json`).

```bash
npm install
npm run dev       # vite dev server, http://localhost:5173
npm run build     # tsc -b && vite build — must pass with zero errors
npm run lint      # eslint — must pass
npm run preview   # serve the production build
```

`tsconfig.app.json` has `strict`, `noUnusedLocals`, `noUnusedParameters` — unused imports fail the build.

Add `design_handoff` to the ESLint `ignores` array in `eslint.config.js` so `support.js` isn't linted.

---

## 2. Stack decisions for the redesign

| Concern | Decision |
|---|---|
| Styling | **CSS Modules** (`*.module.css`) + a global token layer in `src/styles/tokens.css`. No Tailwind in new code. |
| Tailwind | Remove at the end once no old component remains: delete `tailwind.config.js`, the `@tailwind` directives, and uninstall `tailwindcss`, `tailwind-scrollbar`. Keep `postcss`/`autoprefixer`. |
| Animation libs | No GSAP / `motion` for this design. CSS transitions + one `IntersectionObserver` hook. Uninstall `gsap`, `motion` when unused. |
| Icons | None needed (arrows are text glyphs `→ ↗ ← ✕`). Uninstall `react-icons` when unused. |
| Fonts | Self-host with `@fontsource/syne` (600,700), `@fontsource/hanken-grotesk` (400,500,600), `@fontsource/dm-mono` (400,500). Import only those weights. `font-display: swap` (fontsource default). Remove the Google Fonts `@import` of Fira Code / Open Sans / Poppins. Do **not** ship Bodoni Moda. |
| Routing | `react-router-dom`: `/` and `/work/:slug`. Unknown slug → redirect to `/`. `/archieve` route is removed. |
| Scroll restoration | On route change to `/work/:slug`, `window.scrollTo(0, 0)`. Hash links (`/#work`) scroll to the section; implement a small `useHashScroll` so `/#work` works when arriving from a case-study page. |
| SEO | Per-route `document.title` + meta description (small `useDocumentMeta` hook — no new dependency). Static `Person` JSON-LD in `index.html`; per-case `CreativeWork` JSON-LD injected by the case page. |
| SPA deep links | Add hosting fallback so `/work/iron-displays` works on reload: `vercel.json` with `{"rewrites":[{"source":"/(.*)","destination":"/index.html"}]}` **and** `public/_redirects` with `/* /index.html 200` (covers Vercel + Netlify; harmless otherwise). |

### Target file structure

```
src/
  main.tsx                      # BrowserRouter + fonts + global css
  App.tsx                       # <Header/> <Routes/> <Drawer/>
  styles/
    tokens.css                  # :root custom properties (section 3)
    global.css                  # reset, body, ::selection, reduced-motion, focus-visible
  data/
    projects.ts                 # 6 case studies (lifted verbatim) + slug + image
    capabilities.ts
    experience.ts
    variants.ts                 # hero swatch statements
    site.ts                     # email, socials, proof figures, "also shipped"
  hooks/
    useReveal.ts                # IntersectionObserver clip reveal
    useTilt.ts                  # hero card tilt (desktop, fine pointer only)
    useMediaQuery.ts
    useDocumentMeta.ts
    useHashScroll.ts
    useLockBody.ts              # drawer scroll lock
  components/
    Header/  AnnouncementRail, NavBar, MenuButton
    Drawer/                     # cart-drawer nav
    SectionHeader/              # "SELECTED WORK ———— 06 OF 15+"
    ImageSlot/                  # real image or striped placeholder + caption
    Button/                     # primary / secondary / ink variants
    Chip/                       # swatch + tech chip
    Footer/
    MobileActionBar/            # sticky bottom "Available now / Hire me"
  sections/                     # homepage sections
    Hero/  (HeroHead, DeveloperCard, Statement, Swatches, HeroCarousel)
    ProofStrip/
    Work/  (WorkRow)
    Capabilities/
    About/ (ExperienceTable)
    Contact/
  pages/
    Home.tsx
    CaseStudy.tsx               # (SpecRail, FlowStepper, NarrativeSection, NextProject)
```

Delete all old components/pages (`Hero`, `Navbar`, `Title`, `Card`, `RightMail`, `ProjectCard`, `HoverButton`, `Footer`, `Archieve`, `SocialNavigation`, `pages/*`, `constants/constants.ts`, `types/types.ts`, `App.css`, `assets/react.svg`) **after** the new site renders — pull any real data you need out of `constants.ts` first.

---

## 3. Design tokens (`src/styles/tokens.css`)

```css
:root {
  /* colour */
  --bone: #F2EDE4;          /* page ground */
  --paper: #F7F3EC;         /* raised surfaces, inverted text */
  --ink: #1B1D20;           /* primary text, primary button */
  --charcoal: #121311;      /* proof strip, contact, footer, drawer */
  --accent: #2B31C9;        /* ultramarine: links, CTAs hover, step numbers */
  --status: #3F7A55;        /* availability dot ONLY */
  --hover-surface: #EDE6DB;
  --placeholder: #E8E1D5;

  --ink-82: rgba(27,29,32,.82);  --ink-80: rgba(27,29,32,.80);
  --ink-78: rgba(27,29,32,.78);  --ink-66: rgba(27,29,32,.66);
  --ink-62: rgba(27,29,32,.62);  --ink-55: rgba(27,29,32,.55);
  --ink-50: rgba(27,29,32,.50);  --ink-45: rgba(27,29,32,.45);
  --ink-40: rgba(27,29,32,.40);
  --rule: rgba(27,29,32,.14);          /* structural hairline */
  --rule-strong: rgba(27,29,32,.20);   /* section-header hairline */
  --rule-soft: rgba(27,29,32,.08);
  --paper-55: rgba(247,243,236,.55); --paper-50: rgba(247,243,236,.50);
  --paper-45: rgba(247,243,236,.45); --paper-40: rgba(247,243,236,.40);
  --rule-inv: rgba(247,243,236,.14);  --rule-inv-strong: rgba(247,243,236,.18);
  --rule-inv-soft: rgba(247,243,236,.10);

  /* type */
  --font-display: "Syne", sans-serif;
  --font-body: "Hanken Grotesk", system-ui, sans-serif;
  --font-mono: "DM Mono", ui-monospace, monospace;

  /* layout */
  --gutter: 20px;                      /* page margin, all breakpoints */
  --grid-gap: 24px;
  --section-pt: clamp(64px, 9vw, 140px);
  --header-h: 84px;                    /* rail 30 + nav 54 */

  /* radius */
  --r: 4px; --r-device: 22px; --r-pill: 999px;

  /* motion */
  --ease: cubic-bezier(0.2, 0, 0, 1);
  --ease-exit: cubic-bezier(0.4, 0, 0.2, 1);
  --t-press: 120ms; --t-ui: 200ms; --t-reveal: 420ms;

  --shadow-card: 0 18px 40px -28px rgba(27,29,32,.5);

  --placeholder-stripes: repeating-linear-gradient(135deg, rgba(27,29,32,.055) 0 1px, transparent 1px 7px);
}
```

Global rules (`global.css`):
- `body { background: var(--bone); color: var(--ink); font-family: var(--font-body); -webkit-font-smoothing: antialiased; }`
- `::selection { background: var(--accent); color: var(--paper); }`
- Links default ink; hover → accent. (The prototype's `a:hover { color: #BE5A32 }` is a leftover — ignore it.)
- `html { scroll-behavior: smooth; }` and `[id] { scroll-margin-top: calc(var(--header-h) + 16px); }`
- `:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }` (inverted sections: outline paper).
- Mono utility pattern: uppercase, `letter-spacing: .04–.10em`, `font-variant-numeric: tabular-nums` where numeric.
- Body copy: `text-wrap: pretty`.
- `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; scroll-behavior: auto !important; } }`
- Hover styles go inside `@media (hover: hover)` so touch devices never get stuck hover states.

**Radius rule:** 0 for rules/dividers; 4px for buttons, cards, chips, spec rails, image slots; 999px status dot only. Nothing else rounded.
**Shadow rule:** only the hero developer card. Everything else is defined by hairlines.

### Breakpoints

| Name | Query | What changes |
|---|---|---|
| phone | `< 480px` | drawer full width, proof strip 2-up, display type capped |
| large phone / small tablet | `480–899px` | still single-column "mobile" layout |
| **desktop** | `>= 900px` | 12-col layouts engage, desktop nav links, hero card, mobile action bar hidden |
| wide | `>= 1200px` | hero statement / swatch row splits 7 / 5 |
| xwide | `>= 1600px` | content max-width guard (see below) |

"Mobile" in this document = `< 900px`. "Desktop" = `>= 900px`.

At `>= 1600px` keep the 20px gutter but cap text measures with their `ch` max-widths (already specified); do not centre the whole page in a narrow column — the full-bleed grid is part of the look.

---

## 4. Real content & data decisions

Lift from `design_handoff/portfolio.dc.html` verbatim: `projects` (all fields), `capabilities`, `variants`, the default hero statement, About pull quote + paragraphs, proof figures, "Also shipped" line.

Overrides — use **real** data, not prototype placeholders:

| Item | Use |
|---|---|
| Email | `parthpandey678@gmail.com` (the prototype's `hello@partheazpandey.space` is a placeholder) |
| LinkedIn | `https://www.linkedin.com/in/parth-pandey-852a42192/` |
| GitHub | `https://github.com/partheaz/` |
| Résumé | Keep `/resume-parth.pdf`; add a mono "Résumé ↗" link as a 4th row in the Contact link grid. |
| Experience table | **Use the real history from `src/constants/constants.ts`**, most recent first, years only: `Nine15 — Shopify Full Stack Developer — 2025 — Present`, `CartMade — Shopify Developer — 2024 — 2025`, `MME Solutions — Full Stack Developer — 2023 — 2024`, `Dhara Networks — Engineer — 2021 — 2023`. The prototype's table (Agnos Inc etc.) is out of date. Leave a `// TODO(owner): confirm` comment above the array. |
| Drawer "About" count | Equals experience rows (4). |

Slugs: `iron-displays`, `searchauto`, `graduation-world`, `catalog2cart`, `almsthre`, `usemanly`.

### Images (real assets exist — use them)

| Project | Asset | Notes |
|---|---|---|
| Iron Displays | `/projects/irondisplays.png` | |
| SearchAuto | — | striped placeholder with caption |
| Graduation World | `/projects/graduation-world.png` | 1.5MB — see below |
| Catalog2Cart | `/projects/pdf.webp` | |
| Almsthre | `/projects/almsthre.mp4` | Use as muted, `playsInline`, `loop`, `preload="none"` video with a poster; autoplay only when in view and not `prefers-reduced-motion`. **Delete `almsthre.mov` (30MB, unused).** |
| Usemanly | `/projects/manly.png` | 2.4MB — see below |
| Portrait | `/unnamed.jpg` — a full-length photo of Parth (576×576, low-res). Rename to `/portrait.jpg`, crop 4:5 centred on the subject (`object-position: 50% 40%`), apply a subtle `filter: grayscale(1) contrast(1.05)` so it sits in the bone palette. Flag in PR: owner should supply a higher-res portrait. |

Remove unused assets: `nike-store.png`, `rental.png`, `mme-solutions.png`, `vite.svg` (not in the six case studies). Keep `logo.avif` as favicon.

Image optimisation: convert PNGs to WebP/AVIF at 1600px and 800px widths (use `sharp` via a one-off `scripts/optimize-images.mjs`, run it, commit the outputs; do **not** add sharp as a runtime dependency of the app). Serve with `<picture>`/`srcset`, explicit `width`/`height`, `object-fit: cover`, `loading="lazy"` below the fold, and the striped placeholder as the background while loading. `ImageSlot` renders the placeholder + mono caption when `src` is absent.

Case-study cover (16:9) and the two UI-detail slots (4:3) reuse the project image with different crops (`object-position`) until real detail shots exist; captions become `alt` text.

### Copy rules (non-negotiable)
Plain, specific, engineer's voice. No "crafting digital experiences", no superlatives, **no invented statistics**, testimonials, client logos, revenue or conversion numbers (drop the old "increase sales by 20%" claim). No fake prices, cart counts or checkout jokes — commerce metaphor capped at ~60%.

---

## 5. DESKTOP specification (`>= 900px`)

All values from the handoff; restated here with the exact grid placements.

### 5.1 Header (sticky, `z-index: 60`, bone, 1px `--rule` bottom)
- **Announcement rail** — 30px, padding `0 20px`, mono 9.5px, `.06em`, `--ink-62`, bottom border `--rule-soft`. Left: 6px `--status` dot pulsing opacity 1 → .25 over 2.4s ease-in-out infinite + "Open to Shopify / e-commerce roles". Right: "IST · UTC+5:30" at 80% opacity.
- **Nav bar** — 54px, padding `0 20px`, `justify-content: space-between`.
  - Left: `<Link to="/">` "Parth Pandey" Syne 600 21px line-height 1 + "Shopify Dev" mono 9.5px `.08em` `--ink-50`, baseline aligned, gap 10px.
  - Right: text links WORK / CAPABILITIES / ABOUT (mono 10px `.08em`, padding 8px 12px, `--ink-62` → ink on hover, 120ms) then **Menu** button: 38px tall, padding 0 16px, 1px `--rule-strong` border, 4px radius, mono 10px, label + two stacked 12×1px bars (gap 3px); hover → ink fill, paper text. `aria-expanded`, `aria-controls="drawer"`.

### 5.2 Hero
Section: `display:grid; grid-template-columns: repeat(12,1fr); gap:24px; align-items:end; padding: clamp(48px,9vw,120px) 20px clamp(32px,4vw,56px); min-height: 78vh;`

- **Head** — `grid-column: 1 / span 8; grid-row: 1; max-width: 1060px`.
  - Eyebrow: mono 10px `.1em` `--ink-55`: "PARTH PANDEY" · flex hairline (1px `rgba(27,29,32,.16)`, `max-width:120px`) · "4+ YRS"; `padding-bottom: clamp(20px,3vw,40px)`.
  - `<h1>` "Shopify<br>Developer": Syne 700, `clamp(46px, 9.4vw, 168px)`, lh .86, `-0.02em`.
- **Developer card** — `grid-column: 9 / span 4; grid-row: 1; align-self: start; justify-content: flex-end`. Must be a real grid item (never absolutely positioned — a prior version collided with the H1).
  - Card: `width:100%; max-width:300px`, paper, 1px `rgba(27,29,32,.16)`, 4px, `--shadow-card`.
  - Rows: header (`DEVELOPER` / `SKU PP-01`, mono 9px `--ink-50`, padding 12px 14px, bottom rule) → name block ("Parth Pandey" Syne 600 27px lh 1.05; "Shopify · E-commerce" mono 9px `--ink-55` pt 6px; padding 16px 14px) → spec grid (`auto 1fr`, gap 8px 16px, padding 14px, mono 9px; labels `--ink-45`; values right-aligned: EXP 4+ yrs / FOCUS Themes · Apps / CLIENTS International / STATUS Available in accent) → "HIRE →" link to `#contact`, 44px, ink fill, paper text, mono 10px, hover accent (padding 0 14px 14px).
  - **Tilt** (`useTilt`): only when `(hover: hover) and (pointer: fine)` and not reduced-motion. Passive window `mousemove`, rAF-throttled; x,y ∈ [-1,1] from viewport centre; `transform: perspective(900px) rotateY(x*4deg) rotateX(-y*3deg)`, `transition: transform 200ms var(--ease)`. Remove listener on unmount.
- **Lower** — `grid-column: 1 / -1; grid-row: 2`; nested 12-col, gap 24px, `align-items:end`, `padding-top: clamp(28px,4vw,48px)`.
  - Statement `<p>`: span 12 (span 7 at ≥1200), `max-width: 46ch`, `clamp(17px,1.5vw,21px)`, lh 1.5, `--ink-82`. `aria-live="polite"`.
  - Swatches: span 12 (span 5 at ≥1200, `justify-content:flex-end; flex-wrap:nowrap; align-self:end`); gap 8px. Four `<button aria-pressed>` chips THEMES / APPS / INTEGRATIONS / MIGRATIONS: 38px, padding 0 16px, 4px, mono 10px `.08em`. Off: transparent, border `rgba(27,29,32,.22)`. On: ink fill, paper text, ink border. 120ms.
  - **Interaction:** click selects variant and swaps the statement; click the active chip → deselect → default statement. Wrap the group in `role="group" aria-label="Filter what I build"`.

### 5.3 Proof strip (charcoal, paper text)
Grid `repeat(5, 1fr)` on desktop (the prototype's `auto-fit, minmax(160px,1fr)`), padding `0 20px`. Cells: `padding: clamp(28px,4vw,44px) 0` (cells 2–5 add `padding-left:20px`), right border `--rule-inv` except last. Figure Syne 600 `clamp(38px,4.4vw,58px)` lh 1 tabular; caption mono 9px `.08em` `--paper-50` pt 10px `max-width:18ch`.
Figures: **4+** Years Shopify & e-commerce · **30+** Store customizations · **15+** E-commerce projects · **04** Custom Shopify apps · **UK · US · IN** Client regions.

### 5.4 Selected work (`#work`)
Section `padding: var(--section-pt) 20px 0`. `SectionHeader`: flex baseline space-between, pb 20px, bottom `--rule-strong`, mono 10px `.1em`; "SELECTED WORK" / "06 OF 15+" (`--ink-45`).

Each row is a **`<Link to="/work/:slug">`** (not a button): 12-col grid gap 20px, `padding: clamp(24px,3vw,40px) 0`, bottom `--rule`, `transition: padding-left 200ms var(--ease)`; hover: `padding-left:12px`, border `rgba(27,29,32,.5)`.
- Line 1 (span 12): index mono 10px `--ink-45` tabular + brand Syne 600 `clamp(30px,5.4vw,74px)` lh .95 `-0.01em`, gap 14px, baseline.
- Line 2 (span 12, nested 12-col gap 20px `align-items:start`):
  - Text — `grid-column: span 6; order: 1`: description 16px lh 1.45 `--ink-78` `max-width:52ch`; stack line mono 9px `.06em` `--ink-45` pt 12px = first 4 stack items joined `" · "` + `"  /  "` + year; "VIEW CASE STUDY →" mono 10px accent mt 16px.
  - Image — `grid-column: span 6; order: 2`: `aspect-ratio: 16/10`, `ImageSlot`.
- **Desktop-only enhancements:**
  - Cursor dot: a 10px ink circle following the pointer (`position:fixed; pointer-events:none`, rAF), grows to 48px with a mono "VIEW" label (paper on ink) while hovering a work row; 200ms. Only `(hover:hover) and (pointer:fine)`; hidden under reduced motion. Keep the native cursor visible.
  - Second-shot on hover: if a project has a second image, crossfade to it over 200ms; otherwise no-op.

Below rows: flex-wrap, gap 8px, pt 28px: "ALSO SHIPPED —" mono 9px `--ink-45` + "Dukeshill · ForgetMeNot · Summit Sheets · Frame Fusion · COD payment app" mono 9px `rgba(27,29,32,.7)`.

### 5.5 Capability map (`#capabilities`)
Header "CAPABILITY MAP" / "06". Grid `repeat(3, 1fr)` on desktop (prototype: `auto-fit, minmax(260px,1fr)`). Block: `padding: clamp(24px,3vw,36px) 20px clamp(28px,3.4vw,44px) 0`, right + bottom `--rule`, hover bg `--hover-surface` 200ms. Remove right border on every 3rd block. Index mono 9px `--ink-40` → `<h3>` Hanken Grotesk 500 21px `-0.01em` margin `10px 0 14px` → `<ul>` of 5 mono 10px lh 1.4 `.02em` `--ink-66`, gap 7px. Give blocks inner left padding so the hover surface doesn't look clipped: first column `padding-left: 0`, others `padding-left: 20px`.

### 5.6 About (`#about`)
Header "ABOUT" / "AHMEDABAD, IN". 12-col, `gap: clamp(24px,3vw,48px)`, `padding-top: clamp(32px,4vw,56px)`.
- Portrait `span 5`: 4:5 `ImageSlot`, `max-width:420px`. Make it `position: sticky; top: calc(var(--header-h) + 24px)` so it holds while the text scrolls.
- Text `span 7`: pull quote Syne 600 `clamp(25px,3.1vw,40px)` lh 1.18 `-0.01em` `max-width:30ch` mb 24px → body paragraphs 16px lh 1.6 `max-width:58ch` `--ink-80` (mb 16px, last mb 32px) → **experience table**: top `--rule-strong`; rows `grid 1fr auto`, gap 12px 20px, baseline, padding 16px 0, bottom `rgba(27,29,32,.12)`; company 17px 500, role mono 9px `.06em` `--ink-50` pt 5px; years mono 10px `.04em` `--ink-55` tabular.

### 5.7 Contact (`#contact`)
Charcoal, `margin-top: var(--section-pt)`, padding `clamp(64px,9vw,140px) 20px clamp(48px,6vw,88px)`.
- "CONTACT" mono 10px `.1em` `--paper-50`, pb `clamp(28px,4vw,48px)`.
- `<h2>` "Have a Shopify problem worth solving?" Syne 700 `clamp(38px,7.6vw,108px)` lh .95 `-0.02em` `max-width:22ch`.
- CTA row (flex-wrap, gap 16px, padding `clamp(32px,4vw,52px) 0`): primary `mailto:` "LET'S BUILD IT →" 60px, padding 0 28px, paper fill, charcoal text, 4px, mono 11px `.08em`; hover `translateY(-1px)` + accent bg + paper text; active `scale(.985)`; 120ms. Beside: mono 9.5px `--paper-45` `max-width:26ch` lh 1.5 "Usually replies same day · Available for contract or full-time".
- Link grid `repeat(4,1fr)`, top `--rule-inv-strong`: EMAIL / LINKEDIN / GITHUB / RÉSUMÉ — flex baseline space-between, padding 20px 20px 20px 0, bottom `rgba(247,243,236,.12)`, mono 10px `.06em` paper; `↗` at 50%; hover accent. External links `target="_blank" rel="noopener noreferrer"`.

### 5.8 Footer
Charcoal, padding 16px 20px, top `rgba(247,243,236,.12)`, mono 9px `.06em` `--paper-45`: "Parth Pandey · Shopify Developer" / "© {current year}".

### 5.9 Drawer nav (cart-drawer pattern) — shared desktop & mobile
- Wrapper: `position:fixed; inset:0; z-index:90`. **Use `inset: 0` — the prototype's `left:-76px; top:83px` on the scrim is a bug.**
- Scrim: `rgba(18,19,17,.5)` fading in 200ms; `pointer-events` off when closed; click closes.
- Panel `id="drawer"` `role="dialog" aria-modal="true" aria-label="Site index"`: right-anchored, `width: min(420px, 88vw)`, charcoal, paper text, padding 20px, flex column, `transform: translateX(100%) → 0`, 200ms `--ease` in / `--ease-exit` out. Keep it mounted but `visibility:hidden` after the close transition so it isn't tabbable.
- Header: "INDEX" / "CLOSE ✕" (button), mono 9.5px `.08em` `--paper-55`, pb 20px, bottom `--rule-inv-strong`.
- Nav (padding 8px 0): Work `06` / Capabilities `06` / About `04` / Contact `01`. Each row Syne 600 34px lh 1, padding 18px 0, bottom `--rule-inv-soft`, flex baseline space-between; count mono 9.5px `--paper-40`. Hover `padding-left:10px` + accent, 200ms. Links are `/#work` etc.; clicking closes the drawer, then scrolls (works from case-study pages too).
- **Drop** the "→ Mobile design" / "→ Design system" links (design-deliverable only). Replace with one secondary mono link group: "→ Email" · "→ Résumé".
- Footer (`margin-top:auto`, pt 20px, top `--rule-inv-strong`, mono 9.5px): "1 DEVELOPER" `--paper-50` / "AVAILABLE" accent.
- Behaviour: `Esc` closes; focus moves to the Close button on open; focus trapped inside; focus returns to Menu button on close; `inert` on `<main>`, header and footer while open; body scroll locked (`useLockBody`, compensate scrollbar width to avoid layout shift).

### 5.10 Case study page (`/work/:slug`)
- **Header section** (12-col, padding `clamp(40px,6vw,88px) 20px clamp(28px,4vw,48px)`): "← ALL WORK" `<Link to="/#work">` mono 10px `--ink-55` hover accent → index + kicker mono 10px row (pt `clamp(28px,4vw,52px)`) → `<h1>` brand Syne 700 `clamp(44px,9.5vw,132px)` lh .9 `-0.02em` mt 10px → line `max-width:46ch` `clamp(17px,1.5vw,20px)` lh 1.5 `--ink-80` mt 20px.
- **Cover**: padding 0 20px; 16:9 `ImageSlot` (caption 10px, padding 16px).
- **Body**: 12-col, `gap: clamp(24px,3vw,48px)`, padding `clamp(48px,7vw,112px) 20px 0`.
  - Narrative `grid-column: span 8; order:1`, flex column, `gap: clamp(40px,5vw,72px)`.
  - Spec rail `grid-column: span 4; order:2; position:sticky; top:104px; align-self:start`. Paper, 1px `rgba(27,29,32,.16)`, 4px. "PROJECT SPECS" header (padding 12px 14px, mono 9px `--ink-50`, bottom rule) → 5 rows `grid 74px 1fr`, gap 12px, padding 10px 0, bottom `--rule-soft`, mono 9px `.04em`, label `--ink-45`, value right lh 1.5 (wrap padding 4px 14px 14px) → "DISCUSS A BUILD →" mailto (subject prefilled with brand), 46px ink, hover accent (wrap padding 0 14px 14px).
- **Narrative sections** — each opens with a header: flex baseline gap 14px, pb 16px, bottom `--rule-strong`, mono 10px `.1em`: number `--ink-45` + title.
  1. `01 THE PROBLEM` — `<p>` mt 20px, `max-width:62ch`, 17px lh 1.6 `--ink-82`.
  2. `02 THE BUILD` — `<p>` (mb 28px) + **Flow stepper**: `<ol>` flex-wrap gap 8px stretch; 5 cards `flex: 1 1 150px; min-width:150px`, paper, 1px `rgba(27,29,32,.16)`, 4px, padding 14px; step number mono 9px accent tabular; label 14px lh 1.4 `rgba(27,29,32,.85)` pt 8px.
  3. `03 THE EXPERIENCE` — `<p>` (mb 24px) + 2 × 4:3 `ImageSlot` in `repeat(auto-fit,minmax(220px,1fr))` gap 12px, captions "UI detail — desktop" / "UI detail — mobile".
  4. `04 THE TECH` — `<ul>` chips flex-wrap gap 6px pt 20px: 1px `--rule-strong`, 4px, padding 8px 12px, mono 9.5px `.04em` `rgba(27,29,32,.75)`.
  5. `05 THE RESULT` — Syne 600 `clamp(22px,2.6vw,33px)` lh 1.25 `max-width:46ch` mt 20px. Qualitative only.
- **Next project** (section padding `clamp(56px,8vw,120px) 20px clamp(40px,5vw,72px)`): full-width `<Link>` grid `1fr auto` gap 20px, padding `clamp(24px,3vw,40px) 0`, top + bottom `--rule-strong`, hover `padding-left:12px`. "NEXT PROJECT" mono 9.5px `--ink-45` + brand Syne 600 `clamp(30px,5vw,62px)` lh 1 pt 10px; accent `→` mono 11px. Target = `(i + 1) % 6`.
- Footer as homepage. Header stays (the rail + nav + drawer are global).
- Meta: title `"{Brand} — {kicker} · Parth Pandey"`, description = `line`.

---

## 6. MOBILE specification (`< 900px`)

**Principle: mobile is designed separately, not a collapsed desktop.** Commerce patterns are mobile-native, so the phone build leans on them: drawer nav, a peeking work carousel, a sticky action bar, and a spec accordion. Reference: the "Mobile design" screen in `portfolio.dc.html` (the three 320×620 device frames) — those frames are drawn at reduced scale; the production values below are the ones to build.

### 6.1 Global mobile rules
- **Touch targets ≥ 44×44px** for every interactive element (Menu button, swatches, chips that are buttons, drawer rows, links in the contact grid, "All work", accordion summary). Extend hit areas with padding, not by scaling type.
- **No hover reliance.** Every hover effect is enhancement only (`@media (hover:hover)`). Anything shown on hover on desktop ("VIEW CASE STUDY →", second shot) must be visible or unnecessary on touch.
- **Display type caps:** hero H1 ≤ 56px; on `< 480px` exactly `clamp(40px, 11.8vw, 48px)` (≈44px at 375). Section/case H1 `clamp(40px, 11vw, 56px)`. Contact H2 `clamp(34px, 9.6vw, 48px)`. Work brand names 27–32px.
- **Minimum mono size 9px** (the device mocks show 7.5–8px only because they are scaled down). Labels 9.5–10px on phones.
- Page gutter stays **20px**. Grid gap 16px on phones.
- Use `100svh`/`100dvh`, never `100vh`, for anything viewport-tall (iOS toolbar jump).
- Respect safe areas: `padding-bottom: max(12px, env(safe-area-inset-bottom))` on the sticky action bar; add `viewport-fit=cover` to the viewport meta.
- **No horizontal page scroll at 320px.** Only the hero carousel and swatch row scroll horizontally, inside their own containers.
- Images: work crops **4:3** on mobile (16:10 on desktop) via `aspect-ratio` swap; serve the 800w source.
- Tilt, cursor dot and second-shot hover: **disabled** (not rendered).

### 6.2 Header (mobile)
- Announcement rail: 30px. `< 480px`: text shortens to **"Open to Shopify roles"** and the timezone is hidden; `480–899px`: full text + timezone.
- Nav bar 54px: logo "Parth Pandey" Syne 600 19px; hide the "Shopify Dev" sub-label below 360px. Desktop text links hidden. Menu button **44px tall** (was 38), padding 0 14px.
- Header remains sticky. Total header 84px — keep `--header-h` in sync.

### 6.3 Hero (mobile) — "hero · sticky action bar" frame
Single column, stack order:
1. Meta line mono 10px `.1em` `--ink-55`: **"4+ YRS · AHMEDABAD"** (replaces the desktop "PARTH PANDEY ——— 4+ YRS" eyebrow — the name is already in the header).
2. H1 "Shopify<br>Developer" — Syne 700, lh .88, `-0.02em`, size per 6.1; pt 14px.
3. Statement `<p>` 16px lh 1.5 `--ink-80`, mt 16px, `max-width: 34ch`. Default copy is the full default statement (same as desktop); swatch copy swaps in place.
4. Swatches — **all four**, in a single horizontally scrollable row (`overflow-x:auto; scroll-snap-type:x proximity; scrollbar-width:none`, bleed to the screen edge with `margin-inline:-20px; padding-inline:20px`). Chips 44px tall, padding 0 14px, mono 10px. Same select / deselect behaviour. First chip is **not** preselected (the mock shows a selected state only as an illustration).
5. **Peeking work carousel** (mobile only, `margin-top: auto` so it sits at the bottom of the hero): horizontal `scroll-snap-type: x mandatory`, `scroll-padding-inline: 20px`, gap 8px, bleeds edge to edge. Cards `flex: 0 0 62%` (so the next card peeks), each a `<Link>` to the case study: 4:3 `ImageSlot` + below it index mono 9px + brand Syne 600 18px. Six cards. `aria-label="Selected work"` on the scroller; each card `scroll-snap-align: start`.
- Hero `min-height: calc(100svh - var(--header-h) - var(--action-bar-h))`, padding `32px 20px 24px`, flex column. The developer card is **hidden (display:none), not shrunk**.

### 6.4 Sticky action bar (mobile only) — replaces the hero card
- `position: fixed; left:0; right:0; bottom:0; z-index: 50;` charcoal, paper text, flex space-between, gap 10px, padding `10px 20px max(10px, env(safe-area-inset-bottom))`. `--action-bar-h: 64px`.
- Left: 6px `--status` dot + "AVAILABLE NOW" mono 9.5px `--paper-55`.
- Right: "HIRE ME →" link to `#contact`, paper fill, charcoal text, 4px, mono 10px `.06em`, **height 44px**, padding 0 16px; active `scale(.985)`.
- Visibility: rendered on `/` and `/work/:slug` below 900px. **Slides out** (`translateY(100%)`, 200ms) when `#contact` is ≥ 10% in view (IntersectionObserver) and while the drawer is open. On case-study pages the button label is "DISCUSS A BUILD →" (mailto).
- Add `padding-bottom: var(--action-bar-h)` to the footer on mobile so nothing is permanently covered.

### 6.5 Proof strip (mobile)
- `< 480px`: `grid-template-columns: repeat(2, 1fr)`; 4 numeric cells in a 2×2, the "UK · US · IN" cell `grid-column: 1 / -1`. Hairlines: right border on left-column cells only, bottom border `--rule-inv` on all but the last row. Padding 24px 0 (right-column cells padding-left 20px).
- `480–899px`: 3 columns, "UK · US · IN" spans 2. Same hairline logic (no dangling right borders at row ends).
- Figures `clamp(34px, 10vw, 44px)`.

### 6.6 Selected work (mobile) — "4:3 crops, no hover reliance" frame
- Section padding-top `64px`. Header "SELECTED WORK" / "06".
- Each entry is a `<Link>` block, stacked; separator `border-top: 1px solid rgba(27,29,32,.12)` between entries, padding 24px 0.
  1. **Image first**: 4:3 `ImageSlot`.
  2. Index mono 9px `--ink-45` + brand Syne 600 `clamp(27px, 8vw, 36px)` lh 1, gap 8px, pt 12px.
  3. Description 15px lh 1.45 `--ink-78` pt 6px.
  4. Stack line mono 9px `--ink-45` pt 8px (first **3** items on `< 480px`, 4 otherwise) + year.
  5. "VIEW CASE STUDY →" mono 10px accent, always visible, pt 12px, and the whole block is the tap target.
- No hover padding shift on touch. Provide `:active` feedback: background `--hover-surface` for 120ms.
- "Also shipped" wraps naturally; mono 9.5px.

### 6.7 Capability map (mobile)
- Single column below 600px; 2 columns 600–899px.
- Single column: no right borders; blocks padding 24px 0 28px; bottom `--rule`.
- Two columns: right border on left column only; inner padding-left 20px on right column.
- No hover background on touch.
- Title 19px; items mono 10px.

### 6.8 About (mobile)
- Stack: portrait → pull quote → paragraphs → experience table.
- Portrait 4:5, `width: 100%; max-width: 420px`, not sticky. On `< 480px` crop to `aspect-ratio: 1 / 1` to save a screen of scrolling.
- Pull quote `clamp(23px, 6.4vw, 30px)`. Body 16px.
- Experience rows keep `1fr auto`; if years wrap, drop to a stacked layout: years under the role (`grid-template-columns: 1fr` below 360px).

### 6.9 Contact (mobile)
- Padding `64px 20px 40px`. H2 per 6.1.
- Primary CTA **full width** (`width: 100%; justify-content: space-between`), 60px. Helper text below it, full width.
- Link grid: 1 column `< 480px`, 2 columns `480–899px`. Each row min-height 56px.

### 6.10 Drawer (mobile) — "drawer nav · cart-drawer pattern" frame
- `< 480px`: panel `width: 100vw` (full-screen sheet); `480–899px`: `min(420px, 88vw)`.
- Nav rows Syne 600 **30px**, padding 16px 0 (row ≥ 62px tall). Counts mono 9.5px.
- Header row "INDEX" / "CLOSE ✕" with Close as a 44×44 target. Padding-top honours `env(safe-area-inset-top)`.
- Footer "1 DEVELOPER" / "AVAILABLE" pinned to bottom with `env(safe-area-inset-bottom)`.
- Swipe-to-close is optional; `Esc`/Close/scrim are required. Body scroll locked while open (iOS: lock via `position:fixed` on body with saved scroll offset, restore on close).
- Action bar hidden while open.

### 6.11 Case study (mobile)
- Header: "← ALL WORK" with 44px tap height; H1 per 6.1; line 17px.
- Cover: **4:3** on `< 480px`, 16:9 above.
- **Spec rail → accordion**, placed *above* the narrative: `<details>` element styled as the paper card; `<summary>` row 48px "PROJECT SPECS" + mono `+` / `−` indicator (rotate 200ms), closed by default. Inside: the 5 spec rows (label column 88px). The **"DISCUSS A BUILD →" button sits outside the `<details>`**, always visible under the summary. Not sticky on mobile.
- Narrative gap 48px. Paragraphs 16px lh 1.6.
- **Flow stepper**: vertical `<ol>` below 600px — each step a row (`grid-template-columns: 32px 1fr`), accent step number left, label right, 1px `--rule` between rows, a 1px vertical accent line connecting the numbers (pseudo-element). 600–899px: the desktop wrapping cards.
- UI details: stack both 4:3 images (single column).
- Tech chips: unchanged (wrap), mono 10px.
- Result statement `clamp(21px, 6vw, 26px)`.
- Next project: brand `clamp(28px, 8vw, 40px)`; entire block 44px+ tap target.
- Sticky action bar label "DISCUSS A BUILD →".

---

## 7. Motion

| Tier | Duration | Used for |
|---|---|---|
| Press / hover | 120ms | buttons, link colour, swatch state, `:active` |
| UI | 200ms | drawer slide, scrim fade, row padding shift, card tilt, capability hover, action bar slide, accordion |
| Reveal | 420ms | section entrance, image clip |

Easing `--ease` for entrances/default, `--ease-exit` for exits.

**Reveals** (`useReveal`, IntersectionObserver, `threshold: 0.15`, once per element):
- Text blocks: `transform: translateY(12px) → 0` + `clip-path: inset(0 0 100% 0) → inset(0)`, 420ms.
- Images: `clip-path: inset(0 0 0 100%) → inset(0)` wipe, 420ms.
- Stagger siblings by 40ms max (work rows, capability blocks, flow steps).
- Never fade-up-scale. No scroll hijacking, no smooth-scroll libraries.
- Initial hidden state must be applied via a class added by JS (`.js-reveal`) so content is visible without JS and to crawlers.
- Under `prefers-reduced-motion: reduce`: no reveal (render final state), no tilt, no cursor dot, no dot pulse, drawer appears without slide, no video autoplay.
- Above-the-fold hero content does **not** reveal-animate (protects LCP).

---

## 8. Accessibility checklist
- Landmarks: `<header>`, `<main>`, `<footer>`, `<nav aria-label>` (desktop links, drawer).
- One `<h1>` per page. Section headers that are mono labels are visually labels but the section needs an accessible name: use `aria-labelledby` pointing at the label, or a visually-hidden `<h2>`.
- Skip link "Skip to content" as the first focusable element.
- Hairlines are decorative; all text meets ≥ 4.5:1. **Check the low-opacity mono labels** (`--ink-40/45` on bone, `--paper-40/45` on charcoal) — where a label carries meaning and fails 4.5:1 at its size, raise opacity to the nearest passing value (≥ .55 on bone, ≥ .55 on charcoal) and note it in the PR.
- Swatches: `aria-pressed`; statement `aria-live="polite"`.
- Drawer: dialog semantics, focus trap, Esc, restore focus, `inert` background.
- Accordion: native `<details>/<summary>`.
- Images: real `alt` from the caption; decorative placeholders `alt=""` + caption visible.
- Video: muted, no audio track needed, pause when out of view, `aria-hidden` if purely decorative; otherwise a text alternative.

## 9. Performance budgets
- LCP < 1.2s (hero is text — keep it that way; preload Syne 700 latin woff2).
- CLS 0 (explicit image dimensions / `aspect-ratio`; fonts with matching fallback `size-adjust` if needed).
- Homepage JS ≈ 50KB gzip target (React + router is most of it; no animation libs).
- Case studies code-split with `React.lazy` + `Suspense` (fallback = nothing / bone).
- No third-party scripts.

## 10. SEO
- `index.html`: `<html lang="en">`, title "Parth Pandey — Shopify Developer", description from prototype `<helmet>`, OG/Twitter tags, `theme-color` `#F2EDE4`, favicon `logo.avif`, `Person` JSON-LD (name, jobTitle "Shopify Developer", address Ahmedabad IN, sameAs LinkedIn/GitHub, email).
- Per case: title/description via `useDocumentMeta`, `CreativeWork` JSON-LD (name, description, creator Person, dateCreated year, keywords from stack).
- Heading language naturally includes Shopify / theme / app / migration / integration — no keyword stuffing.
- Add `public/robots.txt` and a static `public/sitemap.xml` listing `/` and the six `/work/*` URLs (domain placeholder `https://example.com` with a `TODO(owner)` comment if the production domain is unknown).

---

## 11. Build order (commit after each step)

Work on branch `redesign/storefront-specimen`. Small, reviewable commits.

1. **Foundation** — ESLint ignore, fontsource packages, `tokens.css`, `global.css`, data files lifted from the prototype + real-data overrides, `ImageSlot`, `SectionHeader`, `Button`, `Chip`. App shell with new `Header`, `Footer`, routes `/` + `/work/:slug`. Old site unmounted from routes (files can remain until step 8).
2. **Header + Drawer** — desktop and mobile variants, full a11y behaviour.
3. **Hero** — desktop (head, card + tilt, statement, swatches) and mobile (meta, swatch scroller, peeking carousel) + `MobileActionBar`.
4. **Proof strip + Work** — desktop rows (+ cursor dot) and mobile stacked 4:3 entries.
5. **Capabilities + About + Contact + Footer.**
6. **Case study page** — desktop sticky rail + mobile accordion, flow stepper both layouts, next project, meta/JSON-LD.
7. **Motion + images** — `useReveal`, reduced-motion audit, image optimisation script + outputs, video handling.
8. **Cleanup** — delete old components/pages/constants/types/App.css, unused assets (`almsthre.mov`, `nike-store.png`, `rental.png`, `mme-solutions.png`, `vite.svg`, `react.svg`), uninstall `tailwindcss tailwind-scrollbar gsap motion react-icons`, remove Tailwind config/directives, SPA fallback files, robots/sitemap. Replace the Vite template `README.md` with a short project README.
9. **Verification pass** (section 12), fix everything found, then open the PR.

## 12. Verification — definition of done

Run and pass:
```bash
npm run lint
npm run build
npm run preview
```

Then check in a browser (preview tools / headless) at these widths, homepage **and** at least two case studies:

| Width | Must be true |
|---|---|
| 320 | No horizontal page scroll. Header fits. Hero H1 doesn't overflow. Drawer full-width. |
| 375 × 812 | Hero fills first screen with carousel peeking above the action bar. All targets ≥ 44px. Proof strip 2×2 + full-width regions cell. |
| 430 | Same as 375; stack line shows 3 items. |
| 768 | Still mobile layout; drawer is 420px sheet; capabilities 2-col; contact links 2-col. |
| 899 → 900 | Clean switch: desktop nav links, hero card appears in cols 9–12, action bar gone, work rows text-left / image-right 16:10. |
| 1024 | Hero card never overlaps the H1. |
| 1280 | Statement / swatches split 7/5 on one line; swatches don't wrap. |
| 1440, 1920 | Grid holds; measures respect `ch` caps. |

Behaviour checks:
- Swatch select → statement changes; re-click → default returns (desktop & mobile).
- Drawer: opens from Menu, closes on scrim / Close / Esc / link; focus trapped and restored; background not scrollable; links work from a case-study page (`/#about`).
- Work row / carousel card → `/work/:slug`, scrolled to top. Next project cycles 6 → 1.
- Reload on `/work/searchauto` works in `npm run preview`.
- Unknown slug → `/`.
- Mobile case study: specs accordion opens/closes; "Discuss a build" visible while closed.
- Action bar hides when Contact is in view and while drawer is open.
- Reduced motion (emulate): no tilt, no reveals, no pulse, instant drawer.
- Keyboard-only pass through the whole homepage: visible focus everywhere, logical order.
- Console: zero errors and warnings.

PR description must include: screenshots at 375 and 1440 (home + one case study), a list of any contrast adjustments, a list of `TODO(owner)` items (experience dates, portrait, SearchAuto image, production domain), and the bundle size from `vite build`.

---

## 13. Don'ts
- Don't port or import `support.js`, `<sc-if>`, `<sc-for>`, `{{ }}` bindings, `style-hover` attributes, or the `DCLogic` class.
- Don't use inline `style=` props for static styling — CSS Modules only (dynamic values like the tilt transform may use a CSS custom property set inline).
- Don't add fake metrics, testimonials, logos, prices, cart counts.
- Don't absolutely position the hero card.
- Don't make work rows `<button>`s — they are links.
- Don't ship the mobile-design / design-system reference screens as routes.
- Don't add GSAP, Framer Motion, Lenis, Tailwind, or a CSS-in-JS library.
- Don't use `100vh` on mobile.
- Don't commit the 30MB `.mov`.
