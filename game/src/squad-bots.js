// 5v5 Articulated Cel-Shaded Anime Operatives & Volumetric Frost Smoke for YukiStrike: Zero
import * as THREE from 'three';
import { createCelMaterial, addCelOutline } from './shrine-world.js';

  const BOT_ROSTER = [
    // Crimson Ronin (Attackers - Crimson / Obsidian)
    { name: 'Akagi', team: 'RONIN', role: 'Duelist', weapon: 'Oni Vandal', k: 11, d: 5, pts: 2450, cash: 4100 },
    { name: 'Kuro', team: 'RONIN', role: 'Lurker', weapon: 'Phantom Kage', k: 8, d: 6, pts: 1840, cash: 3200 },
    { name: 'Raiden', team: 'RONIN', role: 'Initiator', weapon: 'Volt Spectre', k: 7, d: 6, pts: 1620, cash: 2950 },
    { name: 'Kaguya', team: 'RONIN', role: 'Controller', weapon: 'Crimson Judge', k: 6, d: 7, pts: 1410, cash: 2400 },
    { name: 'Oni-Boss', team: 'RONIN', role: 'Sentinel', weapon: 'Tengu Operator', k: 9, d: 4, pts: 2180, cash: 4750 },
    // Sakura Guard (Defenders - Cyan / Cobalt / White Winter Haori)
    { name: 'Yuki', team: 'SAKURA', role: 'Duelist', weapon: 'Cryo Vandal', k: 12, d: 4, pts: 2680, cash: 4250 },
    { name: 'Hana', team: 'SAKURA', role: 'Sage', weapon: 'Sakura Phantom', k: 8, d: 5, pts: 1920, cash: 3600 },
    { name: 'Ren', team: 'SAKURA', role: 'Recon', weapon: 'Frost Guardian', k: 7, d: 5, pts: 1710, cash: 3100 },
    { name: 'Sora', team: 'SAKURA', role: 'Anchor', weapon: 'Glacier Sheriff', k: 5, d: 6, pts: 1340, cash: 2700 },
  ];

  const TEAM_STYLES = {
    SAKURA: {
      armor: 0x1d4ed8,
      haori: 0xf1f5f9,
      trim: 0x00e5ff,
      visor: 0x00f0ff,
      skin: 0xffe4d6,
      legs: 0x1e293b,
      rifle: 0x0f172a,
      rifleAccent: 0x38bdf8,
    },
    RONIN: {
      armor: 0x18181b,
      haori: 0x991b1b,
      trim: 0xef4444,
      visor: 0xff2a55,
      skin: 0xf5d0c5,
      legs: 0x09090b,
      rifle: 0x111827,
      rifleAccent: 0xf43f5e,
    },
  };

