import styles from "./SectionHeader.module.css";

type Props = {
  /** Used for the section's aria-labelledby. */
  id: string;
  label: string;
  meta: string;
};

export function SectionHeader({ id, label, meta }: Props) {
  return (
    <div className={styles.header}>
      <h2 id={id} className={styles.label}>
        {label}
      </h2>
      <span className={styles.meta}>{meta}</span>
    </div>
  );
}
