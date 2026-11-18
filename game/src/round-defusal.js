// 15-Round Tactical Bomb Defusal, Economy, Feats & Radio Feed for YukiStrike: Zero
import * as THREE from 'three';

  const ARMORY_CATALOG = {
    vandal_cryo: { id: 'vandal_cryo', name: 'Cryo Vandal', cost: 2900, type: 'rifle', damage: 40 },
    phantom_sakura: { id: 'phantom_sakura', name: 'Sakura Phantom', cost: 2900, type: 'rifle', damage: 35 },
    operator_zero: { id: 'operator_zero', name: 'Zero Operator', cost: 4700, type: 'sniper', damage: 150 },
    spectre_frost: { id: 'spectre_frost', name: 'Frost Spectre', cost: 1600, type: 'smg', damage: 26 },
    sheriff_ice: { id: 'sheriff_ice', name: 'Glacier Sheriff', cost: 800, type: 'sidearm', damage: 55 },
    heavy_shield: { id: 'heavy_shield', name: 'Aegis Cryo Armor', cost: 1000, type: 'shield', shieldValue: 100 },
    light_shield: { id: 'light_shield', name: 'Light Frost Vest', cost: 400, type: 'shield', shieldValue: 50 },
    frost_smoke: { id: 'frost_smoke', name: 'Frost Smoke Orb', cost: 250, type: 'utility' },
    defuse_kit: { id: 'defuse_kit', name: 'Shrine Spirit Seal', cost: 400, type: 'kit' },
  };

  const DEFAULT_FEATS = [
    { id: 'first_blood', label: 'First Snow Blood', done: true, progress: 1, target: 1 },
    { id: 'headshot_ace', label: 'Crimson Visor Crack', done: true, progress: 5, target: 5 },
    { id: 'frost_dash', label: 'Frost-Step Flank', done: true, progress: 3, target: 3 },
    { id: 'site_a_hold', label: 'Torii Gate Anchor', done: true, progress: 2, target: 2 },
    { id: 'smoke_play', label: 'Mist Veil Takedown', done: true, progress: 2, target: 2 },
    { id: 'clutch_defuse', label: 'Spirit Charge Seal', done: true, progress: 1, target: 1 },
    { id: 'eco_master', label: 'Shrine Armory Mastery', done: true, progress: 3850, target: 3000 },
    { id: 'match_point', label: 'Sakura Ascendancy', done: true, progress: 8, target: 8 },
  ];

