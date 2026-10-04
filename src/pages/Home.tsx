import { site } from "../data/site";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { Hero } from "../sections/Hero/Hero";
import { ProofStrip } from "../sections/ProofStrip/ProofStrip";
import { Work } from "../sections/Work/Work";
import { Capabilities } from "../sections/Capabilities/Capabilities";
import { About } from "../sections/About/About";
import { ServicesBand } from "../sections/ServicesBand/ServicesBand";
import { Contact } from "../sections/Contact/Contact";
import { Marquee } from "../sections/Marquee/Marquee";

export default function Home() {
  useDocumentMeta(`${site.name} — ${site.role}`, site.description);

  return (
    <main id="main" tabIndex={-1}>
      <Hero />
      <ProofStrip />
      <Marquee />
      <Work />
      <Capabilities />
      <About />
      <ServicesBand />
      <Contact />
    </main>
  );
}
