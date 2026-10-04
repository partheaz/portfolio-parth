import { Fragment } from "react";
import styles from "./Marquee.module.css";

const terms = ["Liquid", "Draft Orders", "Storefront API", "Metafields", "Selling Plans", "Webhooks"];

/** Decorative ticker of the platform surfaces I work in; alternate terms are outlined. */
export function Marquee() {
  const run = (
    <div className={styles.run}>
      {terms.map((t, i) => (
        <Fragment key={t}>
          <span data-outline={i % 2 === 1 || undefined}>{t}</span>
          <span className={styles.dot} />
        </Fragment>
      ))}
    </div>
  );
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        {run}
        {run}
      </div>
    </div>
  );
}
