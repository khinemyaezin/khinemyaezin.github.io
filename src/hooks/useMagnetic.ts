import { useCallback, useEffect } from 'react';

export function useMagnetic(ref: React.RefObject<HTMLElement | null>) {
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.3;
      el.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
    },
    [ref]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0, 0) scale(1)';
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, handleMouseMove, handleMouseLeave]);
}
