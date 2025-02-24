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
      <div className="flex flex-col md:flex-row justify-between gap-12">
        <div
          ref={textRef}
          className="text-gray-500 poppins-regular text-sm leading-3 md:leading-relaxed max-w-xl space-y-3 "
        >
          <p className="leading-tight tracking-wide">
            Hello! My name is Parth, and I enjoy creating things that live
            on the internet. My interest in web development started back in 2012
            when I decided to try editing custom Tumblr themes — turns out
            hacking together a custom reblog button taught me a lot about HTML &
            CSS!
          </p>
          <p className="leading-tight  tracking-wide">
            Fast-forward to today, I’ve had the privilege of working at
            <br />
            <a
              className="text-teal-300"
              href="https://mmesolutions.com/"
              target="_blank"
              ref={(el) => el && linksRef.current.push(el)}
            >
              an saas based solution
            </a>
            ,{" "}
            <a
              className="text-teal-300"
              href="https://www.dharanetworks.com/"
              target="_blank"
              ref={(el) => el && linksRef.current.push(el)}
            >
              a start-up
            </a>
            ,{" "}
            <a
              ref={(el) => el && linksRef.current.push(el)}
              className="text-teal-300"
              href="https://angelswing.io/"
              target="_blank"
            >
              a drones
            </a>
            , and{" "}
            <a
              className="text-teal-300"
              href="https://techkraftinc.com/"
              target="_blank"
              ref={(el) => el && linksRef.current.push(el)}
            >
              a huge corporation.
            </a>
            <br />
            My main focus these days is building accessible, inclusive products
            and digital experiences for a variety of clients.
          </p>
          <p className="leading-tight  tracking-wide">
            I also recently added a blog that covers everything you need to
            build a web app with the API using{" "}
            <span className="text-teal-300 font-semibold">Node & React</span>.
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
          className="relative w-full md:w-1/3 group overflow-hidden rounded-lg"
        >
          <img
            src="/unnamed.jpg"
            alt="myself"
            className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-teal-300 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
        </div>
      </div>
    </section>
  );
};

export default About;
