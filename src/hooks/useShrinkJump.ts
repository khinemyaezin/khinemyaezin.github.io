"use client";

import { useEffect, useRef, useCallback, RefObject } from "react";

export function useShrinkJump(
  ref: RefObject<HTMLElement | null>,
  trigger: boolean,
  text: string,
  delay: number = 0
) {
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const timeoutsRef = useRef<number[]>([]);

  const setCharRef = useCallback((index: number, el: HTMLSpanElement | null) => {
    if (el) {
      charsRef.current[index] = el;
    }
  }, []);

  useEffect(() => {
    if (!trigger) return;

    const chars = charsRef.current;
    
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];

    const activateSpans = () => {
      chars.forEach((span, index) => {
        if (!span) return;
        const timeoutId = window.setTimeout(() => {
          span.classList.add("active");
        }, (index + 1) * 50);
        timeoutsRef.current.push(timeoutId);
      });
    };

    const initialDelay = window.setTimeout(activateSpans, delay * chars.length * 100);
    timeoutsRef.current.push(initialDelay);

    return () => {
      timeoutsRef.current.forEach((id) => clearTimeout(id));
    };
  }, [trigger, delay, text]);

  return { setCharRef, chars: text.split("") };
}
