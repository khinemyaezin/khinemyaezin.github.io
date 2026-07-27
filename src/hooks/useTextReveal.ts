"use client";

import { useEffect, useRef, useCallback, RefObject } from "react";

export function useTextReveal(
  isVisible: boolean,
  text: string
) {
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const timeoutsRef = useRef<number[]>([]);

  const setCharRef = useCallback((index: number, el: HTMLSpanElement | null) => {
    if (el) {
      charsRef.current[index] = el;
    }
  }, []);

  useEffect(() => {
    const chars = charsRef.current;
    
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];

    chars.forEach((span, i) => {
      if (!span) return;
      if (isVisible) {
        const timeoutId = window.setTimeout(() => {
          span.style.transform = "translateY(0)";
        }, (i + 1) * 50);
        timeoutsRef.current.push(timeoutId);
      } else {
        span.style.transform = "translateY(110%)";
      }
    });

    return () => {
      timeoutsRef.current.forEach((id) => clearTimeout(id));
    };
  }, [isVisible, text]);

  return { setCharRef, chars: text.split("") };
}
