import { experience } from "./experience";
import { projects } from "./projects";
import { capabilities } from "./capabilities";

export const site = {
  name: "Parth Pandey",
  role: "Shopify Developer",
  description:
    "Parth Pandey — Shopify Developer. Custom themes, Shopify apps, platform migrations and commerce integrations for international brands.",
  email: "parthpandey678@gmail.com",
  linkedin: "https://www.linkedin.com/in/parth-pandey-852a42192/",
  github: "https://github.com/partheaz/",
  resume: "/resume-parth.pdf",
  /**
   * Calendly scheduling link (public, not a secret), e.g. "https://calendly.com/you/30min".
   * Set availability to Asia/Kathmandu in Calendly. Empty: /book falls back to the email request form.
   */
  calendly: "https://calendly.com/parthpandey678/30min",
};

export const mailto = (subject?: string) =>
  `mailto:${site.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

export const proof = [
  { figure: "4+", caption: "Years Shopify & e-commerce" },
  { figure: "30+", caption: "Store customizations" },
  { figure: "15+", caption: "E-commerce projects" },
  { figure: "04", caption: "Custom Shopify apps" },
  { figure: "UK · US · IN", caption: "Client regions" },
];

/** Smaller builds listed under the case studies. `url` links to the live store. */
export const alsoShipped: { name: string; url?: string }[] = [
  { name: "Circle 71", url: "https://circle71usa.com/" },
  { name: "DukesHill", url: "https://www.dukeshill.co.uk/" },
  { name: "Summit Sheets", url: "https://summitsheetsbedding.com/" },
  { name: "King Henry's", url: "https://kinghenrys.com/" },
  { name: "Alexander Bie & Co.", url: "https://alexanderbie.com/" },
  { name: "Mutant", url: "https://madebymutant.com/" },
  { name: "Prime Wagyu Farm", url: "https://www.primewagyufarm.com/" },
];

/** About → "Off the clock". */
export const offTheClock = [
  { what: "Watching football", note: "Every match, every week. My calendar has a fixture list baked in." },
  { what: "Talking football", note: "Tactics, transfers and refereeing decisions — usually unprompted, always with conviction." },
  { what: "Playing football", note: "My first touch gets less QA than my code. I'm working on it." },
  { what: "FIFA", note: "Where my tactics are bold and my transfer budget is never fixed-scope." },
  { what: "Long drives with my wife", note: "The one roadmap I'm happy to let someone else plan." },
];

export const about = {
  quote: "If your store has a problem that doesn't fit a template, that's usually where I come in.",
  paragraphs: [
    "Most projects I take on start with something Shopify doesn't do out of the box: a product that has to be configured before it can be priced, a catalogue stuck on Magento, an order process living in someone's inbox. I build the theme feature, the app or the integration that makes it fit — and I explain the trade-offs in plain English along the way.",
    "Four years in, I keep two people in mind on every build: your shopper, who should find it easy to buy, and your team, who should be able to change the store without waiting on a developer. I'd rather remove code than add it, and I check page speed before I check the design file.",
  ],
};

const pad = (n: number) => String(n).padStart(2, "0");

export const sections = [
  { id: "work", label: "Work", count: pad(projects.length) },
  { id: "capabilities", label: "Capabilities", count: pad(capabilities.length) },
  { id: "about", label: "About", count: pad(experience.length) },
  { id: "contact", label: "Contact", count: "01" },
];
