import { CurtainLink } from "../../components/CurtainLink/CurtainLink";
import { projects } from "../../data/projects";
import { ImageSlot } from "../../components/ImageSlot/ImageSlot";
import styles from "./Hero.module.css";

/** Mobile only: peeking, snap-scrolling strip of the six case studies. */
export function HeroCarousel() {
  return (
    <ul className={styles.carousel} aria-label="Selected work">
      {projects.map((p) => (
        <li key={p.slug} className={styles.slide}>
          <CurtainLink to={`/work/${p.slug}`} curtainLabel={p.brand} className={styles.slideLink}>
            <ImageSlot
              image={p.image}
              caption={p.shot}
              alt={`${p.brand} — ${p.shot}`}
              className={styles.slideImage}
              sizes="62vw"
              reveal={false}
            />
            <span className={styles.slideMeta}>
              <span className={styles.slideNum}>{p.num}</span>
              <span className={styles.slideBrand}>{p.brand}</span>
            </span>
          </CurtainLink>
        </li>
      ))}
    </ul>
  );
}
