import { useRef, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import TextReveal from '@/components/ui/TextReveal';
import experienceData from '@/data/experience.json';

export default function Experience() {
  const [sectionRef, isVisible] = useIntersectionObserver();
  const expPostsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    section.style.height = `${experienceData.expPosts.length * 100 + 50}%`;

    const main = section.closest('main');
    if (!main) return;

    let isThrottled = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const addOverlay = () => {
      const animate = () => {
        const all = expPostsRefs.current.filter(Boolean) as HTMLDivElement[];
        const visible = all.filter(
          (post) => post.getBoundingClientRect().top < window.innerHeight * 0.5
        );

        visible.forEach((post, index) => {
          const nextEl = all[index + 1];
          const minPercentage = window.innerHeight * 0.6;
          post.classList.remove('inactive');

          if (nextEl && nextEl.getBoundingClientRect().top < minPercentage) {
            post.classList.add('inactive');
            nextEl.classList.remove('inactive');
          } else if (nextEl) {
            nextEl.classList.add('inactive');
          }
        });
      };
      requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      if (!isThrottled) {
        isThrottled = true;
        addOverlay();
        timeoutId = setTimeout(() => {
          isThrottled = false;
        }, 100);
      }
    };

    main.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      main.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [sectionRef]);

  return (
    <section id="exp" className="flex h-full w-full flex-col items-center" ref={sectionRef}>
      <div className="sticky top-0 flex h-1/2 w-full max-w-none items-center justify-center overflow-hidden">
        <h2 className="overflow-hidden font-title text-[clamp(2rem,15cqi,20rem)] leading-none [&>span]:inline-block [&>span]:[transition:all_0.5s_ease]">
          <TextReveal text="TIMELINE" isVisible={isVisible} />
        </h2>
      </div>
      {experienceData.expPosts.map((post, index) => (
        <div
          key={index}
          className="exp__post sticky top-0 flex h-1/2 w-full max-w-none items-center justify-start overflow-hidden bg-gray-900 [transition:background-color_0.2s_ease-out]"
          ref={(el: HTMLDivElement | null) => {
            expPostsRefs.current[index] = el;
          }}
        >
          <div className="relative flex h-full w-[90vw] flex-col items-center justify-center p-4 backdrop-blur-[10px] will-change-transform">
            <div className="post__container relative flex w-full flex-col items-center justify-center overflow-hidden [transition:transform_0.2s_ease-out]">
              <div className="w-[90%] sm:w-4/5 lg:w-[70%]">
                <h4 className="m-auto font-title text-[clamp(2rem,4cqi,10rem)] uppercase">
                  <span className="gradient-text">{post.title}</span>
                </h4>
                <div className="mb-4">
                  <h5 className="flex justify-start gap-2 font-primary text-[0.875rem] text-gray-500">
                    <span>{post.company}</span>
                    <span>{post.duration}</span>
                  </h5>
                </div>
                <div className="flex justify-start">
                  <div className="mb-2.5 h-[3px] w-[35px] border-none bg-secondary"></div>
                </div>
                <div className="relative mx-auto flex flex-col lg:flex-row">
                  <div className="content-center items-center">
                    <p className="text-base">{post.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
