"use client";

import { useRef, useCallback, memo } from "react";
import { useScrollHandler } from "@/hooks/useScrollHandler";
import { INTRODUCTION_CONFIG } from "@/config/animations";

const LEFT_TEXT_CHARS = "Khine".split("");
const RIGHT_TEXT_CHARS = "Myae".split("");

const Introduction = memo(()=> {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const leftCharsRef = useRef<HTMLSpanElement[]>([]);
  const rightCharsRef = useRef<HTMLSpanElement[]>([]);

  const isDoorClosedRef = useRef(false);
  const isFooterShownRef = useRef(false);
  const isGradientActiveRef = useRef<Record<number, boolean>>({});

  const setLeftCharRef = useCallback((index: number, el: HTMLSpanElement | null) => {
    if (el) leftCharsRef.current[index] = el;
  }, []);

  const setRightCharRef = useCallback((index: number, el: HTMLSpanElement | null) => {
    if (el) rightCharsRef.current[index] = el;
  }, []);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;
    const { bottom } = sectionRef.current.getBoundingClientRect();
    
    let textTrans = Math.max(0, bottom - window.innerHeight);
    const { minScroll, maxSpacing, minSpacing, footerThreshold } = INTRODUCTION_CONFIG;

    textTrans = textTrans < minScroll ? minScroll : textTrans;
    const isAtMinScroll = textTrans === minScroll;

    requestAnimationFrame(() => {
      leftCharsRef.current.forEach((char, index) => {
        if (!char) return;
        const spacing = Math.max(minSpacing, (textTrans / window.innerHeight) * maxSpacing);
        const px = -textTrans + index * spacing;
        char.style.transform = `translateX(${px}px)`;

        if (isAtMinScroll !== isGradientActiveRef.current[index]) {
          isGradientActiveRef.current[index] = isAtMinScroll;
          char.classList.toggle("gradient-text", isAtMinScroll);
          char.classList.toggle("animate", isAtMinScroll);
        }
      });

      rightCharsRef.current.forEach((char, index) => {
        if (!char) return;
        const spacing = Math.max(minSpacing, (textTrans / window.innerHeight) * maxSpacing);
        const px = textTrans + index * spacing;
        char.style.transform = `translateX(${px}px)`;

        const globalIndex = index + LEFT_TEXT_CHARS.length;
        if (isAtMinScroll !== isGradientActiveRef.current[globalIndex]) {
          isGradientActiveRef.current[globalIndex] = isAtMinScroll;
          char.classList.toggle("gradient-text", isAtMinScroll);
          char.classList.toggle("animate", isAtMinScroll);
        }
      });

      if (isAtMinScroll !== isDoorClosedRef.current) {
        isDoorClosedRef.current = isAtMinScroll;
        heroRef.current?.classList.toggle("door-closed", isAtMinScroll);
      }

      const shouldShowFooter = textTrans <= footerThreshold;
      if (shouldShowFooter !== isFooterShownRef.current) {
        isFooterShownRef.current = shouldShowFooter;
        footerRef.current?.classList.toggle("show", shouldShowFooter);
      }
    });
  }, []);

  useScrollHandler("introduction", sectionRef, handleScroll);

  return (
    <section
      id="media"
      ref={sectionRef}
      className="flex justify-center h-[200%] w-full"
    >
      <div className="absolute top-0 left-0 w-full h-full z-10" />
      <div className="scroll-sticky">
        <div className="w-full h-full overflow-hidden flex flex-col justify-center gap-3">
          
          <div 
            ref={heroRef} 
            className="text-overlay group w-full flex justify-center overflow-hidden"
          >
            <div className="w-full text-right self-start font-[family-name:var(--font-hero)] text-[clamp(1rem,15cqi,20rem)] scale-80 opacity-50 transition-all duration-300 ease-out group-[.door-closed]:scale-100 group-[.door-closed]:opacity-100">
              {LEFT_TEXT_CHARS.map((char, i) => (
                <span key={i} ref={(el) => setLeftCharRef(i, el)} className="inline-block">
                  {char}
                </span>
              ))}
            </div>

            <div className="w-full text-left self-end font-[family-name:var(--font-hero)] text-[clamp(1rem,15cqi,20rem)] scale-80 opacity-50 transition-all duration-300 ease-out group-[.door-closed]:scale-100 group-[.door-closed]:opacity-100">
              {RIGHT_TEXT_CHARS.map((char, i) => (
                <span key={i} ref={(el) => setRightCharRef(i, el)} className="inline-block">
                  {char}
                </span>
              ))}
            </div>
          </div>

          <div ref={footerRef} className="fade-in footer-container flex flex-col justify-center items-center gap-3">
            <div className="footer-text text-center flex flex-row items-center justify-center font-[family-name:var(--font-hero)] uppercase">
              <h4 className="flex items-center gap-2">
                A Software Engineer &#64;
                <img 
                  src="merlion.svg" 
                  alt="Icon" 
                  className="footer-icon object-contain invert h-5 w-5 -mt-1" 
                />
              </h4>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});

export default Introduction;