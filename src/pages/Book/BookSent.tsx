import { Navigate, useLocation } from "react-router-dom";
import { site } from "../../data/site";
import { CurtainLink } from "../../components/CurtainLink/CurtainLink";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import type { Booking } from "./booking";
import styles from "./Book.module.css";

export default function BookSent() {
  useDocumentMeta(`Request ready · ${site.name}`, "Your consultation request is ready to send.");
  const booking = useLocation().state as Booking | null;
  if (!booking?.ref) return <Navigate to="/book" replace />;

  return (
    <main id="main" tabIndex={-1} className={styles.sent}>
      <p className={styles.sentKicker}>
        <span className={styles.statusDot} aria-hidden="true" />
        Request {booking.ref} · Ready to send
      </p>
      <h1 className={styles.sentTitle}>
        Almost booked, <span className={styles.accent}>{booking.name}</span>.
      </h1>
      <p className={styles.sentText}>
        Your email app should have opened with the request addressed to me. Send it and I'll reply to {booking.email} with
        a calendar invite. I'll read your notes before the call, so we can spend the 30 minutes on the actual problem.
      </p>
      <p className={styles.sentText}>
        Nothing opened? <a href={booking.mailto}>Open the email again</a> or write to{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <dl className={styles.sentGrid}>
        <div className={styles.sentCell}>
          <dt>Requested slot</dt>
          <dd>{booking.when}</dd>
        </div>
        <div className={styles.sentCell}>
          <dt>Estimated scope</dt>
          <dd>{booking.total}</dd>
        </div>
        <div className={styles.sentCell}>
          <dt>Next</dt>
          <dd>Fixed quote within 48h of the call</dd>
        </div>
      </dl>

      <ul className={styles.sentLines}>
        {booking.lines.map((l) => (
          <li key={l.name} className={styles.sentChip}>
            {l.name} — {l.price}
          </li>
        ))}
      </ul>

      <div className={styles.sentActions}>
        <CurtainLink to="/" curtainLabel="Parth Pandey" className={styles.sentPrimary}>
          See the work →
        </CurtainLink>
        <CurtainLink to="/services" curtainLabel="Services" className={styles.sentSecondary}>
          Services
        </CurtainLink>
      </div>
    </main>
  );
}
