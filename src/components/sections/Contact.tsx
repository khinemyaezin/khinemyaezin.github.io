import { useRef } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';

export default function Contact() {
  const emailLinkRef = useRef<HTMLAnchorElement>(null);
  const linkedinLinkRef = useRef<HTMLAnchorElement>(null);
  const githubLinkRef = useRef<HTMLAnchorElement>(null);

  useMagnetic(emailLinkRef);
  useMagnetic(linkedinLinkRef);
  useMagnetic(githubLinkRef);

  const today = new Date();

  return (
    <section id="contact">
      <div className="contact__container">
        <div className="contact-links">
          <a
            ref={emailLinkRef}
            href="mailto:hello@khinemyaezin.com?subject=Hi%20there!"
            target="_blank"
            rel="noopener noreferrer"
            className="link-6 magnetic-link"
            role="button"
            tabIndex={0}
          >
            <i className="bi bi-envelope icon"></i>
            EMAIL
          </a>
          <a
            ref={linkedinLinkRef}
            href="https://www.linkedin.com/in/khinemyaezin/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-6 magnetic-link"
            role="button"
            tabIndex={0}
          >
            <i className="bi bi-linkedin icon"></i>
            LINKEDIN
          </a>
          <a
            ref={githubLinkRef}
            href="https://github.com/khinemyaezin"
            target="_blank"
            rel="noopener noreferrer"
            className="link-6 magnetic-link"
            role="button"
            tabIndex={0}
          >
            <i className="bi bi-github icon"></i>
            GITHUB
          </a>
        </div>
        <footer className="position-absolute bottom-0 w-100">
          <div className="d-flex flex-column justify-content-center gap-3 align-items-center">
            <a
              href="https://khinemyaezin.com/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-link text-decoration-none"
              aria-label="Download Resume"
            >
              <i className="bi bi-file-earmark-arrow-down"></i> Resume
            </a>
            <p className="text-center mb-0">©{today.getFullYear()} khinemyaezin</p>
          </div>
        </footer>
      </div>
    </section>
  );
}
