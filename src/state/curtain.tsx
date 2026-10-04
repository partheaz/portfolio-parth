import { useCallback, useMemo, useRef, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { prefersReducedMotion } from "../hooks/useMediaQuery";
import { CurtainContext, type Go } from "./useCurtain";
import styles from "./Curtain.module.css";

const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";

/**
 * Page transition: a charcoal curtain carrying the destination's name rises over the
 * page, the route swaps underneath, then it lifts away. Falls back to a plain
 * navigation under reduced motion or without the Web Animations API.
 */
export function CurtainProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const curtainRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const busy = useRef(false);

  const go = useCallback<Go>(
    (to, label, options) => {
      const curtain = curtainRef.current;
      if (!curtain || typeof curtain.animate !== "function" || prefersReducedMotion()) {
        navigate(to, options);
        return;
      }
      if (busy.current) return;
      busy.current = true;
      if (labelRef.current) labelRef.current.textContent = label ?? "Parth Pandey";

      curtain
        .animate([{ transform: "translateY(100%)" }, { transform: "translateY(0%)" }], { duration: 520, easing: EASE, fill: "forwards" })
        .finished.then(() => {
          navigate(to, options);
          window.setTimeout(() => {
            curtain
              .animate([{ transform: "translateY(0%)" }, { transform: "translateY(-100%)" }], { duration: 620, easing: EASE, fill: "forwards" })
              .finished.then(() => {
                curtain.getAnimations().forEach((a) => a.cancel());
                busy.current = false;
              });
          }, 120);
        })
        .catch(() => {
          busy.current = false;
          navigate(to, options);
        });
    },
    [navigate],
  );

  const value = useMemo(() => go, [go]);

  return (
    <CurtainContext.Provider value={value}>
      {children}
      <div ref={curtainRef} className={styles.curtain} aria-hidden="true">
        <span ref={labelRef} className={styles.label} />
      </div>
    </CurtainContext.Provider>
  );
}