export function createTacticalDefusalMatch(sites) {
  function cloneFeats(allDone = true) {
    return DEFAULT_FEATS.map((f) => ({
      ...f,
      done: allDone ? f.done : false,
      progress: allDone ? f.progress : 0,
    }));
  }
  const siteA = sites && sites.A ? sites.A.clone() : new THREE.Vector3(0, 0, -10.5);
  const siteB = sites && sites.B ? sites.B.clone() : new THREE.Vector3(9.5, 0.6, -3.5);

  const match = {
    round: 7,
    maxRounds: 15,
    scoreSakura: 4,
    scoreRonin: 2,
    phase: 'LIVE', // 'LIVE' | 'BUY' | 'PLANTED' | 'VICTORY'
    timer: 78,
    buyTimer: 15,
    bombTimer: 19,
    defuseProgress: 0.68,
    plantProgress: 0,
    cash: 3850,
    health: 82,
    shield: 100,
    weapon: 'Cryo Vandal',
    hasDefuseKit: true,
    smokeCharges: 2,
    plantedSite: null,
    bombPos: siteA.clone(),
    feats: cloneFeats(true),
    radioLog: [
      { sender: 'Yuki', team: 'SAKURA', text: 'Two Crimson Ronin pushing Mid Courtyard! Smoke down.', time: '01:18' },
      { sender: 'Hana', team: 'SAKURA', text: 'Site B Pagoda clear. Rotating toward Torii A.', time: '01:12' },
    ],
    killFeed: [
      { killer: 'You', victim: 'Akagi', weapon: 'Cryo Vandal', headshot: true, time: '01:18' },
      { killer: 'Yuki', victim: 'Kaguya', weapon: 'Cryo Vandal', headshot: false, time: '01:14' },
    ],
  };

  function resolveNearestSite(pos) {
    if (!pos) return { key: 'A', vec: siteA };
    const distA = Math.hypot(pos.x - siteA.x, pos.z - siteA.z);
    const distB = Math.hypot(pos.x - siteB.x, pos.z - siteB.z);
    return distA <= distB ? { key: 'A', vec: siteA } : { key: 'B', vec: siteB };
  }

  function pushRadio(sender, team, text) {
    const secs = Math.max(0, Math.ceil(match.phase === 'PLANTED' ? match.bombTimer : match.timer));
    const mm = String(Math.floor(secs / 60)).padStart(2, '0');
    const ss = String(secs % 60).padStart(2, '0');
    match.radioLog.unshift({ sender, team, text, time: `${mm}:${ss}` });
    if (match.radioLog.length > 6) match.radioLog.length = 6;
  }

  function pushKill(killer, victim, weapon, headshot = false) {
    const secs = Math.max(0, Math.ceil(match.phase === 'PLANTED' ? match.bombTimer : match.timer));
    const mm = String(Math.floor(secs / 60)).padStart(2, '0');
    const ss = String(secs % 60).padStart(2, '0');
    match.killFeed.unshift({ killer, victim, weapon, headshot, time: `${mm}:${ss}` });
    if (match.killFeed.length > 5) match.killFeed.length = 5;
  }

  function advanceNextRound(winnerTeam) {
    if (winnerTeam === 'SAKURA') {
      match.scoreSakura += 1;
      match.cash = Math.min(9000, match.cash + 3000);
    } else {
      match.scoreRonin += 1;
      match.cash = Math.min(9000, match.cash + 1900);
    }

    const roundsToWin = Math.ceil(match.maxRounds / 2);
    if (match.scoreSakura >= roundsToWin || match.scoreRonin >= roundsToWin || match.round >= match.maxRounds) {
      match.phase = 'VICTORY';
      match.timer = 0;
      pushRadio('Command', 'SAKURA', match.scoreSakura >= match.scoreRonin ? 'Shrine Secured — Sakura Guard Victory!' : 'Crimson Ronin Claimed the Shrine.');
      return;
    }

    match.round += 1;
    match.phase = 'BUY';
    match.timer = 90;
    match.buyTimer = 12;
    match.bombTimer = 45;
    match.defuseProgress = 0;
    match.plantProgress = 0;
    match.plantedSite = null;
    match.health = 100;
  }

  function plantSpiritCharge(siteKey, customPos) {
    if (match.phase === 'PLANTED' || match.phase === 'VICTORY') return false;
    const chosenKey = siteKey === 'B' ? 'B' : 'A';
    const targetVec = customPos ? new THREE.Vector3(customPos.x, customPos.y, customPos.z) : (chosenKey === 'B' ? siteB : siteA);
    match.phase = 'PLANTED';
    match.plantedSite = chosenKey;
    match.bombPos.copy(targetVec);
    match.bombTimer = 45;
    match.defuseProgress = 0;
    match.plantProgress = 0;
    pushRadio('Alert', 'RONIN', `Spirit Charge planted at Site ${chosenKey}! Defuse before detonation.`);
    return true;
  }

  function updateDefusal(dt, playerPos, isHoldingUse, isHoldingPlant) {
    if (match.phase === 'VICTORY') return match;

    if (match.phase === 'BUY') {
      match.buyTimer = Math.max(0, match.buyTimer - dt);
      if (match.buyTimer <= 0) {
        match.phase = 'LIVE';
        pushRadio('Yuki', 'SAKURA', 'Buy phase over. Hold Site A Torii and Mid.');
      }
      return match;
    }

    if (match.phase === 'LIVE') {
      match.timer = Math.max(0, match.timer - dt);
      if (playerPos && isHoldingPlant) {
        const nearest = resolveNearestSite(playerPos);
        const dist = Math.hypot(playerPos.x - nearest.vec.x, playerPos.z - nearest.vec.z);
        if (dist <= 3.6) {
          match.plantProgress = Math.min(1, match.plantProgress + dt / 2.6);
          if (match.plantProgress >= 1) {
            plantSpiritCharge(nearest.key, nearest.vec);
          }
        } else {
          match.plantProgress = Math.max(0, match.plantProgress - dt * 1.5);
        }
      } else {
        match.plantProgress = Math.max(0, match.plantProgress - dt * 2.0);
      }

      if (match.timer <= 0) {
        pushRadio('Command', 'SAKURA', 'Round timer expired — Sakura Guard defends the Shrine!');
        advanceNextRound('SAKURA');
      }
      return match;
    }

    if (match.phase === 'PLANTED') {
      match.bombTimer = Math.max(0, match.bombTimer - dt);
      const distToBomb = playerPos
        ? Math.hypot(playerPos.x - match.bombPos.x, playerPos.z - match.bombPos.z)
        : 999;

      if (isHoldingUse && distToBomb <= 3.5) {
        const defuseDuration = match.hasDefuseKit ? 3.5 : 5.5;
        match.defuseProgress = Math.min(1, match.defuseProgress + dt / defuseDuration);
        if (match.defuseProgress >= 1) {
          match.feats[5].done = true;
          match.feats[5].progress = 1;
          pushRadio('Yuki', 'SAKURA', 'Spirit Charge defused! Round won.');
          advanceNextRound('SAKURA');
          return match;
        }
      } else {
        match.defuseProgress = Math.max(0, match.defuseProgress - dt * 0.45);
      }

      if (match.bombTimer <= 0) {
        pushRadio('Alert', 'RONIN', 'Spirit Charge detonated! Crimson Ronin takes the round.');
        advanceNextRound('RONIN');
      }
    }

    return match;
  }

  function buyItem(itemId) {
    if (match.phase === 'VICTORY') return { ok: false, reason: 'MATCH_ENDED', cash: match.cash };
    const item = ARMORY_CATALOG[itemId];
    if (!item) return { ok: false, reason: 'UNKNOWN_ITEM', cash: match.cash };
    if (match.cash < item.cost) return { ok: false, reason: 'INSUFFICIENT_FUNDS', cash: match.cash };

    match.cash -= item.cost;
    if (item.type === 'shield') {
      match.shield = Math.max(match.shield, item.shieldValue);
    } else if (item.type === 'kit') {
      match.hasDefuseKit = true;
    } else if (item.type === 'utility') {
      match.smokeCharges = Math.min(3, match.smokeCharges + 1);
    } else {
      match.weapon = item.name;
    }

    pushRadio('Armory', 'SAKURA', `Equipped ${item.name} (-¥${item.cost}).`);
    return { ok: true, item, cash: match.cash };
  }

  function applyDamage(amount) {
    if (match.phase === 'VICTORY' || match.health <= 0) return match.health;
    const shieldAbsorb = Math.min(match.shield, Math.round(amount * 0.66));
    match.shield = Math.max(0, match.shield - shieldAbsorb);
    const hpDamage = Math.max(1, amount - shieldAbsorb);
    match.health = Math.max(0, match.health - hpDamage);
    return match.health;
  }

  function recordElimination(killer, victim, weapon = match.weapon, headshot = false) {
    pushKill(killer, victim, weapon, headshot);
    if (killer === 'You') {
      match.cash = Math.min(9000, match.cash + (headshot ? 450 : 300));
      match.feats[0].done = true;
      match.feats[0].progress = 1;
      if (headshot) {
        match.feats[1].progress = Math.min(match.feats[1].target, match.feats[1].progress + 1);
        if (match.feats[1].progress >= match.feats[1].target) match.feats[1].done = true;
      }
    }
  }

  function resetMatch() {
    match.round = 1;
    match.maxRounds = 15;
    match.scoreSakura = 0;
    match.scoreRonin = 0;
    match.phase = 'BUY';
    match.timer = 90;
    match.buyTimer = 15;
    match.bombTimer = 45;
    match.defuseProgress = 0;
    match.plantProgress = 0;
    match.cash = 800;
    match.health = 100;
    match.shield = 50;
    match.weapon = 'Glacier Sheriff';
    match.hasDefuseKit = false;
    match.smokeCharges = 1;
    match.plantedSite = null;
    match.bombPos.copy(siteA);
    match.feats = cloneFeats(false);
    match.radioLog = [
      { sender: 'Command', team: 'SAKURA', text: 'Round 1 Buy Phase. Defend Sites A & B.', time: '01:30' },
    ];
    match.killFeed = [];
    return match;
  }

  function applyShotPreset(shotMode) {
    const mode = String(shotMode || '1');
    if (mode === '1') {
      match.round = 7;
      match.scoreSakura = 4;
      match.scoreRonin = 2;
      match.phase = 'LIVE';
      match.timer = 78;
      match.bombTimer = 19;
      match.defuseProgress = 0.68;
      match.cash = 3850;
      match.health = 82;
      match.shield = 100;
      match.plantedSite = null;
      match.feats = cloneFeats(true);
      match.radioLog = [
        { sender: 'Yuki', team: 'SAKURA', text: 'Akagi hit Mid! Kuro flanking right behind frost cover.', time: '01:18' },
        { sender: 'Hana', team: 'SAKURA', text: 'Frost smoke deployed at Courtyard Gate.', time: '01:15' },
      ];
      match.killFeed = [
        { killer: 'You', victim: 'Akagi', weapon: 'Cryo Vandal', headshot: true, time: '01:18' },
        { killer: 'Yuki', victim: 'Kaguya', weapon: 'Cryo Vandal', headshot: false, time: '01:14' },
      ];
    } else if (mode === '2') {
      match.round = 7;
      match.scoreSakura = 4;
      match.scoreRonin = 2;
      match.phase = 'LIVE';
      match.timer = 90;
      match.cash = 3850;
      match.health = 100;
      match.shield = 100;
      match.plantedSite = null;
      match.feats = cloneFeats(true);
      match.radioLog = [
        { sender: 'Command', team: 'SAKURA', text: 'YUKISTRIKE: ZERO — Shinto Snow Citadel deployed.', time: '01:30' },
      ];
      match.killFeed = [];
    } else if (mode === '3') {
      match.round = 7;
      match.scoreSakura = 4;
      match.scoreRonin = 2;
      match.phase = 'PLANTED';
      match.timer = 0;
      match.bombTimer = 19;
      match.defuseProgress = 0.68;
      match.plantedSite = 'A';
      match.bombPos.copy(siteA);
      match.cash = 3850;
      match.health = 64;
      match.shield = 50;
      match.feats = cloneFeats(true);
      match.radioLog = [
        { sender: 'Yuki', team: 'SAKURA', text: 'Defusing Spirit Charge at Site A Torii — cover me!', time: '00:19' },
        { sender: 'Ren', team: 'SAKURA', text: 'Raiden spotted peeking right lantern!', time: '00:21' },
      ];
      match.killFeed = [
        { killer: 'Yuki', victim: 'Akagi', weapon: 'Cryo Vandal', headshot: true, time: '00:26' },
        { killer: 'Ren', victim: 'Kaguya', weapon: 'Frost Guardian', headshot: false, time: '00:24' },
      ];
    } else {
      match.round = 13;
      match.scoreSakura = 8;
      match.scoreRonin = 4;
      match.phase = 'VICTORY';
      match.timer = 0;
      match.bombTimer = 0;
      match.defuseProgress = 1.0;
      match.plantedSite = 'A';
      match.cash = 6400;
      match.health = 100;
      match.shield = 100;
      match.feats = cloneFeats(true);
      match.radioLog = [
        { sender: 'Command', team: 'SAKURA', text: 'MATCH VICTORY — Sakura Guard holds the Snow Shrine!', time: '00:00' },
      ];
      match.killFeed = [
        { killer: 'You', victim: 'Oni-Boss', weapon: 'Cryo Vandal', headshot: true, time: '00:02' },
        { killer: 'Yuki', victim: 'Akagi', weapon: 'Cryo Vandal', headshot: true, time: '00:05' },
      ];
    }
    return match;
  }

  return Object.assign(match, {
    get state() {
      return match;
    },
    catalog: ARMORY_CATALOG,
    plantSpiritCharge,
    updateDefusal,
    buyItem,
    applyDamage,
    recordElimination,
    resetMatch,
    applyShotPreset,
    pushKill,
    pushRadio,
  });
}
