"use client";

import { useEffect, useRef, useCallback, RefObject } from "react";

type ScrollHandler = (scrollTop: number, scrollHeight: number, clientHeight: number) => void;

interface ScrollObserver {
  ref: RefObject<HTMLElement | null>;
  handler: ScrollHandler;
  throttle?: number;
}

const observers = new Map<string, ScrollObserver>();
let mainElement: HTMLElement | null = null;
let isListenerAttached = false;
let animationFrameId: number | null = null;

function handleGlobalScroll() {
  if (animationFrameId) return;
  
  animationFrameId = requestAnimationFrame(() => {
    if (!mainElement) return;
    
    const { scrollTop, scrollHeight, clientHeight } = mainElement;
    
    observers.forEach((observer) => {
      const element = observer.ref.current;
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        observer.handler(scrollTop, scrollHeight, clientHeight);
      }
    });
    
    animationFrameId = null;
  });
}

export function useScrollHandler(
  id: string,
  ref: RefObject<HTMLElement | null>,
  handler: ScrollHandler,
  throttle: number = 0
) {
  const handlerRef = useRef(handler);
  const throttleRef = useRef(throttle);
  const lastCallRef = useRef(0);
  
  useEffect(() => {
    handlerRef.current = handler;
    throttleRef.current = throttle;
  }, [handler, throttle]);

  const throttledHandler = useCallback((scrollTop: number, scrollHeight: number, clientHeight: number) => {
    const now = Date.now();
    if (throttleRef.current && now - lastCallRef.current < throttleRef.current) return;
    lastCallRef.current = now;
    handlerRef.current(scrollTop, scrollHeight, clientHeight);
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const mainEl = ref.current.closest("main");
    if (!mainEl) return;

    if (!mainElement) {
      mainElement = mainEl;
    }

    observers.set(id, {
      ref,
      handler: throttledHandler,
    });

    if (!isListenerAttached && mainElement) {
      mainElement.addEventListener("scroll", handleGlobalScroll, { passive: true });
      isListenerAttached = true;
    }

    return () => {
      observers.delete(id);
      
      if (observers.size === 0 && mainElement) {
        mainElement.removeEventListener("scroll", handleGlobalScroll);
        isListenerAttached = false;
        mainElement = null;
      }
    };
  }, [id, ref, throttledHandler]);
}

export function useScrollPosition(ref: RefObject<HTMLElement | null>) {
  const positionRef = useRef({ top: 0, bottom: 0, progress: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const mainEl = ref.current.closest("main");
    if (!mainEl) return;

    const updatePosition = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      positionRef.current = {
        top: rect.top,
        bottom: rect.bottom,
        progress: Math.max(0, Math.min(1, 
          (mainEl!.scrollTop - (rect.top + mainEl!.scrollTop - mainEl!.clientHeight)) / 
          (rect.height - mainEl!.clientHeight)
        )),
      };
    };

    mainEl.addEventListener("scroll", updatePosition, { passive: true });
    updatePosition();

    return () => {
      mainEl.removeEventListener("scroll", updatePosition);
    };
  }, [ref]);

  return positionRef;
}
