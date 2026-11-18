// YukiStrike: Zero — 3D Cel-Shaded 5v5 Anime Snow Tactical FPS Engine Orchestrator
import * as THREE from 'three';
import { buildShintoShrineWorld } from './shrine-world.js';
import { getArmouryCatalog, createFirstPersonWeaponRig } from './weapons-armoury.js';
import { createArticulatedBotSquad } from './squad-bots.js';
import { createTacticalDefusalMatch } from './round-defusal.js';
import { createOperativeController } from './player-controller.js';
import { createShintoAudioSynth } from './audio-synth.js';
import { createTacticalHudAndMinimap } from './hud-minimap.js';

  const FIXED_DT = 1 / 60;

export function bootYukiStrikeEngine() {
  const mount = document.getElementById('game') || document.body;
  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  mount.innerHTML = '';
  mount.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(68, window.innerWidth / window.innerHeight, 0.08, 120);
  scene.add(camera);

  const world = buildShintoShrineWorld(scene);
  const squad = createArticulatedBotSquad(scene);
  const match = createTacticalDefusalMatch(world.sites);
  const player = createOperativeController(camera, world.colliders);
  const weaponRig = createFirstPersonWeaponRig(camera, scene);
  const audio = createShintoAudioSynth();
  const hud = createTacticalHudAndMinimap();
  const catalog = getArmouryCatalog();

  const keys = new Set();
  let pointerLocked = false;
  let elapsed = 0;

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function syncHudFromState() {
    const wState = weaponRig.getState();
    hud.setAmmo(wState.ammo, wState.reserve, wState.reloading, wState.name);
    hud.setVitals(match.state.health, match.state.shield, match.state.cash);
    hud.setMatchState({
      round: match.state.round,
      maxRounds: match.state.maxRounds,
      scoreSakura: match.state.scoreSakura,
      scoreRonin: match.state.scoreRonin,
      phase: match.state.phase,
      timer: match.state.phase === 'PLANTED' ? match.state.bombTimer : match.state.timer,
    });
    hud.updateMinimap(
      { x: camera.position.x, z: camera.position.z, yaw: player.state.yaw },
      squad.bots,
      { planted: match.state.phase === 'PLANTED', site: match.state.plantedSite || 'A' }
    );
  }

  function triggerPrimaryFire() {
    audio.unlock();
    const eye = camera.position.clone();
    const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).normalize();
    const result = weaponRig.fire(eye, dir, world.shootables, squad.getHitTargets());
    if (!result.fired) return;
    audio.playGunshot();
    player.recoil(0.014, (Math.random() - 0.5) * 0.008);
    if (result.hitBot) {
      const eliminated = squad.damageBot(result.hitBot, result.damage, result.headshot);
      hud.hitMarker(result.headshot);
      if (result.headshot) audio.playHeadshotChime();
      if (eliminated) {
        match.recordElimination('You (Sakura-01)', result.hitBot.name, weaponRig.getState().name, result.headshot);
        hud.pushKillfeed({
          killer: 'You',
          weapon: weaponRig.getState().name,
          victim: result.hitBot.name,
          headshot: result.headshot,
        });
      }
    }
    syncHudFromState();
  }

  window.addEventListener('keydown', (e) => {
    keys.add(e.code);
    if (e.code === 'KeyR') {
      if (match.state.phase === 'VICTORY') {
        match.resetMatch();
        squad.resetBots();
        hud.renderShotMode('live', {});
      } else {
        weaponRig.reload();
      }
    } else if (e.code === 'KeyB') {
      hud.toggleArmoury();
    } else if (e.code === 'KeyQ') {
      if (player.triggerFrostStepDash(keys)) audio.playFrostDash();
    } else if (e.code === 'KeyM') {
      audio.toggleMute();
    } else if (e.code === 'Enter') {
      hud.hideOverlay();
      hud.renderShotMode('live', {});
    } else if (e.code === 'KeyT') {
      hud.renderShotMode('2', {});
    } else if (e.code === 'Digit1') {
      weaponRig.equipWeapon('type-89');
    } else if (e.code === 'Digit2') {
      weaponRig.equipWeapon('wakizashi');
    }
  });

  window.addEventListener('keyup', (e) => keys.delete(e.code));

  renderer.domElement.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      if (!pointerLocked && document.pointerLockElement !== renderer.domElement) {
        renderer.domElement.requestPointerLock?.();
      }
      triggerPrimaryFire();
    }
  });

  document.addEventListener('pointerlockchange', () => {
    pointerLocked = document.pointerLockElement === renderer.domElement;
  });

  document.addEventListener('mousemove', (e) => {
    if (!pointerLocked) return;
    player.look(e.movementX, e.movementY);
  });

  hud.onPlay(() => {
    audio.unlock();
    hud.hideOverlay();
    player.setCameraPose(0.0, 1.72, 1.4, 0.0, -0.02);
    squad.stageShotFormation('1');
    hud.renderShotMode('live', {});
  });

  hud.onBuyWeapon((itemId) => {
    match.buyItem(itemId);
    weaponRig.equipWeapon(itemId);
    syncHudFromState();
  });

  hud.onRestart(() => {
    match.resetMatch();
    squad.resetBots();
    player.setCameraPose(0.0, 1.72, 1.4, 0.0, -0.02);
    hud.renderShotMode('live', {});
  });

  return {
    renderer,
    scene,
    camera,
    world,
    squad,
    match,
    player,
    weaponRig,
    audio,
    hud,
    catalog,
    keys,
    stepFrame(dt = FIXED_DT) {
      elapsed += dt;
      player.step(dt, keys);
      world.updateWorld(dt, elapsed);
      squad.updateBots(dt, elapsed, camera.position);
      match.updateDefusal(dt, camera.position, keys.has('KeyE'), keys.has('KeyF'));
      weaponRig.update(dt, player.groundSpeed() > 0.25, player.groundSpeed());
      syncHudFromState();
      renderer.render(scene, camera);
    },
  };
}

