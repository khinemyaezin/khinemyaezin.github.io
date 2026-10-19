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
    <section id="contact" className="relative flex min-h-screen w-full items-center justify-center bg-gray-900">
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-8 max-md:justify-start max-md:pb-[calc(2rem+env(safe-area-inset-bottom))]">
        <div className="relative z-[1000] flex flex-col gap-[1.2em] my-8 text-[1.7em] text-center font-title">
          <a
            ref={emailLinkRef}
            href="mailto:hello@khinemyaezin.com?subject=Hi%20there!"
            target="_blank"
            rel="noopener noreferrer"
            className="link-6 magnetic-link group relative inline-block my-2 cursor-pointer overflow-hidden px-[60px] touch-manipulation will-change-transform no-underline text-inherit [-webkit-tap-highlight-color:transparent] [transition:transform_0.2s_cubic-bezier(0.175,0.885,0.32,1.275),text-decoration_0.3s_ease] hover:line-through active:line-through"
            role="button"
            tabIndex={0}
          >
            <Mail className="group-hover:animate-icon-bounce absolute -left-[30px] top-1/2 h-[1em] w-[1em] -translate-y-1/2 pointer-events-none transition-all duration-300 [transition-timing-function:ease] group-hover:left-5 group-active:left-5 icon" />
            EMAIL
          </a>
          <a
            ref={linkedinLinkRef}
            href="https://www.linkedin.com/in/khinemyaezin/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-6 magnetic-link group relative inline-block my-2 cursor-pointer overflow-hidden px-[60px] touch-manipulation will-change-transform no-underline text-inherit [-webkit-tap-highlight-color:transparent] [transition:transform_0.2s_cubic-bezier(0.175,0.885,0.32,1.275),text-decoration_0.3s_ease] hover:line-through active:line-through"
            role="button"
            tabIndex={0}
          >
            <Linkedin className="group-hover:animate-icon-bounce absolute -left-[30px] top-1/2 h-[1em] w-[1em] -translate-y-1/2 pointer-events-none transition-all duration-300 [transition-timing-function:ease] group-hover:left-5 group-active:left-5 icon" />
            LINKEDIN
          </a>
          <a
            ref={githubLinkRef}
            href="https://github.com/khinemyaezin"
            target="_blank"
            rel="noopener noreferrer"
            className="link-6 magnetic-link group relative inline-block my-2 cursor-pointer overflow-hidden px-[60px] touch-manipulation will-change-transform no-underline text-inherit [-webkit-tap-highlight-color:transparent] [transition:transform_0.2s_cubic-bezier(0.175,0.885,0.32,1.275),text-decoration_0.3s_ease] hover:line-through active:line-through"
            role="button"
            tabIndex={0}
          >
            <Github className="group-hover:animate-icon-bounce absolute -left-[30px] top-1/2 h-[1em] w-[1em] -translate-y-1/2 pointer-events-none transition-all duration-300 [transition-timing-function:ease] group-hover:left-5 group-active:left-5 icon" />
            GITHUB
          </a>
        </div>
        <footer className="absolute bottom-4 left-0 right-0 w-full z-[1101] pointer-events-auto p-4 text-center text-[0.9rem] max-md:static max-md:mt-4 max-md:pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <div className="flex flex-col justify-center gap-4 items-center">
            <a
              href="https://khinemyaezin.com/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-[1102] inline-block touch-manipulation rounded-lg border-2 border-current px-6 py-2 transition-all duration-300 [transition-timing-function:ease] no-underline text-inherit [-webkit-tap-highlight-color:transparent] hover:border-primary hover:shadow-[0_4px_12px_rgba(137,247,254,0.3)] hover:text-primary hover:-translate-y-0.5 resume-link"
              aria-label="Download Resume"
            >
              <FileDown className="inline-block h-3.5 w-3.5" /> Resume
            </a>
            <p className="m-0 text-center text-gray-300">©{today.getFullYear()} khinemyaezin</p>
          </div>
        </footer>
      </div>
    </section>
  );
}
