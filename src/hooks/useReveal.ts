import type { CSSProperties } from "react";

/**
 * Scroll reveal. Mark an element with `data-reveal="text" | "image"`, pass `revealRef`
 * as its ref, and optionally `revealDelay(i)` as its style for sibling stagger.
 * The hidden state lives in global.css behind `.js` and `prefers-reduced-motion:
 * no-preference`, so without JS or with reduced motion the content is simply there.
 *
 * The observer watches each element's *parent*: Chromium applies the target's own
 * clip-path when computing intersection, so a fully clipped element would never
 * report as visible. Reveal elements must therefore not be nested.
 */
const pending = new Map<Element, Set<Element>>();
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          pending.get(entry.target)?.forEach((el) => el.classList.add("is-revealed"));
          pending.delete(entry.target);
          observer?.unobserve(entry.target);
        }
      },
      // Fires once the top of the parent is 15% of the viewport above the fold.
      { rootMargin: "0px 0px -15% 0px" },
    );
  }
  return observer;
}

export function revealRef(el: Element | null) {
  if (!el || el.classList.contains("is-revealed")) return;
  const parent = el.parentElement;
  if (!parent || typeof IntersectionObserver === "undefined") {
    el.classList.add("is-revealed");
    return;
  }
  const group = pending.get(parent);
  if (group) {
    group.add(el);
  } else {
    pending.set(parent, new Set([el]));
    getObserver().observe(parent);
  }
}

/** 40ms per sibling, capped so long lists don't lag. */
export const revealDelay = (index: number) =>
  ({ "--reveal-delay": `${Math.min(index, 5) * 40}ms` }) as CSSProperties;
