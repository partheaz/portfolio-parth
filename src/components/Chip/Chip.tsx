import type { ReactNode } from "react";
import styles from "./Chip.module.css";

type SwatchProps = {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
};

/** Variant swatch — a toggle button. */
export function Swatch({ pressed, onClick, children }: SwatchProps) {
  return (
    <button type="button" className={styles.swatch} aria-pressed={pressed} onClick={onClick}>
      {children}
    </button>
  );
}

/** Static tech chip, rendered as a list item. */
export function Chip({ children }: { children: ReactNode }) {
  return <li className={styles.chip}>{children}</li>;
}
