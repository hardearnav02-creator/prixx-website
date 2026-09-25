// src/components/3d/Lighting.ts
// Luminous Studio Lighting for 3D Combat Robotics Model
// Inspired by Mind Robotics

import * as THREE from 'three';

export function setupSceneLighting(scene: THREE.Scene) {
  // Ambient light
  const ambient = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambient);

  // Key Directional Light (Sharp contrast & shadows)
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
  keyLight.position.set(6, 10, 8);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 30;
  keyLight.shadow.bias = -0.001;
  scene.add(keyLight);

  // Cyan Rim Light
  const cyanRim = new THREE.DirectionalLight(0x00f0ff, 2.2);
  cyanRim.position.set(-8, 5, -6);
  scene.add(cyanRim);

  // Electric Blue Fill Light
  const blueFill = new THREE.DirectionalLight(0x3b82f6, 1.4);
  blueFill.position.set(6, -4, -6);
  scene.add(blueFill);

  // Neon Ruby Accent Light
  const rubyAccent = new THREE.PointLight(0xff3366, 1.8, 12);
  rubyAccent.position.set(0, -1, 4);
  scene.add(rubyAccent);

  return {
    ambient,
    keyLight,
    cyanRim,
    blueFill,
    rubyAccent,
  };
}
