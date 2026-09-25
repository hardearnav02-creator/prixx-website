// src/components/3d/RobotScene.tsx
// High-performance Three.js WebGL viewport for Kaal Bahirav 60kg Combat Robot.
// Modular architecture consuming Lighting, CameraRig, RobotModel, and InteractionLayer.
// Inspired by Mind Robotics

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { setupSceneLighting } from './Lighting';
import { createCameraRig } from './CameraRig';
import { createRobotModel, RobotModelController } from './RobotModel';
import { InteractionLayer } from './InteractionLayer';
import { SceneFallback } from './SceneFallback';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface RobotSceneProps {
  modelUrl?: string;
  className?: string;
}

export const RobotScene: React.FC<RobotSceneProps> = ({
  modelUrl = '/models/your-model.stl',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hasError, setHasError] = useState(false);
  const [weaponSpeedPreset, setWeaponSpeedPreset] = useState<'idle' | 'medium' | 'max'>('max');
  const [isInteracting, setIsInteracting] = useState(false);
  const [telemetry, setTelemetry] = useState({ yaw: -34, pitch: 8, rpm: 11000 });
  const reducedMotion = useReducedMotion();

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const prevPointerPosRef = useRef({ x: 0, y: 0 });
  const rigRef = useRef<ReturnType<typeof createCameraRig> | null>(null);
  const modelControllerRef = useRef<RobotModelController | null>(null);

  const getWeaponMultiplier = useCallback(() => {
    if (reducedMotion) return 0.5;
    switch (weaponSpeedPreset) {
      case 'idle':
        return 1.5;
      case 'medium':
        return 12.0;
      case 'max':
      default:
        return 32.0;
    }
  }, [weaponSpeedPreset, reducedMotion]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number;
    let isVisible = true;
    let lastTime = performance.now();
    let isDisposed = false;

    // 1. Scene Initialization (Dark Slate / Obsidian Background)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030712);

    // Shadow receiver ground plane (Subtle contact shadow)
    const shadowPlaneGeo = new THREE.PlaneGeometry(16, 16);
    const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.45 });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.02;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Subtle ground cyan grid lines
    const gridHelper = new THREE.GridHelper(14, 14, 0x00f0ff, 0x1e293b);
    gridHelper.position.y = -1.01;
    scene.add(gridHelper);

    // 2. Camera & Lighting
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    const cameraRig = createCameraRig(camera);
    rigRef.current = cameraRig;

    setupSceneLighting(scene);

    // 3. WebGL Renderer with performance clamping
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      });

      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    } catch (err) {
      console.error('WebGL initialization error:', err);
      queueMicrotask(() => setHasError(true));
      return;
    }

    // 4. Load 3D Robot Model (GLTF or Procedural Fallback)
    createRobotModel({
      modelUrl,
      onError: () => setHasError(true),
    }).then((controller) => {
      if (isDisposed) {
        controller.dispose();
        return;
      }
      modelControllerRef.current = controller;
      scene.add(controller.root);
    });

    // 5. Visibility Observer (Pause RAF when offscreen)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 6. Resize Observer
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight, false);
    };

    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    const renderLoop = (time: number) => {
      animationFrameId = requestAnimationFrame(renderLoop);

      if (!isVisible) return;

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const speed = getWeaponMultiplier();
      const model = modelControllerRef.current;
      if (model) {
        model.update(delta, speed);
        cameraRig.update(model.root, delta);
      }

      if (renderer) {
        renderer.render(scene, camera);
      }

      // Periodic telemetry state update
      if (model && Math.random() < 0.1) {
        const currentYaw = Math.round(THREE.MathUtils.radToDeg(model.root.rotation.y));
        const currentPitch = Math.round(THREE.MathUtils.radToDeg(model.root.rotation.x));
        const rpm =
          weaponSpeedPreset === 'max'
            ? 11000 + Math.floor(Math.random() * 240 - 120)
            : weaponSpeedPreset === 'medium'
            ? 5800 + Math.floor(Math.random() * 100 - 50)
            : 850;
        setTelemetry({ yaw: currentYaw, pitch: currentPitch, rpm });
      }
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (modelControllerRef.current) {
        modelControllerRef.current.dispose();
        scene.remove(modelControllerRef.current.root);
      }
      shadowPlaneGeo.dispose();
      shadowPlaneMat.dispose();
      renderer?.dispose();
    };
  }, [modelUrl, getWeaponMultiplier, weaponSpeedPreset]);

  // Pointer & Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    prevPointerPosRef.current = { x: e.clientX, y: e.clientY };
    setIsInteracting(true);
    // Only capture pointer for non-touch (mouse/pen) to allow vertical touch page scrolling on mobile
    if (e.pointerType !== 'touch') {
      try {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      } catch {
        // Ignore pointer capture errors
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDraggingRef.current && rigRef.current) {
      const deltaX = e.clientX - prevPointerPosRef.current.x;
      const deltaY = e.clientY - prevPointerPosRef.current.y;
      prevPointerPosRef.current = { x: e.clientX, y: e.clientY };
      rigRef.current.addRotation(deltaX, deltaY);
    } else if (containerRef.current && rigRef.current && e.pointerType !== 'touch') {
      const rect = containerRef.current.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      rigRef.current.onMouseMove(normX, normY);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    setIsInteracting(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if releasePointerCapture fails
    }
  };

  if (hasError) {
    return <SceneFallback title="KAAL BAHIRAV 60KG" />;
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[360px] sm:min-h-[440px] lg:min-h-[540px] rounded-2xl bg-[#0a0a0a] select-none overflow-hidden ${className}`}
      style={{ touchAction: 'pan-y' }}
      data-cursor="DRAG"
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ touchAction: 'pan-y' }}
        className={`w-full h-full block cursor-grab active:cursor-grabbing ${
          isInteracting ? 'cursor-grabbing' : ''
        }`}
      />

      {/* Interactive Telemetry & Control Overlay */}
      <InteractionLayer
        telemetry={telemetry}
        weaponSpeedPreset={weaponSpeedPreset}
        onSpeedPresetChange={setWeaponSpeedPreset}
        onResetView={() => rigRef.current?.resetView()}
        isInteracting={isInteracting}
      />
    </div>
  );
};
