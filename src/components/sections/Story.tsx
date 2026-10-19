import { useRef, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import storyData from '@/data/story.data.json';

export default function Story() {
  const [sectionRef, isVisible] = useIntersectionObserver();
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentsRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (!isVisible) return;

    let animationFrameId: number | null = null;

    const animate = () => {
      const section = sectionRef.current;
      const media = mediaRef.current;
      if (!section || !media) return;

      const { bottom } = section.getBoundingClientRect();

      let scale = 1 - (bottom - window.innerHeight) * 0.0005;
      scale = scale < 0.2 ? 0.2 : scale > 1 ? 1 : scale;

      let rotate = 1 - (bottom - window.innerHeight) * 0.05;
      rotate = rotate < 0 ? rotate : 0;

      media.style.transform = `scale(${scale}) rotate(${rotate}deg)`;

      const scrollPercentage = Math.max(
        0,
        ((bottom - window.innerHeight) / window.innerHeight) * 100
      );
      const thresholds = [100, 70, 50];

      contentsRefs.current.forEach((content, index) => {
        if (!content) return;
        if (scrollPercentage < thresholds[index]) {
          content.classList.add('show');
        } else {
          content.classList.remove('show');
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, sectionRef]);

  return (
    <section id="about" ref={sectionRef}>
      <div className="scroll__sticky">
        <div className="wrapper py-12">
          <div className="flex mb-12">
            <div className="profile-wrapper gradient-bg-base animate" ref={mediaRef}>
              <img
                src={`${import.meta.env.BASE_URL}${storyData.profileImage}`}
                className="profile-img"
                alt="Profile"
              />
            </div>
          </div>
          <div className="content">
            {storyData.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={paragraph.classes}
                ref={(el: HTMLParagraphElement | null) => {
                  contentsRefs.current[index] = el;
                }}
                dangerouslySetInnerHTML={{ __html: paragraph.text }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
