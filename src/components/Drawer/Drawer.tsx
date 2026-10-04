import { useRef, type CSSProperties, type RefObject } from "react";
import { Link } from "react-router-dom";
import { mailto, sections, site } from "../../data/site";
import { useModal } from "../../hooks/useModal";
import styles from "./Drawer.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  /** Receives focus back when the drawer closes. */
  returnFocusRef: RefObject<HTMLElement>;
  /** Everything behind the drawer — made inert while it's open. */
  pageRef: RefObject<HTMLElement>;
};

export function Drawer({ open, onClose, returnFocusRef, pageRef }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useModal({ open, onClose, panelRef, initialFocusRef: closeRef, returnFocusRef, pageRef });

  const [work, capabilities, about, contact] = sections;
  const rows = [
    { ...work, to: "/work" },
    { ...capabilities, to: `/#${capabilities.id}` },
    { ...about, to: `/#${about.id}` },
    { id: "services", label: "Services", count: "Hire", to: "/services" },
    { ...contact, to: `/#${contact.id}` },
  ];

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
          {rows.map((r, i) => (
            <Link
              key={r.id}
              to={r.to}
              className={styles.row}
              onClick={onClose}
              style={{ "--i": i } as CSSProperties}
            >
              {r.label}
              <span className={styles.count}>{r.count}</span>
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
