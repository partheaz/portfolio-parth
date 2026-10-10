import { useCallback, useSyncExternalStore } from "react";
import { prefersReducedMotion } from "./useMediaQuery";

export type Theme = "dark" | "light";

const KEY = "pp_theme";
const META = { dark: "#131412", light: "#F2EDE4" } as const;

const current = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

// Every switch (header, drawer) reads the same <html data-theme>, so they stay in step.
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};

/** Reads the theme index.html picked before paint; toggling persists it and cross-fades the page. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, current);

  const toggle = useCallback(() => {
    const next: Theme = current() === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* storage unavailable: the choice lasts for this visit */
    }
    const apply = () => {
      document.documentElement.dataset.theme = next;
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", META[next]);
    };
    if (document.startViewTransition && !prefersReducedMotion()) document.startViewTransition(apply);
    else apply();
  }, []);

  return { theme, toggle };
}
