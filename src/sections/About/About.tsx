import { about } from "../../data/site";
import { portrait } from "../../data/images";
import { ImageSlot } from "../../components/ImageSlot/ImageSlot";
import { SectionHeader } from "../../components/SectionHeader/SectionHeader";
import { revealRef } from "../../hooks/useReveal";
import { ExperienceTable } from "./ExperienceTable";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <SectionHeader id="about-title" label="About" meta="Ahmedabad, IN" />
      <div className={styles.grid}>
        <div className={styles.portraitCell}>
          <ImageSlot
            image={portrait}
            caption="Portrait — 4:5"
            alt="Parth Pandey"
            className={styles.portrait}
            position="50% 40%"
            sizes="(min-width: 900px) 420px, 100vw"
          />
        </div>
        <div className={styles.text}>
          <p className={styles.quote} data-reveal="text" ref={revealRef}>
            {about.quote}
          </p>
          <div data-reveal="text" ref={revealRef}>
            {about.paragraphs.map((para) => (
              <p key={para.slice(0, 24)} className={styles.body}>
                {para}
              </p>
            ))}
          </div>
          <ExperienceTable />
        </div>
      </div>
    </section>
  );
}
