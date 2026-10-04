export type Capability = { num: string; title: string; items: string[] };

export const capabilities: Capability[] = [
  { num: "01", title: "Theme engineering", items: ["Liquid · Shopify 2.0", "JSON templates", "Sections & blocks", "Metafields & metaobjects", "Editor-first authoring"] },
  { num: "02", title: "Commerce logic", items: ["Cart & line item properties", "Checkout & selling plans", "Subscriptions", "Draft orders", "Product configuration"] },
  { num: "03", title: "Shopify apps", items: ["Admin API · GraphQL & REST", "Storefront API", "App Bridge & app proxies", "Webhooks & reconciliation", "Node.js · MySQL"] },
  { num: "04", title: "Integrations", items: ["Third-party APIs", "Payments & COD flows", "Fulfillment & tracking", "File uploads (Dropbox)", "Analytics & events"] },
  { num: "05", title: "Performance & CRO", items: ["Core Web Vitals & page speed", "Conversion audits & funnel review", "Product page & cart optimisation", "Upsells, cross-sells & free-shipping bars", "Theme cleanup & JS budget"] },
  { num: "06", title: "Frontend", items: ["JavaScript · TypeScript", "React · Next.js", "Modern CSS · Tailwind", "Figma implementation", "Accessibility"] },
];
