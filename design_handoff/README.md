# Handoff: Parth Pandey — Shopify Developer Portfolio ("Storefront Specimen")

## Overview
A complete redesign of a personal portfolio for a Shopify Developer / E-commerce Engineer. The site must communicate within ~5 seconds: *this person is a serious Shopify engineer who builds sophisticated e-commerce experiences.*

The chosen art direction is **Storefront Specimen on a spec-sheet grid**: the site's navigational primitives are commerce primitives (variant swatches, cart-style drawer nav, product-spec metadata blocks, PDP-shaped case studies, storefront button behaviour), played straight and premium — never as parody — sitting on a rigorous 12-column, hairline-ruled, mono-labelled editorial grid. The commerce metaphor is deliberately capped at ~60%: no fake prices, no cart counts, no checkout jokes.

Deliverables in this bundle: homepage, six case studies, a mobile-design reference screen, and a design-system reference screen.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look and behaviour, not production code to copy directly.

The task is to **recreate these designs in the target codebase's existing environment** using its established patterns and libraries. If no environment exists yet (this is a greenfield personal site), the recommended stack is below under *Implementation direction*.

Note on the reference file format: `Parth Pandey - Portfolio.dc.html` is a single-file prototype using a small internal runtime (`support.js`) — a template plus a logic class. **Do not port the runtime.** Read it as a spec: the markup shows structure and exact inline style values; the logic class at the bottom of the file holds all content data (projects, capabilities, experience, copy) in plain JS objects you can lift directly.

## Fidelity
**High-fidelity.** Colors, typography, spacing, motion timings, hover states and copy are final and should be reproduced exactly. The only placeholders are imagery: every image slot is a striped placeholder with a mono caption describing what belongs there (project screenshots, UI details, portrait). Real assets are to be supplied by the client.

---

## Design tokens

### Color
| Token | Value | Use |
|---|---|---|
| Bone | `#F2EDE4` | Page ground |
| Paper | `#F7F3EC` | Raised surfaces (cards, spec rail), inverted text color |
| Ink | `#1B1D20` | Primary text, primary button fill |
| Charcoal | `#121311` | Inverted sections (proof strip, contact, footer, drawer) |
| Accent — ultramarine | `#2B31C9` | Links, "view case study", flow step numbers, hover states, availability accent in drawer |
| Status green | `#3F7A55` | Availability dot only |
| Hairline (on bone) | `rgba(27,29,32,0.14)` | Structural rules |
| Hairline strong | `rgba(27,29,32,0.20)` | Section-header rules |
| Hairline (on charcoal) | `rgba(247,243,236,0.12–0.18)` | Rules in inverted sections |
| Text 82% / 78% / 55% / 45% | `rgba(27,29,32,0.82 / 0.78 / 0.55 / 0.45)` | Body, secondary body, labels, meta |
| Hover surface | `#EDE6DB` | Capability block hover |
| Placeholder fill | `#E8E1D5` + `repeating-linear-gradient(135deg, rgba(27,29,32,0.055) 0 1px, transparent 1px 7px)` | Image slots |

Accent alternatives that were considered and remain valid swatches: acid lime `#C6F24D`, magenta `#C01E7A`, vermilion `#E4572E`.

### Typography
Three families, all Google Fonts:
- **Syne** (600/700) — display. Project names, hero headline, section headlines, drawer nav, pull quotes.
- **Hanken Grotesk** (400/500/600) — all body copy and UI text.
- **DM Mono** (400/500) — every label, spec value, index number, stack list, footer. Always `text-transform: uppercase`, `letter-spacing: 0.04–0.10em`, sizes 8–11px.

Alternative display face (also loaded, switchable): **Bodoni Moda** for a high-contrast editorial variant.

