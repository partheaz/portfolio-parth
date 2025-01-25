import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Hero = () => {
  const sectionRef = useRef(null);
  const textRefs: any = useRef([]);
  textRefs.current = [];

  const addToRefs = (el: any) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.out" }
    ).fromTo(
      textRefs.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.3, duration: 1, ease: "power2.out" }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-start px-6  text-[#ccd6f6] md:px-16"
    >
      <p
        ref={addToRefs}
        className="text-[#64ffda] mb-4 text-lg sm:text-xl md:text-2xl"
      >
        Hi! My name is
      </p>
      <h1
        ref={addToRefs}
        className="text-3xl md:text-7xl font-extrabold text-[#ccd6f6] mb-2"
      >
        Prachanda Rana.
      </h1>
      <h2
        ref={addToRefs}
        className="text-2xl sm:text-4xl md:text-5xl font-semibold text-[#8892b0] mb-6"
      >
        I build things for the Web.
      </h2>
      <p
        ref={addToRefs}
        className="text-[#8892b0] poppins-regular text-base sm:text-lg md:text-xl max-w-xl mb-10 md:leading-relaxed"
      >
        I’m a software engineer at{" "}
        <a
          href="https://cartmade.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#64ffda]  hover:text-[#ccd6f6]"
        >
          CartMade
        </a>
        ,focused on developing reliable and accessible Shopify apps, themes,
        Shopify Functions using{" "}
        <a
          className="text-purple-500  hover:text-purple-900"
          href="https://remix.run/"
          target="_blank"
        >
          Remix
        </a>{" "}
        with occasional work in design and digital experiences.
      </p>
      <button
        ref={addToRefs}
        className="border border-[#64ffda] text-[#64ffda] px-6 py-3 rounded hover:bg-[#64ffda] hover:text-black transition-all duration-300"
      >
        Explore My Work
      </button>
    </section>
  );
};

export default Hero;
