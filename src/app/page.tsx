"use client";

import { useRef, useState, useCallback } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useCustomCursor } from "@/hooks/useCustomCursor";
import Introduction from "@/components/Introduction";
import Story from "@/components/Story";
import Experience from "@/components/Experience";
import Title from "@/components/Title";
import ProjectWrapper from "@/components/ProjectWrapper";
import Contact from "@/components/Contact";
import Hi from "@/components/Hi";

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useCustomCursor();

  const handleScroll = useCallback((scrollTop: number) => {
    if (!mainRef.current) return;
    const scrollHeight = mainRef.current.scrollHeight - mainRef.current.clientHeight;
    setScrollProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
  }, []);

  useSmoothScroll(mainRef, handleScroll);

  const onMainScroll = (event: React.UIEvent<HTMLElement>) => {
    const element = event.target as HTMLElement;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight - element.clientHeight;
    setScrollProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
  };

  return (
    <>
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      <main
        ref={mainRef}
        className="fixed top-0 left-0 w-full h-full overflow-y-scroll"
        onScroll={onMainScroll}
      >
        <div className="relative w-full h-full">
          <Hi />
          <Introduction />
          <Story />
          <Experience />
          <Title message="STUFFS" />
          <ProjectWrapper />
          <Title message="Find me!" />
          <Contact />
        </div>
      </main>
    </>
  );
}
