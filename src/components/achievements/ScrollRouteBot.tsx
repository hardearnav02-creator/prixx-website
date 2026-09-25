// src/components/achievements/ScrollRouteBot.tsx
// Interactive Scroll-Following Top-View Combat Bot & Route Point for Achievements Exhibition.
// Traverses the SVG serpentine spline curve bidirectionally behind the achievement slides.
// Detects collision with each card waypoint, triggering kinetic impact effects.

import React, { useEffect, useRef } from 'react';
import botTopViewImg from '../../assets/bot-top-view.png';

interface ScrollRouteBotProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  totalCards?: number;
  onActiveCardChange?: (index: number, isCollided: boolean) => void;
}

// 7 waypoints corresponding to the 7 achievement cards
const SPLINE_PATH_D =
  'M 760 90 C 760 250, 240 250, 240 420 C 240 590, 780 590, 780 760 C 780 930, 220 930, 220 1100 C 220 1270, 760 1270, 760 1440 C 760 1610, 240 1610, 240 1780 C 240 1940, 500 1940, 500 2100';

const WAYPOINTS = [
  { x: 760, y: 90, label: '01' },
  { x: 240, y: 420, label: '02' },
  { x: 780, y: 760, label: '03' },
  { x: 220, y: 1100, label: '04' },
  { x: 760, y: 1440, label: '05' },
  { x: 240, y: 1780, label: '06' },
  { x: 500, y: 2100, label: '07' },
];

