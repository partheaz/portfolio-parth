import type { Project } from "../../data/projects";
import { mailto } from "../../data/site";
import { DESKTOP, useMediaQuery } from "../../hooks/useMediaQuery";
import styles from "./CaseStudy.module.css";

function SpecRows({ specs }: { specs: Project["specs"] }) {
  return (
    <dl className={styles.specRows}>
      {specs.map((s) => (
        <div key={s.k} className={styles.specRow}>
          <dt>{s.k}</dt>
          <dd>{s.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** The PDP "buy box": sticky card on desktop, collapsed accordion above the narrative on mobile. */
export function SpecRail({ project }: { project: Project }) {
  const isDesktop = useMediaQuery(DESKTOP);
  const discuss = (
    <a className={styles.discuss} href={mailto(`Discuss a build — ${project.brand}`)}>
      Discuss a build →
    </a>
  );

  if (isDesktop) {
    return (
      <aside className={styles.rail} aria-label="Project specs">
        <div className={styles.card}>
          <p className={styles.cardHead}>Project specs</p>
          <div className={styles.cardRows}>
            <SpecRows specs={project.specs} />
          </div>
          <div className={styles.cardCta}>{discuss}</div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={styles.rail} aria-label="Project specs">
      <details className={`${styles.card} ${styles.accordion}`}>
        <summary className={styles.summary}>
          <span>Project specs</span>
          <span className={styles.indicator} aria-hidden="true" />
        </summary>
        <div className={styles.cardRows}>
          <SpecRows specs={project.specs} />
        </div>
      </details>
      <div className={styles.mobileCta}>{discuss}</div>
    </aside>
  );
}
