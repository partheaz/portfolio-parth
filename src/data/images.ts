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
};

// TODO(owner): supply a higher-resolution portrait; the current source is 576×576.
export const portrait: ImageAsset = { name: "portrait", width: 576, height: 576, widths: [576] };
