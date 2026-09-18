export type Variant = { label: string; text: string };

export const defaultStatement =
  "I build the parts of Shopify stores customers never think about — configurators, carts, migrations, apps — and the parts they judge in two seconds.";

export const variants: Variant[] = [
  { label: "Themes", text: "Custom themes and theme architecture — sections, blocks and metafields the merchant can actually edit, on a JavaScript budget that holds on mobile." },
  { label: "Apps", text: "Shopify apps with real backends — Admin and Storefront API, webhooks, App Bridge, and data models that survive catalogue scale." },
  { label: "Integrations", text: "Uploads, fulfillment, payments and third-party APIs wired into the cart and checkout without breaking either one." },
  { label: "Migrations", text: "Legacy platforms moved to Shopify — products, variants, collections, metafields and URL equity intact, through a pipeline instead of a CSV." },
];
