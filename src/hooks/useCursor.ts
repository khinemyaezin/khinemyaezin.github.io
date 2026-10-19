import { useEffect } from 'react';

export function useCursor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cursor = document.createElement('div');
    const trail = document.createElement('div');

    cursor.className = 'custom-cursor';
    trail.className = 'cursor-trail';

    document.body.appendChild(cursor);
    document.body.appendChild(trail);

    let cursorX = 0;
    let cursorY = 0;
    let trailX = 0;
    let trailY = 0;
    let animationFrameId: number | null = null;

    const onMouseMove = (event: MouseEvent) => {
      cursorX = event.clientX;
      cursorY = event.clientY;

      const target = event.target as HTMLElement;
      const isHovering = target.closest('a, button, [role="button"]') !== null;
      cursor.classList.toggle('cursor-hover', isHovering);

      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
    };

    const animateCursor = () => {
      trailX += (cursorX - trailX) * 0.15;
      trailY += (cursorY - trailY) * 0.15;

      trail.style.left = `${trailX}px`;
      trail.style.top = `${trailY}px`;

      animationFrameId = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', onMouseMove);
    animateCursor();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      cursor.remove();
      trail.remove();
    };
  }, []);
}
