import { proof } from "../../data/site";
import styles from "./ProofStrip.module.css";

export function ProofStrip() {
  return (
    <section className={styles.strip} data-surface="dark" aria-label="At a glance">
      <dl className={styles.grid}>
        {proof.map((p) => (
          <div key={p.caption} className={styles.cell}>
            <dt className={styles.caption}>{p.caption}</dt>
            <dd className={styles.figure}>{p.figure}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
