import { useEffect, useRef, useCallback, useMemo, RefObject } from 'react';

export interface ScrollEvent {
  scroll: number;
  limit: number;
  velocity: number;
  direction: number;
  progress: number;
}

export interface SmoothScrollOptions {
  lerp?: number;
  wheelMultiplier?: number;
  syncTouch?: boolean;
  touchMultiplier?: number;
  onScroll?: (event: ScrollEvent) => void;
  onScrollChange?: (scrollY: number, progress: number) => void;
}

export interface SmoothScrollResult {
  getScroll: () => number;
  getProgress: () => number;
  scrollTo: (
    target: number | HTMLElement | string,
    immediateOrOptions?: boolean | { immediate?: boolean; offset?: number }
  ) => void;
  stop: () => void;
  start: () => void;
  scrollY: number;
  scrollProgress: number;
}

export function useSmoothScroll(
  ref: RefObject<HTMLElement | null>,
  options: SmoothScrollOptions = {}
): SmoothScrollResult {
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const targetScroll = useRef(0);
  const currentPos = useRef(0);
  const isScrolling = useRef(false);
  const isStopped = useRef(false);
  const rafId = useRef<number | null>(null);
  const lastTime = useRef<number>(0);

  const lastTouchY = useRef(0);
  const isTouchStart = useRef(true);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const emitScroll = useCallback(
    (scroll: number, velocity: number, direction: number) => {
      const el = ref.current;
      const limit = el ? Math.max(0, el.scrollHeight - el.clientHeight) : 0;
      const progress = limit > 0 ? scroll / limit : 0;

      const event: ScrollEvent = {
        scroll,
        limit,
        velocity,
        direction,
        progress,
      };

      optionsRef.current.onScroll?.(event);
      optionsRef.current.onScrollChange?.(scroll, progress * 100);
    },
    [ref]
  );

  const animate = useCallback(
    (time: number) => {
      const el = ref.current;
      if (!el || isStopped.current) return;

      const deltaTime = lastTime.current
        ? Math.min((time - lastTime.current) / 1000, 0.1)
        : 1 / 60;
      lastTime.current = time;

      const currentScroll = el.scrollTop;
      const target = targetScroll.current;
      const { lerp = 0.1 } = optionsRef.current;

      const factor = 1 - Math.pow(Math.max(0, 1 - lerp), deltaTime * 60);
      const diff = target - currentScroll;
      const nextScroll = currentScroll + diff * factor;

      const velocity = (nextScroll - currentScroll) / Math.max(deltaTime, 0.001);
      const direction = diff > 0 ? 1 : diff < 0 ? -1 : 0;

      if (Math.abs(diff) < 0.2) {
        el.scrollTop = target;
        currentPos.current = target;
        isScrolling.current = false;
        rafId.current = null;
        lastTime.current = 0;
        emitScroll(target, 0, direction);
        return;
      }

      el.scrollTop = nextScroll;
      currentPos.current = nextScroll;
      emitScroll(nextScroll, velocity, direction);

      rafId.current = requestAnimationFrame(animate);
    },
    [ref, emitScroll]
  );

  const startAnimation = useCallback(() => {
    if (isScrolling.current || isStopped.current) return;
    isScrolling.current = true;
    lastTime.current = 0;
    rafId.current = requestAnimationFrame(animate);
  }, [animate]);

  const scrollTo = useCallback(
    (
      target: number | HTMLElement | string,
      immediateOrOptions?: boolean | { immediate?: boolean; offset?: number }
    ) => {
      const el = ref.current;
      if (!el) return;

      const immediate =
        typeof immediateOrOptions === 'boolean'
          ? immediateOrOptions
          : immediateOrOptions?.immediate ?? false;

      const offset =
        typeof immediateOrOptions === 'object' && immediateOrOptions !== null
          ? immediateOrOptions.offset ?? 0
          : 0;

      let targetY = 0;

      if (typeof target === 'number') {
        targetY = target;
      } else if (typeof target === 'string') {
        const targetEl = document.querySelector(target);
        if (targetEl) {
          const elRect = el.getBoundingClientRect();
          const targetRect = targetEl.getBoundingClientRect();
          targetY = el.scrollTop + (targetRect.top - elRect.top);
        }
      } else if (target instanceof HTMLElement) {
        const elRect = el.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        targetY = el.scrollTop + (targetRect.top - elRect.top);
      }

      targetY += offset;
      const maxScroll = Math.max(0, el.scrollHeight - el.clientHeight);
      const clamped = Math.max(0, Math.min(targetY, maxScroll));

      if (immediate || prefersReducedMotion) {
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
          rafId.current = null;
        }
        isScrolling.current = false;
        el.scrollTop = clamped;
        targetScroll.current = clamped;
        currentPos.current = clamped;
        emitScroll(clamped, 0, 0);
      } else {
        targetScroll.current = clamped;
        startAnimation();
      }
    },
    [ref, startAnimation, emitScroll, prefersReducedMotion]
  );

  const stop = useCallback(() => {
    isStopped.current = true;
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    isScrolling.current = false;
  }, []);

  const start = useCallback(() => {
    isStopped.current = false;
  }, []);

  const getScroll = useCallback(() => {
    return ref.current ? ref.current.scrollTop : currentPos.current;
  }, [ref]);

  const getProgress = useCallback(() => {
    const el = ref.current;
    if (!el) return 0;
    const limit = Math.max(0, el.scrollHeight - el.clientHeight);
    return limit > 0 ? (el.scrollTop / limit) * 100 : 0;
  }, [ref]);

  const syncTouch = options.syncTouch ?? false;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    currentPos.current = el.scrollTop;
    targetScroll.current = el.scrollTop;

    const onWheel = (e: WheelEvent) => {
      if (isStopped.current || prefersReducedMotion) return;

      if (e.cancelable) {
        e.preventDefault();
      }

      let delta = e.deltaY;
      if (e.deltaMode === WheelEvent.DOM_DELTA_LINE) {
        delta *= 40;
      } else if (e.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
        delta *= el.clientHeight;
      }

      const { wheelMultiplier = 1 } = optionsRef.current;
      delta *= wheelMultiplier;

      const maxScroll = Math.max(0, el.scrollHeight - el.clientHeight);

      if (!isScrolling.current) {
        targetScroll.current = el.scrollTop;
      }

      targetScroll.current = Math.max(
        0,
        Math.min(targetScroll.current + delta, maxScroll)
      );

      startAnimation();
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        lastTouchY.current = e.touches[0].clientY;
        isTouchStart.current = false;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0 || isStopped.current) return;

      const currentTouchY = e.touches[0].clientY;
      if (isTouchStart.current) {
        lastTouchY.current = currentTouchY;
        isTouchStart.current = false;
        return;
      }

      const { touchMultiplier = 1 } = optionsRef.current;
      const deltaY = (lastTouchY.current - currentTouchY) * touchMultiplier;
      lastTouchY.current = currentTouchY;

      if (e.cancelable) {
        e.preventDefault();
      }

      const maxScroll = Math.max(0, el.scrollHeight - el.clientHeight);
      if (!isScrolling.current) {
        targetScroll.current = el.scrollTop;
      }
      targetScroll.current = Math.max(
        0,
        Math.min(targetScroll.current + deltaY, maxScroll)
      );
      startAnimation();
    };

    const onTouchEnd = () => {
      isTouchStart.current = true;
      lastTouchY.current = 0;
    };

    const onNativeScroll = () => {
      if (!isScrolling.current && ref.current) {
        targetScroll.current = ref.current.scrollTop;
        currentPos.current = ref.current.scrollTop;
        emitScroll(ref.current.scrollTop, 0, 0);
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    if (syncTouch) {
      el.addEventListener('touchstart', onTouchStart, { passive: true });
      el.addEventListener('touchmove', onTouchMove, { passive: false });
      el.addEventListener('touchend', onTouchEnd, { passive: true });
    }
    el.addEventListener('scroll', onNativeScroll, { passive: true });

    return () => {
      el.removeEventListener('wheel', onWheel);
      if (syncTouch) {
        el.removeEventListener('touchstart', onTouchStart);
        el.removeEventListener('touchmove', onTouchMove);
        el.removeEventListener('touchend', onTouchEnd);
      }
      el.removeEventListener('scroll', onNativeScroll);

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      isScrolling.current = false;
    };
  }, [ref, startAnimation, emitScroll, syncTouch, prefersReducedMotion]);

  return useMemo(
    () => ({
      getScroll,
      getProgress,
      scrollTo,
      stop,
      start,
      get scrollY() {
        return getScroll();
      },
      get scrollProgress() {
        return getProgress();
      },
    }),
    [getScroll, getProgress, scrollTo, stop, start]
  );
}
