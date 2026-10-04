import { featuredProjects, projects } from "../../data/projects";
import { SectionHeader } from "../../components/SectionHeader/SectionHeader";
import { CurtainLink } from "../../components/CurtainLink/CurtainLink";
import { WorkRow } from "./WorkRow";
import styles from "./Work.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/** Homepage: a short list of featured projects; the full list lives on /work. */
export function Work() {
  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <SectionHeader
        id="work-title"
        label="Featured work"
        meta={`${pad(featuredProjects.length)} of ${pad(projects.length)}`}
      />
      <ol className={styles.list}>
        {featuredProjects.map((p) => (
          <WorkRow key={p.slug} project={p} index={projects.indexOf(p)} />
        ))}
      </ol>
      <CurtainLink to="/work" curtainLabel="All work" className={styles.all}>
        <span>
          <span className={styles.allLabel}>Themes · Apps · Migrations · CRO</span>
          <span className={styles.allTitle}>See all projects</span>
        </span>
        <span className={styles.allArrow} aria-hidden="true">
          →
        </span>
      </CurtainLink>
    </section>
  );
}
