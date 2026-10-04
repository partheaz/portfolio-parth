import { useState } from "react";
import { projects, workTags, type Project, type WorkTag } from "../../data/projects";
import { alsoShipped, mailto, site } from "../../data/site";
import { CurtainLink } from "../../components/CurtainLink/CurtainLink";
import { ImageSlot } from "../../components/ImageSlot/ImageSlot";
import { SplitHeading } from "../../components/SplitHeading/SplitHeading";
import { VideoSlot } from "../../components/VideoSlot/VideoSlot";
import { Swatch } from "../../components/Chip/Chip";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { revealRef } from "../../hooks/useReveal";
import styles from "./WorkIndex.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

export default function WorkIndex() {
  useDocumentMeta(
    `Work — Shopify themes, apps, migrations and CRO · ${site.name}`,
    "Case studies from Shopify stores I've built for: product page and cart rebuilds, custom apps, Magento migrations and conversion work.",
  );
  const [tag, setTag] = useState<WorkTag | null>(null);
  const shown = tag ? projects.filter((p) => p.tags.includes(tag)) : projects;

  return (
    <main id="main" tabIndex={-1}>
      <section className={styles.head} aria-labelledby="work-index-title">
        <p className={styles.kicker}>
          <span>Selected work</span>
          <span className={styles.kickerRule} aria-hidden="true" />
          <span>{pad(projects.length)} case studies · 15+ stores</span>
        </p>
        <h1 id="work-index-title" className={styles.title}>
          <SplitHeading lines={["Work that", "sells."]} by="word" accentLines={[1]} />
        </h1>
        <p className={styles.intro}>
          Product pages, carts, custom apps and migrations for Shopify brands in the UK, US and India. Each case study
          covers what was wrong, what I built, and why it helps more visitors buy.
        </p>
      </section>

      <div className={styles.filters} role="group" aria-label="Filter projects">
        <Swatch pressed={tag === null} onClick={() => setTag(null)}>
          All · {pad(projects.length)}
        </Swatch>
        {workTags.map((t) => {
          const count = projects.filter((p) => p.tags.includes(t)).length;
          if (!count) return null;
          return (
            <Swatch key={t} pressed={tag === t} onClick={() => setTag(tag === t ? null : t)}>
              {t} · {pad(count)}
            </Swatch>
          );
        })}
      </div>

      <p className="visually-hidden" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
        {tag ? ` tagged ${tag}` : ""}
      </p>

      <ul className={styles.grid}>
        {shown.map((p) => (
          <WorkCard key={p.slug} project={p} />
        ))}
      </ul>

      <section className={styles.more} aria-label="More work">
        <div className={styles.also}>
          <h2 className={styles.alsoLabel}>Also shipped</h2>
          <ul className={styles.alsoList}>
            {alsoShipped.map((item) => (
              <li key={item.name}>
                {item.url ? (
                  <a href={item.url} className={styles.alsoChip} target="_blank" rel="noopener noreferrer">
                    {item.name}
                    <span className={styles.alsoArrow} aria-hidden="true">
                      ↗
                    </span>
                  </a>
                ) : (
                  <span className={styles.alsoChip}>{item.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.cta}>
          <h2 className={styles.ctaTitle}>Got a store that needs work like this?</h2>
          <div className={styles.ctaActions}>
            <a href={mailto("Shopify project")} className={styles.ctaPrimary}>
              Tell me about it →
            </a>
            <CurtainLink to="/services" curtainLabel="Services" className={styles.ctaSecondary}>
              See services & prices
            </CurtainLink>
          </div>
        </div>
      </section>
    </main>
  );
}

function WorkCard({ project: p }: { project: Project }) {
  const video = p.videos?.[0];
  return (
    <li className={styles.item} data-reveal="text" ref={revealRef}>
      <CurtainLink to={`/work/${p.slug}`} curtainLabel={p.brand} className={styles.card} data-cursor="view">
        {video ? (
          <VideoSlot video={video} fallbackPoster={p.image} className={styles.media} controls={false} />
        ) : (
          <ImageSlot
            image={p.image}
            caption={p.shot}
            alt={`${p.brand} — ${p.shot}`}
            className={styles.media}
            sizes="(min-width: 900px) 50vw, 100vw"
            reveal={false}
          />
        )}
        <div className={styles.meta}>
          <span className={styles.num}>{p.num}</span>
          <span className={styles.kickerSmall}>{p.kicker}</span>
          <span className={styles.year}>{p.year}</span>
        </div>
        <h2 className={styles.brand}>{p.brand}</h2>
        <p className={styles.line}>{p.line}</p>
        <ul className={styles.tags} aria-label="Type of work">
          {p.tags.map((t) => (
            <li key={t} className={styles.tag} data-cro={t === "CRO" || undefined}>
              {t}
            </li>
          ))}
        </ul>
        <span className={styles.view}>View case study →</span>
      </CurtainLink>
    </li>
  );
}
