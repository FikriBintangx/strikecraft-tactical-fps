// 3D Cel-Shaded Shinto Armoury & First-Person Tactical Weapon Rig for YukiStrike: Zero
import * as THREE from 'three';

  const ARMOURY_COLUMNS = [
    {
      id: 'sidearms',
      label: '1 SIDEARMS',
      items: [
        {
          id: 'wakizashi-sidearm',
          name: 'Wakizashi Sidearm',
          category: '1 SIDEARMS',
          slot: 'secondary',
          cost: 0,
          owned: true,
          badge: '¥0 Owned',
          stats: '32 dmg, x3.5 head',
          dmg: 32,
          headMult: 3.5,
          rpm: 420,
          magSize: 12,
          reserve: 48,
          reloadTime: 1.35,
          spread: 0.008,
          recoilKick: 0.032,
          pellets: 1,
          automatic: false,
          accentColor: 0x38bdf8,
        },
        {
          id: 'kitsune-heavy-pistol',
          name: 'Kitsune Heavy Pistol',
          category: '1 SIDEARMS',
          slot: 'secondary',
          cost: 600,
          owned: false,
          badge: '¥600',
          stats: '54 dmg, x3.8 head',
          dmg: 54,
          headMult: 3.8,
          rpm: 240,
          magSize: 7,
          reserve: 35,
          reloadTime: 1.55,
          spread: 0.005,
          recoilKick: 0.055,
          pellets: 1,
          automatic: false,
          accentColor: 0xff5c8a,
        },
      ],
    },
    {
      id: 'cryo-smgs',
      label: '2 CRYO SMGS',
      items: [
        {
          id: 'yuki-9-cryo-smg',
          name: 'yuki-9 Cryo SMG',
          category: '2 CRYO SMGS',
          slot: 'primary',
          cost: 1250,
          owned: false,
          badge: '¥1,250',
          stats: '26 dmg, 780 rpm',
          dmg: 26,
          headMult: 2.5,
          rpm: 780,
          magSize: 32,
          reserve: 96,
          reloadTime: 1.65,
          spread: 0.016,
          recoilKick: 0.022,
          pellets: 1,
          automatic: true,
          accentColor: 0x00e5ff,
        },
        {
          id: 'arashi-frost-shotgun',
          name: 'Arashi Frost Shotgun',
          category: '2 CRYO SMGS',
          slot: 'primary',
          cost: 1400,
          owned: false,
          badge: '¥1,400',
          stats: '18x8 pellets',
          dmg: 18,
          headMult: 2.0,
          rpm: 85,
          magSize: 6,
          reserve: 24,
          reloadTime: 2.1,
          spread: 0.065,
          recoilKick: 0.085,
          pellets: 8,
          automatic: false,
          accentColor: 0x7dd3fc,
        },
      ],
    },
    {
      id: 'rifles-snipers',
      label: '3 RIFLES & SNIPERS',
      items: [
        {
          id: 'type-89-kitsune-rifle',
          name: 'Type-89 Kitsune Rifle',
          category: '3 RIFLES & SNIPERS',
          slot: 'primary',
          cost: 2700,
          owned: false,
          badge: '¥2,700',
          stats: '42 dmg, x3.6 head, 640 rpm',
          dmg: 42,
          headMult: 3.6,
          rpm: 640,
          magSize: 30,
          reserve: 90,
          reloadTime: 1.85,
          spread: 0.009,
          recoilKick: 0.036,
          pellets: 1,
          automatic: true,
          accentColor: 0x00e5ff,
        },
        {
          id: 'amaterasu-rail-sniper',
          name: 'Amaterasu Rail Sniper',
          category: '3 RIFLES & SNIPERS',
          slot: 'primary',
          cost: 4500,
          owned: false,
          badge: '¥4,500',
          stats: '145 dmg, x4.0 head',
          dmg: 145,
          headMult: 4.0,
          rpm: 52,
          magSize: 5,
          reserve: 15,
          reloadTime: 2.4,
          spread: 0.001,
          recoilKick: 0.11,
          pellets: 1,
          automatic: false,
          accentColor: 0xfbbf24,
        },
      ],
    },
    {
      id: 'spirit-gear',
      label: '4 SPIRIT GEAR',
      items: [
        {
          id: 'spirit-haori-vest',
          name: 'Spirit Haori Vest',
          category: '4 SPIRIT GEAR',
          slot: 'gear',
          cost: 650,
          owned: false,
          badge: '¥650',
          stats: '100 Shield',
          shield: 100,
          accentColor: 0x38bdf8,
        },
        {
          id: 'shinto-defuse-kit',
          name: 'Shinto Defuse Kit',
          category: '4 SPIRIT GEAR',
          slot: 'gear',
          cost: 400,
          owned: false,
          badge: '¥400',
          stats: '4s defuse',
          defuseSeconds: 4,
          accentColor: 0xfbbf24,
        },
      ],
    },
    {
      id: 'grenades-relics',
      label: '5 GRENADES & RELICS',
      items: [
        {
          id: 'blizzard-smoke-orb',
          name: 'Blizzard Smoke Orb',
          category: '5 GRENADES & RELICS',
          slot: 'utility',
          cost: 300,
          owned: false,
          badge: '¥300',
          stats: '15s frost cloud',
          durationSeconds: 15,
          accentColor: 0x7dd3fc,
        },
        {
          id: 'sakura-flash-charm',
          name: 'Sakura Flash Charm',
          category: '5 GRENADES & RELICS',
          slot: 'utility',
          cost: 250,
          owned: false,
          badge: '¥250',
          stats: '3.0s blind',
          blindSeconds: 3.0,
          accentColor: 0xff5c8a,
        },
      ],
    },
  ];

  const RIG_PALETTE = {
    slateBody: 0x1e293b,
    slateDark: 0x0f172a,
    slateLight: 0x334155,
    outlineBlack: 0x05080f,
    cryoCyan: 0x00e5ff,
    sakuraPink: 0xff5c8a,
    sakuraGold: 0xfbbf24,
    gloveDark: 0x172030,
    sleeveCloth: 0x243047,
    flashCore: 0xffffff,
  };

