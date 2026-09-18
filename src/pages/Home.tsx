import { site } from "../data/site";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { Hero } from "../sections/Hero/Hero";
import { ProofStrip } from "../sections/ProofStrip/ProofStrip";
import { Work } from "../sections/Work/Work";
import { Capabilities } from "../sections/Capabilities/Capabilities";
import { About } from "../sections/About/About";
import { Contact } from "../sections/Contact/Contact";

export default function Home() {
  useDocumentMeta(`${site.name} — ${site.role}`, site.description);

  return (
    <main id="main" tabIndex={-1}>
      <Hero />
      <ProofStrip />
      <Work />
      <Capabilities />
      <About />
      <Contact />
    </main>
  );
}
