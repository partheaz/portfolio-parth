import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Title from "../components/Title";
import { FaCaretRight } from "react-icons/fa";
import { technologies } from "../constants/constants";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef<HTMLElement | any>(null);
  const textRef = useRef<HTMLElement | any>(null);
  const imageRef = useRef<HTMLElement | any>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 80%", // Starts when the section is 80% visible
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      textRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
    ).fromTo(
      imageRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
      "-=0.8"
    );

    // GSAP for the underline animation
    linksRef.current.forEach((link) => {
      if (link) {
        gsap.set(link, { position: "relative" });

        // Create underline span using React state and GSAP
        const underline = document.createElement("span");
        underline.style.position = "absolute";
        underline.style.bottom = "-2px";
        underline.style.left = "0";
        underline.style.width = "0";
        underline.style.height = "2px";
        underline.style.backgroundColor = "#00bfae";
        underline.style.transition = "width 0.4s ease";
        link.appendChild(underline);

        link.addEventListener("mouseenter", () => {
          gsap.to(underline, {
            width: "100%",
            duration: 0.4,
            ease: "power2.out",
          });
        });

        link.addEventListener("mouseleave", () => {
          gsap.to(underline, { width: "0%", duration: 0.4, ease: "power2.in" });
        });
      }
    });
  }, []);

  return (
    <section
      id="about"
      ref={aboutRef}
      className="py-20 bg-[#0A192F] text-white md:px-16 px-8"
    >
      <Title index={"01"} title="About me" />
      <div className="flex flex-col md:flex-row justify-between gap-12 relative">
        <div
          ref={textRef}
          className="text-gray-500 poppins-regular text-sm leading-3 md:leading-relaxed max-w-xl space-y-3 relative z-0"
        >
          <p className="leading-tight tracking-wide">
            Hello! My name is Parth, and I'm a passionate developer specializing in 
            building innovative e-commerce solutions. My journey in web development started 
            back in 2012 when I began experimenting with custom web themes — this curiosity 
            sparked a deep passion for crafting seamless digital experiences.
          </p>
          <p className="leading-tight  tracking-wide">
            Fast-forward to today, I've had the privilege of working at
            <br />
            <a
              className="text-teal-300"
              href="https://www.cartmade.com"
              target="_blank"
              ref={(el) => el && linksRef.current.push(el)}
            >
              a Shopify development agency
            </a>
            ,{" "}
            <a
              className="text-teal-300"
              href="https://mmesolutions.com/"
              target="_blank"
              ref={(el) => el && linksRef.current.push(el)}
            >
              a SaaS-based solutions company
            </a>
            ,{" "}
            <a
              className="text-teal-300"
              href="https://www.dharanetworks.com/"
              target="_blank"
              ref={(el) => el && linksRef.current.push(el)}
            >
              innovative startups
            </a>
            , and{" "}
            <a
              className="text-teal-300"
              href="https://techkraftinc.com/"
              target="_blank"
              ref={(el) => el && linksRef.current.push(el)}
            >
              enterprise corporations
            </a>
            .
          </p>
          <p className="leading-tight  tracking-wide">
            My primary focus is <span className="text-teal-300 font-semibold">Shopify development</span>, 
            where I build custom themes, develop Shopify apps, and create tailored e-commerce solutions 
            that drive conversions and enhance user experience. I specialize in integrating third-party 
            tools like Klaviyo, Rebuy, and other marketing automation platforms to help businesses scale.
          </p>
          <p className="leading-tight  tracking-wide">
            I'm dedicated to delivering high-quality, scalable solutions using modern web technologies, 
            with expertise in <span className="text-teal-300 font-semibold">React, Node.js, TypeScript</span>, 
            and the <span className="text-teal-300 font-semibold">Shopify ecosystem</span>.
          </p>
          <div className="flex pt-2  flex-col gap-4">
            <p>Here are a few technologies I’ve been working with recently:</p>
            <div className="text-sm grid poppins-medium  grid-cols-2 w-full md:w-[80%]">
              {technologies.map((tech: any) => (
                <p
                  className="flex tracking-widest text-xs leading-loose text-gray-500 items-center gap-1"
                  key={tech.id}
                >
                  <FaCaretRight className="text-teal-300 " />
                  {tech.name}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={imageRef}
          className="relative w-full md:w-1/3 group overflow-visible rounded-lg transition-all duration-500 hover:z-50 hover:scale-110"
        >
          <img
            src="/unnamed.jpg"
            alt="myself"
            className="w-full h-full object-cover rounded-lg shadow-lg transition-all duration-500 group-hover:shadow-2xl"
          />
          <div className="absolute inset-0 bg-teal-300 opacity-20 group-hover:opacity-0 transition-opacity duration-500 rounded-lg"></div>
        </div>
      </div>
    </section>
  );
};

export default About;
