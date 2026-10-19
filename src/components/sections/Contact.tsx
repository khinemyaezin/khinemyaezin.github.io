import { useRef } from 'react';
import { Mail, Linkedin, Github, FileDown } from 'lucide-react';
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
            <Mail className="icon" />
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
            <Linkedin className="icon" />
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
            <Github className="icon" />
            GITHUB
          </a>
        </div>
        <footer className="absolute bottom-0 w-full">
          <div className="flex flex-col justify-center gap-4 items-center">
            <a
              href="https://khinemyaezin.com/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-link no-underline"
              aria-label="Download Resume"
            >
              <FileDown className="inline-block h-3.5 w-3.5" /> Resume
            </a>
            <p className="text-center mb-0">©{today.getFullYear()} khinemyaezin</p>
          </div>
        </footer>
      </div>
    </section>
  );
}
