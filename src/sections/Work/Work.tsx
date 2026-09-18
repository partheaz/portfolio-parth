import { alsoShipped } from "../../data/site";
import { projects } from "../../data/projects";
import { SectionHeader } from "../../components/SectionHeader/SectionHeader";
import { CursorDot } from "../../components/CursorDot/CursorDot";
import { FINE_POINTER, REDUCED_MOTION, useMediaQuery } from "../../hooks/useMediaQuery";
import { WorkRow } from "./WorkRow";
import styles from "./Work.module.css";

export function Work() {
  const finePointer = useMediaQuery(FINE_POINTER);
  const reducedMotion = useMediaQuery(REDUCED_MOTION);

  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <SectionHeader id="work-title" label="Selected work" meta={`${String(projects.length).padStart(2, "0")} of 15+`} />
      <ol className={styles.list}>
        {projects.map((p) => (
          <WorkRow key={p.slug} project={p} />
        ))}
      </ol>
      <p className={styles.also}>
        <span className={styles.alsoLabel}>Also shipped —</span>
        <span className={styles.alsoList}>{alsoShipped}</span>
      </p>
      {finePointer && !reducedMotion && <CursorDot scopeId="work" />}
    </section>
  );
}
