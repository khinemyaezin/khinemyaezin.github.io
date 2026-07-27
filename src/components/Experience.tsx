"use client";

import { useRef, useEffect, useCallback } from "react";
import { useIntersection } from "@/hooks/useIntersection";
import { useTextReveal } from "@/hooks/useTextReveal";
import { useScrollHandler } from "@/hooks/useScrollHandler";
import experienceData from "@/data/experience.json";
import type { ExperiencePost } from "@/types";

const TITLE_TEXT = "EXPERIENCE";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const expPostsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isVisible = useIntersection(sectionRef);
  const { setCharRef, chars } = useTextReveal(isVisible, TITLE_TEXT);

  const posts: ExperiencePost[] = experienceData.expPosts;

  const setScrollHeight = useCallback(() => {
    if (!sectionRef.current) return;
    sectionRef.current.style.height = `${(posts.length * 100) + 50}%`;
  }, [posts.length]);

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      const visiblePosts = expPostsRef.current.filter(
        (post) => post && post.getBoundingClientRect().top < window.innerHeight * 0.5
      );

      visiblePosts.forEach((post, index) => {
        if (!post) return;
        const nextEl = expPostsRef.current[index + 1];
        const minPercentage = window.innerHeight * 0.6;

        post.classList.remove("inactive");

        if (nextEl && nextEl.getBoundingClientRect().top < minPercentage) {
          post.classList.add("inactive");
          nextEl.classList.remove("inactive");
        } else if (nextEl) {
          nextEl.classList.add("inactive");
        }
      });
    });
  }, []);

  useEffect(() => {
    setScrollHeight();
  }, [setScrollHeight]);

  useScrollHandler("experience", sectionRef, handleScroll, 100);

  return (
    <section
      id="exp"
      ref={sectionRef}
      className="h-full w-full flex flex-col items-center"
    >
      <div className="exp-hero w-full flex justify-center items-center sticky top-0 overflow-hidden h-1/2">
        <h2 className="text-reveal">
          {chars.map((char, i) => (
            <span
              key={i}
              ref={(el) => setCharRef(i, el)}
              style={{
                display: "inline-block",
                transform: "translateY(110%)",
                transition: "0.5s",
              }}
            >
              {char}
            </span>
          ))}
        </h2>
      </div>

      {posts.map((post, index) => (
        <div
          key={index}
          ref={(el) => { expPostsRef.current[index] = el; }}
          className="exp-post w-full flex justify-center items-center sticky top-0 overflow-hidden h-1/2"
        >
          <div className="post relative w-[90vw] h-full p-4 flex flex-col justify-center items-center" style={{ backdropFilter: "blur(10px)", willChange: "transform" }}>
            <div className="post-container overflow-hidden relative w-full flex flex-col justify-center items-center transition-transform duration-200 ease-out">
              <div className="post-body" style={{ maxWidth: "90%" }}>
                <h4 className="title mb-3" style={{ fontFamily: "var(--font-title)", textTransform: "uppercase", fontSize: "clamp(2rem, 4cqi, 10rem)" }}>
                  <span className="gradient-text">{post.title}</span>
                </h4>
                <div className="mb-3">
                  <h5 className="flex gap-2 location" style={{ color: "#9ca3af", fontFamily: "Ubuntu Mono, monospace", fontSize: "0.875rem" }}>
                    <span>{post.company}</span>
                    <span>{post.duration}</span>
                  </h5>
                </div>
                <div className="seperator-wrapper flex justify-start">
                  <div className="seperator mb-2.5 w-[35px] h-[3px] border-none" style={{ background: "var(--color-secondary)" }} />
                </div>
                <div className="post-grid flex flex-col">
                  <div className="post-grid-item">
                    <p className="text-base">{post.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <style>{`
        .exp-post {
          background-color: #111827;
          transition: background-color 0.2s ease-out;
        }
        .exp-post.inactive {
          background-color: var(--color-background);
          color: #6b7280 !important;
          backdrop-filter: none;
        }
        .exp-post.inactive .post-container {
          transform: scale(0.8);
        }
        .exp-post.inactive .gradient-text {
          color: var(--color-disabled) !important;
        }
        .exp-post:nth-of-type(2n) {
          justify-content: flex-end;
        }
        .exp-post:nth-of-type(2n) .title {
          text-align: right;
        }
        .exp-post:nth-of-type(2n) h5 {
          justify-content: flex-end;
        }
        .exp-post:nth-of-type(2n) .seperator-wrapper {
          justify-content: flex-end;
        }
        .exp-post:nth-of-type(2n) p {
          text-align: right;
        }
        .exp-post:nth-of-type(1n) {
          justify-content: flex-start;
        }
        .exp-post:nth-of-type(1n) .title {
          text-align: left;
        }
        .exp-post:nth-of-type(1n) h5 {
          justify-content: flex-start;
        }
        .exp-post:nth-of-type(1n) .seperator-wrapper {
          justify-content: flex-start;
        }
        .exp-post:nth-of-type(1n) p {
          text-align: left;
        }
        @media (min-width: 576px) {
          .post-body { width: 80%; }
        }
        @media (min-width: 992px) {
          .post-body { width: 70%; }
        }
        @media (max-width: 575.98px) {
          .post-body { width: 90%; }
        }
      `}</style>
    </section>
  );
}
