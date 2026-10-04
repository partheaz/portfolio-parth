export type Tier = { label: string; price: number; time: string };

export type Service = {
  id: string;
  name: string;
  tag?: string;
  desc: string;
  includes: string[];
  tiers: Tier[];
  /** Price suffix, e.g. "/mo". */
  unit?: string;
};

// TODO(owner): confirm services, starting prices and timings before publishing.
export const services: Service[] = [
  {
    id: "audit", name: "CRO & Store Audit", tag: "Fastest start",
    desc: "I go through your store the way a customer would — and the way a developer would — to find what's slowing people down between landing and checkout.",
    includes: ["Conversion & funnel review", "Page speed (Core Web Vitals) report", "Theme & app bloat review", "Prioritised fix list + 45-min call"],
    tiers: [{ label: "Lite", price: 150, time: "3 days" }, { label: "Full", price: 200, time: "5 days" }],
  },
  {
    id: "feature", name: "Theme Feature",
    desc: "Need one thing your theme can't do — a product builder, quick add, colour swatches, a sticky add to cart? I'll build it so your team manages it from the theme editor.",
    includes: ["Section & block architecture", "Metafield-driven content", "Mobile + accessibility pass", "Handover notes"],
    tiers: [{ label: "Single", price: 50, time: "1 week" }, { label: "Pack of 3", price: 100, time: "Under a week" }],
  },
  {
    id: "theme", name: "Custom Theme", tag: "Most booked",
    desc: "Your design turned into a Shopify 2.0 theme your team can run themselves — every section editable, and quick to load on a phone.",
    includes: ["JSON templates & sections", "Editor-first content model", "Performance budget", "Two rounds of QA"],
    tiers: [{ label: "Starter", price: 600, time: "1–2 weeks" }, { label: "Full build", price: 800, time: "4 weeks" }],
  },
  {
    id: "app", name: "Custom App",
    desc: "A private or public Shopify app with a real backend, for the jobs nothing in the App Store does quite right.",
    includes: ["Data model & API design", "Admin UI on App Bridge", "Webhooks & reconciliation", "Deploy & monitoring"],
    tiers: [{ label: "Private", price: 1500, time: "4–6 weeks" }, { label: "Public-ready", price: 3500, time: "8–10 weeks" }],
  },
  {
    id: "migration", name: "Migration",
    desc: "Moving from Magento or WooCommerce? Your products, details and Google rankings come across intact — through a proper pipeline, not a CSV.",
    includes: ["Attribute → metafield mapping", "Idempotent batch import", "Reconciliation report", "Redirect map"],
    tiers: [{ label: "≤ 2k SKUs", price: 500, time: "3 weeks" }, { label: "2k+ SKUs", price: 700, time: "5–6 weeks" }],
  },
  {
    id: "retainer", name: "Retainer",
    desc: "A Shopify developer on call each month for fixes, new features and the backlog nobody gets to.",
    includes: ["Priority response", "Monthly roadmap call", "Roll over up to 5 hrs", "Cancel any month"],
    tiers: [{ label: "20 hrs", price: 500, time: "Monthly" }, { label: "40 hrs", price: 1000, time: "Monthly" }],
    unit: "/mo",
  },
];

// TODO(owner): keep these current — they're shown on the home page band and the services page.
export const availability = {
  booking: "Freelance · booking Nov — Dec 2026",
  slots: "Freelance · 2 slots open this quarter",
};

export const formatPrice = (n: number) => "$" + n.toLocaleString("en-US");

export const getService = (id: string) => services.find((s) => s.id === id);

/**
 * The four rows in the home page services band. Each shows that service's lowest
 * option, so editing a price above updates the band too.
 */
export const bandPrices = [
  { id: "audit", name: "CRO & store audit" },
  { id: "feature", name: "Theme feature" },
  { id: "theme", name: "Custom theme" },
  { id: "retainer", name: "Retainer" },
].map(({ id, name }) => {
  const s = getService(id)!;
  const lowest = Math.min(...s.tiers.map((t) => t.price));
  return { name, from: `From ${formatPrice(lowest)}${s.unit ?? ""}` };
});
