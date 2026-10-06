import { useEffect, useMemo } from "react";
import { locale } from "../../data/locale";
import { site } from "../../data/site";
import type { CartLine } from "../../state/useCart";
import styles from "./Book.module.css";

const COLORS = {
  dark: { background_color: "1B1C1A", text_color: "EEE9E0", primary_color: "C6F24D" },
  light: { background_color: "F7F3EC", text_color: "1B1D20", primary_color: "C4401A" },
};

/**
 * Calendly's inline embed as a plain iframe — no widget script. Calendly shows
 * slots in the visitor's own timezone; Parth's availability is set to
 * Asia/Kathmandu in the Calendly account, so no time math happens here.
 */
export function CalendlyEmbed({ lines, onScheduled }: { lines: CartLine[]; onScheduled: () => void }) {
  const src = useMemo(() => {
    const url = new URL(site.calendly);
    const theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    url.searchParams.set("embed_domain", window.location.host);
    url.searchParams.set("embed_type", "Inline");
    url.searchParams.set("hide_gdpr_banner", "1");
    for (const [k, v] of Object.entries(COLORS[theme])) url.searchParams.set(k, v);
    // Prefills the event's first custom question, if it has one.
    const services = lines.filter((l) => l.id).map((l) => `${l.name} (${l.detail})`);
    if (services.length) url.searchParams.set("a1", `Interested in: ${services.join(", ")}`);
    return url.toString();
    // Built once: changing the src would reset a booking in progress.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin === "https://calendly.com" && e.data?.event === "calendly.event_scheduled") onScheduled();
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onScheduled]);

  return (
    <section className={styles.slot} aria-labelledby="slot-title">
      <h2 id="slot-title" className={styles.legend}>
        <span className={styles.legendNum}>01</span>
        <span>Pick a slot</span>
        <span className={styles.legendMeta}>30 min · your time zone</span>
      </h2>
      <iframe className={styles.calendly} src={src} title="Book a 30-minute call with Parth on Calendly" />
      <p className={styles.fine}>
        Based in {locale.city}, {locale.country} ({locale.tzLabel}). Calendly converts every slot to your local time
        and sends the invite.
      </p>
    </section>
  );
}
