import { capabilities } from "../../data/capabilities";
import { SectionHeader } from "../../components/SectionHeader/SectionHeader";
import { revealDelay, revealRef } from "../../hooks/useReveal";
import styles from "./Capabilities.module.css";

export function Capabilities() {
  return (
    <section id="capabilities" className={styles.section} aria-labelledby="capabilities-title">
      <SectionHeader id="capabilities-title" label="Capability map" meta={String(capabilities.length).padStart(2, "0")} />
      <div className={styles.grid}>
        {capabilities.map((cap, i) => (
          <div key={cap.num} className={styles.block}>
            <div data-reveal="text" ref={revealRef} style={revealDelay(i % 3)}>
              <span className={styles.num}>{cap.num}</span>
              <h3 className={styles.title}>{cap.title}</h3>
              <ul className={styles.items}>
                {cap.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
