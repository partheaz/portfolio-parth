import type { ImageAsset, VideoAsset } from "./images";

/** Work-page filters — the same words as the hero swatches. */
export const workTags = ["Themes", "Apps", "Integrations", "Migrations", "CRO"] as const;
export type WorkTag = (typeof workTags)[number];

/** One way the build helps more visitors buy — shown under "Why it converts". */
export type CroLever = { lever: string; detail: string };

export type Project = {
  slug: string;
  num: string;
  brand: string;
  year: string;
  kicker: string;
  /** Shown in the homepage's short "Featured work" list; every project is on /work. */
  featured?: boolean;
  tags: WorkTag[];
  line: string;
  /** Caption for the image slot — doubles as alt text when an image exists. */
  shot: string;
  stack: string[];
  problem: string;
  build: string;
  experience: string;
  /** Conversion (CRO) angle: what the work removes between a shopper and checkout. */
  cro: CroLever[];
  result: string;
  flow: { n: string; t: string }[];
  specs: { k: string; v: string }[];
  image?: ImageAsset;
  /** Extra screenshots: used for the case study's UI-detail slots and the desktop hover second shot. */
  gallery?: ImageAsset[];
  /** Portrait phone screenshots, shown as a row under "How it feels to shop". */
  mobile?: ImageAsset[];
  /**
   * Screen recordings. The first one also plays in the desktop hover preview;
   * one marked `cover` replaces the case study's cover image.
   * Drop files in /public/videos — see README → "Adding project videos".
   */
  videos?: VideoAsset[];
  /** Live store, linked from the case study. */
  url?: string;
};

