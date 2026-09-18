import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer} data-surface="dark">
      <span>Parth Pandey · Shopify Developer</span>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  );
}