Scale (fluid; clamp values as authored):
| Role | Size |
|---|---|
| Hero display | `clamp(46px, 9.4vw, 168px)` / line-height 0.86 / tracking -0.02em / weight 700 |
| Case-study H1 | `clamp(44px, 9.5vw, 132px)` / 0.9 / -0.02em / 700 |
| Contact H2 | `clamp(38px, 7.6vw, 108px)` / 0.95 / -0.02em / 700 |
| Project name (work row) | `clamp(30px, 5.4vw, 74px)` / 0.95 / -0.01em / 600 |
| Pull quote (about) | `clamp(25px, 3.1vw, 40px)` / 1.18 / 600 |
| Result statement | `clamp(22px, 2.6vw, 33px)` / 1.25 / 600 |
| Proof figure | `clamp(38px, 4.4vw, 58px)` / 1 / tabular-nums |
| Body large | `clamp(17px, 1.5vw, 21px)` / 1.5 |
| Body | `16–17px` / 1.6 / measure 52–62ch |
| Capability title | `21px` / weight 500 (Hanken Grotesk, not display) |
| Label (mono) | `9–11px` / uppercase / tracking 0.06–0.10em |

All numerals in figures and spec tables use `font-variant-numeric: tabular-nums`. Body copy uses `text-wrap: pretty`.

### Spacing
4px base: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 96 / 160.
- Page gutter: `20px` all breakpoints.
- Section padding-top: `clamp(64px, 9vw, 140px)`.
- Inverted section padding: `clamp(64px, 9vw, 140px) 20px clamp(48px, 6vw, 88px)`.
- Grid gap: `24px` (hero, case study), `20px` (work rows).

### Radius
`0` for rules and structural dividers; `4px` for buttons, cards, chips, spec rails, image slots, phone-frame inner elements; `22px` for the mobile-mock device frame; `999px` for status dots only. Nothing else is rounded.

### Elevation
Almost none. Two shadows exist: hero developer card `0 18px 40px -28px rgba(27,29,32,0.5)`, mobile mock frames `0 24px 50px -34px rgba(27,29,32,0.55)`. Cards elsewhere are defined by hairlines, not shadow.

### Motion
| Tier | Duration | Use |
|---|---|---|
| Press / hover | `120ms` | Button hover + press, link color, swatch state |
| UI | `200ms` | Drawer slide, scrim fade, row padding shift, card tilt, capability hover |
| Reveal | `420ms` | Section entrance, image clip (to be added on scroll) |

Easing: `cubic-bezier(0.2, 0, 0, 1)` for entrances and the default, `cubic-bezier(0.4, 0, 0.2, 1)` for exits. Reveals are clip-path wipes and 12px translates — never fade-up-scale. All motion wrapped in `prefers-reduced-motion: reduce` (the prototype sets animation/transition duration to `0.01ms`).

### Grid
12 columns, `24px` gutters, `20px` page margins. Breakpoints: `480 / 768 / 900 / 1024 / 1200 / 1600`. The two structural breakpoints in use are **900px** (single column → 12-col layouts engage) and **1200px** (hero statement/swatch row splits 7/5).

---

## Screens

### 1. Homepage

**Sticky header** (z 60, bone ground, hairline bottom)
- *Announcement rail*, 30px tall, mono 9.5px uppercase: left — 6px green status dot (2.4s opacity pulse 1 → 0.25) + "Open to Shopify / e-commerce roles"; right — "IST · UTC+5:30". Hidden when the `commerceChrome` flag is off.
- *Nav bar*, 54px: left — "Parth Pandey" in Syne 21px + "Shopify Dev" mono 9.5px at 50% ink, whole thing routes home. Right — desktop-only (≥900px) text links WORK / CAPABILITIES / ABOUT (mono 10px, 62% → 100% ink on hover, 8px×12px padding) and a **Menu** button (38px tall, 1px hairline border, 4px radius, mono 10px, two 12×1px bars; hover inverts to ink fill / paper text).

