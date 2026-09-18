import type { ImageAsset } from "./images";

export type Project = {
  slug: string;
  num: string;
  brand: string;
  year: string;
  kicker: string;
  line: string;
  /** Caption for the image slot — doubles as alt text when an image exists. */
  shot: string;
  stack: string[];
  problem: string;
  build: string;
  experience: string;
  result: string;
  flow: { n: string; t: string }[];
  specs: { k: string; v: string }[];
  image?: ImageAsset;
  /** Extra screenshots: used for the case study's UI-detail slots and the desktop hover second shot. */
  gallery?: ImageAsset[];
  /** Live store, linked from the case study. */
  url?: string;
};

// Content lifted verbatim from design_handoff/portfolio.dc.html.
// TODO(owner): Almsthre has no screenshot yet — it renders the striped placeholder.
export const projects: Project[] = [
  {
    slug: "100-percent",
    num: "01", brand: "100 Percent", year: "2025",
    kicker: "Shopify Plus storefront and PDP rebuild",
    url: "https://www.100percent.com/",
    line: "A rebuilt product page and buying flow for a Shopify Plus store — custom quick add, sticky add to cart, a fully custom Rebuy cart, and colourway switching across separate products that behaves like a variant change.",
    shot: "Custom Rebuy cart drawer with free-shipping bar and cross-sell row",
    stack: ["Shopify Plus", "Liquid", "JavaScript", "Rebuy", "Metaobjects", "Search & Discovery", "Sortwise collection filters"],
    problem: "100 Percent runs a large catalogue where a single style exists as several separate products rather than as variants of one. Customers had to leave the product page and come back to compare colourways, quick add did nothing useful on collection pages, and the stock cart and filtering couldn't be pushed far enough to match how the range is actually shopped.",
    build: "I rebuilt the product page end to end and remapped how its sections read data. Colourways are pulled in through metaobjects, so products that are separate in admin present as one style and switching between them updates the page in place instead of reloading into a different product. I built a custom quick add to cart and a sticky add to cart bar, then replaced the Rebuy cart with a fully custom implementation using custom templating and a custom Rebuy data source. Collection pages got a custom filter that works alongside Shopify's own Search & Discovery, plus collection breakers that sit inside the grid without fighting the Sortwise filtering app.",
    experience: "Switching a colourway feels like changing a variant — the page updates in place, no reload, no losing your spot. Add to cart stays reachable the whole way down a long product page, quick add works straight from the grid, and the cart is styled and structured like the rest of the site rather than like an app drawer. Merchandising breakers appear mid-grid without breaking filtering or sort.",
    result: "The range now reads as one connected catalogue instead of a list of separate products, and the team can merchandise collections and cart without developer time for every change.",
    flow: [{ n: "01", t: "Remap PDP sections and data" }, { n: "02", t: "Metaobject-driven colourway switching" }, { n: "03", t: "Custom quick add and sticky ATC" }, { n: "04", t: "Custom Rebuy cart and data source" }, { n: "05", t: "Filters and collection breakers" }],
    specs: [{ k: "Client", v: "100 Percent" }, { k: "Surface", v: "Shopify Plus theme" }, { k: "Role", v: "Sole developer" }, { k: "Year", v: "2025" }, { k: "Scope", v: "PDP, cart, collection, quick add" }],
    image: { name: "100-percent-home", width: 1600, height: 810 },
    gallery: [{ name: "100-percent", width: 1600, height: 800 }]
  },
  {
    slug: "iron-displays",
    num: "02", brand: "Iron Displays", year: "2025",
    kicker: "Custom Shopify commerce experience",
    line: "A multi-step product configurator with artwork upload, feeding a cart line item and an automatic draft order for quoting.",
    shot: "Configurator step 3 — artwork upload",
    stack: ["Shopify", "Liquid", "JavaScript", "Dropbox API", "Draft Orders API", "Line item properties"],
    problem: "Iron Displays sells fabricated display units that can't be priced until the customer picks size, finish and mounting, then supplies print-ready artwork. Every order started as an email thread with attachments, and the storefront could only take a deposit.",
    build: "I built a stepped configurator as a theme section — each step reads from metafields, so the client edits options in admin rather than in code. Selections write to line item properties; uploads stream to the client's Dropbox with a signed reference stored on the line. On add to cart, an app proxy creates a draft order so the team can adjust freight before invoicing.",
    experience: "The configurator had to feel like part of the PDP, not a bolted-on app. State lives in the URL so a customer can send a configuration to a colleague, the summary panel stays visible while scrolling on mobile, and validation happens per step instead of at the end.",
    result: "The client's quoting process moved from inbox threads to draft orders, and the team edits configuration options themselves.",
    flow: [{ n: "01", t: "Customer chooses configuration" }, { n: "02", t: "Uploads print artwork" }, { n: "03", t: "File lands in Dropbox, reference on the line item" }, { n: "04", t: "Configured product enters cart" }, { n: "05", t: "Draft order generated for the team" }],
    specs: [{ k: "Client", v: "Iron Displays" }, { k: "Surface", v: "Theme + app proxy" }, { k: "Role", v: "Sole developer" }, { k: "Year", v: "2025" }, { k: "Scope", v: "Configurator, uploads, draft orders" }],
    image: { name: "iron-displays", width: 1600, height: 790 }
  },
  {
    slug: "graduation-world",
    num: "03", brand: "Graduation World", year: "2024",
    kicker: "Magento → Shopify migration",
    line: "A full catalogue migration built as a custom API pipeline rather than a CSV import — products, variants, collections, metafields and media.",
    shot: "Migration mapping — before / after",
    stack: ["Shopify", "Admin API", "GraphQL", "Node.js", "Metafields", "Redirects"],
    problem: "A large Magento catalogue with attribute structures Shopify has no direct equivalent for. CSV import lost variant relationships, custom attributes and image ordering, and would have broken years of ranking URLs.",
    build: "I wrote a migration pipeline that read Magento's API, mapped attributes to a documented metafield schema, and wrote to Shopify through the Admin API in idempotent batches with retry and a reconciliation report. Old URLs mapped to a redirect set generated from the same data.",
    experience: "The storefront was rebuilt to read the new metafield schema directly, so the merchandising the client relied on in Magento — attribute-based filtering, personalisation fields — survived the move instead of being approximated.",
    result: "Catalogue, taxonomy and URL equity moved intact, with a repeatable pipeline for later batches.",
    flow: [{ n: "01", t: "Read Magento catalogue via API" }, { n: "02", t: "Map attributes to metafield schema" }, { n: "03", t: "Batch write through Admin API" }, { n: "04", t: "Reconcile and report gaps" }, { n: "05", t: "Generate redirect map" }],
    specs: [{ k: "Client", v: "Graduation World" }, { k: "Surface", v: "Migration + theme" }, { k: "Role", v: "Migration lead" }, { k: "Year", v: "2024" }, { k: "Scope", v: "Catalogue, metafields, redirects" }],
    image: { name: "graduation-world", width: 1600, height: 726 }
  },
  {
    slug: "catalog2cart",
    num: "04", brand: "Catalog2Cart", year: "2024",
    kicker: "Shopify app — shoppable PDF",
    line: "Turns a brand's print catalogue into an interactive shopping surface: hotspots over PDF pages that resolve to products and add straight to cart.",
    shot: "PDF page with product hotspots",
    stack: ["Shopify App", "Storefront API", "PDF.js", "Node.js", "App Bridge"],
    problem: "Wholesale and gifting brands still sell from print catalogues. Customers browse the PDF, then hunt for the same item on the site — a break that loses the order.",
    build: "The app renders catalogue pages in the browser and lets merchants draw hotspots on each page, binding them to product and variant IDs. Hotspot data is stored per catalogue; the storefront viewer resolves live price and availability through the Storefront API and adds to cart in place.",
    experience: "The viewer keeps the catalogue's spread layout — page navigation, zoom, pinch on mobile — and only reveals commerce UI on tap, so the reading experience stays intact instead of becoming a product grid.",
    result: "Merchants keep the catalogue as the sales tool and make it transactional, without redesigning it as a web page.",
    flow: [{ n: "01", t: "Merchant uploads catalogue PDF" }, { n: "02", t: "Draws hotspots over products" }, { n: "03", t: "Hotspots bound to variant IDs" }, { n: "04", t: "Customer taps a product in the page" }, { n: "05", t: "Adds to cart without leaving the catalogue" }],
    specs: [{ k: "Type", v: "Shopify app" }, { k: "Surface", v: "Admin + storefront viewer" }, { k: "Role", v: "Full stack" }, { k: "Year", v: "2024" }, { k: "Scope", v: "Hotspot editor, viewer, cart" }],
    image: { name: "catalog2cart", width: 1600, height: 900 }
  },
  {
    slug: "almsthre",
    num: "05", brand: "Almsthre", year: "2024",
    kicker: "Theme engineering",
    line: "Custom theme work across navigation, collection and product: desktop drawer nav, quick add, colour swatches and a sticky add-to-cart.",
    shot: "Desktop drawer navigation — open state",
    stack: ["Shopify 2.0", "Liquid", "JSON templates", "Sections & blocks", "Metafields", "Vanilla JS"],
    problem: "A growing catalogue outgrew the theme it launched on: navigation couldn't express the category depth, collection pages required a page load per product to add anything, and the product page buried the buy button on mobile.",
    build: "I replaced the mega menu with a desktop drawer driven by section blocks so the client edits it in the editor. Quick add and swatches read variant data from metafields and share one cart module, so collection, quick add and PDP stay in sync. The sticky add-to-cart mirrors variant state rather than re-implementing it.",
    experience: "All of it is progressive: swatches and quick add are enhancements over working links and forms, so the collection page functions before JavaScript runs and stays under budget on mobile.",
    result: "Adding to cart stopped costing a page load, and the client maintains their own navigation.",
    flow: [{ n: "01", t: "Audit theme and mobile budget" }, { n: "02", t: "Drawer nav from editor blocks" }, { n: "03", t: "Shared cart + variant module" }, { n: "04", t: "Quick add and swatches on collection" }, { n: "05", t: "Sticky ATC mirroring variant state" }],
    specs: [{ k: "Client", v: "Almsthre" }, { k: "Surface", v: "Theme (Shopify 2.0)" }, { k: "Role", v: "Theme developer" }, { k: "Year", v: "2024" }, { k: "Scope", v: "Nav, collection, PDP, cart" }]
  }
];

export const getProject = (slug: string | undefined) => projects.find((p) => p.slug === slug);
