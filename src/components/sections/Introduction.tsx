import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const LEFT_TEXT = 'Khine';
const RIGHT_TEXT = 'Myae';

export default function Introduction() {
  const [sectionRef, isVisible] = useIntersectionObserver();
  const heroRef = useRef<HTMLDivElement>(null);
  const textHeaderLeftRef = useRef<HTMLDivElement>(null);
  const textHeaderRightRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    let animationFrameId: number | null = null;

    const animate = () => {
      const section = sectionRef.current;
      const hero = heroRef.current;
      const leftEl = textHeaderLeftRef.current;
      const rightEl = textHeaderRightRef.current;
      const footer = footerRef.current;
      if (!section || !hero || !leftEl || !rightEl || !footer) return;

      const { bottom } = section.getBoundingClientRect();
      let textTrans = Math.max(0, bottom - window.innerHeight);
      const minScroll = 20;
      const maxSpacing = 100;
      const minSpacing = 0;

      textTrans = textTrans < minScroll ? minScroll : textTrans;

      const spacing = Math.max(minSpacing, (textTrans / window.innerHeight) * maxSpacing);

      leftEl.querySelectorAll('span').forEach((char, index) => {
        const px = -textTrans + index * spacing;
        char.style.transform = `translateX(${px}px)`;
        if (textTrans === minScroll) {
          char.classList.add('gradient-text', 'animate');
        } else {
          char.classList.remove('gradient-text', 'animate');
        }
      });

      rightEl.querySelectorAll('span').forEach((char, index) => {
        const px = textTrans + index * spacing;
        char.style.transform = `translateX(${px}px)`;
        if (textTrans === minScroll) {
          char.classList.add('gradient-text', 'animate');
        } else {
          char.classList.remove('gradient-text', 'animate');
        }
      });

      if (textTrans === minScroll) {
        hero.classList.add('door-closed');
      } else {
        hero.classList.remove('door-closed');
      }

      if (textTrans > 20) {
        footer.classList.remove('show');
      } else {
        footer.classList.add('show');
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, sectionRef]);

  return (
    <section id="media" ref={sectionRef}>
      <div className="shim"></div>
      <div className="scroll__sticky">
        <div className="media__wrapper gap-4">
          <div className="text__overlay" ref={heroRef}>
            <div className="text__header__left" ref={textHeaderLeftRef}>
              {LEFT_TEXT.split('').map((char, i) => (
                <span key={i}>{char}</span>
              ))}
            </div>
            <div className="text__header__right" ref={textHeaderRightRef}>
              {RIGHT_TEXT.split('').map((char, i) => (
                <span key={i}>{char}</span>
              ))}
            </div>
          </div>
          <div className="footer__container fade-in" ref={footerRef}>
            <div className="footer__text text-center">
              <h4>
                A Software Engineer
              
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