**Hero** (min-height 78vh, 12-col, `align-items: end`, padding `clamp(48px,9vw,120px) 20px clamp(32px,4vw,56px)`)
- `[data-hero="head"]` — cols 1–8 at ≥900px (span 12 below), max-width 1060px. Eyebrow row: "PARTH PANDEY" mono 10px / a 1px hairline flex spacer capped at 120px / "4+ YRS". Then H1 `Shopify<br>Developer`.
- `[data-hero="card"]` — cols 9–12, row 1, align-self start; **hidden below 900px**. The "developer card": 100% width, max 300px, paper fill, hairline, 4px radius, shadow. Rows: header (`DEVELOPER` / `SKU PP-01`), name block ("Parth Pandey" Syne 27px + "Shopify · E-commerce" mono), a 4-row spec table (`EXP 4+ YRS` / `FOCUS Themes · Apps` / `CLIENTS International` / `STATUS Available` — status value in accent), and a 44px ink "HIRE →" button (hover → accent). The card tilts toward the cursor: `perspective(900px) rotateY(x*4deg) rotateX(-y*3deg)` where x/y are normalised −1…1 pointer offsets from viewport center, transitioned at 200ms. Passive `mousemove` on window.
- `[data-hero="lower"]` — row 2, full width, nested 12-col, `align-items: end`. Left: the statement paragraph (max 46ch), cols 1–7 at ≥1200px. Right: the **variant swatch row**, cols 8–12 at ≥1200px, right-aligned and `nowrap`; four 38px chips — THEMES / APPS / INTEGRATIONS / MIGRATIONS — mono 10px, 4px radius, unselected = transparent with `rgba(27,29,32,0.22)` border, selected = ink fill / paper text / ink border.
- **The key interaction:** selecting a swatch rewrites the statement paragraph in place; re-clicking the active swatch deselects and restores the default. This is the hero's whole idea — it demonstrates variant mechanics while stating the positioning. Copy for all five states is in *Content* below.

**Proof strip** (charcoal ground, paper text) — `repeat(auto-fit, minmax(160px, 1fr))`, each cell padded `clamp(28px,4vw,44px)` with an `rgba(247,243,236,0.14)` right divider (none on the last). Figure in Syne `clamp(38px,4.4vw,58px)` tabular, caption mono 9px at 50% paper, max 18ch: **4+** Years Shopify & e-commerce · **30+** Store customizations · **15+** E-commerce projects · **04** Custom Shopify apps · **UK · US · IN** Client regions. No revenue or conversion figures — only claims the client can support.

**Selected work** (`#work`) — section header: hairline-bottomed row, `SELECTED WORK` left / `06 OF 15+` right, mono 10px tracking 0.10em.
Six rows, each a full-width button, 12-col, `padding: clamp(24px,3vw,40px) 0`, hairline bottom. Hover: `padding-left: 12px` (200ms) and bottom border to `rgba(27,29,32,0.5)`.
Row anatomy: index (mono 10px, 45% ink, tabular) + project name (Syne display) on one line; below, a nested 12-col — at ≥900px the text block takes cols 1–6 (order 1) and the 16:10 image slot cols 7–12 (order 2); below 900px the image comes **first** (order 1) and the text second. Text block: one-line description (16px, 78% ink, max 52ch), stack line (mono 9px, 45% ink — first four technologies joined by ` · ` then `  /  ` then the year), and a mono 10px accent "VIEW CASE STUDY →".
Below the rows: "ALSO SHIPPED —" followed by `Dukeshill · ForgetMeNot · Summit Sheets · Frame Fusion · COD payment app` (mono 9px).

**Capability map** (`#capabilities`) — section header `CAPABILITY MAP / 06`. `repeat(auto-fit, minmax(260px, 1fr))`; each block padded `clamp(24px,3vw,36px) 20px clamp(28px,3.4vw,44px) 0` with hairline right + bottom, hover background `#EDE6DB` at 200ms. Block: index (mono 9px, 40%), title (Hanken Grotesk 500, 21px, tracking -0.01em), then 5 mono 10px items at 66% ink, `gap: 7px`. Six blocks — content in *Content* below. This replaces any skills cloud: it reads as a system diagram, not a tag list.

**About** (`#about`) — section header `ABOUT / AHMEDABAD, IN`. 12-col with `gap: clamp(24px,3vw,48px)`, padding-top `clamp(32px,4vw,56px)`. At ≥900px: portrait cols 1–5 (4:5 image slot, max-width 420px), text cols 6–12. Text block: pull quote in display face `clamp(25px,3.1vw,40px)` max 30ch, then three body paragraphs (max 58ch, 82%/80% ink), then the **experience table** — hairline-topped list, each row `1fr auto` with company (17px, weight 500) + role (mono 9px, 50%) on the left and years (mono 10px, 55%, tabular) right-aligned. Four rows, most recent first. Reads as a colophon, not a résumé.

