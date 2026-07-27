"use client";

import { useRef, useEffect, useCallback, memo } from "react";
import { useScrollHandler } from "@/hooks/useScrollHandler";

interface TitleProps {
  message: string | string[];
}

const Title = memo(function Title({ message }: TitleProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const texts: string[] =
    typeof message === "string"
      ? [...message.split(",").map((t) => t.trim()), ""]
      : Array.isArray(message)
        ? message
        : [];

  const setSectionHeight = useCallback(() => {
    if (!sectionRef.current) return;
    sectionRef.current.style.height = `${texts.length * 100}vh`;
  }, [texts.length]);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;

    requestAnimationFrame(() => {
      const sessionRect = sectionRef.current!.getBoundingClientRect();
      const scrolledDistanceFromTop = Math.max(0, sessionRect.bottom - window.innerHeight);
      const totalHeight = sessionRect.height - window.innerHeight;
      const scrolledPercentage =
        totalHeight === 0 ? 0 : Math.floor(100 - (scrolledDistanceFromTop / totalHeight) * 100);
      const activeIndex =
        scrolledPercentage === 0
          ? 0
          : Math.floor((scrolledPercentage / 100) * texts.length);

      textsRef.current.forEach((word, index) => {
        if (!word) return;
        if (index === activeIndex) {
          word.classList.add("active");
        } else {
          word.classList.remove("active");
        }
      });
    });
  }, [texts.length]);

  useEffect(() => {
    setSectionHeight();
  }, [setSectionHeight]);

  useScrollHandler("title", sectionRef, handleScroll);

  return (
    <section
      id="title-section"
      ref={sectionRef}
      className="relative w-full"
    >
      <div className="sticky top-0">
        {texts.map((t, index) => (
          <span
            key={index}
            ref={(el) => { textsRef.current[index] = el; }}
            className="rw-word inline-block opacity-0 absolute top-0 left-0 w-full h-screen transition-all duration-500 ease-in-out"
            style={{ transform: "scale(0.8)" }}
          >
            <h2
              className="rw-sentence relative w-full h-full flex justify-center items-center"
              style={{ fontFamily: "var(--font-title)", color: "#f3f4f6", fontSize: "clamp(2rem, 15cqi, 20rem)" }}
            >
              {t}
            </h2>
          </span>
        ))}
      </div>

      <style>{`
        .rw-word.active {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
    </section>
  );
});

export default Title;
