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
    <section id="exp" ref={sectionRef}>
      <div className="exp__hero">
        <h2 className="text__reveal">
          <TextReveal text="TIMELINE" isVisible={isVisible} />
        </h2>
      </div>
      {experienceData.expPosts.map((post, index) => (
        <div
          key={index}
          className="exp__post"
          ref={(el: HTMLDivElement | null) => {
            expPostsRefs.current[index] = el;
          }}
        >
          <div className="post">
            <div className="post__container">
              <div className="post__body">
                <h4 className="title mb-3">
                  <span className="gradient-text">{post.title}</span>
                </h4>
                <div className="mb-3">
                  <h5 className="d-flex gap-2 location">
                    <span>{post.company}</span>
                    <span>{post.duration}</span>
                  </h5>
                </div>
                <div className="seperator-wrapper">
                  <div className="seperator"></div>
                </div>
                <div className="post__grid">
                  <div className="post__grid__item">
                    <p className="fs-6">{post.desc}</p>
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
