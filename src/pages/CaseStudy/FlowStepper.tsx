import type { Project } from "../../data/projects";
import { revealDelay, revealRef } from "../../hooks/useReveal";
import styles from "./CaseStudy.module.css";

export function FlowStepper({ steps }: { steps: Project["flow"] }) {
  return (
    <ol className={styles.flow} aria-label="Build flow">
      {steps.map((step, i) => (
        <li key={step.n} className={styles.step} data-reveal="text" ref={revealRef} style={revealDelay(i)}>
          <span className={styles.stepNum}>{step.n}</span>
          <span className={styles.stepLabel}>{step.t}</span>
        </li>
      ))}
    </ol>
  );
}
