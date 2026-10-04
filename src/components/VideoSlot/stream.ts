import type { VideoAsset } from "../../data/images";

/** The HLS playlist URL when the clip is a stream, otherwise undefined. */
export const streamUrl = (video: VideoAsset) => (video.src && /\.m3u8(\?|$)/.test(video.src) ? video.src : undefined);

/**
 * Attaches an HLS stream to a <video>: natively where the browser supports it (Safari,
 * iOS), otherwise through hls.js, which is only downloaded the first time a stream plays.
 * Resolves to a cleanup function.
 */
export async function attachStream(el: HTMLVideoElement, url: string): Promise<() => void> {
  if (el.canPlayType("application/vnd.apple.mpegurl")) {
    el.src = url;
    return () => {
      el.removeAttribute("src");
      el.load();
    };
  }
  const { default: Hls } = await import("hls.js/light");
  if (!Hls.isSupported()) return () => {};
  // Size-capped so a small card never pulls the 720p rendition.
  const hls = new Hls({ capLevelToPlayerSize: true });
  hls.loadSource(url);
  hls.attachMedia(el);
  return () => hls.destroy();
}

/** Source URL for a remote file clip, starting at its window when it has one. */
export const fileUrl = (video: VideoAsset) =>
  video.src && video.clip ? `${video.src}#t=${video.clip[0]}` : video.src;

/** timeupdate handler that loops a clip window instead of the whole file. */
export const loopWindow = (video: VideoAsset) => (e: { currentTarget: HTMLVideoElement }) => {
  const el = e.currentTarget;
  if (video.clip && el.currentTime >= video.clip[1]) el.currentTime = video.clip[0];
};
