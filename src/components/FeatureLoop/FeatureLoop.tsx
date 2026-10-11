import { Suspense, lazy, useEffect, useRef, useState } from "react";
import type { LoopName } from "../../data/projects";
import { prefersReducedMotion } from "../../hooks/useMediaQuery";
import videoStyles from "../VideoSlot/VideoSlot.module.css";
import styles from "./FeatureLoop.module.css";

// Each loop is its own chunk, loaded only by the case study that shows it.
const loops: Record<LoopName, ReturnType<typeof lazy>> = {
  "slide-ai": lazy(() => import("./loops/SlideLoop")),
  criquet: lazy(() => import("./loops/CriquetLoop")),
  masienda: lazy(() => import("./loops/MasiendaLoop")),
  intervel: lazy(() => import("./loops/IntervelLoop")),
  "100-percent": lazy(() => import("./loops/HundredLoop")),
  aerospray: lazy(() => import("./loops/AeroSprayLoop")),
  almsthre: lazy(() => import("./loops/AlmsthreLoop")),
};

type Props = {
  name: LoopName;
  /** What the loop shows — the visible caption and the accessible label. */
  caption: string;
  className?: string;
};

/**
 * A coded animation of a project's feature, rebuilt in HTML/CSS so it stays sharp at any size.
 * Behaves like VideoSlot: plays only while on screen, always offers a pause button (WCAG 2.2.2),
 * and waits for the visitor to press play under reduced motion. The caption and button sit in a
 * bar under the animation, so they never cover it.
 */
export function FeatureLoop({ name, caption, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(() => typeof window !== "undefined" && prefersReducedMotion());
  const Loop = loops[name];
  const playing = inView && !paused;

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure className={[videoStyles.slot, styles.loop, className].filter(Boolean).join(" ")}>
      <div ref={ref} className={styles.stage} data-playing={playing || undefined} role="img" aria-label={caption}>
        <Suspense fallback={null}>
          <Loop />
        </Suspense>
      </div>
      <figcaption className={styles.bar}>
        <span className={styles.caption}>{caption}</span>
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setPaused((p) => !p)}
          aria-label={`${playing ? "Pause" : "Play"} animation: ${caption}`}
        >
          <span aria-hidden="true">{paused ? "▶" : "❚❚"}</span>
          <span aria-hidden="true">{paused ? "Play" : "Pause"}</span>
        </button>
      </figcaption>
    </figure>
  );
}
