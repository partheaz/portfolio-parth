import type { CSSProperties } from "react";

/**
 * Scroll reveal. Mark an element with `data-reveal="text" | "image"`, pass `revealRef`
 * as its ref, and optionally `revealDelay(i)` as its style for a fixed stagger.
 * The hidden state lives in global.css behind `.js` and `prefers-reduced-motion:
 * no-preference`, so without JS or with reduced motion the content is simply there.
 *
 * "text" elements are observed directly. "image" elements are observed through their
 * *parent*: Chromium applies the target's own clip-path when computing intersection,
 * so a fully clipped element would never report as visible.
 * Elements that come into view together are staggered 85ms apart unless they set
 * their own delay.
 */
const pending = new Map<Element, Set<HTMLElement>>();
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        let batch = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          pending.get(entry.target)?.forEach((el) => {
            if (!el.style.getPropertyValue("--reveal-delay")) {
              el.style.setProperty("--reveal-delay", `${Math.min(batch, 5) * 85}ms`);
            }
            batch++;
            el.classList.add("is-revealed");
          });
          pending.delete(entry.target);
          observer?.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
  }
  return observer;
}

export function revealRef(el: HTMLElement | null) {
  if (!el || el.classList.contains("is-revealed")) return;
  const target = el.dataset.reveal === "image" ? el.parentElement : el;
  if (!target || typeof IntersectionObserver === "undefined") {
    el.classList.add("is-revealed");
    return;
  }
  const group = pending.get(target);
  if (group) {
    group.add(el);
  } else {
    pending.set(target, new Set([el]));
    getObserver().observe(target);
  }
}

/** 85ms per sibling, capped so long lists don't lag. */
export const revealDelay = (index: number) =>
  ({ "--reveal-delay": `${Math.min(index, 5) * 85}ms` }) as CSSProperties;