export const ScrollRouteBot: React.FC<ScrollRouteBotProps> = ({
  containerRef,
  totalCards = 7,
  onActiveCardChange,
}) => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const activePathRef = useRef<SVGPathElement | null>(null);
  const botRef = useRef<HTMLDivElement | null>(null);

  const stateRef = useRef({
    targetProgress: 0,
    currentProgress: 0,
    currentAngle: 90,
    lastTime: 0,
    lastActiveIndex: -1,
    lastCollided: false,
  });

  // High-performance scroll listener & animation loop
  useEffect(() => {
    stateRef.current.lastTime = performance.now();
    const path = pathRef.current;
    if (!path) return;

    let rafId: number;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollTop =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        0;
      const docHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      const maxDocScroll = Math.max(1, docHeight - viewportHeight);

      // 1. Container bounds in document space
      const containerTopDoc = rect.top + scrollTop;
      const containerHeight = rect.height;

      // Start scroll when container top reaches the upper reading zone (~40% of viewport)
      const startScroll = Math.max(0, containerTopDoc - viewportHeight * 0.4);

      // End scroll when the bottom of the container reaches the lower viewport zone or page bottom
      const containerEndScroll =
        containerTopDoc + containerHeight - viewportHeight * 0.75;
      const endScroll = Math.min(
        maxDocScroll,
        Math.max(startScroll + 100, containerEndScroll)
      );

      let rawProgress = 0;
      if (scrollTop >= maxDocScroll - 15) {
        // Guarantee 100% completion when the screen has scrolled totally
        rawProgress = 1.0;
      } else if (scrollTop <= startScroll) {
        rawProgress = 0.0;
      } else {
        rawProgress = (scrollTop - startScroll) / (endScroll - startScroll);
      }

      const clamped = Math.max(0, Math.min(1, rawProgress));
      stateRef.current.targetProgress = clamped;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    // 60fps RAF Lerp Loop for organic motion and continuous heading calculation
    const updateBot = (time: number) => {
      rafId = requestAnimationFrame(updateBot);

      const state = stateRef.current;
      state.lastTime = time;

      // Smooth interpolation toward target scroll progress
      const lerpSpeed = 0.12;
      const diff = state.targetProgress - state.currentProgress;
      state.currentProgress += diff * lerpSpeed;
      const prog = state.currentProgress;

      if (!path) return;
      const totalLen = path.getTotalLength();
      if (totalLen <= 0) return;

      // Calculate coordinates along the SVG spline curve
      const currentDist = prog * totalLen;
      const sampleBack = Math.max(0, currentDist - 4);
      const sampleFwd = Math.min(totalLen, currentDist + 4);
      const p1 = path.getPointAtLength(sampleBack);
      const p2 = path.getPointAtLength(sampleFwd);
      const point = path.getPointAtLength(currentDist);

      // Tangent angle calculation for robot heading
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI;

      // Smooth heading angle interpolation
      let angleDiff = (targetAngle - state.currentAngle) % 360;
      if (angleDiff > 180) angleDiff -= 360;
      if (angleDiff < -180) angleDiff += 360;
      state.currentAngle += angleDiff * 0.18;

      // Calculate active card and collision state
      const step = 1 / Math.max(1, totalCards - 1);
      const nearestCardIdx = Math.min(
        totalCards - 1,
        Math.max(0, Math.round(prog / step))
      );
      const stationProgress = nearestCardIdx * step;
      const distToStation = Math.abs(prog - stationProgress);
      // Collision threshold: when within 0.058 of the waypoint station
      const isCollided = distToStation < 0.058;

      if (
        nearestCardIdx !== state.lastActiveIndex ||
        isCollided !== state.lastCollided
      ) {
        state.lastActiveIndex = nearestCardIdx;
        state.lastCollided = isCollided;
        if (onActiveCardChange) {
          onActiveCardChange(nearestCardIdx, isCollided);
        }
      }

      // 1. Update Active Illuminated Route Trail
      if (activePathRef.current) {
        activePathRef.current.style.strokeDasharray = `${totalLen}`;
        activePathRef.current.style.strokeDashoffset = `${totalLen * (1 - prog)}`;
      }

      // 2. Update DOM Top-View Bot (sitting behind slides in z-[5])
      if (botRef.current) {
        const posX = (point.x / 1000) * 100;
        const posY = (point.y / 2200) * 100;

        botRef.current.style.left = `${posX}%`;
        botRef.current.style.top = `${posY}%`;

        const botChassis = botRef.current.querySelector('.bot-chassis') as HTMLElement;
        if (botChassis) {
          botChassis.style.transform = `rotate(${state.currentAngle}deg) scale(${isCollided ? 1.08 : 1})`;
        }
      }
    };

    rafId = requestAnimationFrame(updateBot);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [containerRef, totalCards, onActiveCardChange]);

  return (
    <>
      {/* =================================================================== */}
      {/* 1. SVG ROUTE SPLINE & ACTIVE TRAIL (z-0)                            */}
      {/* =================================================================== */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-visible z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 2200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Guide Base Spline Gradient */}
            <linearGradient id="splineBaseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.35" />
              <stop offset="40%" stopColor="#DC2626" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#2563EB" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.35" />
            </linearGradient>

            {/* Active Traveled Trail Luminous Gradient */}
            <linearGradient id="splineActiveTrail" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="1" />
              <stop offset="35%" stopColor="#FF3366" stopOpacity="1" />
              <stop offset="70%" stopColor="#00F0FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="1" />
            </linearGradient>

            {/* Trail Glow Filter */}
            <filter id="pointGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur1" />
              <feGaussianBlur stdDeviation="4" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

          </defs>

          {/* Base Guide Spline (dashed background track) */}
          <path
            ref={pathRef}
            d={SPLINE_PATH_D}
            stroke="url(#splineBaseGradient)"
            strokeWidth="2.5"
            strokeDasharray="8 6"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Core Golden Path */}
          <path
            d={SPLINE_PATH_D}
            stroke="#D4AF37"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.35"
          />

          {/* Active Traveled Trail (Follows the moving point dynamically) */}
          <path
            ref={activePathRef}
            d={SPLINE_PATH_D}
            stroke="url(#splineActiveTrail)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#pointGlowFilter)"
          />

          {/* Static Waypoint Radar Rings at each card station */}
          {WAYPOINTS.map((wp, i) => (
            <g key={i} className="opacity-75">
              <circle
                cx={wp.x}
                cy={wp.y}
                r="24"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="1"
                strokeDasharray="3 4"
                opacity="0.4"
              />
              <circle
                cx={wp.x}
                cy={wp.y}
                r="8"
                fill="#F59E0B"
                fillOpacity="0.25"
                stroke="#F59E0B"
                strokeWidth="1.5"
              />
              <circle cx={wp.x} cy={wp.y} r="2.5" fill="#FFFFFF" />
            </g>
          ))}
        </svg>
      </div>

      {/* =================================================================== */}
      {/* 2. DYNAMIC MOVING BOT (PASSES BEHIND CARDS: z-[5])                  */}
      {/* =================================================================== */}
      <div
        ref={botRef}
        className="absolute pointer-events-none hidden lg:block z-[5] select-none"
        style={{
          left: '76%',
          top: '4.1%',
          transform: 'translate3d(-50%, -50%, 0)',
        }}
      >
        {/* Top-View Bot / Chassis with Tangent Rotation */}
        <div className="relative flex items-center justify-center">
          {/* Subtle Ground Contact Shadow */}
          <div className="absolute w-20 h-20 rounded-full bg-black/80 blur-md -z-10" />

          {/* Original Top-View Combat Bot Photo */}
          <div className="bot-chassis relative w-20 h-24 sm:w-24 sm:h-28 flex items-center justify-center transition-transform duration-150 ease-out filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.95)]">
            <img
              src={botTopViewImg}
              alt="Prixx Combat Bot"
              className="w-full h-full object-contain"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </>
  );
};