**Contact** (`#contact`) — charcoal, margin-top `clamp(64px,9vw,140px)`. Mono `CONTACT` label, then H2 "Have a Shopify problem worth solving?" (max 22ch). Primary CTA: 60px tall, paper fill / charcoal text, 4px radius, mono 11px, "LET'S BUILD IT →"; hover `translateY(-1px)` + accent fill + paper text; active `scale(0.985)`; 120ms. Beside it, mono 9.5px at 45%: "Usually replies same day · Available for contract or full-time". Below, `repeat(auto-fit, minmax(200px, 1fr))` of three rows — Email / LinkedIn / GitHub — each mono 10px with a 50%-opacity `↗` right-aligned, hairline bottom, hover to accent.

**Footer** — 16px/20px padding, charcoal, mono 9px at 45%: "Parth Pandey · Shopify Developer" left, "© 2026" right.

**Drawer nav** (the cart-drawer pattern) — fixed full-viewport layer, z 90. Scrim `rgba(18,19,17,0.5)` fading over 200ms, `pointer-events` toggled with open state, click-to-close. Panel: `min(420px, 88vw)`, right-anchored, charcoal, `translateX(100% → 0)` at 200ms `cubic-bezier(0.2,0,0,1)`, 20px padding, flex column. Header: `INDEX` / `CLOSE ✕` (mono 9.5px, 55% paper), hairline bottom. Four nav rows: display face 34px, 18px vertical padding, hairline bottom, with a right-aligned mono count (`06`, `06`, `04`, `01`); hover shifts `padding-left: 10px` and colors the label accent. Below: two secondary mono links — "→ Mobile design", "→ Design system" (these exist because this is a design deliverable; drop them or repoint them in production). Footer of the drawer, where a cart subtotal would sit: "1 DEVELOPER" left, "AVAILABLE" in accent right.

### 2. Case study (×6, same template)
Opened from any work row; the prototype swaps view state and scrolls to top. In production these are **routes**: `/work/<slug>`.

- **Header** — "← ALL WORK" mono link (hover accent). Then index + kicker on one mono line, H1 brand name, and the one-line description (max 46ch, `clamp(17px,1.5vw,20px)`).
- **Cover image** — full-width 16:9 slot with mono caption.
- **Body** — 12-col, `gap: clamp(24px,3vw,48px)`, padding-top `clamp(48px,7vw,112px)`. At ≥900px: narrative cols 1–8 (order 1), spec rail cols 9–12 (order 2, `position: sticky; top: 104px; align-self: start`). Below 900px the rail stacks above the narrative.
- **Spec rail** — paper fill, hairline, 4px radius. "PROJECT SPECS" header, then 5 rows of `74px 1fr` mono 9px (label 45% left, value right-aligned), then a 46px ink "DISCUSS A BUILD →" button (hover accent). This is the PDP buy box.
- **Narrative** — five numbered sections, each opened by a hairline-bottomed mono header (`01 THE PROBLEM`, `02 THE BUILD`, `03 THE EXPERIENCE`, `04 THE TECH`, `05 THE RESULT`), `gap: clamp(40px,5vw,72px)` between them.
  - 01 — one paragraph, 17px, max 62ch.
  - 02 — one paragraph, then the **flow stepper**: wrapping flex of 5 cards (`flex: 1 1 150px`, paper fill, hairline, 4px radius, 14px padding) each with a mono accent step number and a 14px label. This is the visual storytelling device — the flow diagram, not a paragraph.
  - 03 — one paragraph plus two 4:3 image slots (`repeat(auto-fit, minmax(220px,1fr))`, 12px gap) captioned "UI detail — desktop" / "UI detail — mobile".
  - 04 — wrapping chips: 1px hairline border, 4px radius, `8px 12px`, mono 9.5px uppercase at 75% ink.
  - 05 — a single display-face statement, `clamp(22px,2.6vw,33px)`, max 46ch. Outcome stated qualitatively; **no invented metrics**.
