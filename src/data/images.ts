/**
 * An optimised image produced by scripts/optimize-images.mjs.
 * Files live at /images/{name}-{w}.{avif,webp} for every entry in `widths`.
 */
export type ImageAsset = {
  name: string;
  /** Intrinsic size of the largest output — used for width/height attributes (CLS). */
  width: number;
  height: number;
  widths?: number[];
  /** Describes this particular screenshot; falls back to the slot's caption. */
  alt?: string;
  /** object-position that keeps the subject in frame in every crop, e.g. "50% 35%". */
  focus?: string;
};

/**
 * A short, silent screen recording. Files live at /videos/{name}.mp4 (H.264) and,
 * if `webm` is set, /videos/{name}.webm too. See README → "Adding project videos".
 */
export type VideoAsset = {
  /** Local file name in /public/videos; also used as the React key. */
  name: string;
  /**
   * Remote source instead of the local files: an HLS stream (.m3u8, e.g. a Shopify CDN
   * video) or an MP4 URL. Streams play natively in Safari and through hls.js elsewhere.
   */
  src?: string;
  /**
   * Loop only this window of the video, in seconds — for long remote films, so the page
   * shows a short loop and the browser never needs the rest of the file.
   */
  clip?: [start: number, end: number];
  width: number;
  height: number;
  /** What the clip shows — used as its accessible label and visible caption. */
  caption: string;
  /** Still frame shown before playback; defaults to the project's main image. */
  poster?: ImageAsset;
  webm?: boolean;
  /** Use this clip in place of the case study's cover image. */
  cover?: boolean;
};

// Cropped to 4:5 from the studio headshot; `focus` keeps the face in frame in the 1:1 phone crop.
export const portrait: ImageAsset = { name: "portrait", width: 880, height: 1100, widths: [440, 880], focus: "50% 22%" };
