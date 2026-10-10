// Runs after `vite build`. Writes one HTML file per route into dist/ so each page ships with its own
// title, description, canonical URL, link-preview tags and structured data, plus a plain-HTML copy of
// its main content for crawlers that don't run JavaScript. React replaces that content on load.
// Also writes dist/sitemap.xml from the same list, so new projects are picked up automatically.
// Page meta lives in src/data/seo.ts.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { createServer } from "vite";

const DIST = "dist";

// Load the TypeScript data modules through Vite, the same way the app sees them.
const vite = await createServer({ server: { middlewareMode: true }, appType: "custom", logLevel: "error" });
const seo = await vite.ssrLoadModule("/src/data/seo.ts");
const { projects, featuredProjects } = await vite.ssrLoadModule("/src/data/projects.ts");
const { services, formatPrice } = await vite.ssrLoadModule("/src/data/services.ts");
const { site } = await vite.ssrLoadModule("/src/data/site.ts");
await vite.close();

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// JSON inside <script>: stop "</script>" and friends from closing the tag early.
const json = (v) => JSON.stringify(v).replace(/</g, "\\u003c");

function head(meta) {
  const url = seo.absoluteUrl(meta.path);
  const image = seo.absoluteUrl(meta.image);
  return `<!-- seo:start -->
    <title>${esc(meta.title)}</title>
    <meta name="description" content="${esc(meta.description)}" />
    <meta name="robots" content="${meta.noindex ? "noindex, follow" : "index, follow"}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="${meta.path.startsWith("/work/") ? "article" : "website"}" />
    <meta property="og:site_name" content="${esc(site.name)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${esc(meta.title)}" />
    <meta property="og:description" content="${esc(meta.description)}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(meta.title)}" />
    <meta name="twitter:description" content="${esc(meta.description)}" />
    <meta name="twitter:image" content="${image}" />
    <script type="application/ld+json" id="ld-json">${json([seo.person, ...(meta.jsonLd ?? [])])}</script>
    <!-- seo:end -->`;
}

const link = (href, text) => `<a href="${href}">${esc(text)}</a>`;
const projectItem = (p) => `<li>${link(`/work/${p.slug}`, `${p.brand} — ${p.kicker}`)}<p>${esc(p.line)}</p></li>`;
const nav = `<nav>${link("/", "Home")} · ${link("/work", "Work")} · ${link("/services", "Services")} · ${link("/book", "Book a call")}</nav>`;

// Plain-HTML version of each page's main content.
function body(meta) {
  if (meta.path === "/") {
    return `<h1>${esc(site.name)} — Shopify Web Developer</h1>
      <p>${esc(meta.description)}</p>
      <h2>Featured Shopify work</h2><ul>${featuredProjects.map(projectItem).join("")}</ul>
      <p>${link("/work", "See all Shopify case studies")} · ${link("/services", "Shopify development services")}</p>`;
  }
  if (meta.path === "/work") {
    return `<h1>Shopify development case studies</h1><p>${esc(meta.description)}</p>
      <ul>${projects.map(projectItem).join("")}</ul>`;
  }
  if (meta.path === "/services") {
    return `<h1>Shopify development services</h1><p>${esc(meta.description)}</p>
      <ul>${services
        .map((s) => `<li><h2>${esc(s.name)}</h2><p>${esc(s.desc)}</p><p>From ${esc(formatPrice(Math.min(...s.tiers.map((t) => t.price))))}${esc(s.unit ?? "")}</p></li>`)
        .join("")}</ul>`;
  }
  const p = projects.find((x) => meta.path === `/work/${x.slug}`);
  if (p) {
    return `<h1>${esc(p.brand)}</h1><p>${esc(p.kicker)} · ${esc(p.year)}</p><p>${esc(p.line)}</p>
      <h2>The problem</h2><p>${esc(p.problem)}</p>
      <h2>What I built</h2><p>${esc(p.build)}</p>
      <h2>How it feels to shop</h2><p>${esc(p.experience)}</p>
      <h2>Result</h2><p>${esc(p.result)}</p>
      <p>Stack: ${esc(p.stack.join(", "))}</p>
      ${p.url ? `<p>${link(p.url, "Visit live site")}</p>` : ""}`;
  }
  return `<h1>${esc(meta.title)}</h1><p>${esc(meta.description)}</p>`;
}

const template = await readFile(join(DIST, "index.html"), "utf8");
if (!template.includes("<!-- seo:start") || !template.includes('<div id="root"></div>')) {
  throw new Error("prerender: dist/index.html is missing the seo markers or the empty #root");
}

const pages = seo.allPages();
for (const meta of pages) {
  const html = template
    .replace(/<!-- seo:start[\s\S]*?<!-- seo:end -->/, head(meta))
    .replace('<div id="root"></div>', `<div id="root"><div data-prerender>${nav}<main>${body(meta)}</main></div></div>`);
  // /work/intervel -> work/intervel.html: served at the clean URL by Vercel (cleanUrls) and Netlify.
  const file = meta.path === "/" ? join(DIST, "index.html") : join(DIST, `${meta.path}.html`);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

const urls = pages.filter((m) => !m.noindex).map((m) => `  <url><loc>${seo.absoluteUrl(m.path)}</loc></url>`);
await writeFile(
  join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
);

console.log(`prerender: ${pages.length} pages, ${urls.length} in sitemap`);
