import { useEffect, useRef, type RefObject } from "react";
import { Link } from "react-router-dom";
import { mailto, sections, site } from "../../data/site";
import { useLockBody } from "../../hooks/useLockBody";
import styles from "./Drawer.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  /** Receives focus back when the drawer closes. */
  returnFocusRef: RefObject<HTMLElement>;
  /** Everything behind the drawer — made inert while it's open. */
  pageRef: RefObject<HTMLElement>;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Drawer({ open, onClose, returnFocusRef, pageRef }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useLockBody(open);

  useEffect(() => {
    const page = pageRef.current;
    if (page) page.inert = open;

    if (open) {
      wasOpen.current = true;
      closeRef.current?.focus();
    } else if (wasOpen.current) {
      wasOpen.current = false;
      // Only reclaim focus if it was inside the drawer (a nav link may have moved it on purpose).
      if (!document.activeElement || document.activeElement === document.body || panelRef.current?.contains(document.activeElement)) {
        returnFocusRef.current?.focus({ preventScroll: true });
      }
    }
  }, [open, pageRef, returnFocusRef]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div className={styles.layer} data-open={open} data-surface="dark">
      <div className={styles.scrim} onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        id="drawer"
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Site index"
      >
        <div className={styles.head}>
          <span>Index</span>
          <button ref={closeRef} type="button" className={styles.close} onClick={onClose}>
            Close <span aria-hidden="true">✕</span>
          </button>
        </div>

        <nav className={styles.nav} aria-label="Site index">
          {sections.map((s) => (
            <Link key={s.id} to={`/#${s.id}`} className={styles.row} onClick={onClose}>
              {s.label}
              <span className={styles.count}>{s.count}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.secondary}>
          <a href={mailto()} className={styles.secondaryLink}>
            → Email
          </a>
          <a href={site.resume} className={styles.secondaryLink} target="_blank" rel="noopener noreferrer">
            → Résumé
          </a>
        </div>

        <div className={styles.foot}>
          <span className={styles.footLabel}>1 developer</span>
          <span className={styles.available}>Available</span>
        </div>
      </div>
    </div>
  );
}