- **Next project** — full-width button, hairline top and bottom, `1fr auto`: "NEXT PROJECT" mono label + brand name in display `clamp(30px,5vw,62px)`, accent `→` right. Cycles `(i + 1) % 6`. Hover `padding-left: 12px`.
- Footer as homepage.

### 3. Mobile design (reference screen)
Not a production page — a documentation view showing that mobile was designed independently. Three 320×620 device frames (22px radius, 1px hairline, shadow) with mono captions:
1. **Hero · sticky action bar** — condensed announcement line, 16px logo + Menu chip, mono meta, 44px display headline, 13px statement, three swatch chips (first selected), a peeking horizontal work carousel (cards at `flex: 0 0 62%` so the next one shows), and a charcoal sticky bottom bar: "AVAILABLE NOW" + a paper "HIRE ME →" chip.
2. **Work · 4:3 crops, no hover reliance** — `SELECTED WORK / 06` header, then stacked entries: 4:3 image, index + name, 12px description, mono stack line. Crops change from 16:10 to 4:3 on mobile; nothing depends on hover.
3. **Drawer nav** — the charcoal drawer at phone width with 30px display rows and the "1 developer / Available" footer.

Mobile rules to carry into production: display type caps at ~44px; every target ≥44px; work images crop 4:3; the work carousel peeks rather than snapping full-width; sticky action bar replaces the desktop hero card (the card is hidden, not shrunk); case-study specs collapse into an accordion.

### 4. Design system (reference screen)
A specimen page: five color swatches with hex labels, the type scale with mono size annotations, component specimens (primary button, secondary button, chip, status dot), a 12-column grid diagram, a 4px spacing ramp, and the three motion tiers with the easing curve. Use it as the acceptance reference; it is not part of the public site.

---

## Interactions & behavior

| Interaction | Behavior |
|---|---|
| Swatch select | Sets active variant; rewrites hero statement. Clicking the active chip clears it (back to the default statement). |
| Developer card tilt | Window `mousemove` (passive) → normalised offsets → `rotateY(x*4deg) rotateX(-y*3deg)`, 200ms transition. Disable under `prefers-reduced-motion`; desktop only. |
| Drawer | Menu opens, scrim click or CLOSE closes, nav-link click closes then scrolls. In production: also close on `Esc`, trap focus, `aria-expanded` on the trigger, `inert` on the page behind. |
| Work row → case study | Navigates to the case-study route and resets scroll to top. |
| Next project | Cycles to `(current + 1) % 6`, resets scroll. |
| Row hover | `padding-left: 12px` + border to 50% ink, 200ms. Production addition: swap the image to a second detail shot on hover (a storefront second-shot gesture), and a 10px ink cursor dot that grows to 48px with a "VIEW" mono label over work rows. |
| Section reveals | Not yet implemented in the prototype. Add an IntersectionObserver that plays a 420ms clip-path wipe + 12px translate once per element; respect reduced motion. |
| In-page nav | Plain anchor links to `#work`, `#capabilities`, `#about`, `#contact`. Keep native smooth scrolling; **no scroll hijacking**. |

Responsive: single column below 900px; 12-col engages at 900px; hero statement/swatch row splits 7/5 at 1200px. No fixed heights on text containers; all display type is `clamp()`-fluid so it never collides with the hero card (a prior version did — the card must be a real grid item in columns 9–12, never absolutely positioned).

## State
Trivial and local. Prototype state: `view` (home / case / mobile / system — becomes routing in production), `caseIndex` (becomes a route param), `variant` (−1 = default statement), `drawer` (boolean), `tilt` ({x, y} pointer offsets). No data fetching; all content is static.

---

## Content

**Hero statement (default):** "I build the parts of Shopify stores customers never think about — configurators, carts, migrations, apps — and the parts they judge in two seconds."

**Swatch statements:**
- *Themes* — "Custom themes and theme architecture — sections, blocks and metafields the merchant can actually edit, on a JavaScript budget that holds on mobile."
- *Apps* — "Shopify apps with real backends — Admin and Storefront API, webhooks, App Bridge, and data models that survive catalogue scale."
- *Integrations* — "Uploads, fulfillment, payments and third-party APIs wired into the cart and checkout without breaking either one."
- *Migrations* — "Legacy platforms moved to Shopify — products, variants, collections, metafields and URL equity intact, through a pipeline instead of a CSV."

