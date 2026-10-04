import { useEffect, useRef, useState } from "react";
import type { ImageAsset, VideoAsset } from "../../data/images";
import { prefersReducedMotion } from "../../hooks/useMediaQuery";
import { attachStream, fileUrl, loopWindow, streamUrl } from "./stream";
import styles from "./VideoSlot.module.css";

type Props = {
  video: VideoAsset;
  /** Poster fallback when the clip has none of its own (usually the project image). */
  fallbackPoster?: ImageAsset;
  /** Sets aspect-ratio from the parent's module. */
  className?: string;
  /**
   * false inside a link (a button can't nest in <a>): no play/pause control and no
   * caption; under reduced motion it simply shows the poster.
   */
  controls?: boolean;
};

const posterUrl = (img?: ImageAsset) => {
  if (!img) return undefined;
  const widths = img.widths ?? [800, 1600];
  return `/images/${img.name}-${widths[0]}.webp`;
};

/**
 * A silent, looping screen recording. Loads nothing until it's near the viewport,
 * plays only while on screen, and always offers a pause button (WCAG 2.2.2).
 * With reduced motion it waits for the visitor to press play.
 */
export function VideoSlot({ video, fallbackPoster, className, controls = true }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(() => typeof window !== "undefined" && prefersReducedMotion());
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  /** Streams attach lazily; resolves once the source is ready to play. */
  const ensureRef = useRef<() => Promise<void>>(() => Promise.resolve());
  const stream = streamUrl(video);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    let inView = false;
    let cancelled = false;
    let detach: (() => void) | undefined;
    let attaching: Promise<void> | undefined;
    ensureRef.current = () => {
      if (!stream || detach) return Promise.resolve();
      attaching ??= attachStream(el, stream).then((d) => {
        if (cancelled) d();
        else detach = d;
      });
      return attaching;
    };
    const sync = () => {
      if (inView && !pausedRef.current && document.visibilityState === "visible") {
        el.play().catch(() => setPlaying(false));
      } else {
        el.pause();
      }
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !pausedRef.current) ensureRef.current().then(sync);
        else sync();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    // A page opened in a background tab: start once it's actually shown.
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelled = true;
      detach?.();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [stream]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      setPaused(false);
      ensureRef.current().then(() => el.play().catch(() => setPlaying(false)));
    } else {
      setPaused(true);
      el.pause();
    }
  };

  return (
    <figure className={[styles.slot, className].filter(Boolean).join(" ")}>
      <video
        ref={ref}
        className={styles.video}
        width={video.width}
        height={video.height}
        poster={posterUrl(video.poster ?? fallbackPoster)}
        muted
        loop
        playsInline
        preload="none"
        aria-label={video.caption}
        onTimeUpdate={video.clip ? loopWindow(video) : undefined}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <Sources video={video} onError={() => setPlaying(false)} />
      </video>
      {controls && <figcaption className={styles.caption}>{video.caption}</figcaption>}
      {controls && (
        <button
          type="button"
          className={styles.toggle}
          onClick={toggle}
          aria-label={`${playing ? "Pause" : "Play"} video: ${video.caption}`}
        >
          <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
          <span aria-hidden="true">{playing ? "Pause" : "Play"}</span>
        </button>
      )}
    </figure>
  );
}

/** <source> children for file clips; streams get none (attachStream sets them up). */
function Sources({ video, onError }: { video: VideoAsset; onError?: () => void }) {
  if (streamUrl(video)) return null;
  if (video.src) return <source src={fileUrl(video)} type="video/mp4" onError={onError} />;
  return (
    <>
      {video.webm && <source src={`/videos/${video.name}.webm`} type="video/webm" />}
      <source src={`/videos/${video.name}.mp4`} type="video/mp4" onError={onError} />
    </>
  );
}

/** Bare autoplaying loop with no controls, for decorative previews (the homepage hover card). */
export function LoopClip({ video, className }: { video: VideoAsset; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const stream = streamUrl(video);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    let detach: (() => void) | undefined;
    const start = () => el.play().catch(() => {});
    if (stream) {
      attachStream(el, stream).then((d) => {
        if (cancelled) d();
        else {
          detach = d;
          start();
        }
      });
    } else {
      start();
    }
    return () => {
      cancelled = true;
      detach?.();
    };
  }, [stream]);

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      onTimeUpdate={video.clip ? loopWindow(video) : undefined}
    >
      <Sources video={video} />
    </video>
  );
}
