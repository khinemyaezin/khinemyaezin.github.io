import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import TextReveal from '@/components/ui/TextReveal';

export default function Hero() {
  const [sectionRef, isVisible] = useIntersectionObserver();

  return (
    <section
      id="hero"
      className="relative flex h-full w-full flex-col items-center"
      ref={sectionRef}
    >
      <div className="flex h-full w-full max-w-none flex-col items-center justify-center gap-20">
        <div className="overflow-hidden">
          <h1 className="overflow-hidden font-title text-[clamp(2rem,15cqi,20rem)] leading-none [&>span]:inline-block [&>span]:[transition:all_0.5s_ease]">
            <TextReveal text="HELLO" isVisible={isVisible} />
          </h1>
        </div>
      </div>
    </section>
  );
}
