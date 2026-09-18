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

export const alsoShipped = "Dukeshill · ForgetMeNot · Summit Sheets · Frame Fusion · COD payment app";

export const about = {
  quote: "I like taking complicated commerce problems and turning them into interfaces that feel obvious.",
  paragraphs: [
    "Most of my work starts with a merchant process that doesn't fit the platform — a product that needs configuring before it can be priced, a catalogue stuck in Magento, an order flow that lives in someone's inbox. I build the theme code, the app, or the integration that makes it fit.",
    "Four years in, I've spent about equal time in Liquid and in Node. I care about the editor experience as much as the storefront, I'd rather delete script than add it, and I read Core Web Vitals before I read the design file. Outside work: long-distance cycling and far too much attention to keyboards.",
  ],
};

const pad = (n: number) => String(n).padStart(2, "0");

export const sections = [
  { id: "work", label: "Work", count: pad(projects.length) },
  { id: "capabilities", label: "Capabilities", count: pad(capabilities.length) },
  { id: "about", label: "About", count: pad(experience.length) },
  { id: "contact", label: "Contact", count: "01" },
];
