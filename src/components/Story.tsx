"use client";

import { useRef, useCallback, useMemo } from "react";
import { useScrollHandler } from "@/hooks/useScrollHandler";
import { STORY_CONFIG } from "@/config/animations";
import storyData from "@/data/story.data.json";
import type { StoryData } from "@/types";

function parseHtmlToReact(html: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /<strong>(.*?)<\/strong>/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(html)) !== null) {
    if (match.index > lastIndex) {
      parts.push(html.slice(lastIndex, match.index));
    }
    parts.push(<strong key={match.index}>{match[1]}</strong>);
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < html.length) {
    parts.push(html.slice(lastIndex));
  }

  return parts;
}

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const data: StoryData = storyData;

  const parsedParagraphs = useMemo(() => 
    data.paragraphs.map(p => parseHtmlToReact(p.text)),
    [data.paragraphs]
  );

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;
    const { bottom } = sectionRef.current.getBoundingClientRect();
    
    if (mediaRef.current) {
      let scale = 1 - (bottom - window.innerHeight) * STORY_CONFIG.scaleRate;
      scale = Math.max(STORY_CONFIG.scaleMin, Math.min(STORY_CONFIG.scaleMax, scale));

      let rotate = 1 - (bottom - window.innerHeight) * STORY_CONFIG.rotateRate;
      rotate = Math.min(rotate, 0);

      mediaRef.current.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
    }

    const scrollPercentage = Math.max(0, ((bottom - window.innerHeight) / window.innerHeight) * 100);
    const { scrollThresholds } = STORY_CONFIG;

    requestAnimationFrame(() => {
      contentRefs.current.forEach((content, index) => {
        if (!content) return;
        if (scrollPercentage < scrollThresholds[index]) {
          content.classList.add("show");
        } else {
          content.classList.remove("show");
        }
      });
    });
  }, []);

  useScrollHandler("story", sectionRef, handleScroll);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full h-[200%]"
      style={{ color: "#d1d5db" }}
    >
      <div className="scroll-sticky">
        <div
          className="py-20 h-full flex flex-col justify-center"
          style={{ maxWidth: "50%", marginLeft: "auto", marginRight: "auto" }}
        >
          <div className="flex mb-20">
            <div
              ref={mediaRef}
              className="gradient-bg-base animate"
              style={{
                transform: "scale(0.5) rotate(351deg)",
                willChange: "transform",
                display: "block",
                padding: "1rem",
                borderRadius: "50%",
              }}
            >
              <img
                src={data.profileImage}
                className="profile-img"
                alt="Profile"
                style={{ height: "clamp(1rem, 10cqi, 10rem)", objectFit: "contain" }}
              />
            </div>
          </div>
          <div className="content relative">
            {data.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                ref={(el) => { contentRefs.current[index] = el; }}
                className={paragraph.classes}
                style={{ textWrap: "balance" }}
              >
                {parsedParagraphs[index]}
              </p>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 576px) {
          #about .scroll-sticky > div {
            max-width: 80% !important;
          }
        }
        @media (min-width: 992px) {
          #about .scroll-sticky > div {
            max-width: 60% !important;
          }
        }
        @media (min-width: 1200px) {
          #about .scroll-sticky > div {
            max-width: 50% !important;
          }
        }
        @media (max-width: 575.98px) {
          #about .scroll-sticky > div {
            max-width: 80% !important;
          }
        }
      `}</style>
    </section>
  );
}
