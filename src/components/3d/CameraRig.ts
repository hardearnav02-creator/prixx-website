// src/components/3d/CameraRig.ts
import * as THREE from 'three';

export interface CameraRigState {
  targetRotationX: number;
  targetRotationY: number;
  currentRotationX: number;
  currentRotationY: number;
  parallaxX: number;
  parallaxY: number;
  targetParallaxX: number;
  targetParallaxY: number;
}

export function createCameraRig(camera: THREE.PerspectiveCamera) {
  camera.position.set(3.8, 2.6, 5.0);
  camera.lookAt(0, 0, 0);

  const state: CameraRigState = {
    targetRotationX: 0,
    targetRotationY: -0.6,
    currentRotationX: 0,
    currentRotationY: -0.6,
    parallaxX: 0,
    parallaxY: 0,
    targetParallaxX: 0,
    targetParallaxY: 0
  };

  const update = (botGroup: THREE.Group, delta: number) => {
    // Dampened rotation interpolation
    state.currentRotationX += (state.targetRotationX - state.currentRotationX) * Math.min(delta * 6, 1);
    state.currentRotationY += (state.targetRotationY - state.currentRotationY) * Math.min(delta * 6, 1);

    // Parallax interpolation
    state.parallaxX += (state.targetParallaxX - state.parallaxX) * Math.min(delta * 4, 1);
    state.parallaxY += (state.targetParallaxY - state.parallaxY) * Math.min(delta * 4, 1);

    botGroup.rotation.x = state.currentRotationX + state.parallaxY * 0.2;
    botGroup.rotation.y = state.currentRotationY + state.parallaxX * 0.35;

    // Gentle mechanical idle tilt
    botGroup.position.y = -0.3 + Math.sin(Date.now() * 0.0015) * 0.04;
  };

  const onMouseMove = (normalizedX: number, normalizedY: number) => {
    state.targetParallaxX = normalizedX;
    state.targetParallaxY = -normalizedY;
  };

  const addRotation = (deltaX: number, deltaY: number) => {
    state.targetRotationY += deltaX * 0.008;
    state.targetRotationX = Math.max(-0.6, Math.min(0.8, state.targetRotationX + deltaY * 0.008));
  };

  const resetView = () => {
    state.targetRotationX = 0;
    state.targetRotationY = -0.6;
    state.targetParallaxX = 0;
    state.targetParallaxY = 0;
  };

  return {
    camera,
    state,
    update,
    onMouseMove,
    addRotation,
    resetView
  };
}
