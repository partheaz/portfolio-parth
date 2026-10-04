import { CurtainLink } from "../../components/CurtainLink/CurtainLink";
import type { Project } from "../../data/projects";
import styles from "./CaseStudy.module.css";

export function NextProject({ project }: { project: Project }) {
  return (
    <nav className={styles.next} aria-label="Next project">
      <CurtainLink to={`/work/${project.slug}`} curtainLabel={project.brand} className={styles.nextLink}>
        <span>
          <span className={styles.nextLabel}>Next project</span>
          <span className={styles.nextBrand}>{project.brand}</span>
        </span>
        <span className={styles.nextArrow} aria-hidden="true">
          →
        </span>
      </CurtainLink>
    </nav>
  );
}
