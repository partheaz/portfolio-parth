import type { Project } from "../../data/projects";
import { CurtainLink } from "../../components/CurtainLink/CurtainLink";
import { ImageSlot } from "../../components/ImageSlot/ImageSlot";
import { VideoSlot } from "../../components/VideoSlot/VideoSlot";
import { revealRef } from "../../hooks/useReveal";
import styles from "./Work.module.css";

/**
 * Mobile: 4:3 shot, title, text — the whole block is the tap target.
 * Desktop: title line, then description / stack / CTA on one row; the shot moves
 * into the pointer-following preview (PointerFollower reads `data-preview`).
 */
export function WorkRow({ project: p, index }: { project: Project; index: number }) {
  const [a, b, c, d] = p.stack;

  return (
    <li className={styles.item} data-reveal="text" ref={revealRef}>
      <CurtainLink
        to={`/work/${p.slug}`}
        curtainLabel={p.brand}
        className={styles.row}
        data-cursor="view"
        data-preview={index}
      >
        <div className={styles.rowInner}>
          <h3 className={styles.title}>
            <span className={styles.num}>{p.num}</span>
            <span className={styles.brand}>{p.brand}</span>
          </h3>
          <div className={styles.text}>
            <p className={styles.line}>{p.line}</p>
            <p className={styles.stack}>
              {[a, b, c].filter(Boolean).join(" · ")}
              {d && <span className={styles.fourth}> · {d}</span>}
              {"  /  "}
              {p.year}
            </p>
            <span className={styles.cta}>View case study →</span>
          </div>
          {p.videos?.[0] ? (
            <VideoSlot video={p.videos[0]} fallbackPoster={p.image} className={styles.shot} controls={false} />
          ) : (
            <ImageSlot
              image={p.image}
              caption={p.shot}
              alt={`${p.brand} — ${p.shot}`}
              className={styles.shot}
              sizes="100vw"
            />
          )}
        </div>
      </CurtainLink>
    </li>
  );
}
