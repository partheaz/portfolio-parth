import { useState } from "react";
import { availability, formatPrice, services, type Service } from "../../data/services";
import { CurtainLink } from "../../components/CurtainLink/CurtainLink";
import { SplitHeading } from "../../components/SplitHeading/SplitHeading";
import { servicesMeta } from "../../data/seo";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { useMagnetic } from "../../hooks/useMagnetic";
import { revealRef } from "../../hooks/useReveal";
import { useCart } from "../../state/useCart";
import styles from "./Services.module.css";

const steps = ["Add services to your cart", "Book a free 30-minute call", "Fixed quote within 48 hours"];

export default function Services() {
  useDocumentMeta(servicesMeta);
  const magnetRef = useMagnetic<HTMLSpanElement>();

  return (
    <main id="main" tabIndex={-1}>
      <section className={styles.head} aria-labelledby="services-title">
        <div className={styles.headText}>
          <p className={styles.kicker}>
            <span className={styles.dot} aria-hidden="true" />
            {availability.slots}
          </p>
          <h1 id="services-title" className={styles.title}>
            <SplitHeading lines={["Pick the work.", "Book the call."]} by="word" accentLines={[1]} />
          </h1>
        </div>
        <p className={styles.intro}>
          Six ways to work together, priced as starting points. Add what fits, book a free 30-minute consultation, and
          you'll get a fixed quote within 48 hours. Nothing is charged here.
        </p>
      </section>

      <ol className={styles.steps}>
        {steps.map((s, i) => (
          <li key={s} className={styles.step}>
            <span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
            <span>{s}</span>
          </li>
        ))}
      </ol>

      <section className={styles.gridWrap} aria-label="Services">
        <ul className={styles.grid}>
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </ul>
      </section>

      <section className={styles.unsure} data-surface="dark" aria-labelledby="unsure-title">
        <div>
          <h2 id="unsure-title" className={styles.unsureTitle}>
            Not sure what you need?
          </h2>
          <p className={styles.unsureText}>
            Skip the cart. Book the call, describe the problem, and I'll tell you which of these it is — or that it's none
            of them.
          </p>
        </div>
        <span ref={magnetRef} className={styles.magnet}>
          <CurtainLink to="/book" curtainLabel="Book a call" className={styles.unsureCta}>
            Book a free call →
          </CurtainLink>
        </span>
      </section>
    </main>
  );
}

function ServiceCard({ service: s, index }: { service: Service; index: number }) {
  const cart = useCart();
  const [tier, setTier] = useState(() => cart.items.find((c) => c.id === s.id)?.tier ?? 0);
  const t = s.tiers[tier];
  const line = cart.items.find((c) => c.id === s.id);
  const inCart = !!line && line.tier === tier;
  const titleId = `svc-${s.id}`;

  return (
    <li className={styles.card} data-reveal="text" ref={revealRef} aria-labelledby={titleId}>
      <div className={styles.cardTop}>
        <span>{String(index + 1).padStart(2, "0")}</span>
        {s.tag && <span className={styles.tag}>{s.tag}</span>}
      </div>
      <h3 id={titleId} className={styles.name}>
        {s.name}
      </h3>
      <p className={styles.desc}>{s.desc}</p>
      <ul className={styles.includes} aria-label="Includes">
        {s.includes.map((inc) => (
          <li key={inc}>
            <span className={styles.plus} aria-hidden="true">
              +
            </span>
            {inc}
          </li>
        ))}
      </ul>
      <div className={styles.tiers} role="group" aria-label={`${s.name} options`}>
        {s.tiers.map((option, j) => (
          <button
            key={option.label}
            type="button"
            className={styles.tier}
            aria-pressed={j === tier}
            onClick={() => setTier(j)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className={styles.priceRow}>
        <div>
          <span className={styles.from}>From</span>
          <span className={styles.price}>
            {formatPrice(t.price)}
            {s.unit && <span className={styles.unit}>{s.unit}</span>}
          </span>
        </div>
        <span className={styles.time}>{t.time}</span>
      </div>
      <button
        type="button"
        className={styles.add}
        data-in-cart={inCart || undefined}
        onClick={() => cart.add(s.id, tier)}
      >
        {inCart ? "In cart ✓" : line ? "Update cart →" : "Add to cart →"}
      </button>
    </li>
  );
}
