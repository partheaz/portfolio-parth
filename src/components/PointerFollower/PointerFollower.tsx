import { useEffect, useRef, useState, type CSSProperties } from "react";
import { projects } from "../../data/projects";
import { ImageSlot } from "../ImageSlot/ImageSlot";
import { LoopClip } from "../VideoSlot/VideoSlot";
import styles from "./PointerFollower.module.css";

/** One tone per project, behind the preview shot. */
const TONES = [
  "oklch(0.48 0.17 268)",
  "oklch(0.52 0.15 35)",
  "oklch(0.5 0.12 160)",
  "oklch(0.5 0.16 340)",
  "oklch(0.55 0.12 80)",
  "oklch(0.5 0.12 220)",
  "oklch(0.46 0.1 120)",
  "oklch(0.42 0.04 250)",
  "oklch(0.5 0.14 15)",
  "oklch(0.48 0.09 300)",
];

const PREVIEW_W = 340;
const PREVIEW_H = 256;

/**
 * Desktop pointer layer (fine pointer, no reduced motion — the caller decides):
 * - an accent dot that trails the pointer and swells into a "View" disc over
 *   anything marked `data-cursor="view"`;
 * - a floating, velocity-tilted preview of the hovered work row
 *   (rows carry `data-preview="<index>"`).
 * The native cursor stays visible. One rAF loop, paused once everything settles.
 */
export function PointerFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const preview = previewRef.current;
    if (!dot || !preview) return;

    const w = window.innerWidth / 2;
    const h = window.innerHeight / 2;
    const p = { mx: w, my: h, cx: w, cy: h, px: w, py: h, rot: 0, size: 10, ps: 0.6, po: 0 };
    let view = false;
    let showPreview = false;
    let seen = false;
    let frame = 0;
    let current = -1;

    const tick = () => {
      p.cx += (p.mx - p.cx) * 0.22;
      p.cy += (p.my - p.cy) * 0.22;
      const lastX = p.px;
      p.px += (p.mx - p.px) * 0.1;
      p.py += (p.my - p.py) * 0.1;
      p.rot += (Math.max(-10, Math.min(10, (p.px - lastX) * 0.5)) - p.rot) * 0.12;
      p.size += ((view ? 84 : 10) - p.size) * 0.18;
      p.ps += ((showPreview ? 1 : 0.6) - p.ps) * 0.14;
      p.po += ((showPreview ? 1 : 0) - p.po) * 0.16;

      dot.style.transform = `translate3d(${p.cx - p.size / 2}px, ${p.cy - p.size / 2}px, 0)`;
      dot.style.width = dot.style.height = `${p.size}px`;
      preview.style.transform = `translate3d(${p.px - PREVIEW_W / 2}px, ${p.py - PREVIEW_H / 2}px, 0) rotate(${p.rot.toFixed(2)}deg) scale(${p.ps.toFixed(3)})`;
      preview.style.opacity = p.po.toFixed(3);

      const settled =
        Math.abs(p.mx - p.px) < 0.3 &&
        Math.abs(p.my - p.py) < 0.3 &&
        Math.abs(p.rot) < 0.01 &&
        Math.abs((view ? 84 : 10) - p.size) < 0.1 &&
        Math.abs((showPreview ? 1 : 0) - p.po) < 0.002;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      p.mx = e.clientX;
      p.my = e.clientY;
      if (!seen) {
        // Start on the pointer instead of sweeping in from the centre.
        seen = true;
        p.cx = p.px = p.mx;
        p.cy = p.py = p.my;
        dot.dataset.visible = "true";
      }
      const target = e.target instanceof Element ? e.target : null;
      view = !!target?.closest('[data-cursor="view"]');
      dot.dataset.view = String(view);
      const row = target?.closest<HTMLElement>("[data-preview]");
      const index = row ? Number(row.dataset.preview) : -1;
      showPreview = index >= 0;
      if (index !== current && index >= 0) {
        current = index;
        setActive(index);
        setArmed(true);
      }
      wake();
    };
    const onOut = (e: MouseEvent) => {
      if (e.relatedTarget) return;
      dot.dataset.visible = "false";
      view = showPreview = false;
      wake();
    };
    const onOver = () => {
      if (seen) dot.dataset.visible = "true";
    };
    // Leaving a row via scroll (no mousemove) shouldn't strand the preview.
    const onScroll = () => {
      if (!showPreview) return;
      const el = document.elementFromPoint(p.mx, p.my);
      if (!el?.closest("[data-preview]")) {
        showPreview = false;
        view = !!el?.closest('[data-cursor="view"]');
        dot.dataset.view = String(view);
        wake();
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseover", onOver);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div
        ref={previewRef}
        className={styles.preview}
        style={{ "--tone": TONES[Math.max(0, active) % TONES.length] } as CSSProperties}
        aria-hidden="true"
      >
        {/* Shots mount on first hover so the home page doesn't fetch them up front. */}
        {armed &&
          projects.map((p, i) => (
            <div key={p.slug} className={styles.shot} data-active={i === active}>
              {p.image && <ImageSlot image={p.image} caption="" alt="" className={styles.image} sizes="340px" reveal={false} />}
              {/* A project's first clip plays over its still while that row is hovered. */}
              {p.videos?.[0] && i === active && <LoopClip video={p.videos[0]} className={styles.clip} />}
            </div>
          ))}
        <span className={styles.stripes} />
        {active >= 0 && (
          <>
            <span className={styles.num}>{projects[active].num}</span>
            <span className={styles.brand}>{projects[active].brand}</span>
            <span className={styles.caption}>{projects[active].shot}</span>
          </>
        )}
      </div>
      <div ref={dotRef} className={styles.dot} data-visible="false" data-view="false" aria-hidden="true">
        <span className={styles.label}>View</span>
      </div>
    </>
  );
}
