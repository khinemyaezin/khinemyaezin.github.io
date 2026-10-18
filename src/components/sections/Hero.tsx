import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import TextReveal from '@/components/ui/TextReveal';

export default function Hero() {
  const [sectionRef, isVisible] = useIntersectionObserver();

  return (
    <section id="hero" ref={sectionRef}>
      <div className="hero__container">
        <div className="hero__title">
          <h1 className="hero__title__header text__reveal">
            <TextReveal text="HELLO" isVisible={isVisible} />
          </h1>
        </div>
      </div>
    </section>
  );
}
