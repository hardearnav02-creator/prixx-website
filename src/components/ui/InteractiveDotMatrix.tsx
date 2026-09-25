// src/components/ui/InteractiveDotMatrix.tsx
// Interactive Canvas Dot-Matrix Background with Cursor Physics & Scroll Morphing.
// Dispersed ambient grid dots that react to mouse cursor,
// converging on scroll into the bold typography name "PRIXX" with orbital constellations.
// Inspired by Google Antigravity & Mind Robotics.

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  baseSize: number;
  isText: boolean;
  isRing: boolean;
  alpha: number;
  highlight: number;
  colorType: 'ruby' | 'silver' | 'amber' | 'white';
}

export const InteractiveDotMatrix = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let rafId: number;
    let particles: Particle[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const mouse = {
      x: -1000,
      y: -1000,
      active: false,
      radius: 160,
    };

    const scrollState = {
      currentProgress: 0,
      targetProgress: 0,
    };

    // 1. Generate Target Coordinates for "PRIXX" & Orbital Constellation Rings
    const generateTargets = (w: number, h: number) => {
      const offCanvas = document.createElement('canvas');
      offCanvas.width = w;
      offCanvas.height = h;
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return [];

      const fontSize = Math.min(w * 0.22, Math.max(140, h * 0.28));
      offCtx.font = `900 ${fontSize}px "Space Grotesk", "Inter", "Arial Black", sans-serif`;
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillStyle = '#FFFFFF';

      const centerX = w * 0.5;
      const centerY = h * 0.44;
      offCtx.fillText('PRIXX', centerX, centerY);

      const imgData = offCtx.getImageData(0, 0, w, h);
      const data = imgData.data;

      const textPoints: Array<{ x: number; y: number; isText: boolean; isRing: boolean }> = [];
      const densityStep = Math.max(4, Math.floor(w / 320));

      for (let y = 0; y < h; y += densityStep) {
        for (let x = 0; x < w; x += densityStep) {
          const index = (y * w + x) * 4;
          if (data[index + 3] > 110) {
            textPoints.push({
              x: x + (Math.random() - 0.5) * 2,
              y: y + (Math.random() - 0.5) * 2,
              isText: true,
              isRing: false,
            });
          }
        }
      }

      // Generate Concentric Orbital Constellation Rings around PRIXX
      const ringRadii = [fontSize * 0.7, fontSize * 1.1, fontSize * 1.5, fontSize * 2.0];
      const ringCounts = [54, 80, 110, 140];

      ringRadii.forEach((radius, rIdx) => {
        const count = ringCounts[rIdx];
        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2;
          const rx = centerX + Math.cos(angle) * (radius * 1.3);
          const ry = centerY + Math.sin(angle) * (radius * 0.62);
          textPoints.push({
            x: rx + (Math.random() - 0.5) * 3,
            y: ry + (Math.random() - 0.5) * 3,
            isText: false,
            isRing: true,
          });
        }
      });

      return textPoints;
    };

    // 2. Initialize Particles & Canvas Scaling
    const initParticles = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const targets = generateTargets(width, height);
      const targetCount = targets.length;

      // Base grid spacing
      const gridSpacing = Math.max(22, Math.floor(Math.sqrt((width * height) / 2600)));
      const cols = Math.ceil(width / gridSpacing);
      const rows = Math.ceil(height / gridSpacing);
      const totalParticles = Math.max(targetCount, cols * rows);

      const newParticles: Particle[] = [];
      let targetIdx = 0;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = c * gridSpacing + (r % 2 === 0 ? 0 : gridSpacing * 0.5) + (Math.random() - 0.5) * 6;
          const oy = r * gridSpacing + (Math.random() - 0.5) * 6;

          let tx = ox;
          let ty = oy;
          let isText = false;
          let isRing = false;

          if (targetIdx < targetCount) {
            const t = targets[targetIdx];
            tx = t.x;
            ty = t.y;
            isText = t.isText;
            isRing = t.isRing;
            targetIdx++;
          } else {
            // Ambient orbital scatter for extra points
            const angle = Math.random() * Math.PI * 2;
            const dist = 180 + Math.random() * Math.max(width, height) * 0.5;
            tx = width * 0.5 + Math.cos(angle) * dist;
            ty = height * 0.44 + Math.sin(angle) * dist;
          }

          let colorType: Particle['colorType'] = 'white';
          if (isText) {
            colorType = Math.random() < 0.5 ? 'ruby' : 'white';
          } else if (isRing) {
            colorType = Math.random() < 0.3 ? 'ruby' : 'silver';
          } else {
            colorType = Math.random() < 0.15 ? 'ruby' : 'silver';
          }

          newParticles.push({
            x: ox,
            y: oy,
            originX: ox,
            originY: oy,
            targetX: tx,
            targetY: ty,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            baseSize: isText ? 2.0 + Math.random() * 1.0 : isRing ? 1.7 : 1.4 + Math.random() * 0.8,
            isText,
            isRing,
            alpha: isText ? 0.75 : isRing ? 0.55 : 0.4,
            highlight: 0,
            colorType,
          });
        }
      }

      particles = newParticles;
    };

    initParticles();

    // 3. Window Event Listeners (Scroll & Cursor Tracking)
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      // Morph into PRIXX as user scrolls (smooth progress from 0 at top to 1 as scrolling down)
      const progress = Math.min(1, Math.max(0, scrollY / 240));
      scrollState.targetProgress = progress;
    };

    const handleResize = () => {
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    // 4. Physics & Render Loop
    const animate = () => {
      rafId = requestAnimationFrame(animate);

      // Smooth interpolation for scroll morphing
      const morphDiff = scrollState.targetProgress - scrollState.currentProgress;
      scrollState.currentProgress += morphDiff * 0.08;
      const morph = scrollState.currentProgress;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Color palette definitions
      const rubyColor = 'rgba(239, 68, 68, ';
      const whiteColor = 'rgba(255, 255, 255, ';
      const silverColor = 'rgba(220, 225, 235, ';
      const amberColor = 'rgba(245, 158, 11, ';

      const pLen = particles.length;

      for (let i = 0; i < pLen; i++) {
        const p = particles[i];

        // Destination coordinate interpolated by scroll progress
        const destX = p.originX + (p.targetX - p.originX) * morph;
        const destY = p.originY + (p.targetY - p.originY) * morph;

        // Spring acceleration towards destination
        const springK = p.isText ? 0.085 : 0.05;
        const damping = 0.85;

        const ax = (destX - p.x) * springK;
        const ay = (destY - p.y) * springK;

        p.vx = (p.vx + ax) * damping;
        p.vy = (p.vy + ay) * damping;

        // Cursor reactive physics (repel & fluid wake)
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const radius = p.isText ? 170 : 140;
          const radiusSq = radius * radius;

          if (distSq < radiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / radius) * 8.5;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
            p.highlight = Math.max(p.highlight, (1 - dist / radius) * 1.5);
          }
        }

        // Decay highlight over time
        if (p.highlight > 0.01) {
          p.highlight *= 0.93;
        } else {
          p.highlight = 0;
        }

        // Apply velocities
        p.x += p.vx;
        p.y += p.vy;

        // Dynamic rendering style
        let currentAlpha = p.alpha;
        if (p.isText) {
          currentAlpha = 0.35 + morph * 0.65 + p.highlight * 0.4;
        } else if (p.isRing) {
          currentAlpha = 0.25 + morph * 0.5 + p.highlight * 0.4;
        } else {
          currentAlpha = 0.25 + p.highlight * 0.55;
        }

        const size = p.baseSize + p.highlight * 1.8 + (p.isText ? morph * 0.8 : 0);

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, size), 0, Math.PI * 2);

        // Fill color based on type and highlight
        if (p.highlight > 0.15 || (p.isText && morph > 0.4 && p.colorType === 'ruby')) {
          ctx.fillStyle = `${rubyColor}${Math.min(1, currentAlpha)})`;
        } else if (p.colorType === 'ruby') {
          ctx.fillStyle = `${rubyColor}${Math.min(1, currentAlpha * 0.9)})`;
        } else if (p.colorType === 'white' || p.highlight > 0) {
          ctx.fillStyle = `${whiteColor}${Math.min(1, currentAlpha)})`;
        } else {
          ctx.fillStyle = `${silverColor}${Math.min(1, currentAlpha * 0.85)})`;
        }

        ctx.fill();
      }

      ctx.restore();
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 block w-full h-full"
    />
  );
};
