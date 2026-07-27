"use client";

import { useEffect, useRef } from "react";

export function useCustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const cursorX = useRef(0);
  const cursorY = useRef(0);
  const trailX = useRef(0);
  const trailY = useRef(0);
  const isHovering = useRef(false);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || window.innerWidth < 992) return;

    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);
    cursorRef.current = cursor;

    const trail = document.createElement("div");
    trail.className = "cursor-trail";
    document.body.appendChild(trail);
    trailRef.current = trail;

    const animateCursor = () => {
      trailX.current += (cursorX.current - trailX.current) * 0.15;
      trailY.current += (cursorY.current - trailY.current) * 0.15;

      if (trailRef.current) {
        trailRef.current.style.left = `${trailX.current}px`;
        trailRef.current.style.top = `${trailY.current}px`;
      }

      animationFrameId.current = requestAnimationFrame(animateCursor);
    };

    const handleMouseMove = (event: MouseEvent) => {
      cursorX.current = event.clientX;
      cursorY.current = event.clientY;

      const target = event.target as HTMLElement;
      isHovering.current = target.closest("a, button, [role='button']") !== null;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorX.current}px`;
        cursorRef.current.style.top = `${cursorY.current}px`;

        if (isHovering.current) {
          cursorRef.current.classList.add("cursor-hover");
        } else {
          cursorRef.current.classList.remove("cursor-hover");
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId.current = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      cursorRef.current?.remove();
      trailRef.current?.remove();
    };
  }, []);
}