export function createArticulatedBotSquad(scene) {
  const squadGroup = new THREE.Group();
  scene.add(squadGroup);

  const bots = [];
  const hitTargets = [];
  const smokeClouds = [];

  function createSmokeCloud(x, y, z, radius = 2.1, tint = 0xdbeafe) {
    const cloudGroup = new THREE.Group();
    cloudGroup.position.set(x, y, z);

    const smokeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(tint),
      roughness: 0.92,
      metalness: 0.02,
      emissive: new THREE.Color(0x38bdf8),
      emissiveIntensity: 0.12,
      transparent: true,
      opacity: 0.56,
      depthWrite: false,
    });

    const coreMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xe0f2fe),
      roughness: 0.85,
      metalness: 0.0,
      emissive: new THREE.Color(0x7dd3fc),
      emissiveIntensity: 0.18,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
    });

    const puffOffsets = [
      [0, 0.25, 0, 1.0, coreMat],
      [-0.75, -0.1, 0.45, 0.72, smokeMat],
      [0.82, 0.05, -0.35, 0.76, smokeMat],
      [0.2, 0.55, 0.65, 0.64, smokeMat],
      [-0.35, 0.48, -0.68, 0.68, coreMat],
      [0.55, -0.22, 0.58, 0.62, smokeMat],
      [-0.58, -0.18, -0.52, 0.66, smokeMat],
    ];

    const puffs = [];
    for (const [ox, oy, oz, scale, mat] of puffOffsets) {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(radius * scale * 0.58, 16, 12), mat);
      puff.position.set(ox * radius * 0.55, oy * radius * 0.55, oz * radius * 0.55);
      cloudGroup.add(puff);
      puffs.push({ mesh: puff, basePos: puff.position.clone(), phase: puffs.length * 1.1 });
    }

    squadGroup.add(cloudGroup);
    const cloud = { group: cloudGroup, puffs, basePos: new THREE.Vector3(x, y, z), radius };
    smokeClouds.push(cloud);
    return cloud;
  }

  function createHeadshotSparkCluster() {
    const sparkGroup = new THREE.Group();
    sparkGroup.visible = false;
    const goldMat = createCelMaterial(0xfef08a, 0.15, 0.2, 0xfbbf24, 1.4);
    const cryoMat = createCelMaterial(0x00f0ff, 0.15, 0.2, 0x00e5ff, 1.3);

    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.032, 8, 20), goldMat);
    sparkGroup.add(ring);

    const shards = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const shard = new THREE.Mesh(
        new THREE.ConeGeometry(0.045, 0.28, 5),
        i % 2 === 0 ? goldMat : cryoMat
      );
      shard.position.set(Math.cos(angle) * 0.28, Math.sin(angle) * 0.28, 0);
      shard.rotation.z = angle - Math.PI * 0.5;
      sparkGroup.add(shard);
      shards.push(shard);
    }

    squadGroup.add(sparkGroup);
    return { group: sparkGroup, ring, shards };
  }

  function createSpiritChargeMesh() {
    const chargeGroup = new THREE.Group();
    chargeGroup.visible = false;

    const baseMat = createCelMaterial(0x1e293b, 0.4, 0.65);
    const coreMat = createCelMaterial(0x00f0ff, 0.1, 0.3, 0x00e5ff, 1.25);
    const ringMat = createCelMaterial(0xf43f5e, 0.2, 0.4, 0xff2a55, 0.9);

    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.32, 0.16, 12), baseMat);
    base.position.y = 0.08;
    addCelOutline(base, 0.04);
    chargeGroup.add(base);

    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.19, 0), coreMat);
    core.position.y = 0.38;
    addCelOutline(core, 0.04);
    chargeGroup.add(core);

    const halo = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.025, 8, 24), ringMat);
    halo.position.y = 0.38;
    halo.rotation.x = Math.PI * 0.35;
    chargeGroup.add(halo);

    squadGroup.add(chargeGroup);
    return { group: chargeGroup, core, halo };
  }

  function buildArticulatedOperative(entry, index) {
    const style = TEAM_STYLES[entry.team];
    const group = new THREE.Group();

    const armorMat = createCelMaterial(style.armor, 0.45, 0.25);
    const haoriMat = createCelMaterial(style.haori, 0.68, 0.08);
    const trimMat = createCelMaterial(style.trim, 0.25, 0.4, style.trim, 0.35);
    const visorMat = createCelMaterial(style.visor, 0.1, 0.2, style.visor, 1.35);
    const skinMat = createCelMaterial(style.skin, 0.72, 0.02);
    const legMat = createCelMaterial(style.legs, 0.65, 0.12);
    const rifleMat = createCelMaterial(style.rifle, 0.38, 0.55);
    const rifleAccentMat = createCelMaterial(style.rifleAccent, 0.2, 0.4, style.rifleAccent, 0.7);

    // Articulated Legs (hip pivots at y = 0.76)
    const leftLegPivot = new THREE.Group();
    leftLegPivot.position.set(-0.15, 0.76, 0);
    const leftLegMesh = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.76, 0.24), legMat);
    leftLegMesh.position.y = -0.38;
    leftLegMesh.castShadow = true;
    addCelOutline(leftLegMesh, 0.045);
    leftLegPivot.add(leftLegMesh);

    const rightLegPivot = new THREE.Group();
    rightLegPivot.position.set(0.15, 0.76, 0);
    const rightLegMesh = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.76, 0.24), legMat);
    rightLegMesh.position.y = -0.38;
    rightLegMesh.castShadow = true;
    addCelOutline(rightLegMesh, 0.045);
    rightLegPivot.add(rightLegMesh);

    // Upper body pivot so bot can crouch/kneel cleanly
    const upperBody = new THREE.Group();
    upperBody.position.set(0, 0.76, 0);

    // Tactical Torso
    const torsoMesh = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.64, 0.32), armorMat);
    torsoMesh.position.y = 0.32;
    torsoMesh.castShadow = true;
    addCelOutline(torsoMesh, 0.04);
    upperBody.add(torsoMesh);

    // Winter Haori Coat Tail / Mantle & Shoulder Pads
    const haoriBack = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.54, 0.12), haoriMat);
    haoriBack.position.set(0, 0.24, -0.15);
    haoriBack.castShadow = true;
    addCelOutline(haoriBack, 0.035);
    upperBody.add(haoriBack);

    const chestStrip = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.07, 0.34), trimMat);
    chestStrip.position.set(0, 0.42, 0.01);
    upperBody.add(chestStrip);

    const leftShoulder = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.2, 0.34), haoriMat);
    leftShoulder.position.set(-0.36, 0.54, 0);
    leftShoulder.rotation.z = 0.22;
    leftShoulder.castShadow = true;
    addCelOutline(leftShoulder, 0.045);
    upperBody.add(leftShoulder);

    const rightShoulder = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.2, 0.34), haoriMat);
    rightShoulder.position.set(0.36, 0.54, 0);
    rightShoulder.rotation.z = -0.22;
    rightShoulder.castShadow = true;
    addCelOutline(rightShoulder, 0.045);
    upperBody.add(rightShoulder);

    // Anime Head Sphere & Glowing Visor Strip
    const headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 14), skinMat);
    headMesh.position.set(0, 0.86, 0.02);
    headMesh.castShadow = true;
    addCelOutline(headMesh, 0.05);
    upperBody.add(headMesh);

    const hoodCap = new THREE.Mesh(
      new THREE.SphereGeometry(0.235, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.58),
      haoriMat
    );
    hoodCap.position.set(0, 0.87, 0.0);
    upperBody.add(hoodCap);

    // Supreme Frost Oni Boss custom features (Curved Demon Horns & Ice Spikes)
    if (entry.name === 'Oni-Boss') {
      group.scale.set(1.38, 1.38, 1.38);
      const hornMat = createCelMaterial(0x881337, 0.2, 0.3, 0xff1744, 0.8);
      const leftHorn = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.44, 8), hornMat);
      leftHorn.position.set(-0.16, 1.15, -0.04);
      leftHorn.rotation.set(-0.25, 0.1, -0.42);
      addCelOutline(leftHorn, 0.035);
      upperBody.add(leftHorn);

      const rightHorn = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.44, 8), hornMat);
      rightHorn.position.set(0.16, 1.15, -0.04);
      rightHorn.rotation.set(-0.25, -0.1, 0.42);
      addCelOutline(rightHorn, 0.035);
      upperBody.add(rightHorn);

      // Frost Armor Spikes on Shoulders
      const iceMat = createCelMaterial(0x0284c7, 0.2, 0.4, 0x00e5ff, 1.2);
      const leftSpike = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.28, 6), iceMat);
      leftSpike.position.set(-0.42, 0.68, 0);
      leftSpike.rotation.z = 0.55;
      upperBody.add(leftSpike);

      const rightSpike = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.28, 6), iceMat);
      rightSpike.position.set(0.42, 0.68, 0);
      rightSpike.rotation.z = -0.55;
      upperBody.add(rightSpike);
    }
    hoodCap.rotation.x = -0.18;
    addCelOutline(hoodCap, 0.04);
    upperBody.add(hoodCap);

    const visorMesh = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.075, 0.16), visorMat);
    visorMesh.position.set(0, 0.87, 0.17);
    upperBody.add(visorMesh);

    // Held 3D Tactical Rifle
    const rifleGroup = new THREE.Group();
    rifleGroup.position.set(0.28, 0.42, 0.28);

    const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.14, 0.62), rifleMat);
    receiver.castShadow = true;
    addCelOutline(receiver, 0.045);
    rifleGroup.add(receiver);

    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.026, 0.46, 8), rifleMat);
    barrel.rotation.x = Math.PI * 0.5;
    barrel.position.set(0, 0.02, 0.48);
    rifleGroup.add(barrel);

    const mag = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.2, 0.09), rifleMat);
    mag.position.set(0, -0.14, 0.08);
    mag.rotation.x = 0.25;
    rifleGroup.add(mag);

    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.03, 0.44), rifleAccentMat);
    rail.position.set(0, 0.085, 0.08);
    rifleGroup.add(rail);

    upperBody.add(rifleGroup);

    group.add(leftLegPivot);
    group.add(rightLegPivot);
    group.add(upperBody);

    const botObj = {
      id: index,
      name: entry.name,
      team: entry.team,
      role: entry.role,
      weapon: entry.weapon,
      hp: 100,
      maxHp: 100,
      alive: true,
      k: entry.k,
      d: entry.d,
      pts: entry.pts,
      cash: entry.cash,
      group,
      headMesh,
      torsoMesh,
      visorMesh,
      upperBody,
      leftLeg: leftLegPivot,
      rightLeg: rightLegPivot,
      rifleGroup,
      position: group.position,
      homePos: new THREE.Vector3(),
      homeYaw: 0,
      kneeling: false,
      patrolPhase: index * 1.15,
      patrolRadius: 0.7,
    };

    headMesh.userData.bot = botObj;
    headMesh.userData.isHead = true;
    headMesh.userData.botId = entry.name;
    headMesh.userData.part = 'head';

    torsoMesh.userData.bot = botObj;
    torsoMesh.userData.isHead = false;
    torsoMesh.userData.botId = entry.name;
    torsoMesh.userData.part = 'body';

    leftLegMesh.userData.bot = botObj;
    leftLegMesh.userData.isHead = false;
    rightLegMesh.userData.bot = botObj;
    rightLegMesh.userData.isHead = false;

    hitTargets.push(headMesh, torsoMesh, leftLegMesh, rightLegMesh);
    squadGroup.add(group);
    bots.push(botObj);
    return botObj;
  }

  for (let i = 0; i < BOT_ROSTER.length; i++) {
    buildArticulatedOperative(BOT_ROSTER[i], i);
  }

  // Create default courtyard tactical frost-smoke clusters
  const courtyardSmoke = createSmokeCloud(-3.6, 1.35, -3.5, 2.15, 0xdbeafe);
  const flankSmoke = createSmokeCloud(6.8, 1.25, -7.2, 1.85, 0xcffafe);
  const headshotSpark = createHeadshotSparkCluster();
  const spiritCharge = createSpiritChargeMesh();
  let sparkTimer = 0;

  function applyPose(bot, x, y, z, yaw, options = {}) {
    bot.alive = options.alive !== undefined ? options.alive : true;
    bot.hp = options.hp !== undefined ? options.hp : (bot.alive ? 100 : 0);
    bot.kneeling = Boolean(options.kneeling);
    bot.patrolRadius = options.patrolRadius !== undefined ? options.patrolRadius : 0.65;

    bot.homePos.set(x, y, z);
    bot.homeYaw = yaw;
    bot.group.position.set(x, y, z);
    bot.group.rotation.set(0, yaw, 0);
    bot.upperBody.rotation.set(0, 0, 0);

    if (!bot.alive) {
      bot.group.rotation.x = -Math.PI * 0.47;
      bot.group.position.y = y + 0.22;
      bot.upperBody.position.y = 0.76;
      bot.leftLeg.rotation.x = 0.1;
      bot.rightLeg.rotation.x = -0.15;
    } else if (bot.kneeling) {
      bot.group.rotation.x = 0;
      bot.upperBody.position.y = 0.44;
      bot.leftLeg.rotation.x = -1.15;
      bot.rightLeg.rotation.x = 0.95;
      bot.rifleGroup.position.set(0.24, 0.26, 0.34);
      bot.rifleGroup.rotation.x = 0.38;
    } else {
      bot.group.rotation.x = 0;
      bot.upperBody.position.y = 0.76;
      bot.leftLeg.rotation.x = 0;
      bot.rightLeg.rotation.x = 0;
      bot.rifleGroup.position.set(0.28, 0.42, 0.28);
      bot.rifleGroup.rotation.x = 0;
    }
  }

  function findBot(name) {
    return bots.find((b) => b.name === name);
  }

  function stageShotFormation(shotMode) {
    const mode = String(shotMode || '1');
    headshotSpark.group.visible = false;
    spiritCharge.group.visible = false;
    sparkTimer = 0;

    if (mode === '1') {
      // Combat cover shot: Akagi in center taking headshot, Oni-Boss looming large in right mid-ground, Yuki left flank
      applyPose(findBot('Akagi'), 0.0, 0.0, -5.8, 0.05, { hp: 24, patrolRadius: 0 });
      applyPose(findBot('Oni-Boss'), 2.2, 0.0, -8.4, -0.32, { hp: 74, patrolRadius: 0.1 });
      applyPose(findBot('Kuro'), 4.8, 0.0, -5.2, -0.65, { hp: 100, patrolRadius: 0.2 });
      applyPose(findBot('Raiden'), -5.4, 0.0, -8.5, 0.35, { hp: 100, patrolRadius: 0.2 });
      applyPose(findBot('Kaguya'), 8.8, 0.6, -3.5, -0.9, { hp: 100, patrolRadius: 0.2 });

      applyPose(findBot('Yuki'), -3.2, 0.0, 0.2, -0.35, { hp: 88, patrolRadius: 0.15 });
      applyPose(findBot('Hana'), 3.4, 0.0, 2.2, 0.42, { hp: 100, patrolRadius: 0.15 });
      applyPose(findBot('Ren'), -6.4, 0.0, 4.8, -0.25, { hp: 100, patrolRadius: 0.15 });
      applyPose(findBot('Sora'), 6.0, 0.0, 4.6, 0.3, { hp: 100, patrolRadius: 0.15 });

      headshotSpark.group.visible = true;
      headshotSpark.group.position.set(0.0, 1.66, -5.56);
      sparkTimer = 9999;

      courtyardSmoke.group.position.set(-3.4, 1.3, -4.6);
      courtyardSmoke.basePos.set(-3.4, 1.3, -4.6);
      flankSmoke.group.position.set(6.5, 1.25, -7.4);
      flankSmoke.basePos.set(6.5, 1.25, -7.4);
    } else if (mode === '2') {
      // Title shrine formation: dramatic hero lineup facing camera in front of Vermilion Torii
      applyPose(findBot('Yuki'), -1.4, 0.0, -7.2, 0.12, { patrolRadius: 0 });
      applyPose(findBot('Hana'), 1.4, 0.0, -7.4, -0.12, { patrolRadius: 0 });
      applyPose(findBot('Ren'), -3.3, 0.0, -8.3, 0.22, { patrolRadius: 0 });
      applyPose(findBot('Sora'), 3.3, 0.0, -8.3, -0.22, { patrolRadius: 0 });

      applyPose(findBot('Akagi'), -0.8, 0.0, -12.6, 0.08, { patrolRadius: 0 });
      applyPose(findBot('Kuro'), 1.2, 0.0, -12.8, -0.08, { patrolRadius: 0 });
      applyPose(findBot('Raiden'), -2.8, 0.0, -13.6, 0.18, { patrolRadius: 0 });
      applyPose(findBot('Kaguya'), 2.8, 0.0, -13.6, -0.18, { patrolRadius: 0 });
      applyPose(findBot('Oni-Boss'), 0.0, 0.0, -14.8, 0.0, { patrolRadius: 0 });

      courtyardSmoke.group.position.set(-5.2, 1.4, -9.8);
      courtyardSmoke.basePos.set(-5.2, 1.4, -9.8);
      flankSmoke.group.position.set(5.4, 1.4, -9.8);
      flankSmoke.basePos.set(5.4, 1.4, -9.8);
    } else if (mode === '3') {
      // Site A Torii defusal: Yuki kneeling by planted Spirit Charge while Raiden peeks behind cover
      applyPose(findBot('Yuki'), -0.55, 0.0, -10.5, 1.2, { kneeling: true, hp: 72, patrolRadius: 0 });
      applyPose(findBot('Hana'), -3.8, 0.0, -8.0, 0.45, { hp: 90, patrolRadius: 0.1 });
      applyPose(findBot('Ren'), 4.4, 0.0, -7.6, -0.55, { hp: 84, patrolRadius: 0.1 });
      applyPose(findBot('Sora'), 2.5, 0.0, -4.8, -0.25, { hp: 100, patrolRadius: 0.1 });

      applyPose(findBot('Raiden'), 3.9, 0.0, -12.6, -2.55, { hp: 78, patrolRadius: 0.12 });
      applyPose(findBot('Kuro'), -4.5, 0.0, -13.2, 2.45, { hp: 65, patrolRadius: 0.12 });
      applyPose(findBot('Oni-Boss'), 0.6, 0.0, -15.4, 3.05, { hp: 100, patrolRadius: 0.1 });
      applyPose(findBot('Akagi'), -2.4, 0.0, -12.2, 2.1, { alive: false });
      applyPose(findBot('Kaguya'), 6.8, 0.6, -4.2, -2.1, { alive: false });

      spiritCharge.group.visible = true;
      spiritCharge.group.position.set(0.15, 0.04, -10.5);

      courtyardSmoke.group.position.set(-2.6, 1.35, -13.4);
      courtyardSmoke.basePos.set(-2.6, 1.35, -13.4);
      flankSmoke.group.position.set(4.8, 1.25, -10.0);
      flankSmoke.basePos.set(4.8, 1.25, -10.0);
    } else {
      // Shot 4: Victory formation — Sakura Guard triumphant at Site A shrine
      applyPose(findBot('Yuki'), 0.0, 0.0, -8.8, 0.0, { hp: 100, patrolRadius: 0 });
      applyPose(findBot('Hana'), -1.9, 0.0, -9.6, 0.15, { hp: 100, patrolRadius: 0 });
      applyPose(findBot('Ren'), 1.9, 0.0, -9.6, -0.15, { hp: 100, patrolRadius: 0 });
      applyPose(findBot('Sora'), -3.6, 0.0, -10.6, 0.28, { hp: 100, patrolRadius: 0 });

      applyPose(findBot('Akagi'), -2.2, 0.0, -14.2, 0.4, { alive: false });
      applyPose(findBot('Kuro'), 2.4, 0.0, -14.0, -0.5, { alive: false });
      applyPose(findBot('Raiden'), 0.2, 0.0, -15.4, 0.1, { alive: false });
      applyPose(findBot('Kaguya'), -4.6, 0.0, -13.0, 0.8, { alive: false });
      applyPose(findBot('Oni-Boss'), 4.4, 0.0, -13.2, -0.7, { alive: false });

      courtyardSmoke.group.position.set(-7.2, 1.5, -12.0);
      courtyardSmoke.basePos.set(-7.2, 1.5, -12.0);
      flankSmoke.group.position.set(7.2, 1.5, -12.0);
      flankSmoke.basePos.set(7.2, 1.5, -12.0);
    }
  }

  function updateBots(dt, elapsed, playerPos) {
    for (const bot of bots) {
      if (!bot.alive) continue;

      if (bot.kneeling) {
        // Subtle defuse hand / breathing motion while kneeling
        bot.upperBody.rotation.x = 0.18 + Math.sin(elapsed * 4.5 + bot.patrolPhase) * 0.04;
        continue;
      }

      if (bot.patrolRadius > 0.01) {
        const stride = Math.sin(elapsed * 1.9 + bot.patrolPhase);
        const offsetX = stride * bot.patrolRadius;
        bot.group.position.x = bot.homePos.x + offsetX;
        const legSwing = Math.cos(elapsed * 1.9 + bot.patrolPhase) * 0.22;
        bot.leftLeg.rotation.x = legSwing;
        bot.rightLeg.rotation.x = -legSwing;
      }

      // Subtle breathing & tactical tracking toward player if close
      bot.upperBody.position.y = 0.76 + Math.sin(elapsed * 3.1 + bot.patrolPhase) * 0.015;
      if (playerPos && bot.team === 'RONIN' && bot.patrolRadius > 0.05) {
        const dx = playerPos.x - bot.group.position.x;
        const dz = playerPos.z - bot.group.position.z;
        const dist = Math.hypot(dx, dz);
        if (dist < 14) {
          const targetYaw = Math.atan2(dx, dz);
          bot.group.rotation.y += (targetYaw - bot.group.rotation.y) * Math.min(1, dt * 3.2);
        }
      }
    }

    for (const cloud of smokeClouds) {
      cloud.group.rotation.y += dt * 0.14;
      for (const puff of cloud.puffs) {
        puff.mesh.position.y = puff.basePos.y + Math.sin(elapsed * 1.6 + puff.phase) * 0.08;
      }
    }

    if (headshotSpark.group.visible) {
      if (sparkTimer > 0 && sparkTimer < 9000) {
        sparkTimer = Math.max(0, sparkTimer - dt);
        if (sparkTimer <= 0) headshotSpark.group.visible = false;
      }
      headshotSpark.group.rotation.z = elapsed * 2.4;
      const pulse = 1.0 + Math.sin(elapsed * 10.0) * 0.12;
      headshotSpark.group.scale.setScalar(pulse);
    }

    if (spiritCharge.group.visible) {
      spiritCharge.core.rotation.y = elapsed * 2.2;
      spiritCharge.halo.rotation.z = -elapsed * 1.8;
    }
  }

  function damageBot(meshOrBot, amount, isHead = false) {
    const bot = meshOrBot && meshOrBot.userData ? meshOrBot.userData.bot : meshOrBot;
    if (!bot || !bot.alive) return false;
    const hitHead = Boolean(isHead || (meshOrBot && meshOrBot.userData && meshOrBot.userData.isHead));
    const finalDmg = hitHead ? Math.max(amount, 100) : amount;
    bot.hp = Math.max(0, bot.hp - finalDmg);
    if (hitHead) {
      headshotSpark.group.visible = true;
      headshotSpark.group.position.set(bot.group.position.x, bot.group.position.y + 1.62, bot.group.position.z + 0.2);
      sparkTimer = 0.45;
    }
    if (bot.hp <= 0) {
      bot.alive = false;
      bot.d += 1;
      bot.group.rotation.x = -Math.PI * 0.47;
      bot.group.position.y = bot.homePos.y + 0.22;
      return true;
    }
    return false;
  }

  // Initialize default tactical formation
  stageShotFormation('1');

  return {
    bots,
    smokeClouds,
    createSmokeCloud,
    getHitTargets() {
      return hitTargets;
    },
    stageShotFormation,
    updateBots,
    damageBot,
    resetBots() {
      stageShotFormation('1');
    },
  };
}
