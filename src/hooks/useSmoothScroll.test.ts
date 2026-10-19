import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSmoothScroll } from './useSmoothScroll';

describe('useSmoothScroll (Lenis-style)', () => {
  let element: HTMLDivElement;

  beforeEach(() => {
    element = document.createElement('div');
    Object.defineProperty(element, 'scrollHeight', {
      configurable: true,
      value: 2000,
    });
    Object.defineProperty(element, 'clientHeight', {
      configurable: true,
      value: 800,
    });
    element.scrollTop = 0;
    document.body.appendChild(element);

    vi.useFakeTimers();
  });

  afterEach(() => {
    element.remove();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('initializes with default scroll state and getters', () => {
    const ref = { current: element };
    const { result } = renderHook(() => useSmoothScroll(ref));

    expect(result.current.getScroll()).toBe(0);
    expect(result.current.getProgress()).toBe(0);
    expect(result.current.scrollY).toBe(0);
    expect(result.current.scrollProgress).toBe(0);
    expect(typeof result.current.scrollTo).toBe('function');
    expect(typeof result.current.stop).toBe('function');
    expect(typeof result.current.start).toBe('function');
  });

  it('updates target and animates on wheel events with onScroll callback', () => {
    let rafCallback: FrameRequestCallback | null = null;
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      rafCallback = cb;
      return 1;
    });

    const ref = { current: element };
    const onScroll = vi.fn();
    renderHook(() => useSmoothScroll(ref, { onScroll, lerp: 0.1 }));

    const wheelEvent = new WheelEvent('wheel', {
      deltaY: 100,
      cancelable: true,
    });

    act(() => {
      element.dispatchEvent(wheelEvent);
    });

    expect(wheelEvent.defaultPrevented).toBe(true);

    // Run first frame
    act(() => {
      if (rafCallback) rafCallback(16);
    });

    expect(element.scrollTop).toBeGreaterThan(0);
    expect(onScroll).toHaveBeenCalledWith(
      expect.objectContaining({
        scroll: expect.any(Number),
        limit: 1200,
        direction: 1,
        progress: expect.any(Number),
      })
    );
  });

  it('handles immediate scrollTo correctly with options object', () => {
    const ref = { current: element };
    const onScroll = vi.fn();
    const { result } = renderHook(() => useSmoothScroll(ref, { onScroll }));

    act(() => {
      result.current.scrollTo(500, { immediate: true });
    });

    expect(element.scrollTop).toBe(500);
    expect(result.current.getScroll()).toBe(500);
    expect(result.current.getProgress()).toBeCloseTo((500 / 1200) * 100, 1);
    expect(onScroll).toHaveBeenCalledWith(
      expect.objectContaining({
        scroll: 500,
        limit: 1200,
      })
    );
  });

  it('leaves touch events native by default (syncTouch: false)', () => {
    const ref = { current: element };
    renderHook(() => useSmoothScroll(ref));

    const touchMoveEvent = new Event('touchmove', { cancelable: true }) as any;
    touchMoveEvent.touches = [{ clientY: 200 }];
    element.dispatchEvent(touchMoveEvent);

    // Should NOT prevent default on touch by default
    expect(touchMoveEvent.defaultPrevented).toBe(false);
  });

  it('handles touch gestures when syncTouch is enabled', () => {
    let rafCallback: FrameRequestCallback | null = null;
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      rafCallback = cb;
      return 1;
    });

    const ref = { current: element };
    renderHook(() => useSmoothScroll(ref, { syncTouch: true }));

    // Touch start
    const touchStartEvent = new Event('touchstart') as any;
    touchStartEvent.touches = [{ clientY: 300 }];
    element.dispatchEvent(touchStartEvent);

    // Touch move
    const touchMoveEvent = new Event('touchmove', { cancelable: true }) as any;
    touchMoveEvent.touches = [{ clientY: 200 }];
    element.dispatchEvent(touchMoveEvent);

    expect(touchMoveEvent.defaultPrevented).toBe(true);

    act(() => {
      if (rafCallback) rafCallback(16);
    });

    expect(element.scrollTop).toBeGreaterThan(0);
  });

  it('pauses and resumes animation with stop() and start()', () => {
    vi.spyOn(window, 'requestAnimationFrame').mockReturnValue(1);

    const ref = { current: element };
    const { result } = renderHook(() => useSmoothScroll(ref));

    act(() => {
      result.current.stop();
    });

    const wheelEvent = new WheelEvent('wheel', {
      deltaY: 100,
      cancelable: true,
    });
    element.dispatchEvent(wheelEvent);

    // When stopped, wheel event should not preventDefault or start RAF
    expect(wheelEvent.defaultPrevented).toBe(false);

    act(() => {
      result.current.start();
    });

    const wheelEvent2 = new WheelEvent('wheel', {
      deltaY: 100,
      cancelable: true,
    });
    element.dispatchEvent(wheelEvent2);
    expect(wheelEvent2.defaultPrevented).toBe(true);
  });
});
