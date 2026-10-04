import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../../hooks/useMediaQuery";

/**
 * Counts from 0 to `value` once the number scrolls into view (ease-out, 1.6s).
 * The final value is rendered up front, so no-JS and reduced motion just see it.
 */
export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || typeof IntersectionObserver === "undefined") return;
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (now: number) => {
          const k = Math.min(1, (now - t0) / 1600);
          el.textContent = String(Math.round(value * (1 - Math.pow(1 - k, 4))));
          if (k < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = String(value);
    };
  }, [value]);

  return <span ref={ref}>{value}</span>;
}
