import { availability, bandPrices } from "../../data/services";
import { CurtainLink } from "../../components/CurtainLink/CurtainLink";
import { useMagnetic } from "../../hooks/useMagnetic";
import { revealRef } from "../../hooks/useReveal";
import styles from "./ServicesBand.module.css";

/** Accent band between About and Contact that points freelance visitors at /services. */
export function ServicesBand() {
  const magnetRef = useMagnetic<HTMLSpanElement>();

  return (
    <section className={styles.band} data-surface="dark" aria-labelledby="band-title">
      <div className={styles.left}>
        <p className={styles.kicker}>{availability.booking}</p>
        <h2 id="band-title" className={styles.title} data-reveal="text" ref={revealRef}>
          Buy a build the way your customers buy from you.
        </h2>
        <p className={styles.intro}>
          Six fixed-scope services with clear starting prices. Pick what fits, book a free 30-minute call, and you'll
          get a fixed quote — so you know the cost before any work starts.
        </p>
        <span ref={magnetRef} className={styles.magnet}>
          <CurtainLink to="/services" curtainLabel="Services" className={styles.cta}>
            Browse services →
          </CurtainLink>
        </span>
      </div>
      <ul className={styles.prices} aria-label="Starting prices">
        {bandPrices.map((p) => (
          <li key={p.name} className={styles.price}>
            <span>{p.name}</span>
            <span>{p.from}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
