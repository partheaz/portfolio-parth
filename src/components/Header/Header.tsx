import type { Ref } from "react";
import { Link } from "react-router-dom";
import { sections } from "../../data/site";
import styles from "./Header.module.css";

type Props = {
  drawerOpen: boolean;
  onMenu: () => void;
  menuRef: Ref<HTMLButtonElement>;
};

export function Header({ drawerOpen, onMenu, menuRef }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.rail}>
        <p className={styles.status}>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.long}>Open to Shopify / e-commerce roles</span>
          <span className={styles.short}>Open to Shopify roles</span>
        </p>
        <span className={styles.tz}>IST · UTC+5:30</span>
      </div>

      <div className={styles.bar}>
        <Link to="/" className={styles.logo} aria-label="Parth Pandey — home">
          <span className={styles.name}>Parth Pandey</span>
          <span className={styles.sub}>Shopify Dev</span>
        </Link>

        <div className={styles.actions}>
          <nav className={styles.links} aria-label="Primary">
            {sections.slice(0, 3).map((s) => (
              <Link key={s.id} to={`/#${s.id}`} className={styles.link}>
                {s.label}
              </Link>
            ))}
          </nav>
          <button
            ref={menuRef}
            type="button"
            className={styles.menu}
            aria-expanded={drawerOpen}
            aria-controls="drawer"
            onClick={onMenu}
          >
            <span>Menu</span>
            <span className={styles.bars} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
