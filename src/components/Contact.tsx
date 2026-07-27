"use client";

import { useRef, memo } from "react";

const Contact = memo(function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  const onMagneticMove = (event: React.MouseEvent<HTMLAnchorElement>, element: HTMLAnchorElement) => {
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.3;
    element.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
  };

  const onMagneticLeave = (element: HTMLAnchorElement) => {
    element.style.transform = "translate(0, 0) scale(1)";
  };

  const currentYear = new Date().getFullYear();

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full flex items-center justify-center"
      style={{ backgroundColor: "#111827", minHeight: "100vh" }}
    >
      <div className="w-full min-h-screen flex justify-center items-center flex-col p-8 relative">
        <div className="contact-links flex flex-col items-center gap-4 text-xl" style={{ fontFamily: "var(--font-title)", position: "relative", zIndex: 1000 }}>
          <a
            href="mailto:hello@khinemyaezin.com?subject=Hi%20there!"
            target="_blank"
            className="magnetic-link inline-block relative px-15 overflow-hidden transition-transform duration-200 no-underline"
            role="button"
            tabIndex={0}
            onMouseMove={(e) => onMagneticMove(e, e.currentTarget)}
            onMouseLeave={(e) => onMagneticLeave(e.currentTarget)}
            style={{ color: "inherit", margin: "0.5rem 0", willChange: "transform" }}
            aria-label="Send email"
          >
            <i className="bi bi-envelope icon absolute left-[-30px] top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none" aria-hidden="true" />
            EMAIL
          </a>
          <a
            href="https://www.linkedin.com/in/khinemyaezin/"
            target="_blank"
            className="magnetic-link inline-block relative px-15 overflow-hidden transition-transform duration-200 no-underline"
            role="button"
            tabIndex={0}
            onMouseMove={(e) => onMagneticMove(e, e.currentTarget)}
            onMouseLeave={(e) => onMagneticLeave(e.currentTarget)}
            style={{ color: "inherit", margin: "0.5rem 0", willChange: "transform" }}
            aria-label="LinkedIn profile"
          >
            <i className="bi bi-linkedin icon absolute left-[-30px] top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none" aria-hidden="true" />
            LINKEDIN
          </a>
          <a
            href="https://github.com/khinemyaezin"
            target="_blank"
            className="magnetic-link inline-block relative px-15 overflow-hidden transition-transform duration-200 no-underline"
            role="button"
            tabIndex={0}
            onMouseMove={(e) => onMagneticMove(e, e.currentTarget)}
            onMouseLeave={(e) => onMagneticLeave(e.currentTarget)}
            style={{ color: "inherit", margin: "0.5rem 0", willChange: "transform" }}
            aria-label="GitHub profile"
          >
            <i className="bi bi-github icon absolute left-[-30px] top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none" aria-hidden="true" />
            GITHUB
          </a>
        </div>

        <footer className="absolute bottom-0 w-full z-[1101] pointer-events-auto text-center text-sm p-4">
          <div className="flex flex-col justify-center items-center gap-3">
            <a
              href="https://khinemyaezin.com/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-link no-underline inline-block relative z-[1102] transition-all duration-300"
              aria-label="Download Resume"
              style={{
                border: "2px solid currentColor",
                padding: "0.5rem 1.5rem",
                borderRadius: "0.5rem",
                color: "inherit",
              }}
            >
              <i className="bi bi-file-earmark-arrow-down mr-1" aria-hidden="true" /> Resume
            </a>
            <p className="text-center mb-0" style={{ color: "#d1d5db" }}>
              ©{currentYear} khinemyaezin
            </p>
          </div>
        </footer>
      </div>

      <style>{`
        .contact-links a:hover,
        .contact-links a:active {
          text-decoration: line-through;
        }
        .contact-links a:hover .icon,
        .contact-links a:active .icon {
          left: 20px;
          animation: iconBounce 0.5s ease;
        }
        .resume-link:hover {
          color: var(--color-primary) !important;
          border-color: var(--color-primary) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(137, 247, 254, 0.3);
        }
        @media (max-width: 768px) {
          #contact > div {
            justify-content: flex-start;
            padding-bottom: calc(2rem + env(safe-area-inset-bottom));
          }
          #contact footer {
            position: static;
            margin-top: 1rem;
            padding-bottom: calc(1rem + env(safe-area-inset-bottom));
          }
        }
      `}</style>
    </section>
  );
});

export default Contact;
