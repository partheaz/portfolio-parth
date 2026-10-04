// hls.js ships types for its full build only; the light build has the same API (minus extras like subtitles).
declare module "hls.js/light" {
  export { default } from "hls.js";
}
