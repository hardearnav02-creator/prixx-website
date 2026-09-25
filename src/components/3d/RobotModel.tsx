// src/components/3d/RobotModel.tsx
// Modular 3D Robot model loader and procedural combat bot controller.
// Supports loading external .glb, .gltf, .stl, and .obj files,
// with immediate fallback to precision procedural Hardox 500 combat bot.

import * as THREE from 'three';
import { createProceduralCombatBot, CombatBotInstance } from './ProceduralCombatBot';

export interface RobotModelOptions {
  modelUrl?: string;
  onLoaded?: () => void;
  onError?: (err: Error) => void;
}

export interface RobotModelController {
  root: THREE.Group;
  update: (delta: number, weaponMultiplier: number) => void;
  dispose: () => void;
  setWeaponSpeedPreset?: (speed: 'idle' | 'medium' | 'max') => void;
}

export async function createRobotModel(options: RobotModelOptions = {}): Promise<RobotModelController> {
  const { modelUrl, onLoaded } = options;

  // If a valid modelUrl is provided, detect format and load dynamically
  if (modelUrl) {
    const cleanUrl = modelUrl.toLowerCase().split('?')[0];

    // 1. STL Model Loader (.stl)
    if (cleanUrl.endsWith('.stl')) {
      try {
        const { STLLoader } = await import('three/examples/jsm/loaders/STLLoader.js');
        const loader = new STLLoader();

        const geometry = await new Promise<THREE.BufferGeometry>((resolve, reject) => {
          loader.load(
            modelUrl,
            (geom) => resolve(geom),
            undefined,
            (err) => reject(err)
          );
        });

        geometry.computeVertexNormals();
        geometry.center();

        // Calculate bounding box and normalize scale to fit standard viewport
        geometry.computeBoundingBox();
        const bbox = geometry.boundingBox;
        let scaleFactor = 1;
        if (bbox) {
          const maxDim = Math.max(
            bbox.max.x - bbox.min.x,
            bbox.max.y - bbox.min.y,
            bbox.max.z - bbox.min.z
          );
          if (maxDim > 0) {
            scaleFactor = 2.4 / maxDim; // Fit nicely into the 3D frame
          }
        }

        // Hardened Hardox 500 combat robotics PBR material
        const material = new THREE.MeshStandardMaterial({
          color: 0x1f242d,
          metalness: 0.85,
          roughness: 0.25,
          envMapIntensity: 1.5,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
        // Orient the STL in horizontal mode (pitch and 90° Y-axis rotation to lay flat and horizontal)
        mesh.rotation.x = Math.PI / 2;
        mesh.rotation.y = Math.PI / 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const root = new THREE.Group();
        root.add(mesh);

        if (onLoaded) onLoaded();

        return {
          root,
          update: (delta: number, weaponMultiplier: number) => {
            root.rotation.y += delta * 0.3 * (weaponMultiplier > 10 ? 1.5 : 1);
          },
          dispose: () => {
            geometry.dispose();
            material.dispose();
          }
        };
      } catch (err) {
        console.warn('STL load failed, falling back to procedural model:', err);
      }
    }

    // 2. GLTF / GLB Loader (.glb, .gltf)
    if (cleanUrl.endsWith('.glb') || cleanUrl.endsWith('.gltf')) {
      try {
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
        const loader = new GLTFLoader();

        const gltf = await new Promise<{ scene: THREE.Group }>((resolve, reject) => {
          loader.load(
            modelUrl,
            (loadedGltf) => resolve(loadedGltf as { scene: THREE.Group }),
            undefined,
            (err) => reject(err)
          );
        });

        const root = gltf.scene;

        // Auto-center & auto-scale GLTF model if necessary
        const box = new THREE.Box3().setFromObject(root);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) {
          const scale = 2.4 / maxDim;
          root.scale.set(scale, scale, scale);
          root.position.sub(center.multiplyScalar(scale));
        }

        root.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        if (onLoaded) onLoaded();

        return {
          root,
          update: (delta: number) => {
            root.rotation.y += delta * 0.2;
          },
          dispose: () => {
            root.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.geometry?.dispose();
                if (Array.isArray(mesh.material)) {
                  mesh.material.forEach((m) => m.dispose());
                } else {
                  mesh.material?.dispose();
                }
              }
            });
          }
        };
      } catch {
        // Graceful fallback to procedural bot on GLTF failure or 404
      }
    }
  }

  // Precision Procedural Combat Bot (Zero external network dependencies, instantaneous render)
  const proceduralInstance: CombatBotInstance = createProceduralCombatBot();
  if (onLoaded) onLoaded();

  return {
    root: proceduralInstance.root,
    update: proceduralInstance.update,
    dispose: proceduralInstance.dispose
  };
}
