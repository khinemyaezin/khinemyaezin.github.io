"use client";

import { useEffect, useRef, useCallback, RefObject } from "react";
import { SCROLL_CONFIG } from "@/config/animations";

export function useSmoothScroll(
  containerRef: RefObject<HTMLElement | null>,
  onScroll?: (scrollTop: number) => void
) {
  const stateRef = useRef({
    targetPos: 0,
    moving: false,
    lastTouchY: 0,
    isTouchStart: true,
    animationFrameId: null as number | null,
    onScroll: undefined as ((scrollTop: number) => void) | undefined,
  });

  useEffect(() => {
    stateRef.current.onScroll = onScroll;
  }, [onScroll]);

  const animate = useCallback(function animateLoop() {
    const element = containerRef.current;
    if (!element) return;

    const state = stateRef.current;
    const currentScroll = element.scrollTop;
    const delta = (state.targetPos - currentScroll) * SCROLL_CONFIG.momentumFactor;
    const newPos = currentScroll + delta / SCROLL_CONFIG.smooth;

    element.scrollTop = newPos;
    state.onScroll?.(newPos);

    if (Math.abs(delta) > SCROLL_CONFIG.minDelta) {
      state.animationFrameId = requestAnimationFrame(animateLoop);
    } else {
      state.moving = false;
    }
  }, [containerRef]);

  const startAnimation = useCallback(() => {
    const state = stateRef.current;
    if (state.moving) return;
    state.moving = true;
    state.animationFrameId = requestAnimationFrame(animate);
  }, [animate]);

  const normalizeWheelDelta = useCallback(
    (event: WheelEvent | TouchEvent): number => {
      const state = stateRef.current;
      if (event instanceof WheelEvent) {
        let wheelDelta = event.deltaY;
        switch (event.deltaMode) {
          case WheelEvent.DOM_DELTA_LINE:
            wheelDelta *= 40;
            break;
          case WheelEvent.DOM_DELTA_PAGE:
            wheelDelta *= containerRef.current?.clientHeight || 800;
            break;
        }
        return wheelDelta * (event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 0.4 : 1);
      } else if (event instanceof TouchEvent) {
        const currentTouchY = event.touches[0].clientY;
        if (state.isTouchStart) {
          state.lastTouchY = currentTouchY;
          state.isTouchStart = false;
          return 0;
        }
        const deltaY = state.lastTouchY - currentTouchY;
        state.lastTouchY = currentTouchY;
        const amplifiedDelta = deltaY * SCROLL_CONFIG.touchSensitivity;
        if (Math.abs(amplifiedDelta) < 1) return 0;
        return amplifiedDelta;
      }
      return 0;
    },
    [containerRef]
  );

  const updateTarget = useCallback(
    (delta: number) => {
      const element = containerRef.current;
      if (!element) return;
      const state = stateRef.current;
      const maxScroll = element.scrollHeight - element.clientHeight;
      state.targetPos += delta * SCROLL_CONFIG.speed;
      state.targetPos = Math.max(0, Math.min(state.targetPos, maxScroll));
    },
    [containerRef]
  );

  const reset = useCallback(() => {
    const state = stateRef.current;
    state.isTouchStart = true;
    state.lastTouchY = 0;
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = normalizeWheelDelta(e);
      updateTarget(delta);
      startAnimation();
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const delta = normalizeWheelDelta(e);
      updateTarget(delta);
      startAnimation();
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const delta = normalizeWheelDelta(e);
      updateTarget(delta);
      startAnimation();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      reset();
    };

    element.addEventListener("wheel", handleWheel, { passive: false });
    element.addEventListener("touchstart", handleTouchStart, { passive: false });
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    element.addEventListener("touchend", handleTouchEnd, { passive: false });

    const currentAnimationFrameId = stateRef.current.animationFrameId;

    return () => {
      element.removeEventListener("wheel", handleWheel);
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
      if (currentAnimationFrameId) {
        cancelAnimationFrame(currentAnimationFrameId);
      }
    };
  }, [containerRef, normalizeWheelDelta, updateTarget, startAnimation, reset]);

  return { reset };
}