**Capability map:**
1. Theme engineering — Liquid · Shopify 2.0 / JSON templates / Sections & blocks / Metafields & metaobjects / Editor-first authoring
2. Commerce logic — Cart & line item properties / Checkout & selling plans / Subscriptions / Draft orders / Product configuration
3. Shopify apps — Admin API · GraphQL & REST / Storefront API / App Bridge & app proxies / Webhooks & reconciliation / Node.js · MySQL
4. Integrations — Third-party APIs / Payments & COD flows / Fulfillment & tracking / File uploads (Dropbox) / Analytics & events
5. Performance — Core Web Vitals / JS budget & deferral / Responsive image systems / Theme audit & cleanup / Progressive enhancement
6. Frontend — JavaScript · TypeScript / React · Next.js / Modern CSS · Tailwind / Figma implementation / Accessibility

**Experience:** Nine15 — Shopify Developer, 2024–Present · MME Solutions — Full Stack Developer, 2023–2024 · CartMade Ecommerce — Shopify Developer, 2022–2023 · Agnos Inc — Software Developer / Intern, 2021–2022.

**About:** pull quote — "I like taking complicated commerce problems and turning them into interfaces that feel obvious." Three paragraphs follow in the reference file; copy them verbatim.

**Case studies:** six, in homepage order — Iron Displays (configurator → Dropbox upload → cart → draft order), SearchAuto (YMM fitment app, Node + MySQL, SEO fitment URLs), Graduation World (Magento → Shopify migration pipeline), Catalog2Cart (shoppable PDF app), Almsthre (theme engineering: drawer nav, quick add, swatches, sticky ATC), Usemanly (custom storefront + Pay & Subscribe). Full problem / build / experience / result / flow / specs / stack text for each is in the `projects` array in the logic class of the reference file — lift it verbatim; it was written from the client's real work.

**Copy rules:** plain, specific, engineer's voice. No "crafting digital experiences", no superlatives, no invented statistics, testimonials, client logos or revenue figures.

## Assets
None supplied. Every image is a striped placeholder captioned with its intended content:
- 6 × work thumbnails, 16:10 (and 4:3 on mobile)
- 6 × case-study covers, 16:9
- 12 × case-study UI details, 4:3 (two per case study)
- 1 × portrait, 4:5

The client owes real project screenshots and a portrait. Serve as AVIF/WebP with explicit dimensions to protect CLS, `loading="lazy"` below the fold, and keep the striped placeholder as the loading background.

## Implementation direction
Greenfield, so: **Next.js (App Router) + TypeScript**, plain **CSS Modules** with custom properties for the token layer. Skip Tailwind here — the type scale is fluid and the layout is art-directed per section; utilities fight both. Motion: CSS transitions plus a small IntersectionObserver reveal hook; reach for GSAP only if the hero scroll transform and case-study stepper need it. Self-host the three fonts (Syne, Hanken Grotesk, DM Mono), preload the display face, `font-display: swap`, variable where available.

Routes: `/` · `/work/[slug]` (six) — the mobile and design-system screens are internal references, not routes.

Budgets: LCP under 1.2s, CLS 0, ~50KB JS on the homepage. A slow Shopify-developer portfolio undercuts the entire argument.

SEO, naturally and without stuffing: `Shopify Developer` in the H1; capability headings carry theme / app / migration / integration language; per-case-study titles and descriptions; `Person` JSON-LD plus `CreativeWork` per project; sensible OG images once real screenshots exist.

Accessibility: hairline-on-bone rules are decorative only — all text sits at full opacity ink or paper (≥4.5:1). Keep the drawer keyboard-operable (Esc, focus trap, restore focus), give every image real alt text when assets land, make work rows real links rather than buttons, and honour `prefers-reduced-motion` for the tilt, drawer and reveals.

## Files
- `Parth Pandey - Portfolio.dc.html` — the design reference (all four screens; content data in the logic class at the bottom).
- `support.js` — runtime for the prototype only. **Do not port.**
