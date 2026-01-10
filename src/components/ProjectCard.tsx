import { useEffect } from "react";
import { gsap } from "gsap";
import { FiExternalLink, FiGithub } from "react-icons/fi";

export const ProjectCard = ({
  title,
  description,
  image,
  video,
  tech,
  links,
  reverse,
}: any) => {
  useEffect(() => {
    gsap.fromTo(
      ".project-card",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    );
  }, []);

  return (
    <div
      className={`project-card border border-gray-500 rounded-md p-2 md:p-0 md:border-0 poppins-medium flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } space-y-6 md:space-y-0 md:space-x-6`}
    >
      <div className="w-full md:h-96 h-40 md:w-[60%] overflow-hidden rounded-lg shadow-lg">
        {video ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            onError={(e) => console.error('Video failed to load:', e)}
          >
            <source src={video} type="video/mp4" />
            <source src={video} type="video/quicktime" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform md:blur-[2px] md:hover:blur-0 md:hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>

      {/* Text */}

      <div
        className={`w-full
          flex flex-col
            ${
              reverse ? "md:items-start" : "md:items-end"
            }  md:w-[40%] w-full gap-4`}
      >
        <div
          className={`flex w-full flex-col gap-2 ${
            reverse ? "md:text-left" : "md:text-right"
          } mb-5 poppins-medium text-left`}
        >
          <p className="text-teal-300  font-semibold tracking-wide text-xs md:text-sm">
            Featured Project
          </p>
          <h4 className="text-lg md:text-2xl font-semibold ">{title}</h4>
        </div>
        <div className="relative">
          <p
            style={{ boxShadow: "0 10px  30px -15px #020c1bb3" }}
            className={`text-sm rounded-md bg-[#112240] p-6 py10  md:w-[calc(40vw+10px)]  text-[#a8b2d1] tracking-wide mb-4 ${
              reverse ? "md:texl-left" : "md:text-right"
            } text-left`}
          >
            {description}
          </p>
        </div>
        <div className="flex max-sm:text-sm flex-wrap md:flex-nowrap items-center  capitalize gap-4 text-[#7e8394] ">
          {tech.map((item: any, i: number) => (
            <span key={i}>{item}</span>
          ))}
        </div>

        <div className="flex items-center space-x-4 text-2xl">
          {/* GitHub Link */}

          {links.github !== null && (
            <a href={links.github} target="_blank">
              <FiGithub />
            </a>
          )}
          <a href={links.external} target="_blank">
            <FiExternalLink />
          </a>
        </div>
      </div>
    </div>
  );
};
