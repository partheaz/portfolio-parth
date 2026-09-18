import type { ReactNode } from "react";
import styles from "./CaseStudy.module.css";

type Props = { id: string; num: string; title: string; children: ReactNode };

export function NarrativeSection({ id, num, title, children }: Props) {
  const headingId = `case-${id}`;
  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <h2 id={headingId} className={styles.sectionHead}>
        <span className={styles.num}>{num}</span>
        <span>{title}</span>
      </h2>
      {children}
    </section>
  );
}
