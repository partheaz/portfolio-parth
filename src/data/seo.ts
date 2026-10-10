import { capabilities } from "./capabilities";
import { experience } from "./experience";
import { locale } from "./locale";
import { projects, type Project } from "./projects";
import { services } from "./services";
import { site } from "./site";

/**
 * Titles, descriptions, link-preview images and structured data for every page.
 * Read twice: by the pages at runtime (useDocumentMeta) and by scripts/prerender.mjs,
 * which writes a real HTML file per route at build time so crawlers and link previews
 * see each page's own meta without running JavaScript.
 */

export const SITE_URL = "https://www.partheazpandey.space";

export type PageMeta = {
  /** Route path, e.g. "/work/intervel". Becomes the canonical URL. */
  path: string;
  title: string;
  description: string;
  /** Absolute path of a 1200x630 JPG in public/. */
  image: string;
  /** Kept out of search results and the sitemap. */
  noindex?: boolean;
  /** Extra schema.org nodes for this page (the Person node is always included). */
  jsonLd?: object[];
};

export const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "/" : path}`;

const DEFAULT_IMAGE = "/images/og/default.jpg";
const personId = `${SITE_URL}/#person`;

/** Who the site is about — included on every page. */
export const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: site.name,
  url: absoluteUrl("/"),
  image: absoluteUrl(DEFAULT_IMAGE),
  jobTitle: "Shopify Web Developer",
  description: site.description,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: locale.city, addressCountry: locale.countryCode },
  worksFor: { "@type": "Organization", name: experience[0].company },
  knowsAbout: [
    "Shopify",
    "Shopify Plus",
    "Shopify theme development",
    "Shopify app development",
    "Liquid",
    "Shopify migrations",
    "Conversion rate optimisation",
    ...capabilities.map((c) => c.title),
  ],
  sameAs: [site.linkedin, site.github],
};

const breadcrumbs = (trail: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: absoluteUrl(t.path) })),
});

const ogImageFor = (p: Project) => (p.image ? `/images/og/${p.image.name}.jpg` : DEFAULT_IMAGE);

export const homeMeta: PageMeta = {
  path: "/",
  title: `${site.name} — Shopify Web Developer | Themes, Apps & Migrations`,
  description:
    "Parth Pandey is a Shopify web developer building custom Shopify themes, Shopify apps, Magento-to-Shopify migrations and integrations that help brands sell more.",
  image: DEFAULT_IMAGE,
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: `${site.name} — Shopify Web Developer`,
      url: absoluteUrl("/"),
      author: { "@id": personId },
    },
  ],
};

export const workMeta: PageMeta = {
  path: "/work",
  title: `Shopify Developer Portfolio — Themes, Apps, Migrations & CRO · ${site.name}`,
  description:
    "Shopify case studies: custom themes, product page and cart rebuilds, Shopify apps, Magento migrations and conversion work for brands in the US, UK and beyond.",
  image: DEFAULT_IMAGE,
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Shopify development case studies",
      url: absoluteUrl("/work"),
      author: { "@id": personId },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: absoluteUrl(`/work/${p.slug}`),
          name: `${p.brand} — ${p.kicker}`,
        })),
      },
    },
    breadcrumbs([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }]),
  ],
};

export const servicesMeta: PageMeta = {
  path: "/services",
  title: `Shopify Development Services — Themes, Apps & Migrations · ${site.name}`,
  description:
    "Hire a Shopify web developer: store audits, theme features, custom Shopify themes, custom apps, migrations and monthly retainers, with starting prices. Book a free 30-minute call.",
  image: DEFAULT_IMAGE,
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Shopify development services",
      itemListElement: services.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: s.name,
          description: s.desc,
          serviceType: "Shopify development",
          provider: { "@id": personId },
          areaServed: "Worldwide",
          offers: {
            "@type": "Offer",
            priceCurrency: locale.priceCurrency,
            price: Math.min(...s.tiers.map((t) => t.price)),
            url: absoluteUrl("/services"),
          },
        },
      })),
    },
    breadcrumbs([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]),
  ],
};

export const bookMeta: PageMeta = {
  path: "/book",
  title: `Book a Shopify consultation · ${site.name}`,
  description: "Book a free 30-minute call with a Shopify web developer about your store, theme, app or migration.",
  image: DEFAULT_IMAGE,
};

export const bookSentMeta: PageMeta = {
  path: "/book/sent",
  title: `Request ready · ${site.name}`,
  description: "Your consultation request is ready to send.",
  image: DEFAULT_IMAGE,
  noindex: true,
};

export const caseStudyMeta = (p: Project): PageMeta => ({
  path: `/work/${p.slug}`,
  title: `${p.brand} — ${p.kicker} · ${site.name}`,
  description: p.line,
  image: ogImageFor(p),
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: `${p.brand} — ${p.kicker}`,
      headline: p.kicker,
      description: p.line,
      url: absoluteUrl(`/work/${p.slug}`),
      image: absoluteUrl(ogImageFor(p)),
      author: { "@id": personId },
      dateCreated: p.year.slice(0, 4),
      keywords: ["Shopify", ...p.tags, ...p.stack].join(", "),
      ...(p.url ? { sameAs: p.url } : {}),
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Work", path: "/work" },
      { name: p.brand, path: `/work/${p.slug}` },
    ]),
  ],
});

/** Every page the prerender step writes. */
export const allPages = (): PageMeta[] => [
  homeMeta,
  workMeta,
  ...projects.map(caseStudyMeta),
  servicesMeta,
  bookMeta,
  bookSentMeta,
];
