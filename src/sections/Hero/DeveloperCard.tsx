import { useTilt } from "../../hooks/useTilt";
import styles from "./Hero.module.css";

const specs = [
  { k: "Exp", v: "4+ yrs" },
  { k: "Focus", v: "Themes · Apps" },
  { k: "Clients", v: "International" },
  { k: "Status", v: "Available", accent: true },
];

export function DeveloperCard() {
  const cardRef = useTilt<HTMLDivElement>();

  return (
    <aside className={styles.cardCell} aria-label="Developer summary">
      <div ref={cardRef} className={styles.card}>
        <div className={styles.cardHead}>
          <span>Developer</span>
          <span>SKU PP-01</span>
        </div>
        <div className={styles.cardName}>
          <p className={styles.cardTitle}>Parth Pandey</p>
          <p className={styles.cardSub}>Shopify · E-commerce</p>
        </div>
        <dl className={styles.cardSpecs}>
          {specs.map((s) => (
            <div key={s.k} className={styles.cardSpec}>
              <dt>{s.k}</dt>
              <dd data-accent={s.accent || undefined}>{s.v}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.cardCta}>
          <a href="#contact" className={styles.hire}>
            Hire →
          </a>
        </div>
      </div>
    </aside>
  );
}
