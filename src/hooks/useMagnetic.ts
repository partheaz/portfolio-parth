import { useEffect, useRef } from "react";
import { FINE_POINTER, REDUCED_MOTION } from "./useMediaQuery";

/**
 * Pulls the element toward the pointer while hovered and springs it back on leave.
 * Fine pointer and no reduced motion only.
 */
export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia(FINE_POINTER).matches || window.matchMedia(REDUCED_MOTION).matches) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.3;
      const y = (e.clientY - r.top - r.height / 2) * 0.4;
      el.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
    };
    const onLeave = () => {
      const from = el.style.translate || "0px 0px";
      el.style.translate = "0px 0px";
      el.animate?.([{ translate: from }, { translate: "0px 0px" }], {
        duration: 800,
        easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      });
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.style.translate = "";
    };
  }, []);

  return ref;
}
