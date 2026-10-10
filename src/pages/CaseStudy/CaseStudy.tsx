import { Navigate, useParams } from "react-router-dom";
import { useMemo } from "react";
import { projects, type Project } from "../../data/projects";
import { caseStudyMeta } from "../../data/seo";
import { CurtainLink } from "../../components/CurtainLink/CurtainLink";
import { ImageSlot } from "../../components/ImageSlot/ImageSlot";
import { VideoSlot } from "../../components/VideoSlot/VideoSlot";
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

function CaseStudyView({ project: p, index }: { project: Project; index: number }) {
  useDocumentMeta(useMemo(() => caseStudyMeta(p), [p]));
  const next = projects[(index + 1) % projects.length];
  const coverVideo = p.videos?.find((v) => v.cover);
  const clips = p.videos?.filter((v) => v !== coverVideo) ?? [];

  return (
    <main id="main" tabIndex={-1}>
      <article>
        <header className={styles.intro}>
          <CurtainLink to="/work" curtainLabel="All work" className={styles.back}>
            ← All work
          </CurtainLink>
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
          {coverVideo ? (
            <VideoSlot video={coverVideo} fallbackPoster={p.image} className={styles.coverImage} />
          ) : (
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
          )}
        </div>

        <div className={styles.body}>
          <SpecRail project={p} />

          <div className={styles.narrative}>
            <NarrativeSection id="problem" num="01" title="The challenge">
              <p className={styles.para}>{p.problem}</p>
            </NarrativeSection>

            <NarrativeSection id="build" num="02" title="What I built">
              <p className={`${styles.para} ${styles.paraBuild}`}>{p.build}</p>
              <FlowStepper steps={p.flow} />
            </NarrativeSection>

            <NarrativeSection id="experience" num="03" title="How it feels to shop">
              <p className={`${styles.para} ${styles.paraExperience}`}>{p.experience}</p>
              {clips.length > 0 && (
                <div className={styles.clips}>
                  {clips.map((v) => (
                    <VideoSlot key={v.name} video={v} fallbackPoster={p.image} className={styles.clip} />
                  ))}
                </div>
              )}
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
              {p.mobile && (
                <ul className={styles.phones} aria-label="Mobile screens">
                  {p.mobile.map((m, i) => (
                    <li key={m.name} className={styles.phoneItem}>
                      <ImageSlot
                        image={m}
                        caption={`Mobile screen ${i + 1}`}
                        className={styles.phone}
                        position="50% 0%"
                        sizes="(min-width: 900px) 200px, 58vw"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </NarrativeSection>

            <NarrativeSection id="cro" num="04" title="Why it converts">
              <ul className={styles.levers}>
                {p.cro.map((c, i) => (
                  <li key={c.lever} className={styles.lever} data-reveal="text" ref={revealRef} style={revealDelay(i)}>
                    <span className={styles.leverNum}>{String(i + 1).padStart(2, "0")}</span>
                    <h3 className={styles.leverTitle}>{c.lever}</h3>
                    <p className={styles.leverText}>{c.detail}</p>
                  </li>
                ))}
              </ul>
            </NarrativeSection>

            <NarrativeSection id="tech" num="05" title="Under the hood">
              <ul className={styles.chips} aria-label="Stack">
                {p.stack.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </ul>
            </NarrativeSection>

            <NarrativeSection id="result" num="06" title="The outcome">
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
