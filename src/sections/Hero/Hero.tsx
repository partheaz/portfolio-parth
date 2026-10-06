import { useState } from "react";
import { locale } from "../../data/locale";
import { defaultStatement, variants } from "../../data/variants";
import { Swatch } from "../../components/Chip/Chip";
import { SplitHeading } from "../../components/SplitHeading/SplitHeading";
import { DESKTOP, useMediaQuery } from "../../hooks/useMediaQuery";
import { DeveloperCard } from "./DeveloperCard";
import { HeroCarousel } from "./HeroCarousel";
import styles from "./Hero.module.css";

export function Hero() {
  const [active, setActive] = useState(-1);
  const isDesktop = useMediaQuery(DESKTOP);
  const statement = active < 0 ? defaultStatement : variants[active].text;

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.head}>
        <p className={styles.eyebrow}>
          <span>Parth Pandey</span>
          <span className={styles.eyebrowRule} aria-hidden="true" />
          <span>4+ yrs</span>
        </p>
        <p className={styles.meta}>4+ yrs · {locale.city}</p>
        <h1 id="hero-title" className={styles.title}>
          <SplitHeading lines={["Shopify", "Developer"]} />
        </h1>
      </div>

      {isDesktop && <DeveloperCard />}

      <div className={styles.lower}>
        <p className={styles.statement} aria-live="polite">
          {statement}
        </p>
        <div className={styles.swatches} role="group" aria-label="Filter what I build">
          {variants.map((v, i) => (
            <Swatch key={v.label} pressed={i === active} onClick={() => setActive(i === active ? -1 : i)}>
              {v.label}
            </Swatch>
          ))}
        </div>
      </div>

      {!isDesktop && <HeroCarousel />}
    </section>
  );
}
