import { useEffect } from "react";
import { absoluteUrl, person, type PageMeta } from "../data/seo";

// The tags live in index.html between the seo markers; scripts/prerender.mjs fills them per route at build
// time. This keeps them in step when the visitor navigates client-side.
const setAttr = (selector: string, attr: string, value: string) =>
  document.head.querySelector(selector)?.setAttribute(attr, value);

export function useDocumentMeta(meta: PageMeta) {
  useEffect(() => {
    const url = absoluteUrl(meta.path);
    const image = absoluteUrl(meta.image);
    document.title = meta.title;
    setAttr('meta[name="description"]', "content", meta.description);
    setAttr('meta[name="robots"]', "content", meta.noindex ? "noindex, follow" : "index, follow");
    setAttr('link[rel="canonical"]', "href", url);
    setAttr('meta[property="og:url"]', "content", url);
    setAttr('meta[property="og:title"]', "content", meta.title);
    setAttr('meta[property="og:description"]', "content", meta.description);
    setAttr('meta[property="og:image"]', "content", image);
    setAttr('meta[name="twitter:title"]', "content", meta.title);
    setAttr('meta[name="twitter:description"]', "content", meta.description);
    setAttr('meta[name="twitter:image"]', "content", image);
    const ld = document.getElementById("ld-json");
    if (ld) ld.textContent = JSON.stringify([person, ...(meta.jsonLd ?? [])]);
  }, [meta]);
}