export function stageDeterministicShot(engine, shotParam) {
  const { renderer, scene, camera, world, squad, match, player, weaponRig, hud } = engine;
  const mode = String(shotParam || '').toLowerCase();

  if (mode === '1' || mode === 'combat' || mode === 'play') {
    // Shot 1 (Cover): Active 5v5 Firefight in Snow Shrine Courtyard, firing at Akagi with headshot spark
    squad.stageShotFormation('1');
    match.applyShotPreset('1');
    player.setCameraPose(0.0, 1.72, 0.6, 0.0, -0.015);
    weaponRig.rigRoot.visible = true;
    weaponRig.setCombatFirePose(new THREE.Vector3(0.0, 1.56, -5.75), true);
    world.updateWorld(0.016, 1.25);
    hud.renderShotMode('1');
  } else if (mode === '2' || mode === 'start' || mode === 'title') {
    // Shot 2 (Title & Workshop): Framing the Snow Shrine & Hero Squad on the right half of the 16:10 viewport
    squad.stageShotFormation('2');
    match.applyShotPreset('2');
    player.setCameraPose(2.6, 2.45, -1.2, 0.32, -0.06);
    weaponRig.rigRoot.visible = false;
    weaponRig.setCombatFirePose(null, false);
    world.updateWorld(0.016, 2.4);
    hud.renderShotMode('2');
  } else if (mode === '3' || mode === 'armoury' || mode === 'defuse') {
    // Shot 3 (Site A Defusal + 5-Column Armoury): Framing planted Spirit Charge & kneeling ally Yuki at Torii Altar
    squad.stageShotFormation('3');
    match.applyShotPreset('3');
    player.setCameraPose(0.45, 1.68, -6.2, 0.08, -0.11);
    weaponRig.rigRoot.visible = true;
    weaponRig.setCombatFirePose(null, false);
    world.updateWorld(0.016, 3.6);
    hud.renderShotMode('3');
  } else if (mode === '4' || mode === 'end' || mode === 'victory') {
    // Shot 4 (S-Rank Victory & 5v5 Scoreboard): Elevated aerial vista over the Snow Shrine & Japanese Alps
    squad.stageShotFormation('4');
    match.applyShotPreset('4');
    player.setCameraPose(0.0, 6.2, 3.5, 0.0, -0.26);
    weaponRig.rigRoot.visible = false;
    weaponRig.setCombatFirePose(null, false);
    world.updateWorld(0.016, 4.8);
    hud.renderShotMode('4');
  }

  renderer.render(scene, camera);
  requestAnimationFrame(() => {
    renderer.render(scene, camera);
    try {
      const mountEl = document.getElementById('game');
      if (mountEl) {
        mountEl.style.backgroundImage = `url(${renderer.domElement.toDataURL('image/png')})`;
        mountEl.style.backgroundSize = '100% 100%';
      }
    } catch {}
    document.documentElement.dataset.ready = '1';
  });
}

  const engineInstance = bootYukiStrikeEngine();
  const urlShot = new URLSearchParams(window.location.search).get('shot');
  if (urlShot) {
    stageDeterministicShot(engineInstance, urlShot);
  } else {
    // Start in interactive Title & Workshop mode by default, then loop 60Hz
    stageDeterministicShot(engineInstance, '2');
    let lastTime = performance.now();
    function animate(now) {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      engineInstance.stepFrame(dt);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }
