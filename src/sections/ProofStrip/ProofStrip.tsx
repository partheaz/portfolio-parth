import { proof } from "../../data/site";
import { CountUp } from "./CountUp";
import styles from "./ProofStrip.module.css";

/** "30+" counts up; "04" and "UK · US · IN" are shown as written. */
function Figure({ figure }: { figure: string }) {
  const m = figure.match(/^([1-9]\d*)(\D*)$/);
  if (!m) return <>{figure}</>;
  return (
    <>
      <CountUp value={Number(m[1])} />
      {m[2]}
    </>
  );
}

export function ProofStrip() {
  return (
    <section className={styles.strip} data-surface="dark" aria-label="At a glance">
      <dl className={styles.grid}>
        {proof.map((p) => (
          <div key={p.caption} className={styles.cell}>
            <dt className={styles.caption}>{p.caption}</dt>
            <dd className={styles.figure}>
              <Figure figure={p.figure} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
