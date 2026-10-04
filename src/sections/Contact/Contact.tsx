import { mailto, site } from "../../data/site";
import { Button } from "../../components/Button/Button";
import { CurtainLink } from "../../components/CurtainLink/CurtainLink";
import { useMagnetic } from "../../hooks/useMagnetic";
import { revealRef } from "../../hooks/useReveal";
import styles from "./Contact.module.css";

const links = [
  { label: "Email", href: mailto(), external: false },
  { label: "LinkedIn", href: site.linkedin, external: true },
  { label: "GitHub", href: site.github, external: true },
  { label: "Résumé", href: site.resume, external: true },
];

export function Contact() {
  const magnetRef = useMagnetic<HTMLSpanElement>();

  return (
    <section id="contact" className={styles.section} data-surface="dark" aria-labelledby="contact-title">
      <p className={styles.label}>Contact</p>
      <h2 id="contact-title" className={styles.title} data-reveal="text" ref={revealRef}>
        Have a Shopify problem worth solving?
      </h2>
      <p className={styles.intro}>
        Send me your store link and a couple of lines on what's not working — slow pages, a product page that doesn't
        convert, a feature no app gets right. I'll reply with how I'd approach it, usually the same day.
      </p>
      <div className={styles.ctaRow}>
        <span ref={magnetRef} className={styles.magnet}>
          <Button href={mailto("Shopify project")} variant="paper" className={styles.cta}>
            Let's build it <span aria-hidden="true">→</span>
          </Button>
        </span>
        <CurtainLink to="/services" curtainLabel="Services" className={styles.call}>
          Book a call
        </CurtainLink>
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
