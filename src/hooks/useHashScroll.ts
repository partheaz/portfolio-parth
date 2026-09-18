import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { prefersReducedMotion } from "./useMediaQuery";

/**
 * Route-level scroll handling: `/#work` scrolls to the section (also when arriving
 * from a case-study page, where the target mounts a frame or two later); any other
 * navigation starts at the top.
 */
export function useHashScroll() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }
    let frame = 0;
    let tries = 0;
    const seek = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
      } else if (tries++ < 30) {
        frame = requestAnimationFrame(seek);
      }
    };
    frame = requestAnimationFrame(seek);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);
}
