// src/hooks/useSpringDrag.ts
// Physical spring drag hook with momentum, friction, boundaries, and snap settling.

import { useState, useRef, useCallback } from 'react';

export interface SpringDragOptions {
  stiffness?: number;
  damping?: number;
  mass?: number;
  snapThreshold?: number;
  friction?: number;
}

export function useSpringDrag(options: SpringDragOptions = {}) {
  const {
    stiffness = 180,
    damping = 24,
    mass = 1,
    friction = 0.92
  } = options;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const velocityRef = useRef({ x: 0, y: 0 });
  const startPointerRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const startDrag = useCallback((clientX: number, clientY: number) => {
    setIsDragging(true);
    startPointerRef.current = { x: clientX, y: clientY };
    startPosRef.current = { ...position };
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, [position]);

  const updateDrag = useCallback((clientX: number, clientY: number) => {
    if (!isDragging) return;
    const dx = clientX - startPointerRef.current.x;
    const dy = clientY - startPointerRef.current.y;

    const newX = startPosRef.current.x + dx;
    const newY = startPosRef.current.y + dy;

    velocityRef.current = {
      x: (newX - position.x) * 12,
      y: (newY - position.y) * 12
    };

    setPosition({ x: newX, y: newY });
  }, [isDragging, position]);

  const endDrag = useCallback(() => {
    setIsDragging(false);

    // Inertia and spring back to rest
    let currentX = position.x;
    let currentY = position.y;
    let vx = velocityRef.current.x * 0.4;
    let vy = velocityRef.current.y * 0.4;

    const animateInertia = () => {
      // Spring force toward 0,0 rest position
      const fx = -stiffness * currentX / 500;
      const fy = -stiffness * currentY / 500;

      const ax = fx / mass;
      const ay = fy / mass;

      vx = (vx + ax) * friction;
      vy = (vy + ay) * friction;

      currentX += vx * (1 - damping / 100);
      currentY += vy * (1 - damping / 100);

      setPosition({ x: currentX, y: currentY });

      if (Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1 || Math.abs(currentX) > 0.5 || Math.abs(currentY) > 0.5) {
        rafRef.current = requestAnimationFrame(animateInertia);
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    rafRef.current = requestAnimationFrame(animateInertia);
  }, [position, stiffness, damping, mass, friction]);

  return {
    position,
    isDragging,
    startDrag,
    updateDrag,
    endDrag,
    resetPosition: () => setPosition({ x: 0, y: 0 })
  };
}
