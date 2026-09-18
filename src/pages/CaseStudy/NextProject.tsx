import { Link } from "react-router-dom";
import type { Project } from "../../data/projects";
import styles from "./CaseStudy.module.css";

export function NextProject({ project }: { project: Project }) {
  return (
    <nav className={styles.next} aria-label="Next project">
      <Link to={`/work/${project.slug}`} className={styles.nextLink}>
        <span>
          <span className={styles.nextLabel}>Next project</span>
          <span className={styles.nextBrand}>{project.brand}</span>
        </span>
        <span className={styles.nextArrow} aria-hidden="true">
          →
        </span>
      </Link>
    </nav>
  );
}
