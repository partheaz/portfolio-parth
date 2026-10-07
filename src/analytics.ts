import { locale } from "./data/locale";
import { getService } from "./data/services";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sends a GA4 event. A no-op when the tag is blocked or hasn't loaded. */
export function track(event: string, params: Record<string, unknown> = {}) {
  try {
    window.gtag?.("event", event, params);
  } catch {
    /* analytics must never break the page */
  }
}

/** GA4 ecommerce item for a service tier, so services show up in GA's built-in ecommerce reports. */
export function serviceItem(id: string, tier: number) {
  const s = getService(id);
  const t = s?.tiers[tier] ?? s?.tiers[0];
  return s && t ? { item_id: s.id, item_name: s.name, item_variant: t.label, price: t.price, quantity: 1 } : null;
}

export const currency = locale.priceCurrency;

/**
 * One listener for every call to action, so components don't each need tracking code.
 * Records clicks on links into /services and /book, and on email links.
 * (GA4's enhanced measurement already records outbound links and the résumé PDF.)
 */
export function trackCtaClicks() {
  document.addEventListener(
    "click",
    (e) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!(a instanceof HTMLAnchorElement)) return;
      const text = (a.textContent || a.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim().slice(0, 100);
      const from = window.location.pathname;

      if (a.protocol === "mailto:") {
        track("email_click", { link_text: text, page_path: from });
        return;
      }
      if (a.origin !== window.location.origin) return;
      const to = a.pathname;
      if (to === "/services" || to.startsWith("/book")) {
        track("cta_click", { link_text: text, link_url: to, page_path: from });
      }
    },
    { capture: true },
  );
}