// Copy: written for store owners — what was wrong, what changed for their shoppers and team.
// Rule: no invented numbers. Only figures the client has confirmed (Masienda's ~28%) appear.
export const projects: Project[] = [
  {
    slug: "intervel",
    tags: ["Themes", "CRO", "Integrations"],
    num: "01", brand: "Intervel", year: "2025–26",
    kicker: "Custom Shopify theme and product launch waitlist",
    url: "https://www.intervel.co/",
    line: "A custom Shopify theme for Intervel, a direct-to-consumer pouch brand — tiered discounts and bundles that build bigger carts, subscribe-and-save on every product, and a launch waitlist that turns every buy button into a signup with one setting.",
    shot: "Sidekick 3-pack product page in waitlist mode",
    stack: ["Shopify OS 2.0", "Liquid", "JavaScript web components", "Alpine.js", "Klaviyo Client API", "Skio subscriptions", "Metafields", "Intelligems A/B testing"],
    problem: "Intervel sells pouches across three product lines — Performance, Sidekick and Bliss — in different flavours and strengths, one-off or on subscription. The store needed a buy box that made those choices simple, a cart that rewarded buying more, and for a new product launch, a way to collect waitlist signups across the whole site before anything could be bought — without the signups disappearing when ad blockers got in the way.",
    build: "I built and maintained the theme across the homepage, collections, product pages, cart, search and landing pages, as one of about five developers at NINE15. On the product page I built the buy box: one-time or subscribe-and-save through Skio, a flavour and strength picker, and tiered quantity discounts that update as the shopper changes quantity. In the cart, bundles are grouped and priced correctly, and a smart upsell offers single cans linked to a 3-pack — skipping any flavour already in the cart. For the launch I built a waitlist mode: one theme setting turns every add-to-cart on the site into \"Join Waitlist\", opening Klaviyo's signup form, with the theme's own form as a fallback when the popup is blocked. I also rebuilt the header with a mega menu and built the ingredients, marquee, carousel and collection sections the team uses to build pages.",
    experience: "Picking a flavour, a strength and a subscription happens in one place, with the saving shown up front and sold-out options clearly greyed out. Adding more shows the next discount tier straight away, and the cart suggests the single cans that go with a 3-pack — never one you already have. During the launch, every buy button on the site invites shoppers onto the waitlist, and the signup works even with an ad blocker.",
    cro: [
      { lever: "No lost launch signups", detail: "When an ad blocker stops Klaviyo's popup, the theme's own form takes over — and if Klaviyo can't be reached at all, the signup is saved as a tagged Shopify customer instead." },
      { lever: "Bigger orders", detail: "Live tiered discounts and a nudge to the next tier show shoppers exactly what buying more saves them." },
      { lever: "Upsells that make sense", detail: "The cart only suggests single cans that pair with the 3-pack in the cart, and hides flavours the shopper already has." },
      { lever: "Subscriptions made obvious", detail: "Subscribe-and-save sits right in the buy box with its % off shown, rather than tucked behind a separate widget." },
      { lever: "Faster pages", detail: "A team speed pass — font preloading, lazy-loaded media and a delayed chat widget — I contributed to alongside teammates." },
    ],
    result: "Intervel runs a store built around how its products are actually bought — by flavour, strength, quantity and subscription — and launched a new product with a site-wide waitlist that keeps working even when ad blockers don't cooperate.",
    flow: [{ n: "01", t: "Custom OS 2.0 theme and sections" }, { n: "02", t: "Buy box: flavour, strength, subscribe-and-save" }, { n: "03", t: "Tiered discounts, bundles and cart upsell" }, { n: "04", t: "Waitlist mode with Klaviyo and fallbacks" }, { n: "05", t: "Launch theme run alongside the live store" }],
    specs: [{ k: "Client", v: "Intervel" }, { k: "Surface", v: "Custom Shopify OS 2.0 theme" }, { k: "Role", v: "Theme developer (via NINE15)" }, { k: "Year", v: "Sept 2025 – Oct 2026" }, { k: "Scope", v: "Product page, cart, waitlist, navigation, sections" }]
,
    image: { name: "intervel-pdp", width: 1600, height: 729, alt: "Intervel Sidekick 3-pack product page — flavour picker and Join Waitlist button" },
    videos: [
      { name: "intervel-pdp", width: 1600, height: 728, webm: true, cover: true, caption: "Product lines, the Sidekick 3-pack page in waitlist mode, and the footer" },
    ]
  },
  {
    slug: "slide-ai",
    featured: true,
    tags: ["Apps", "CRO", "Integrations"],
    num: "02", brand: "Slide AI", year: "2025–26",
    kicker: "Shopify app — AI shopping assistant and slide cart",
    url: "https://apps.shopify.com/slide-ai",
    line: "NINE15's own Shopify app: a slide-out cart, an AI shopping assistant trained on the store, product recommendations and quizzes — all in one panel that never takes the shopper off the page.",
    shot: "Slide AI chat answering a shopper with products they can add to cart",
    stack: ["Shopify App", "Admin API", "Storefront API", "Theme app extensions", "AI chat", "Klaviyo", "Loop", "Redo", "GovX ID", "Shop Pay"],
    problem: "NINE15 had spent years building the same cart improvements for client after client — free-shipping bars, quick add, cross-sells, slide carts — on stores like 100 Percent and Criquet. Each one was custom work for a single store. Shoppers also kept leaving to find answers: a question about a product, a policy or an order meant a search, a help page or an email, and many never came back to the cart.",
    build: "Slide packages that playbook into one app any Shopify store can install. As a developer at NINE15 I work on the app alongside the team. The slide cart has a free-shipping bar, upsells, coupon codes, gift notes, a shareable cart and checkout buttons, and works with Loop, Redo, GovX ID and Shop Pay. Slide Chat is an AI assistant trained on the store's products, blog posts, policies and orders, which answers questions and adds products to the cart from the conversation. Recommendations come from an AI engine or the merchant's own picks, matched to what's already in the cart, and quizzes match shoppers to the right product and send their answers to Klaviyo.",
    experience: "Everything opens in the same slide-out panel, so shoppers ask a question, see suggestions and check out without a page reload. The chat answers like a good shop assistant — \"looking for sunglasses\" gets a short reply and products with an add-to-cart button. The cart shows how close the shopper is to free shipping and suggests items that go with what's already in it. Merchants style it to their brand with settings and custom CSS, and it works with any Shopify theme.",
    cro: [
      { lever: "Answers without leaving", detail: "Product, policy and order questions are answered in the panel, so shoppers don't leave the store to find out." },
      { lever: "Bigger carts", detail: "A free-shipping bar and recommendations matched to the cart give shoppers a reason to add one more item." },
      { lever: "Buy from the conversation", detail: "Products suggested in the chat can be added to the cart straight away." },
      { lever: "Quizzes that keep working", detail: "Quiz answers go to Klaviyo, so follow-up emails are based on what each shopper said they wanted." },
    ],
    result: "Cart and conversion work that used to be rebuilt for each client is now one app on the Shopify App Store, which any merchant can install and set up themselves.",
    flow: [{ n: "01", t: "Shopper opens the slide-out panel" }, { n: "02", t: "Asks the AI assistant a question" }, { n: "03", t: "Gets products with add to cart" }, { n: "04", t: "Cart suggests what goes with it" }, { n: "05", t: "Checkout without a page reload" }],
    specs: [{ k: "Type", v: "Shopify app" }, { k: "Company", v: "NINE15" }, { k: "Role", v: "Developer, NINE15 team" }, { k: "Year", v: "2025–26" }, { k: "Scope", v: "Slide cart, AI chat, recommendations, quizzes" }],
    image: { name: "slide-chat", width: 1600, height: 900, alt: "Slide AI chat — a shopper asks for sunglasses and gets photochromic picks with add-to-cart buttons" },
    gallery: [{ name: "slide-cart", width: 1600, height: 900, alt: "Slide cart with free-shipping bar, upsells, gift message and discount code, plus Loop, Redo, GovX and Shop Pay" }]
  },
  {
    slug: "aerospray",
    tags: ["Migrations", "Themes"],
    num: "03", brand: "AeroSpray", year: "2026",
    kicker: "Replit React app → Shopify Horizon migration",
    url: "https://aerospray.com/",
    line: "AeroSpray's site was a hand-coded React app where every copy change needed a developer. I rebuilt it on Shopify Horizon 3.2 with the same look — and now the team edits every page themselves, with their drone catalogue in the same store as the site.",
    shot: "Agricultural spray drone working over crop rows",
    stack: ["Shopify", "Horizon 3.2", "Liquid", "Theme blocks", "JavaScript", "Shopify CLI", "React → Liquid migration"],
    problem: "AeroSpray sells and operates DJI agricultural and enterprise spray drones. Their site was a single-page React app on Replit: it looked right, but every headline, image and FAQ lived in code, so the team couldn't change a word without a developer. The drones were shown through Buy Button embeds from a separate Shopify store — so the site and the catalogue never shared a cart, a menu or search.",
    build: "I rebuilt all five pages — Home, Services, Industries, Process and Contact — on Shopify's newest theme, Horizon, matching the original section by section. Before writing anything new, I checked whether Horizon already had it; only where it didn't did I build custom pieces: 10 sections and 8 blocks, all editable in the theme editor. I moved the 13-drone line-up into native Shopify products with two product templates, rebuilt the header and footer on real Shopify menus with a mega menu, and recreated the site's scroll animation with a small script instead of a library. Then I wrote a handbook so the next developer doesn't need me.",
    experience: "On the surface it's the same AeroSpray — pure black, square corners, the same fonts and the same quiet reveal as you scroll. Underneath, the drones sit in the main menu, show up in search and recommendations, and go through one cart and checkout. For the team, every headline, image, FAQ, stat and menu is a setting in the theme editor, and new sections look right the first time they're added.",
    cro: [
      { lever: "One cart, one checkout", detail: "Drones used to sell through embeds from a second store. Now they're native products, so buyers move from browsing to checkout without crossing between two systems." },
      { lever: "A catalogue people can find", detail: "Both drone lines sit in the header mega menu and appear in search and recommendations automatically." },
      { lever: "Lighter pages", detail: "The React app and animation library are gone; the scroll reveal is a 53-line script, so pages load as a normal Shopify store." },
      { lever: "Changes the same day", detail: "Marketing can test headlines, images and offers in the theme editor instead of waiting for a developer to deploy." },
    ],
    result: "AeroSpray's team now runs the site on their own — copy, images, FAQs, stats and menus — with products, inventory and checkout in one place. Because the custom work sits on top of Horizon instead of replacing it, the store can take future Horizon updates without a rewrite.",
    flow: [{ n: "01", t: "Map every React component to Horizon" }, { n: "02", t: "Reuse Horizon sections first" }, { n: "03", t: "Build 10 sections and 8 blocks" }, { n: "04", t: "Move 13 drones to native products" }, { n: "05", t: "Handbook and handover" }],
    specs: [{ k: "Client", v: "AeroSpray" }, { k: "Surface", v: "Shopify theme (Horizon 3.2)" }, { k: "Role", v: "Shopify developer, migration lead" }, { k: "Year", v: "2026" }, { k: "Scope", v: "5 pages, header, footer, catalogue" }]
,
    image: { name: "aerospray-film", width: 1280, height: 720, widths: [800, 1280], alt: "AeroSpray agricultural drone spraying over crop rows at sunset" },
    videos: [
      // Streamed from AeroSpray's Shopify CDN (16 s, ~10 MB) — short enough to loop whole.
      {
        name: "aerospray-film",
        src: "https://aerospray.com/cdn/shop/videos/c/vp/76e7f3a8c1954f198959a64b559d8bb2/76e7f3a8c1954f198959a64b559d8bb2.HD-720p-4.5Mbps-92049886.mp4?v=0",
        width: 1280, height: 720, cover: true,
        caption: "AeroSpray spray drones working the fields at sunset",
      },
    ]
  },
  {
    slug: "silent-wake-up",
    tags: ["Themes", "CRO"],
    num: "04", brand: "Silent Wake Up", year: "2025–26",
    kicker: "Horizon redesign for a DTC wearable brand",
    url: "https://silentwakeup.com/",
    line: "A move to Shopify's Horizon theme with a new look for Silent Wake Up, a silent wake-up wearable — product pages, a How It Works page built for A/B testing, and a set of sections the team edits themselves.",
    shot: "Product showcase with Add to cart and three steps",
    stack: ["Shopify", "Horizon", "Liquid", "OS 2.0 sections & blocks", "JavaScript", "Klaviyo", "Shopify CLI"],
    problem: "Silent Wake Up sells a wearable that wakes you with vibration instead of an alarm — a product people need explained before they'll buy it. The store was moving onto Shopify's Horizon theme with a new visual identity, and needed product pages and a How It Works page that could carry that explanation, plus sections the team could rearrange and test without a developer.",
    build: "I worked on the move to Horizon across the homepage, product pages, the How It Works page, the blog and the cart, as part of the NINE15 team. I built a library of sections the team edits in the theme editor: tech specs with an \"included in the box\" block, feature cards, three-step cards, an accordion, a text slider, a product showcase, video with text, blog layouts and banners. The How It Works page is built so different layouts can be A/B tested, with a sticky call to action that follows you down the page, and product pages got a second add-to-cart at the bottom.",
    experience: "Shoppers can learn how the wearable works and buy from the same page — images lead straight to the product, the call to action stays in view, and long reviews open fully with a tap instead of filling the screen. On iPhone the cart drawer now works properly, the cart updates as soon as something's added, and the Klaviyo pop-up no longer interrupts mobile visitors on the How It Works page.",
    cro: [
      { lever: "Explain, then sell", detail: "The How It Works page carries a sticky call to action, so a visitor who's convinced can buy without scrolling back up." },
      { lever: "Ready to A/B test", detail: "Its layout is built in swappable sections, so the team can test different versions of the page against each other." },
      { lever: "Every image leads to the product", detail: "Homepage and How It Works images are clickable, turning interest into a product-page visit." },
      { lever: "Fewer mobile interruptions", detail: "The cart drawer works on iPhone Safari, and the pop-up stays out of the way on the page that does the convincing." },
    ],
    result: "Silent Wake Up runs on Horizon with its new identity, and the team builds and tests pages from a set of sections instead of waiting on a developer for each change.",
    flow: [{ n: "01", t: "Move the store onto Horizon" }, { n: "02", t: "New visual identity across key pages" }, { n: "03", t: "Library of editable sections" }, { n: "04", t: "A/B-ready How It Works page" }, { n: "05", t: "Mobile, cart and speed fixes" }],
    specs: [{ k: "Client", v: "Silent Wake Up" }, { k: "Surface", v: "Shopify theme (Horizon)" }, { k: "Role", v: "Theme developer (via NINE15)" }, { k: "Year", v: "Oct 2025 – Jan 2026" }, { k: "Scope", v: "Homepage, product page, How It Works, blog, cart" }]
,
    image: { name: "silent-wake-up", width: 1600, height: 761, alt: "Silent Wake Up homepage — wearable and app product showcase with Add to cart and three steps" },
    videos: [
      { name: "silent-wake-up", width: 1600, height: 762, webm: true, cover: true, caption: "Homepage, product showcase, sleep-science sections, reviews and the product page" },
    ]
  },
  {
    slug: "100-percent",
    featured: true,
    tags: ["Themes", "CRO"],
    num: "05", brand: "100 Percent", year: "2025",
    kicker: "Shopify Plus product page and cart rebuild",
    url: "https://www.100percent.com/",
    line: "A smoother way to shop a big Shopify Plus catalogue: colourways that switch in place, add to cart from anywhere, and a custom cart built to sell the next item.",
    shot: "Rider carrying a pink 100% gravel bike along a rocky ridge",
    stack: ["Shopify Plus", "Liquid", "JavaScript", "Rebuy", "Metaobjects", "Search & Discovery", "Sortwise collection filters"],
    problem: "100 Percent sells each style in several colourways — but in Shopify, every colourway was its own separate product. Shoppers comparing colours had to bounce between pages, quick add on collection pages didn't really work, and the off-the-shelf cart and filters couldn't keep up with how people actually browse the range.",
    build: "I rebuilt the product page from the ground up. Colourways are now linked behind the scenes with metaobjects, so separate products show up as one style and switching colour updates the page instantly instead of loading a new one. I added quick add on collection pages and a sticky add-to-cart bar, and replaced the stock Rebuy cart with a fully custom one. Collection pages got custom filters that work alongside Shopify Search & Discovery, plus promo blocks that sit inside the product grid without breaking sorting.",
    experience: "Changing colour feels like picking a variant — no reload, no losing your place. The buy button follows you down long product pages, you can add straight from the grid, and the cart looks and behaves like part of the site rather than a bolted-on app.",
    cro: [
      { lever: "Fewer page loads before buying", detail: "Colourway switching and quick add keep shoppers on one page instead of sending them away to compare or buy." },
      { lever: "Buy button always in reach", detail: "A sticky add-to-cart bar means nobody scrolls back to the top of a long product page to check out." },
      { lever: "A cart that sells", detail: "The custom cart shows a free-shipping progress bar and relevant cross-sells, nudging order value up without pop-ups." },
      { lever: "Faster browsing", detail: "Better filters and in-grid promo blocks help shoppers narrow a large range quickly." },
    ],
    result: "The range now shops like one connected catalogue instead of a list of separate products — and the team updates collections and the cart without booking developer time for every change.",
    flow: [{ n: "01", t: "Remap product page sections and data" }, { n: "02", t: "Colourways switch in place" }, { n: "03", t: "Quick add and sticky add to cart" }, { n: "04", t: "Custom Rebuy cart" }, { n: "05", t: "Filters and in-grid promo blocks" }],
    specs: [{ k: "Client", v: "100 Percent" }, { k: "Surface", v: "Shopify Plus theme" }, { k: "Role", v: "Sole developer" }, { k: "Year", v: "2025" }, { k: "Scope", v: "Product page, cart, collections, quick add" }],
    image: { name: "100-percent-cover", width: 1600, height: 2000, focus: "52% 32%" }
  },
  {
    slug: "masienda",
    featured: true,
    tags: ["Themes", "CRO"],
    num: "06", brand: "Masienda", year: "2025",
    kicker: "Shopify 1.0 to Horizon retheme",
    url: "https://masienda.com/",
    line: "A full move from an ageing Shopify 1.0 theme to Horizon — every custom feature rebuilt, nothing lost, and a noticeably faster store. Conversion rate rose around 28% afterwards.",
    shot: "Masienda tortillas, frozen quesadillas and masa harina on a yellow tiled counter",
    stack: ["Shopify", "Horizon", "Liquid", "JavaScript", "Rebuy", "Online Store 2.0 sections", "Theme customizer settings"],
    problem: "Masienda's store ran on a Shopify 1.0 theme carrying years of custom work. It felt slow and laggy, and because everything was hard-coded, the team couldn't use any of Shopify's newer features without a rebuild. Moving to Horizon meant rebuilding every custom feature — not just copying files across.",
    build: "I rethemed the whole store onto Horizon and rebuilt each custom feature in Shopify's modern, section-based setup: a sticky add to cart, a quick add made for this catalogue, product-page and cart upsells, and a custom Rebuy cart. I also built a search into the header that finds both products and blog recipes, with its settings in the theme customizer. Anything that used to be one-off code is now a section or setting the team can change themselves.",
    experience: "Pages load quickly and clicks respond straight away — no more lag. The buy button stays in reach, quick add works from the product grid, and upsells appear naturally on the product page and in the cart. One search box covers products and recipes, so shoppers find what they came for faster.",
    cro: [
      { lever: "Speed shoppers can feel", detail: "Leaving the legacy theme removed years of piled-up code, so pages settle faster and taps respond immediately." },
      { lever: "Shorter path to cart", detail: "Quick add from the grid and a sticky add-to-cart bar cut the clicks between finding a product and buying it." },
      { lever: "Bigger orders", detail: "Product-page and cart upsells suggest the next item at the moment someone is already buying." },
      { lever: "Recipes that sell", detail: "Blog readers discover products from the same search box, turning content traffic into shoppers." },
    ],
    result: "Conversion rate rose around 28% after the retheme, with total revenue up alongside it — and the team now edits the store themselves instead of filing developer requests.",
    flow: [{ n: "01", t: "Audit the legacy 1.0 theme" }, { n: "02", t: "Rebuild the structure on Horizon" }, { n: "03", t: "Port every custom feature to sections" }, { n: "04", t: "Sticky add to cart, quick add, header search" }, { n: "05", t: "Rebuy cart and upsells" }],
    specs: [{ k: "Client", v: "Masienda" }, { k: "Surface", v: "Shopify theme (Horizon)" }, { k: "Role", v: "Sole developer" }, { k: "Year", v: "2025" }, { k: "Scope", v: "Retheme, product page, cart, upsells, search" }],
    image: { name: "masienda-products", width: 1600, height: 1033 },
    videos: [
      { name: "masienda-pdp", width: 1280, height: 720, webm: true, cover: true, caption: "Masienda brand film on the masa harina product page" },
    ],
    gallery: [{ name: "masienda-search", width: 1600, height: 795, alt: "Masienda — header search open over the recipes blog, with most popular posts" }],
    mobile: [{ name: "masienda-cart", width: 782, height: 1400, widths: [400, 782], alt: "Masienda — custom Rebuy cart drawer with free-shipping bar and bestsellers" }]
  },
  {
    slug: "criquet-shirts",
    featured: true,
    tags: ["Themes", "CRO"],
    num: "07", brand: "Criquet Shirts", year: "2025",
    kicker: "Product page and collection rebuild — A/B tested",
    url: "https://criquetshirts.com/",
    line: "A rebuilt product page and collection grid for Criquet Shirts: colour swatches across a catalogue where every colour is its own product, quick add inside recommendations, and promo tiles the team places themselves. The new product page won its A/B test against the old one.",
    shot: "Product page with colour swatches and size picker",
    stack: ["Shopify", "Liquid", "JavaScript", "Rebuy", "Vue (Rebuy templates)", "Metafields", "AJAX Cart API"],
    problem: "Criquet sells every shirt colour as its own product, not as a variant — so Shopify's built-in swatches couldn't show \"this shirt in other colours\", and shoppers had to go hunting. The Rebuy recommendation cards had no colour or size choice, and every editorial tile in a collection grid needed a developer to add it.",
    build: "I grouped colours by product type, so every product of the same type shows up as a colour of the same style, with only in-stock colours shown. I then rebuilt the product page and replaced the stock Rebuy widgets with a custom template for \"Pairs Well With\" and \"Recommended Products\": each card gets the same colour swatches, swaps colour in place, and has its own size picker that adds straight to the Smart Cart. On collection pages, I built promo tiles the marketing team controls from collection metafields — up to five per collection, each with its own position, images, copy and layout.",
    experience: "Shoppers see every colour of a shirt right on the product page and can switch between them like variants. Recommendations work like mini product pages: pick a colour, pick a size, add to cart — sold-out sizes are greyed out and the buttons line up across the row. The add-to-cart bar follows you down the page and prompts you to choose a size first.",
    cro: [
      { lever: "Colours shoppers can see", detail: "A variant-style colour picker across separate products means nobody has to search for the same shirt in another colour." },
      { lever: "Recommendations that sell", detail: "Colour and size choice inside each Pairs Well With card turns cross-sells into one-tap adds instead of extra page visits." },
      { lever: "Fewer dead ends", detail: "Only in-stock colours appear, and sold-out sizes are disabled before anyone tries to buy them." },
      { lever: "Proven, not guessed", detail: "The new product page ran as an A/B test against the old one — and won." },
    ],
    // TODO(owner): add the A/B figures (conversion, add-to-cart, AOV, test length) once the client is happy to publish them.
    result: "The new product page beat the old one in a head-to-head A/B test, and the marketing team now places promo tiles in any collection without touching code.",
    flow: [{ n: "01", t: "Group colours by product type" }, { n: "02", t: "Variant-style swatches on the product page" }, { n: "03", t: "Custom Rebuy cards with swatches and size quick add" }, { n: "04", t: "Sticky add to cart and review quotes" }, { n: "05", t: "A/B test against the old product page" }],
    specs: [{ k: "Client", v: "Criquet Shirts" }, { k: "Surface", v: "Shopify theme + Rebuy" }, { k: "Role", v: "Shopify developer (via NINE15)" }, { k: "Year", v: "2025" }, { k: "Scope", v: "Product page, recommendations, collection grid" }]
,
    image: { name: "criquet-pdp", width: 1600, height: 761, alt: "Criquet product page — brrr° Long Sleeve Range Polo with colour swatches and size picker" },
    videos: [
      // Streamed from Criquet's Shopify CDN (HLS). Featured: cover, work card and hover preview.
      {
        name: "criquet-film",
        src: "https://criquetshirts.com/cdn/shop/videos/c/vp/76ee8bef89934e7d9901bfda2a51fb17/76ee8bef89934e7d9901bfda2a51fb17.m3u8?v=0",
        width: 2220, height: 720, cover: true,
        poster: { name: "criquet-film", width: 1600, height: 519 },
        caption: "Criquet brand film from the storefront hero",
      },
      { name: "criquet-pdp", width: 1600, height: 762, webm: true, caption: "Product page walkthrough — colour swatches, Pairs Well With cards and reviews" },
    ],
    mobile: [{ name: "criquet-collection-mobile", width: 394, height: 1094, widths: [394], alt: "Criquet best sellers collection on mobile — colour swatches and quick add on each card" }]
  },
  {
    slug: "iron-displays",
    tags: ["Themes", "Integrations"],
    num: "08", brand: "Iron Displays", year: "2025",
    kicker: "Custom product builder and quoting",
    line: "A step-by-step product builder for custom display units: customers pick their options, upload artwork, and the order lands as a ready-to-quote draft — no more email back-and-forth.",
    shot: "Configurator step 3 — artwork upload",
    stack: ["Shopify", "Liquid", "JavaScript", "Dropbox API", "Draft Orders API", "Line item properties"],
    problem: "Iron Displays makes custom display units that can't be priced until the customer chooses size, finish and mounting, then sends print-ready artwork. Every order started as a long email thread with attachments, and the website could only take a deposit.",
    build: "I built a step-by-step configurator right into the product page. Each step's options come from Shopify metafields, so the team edits choices in the admin, not in code. The customer's choices are saved on the cart item, artwork uploads go straight to the client's Dropbox, and when the item is added to cart a draft order is created automatically, so the team can confirm shipping before sending the invoice.",
    experience: "It feels like part of the product page, not a separate app. Customers see a running summary as they go, mistakes are caught at each step instead of at the end, and a configuration can be shared as a link with a colleague before ordering.",
    cro: [
      { lever: "Order online, any time", detail: "Customers can configure and submit a complex order whenever they're ready, instead of waiting on an email reply to get started." },
      { lever: "Fewer abandoned builds", detail: "Breaking choices into steps, with checks at each one, makes a complicated product feel manageable." },
      { lever: "Easy sign-off", detail: "Buyers who need approval can send their exact configuration to a colleague as a link." },
    ],
    result: "Quotes moved from inbox threads to draft orders the team prices and sends in one place — and they update the configurator options themselves.",
    flow: [{ n: "01", t: "Customer chooses their options" }, { n: "02", t: "Uploads print artwork" }, { n: "03", t: "File saved to Dropbox, linked to the order" }, { n: "04", t: "Configured product goes to cart" }, { n: "05", t: "Draft order created for the team" }],
    specs: [{ k: "Client", v: "Iron Displays" }, { k: "Surface", v: "Theme + app proxy" }, { k: "Role", v: "Sole developer" }, { k: "Year", v: "2025" }, { k: "Scope", v: "Configurator, uploads, draft orders" }],
    image: { name: "iron-displays", width: 1600, height: 790 }
  },
  {
    slug: "graduation-world",
    featured: true,
    tags: ["Migrations"],
    num: "09", brand: "Graduation World", year: "2024",
    kicker: "Magento → Shopify migration",
    line: "A complete move from Magento to Shopify — every product, variant, collection and image carried across intact, and old Google rankings protected with a redirect for every URL.",
    shot: "Migration mapping — before / after",
    stack: ["Shopify", "Admin API", "GraphQL", "Node.js", "Metafields", "Redirects"],
    problem: "Graduation World had a large Magento catalogue full of product details Shopify has no direct match for. A standard CSV import would have lost variant links, custom product details and image order — and broken years of URLs that ranked in Google.",
    build: "Instead of a CSV, I wrote a migration tool that read the catalogue from Magento's API, mapped every custom attribute to a documented set of Shopify metafields, and wrote everything to Shopify in safe, repeatable batches with automatic retries. It reported anything that didn't match, and generated a redirect for every old URL from the same data.",
    experience: "The new storefront reads those metafields directly, so the filters and personalisation options customers relied on in Magento work the same way on Shopify — not a watered-down version.",
    cro: [
      { lever: "No lost search traffic", detail: "Every old URL redirects to its new page, so shoppers arriving from Google still land on the right product." },
      { lever: "Filters people already used", detail: "Attribute-based filtering survived the move, so shoppers can still narrow by the things they care about." },
      { lever: "Complete product pages", detail: "Variants, details and images arrived in the right order — nothing half-migrated for shoppers to trip over." },
    ],
    result: "The whole catalogue, its structure and its search rankings moved across intact — with a repeatable tool for future batches.",
    flow: [{ n: "01", t: "Read the Magento catalogue" }, { n: "02", t: "Map details to Shopify metafields" }, { n: "03", t: "Import in safe batches" }, { n: "04", t: "Check and report any gaps" }, { n: "05", t: "Redirect every old URL" }],
    specs: [{ k: "Client", v: "Graduation World" }, { k: "Surface", v: "Migration + theme" }, { k: "Role", v: "Migration lead" }, { k: "Year", v: "2024" }, { k: "Scope", v: "Catalogue, metafields, redirects" }],
    image: { name: "graduation-world", width: 1600, height: 726 }
  },
  {
    slug: "catalog2cart",
    tags: ["Apps"],
    num: "10", brand: "Catalog2Cart", year: "2024",
    kicker: "Shopify app — shoppable PDF catalogues",
    line: "A Shopify app that turns a printed product catalogue into a shoppable one: tap a product on the page and add it to cart without leaving the catalogue.",
    shot: "PDF page with product hotspots",
    stack: ["Shopify App", "Storefront API", "PDF.js", "Node.js", "App Bridge"],
    problem: "Plenty of wholesale and gifting brands still sell from a PDF catalogue. Customers browse it, then have to search the website for the same product — and many give up somewhere in between.",
    build: "The app displays catalogue pages in the browser and lets the merchant draw clickable hotspots over each product, linked to the right product and variant. On the storefront, each hotspot pulls live price and stock from Shopify and adds to cart right there on the page.",
    experience: "The catalogue still looks and reads like the printed version — page turning, zoom, pinch on mobile. Shopping options only appear when a customer taps a product, so browsing stays pleasant instead of turning into another product grid.",
    cro: [
      { lever: "No search step", detail: "The gap between spotting a product in the catalogue and buying it is a single tap." },
      { lever: "Live price and stock", detail: "Shoppers see what's actually available, so there are no surprises at checkout." },
    ],
    result: "Merchants keep their catalogue as the sales tool it already is — and now it takes orders, without redesigning it as a website.",
    flow: [{ n: "01", t: "Merchant uploads the catalogue PDF" }, { n: "02", t: "Draws hotspots over products" }, { n: "03", t: "Hotspots linked to products" }, { n: "04", t: "Customer taps a product on the page" }, { n: "05", t: "Adds to cart without leaving" }],
    specs: [{ k: "Type", v: "Shopify app" }, { k: "Surface", v: "Admin + storefront viewer" }, { k: "Role", v: "Full stack" }, { k: "Year", v: "2024" }, { k: "Scope", v: "Hotspot editor, viewer, cart" }],
    image: { name: "catalog2cart", width: 1600, height: 900 }
  },
  {
    slug: "almsthre",
    tags: ["Themes", "CRO"],
    num: "11", brand: "Almsthre", year: "2024",
    kicker: "Theme upgrade for a growing catalogue",
    url: "https://almsthre.com/",
    line: "A theme upgrade that made a growing catalogue easier to browse and quicker to buy from: better navigation, quick add, colour swatches and a buy button that's always in reach.",
    shot: "Desktop drawer navigation — open state",
    stack: ["Shopify 2.0", "Liquid", "JSON templates", "Sections & blocks", "Metafields", "Vanilla JS"],
    problem: "Almsthre's catalogue had outgrown its theme. The menu couldn't show all the categories, adding anything to cart from a collection page meant opening each product first, and on mobile the buy button was buried down the product page.",
    build: "I replaced the menu with a desktop drawer the team builds from blocks in the theme editor. Quick add and colour swatches on collection pages share one cart system with the product page, so everything stays in sync. The sticky add-to-cart bar follows whichever option is selected, rather than being a separate copy that can drift out of step.",
    experience: "Everything works even before JavaScript loads — swatches and quick add sit on top of normal links and forms — so collection pages stay fast on slower mobile connections.",
    cro: [
      { lever: "Add to cart from the grid", detail: "Quick add and swatches let shoppers pick a colour and buy without opening every product." },
      { lever: "Buy button on mobile", detail: "A sticky add-to-cart bar keeps the main action visible on small screens." },
      { lever: "Categories you can find", detail: "A drawer menu that shows the full range helps shoppers reach the right collection quickly." },
    ],
    result: "Adding to cart no longer costs a page load, and the team manages their own navigation.",
    flow: [{ n: "01", t: "Audit the theme and mobile speed" }, { n: "02", t: "Drawer menu built from editor blocks" }, { n: "03", t: "One shared cart system" }, { n: "04", t: "Quick add and swatches on collections" }, { n: "05", t: "Sticky add to cart on mobile" }],
    specs: [{ k: "Client", v: "Almsthre" }, { k: "Surface", v: "Theme (Shopify 2.0)" }, { k: "Role", v: "Theme developer" }, { k: "Year", v: "2024" }, { k: "Scope", v: "Navigation, collections, product page, cart" }],
    image: { name: "almsthre-home", width: 1600, height: 761, alt: "Almsthre homepage — category tiles for bar, saddle, frame and top tube bags" },
    videos: [
      // Streamed from Almsthre's Shopify CDN. The film is 2.5 min / 86 MB, so only a 14 s window loops.
      {
        name: "almsthre-film",
        src: "https://almsthre.com/cdn/shop/videos/c/vp/488cda6dee324603abcfa6feb73aced8/488cda6dee324603abcfa6feb73aced8.HD-720p-4.5Mbps-61569706.mp4?v=0",
        clip: [2, 16],
        width: 1440, height: 720, cover: true,
        poster: { name: "almsthre-film", width: 1440, height: 720, widths: [800, 1440] },
        caption: "Almsthre brand film — riders through the city and along the coast",
      },
      { name: "almsthre-field-notes", width: 1600, height: 762, webm: true, caption: "Homepage and Field Notes journal with category filters" },
    ]
  }
];

export const featuredProjects = projects.filter((p) => p.featured);

export const getProject = (slug: string | undefined) => projects.find((p) => p.slug === slug);
