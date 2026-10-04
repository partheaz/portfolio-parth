import type { CSSProperties } from "react";
import styles from "./SplitHeading.module.css";

type Props = {
  /** One entry per visual line. */
  lines: string[];
  /** Animate each letter, or each word. */
  by?: "letter" | "word";
  /** Lines (0-based) drawn in the accent colour. */
  accentLines?: number[];
};

/**
 * Display heading whose letters (or words) rise out of a clipped line on load.
 * Renders inside the caller's <h1>/<h2>; screen readers get the plain text.
 * The animation only runs with JS and without reduced motion (see the CSS).
 */
export function SplitHeading({ lines, by = "letter", accentLines = [] }: Props) {
  let i = 0;
  return (
    <>
      <span className="visually-hidden">{lines.join(" ")}</span>
      {lines.map((line, li) => {
        const parts = by === "letter" ? Array.from(line) : line.split(" ");
        return (
          <span key={li} className={styles.line} data-accent={accentLines.includes(li) || undefined} aria-hidden="true">
            {parts.map((part, pi) => (
              <span
                key={pi}
                className={styles.part}
                data-word={by === "word" || undefined}
                style={{ "--i": i++ } as CSSProperties}
              >
                {part}
              </span>
            ))}
          </span>
        );
      })}
    </>
  );
}
