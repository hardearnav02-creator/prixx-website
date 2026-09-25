// src/hooks/usePointerPosition.ts
// Tracks global pointer position, velocity, and normalized [-1, 1] screen coordinates.

import { useState, useEffect } from 'react';

export interface PointerState {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
  velocityX: number;
  velocityY: number;
}

export function usePointerPosition() {
  const [pointer, setPointer] = useState<PointerState>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    velocityX: 0,
    velocityY: 0
  });

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastTime = performance.now();

    const handlePointerMove = (e: PointerEvent) => {
      const currentTime = performance.now();
      const dt = Math.max((currentTime - lastTime) / 1000, 0.001);

      const vx = (e.clientX - lastX) / dt;
      const vy = (e.clientY - lastY) / dt;

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = currentTime;

      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      setPointer({
        x: e.clientX,
        y: e.clientY,
        normalizedX: normX,
        normalizedY: normY,
        velocityX: vx,
        velocityY: vy
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return pointer;
}
