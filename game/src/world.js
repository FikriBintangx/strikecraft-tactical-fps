// Snow Shinto Sanctuary & Glacial Tactical Arena for YukiStrike FPS
// Cel-shaded winter shrine courtyard with falling snow, Torii arches, and tactical ice barriers.
import * as THREE from 'three';
import { PALETTE } from './palette.js';

export function createWorld(scene) {
  const group = new THREE.Group();
  scene.add(group);

  // Cel-shade style materials with rim reflection
  const materials = {
    snow: new THREE.MeshStandardMaterial({
      color: new THREE.Color(PALETTE.canvas),
      roughness: 0.85,
      metalness: 0.05,
    }),
    iceWall: new THREE.MeshStandardMaterial({
      color: new THREE.Color(PALETTE.surface),
      roughness: 0.35,
      metalness: 0.15,
    }),
    toriiWood: new THREE.MeshStandardMaterial({
      color: new THREE.Color(PALETTE.torii),
      roughness: 0.5,
      metalness: 0.05,
    }),
    stoneCover: new THREE.MeshStandardMaterial({
      color: new THREE.Color(PALETTE.hairline),
      roughness: 0.7,
      metalness: 0.1,
    }),
    crystalBeacon: new THREE.MeshStandardMaterial({
      color: new THREE.Color(PALETTE.crystal),
      emissive: new THREE.Color(PALETTE.crystal),
      emissiveIntensity: 0.45,
      roughness: 0.1,
      metalness: 0.8,
    }),
    sakuraGlow: new THREE.MeshStandardMaterial({
      color: new THREE.Color(PALETTE.accent),
      emissive: new THREE.Color(PALETTE.accent),
      emissiveIntensity: 0.4,
      roughness: 0.4,
    }),
  };

  const colliders = [];
  const shootables = [];

  function box(width, height, depth, x, y, z, matKey) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), materials[matKey] || materials.stoneCover);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    colliders.push(new THREE.Box3().setFromObject(mesh));
    shootables.push(mesh);
    return mesh;
  }

  // 1. Snow ground plane
  box(36.0, 0.4, 36.0, 0, -0.2, 0, 'snow');

  // 2. Glacial perimeter walls
  box(0.5, 5.2, 36.0, -18.0, 2.6, 0, 'iceWall');
  box(0.5, 5.2, 36.0, 18.0, 2.6, 0, 'iceWall');
  box(36.0, 5.2, 0.5, 0, 2.6, -18.0, 'iceWall');
  box(36.0, 5.2, 0.5, 0, 2.6, 18.0, 'iceWall');

  // 3. Central Anime Torii Shrine Arch (Site A objective)
  box(0.8, 5.5, 0.8, -3.2, 2.75, -8.0, 'toriiWood'); // Left pillar
  box(0.8, 5.5, 0.8, 3.2, 2.75, -8.0, 'toriiWood');  // Right pillar
  box(8.4, 0.7, 1.0, 0, 5.4, -8.0, 'toriiWood');     // Top beam (Kasagi)
  box(7.2, 0.4, 0.6, 0, 4.5, -8.0, 'toriiWood');     // Sub beam (Nuki)
  box(1.6, 0.4, 1.6, 0, 0.2, -8.0, 'crystalBeacon'); // Shrine C4 plant circle

  // 4. Site B Glacial Pagoda Platform
  box(7.0, 0.8, 7.0, 10.0, 0.4, 10.0, 'stoneCover');
  box(1.2, 3.4, 1.2, 10.0, 2.2, 10.0, 'crystalBeacon');
  box(2.0, 1.2, 0.8, 8.0, 1.4, 8.0, 'stoneCover');
  box(2.0, 1.2, 0.8, 12.0, 1.4, 12.0, 'stoneCover');

  // 5. Tactical Snow Bunkers & Lantern Covers
  box(3.2, 1.3, 1.0, -6.5, 0.65, 0.0, 'stoneCover');
  box(3.2, 1.3, 1.0, 6.5, 0.65, 0.0, 'stoneCover');
  box(1.2, 2.4, 1.2, 0.0, 1.2, 2.5, 'toriiWood'); // Center lantern pillar
  box(1.0, 1.0, 1.0, 0.0, 2.6, 2.5, 'sakuraGlow'); // Glowing lantern lamp

  box(2.4, 1.1, 1.2, -10.0, 0.55, -4.0, 'iceWall');
  box(2.4, 1.1, 1.2, 10.0, 0.55, -4.0, 'iceWall');
  box(1.8, 0.9, 2.8, -4.0, 0.45, 8.0, 'iceWall');
  box(1.8, 0.9, 2.8, 4.0, 0.45, 8.0, 'iceWall');

  // 6. Falling Snow Particle System
  const snowCount = 450;
  const snowGeo = new THREE.BufferGeometry();
  const snowPos = new Float32Array(snowCount * 3);
  for (let i = 0; i < snowCount; i++) {
    snowPos[i * 3] = (Math.random() - 0.5) * 36;
    snowPos[i * 3 + 1] = Math.random() * 12;
    snowPos[i * 3 + 2] = (Math.random() - 0.5) * 36;
  }
  snowGeo.setAttribute('position', new THREE.BufferAttribute(snowPos, 3));
  const snowMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.18,
    transparent: true,
    opacity: 0.85,
  });
  const snowPoints = new THREE.Points(snowGeo, snowMat);
  group.add(snowPoints);

  // Lighting: Vibrant anime winter day with cyan frost ambient and warm peach sun
  const ambient = new THREE.HemisphereLight(new THREE.Color('#d4e8ff'), new THREE.Color('#7a9ec7'), 1.25);
  scene.add(ambient);

  const sun = new THREE.DirectionalLight(new THREE.Color('#fff2e6'), 2.4);
  sun.position.set(12, 20, 10);
  sun.target.position.set(0, 0, 0);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -20;
  sun.shadow.camera.right = 20;
  sun.shadow.camera.top = 20;
  sun.shadow.camera.bottom = -20;
  sun.shadow.camera.far = 60;
  sun.shadow.bias = -0.0004;
  scene.add(sun, sun.target);

  const rimLight = new THREE.DirectionalLight(new THREE.Color('#00e5ff'), 0.8);
  rimLight.position.set(-14, 8, -12);
  scene.add(rimLight);

  return { colliders, shootables, group, snowPoints };
}
