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
    <section id="media" className="flex h-[200%] w-full justify-center" ref={sectionRef}>
      <div className="absolute left-0 top-0 z-[2] h-full w-full"></div>
      <div className="sticky top-0 h-1/2 w-full">
        <div className="flex h-full w-full flex-col justify-center overflow-hidden gap-4">
          <div
            className="text__overlay flex w-full justify-center overflow-hidden"
            ref={heroRef}
          >
            <div
              className="text__header__left w-full scale-[0.8] self-start text-right font-hero text-[clamp(1rem,15cqi,20rem)] opacity-50 transition-transform duration-300 [transition-timing-function:ease] [&>span]:inline-block"
              ref={textHeaderLeftRef}
            >
              {LEFT_TEXT.split('').map((char, i) => (
                <span key={i}>{char}</span>
              ))}
            </div>
            <div
              className="text__header__right w-full scale-[0.8] self-end text-left font-hero text-[clamp(1rem,15cqi,20rem)] opacity-50 transition-transform duration-300 [transition-timing-function:ease] [&>span]:inline-block"
              ref={textHeaderRightRef}
            >
              {RIGHT_TEXT.split('').map((char, i) => (
                <span key={i}>{char}</span>
              ))}
            </div>
          </div>
          <div className="fade-in relative" ref={footerRef}>
            <div className="flex flex-row items-center justify-center text-center font-title uppercase">
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