export function getArmouryCatalog() {
  const columns = ARMOURY_COLUMNS.map((col) => ({
    id: col.id,
    label: col.label,
    items: col.items.map((item) => ({ ...item })),
  }));
  const items = columns.flatMap((col) => col.items);
  return {
    title: 'SHINTO ARMOURY',
    columns,
    items,
  };
}

export function createFirstPersonWeaponRig(camera, scene) {
  function addBackSideOutline(mesh, thickness = 0.045, color = RIG_PALETTE.outlineBlack) {
    const outlineMat = new THREE.MeshBasicMaterial({
      color,
      side: THREE.BackSide,
    });
    const outline = new THREE.Mesh(mesh.geometry, outlineMat);
    outline.scale.set(1 + thickness, 1 + thickness, 1 + thickness);
    mesh.add(outline);
    return outline;
  }

  function makeCelPart(geometry, color, options = {}) {
    const {
      roughness = 0.45,
      metalness = 0.25,
      emissive = 0x000000,
      emissiveIntensity = 0,
      outline = true,
      outlineThickness = 0.045,
      transparent = false,
      opacity = 1,
    } = options;
    const mat = new THREE.MeshStandardMaterial({
      color,
      roughness,
      metalness,
      emissive,
      emissiveIntensity,
      transparent,
      opacity,
    });
    const mesh = new THREE.Mesh(geometry, mat);
    if (outline) addBackSideOutline(mesh, outlineThickness);
    return mesh;
  }

  const catalog = getArmouryCatalog();
  const weaponLookup = new Map(catalog.items.map((item) => [item.id, item]));
  let activeWeapon = { ...weaponLookup.get('type-89-kitsune-rifle') };

  const rigRoot = new THREE.Group();
  rigRoot.name = 'YukiStrikeWeaponRig';
  const basePos = new THREE.Vector3(0.25, -0.22, -0.43);
  rigRoot.position.copy(basePos);
  camera.add(rigRoot);

  const weaponPivot = new THREE.Group();
  rigRoot.add(weaponPivot);

  // Main dark slate receiver body (0x1e293b) with black THREE.BackSide cel-outline
  const receiver = makeCelPart(
    new THREE.BoxGeometry(0.072, 0.095, 0.42),
    RIG_PALETTE.slateBody,
    { roughness: 0.42, metalness: 0.35, outlineThickness: 0.055 }
  );
  weaponPivot.add(receiver);

  // Upper shroud & Picatinny spine
  const upperShroud = makeCelPart(
    new THREE.BoxGeometry(0.064, 0.038, 0.46),
    RIG_PALETTE.slateLight,
    { roughness: 0.38, metalness: 0.4, outlineThickness: 0.05 }
  );
  upperShroud.position.set(0, 0.056, -0.04);
  weaponPivot.add(upperShroud);

  // Handguard & barrel assembly
  const handguard = makeCelPart(
    new THREE.BoxGeometry(0.056, 0.068, 0.28),
    RIG_PALETTE.slateBody,
    { roughness: 0.4, metalness: 0.35, outlineThickness: 0.055 }
  );
  handguard.position.set(0, 0.008, -0.33);
  weaponPivot.add(handguard);

  const barrel = makeCelPart(
    new THREE.CylinderGeometry(0.014, 0.016, 0.24, 10),
    RIG_PALETTE.slateDark,
    { roughness: 0.3, metalness: 0.65, outlineThickness: 0.08 }
  );
  barrel.rotation.x = Math.PI * 0.5;
  barrel.position.set(0, 0.018, -0.52);
  weaponPivot.add(barrel);

  const muzzleBrake = makeCelPart(
    new THREE.BoxGeometry(0.036, 0.038, 0.065),
    RIG_PALETTE.slateLight,
    { roughness: 0.3, metalness: 0.6, outlineThickness: 0.07 }
  );
  muzzleBrake.position.set(0, 0.018, -0.64);
  weaponPivot.add(muzzleBrake);

  // Glowing cyan cryo barrel strips (0x00e5ff) on left, right, and core vent
  const cryoStripMat = new THREE.MeshStandardMaterial({
    color: RIG_PALETTE.cryoCyan,
    emissive: RIG_PALETTE.cryoCyan,
    emissiveIntensity: 1.35,
    roughness: 0.2,
    metalness: 0.1,
  });
  const cryoStripLeft = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.014, 0.34), cryoStripMat);
  cryoStripLeft.position.set(-0.032, 0.022, -0.27);
  weaponPivot.add(cryoStripLeft);

  const cryoStripRight = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.014, 0.34), cryoStripMat);
  cryoStripRight.position.set(0.032, 0.022, -0.27);
  weaponPivot.add(cryoStripRight);

  const cryoCoreCell = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.016, 0.14), cryoStripMat);
  cryoCoreCell.position.set(0, 0.046, -0.28);
  weaponPivot.add(cryoCoreCell);

  // Stock & angled pistol grip
  const stock = makeCelPart(
    new THREE.BoxGeometry(0.056, 0.085, 0.22),
    RIG_PALETTE.slateDark,
    { roughness: 0.5, metalness: 0.25, outlineThickness: 0.055 }
  );
  stock.position.set(0, -0.012, 0.27);
  weaponPivot.add(stock);

  const pistolGrip = makeCelPart(
    new THREE.BoxGeometry(0.042, 0.115, 0.048),
    RIG_PALETTE.slateDark,
    { roughness: 0.6, metalness: 0.15, outlineThickness: 0.06 }
  );
  pistolGrip.position.set(0, -0.085, 0.1);
  pistolGrip.rotation.x = 0.28;
  weaponPivot.add(pistolGrip);

  // Curved tactical magazine with glowing cryo ammo bar
  const magazineGroup = new THREE.Group();
  magazineGroup.position.set(0, -0.105, -0.09);
  magazineGroup.rotation.x = -0.18;
  const magBody = makeCelPart(
    new THREE.BoxGeometry(0.04, 0.145, 0.062),
    RIG_PALETTE.slateLight,
    { roughness: 0.45, metalness: 0.3, outlineThickness: 0.06 }
  );
  magazineGroup.add(magBody);
  const magStrip = new THREE.Mesh(new THREE.BoxGeometry(0.043, 0.085, 0.014), cryoStripMat);
  magStrip.position.set(0, -0.01, -0.012);
  magazineGroup.add(magStrip);
  weaponPivot.add(magazineGroup);

  // Holographic optic frame + reticle
  const opticGroup = new THREE.Group();
  opticGroup.position.set(0, 0.1, -0.02);
  weaponPivot.add(opticGroup);

  const opticBase = makeCelPart(
    new THREE.BoxGeometry(0.052, 0.02, 0.095),
    RIG_PALETTE.slateDark,
    { outlineThickness: 0.07 }
  );
  opticGroup.add(opticBase);

  const opticLeftPost = makeCelPart(
    new THREE.BoxGeometry(0.01, 0.052, 0.065),
    RIG_PALETTE.slateBody,
    { outlineThickness: 0.08 }
  );
  opticLeftPost.position.set(-0.024, 0.032, 0);
  opticGroup.add(opticLeftPost);

  const opticRightPost = makeCelPart(
    new THREE.BoxGeometry(0.01, 0.052, 0.065),
    RIG_PALETTE.slateBody,
    { outlineThickness: 0.08 }
  );
  opticRightPost.position.set(0.024, 0.032, 0);
  opticGroup.add(opticRightPost);

  const opticTopArch = makeCelPart(
    new THREE.BoxGeometry(0.058, 0.01, 0.065),
    RIG_PALETTE.slateLight,
    { outlineThickness: 0.08 }
  );
  opticTopArch.position.set(0, 0.058, 0);
  opticGroup.add(opticTopArch);

  const holoLens = new THREE.Mesh(
    new THREE.PlaneGeometry(0.04, 0.042),
    new THREE.MeshBasicMaterial({
      color: RIG_PALETTE.cryoCyan,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
  );
  holoLens.position.set(0, 0.034, 0);
  opticGroup.add(holoLens);

  const reticleRing = new THREE.Mesh(
    new THREE.RingGeometry(0.006, 0.0085, 16),
    new THREE.MeshBasicMaterial({
      color: RIG_PALETTE.sakuraPink,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
      depthTest: false,
    })
  );
  reticleRing.position.set(0, 0.034, 0.002);
  opticGroup.add(reticleRing);

  const reticleDot = new THREE.Mesh(
    new THREE.CircleGeometry(0.0022, 10),
    new THREE.MeshBasicMaterial({
      color: RIG_PALETTE.cryoCyan,
      side: THREE.DoubleSide,
      depthTest: false,
    })
  );
  reticleDot.position.set(0, 0.034, 0.003);
  opticGroup.add(reticleDot);

  // Sakura pink charm accent (0xff5c8a) dangling on left receiver ring
  const charmAnchor = new THREE.Group();
  charmAnchor.position.set(-0.045, -0.01, -0.05);
  weaponPivot.add(charmAnchor);

  const charmRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.008, 0.0022, 6, 12),
    new THREE.MeshStandardMaterial({ color: RIG_PALETTE.sakuraGold, metalness: 0.7, roughness: 0.25 })
  );
  charmRing.rotation.y = Math.PI * 0.5;
  charmAnchor.add(charmRing);

  const sakuraCharm = makeCelPart(
    new THREE.OctahedronGeometry(0.022, 0),
    RIG_PALETTE.sakuraPink,
    {
      roughness: 0.3,
      metalness: 0.1,
      emissive: RIG_PALETTE.sakuraPink,
      emissiveIntensity: 0.55,
      outlineThickness: 0.09,
    }
  );
  sakuraCharm.scale.set(0.8, 1.35, 0.45);
  sakuraCharm.position.set(0, -0.032, 0);
  charmAnchor.add(sakuraCharm);

  const charmTassel = makeCelPart(
    new THREE.ConeGeometry(0.009, 0.03, 6),
    RIG_PALETTE.sakuraGold,
    { emissive: RIG_PALETTE.sakuraGold, emissiveIntensity: 0.25, outline: false }
  );
  charmTassel.position.set(0, -0.064, 0);
  charmAnchor.add(charmTassel);

  // Stylized cel-shaded gloved hands & tactical kimono sleeves
  const rightHandGroup = new THREE.Group();
  rightHandGroup.position.set(0.014, -0.092, 0.13);
  weaponPivot.add(rightHandGroup);

  const rightGlove = makeCelPart(
    new THREE.BoxGeometry(0.058, 0.068, 0.088),
    RIG_PALETTE.gloveDark,
    { roughness: 0.65, metalness: 0.1, outlineThickness: 0.06 }
  );
  rightHandGroup.add(rightGlove);

  const rightCuff = makeCelPart(
    new THREE.BoxGeometry(0.072, 0.078, 0.035),
    RIG_PALETTE.cryoCyan,
    { emissive: RIG_PALETTE.cryoCyan, emissiveIntensity: 0.35, outlineThickness: 0.05 }
  );
  rightCuff.position.set(0.01, -0.015, 0.065);
  rightHandGroup.add(rightCuff);

  const rightSleeve = makeCelPart(
    new THREE.BoxGeometry(0.088, 0.092, 0.22),
    RIG_PALETTE.sleeveCloth,
    { roughness: 0.72, metalness: 0.08, outlineThickness: 0.05 }
  );
  rightSleeve.position.set(0.032, -0.045, 0.18);
  rightSleeve.rotation.set(0.18, -0.14, 0);
  rightHandGroup.add(rightSleeve);

  const leftHandGroup = new THREE.Group();
  leftHandGroup.position.set(-0.048, -0.036, -0.26);
  weaponPivot.add(leftHandGroup);

  const leftGlove = makeCelPart(
    new THREE.BoxGeometry(0.062, 0.054, 0.092),
    RIG_PALETTE.gloveDark,
    { roughness: 0.65, metalness: 0.1, outlineThickness: 0.06 }
  );
  leftGlove.rotation.z = -0.35;
  leftHandGroup.add(leftGlove);

  const leftSleeve = makeCelPart(
    new THREE.BoxGeometry(0.084, 0.086, 0.24),
    RIG_PALETTE.sleeveCloth,
    { roughness: 0.72, metalness: 0.08, outlineThickness: 0.05 }
  );
  leftSleeve.position.set(-0.078, -0.065, 0.15);
  leftSleeve.rotation.set(0.22, 0.42, -0.2);
  leftHandGroup.add(leftSleeve);

  // Local muzzle anchor at barrel exit
  const muzzleAnchor = new THREE.Object3D();
  muzzleAnchor.position.set(0, 0.018, -0.685);
  weaponPivot.add(muzzleAnchor);

  // 3D volumetric muzzle flash star group in scene
  const muzzleFlashGroup = new THREE.Group();
  muzzleFlashGroup.name = 'YukiStrikeMuzzleFlash';
  muzzleFlashGroup.visible = false;

  const flashCoreMat = new THREE.MeshBasicMaterial({
    color: RIG_PALETTE.flashCore,
    transparent: true,
    opacity: 0.96,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const flashCryoMat = new THREE.MeshBasicMaterial({
    color: RIG_PALETTE.cryoCyan,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const flashCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.075, 0), flashCoreMat);
  muzzleFlashGroup.add(flashCore);

  for (let i = 0; i < 6; i++) {
    const fin = new THREE.Mesh(new THREE.ConeGeometry(0.042, 0.26, 4), flashCryoMat);
    const angle = (i / 6) * Math.PI * 2;
    fin.rotation.z = angle;
    fin.position.set(-Math.sin(angle) * 0.09, Math.cos(angle) * 0.09, 0);
    muzzleFlashGroup.add(fin);
  }

  const forwardSpike = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.34, 6), flashCryoMat);
  forwardSpike.rotation.x = -Math.PI * 0.5;
  forwardSpike.position.z = -0.15;
  muzzleFlashGroup.add(forwardSpike);

  const flashLight = new THREE.PointLight(RIG_PALETTE.cryoCyan, 3.2, 6.5);
  muzzleFlashGroup.add(flashLight);
  scene.add(muzzleFlashGroup);

  // Cyan cryo laser tracer beam in scene
  const tracerMat = new THREE.MeshBasicMaterial({
    color: RIG_PALETTE.cryoCyan,
    transparent: true,
    opacity: 0.92,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const tracerGeom = new THREE.CylinderGeometry(0.012, 0.012, 1, 8);
  tracerGeom.rotateX(Math.PI * 0.5);
  const tracerMesh = new THREE.Mesh(tracerGeom, tracerMat);
  tracerMesh.name = 'YukiStrikeCryoTracer';
  tracerMesh.visible = false;
  scene.add(tracerMesh);

  // Weapon simulation state
  const raycaster = new THREE.Raycaster();
  raycaster.far = 110;
  let ammo = activeWeapon.magSize;
  let reserve = activeWeapon.reserve;
  let reloading = false;
  let reloadTimer = 0;
  let fireCooldown = 0;
  let recoilOffset = 0;
  let recoilPitch = 0;
  let spreadBloom = 0;
  let flashTimer = 0;
  let tracerTimer = 0;
  let bobPhase = 0;
  let charmPhase = 0;

  const tmpMuzzleWorld = new THREE.Vector3();
  const tmpTarget = new THREE.Vector3();
  const tmpMid = new THREE.Vector3();
  const tmpDir = new THREE.Vector3();
  const tmpRayDir = new THREE.Vector3();

  function showTracerAndFlash(targetWorldPos, showMuzzleFlash = true) {
    camera.updateMatrixWorld(true);
    rigRoot.updateMatrixWorld(true);
    muzzleAnchor.getWorldPosition(tmpMuzzleWorld);

    if (showMuzzleFlash) {
      muzzleFlashGroup.position.copy(tmpMuzzleWorld);
      muzzleFlashGroup.quaternion.copy(camera.quaternion);
      muzzleFlashGroup.rotateZ(Math.random() * Math.PI);
      const scale = 0.9 + Math.random() * 0.35;
      muzzleFlashGroup.scale.setScalar(scale);
      muzzleFlashGroup.visible = true;
      flashTimer = 0.065;
    } else {
      muzzleFlashGroup.visible = false;
    }

    if (targetWorldPos) {
      tmpTarget.copy(targetWorldPos);
      const dist = Math.max(0.15, tmpMuzzleWorld.distanceTo(tmpTarget));
      tmpMid.addVectors(tmpMuzzleWorld, tmpTarget).multiplyScalar(0.5);
      tracerMesh.position.copy(tmpMid);
      tracerMesh.scale.set(1, 1, dist);
      tracerMesh.lookAt(tmpTarget);
      tracerMesh.visible = true;
      tracerMat.opacity = 0.92;
      tracerTimer = 0.085;
    } else {
      tracerMesh.visible = false;
    }
  }

  function setCombatFirePose(targetWorldPos, showMuzzleFlash = true) {
    recoilOffset = 0.045;
    recoilPitch = 0.055;
    weaponPivot.position.set(0, 0.008, recoilOffset);
    weaponPivot.rotation.set(recoilPitch, 0.015, -0.025);
    charmAnchor.rotation.z = 0.28;
    showTracerAndFlash(targetWorldPos, showMuzzleFlash);
  }

  function resolveBotHit(hitObject, botTargets = []) {
    for (let i = 0; i < botTargets.length; i++) {
      const bot = botTargets[i];
      if (!bot) continue;
      if (bot === hitObject || bot.mesh === hitObject || bot.bodyMesh === hitObject || bot.headMesh === hitObject) {
        const isHead = bot.headMesh === hitObject || Boolean(hitObject.userData?.isHead);
        return { bot, isHead };
      }
      if (Array.isArray(bot.hitMeshes) && bot.hitMeshes.includes(hitObject)) {
        const isHead = bot.headMesh === hitObject || Boolean(hitObject.userData?.isHead);
        return { bot, isHead };
      }
      if (bot.root && typeof bot.root.traverse === 'function') {
        let matched = false;
        bot.root.traverse((child) => {
          if (child === hitObject) matched = true;
        });
        if (matched) {
          const isHead = bot.headMesh === hitObject || Boolean(hitObject.userData?.isHead);
          return { bot, isHead };
        }
      }
    }
    return null;
  }

  function fire(eyePos, aimDir, shootables = [], botTargets = []) {
    if (reloading || fireCooldown > 0 || ammo <= 0) {
      if (ammo <= 0 && !reloading && reserve > 0) reload();
      return { fired: false, hit: false, headshot: false, damage: 0, ammo, reserve };
    }

    const originVec = eyePos || camera.getWorldPosition(tmpMuzzleWorld);
    const forwardVec = aimDir || camera.getWorldDirection(tmpDir);

    ammo -= 1;
    fireCooldown = 60 / (activeWeapon.rpm || 600);
    const kick = activeWeapon.recoilKick || 0.035;
    recoilOffset = Math.min(0.085, recoilOffset + kick);
    recoilPitch = Math.min(0.12, recoilPitch + kick * 1.45);
    spreadBloom = Math.min(0.075, spreadBloom + (activeWeapon.spread || 0.01) * 0.85);
    charmPhase += 1.6;

    const pellets = activeWeapon.pellets || 1;
    const baseSpread = (activeWeapon.spread || 0.008) + spreadBloom;
    const targetSet = new Set(shootables);
    for (const bot of botTargets) {
      if (!bot) continue;
      if (bot.headMesh) targetSet.add(bot.headMesh);
      if (bot.bodyMesh) targetSet.add(bot.bodyMesh);
      if (Array.isArray(bot.hitMeshes)) {
        for (const m of bot.hitMeshes) targetSet.add(m);
      }
      if (bot.root) targetSet.add(bot.root);
      if (bot.isObject3D) targetSet.add(bot);
    }
    const allTargets = Array.from(targetSet);

    let anyHit = false;
    let anyHeadshot = false;
    let totalDamage = 0;
    let closestPoint = null;
    let closestBot = null;

    for (let p = 0; p < pellets; p++) {
      tmpRayDir.copy(forwardVec).normalize();
      tmpRayDir.x += (Math.random() - 0.5) * baseSpread;
      tmpRayDir.y += (Math.random() - 0.5) * baseSpread;
      tmpRayDir.z += (Math.random() - 0.5) * baseSpread;
      tmpRayDir.normalize();

      raycaster.set(originVec, tmpRayDir);
      const intersects = raycaster.intersectObjects(allTargets, true);
      if (intersects.length > 0) {
        const hitInfo = intersects[0];
        if (!closestPoint || p === 0) closestPoint = hitInfo.point.clone();
        const botMatch = resolveBotHit(hitInfo.object, botTargets);
        if (botMatch) {
          anyHit = true;
          const mult = botMatch.isHead ? (activeWeapon.headMult || 2.5) : 1.0;
          const dmg = Math.round((activeWeapon.dmg || 30) * mult);
          totalDamage += dmg;
          if (botMatch.isHead) anyHeadshot = true;
          closestBot = botMatch.bot;
          if (typeof botMatch.bot.takeDamage === 'function') {
            botMatch.bot.takeDamage(dmg, botMatch.isHead, hitInfo.point);
          }
        }
      } else if (p === 0) {
        closestPoint = tmpDir.copy(originVec).addScaledVector(tmpRayDir, 45).clone();
      }
    }

    showTracerAndFlash(closestPoint, true);

    return {
      fired: true,
      hit: anyHit,
      headshot: anyHeadshot,
      damage: totalDamage,
      point: closestPoint,
      target: closestBot,
      ammo,
      reserve,
    };
  }

  function reload() {
    if (reloading || ammo >= activeWeapon.magSize || reserve <= 0) return false;
    reloading = true;
    reloadTimer = activeWeapon.reloadTime || 1.8;
    return true;
  }

  function equipWeapon(weaponId) {
    const next = weaponLookup.get(weaponId);
    if (!next || !next.magSize) return false;
    activeWeapon = { ...next };
    ammo = activeWeapon.magSize;
    reserve = activeWeapon.reserve;
    reloading = false;
    reloadTimer = 0;
    const accent = activeWeapon.accentColor ?? RIG_PALETTE.cryoCyan;
    cryoStripMat.color.setHex(accent);
    cryoStripMat.emissive.setHex(accent);
    flashCryoMat.color.setHex(accent);
    tracerMat.color.setHex(accent);
    flashLight.color.setHex(accent);
    return true;
  }

  function update(dt, isMoving = false, moveSpeed = 1) {
    if (fireCooldown > 0) fireCooldown = Math.max(0, fireCooldown - dt);

    if (reloading) {
      reloadTimer -= dt;
      weaponPivot.rotation.z = -0.35 * Math.sin((1 - Math.max(0, reloadTimer) / (activeWeapon.reloadTime || 1.8)) * Math.PI);
      weaponPivot.position.y = -0.05;
      if (reloadTimer <= 0) {
        const needed = activeWeapon.magSize - ammo;
        const load = Math.min(needed, reserve);
        ammo += load;
        reserve -= load;
        reloading = false;
      }
    } else {
      recoilOffset = THREE.MathUtils.lerp(recoilOffset, 0, Math.min(1, dt * 16));
      recoilPitch = THREE.MathUtils.lerp(recoilPitch, 0, Math.min(1, dt * 14));
      spreadBloom = Math.max(0, spreadBloom - dt * 0.08);

      bobPhase += dt * (isMoving ? 9.5 * Math.max(0.6, moveSpeed) : 1.8);
      const bobX = isMoving ? Math.cos(bobPhase) * 0.008 : Math.cos(bobPhase) * 0.0015;
      const bobY = isMoving ? Math.abs(Math.sin(bobPhase)) * 0.007 : Math.sin(bobPhase) * 0.002;

      weaponPivot.position.set(bobX, bobY, recoilOffset);
      weaponPivot.rotation.set(recoilPitch, 0, 0);
    }

    charmPhase += dt * 4.5;
    charmAnchor.rotation.z = Math.sin(charmPhase) * 0.12 + recoilOffset * 2.5;
    charmAnchor.rotation.x = Math.cos(charmPhase * 0.7) * 0.08;

    if (flashTimer > 0) {
      flashTimer -= dt;
      if (flashTimer <= 0) muzzleFlashGroup.visible = false;
    }

    if (tracerTimer > 0) {
      tracerTimer -= dt;
      tracerMat.opacity = Math.max(0, (tracerTimer / 0.085) * 0.92);
      if (tracerTimer <= 0) tracerMesh.visible = false;
    }
  }

  function getState() {
    return {
      weaponId: activeWeapon.id,
      name: activeWeapon.name,
      ammo,
      reserve,
      magSize: activeWeapon.magSize,
      reloading,
      spreadBloom,
      recoil: recoilOffset,
    };
  }

  return {
    rigRoot,
    weaponPivot,
    muzzleAnchor,
    muzzleFlashGroup,
    tracerMesh,
    setCombatFirePose,
    fire,
    reload,
    equipWeapon,
    update,
    getState,
    getAmmo: () => ({ ammo, reserve, magSize: activeWeapon.magSize, reloading }),
  };
}
