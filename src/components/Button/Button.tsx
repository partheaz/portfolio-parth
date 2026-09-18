import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

type Props = {
  /** Internal paths ("/…") render a router Link; everything else an <a>. */
  href: string;
  children: ReactNode;
  /** ink: ink fill → accent (cards, rails). paper: paper fill on charcoal (contact CTA). */
  variant?: "ink" | "paper";
  className?: string;
  external?: boolean;
};

export function Button({ href, children, variant = "ink", className, external }: Props) {
  const cls = [styles.button, styles[variant], className].filter(Boolean).join(" ");
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}
