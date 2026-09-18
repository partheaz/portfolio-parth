import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getProject } from "../../data/projects";
import { mailto } from "../../data/site";
import styles from "./MobileActionBar.module.css";

/** Sticky bottom bar (mobile only) — stands in for the desktop hero card. */
export function MobileActionBar({ drawerOpen }: { drawerOpen: boolean }) {
  const { pathname } = useLocation();
  const [contactInView, setContactInView] = useState(false);
  const project = getProject(pathname.match(/^\/work\/([^/]+)/)?.[1]);

  useEffect(() => {
    setContactInView(false);
    let io: IntersectionObserver | undefined;
    // #contact mounts with the page; wait a frame so it exists after navigation.
    const frame = requestAnimationFrame(() => {
      const contact = document.getElementById("contact");
      if (!contact) return;
      io = new IntersectionObserver(([entry]) => setContactInView(entry.isIntersecting), { threshold: 0.1 });
      io.observe(contact);
    });
    return () => {
      cancelAnimationFrame(frame);
      io?.disconnect();
    };
  }, [pathname]);

  const hidden = drawerOpen || contactInView;

  return (
    <div className={styles.bar} data-hidden={hidden} data-surface="dark">
      <span className={styles.status}>
        <span className={styles.dot} aria-hidden="true" />
        Available now
      </span>
      {project ? (
        <a className={styles.cta} href={mailto(`Discuss a build — ${project.brand}`)}>
          Discuss a build →
        </a>
      ) : (
        <Link className={styles.cta} to="/#contact">
          Hire me →
        </Link>
      )}
    </div>
  );
}
