import { useRef, useEffect, useMemo } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface TitleProps {
  message: string;
}

export default function Title({ message }: TitleProps) {
  const [sectionRef, isVisible] = useIntersectionObserver();
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const texts = useMemo(() => [...message.split(',').map((t) => t.trim()), ''], [message]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    section.style.height = `${texts.length * 100}vh`;
  }, [sectionRef, texts.length]);

  useEffect(() => {
    if (!isVisible) return;

    const section = sectionRef.current;
    if (!section) return;

    let animationFrameId: number | null = null;

    const animate = () => {
      const rect = section.getBoundingClientRect();
      const scrolledDistanceFromTop = Math.max(0, rect.bottom - window.innerHeight);
      const totalHeight = rect.height - window.innerHeight;
      const scrolledPercentage =
        totalHeight === 0
          ? 0
          : Math.floor(100 - (scrolledDistanceFromTop / totalHeight) * 100);
      const activeIndex =
        scrolledPercentage === 0
          ? scrolledPercentage
          : Math.floor((scrolledPercentage / 100) * texts.length);

      wordsRef.current.forEach((word, index) => {
        if (!word) return;
        if (index === activeIndex) {
          word.classList.add('active');
        } else {
          word.classList.remove('active');
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, sectionRef, texts.length]);

  return (
    <section id="title__section" ref={sectionRef}>
      <div className="title__sticky">
        {texts.map((t, index) => (
          <span
            key={index}
            className="rw-word"
            ref={(el: HTMLSpanElement | null) => {
              wordsRef.current[index] = el;
            }}
          >
            <h2 className="rw-sentence">{t}</h2>
          </span>
        ))}
      </div>
    </section>
  );
}
