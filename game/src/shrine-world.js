// 3D Cel-Shaded Snow Shrine Arena & Glacial Citadel for YukiStrike: Zero
import * as THREE from 'three';

  const PALETTE = {
    skyTop: 0x1a2c4e,
    skyHorizon: 0x8bb8e8,
    snowGround: 0xe8f1fa,
    snowShadow: 0xb6cde8,
    iceWall: 0x9ec5e8,
    iceTrim: 0x38bdf8,
    timberDark: 0x23293a,
    toriiRed: 0xe63946,
    toriiGold: 0xfbbf24,
    stoneLantern: 0x64748b,
    lanternGlow: 0xffaa44,
    sakuraPink: 0xff5c8a,
    cryoCyan: 0x00e5ff,
    pineBark: 0x3e2c23,
    pineNeedles: 0x1e3f3b,
    outlineInk: 0x0f172a,
  };

export function buildShintoShrineWorld(scene) {
  const worldGroup = new THREE.Group();
  scene.add(worldGroup);

  const colliders = [];
  const shootables = [];
  const animatedProps = [];

  const mats = {
    snow: createCelMaterial(PALETTE.snowGround, 0.85, 0.04),
    snowPath: createCelMaterial(PALETTE.snowShadow, 0.75, 0.08),
    iceWall: createCelMaterial(PALETTE.iceWall, 0.28, 0.22),
    iceCrystal: createCelMaterial(PALETTE.cryoCyan, 0.15, 0.6, PALETTE.cryoCyan, 0.45),
    timber: createCelMaterial(PALETTE.timberDark, 0.6, 0.12),
    torii: createCelMaterial(PALETTE.toriiRed, 0.42, 0.1),
    gold: createCelMaterial(PALETTE.toriiGold, 0.25, 0.75, PALETTE.toriiGold, 0.2),
    stone: createCelMaterial(PALETTE.stoneLantern, 0.72, 0.08),
    lanternLight: createCelMaterial(PALETTE.lanternGlow, 0.2, 0.1, PALETTE.lanternGlow, 0.85),
    sakura: createCelMaterial(PALETTE.sakuraPink, 0.5, 0.05, PALETTE.sakuraPink, 0.35),
    bark: createCelMaterial(PALETTE.pineBark, 0.85, 0.05),
    pine: createCelMaterial(PALETTE.pineNeedles, 0.75, 0.05),
  };

  function addBox(w, h, d, x, y, z, mat, withCollider = true, withOutline = true) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    if (withOutline) addCelOutline(mesh, 0.025);
    worldGroup.add(mesh);
    if (withCollider) {
      colliders.push(new THREE.Box3().setFromObject(mesh));
      shootables.push(mesh);
    }
    return mesh;
  }

  // 1. Snow-blanketed courtyard floor & stone flagstones
  addBox(44, 0.5, 44, 0, -0.25, 0, mats.snow, true, false);
  for (let i = -16; i <= 16; i += 2.8) {
    addBox(3.4, 0.08, 1.8, 0, 0.04, i, mats.snowPath, false, false);
    addBox(1.8, 0.08, 3.4, i, 0.04, -4, mats.snowPath, false, false);
  }

  // 2. Fortress Perimeter Walls with Japanese Castle Roof Trim
  addBox(0.8, 5.6, 44, -22, 2.8, 0, mats.iceWall);
  addBox(0.8, 5.6, 44, 22, 2.8, 0, mats.iceWall);
  addBox(44, 5.6, 0.8, 0, 2.8, -22, mats.iceWall);
  addBox(44, 5.6, 0.8, 0, 2.8, 22, mats.iceWall);
  addBox(1.4, 0.6, 44.4, -22, 5.8, 0, mats.timber, false, true);
  addBox(1.4, 0.6, 44.4, 22, 5.8, 0, mats.timber, false, true);
  addBox(44.4, 0.6, 1.4, 0, 5.8, -22, mats.timber, false, true);

  // 3. Site A: Grand Vermilion Torii Gate & Sacred Spirit Altar (North, z = -10)
  function buildToriiGate(cx, cz, scale = 1.0) {
    const pSpan = 3.4 * scale;
    const pHeight = 5.6 * scale;
    const leftPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.32 * scale, 0.38 * scale, pHeight, 12), mats.torii);
    leftPillar.position.set(cx - pSpan, pHeight * 0.5, cz);
    leftPillar.castShadow = true;
    addCelOutline(leftPillar, 0.04);
    worldGroup.add(leftPillar);
    colliders.push(new THREE.Box3().setFromObject(leftPillar));
    shootables.push(leftPillar);

    const rightPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.32 * scale, 0.38 * scale, pHeight, 12), mats.torii);
    rightPillar.position.set(cx + pSpan, pHeight * 0.5, cz);
    rightPillar.castShadow = true;
    addCelOutline(rightPillar, 0.04);
    worldGroup.add(rightPillar);
    colliders.push(new THREE.Box3().setFromObject(rightPillar));
    shootables.push(rightPillar);

    addBox(9.2 * scale, 0.55 * scale, 0.85 * scale, cx, pHeight + 0.15 * scale, cz, mats.torii, false, true);
    addBox(9.6 * scale, 0.25 * scale, 1.05 * scale, cx, pHeight + 0.52 * scale, cz, mats.timber, false, true);
    addBox(9.5 * scale, 0.16 * scale, 0.95 * scale, cx, pHeight + 0.68 * scale, cz, mats.snow, false, false);
    addBox(7.8 * scale, 0.38 * scale, 0.55 * scale, cx, pHeight - 1.05 * scale, cz, mats.torii, false, true);
    addBox(0.65 * scale, 1.1 * scale, 0.4 * scale, cx, pHeight - 0.45 * scale, cz, mats.gold, false, true);
  }

  buildToriiGate(0, -10.5, 1.15);
  buildToriiGate(0, -16.0, 0.95);

  // Site A Glowing Bomb Altar Circle & Markings
  const siteARing = new THREE.Mesh(new THREE.CylinderGeometry(2.8, 2.8, 0.08, 32), mats.iceCrystal);
  siteARing.position.set(0, 0.04, -10.5);
  worldGroup.add(siteARing);
  animatedProps.push({ mesh: siteARing, type: 'pulse', baseY: 0.04 });

  // 4. Site B: Cryo Bell Pagoda & Geothermal Bridge (East, x = 9.5, z = -3.5)
  addBox(6.8, 0.6, 6.8, 9.5, 0.3, -3.5, mats.stone);
  addBox(0.5, 3.8, 0.5, 7.0, 2.4, -6.0, mats.timber);
  addBox(0.5, 3.8, 0.5, 12.0, 2.4, -6.0, mats.timber);
  addBox(0.5, 3.8, 0.5, 7.0, 2.4, -1.0, mats.timber);
  addBox(0.5, 3.8, 0.5, 12.0, 2.4, -1.0, mats.timber);
  addBox(7.6, 0.65, 7.6, 9.5, 4.5, -3.5, mats.timber, false, true);
  addBox(7.2, 0.25, 7.2, 9.5, 4.95, -3.5, mats.snow, false, false);

  const siteBRing = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 0.1, 28), mats.sakura);
  siteBRing.position.set(9.5, 0.65, -3.5);
  worldGroup.add(siteBRing);
  animatedProps.push({ mesh: siteBRing, type: 'pulse', baseY: 0.65 });

  // 5. Tactical Cover: Frost Walls, Timber Crates & Stone Lanterns (Toro)
  function buildStoneLantern(x, z) {
    addBox(0.9, 0.4, 0.9, x, 0.2, z, mats.stone);
    addBox(0.5, 1.4, 0.5, x, 1.1, z, mats.stone);
    const core = addBox(0.65, 0.65, 0.65, x, 2.1, z, mats.lanternLight, false, true);
    addBox(1.25, 0.3, 1.25, x, 2.55, z, mats.stone, false, true);
    addBox(1.1, 0.15, 1.1, x, 2.75, z, mats.snow, false, false);
    animatedProps.push({ mesh: core, type: 'lantern', baseY: 2.1 });
  }

  buildStoneLantern(-4.2, -3.8);
  buildStoneLantern(4.2, -3.8);
  buildStoneLantern(-5.5, -13.0);
  buildStoneLantern(5.5, -13.0);

  // Mid courtyard tactical cover blocks with snow caps (clear central Torii sightline)
  const coverPositions = [
    [-3.4, 0.75, 1.5, 2.6, 1.5, 1.1, mats.iceWall],
    [3.4, 0.75, 1.5, 2.6, 1.5, 1.1, mats.iceWall],
    [-7.8, 0.9, -4.5, 2.2, 1.8, 2.2, mats.timber],
    [-2.5, 0.65, -3.2, 1.8, 1.3, 1.1, mats.stone],
    [2.5, 0.65, -3.2, 1.8, 1.3, 1.1, mats.stone],
    [-6.0, 0.75, 6.2, 3.2, 1.5, 1.2, mats.iceWall],
    [6.0, 0.75, 6.2, 3.2, 1.5, 1.2, mats.iceWall],
  ];
  for (const [x, y, z, w, h, d, mat] of coverPositions) {
    addBox(w, h, d, x, y, z, mat);
    addBox(w + 0.12, 0.18, d + 0.12, x, y + h * 0.5 + 0.09, z, mats.snow, false, false);
  }

  // 6. Winter Matsu Pines & Frozen Sakura Trees
  function buildSnowTree(x, z, isSakura = false) {
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.42, 2.8, 8), mats.bark);
    trunk.position.set(x, 1.4, z);
    addCelOutline(trunk, 0.04);
    worldGroup.add(trunk);
    colliders.push(new THREE.Box3().setFromObject(trunk));

    const canopyMat = isSakura ? mats.sakura : mats.pine;
    for (let layer = 0; layer < 3; layer++) {
      const r = (2.1 - layer * 0.45);
      const h = 1.45;
      const cone = new THREE.Mesh(new THREE.ConeGeometry(r, h, 9), canopyMat);
      cone.position.set(x, 2.6 + layer * 1.05, z);
      addCelOutline(cone, 0.03);
      worldGroup.add(cone);

      const snowCap = new THREE.Mesh(new THREE.ConeGeometry(r * 0.92, h * 0.38, 9), mats.snow);
      snowCap.position.set(x, 2.95 + layer * 1.05, z);
      worldGroup.add(snowCap);
    }
  }

  buildSnowTree(-12.5, -11.5, true);
  buildSnowTree(13.5, -11.5, true);
  buildSnowTree(-13.0, 3.5, false);
  buildSnowTree(14.0, 4.5, false);

  // 7. Distant Snowy Japanese Alps Peaks (Skyline Backdrop)
  const mountainMat = createCelMaterial(0x6c8ebf, 0.9, 0.02);
  const snowPeakMat = createCelMaterial(0xffffff, 0.6, 0.05, 0xdbeafe, 0.15);
  const peaks = [
    [-26, -34, 18, 22],
    [-8, -38, 22, 28],
    [14, -36, 20, 25],
    [32, -32, 16, 20],
  ];
  for (const [px, pz, rad, ht] of peaks) {
    const mtn = new THREE.Mesh(new THREE.ConeGeometry(rad, ht, 7), mountainMat);
    mtn.position.set(px, ht * 0.42, pz);
    worldGroup.add(mtn);
    const cap = new THREE.Mesh(new THREE.ConeGeometry(rad * 0.46, ht * 0.46, 7), snowPeakMat);
    cap.position.set(px, ht * 0.42 + ht * 0.27, pz);
    worldGroup.add(cap);
  }

  // 8. Falling Snowflakes & Sakura Petals Particle System
  const particleCount = 650;
  const snowGeo = new THREE.BufferGeometry();
  const snowPositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    snowPositions[i * 3] = (Math.random() - 0.5) * 42;
    snowPositions[i * 3 + 1] = Math.random() * 14 + 0.5;
    snowPositions[i * 3 + 2] = (Math.random() - 0.5) * 42;
  }
  snowGeo.setAttribute('position', new THREE.BufferAttribute(snowPositions, 3));
  const snowSystem = new THREE.Points(
    snowGeo,
    new THREE.PointsMaterial({ color: 0xffffff, size: 0.16, transparent: true, opacity: 0.9 })
  );
  worldGroup.add(snowSystem);

  // 9. Cel-Shade Anime Lighting & Atmospheric Fog
  scene.background = new THREE.Color(0x9bc5ef);
  scene.fog = new THREE.FogExp2(0x9bc5ef, 0.016);

  const hemi = new THREE.HemisphereLight(0xe0f2fe, 0x475569, 1.35);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight(0xfffbeb, 2.3);
  sun.position.set(14, 24, 12);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -24;
  sun.shadow.camera.right = 24;
  sun.shadow.camera.top = 24;
  sun.shadow.camera.bottom = -24;
  sun.shadow.camera.far = 64;
  sun.shadow.bias = -0.0005;
  scene.add(sun);

  const cryoRim = new THREE.DirectionalLight(0x38bdf8, 1.05);
  cryoRim.position.set(-16, 10, -14);
  scene.add(cryoRim);

  const sakuraFill = new THREE.DirectionalLight(0xff5c8a, 0.45);
  sakuraFill.position.set(0, 8, 16);
  scene.add(sakuraFill);

  return {
    worldGroup,
    colliders,
    shootables,
    snowSystem,
    sites: {
      A: new THREE.Vector3(0, 0, -10.5),
      B: new THREE.Vector3(9.5, 0.6, -3.5),
    },
    updateWorld(dt, elapsed) {
      const pos = snowSystem.geometry.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        let y = pos.getY(i) - dt * 1.4;
        let x = pos.getX(i) + Math.sin(elapsed + i) * dt * 0.35;
        if (y < 0.2) y = 14.0;
        pos.setXY(i, x, y);
      }
      pos.needsUpdate = true;

      for (const prop of animatedProps) {
        if (prop.type === 'pulse') {
          const s = 1 + Math.sin(elapsed * 3.2) * 0.04;
          prop.mesh.scale.set(s, 1, s);
        }
      }
    },
  };
}

export function createCelMaterial(hex, rough = 0.65, metal = 0.08, emit = 0x000000, emitInt = 0) {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(hex),
    roughness: rough,
    metalness: metal,
    emissive: new THREE.Color(emit),
    emissiveIntensity: emitInt,
  });
}

export function addCelOutline(mesh, thickness = 0.035, outlineColor = PALETTE.outlineInk) {
  const outlineMat = new THREE.MeshBasicMaterial({
    color: outlineColor,
    side: THREE.BackSide,
  });
  const outlineMesh = new THREE.Mesh(mesh.geometry, outlineMat);
  outlineMesh.scale.set(1 + thickness, 1 + thickness, 1 + thickness);
  mesh.add(outlineMesh);
  return outlineMesh;
}
