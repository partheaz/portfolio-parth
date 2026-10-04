export type Variant = { label: string; text: string };

export const defaultStatement =
  "I help Shopify brands turn more visitors into buyers — by fixing what gets between a shopper and checkout, and building the custom features off-the-shelf apps can't handle.";

export const variants: Variant[] = [
  { label: "Themes", text: "A theme your team can actually run: every section editable in the customizer, no developer needed for everyday changes, and pages that stay fast on a phone." },
  { label: "Apps", text: "When nothing in the App Store fits, I build a custom Shopify app that does — with its own backend, made around your catalogue and the way your team works." },
  { label: "Integrations", text: "Uploads, fulfilment, payments and third-party tools connected to your cart and checkout, so orders flow through without anyone copying data by hand." },
  { label: "Migrations", text: "Moving from Magento or WooCommerce? Your products, variants, collections and Google rankings come across intact — through a proper pipeline, not a CSV that loses half the data." },
  { label: "CRO", text: "Conversion work grounded in how your customers really shop: I find where people drop off between product page and checkout, then fix it in the theme — faster pages, clearer product pages, carts that upsell without nagging." },
];
