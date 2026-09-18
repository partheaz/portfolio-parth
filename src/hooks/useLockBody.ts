import { useEffect } from "react";

/**
 * Locks page scroll while `locked` is true. Uses `position: fixed` on <body> with the
 * saved offset (the only approach iOS Safari respects) and pads for the scrollbar
 * so desktop layout doesn't shift.
 */
export function useLockBody(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const { body, documentElement } = document;
    const scrollY = window.scrollY;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    const prev = body.getAttribute("style") ?? "";

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      body.setAttribute("style", prev);
      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
    };
  }, [locked]);
}
