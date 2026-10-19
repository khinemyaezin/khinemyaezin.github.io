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
    <section id="projects" ref={sectionRef}>
      <div className="projects__sticky">
        <div className="slider__container">
          <div className="projects__slider" ref={projectsSliderRef}>
            {projectsData.projects.map((project, index) => (
              <div key={index} className="project">
                <div className="feature-project">
                  <div className="project-content">
                    <p className="project-overline">{project.title}</p>
                    <h5 className="project-title">{project.subtitle}</h5>
                    <ul className="project-language-list">
                      {project.languages.map((lan) => (
                        <li key={lan}>{lan}</li>
                      ))}
                    </ul>
                    <div className="project-links">
                      {project.links.map((l) => {
                        const Icon = ICON_MAP[l.icon] ?? ExternalLink;
                        return (
                          <a
                            key={l.url}
                            href={l.url}
                            aria-label="GitHub Link"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Icon className="h-6 w-6" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                  <div className="project-image">
                    <div className="image-wrapper img">
                      <picture>
                        <img
                          data-main-image
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
