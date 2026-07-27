"use client";

import { useRef, memo } from "react";
import { useIntersection } from "@/hooks/useIntersection";

const HERO_TEXT = "HELLO";

const Hi = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersection(sectionRef);
  const chars = HERO_TEXT.split("");

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center h-full w-full">
      <div className="h-full w-full max-w-[var(--max-width)] flex justify-center items-center flex-col gap-20">
        <div className="overflow-hidden">
          <h1 className="flex font-[family-name:var(--font-title)] text-[clamp(2rem,15cqi,20rem)]">
            {chars.map((char, i) => (
              <span
                key={i}
                style={{ "--i": i } as React.CSSProperties}
                className={`inline-block transition-transform duration-500 ease-out delay-[calc(var(--i)*50ms)] ${isVisible ? "translate-y-0" : "translate-y-[110%]"
                  }`}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </section>
  );
});

export default Hi;