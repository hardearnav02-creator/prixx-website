// src/hooks/useParallax.ts
// Calculates subtle physics parallax offsets based on mouse movement and scroll depth.

import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useParallax(speed = 0.05, maxOffset = 20) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();
  const targetOffset = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;

      targetOffset.current = {
        x: normX * maxOffset * speed * 20,
        y: normY * maxOffset * speed * 20
      };
    };

    const loop = () => {
      currentOffset.current.x += (targetOffset.current.x - currentOffset.current.x) * 0.08;
      currentOffset.current.y += (targetOffset.current.y - currentOffset.current.y) * 0.08;

      setOffset({
        x: Math.round(currentOffset.current.x * 10) / 10,
        y: Math.round(currentOffset.current.y * 10) / 10
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed, maxOffset, reducedMotion]);

  return offset;
}
