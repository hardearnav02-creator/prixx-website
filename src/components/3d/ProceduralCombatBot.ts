// src/components/3d/ProceduralCombatBot.ts
// Procedurally generated 3D model for Kaal Bahirav (60kg Heavyweight Combat Robot).
// Uses Three.js geometries and solid matte materials adhering to strict color & lighting rules.

import * as THREE from 'three';

export interface CombatBotInstance {
  root: THREE.Group;
  weaponDisc: THREE.Group;
  wheels: THREE.Mesh[];
  update: (delta: number, weaponRpm: number) => void;
  dispose: () => void;
}

export function createProceduralCombatBot(): CombatBotInstance {
  const root = new THREE.Group();
  const wheels: THREE.Mesh[] = [];

  // Reusable Materials (Solid Matte finishes, high contrast, zero glow)
  const chassisMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.35,
    metalness: 0.8
  });

  const weaponDiscMaterial = new THREE.MeshStandardMaterial({
    color: 0xff3333, // Vibrant Red
    roughness: 0.25,
    metalness: 0.85
  });

  const toolSteelMaterial = new THREE.MeshStandardMaterial({
    color: 0xe0e0e0,
    roughness: 0.2,
    metalness: 0.95
  });

  const blueAccentMaterial = new THREE.MeshStandardMaterial({
    color: 0x3366ff, // Electric Blue
    roughness: 0.4,
    metalness: 0.7
  });

  const tireMaterial = new THREE.MeshStandardMaterial({
    color: 0x050505,
    roughness: 0.9,
    metalness: 0.1
  });

  // 1. MAIN CHASSIS (Monocoque Hardox Wedge Box)
  const chassisGeo = new THREE.BoxGeometry(2.4, 0.6, 2.0);
  const chassis = new THREE.Mesh(chassisGeo, chassisMaterial);
  chassis.position.y = 0.4;
  chassis.castShadow = true;
  chassis.receiveShadow = true;
  root.add(chassis);

  // Wedge Front Armor Plate
  const wedgeGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.58, 3, 1, false, 0, Math.PI);
  const wedge = new THREE.Mesh(wedgeGeo, chassisMaterial);
  wedge.rotation.y = -Math.PI / 2;
  wedge.rotation.z = Math.PI / 2;
  wedge.position.set(0, 0.4, 1.05);
  wedge.scale.set(0.6, 1.8, 0.5);
  wedge.castShadow = true;
  root.add(wedge);

  // Top Plate with Red & Blue Racing Stripes
  const topPlateGeo = new THREE.BoxGeometry(2.1, 0.04, 1.7);
  const topPlate = new THREE.Mesh(topPlateGeo, toolSteelMaterial);
  topPlate.position.set(0, 0.72, 0);
  topPlate.castShadow = true;
  root.add(topPlate);

  const stripeGeo = new THREE.BoxGeometry(0.3, 0.05, 1.6);
  const stripe = new THREE.Mesh(stripeGeo, blueAccentMaterial);
  stripe.position.set(0.6, 0.73, 0);
  root.add(stripe);

  const stripeRedGeo = new THREE.BoxGeometry(0.3, 0.05, 1.6);
  const stripeRed = new THREE.Mesh(stripeRedGeo, weaponDiscMaterial);
  stripeRed.position.set(-0.6, 0.73, 0);
  root.add(stripeRed);

  // 2. KINETIC SPINNING WEAPON DISC ASSEMBLY
  const weaponGroup = new THREE.Group();
  weaponGroup.position.set(0, 0.45, 1.25);

  // Central Disc
  const discGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.14, 32);
  const discMesh = new THREE.Mesh(discGeo, weaponDiscMaterial);
  discMesh.rotation.z = Math.PI / 2;
  discMesh.castShadow = true;
  weaponGroup.add(discMesh);

  // Tool Steel Teeth (4 Kinetic Impact Teeth)
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    const toothGeo = new THREE.BoxGeometry(0.18, 0.28, 0.22);
    const tooth = new THREE.Mesh(toothGeo, toolSteelMaterial);
    tooth.position.set(
      0,
      Math.sin(angle) * 0.85,
      Math.cos(angle) * 0.85
    );
    tooth.rotation.x = angle;
    tooth.castShadow = true;
    weaponGroup.add(tooth);
  }

  // Weapon Shaft Hub
  const hubGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.32, 16);
  const hub = new THREE.Mesh(hubGeo, toolSteelMaterial);
  hub.rotation.z = Math.PI / 2;
  weaponGroup.add(hub);

  root.add(weaponGroup);

  // Weapon Guard Struts
  const strutLGeo = new THREE.BoxGeometry(0.12, 0.5, 0.8);
  const strutL = new THREE.Mesh(strutLGeo, chassisMaterial);
  strutL.position.set(-0.95, 0.45, 1.0);
  root.add(strutL);

  const strutR = new THREE.Mesh(strutLGeo, chassisMaterial);
  strutR.position.set(0.95, 0.45, 1.0);
  root.add(strutR);

  // 3. 4-WHEEL DIRECT DRIVE PODS
  const wheelPositions = [
    { x: -1.32, y: 0.35, z: 0.65 },
    { x: 1.32, y: 0.35, z: 0.65 },
    { x: -1.32, y: 0.35, z: -0.65 },
    { x: 1.32, y: 0.35, z: -0.65 }
  ];

  const wheelGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.24, 24);
  const rimGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.25, 16);

  wheelPositions.forEach((pos) => {
    const wheel = new THREE.Mesh(wheelGeo, tireMaterial);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(pos.x, pos.y, pos.z);
    wheel.castShadow = true;
    root.add(wheel);
    wheels.push(wheel);

    const rim = new THREE.Mesh(rimGeo, toolSteelMaterial);
    rim.rotation.z = Math.PI / 2;
    rim.position.set(pos.x, pos.y, pos.z);
    root.add(rim);
  });

  // 4. TELEMETRY ANTENNA & STATUS BEACON
  const antennaGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.8, 8);
  const antenna = new THREE.Mesh(antennaGeo, toolSteelMaterial);
  antenna.position.set(-0.85, 1.1, -0.7);
  antenna.rotation.x = -0.15;
  root.add(antenna);

  const beaconGeo = new THREE.SphereGeometry(0.05, 8, 8);
  const beaconMat = new THREE.MeshBasicMaterial({ color: 0x3366ff });
  const beacon = new THREE.Mesh(beaconGeo, beaconMat);
  beacon.position.set(-0.85, 1.5, -0.76);
  root.add(beacon);

  // Scaling and center position
  root.scale.set(1.2, 1.2, 1.2);
  root.position.y = -0.3;

  const update = (delta: number, weaponSpeed: number) => {
    // Spin weapon disc smoothly
    weaponGroup.rotation.x += delta * weaponSpeed;

    // Rotate drive wheels slightly with simulated idle traction
    wheels.forEach((wheel) => {
      wheel.rotation.y += delta * 0.5;
    });
  };

  const dispose = () => {
    root.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
  };

  return {
    root,
    weaponDisc: weaponGroup,
    wheels,
    update,
    dispose
  };
}
