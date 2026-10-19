import { useRef, useEffect } from 'react';
import { ExternalLink, Github, Download, type LucideIcon } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import projectsData from '@/data/projects.json';

const ICON_MAP: Record<string, LucideIcon> = {
  'box-arrow-up-right': ExternalLink,
  github: Github,
  download: Download,
};

export default function Projects() {
  const [sectionRef] = useIntersectionObserver();
  const projectsSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const slider = projectsSliderRef.current;
    if (!section || !slider) return;

    let toX = 0;
    let totalHeight = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const setTargetX = () => {
      toX = Math.max(0, slider.scrollWidth - window.innerWidth);
    };

    const setScrollContainerHeight = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      const scrollDistanceMultiplier = isPortrait ? 1.8 : 1;
      totalHeight = window.innerHeight + toX * scrollDistanceMultiplier;
      section.style.height = `${totalHeight}px`;
    };

    setTargetX();
    setScrollContainerHeight();

    const handleResize = () => {
      setTargetX();
      setScrollContainerHeight();
    };

    let animationFrameId: number | null = null;

    const animate = () => {
      const scrolledDistanceFromTop = Math.max(0, -section.getBoundingClientRect().top);
      const height = Math.max(1, totalHeight - window.innerHeight);

      let percentage = scrolledDistanceFromTop / height;
      percentage = Math.max(0, Math.min(1, percentage));
      const currentX = lerp(0, toX, percentage);

      slider.style.transform = `translate3d(${-currentX}px, 0, 0)`;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [sectionRef, projectsSliderRef]);

  return (
    <section id="projects" className="relative" ref={sectionRef}>
      <div className="sticky top-0 w-full">
        <div className="relative h-full w-full overflow-hidden">
          <div
            className="flex h-full w-min overflow-hidden will-change-transform [transition:translate_0.2s_ease]"
            ref={projectsSliderRef}
          >
            {projectsData.projects.map((project, index) => (
              <div
                key={index}
                className="relative flex h-screen w-screen flex-col justify-center"
              >
                <div className="group relative mb-2.5 grid grid-cols-12 items-center gap-2.5 visible opacity-100 [perspective:1000px] [transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)] [transform-style:preserve-3d] [transition:opacity_0.5s_cubic-bezier(0.645,0.045,0.355,1)_0s,transform_0.5s_cubic-bezier(0.645,0.045,0.355,1)_0s] hover:[transform:perspective(1000px)_rotateX(2deg)_rotateY(-2deg)_scale(1.02)] lg:px-40">
                  <div className="relative z-[2] text-right [grid-area:1_/_7_/_-1_/_-1] [transition:transform_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:[transform:translateZ(30px)] max-lg:[grid-column:5_/_-1] max-md:bg-transparent max-md:p-8 max-md:text-left max-md:[grid-column:1_/_-1]">
                    <p className="project-overline">{project.title}</p>
                    <h5 className="project-title">{project.subtitle}</h5>
                    <ul className="relative z-[2] mx-0 my-[25px] mb-2.5 flex flex-wrap gap-2 list-none p-0 font-primary justify-end max-md:justify-start">
                      {project.languages.map((lan) => (
                        <li key={lan} className="px-4 py-[5px] text-center text-[0.875rem] text-gray-500 first:pl-0 last:border-none last:pr-0">
                          {lan}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2.5 -mr-2.5 flex items-center justify-end max-md:justify-start">
                      {project.links.map((l) => {
                        const Icon = ICON_MAP[l.icon] ?? ExternalLink;
                        return (
                          <a
                            key={l.url}
                            href={l.url}
                            aria-label="GitHub Link"
                            rel="noopener noreferrer"
                            target="_blank"
                            className="flex items-center justify-center gap-20 px-2.5 no-underline text-primary"
                          >
                            <Icon className="h-6 w-6" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                  <div className="group relative z-[1] row-span-full col-start-1 col-end-8 before:absolute before:inset-0 before:z-[3] before:h-full before:w-full before:mix-blend-screen before:[transition:all_0.25s_cubic-bezier(0.645,0.045,0.355,1)] before:content-[''] group-hover:before:bg-transparent max-md:before:opacity-[0.15] max-md:before:[backdrop-filter:saturate(200%)_blur(30px)] [transition:transform_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)] max-md:col-span-full max-md:h-full">
                    <div className="image-wrapper img relative block w-full max-w-full overflow-hidden align-middle mix-blend-multiply [filter:grayscale(100%)_contrast(1)_brightness(70%)] [transform:translateZ(0)] [transition:opacity_0.25s_linear] [will-change:opacity] group-hover:[filter:none] max-md:[filter:grayscale(100%)_contrast(1)_brightness(20%)] max-md:h-full max-md:object-cover max-md:opacity-[0.1] max-md:w-auto">
                      <picture>
                        <img
                          data-main-image
                          className="bottom-0 left-0 m-0 max-w-none p-0 right-0 top-0 h-full w-full object-cover"
                          src={`${import.meta.env.BASE_URL}${project.imgSrc}`}
                          alt={project.title}
                        />
                      </picture>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
