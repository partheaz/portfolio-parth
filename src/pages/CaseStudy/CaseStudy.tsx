import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { projects, type Project } from "../../data/projects";
import { site } from "../../data/site";
import { ImageSlot } from "../../components/ImageSlot/ImageSlot";
import { Chip } from "../../components/Chip/Chip";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { revealDelay, revealRef } from "../../hooks/useReveal";
import { SpecRail } from "./SpecRail";
import { FlowStepper } from "./FlowStepper";
import { NarrativeSection } from "./NarrativeSection";
import { NextProject } from "./NextProject";
import styles from "./CaseStudy.module.css";

export default function CaseStudy() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) return <Navigate to="/" replace />;
  return <CaseStudyView key={projects[index].slug} project={projects[index]} index={index} />;
}

function useCreativeWorkJsonLd(p: Project) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: `${p.brand} — ${p.kicker}`,
      description: p.line,
      dateCreated: p.year,
      keywords: p.stack.join(", "),
      creator: { "@type": "Person", name: site.name, jobTitle: site.role },
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, [p]);
}

function CaseStudyView({ project: p, index }: { project: Project; index: number }) {
  useDocumentMeta(`${p.brand} — ${p.kicker} · ${site.name}`, p.line);
  useCreativeWorkJsonLd(p);
  const next = projects[(index + 1) % projects.length];

  return (
    <main id="main" tabIndex={-1}>
      <article>
        <header className={styles.intro}>
          <Link to="/#work" className={styles.back}>
            ← All work
          </Link>
          <p className={styles.kicker}>
            <span className={styles.num}>{p.num}</span>
            <span>{p.kicker}</span>
          </p>
          <h1 className={styles.title}>{p.brand}</h1>
          <p className={styles.line}>{p.line}</p>
          {p.url && (
            <a className={styles.visit} href={p.url} target="_blank" rel="noopener noreferrer">
              Visit site <span aria-hidden="true">↗</span>
            </a>
          )}
        </header>

        <div className={styles.cover}>
          <ImageSlot
            image={p.image}
            caption={p.shot}
            alt={`${p.brand} — ${p.shot}`}
            className={styles.coverImage}
            sizes="100vw"
            captionSize="md"
            priority
            reveal={false}
          />
        </div>

        <div className={styles.body}>
          <SpecRail project={p} />

          <div className={styles.narrative}>
            <NarrativeSection id="problem" num="01" title="The problem">
              <p className={styles.para}>{p.problem}</p>
            </NarrativeSection>

            <NarrativeSection id="build" num="02" title="The build">
              <p className={`${styles.para} ${styles.paraBuild}`}>{p.build}</p>
              <FlowStepper steps={p.flow} />
            </NarrativeSection>

            <NarrativeSection id="experience" num="03" title="The experience">
              <p className={`${styles.para} ${styles.paraExperience}`}>{p.experience}</p>
              <div className={styles.details}>
                <ImageSlot
                  image={p.gallery?.[0] ?? p.image}
                  caption="UI detail — desktop"
                  alt={`${p.brand} — UI detail, desktop`}
                  className={styles.detail}
                  position="0% 0%"
                  sizes="(min-width: 900px) 33vw, 100vw"
                />
                <ImageSlot
                  image={p.image}
                  caption="UI detail — mobile"
                  alt={`${p.brand} — UI detail, mobile`}
                  className={styles.detail}
                  position="100% 60%"
                  sizes="(min-width: 900px) 33vw, 100vw"
                />
              </div>
            </NarrativeSection>

            <NarrativeSection id="tech" num="04" title="The tech">
              <ul className={styles.chips} aria-label="Stack">
                {p.stack.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </ul>
            </NarrativeSection>

            <NarrativeSection id="result" num="05" title="The result">
              <p className={styles.result} data-reveal="text" ref={revealRef} style={revealDelay(0)}>
                {p.result}
              </p>
            </NarrativeSection>
          </div>
        </div>
      </article>

      <NextProject project={next} />
    </main>
  );
}
