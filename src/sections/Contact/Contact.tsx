import { mailto, site } from "../../data/site";
import { Button } from "../../components/Button/Button";
import styles from "./Contact.module.css";

const links = [
  { label: "Email", href: mailto(), external: false },
  { label: "LinkedIn", href: site.linkedin, external: true },
  { label: "GitHub", href: site.github, external: true },
  { label: "Résumé", href: site.resume, external: true },
];

export function Contact() {
  return (
    <section id="contact" className={styles.section} data-surface="dark" aria-labelledby="contact-title">
      <p className={styles.label}>Contact</p>
      <h2 id="contact-title" className={styles.title}>
        Have a Shopify problem worth solving?
      </h2>
      <div className={styles.ctaRow}>
        <Button href={mailto("Shopify project")} variant="paper" className={styles.cta}>
          Let's build it <span aria-hidden="true">→</span>
        </Button>
        <p className={styles.helper}>Usually replies same day · Available for contract or full-time</p>
      </div>
      <ul className={styles.links}>
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className={styles.link}
              {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span>{l.label}</span>
              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
