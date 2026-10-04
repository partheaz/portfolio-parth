import { useEffect, useRef, type Ref } from "react";
import { Link } from "react-router-dom";
import { sections } from "../../data/site";
import { prefersReducedMotion } from "../../hooks/useMediaQuery";
import { useTheme } from "../../hooks/useTheme";
import { useCart } from "../../state/useCart";
import { CurtainLink } from "../CurtainLink/CurtainLink";
import styles from "./Header.module.css";

type Props = {
  drawerOpen: boolean;
  onMenu: () => void;
  menuRef: Ref<HTMLButtonElement>;
  cartRef: Ref<HTMLButtonElement>;
};

export function Header({ drawerOpen, onMenu, menuRef, cartRef }: Props) {
  const { theme, toggle } = useTheme();
  const cart = useCart();
  const [work, capabilities, about] = sections;
  const count = cart.items.length;
  const badgeRef = useRef<HTMLSpanElement>(null);
  const lastCount = useRef(count);

  // Bump the badge when a service is added.
  useEffect(() => {
    const grew = count > lastCount.current;
    lastCount.current = count;
    if (!grew || prefersReducedMotion()) return;
    badgeRef.current?.animate?.(
      [{ transform: "scale(1)" }, { transform: "scale(1.8)" }, { transform: "scale(1)" }],
      { duration: 560, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
    );
  }, [count]);

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
        <CurtainLink to="/" className={styles.logo} aria-label="Parth Pandey — home">
          <span className={styles.name}>Parth Pandey</span>
          <span className={styles.sub}>Shopify Dev</span>
        </CurtainLink>

        <div className={styles.actions}>
          <nav className={styles.links} aria-label="Primary">
            <CurtainLink to="/work" curtainLabel="All work" className={styles.link}>
              {work.label}
            </CurtainLink>
            <CurtainLink to="/services" curtainLabel="Services" className={styles.link}>
              <span className={styles.linkDot} aria-hidden="true" />
              Services
            </CurtainLink>
            {[capabilities, about].map((s) => (
              <Link key={s.id} to={`/#${s.id}`} className={styles.link}>
                {s.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className={styles.theme}
            onClick={toggle}
            role="switch"
            aria-checked={theme === "dark"}
            aria-label="Dark theme"
            data-theme={theme}
          >
            <span className={styles.track} aria-hidden="true">
              <span className={styles.knob} />
            </span>
            <span className={styles.themeLabel} aria-hidden="true">
              {theme === "dark" ? "Dark" : "Light"}
            </span>
          </button>

          <button
            ref={cartRef}
            type="button"
            className={styles.cart}
            onClick={cart.open}
            aria-haspopup="dialog"
            aria-expanded={cart.isOpen}
            aria-controls="cart"
            aria-label={`Cart, ${count} ${count === 1 ? "service" : "services"}`}
          >
            <span className={styles.cartLabel} aria-hidden="true">
              Cart
            </span>
            <span ref={badgeRef} className={styles.badge} aria-hidden="true">
              {count}
            </span>
          </button>

          <button
            ref={menuRef}
            type="button"
            className={styles.menu}
            aria-expanded={drawerOpen}
            aria-controls="drawer"
            aria-label="Menu"
            onClick={onMenu}
          >
            <span className={styles.menuLabel} aria-hidden="true">
              Menu
            </span>
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
