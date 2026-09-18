import { useEffect, useRef } from "react";
import styles from "./CursorDot.module.css";

/**
 * Desktop-only pointer follower inside `scope`. Grows into a "VIEW" disc over any
 * element marked `data-cursor="view"`. The native cursor stays visible.
 * Callers render it only for a fine hover pointer without reduced motion.
 */
export function CursorDot({ scopeId }: { scopeId: string }) {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const scope = document.getElementById(scopeId);
    if (!dot || !scope) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      dot.style.setProperty("--x", `${x}px`);
      dot.style.setProperty("--y", `${y}px`);
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target instanceof Element ? e.target : null;
      dot.dataset.state = target?.closest('[data-cursor="view"]') ? "view" : "dot";
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onEnter = () => (dot.dataset.visible = "true");
    const onLeave = () => (dot.dataset.visible = "false");

    scope.addEventListener("pointermove", onMove, { passive: true });
    scope.addEventListener("pointerenter", onEnter);
    scope.addEventListener("pointerleave", onLeave);
    return () => {
      scope.removeEventListener("pointermove", onMove);
      scope.removeEventListener("pointerenter", onEnter);
      scope.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [scopeId]);

  return (
    <div ref={dotRef} className={styles.dot} data-visible="false" data-state="dot" aria-hidden="true">
      <span className={styles.disc}>
        <span className={styles.label}>View</span>
      </span>
    </div>
  );
}
