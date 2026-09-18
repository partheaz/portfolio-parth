import { Link } from "react-router-dom";
import type { Project } from "../../data/projects";
import { ImageSlot } from "../../components/ImageSlot/ImageSlot";
import { revealDelay, revealRef } from "../../hooks/useReveal";
import styles from "./Work.module.css";

export function WorkRow({ project: p }: { project: Project }) {
  const [a, b, c, d] = p.stack;

  return (
    <li className={styles.item}>
      <Link to={`/work/${p.slug}`} className={styles.row} data-cursor="view">
        <div className={styles.rowInner}>
          <h3 className={styles.title} data-reveal="text" ref={revealRef} style={revealDelay(0)}>
            <span className={styles.num}>{p.num}</span>
            <span className={styles.brand}>{p.brand}</span>
          </h3>
          <div className={styles.text} data-reveal="text" ref={revealRef} style={revealDelay(1)}>
            <p className={styles.line}>{p.line}</p>
            <p className={styles.stack}>
              {[a, b, c].filter(Boolean).join(" · ")}
              {d && <span className={styles.fourth}> · {d}</span>}
              {"  /  "}
              {p.year}
            </p>
            <span className={styles.cta}>View case study →</span>
          </div>
          <ImageSlot
            image={p.image}
            caption={p.shot}
            alt={`${p.brand} — ${p.shot}`}
            className={styles.shot}
            hoverImage={p.gallery?.[0]}
            sizes="(min-width: 900px) 50vw, 100vw"
          />
        </div>
      </Link>
    </li>
  );
}
