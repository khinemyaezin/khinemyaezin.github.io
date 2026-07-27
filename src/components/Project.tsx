"use client";

import { useRef, useEffect, useCallback } from "react";
import { useWindowResize } from "@/hooks/useWindowResize";
import { useScrollHandler } from "@/hooks/useScrollHandler";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types";

export default function Project() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const windowSize = useWindowResize();
  const toX = useRef(0);
  const currentX = useRef(0);
  const totalHeight = useRef(0);

  const projects: Project[] = projectsData.projects;

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const setTargetX = useCallback(() => {
    if (!sliderRef.current) return;
    const sliderWidth = sliderRef.current.scrollWidth;
    toX.current = Math.max(0, sliderWidth - window.innerWidth);
  }, []);

  const setScrollContainerHeight = useCallback(() => {
    const isPortrait = window.innerHeight > window.innerWidth;
    const scrollDistanceMultiplier = isPortrait ? 1.8 : 1;
    totalHeight.current = window.innerHeight + toX.current * scrollDistanceMultiplier;
    if (sectionRef.current) {
      sectionRef.current.style.height = `${totalHeight.current}px`;
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current || !sliderRef.current) return;

    requestAnimationFrame(() => {
      const scrolledDistanceFromTop = Math.max(0, -sectionRef.current!.getBoundingClientRect().top);
      const height = Math.max(1, totalHeight.current - window.innerHeight);
      let percentage = scrolledDistanceFromTop / height;
      percentage = Math.max(0, Math.min(1, percentage));
      currentX.current = lerp(0, toX.current, percentage);

      sliderRef.current!.style.transform = `translate3d(${-currentX.current}px, 0, 0)`;
    });
  }, []);

  useEffect(() => {
    setTargetX();
    setScrollContainerHeight();
  }, [windowSize, setTargetX, setScrollContainerHeight]);

  useScrollHandler("project", sectionRef, handleScroll);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative"
    >
      <div className="projects-sticky sticky top-0 w-full">
        <div className="slider-container relative w-full h-full overflow-hidden">
          <div
            ref={sliderRef}
            className="projects-slider h-full flex overflow-hidden"
            style={{ width: "min-content", willChange: "transform" }}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className="project relative w-screen h-screen flex flex-col justify-center"
              >
                <div className="feature-project relative grid items-center mb-2.5" style={{ gridTemplateColumns: "repeat(12, 1fr)", gap: "10px" }}>
                  <div className="project-content relative z-2 col-span-6">
                    <p className="project-overline mb-0" style={{ color: "var(--color-secondary)", fontFamily: "var(--font-primary)" }}>
                      {project.title}
                    </p>
                    <h5 className="project-title my-4" style={{ fontSize: "clamp(2rem, 2cqi, 10rem)", fontFamily: "var(--font-title)", textTransform: "uppercase" }}>
                      {project.subtitle}
                    </h5>
                    <ul className="project-language-list flex flex-wrap relative z-2 my-6 gap-2 p-0 list-none" style={{ fontFamily: "Ubuntu Mono, monospace" }}>
                      {project.languages.map((lang, i) => (
                        <li key={i} className="px-4 text-center text-sm" style={{ color: "#9ca3af" }}>
                          {lang}
                        </li>
                      ))}
                    </ul>
                    <div className="project-links flex items-center mt-2.5 -ml-2.5">
                      {project.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          aria-label={`${project.subtitle} ${link.icon} link`}
                          rel="noopener noreferrer"
                          target="_blank"
                          className="flex justify-center items-center no-underline px-2.5"
                        >
                          <i className={`bi bi-${link.icon}`} style={{ fontSize: "1.5rem" }} aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="project-image relative z-1 col-start-6 col-end-13">
                    <div className="image-wrapper overflow-hidden relative">
                      <img
                        src={project.imgSrc}
                        alt={project.subtitle}
                        className="bottom-0 h-full left-0 m-0 max-w-none p-0 right-0 top-0 w-full object-cover"
                        style={{ mixBlendMode: "multiply", filter: "grayscale(100%) contrast(1) brightness(70%)" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .feature-project {
          transition: opacity 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0s,
            transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        .feature-project:hover {
          transform: perspective(1000px) rotateX(2deg) rotateY(-2deg) scale(1.02);
        }
        .feature-project:hover .project-content {
          transform: translateZ(30px);
        }
        .feature-project:hover .project-image {
          transform: translateZ(20px);
        }
        .project-content,
        .project-image {
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .project-image::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          inset: 0;
          z-index: 3;
          transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
        .project-image:hover img {
          filter: none !important;
        }
        .project-image:hover::before {
          background-color: transparent;
        }
        @media (min-width: 992px) {
          .feature-project {
            padding: 0 10rem;
          }
        }
        @media (max-width: 991.98px) {
          .feature-project {
            padding: 0 !important;
          }
        }
        @media (max-width: 767.98px) {
          .project-content {
            grid-column: 1 / -1 !important;
            padding: 2rem;
            text-align: left;
            z-index: 2;
          }
          .project-image {
            grid-column: 1 / -1 !important;
            height: 100%;
          }
          .project-image img {
            filter: grayscale(100%) contrast(1) brightness(20%) !important;
            opacity: 0.1;
          }
          .project-language-list {
            justify-content: flex-start !important;
          }
          .project-links {
            justify-content: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}
