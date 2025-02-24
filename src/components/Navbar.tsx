import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { navbarItems } from "../constants/constants";
import { TbMenuDeep } from "react-icons/tb";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
  const navbarRef = useRef(null);
  const [isMobileNav, setIsMobileNav] = useState<boolean>(false);
  const logoRef = useRef(null);
  const menuItemsRef: any = useRef([]);
  menuItemsRef.current = [];

  const addToMenuRefs = (el: any) => {
    if (el && !menuItemsRef.current.includes(el)) {
      menuItemsRef.current.push(el);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      navbarRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    )
      .fromTo(
        logoRef.current,
        { scale: 0, rotation: -45, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        }
      )
      .fromTo(
        menuItemsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.6, ease: "power2.out" }
      );
  }, []);

  // Mobile menu transition using translateX and visibility
  useEffect(() => {
    if (isMobileNav) {
      gsap.to(".mobile-menu", {
        x: 0,
        opacity: 1,
        duration: 0.1,
        ease: "power2.out",
        visibility: "visible",
      });

      // Disable scrolling when the navbar is open
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(".mobile-menu", {
        x: "100%",
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        visibility: "hidden",
      });

      document.body.style.overflow = "auto";
    }
  }, [isMobileNav]);

  return (
    <nav
      ref={navbarRef}
      className="flex items-center z-[9999] fixed w-full  md:sticky top-0 overflow-mhidden justify-between px-2 py-2 md:px-0 md:py-5 bg-[#0A192F] text-white"
    >
      {/* Logo */}
      <Link to={"/"}>
        <div
          ref={logoRef}
          className="logo w-12 h-12 cursor-pointer transform hover:scale-110 transition-all"
        >
          <img src="/logo.avif" alt="Logo" className="w-full h-full" />
        </div>
      </Link>

      {/* Menu Items */}
      <div className="hidden md:flex items-center gap-6">
        <ul className="flex space-x-8 text-sm font-medium">
          {navbarItems.map((item: any) => (
            <li
              key={item.id}
              ref={addToMenuRefs}
              className="hover:text-teal-300 flex items-center gap-2 transition-all"
            >
              <span className="text-teal-300">{item.id}.</span>
              <a
                href={item.link}
                className="text-gray-400 cursor-pointer hover:text-teal-300 transition-all delay-75"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <button
          ref={addToMenuRefs}
          onClick={() => {
            const link = document.createElement("a");
            link.href = "/resume-parth.pdf";
            link.download = "parth_pandey_resume.pdf";
            link.click();
          }}
          className="border border-teal-300 text-teal-300 px-4 py-2 rounded hover:bg-teal-300 hover:text-black transition-all duration-300"
        >
          Resume
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden relative flex items-center gap-4">
        <button
          onClick={() => setIsMobileNav(true)}
          className="text-teal-300 px-3 py-2 rounded-md"
        >
          <TbMenuDeep className="text-4xl" />
        </button>

        {/* Mobile Navigation */}
        <div
          className="mobile-menu absolute transition-all -top-1 py-10 min-h-screen z-[99999] bg-[#112240] w-72 -right-4"
          style={{ visibility: "hidden", transform: "translateX(100%)" }}
        >
          <div className="relative">
            <button
              onClick={() => setIsMobileNav(false)}
              className="absolute -top-4 right-5 text-teal-300"
            >
              <RxCross1 className="text-4xl" />
            </button>
          </div>
          <ul className="flex flex-col space-y-12 mt-16 text-sm font-medium">
            {navbarItems.map((item: any) => (
              <li
                onClick={() => setIsMobileNav(false)}
                key={item.id}
                ref={addToMenuRefs}
                className="hover:text-teal-300 flex items-center gap-2 px-10 transition-all"
              >
                <span className="text-teal-300">{item.id}.</span>
                <a
                  href={item.link}
                  className="text-gray-400 cursor-pointer hover:text-teal-300 transition-all delay-75"
                >
                  {item.name}
                </a>
              </li>
            ))}

            <button
              ref={addToMenuRefs}
              className="border w-1/2 mx-10 border-teal-300 text-teal-300 py-2 rounded hover:bg-teal-300 hover:text-black transition-all duration-300"
            >
              Resume
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
