import { experience } from "../../data/experience";
import styles from "./About.module.css";

export function ExperienceTable() {
  return (
    <ol className={styles.table} aria-label="Experience">
      {experience.map((job) => (
        <li key={job.company} className={styles.job}>
          <div>
            <p className={styles.company}>{job.company}</p>
            <p className={styles.role}>{job.role}</p>
          </div>
          <p className={styles.years}>{job.years}</p>
        </li>
      ))}
    </ol>
  );
}
