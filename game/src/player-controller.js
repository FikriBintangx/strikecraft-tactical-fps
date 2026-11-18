// First-Person Operative Movement, Frost-Step Dash & AABB Collision Controller for YukiStrike: Zero
import * as THREE from 'three';

  const MOVE_CFG = {
    walkSpeed: 6.2,
    sprintSpeed: 8.6,
    crouchSpeed: 3.4,
    jumpVelocity: 6.8,
    gravity: 20.5,
    standEye: 1.66,
    crouchEye: 1.12,
    standHeight: 1.82,
    crouchHeight: 1.24,
    playerRadius: 0.42,
    lookSensitivity: 0.0022,
    maxPitch: 1.48,
    dashSpeed: 16.5,
    dashDuration: 0.18,
    dashCooldown: 4.5,
    arenaBound: 21.1,
  };

export function createOperativeController(camera, colliders = []) {
  const state = {
    position: new THREE.Vector3(0, 0, 8.5),
    velocity: new THREE.Vector3(0, 0, 0),
    yaw: 0,
    pitch: 0,
    eye: MOVE_CFG.standEye,
    crouching: false,
    sprinting: false,
    grounded: true,
    dashTimer: 0,
    dashCooldown: 0,
    dashDir: new THREE.Vector3(0, 0, -1),
  };

  const forward = new THREE.Vector3();
  const right = new THREE.Vector3();
  const wishDir = new THREE.Vector3();

  function hasKey(keys, code) {
    if (!keys) return false;
    if (typeof keys.has === 'function') return keys.has(code);
    return Boolean(keys[code]);
  }

  function syncCamera() {
    if (!camera) return;
    camera.position.set(state.position.x, state.position.y + state.eye, state.position.z);
    camera.rotation.set(state.pitch, state.yaw, 0, 'YXZ');
  }

  function look(dx = 0, dy = 0) {
    state.yaw -= dx * MOVE_CFG.lookSensitivity;
    state.pitch = Math.max(
      -MOVE_CFG.maxPitch,
      Math.min(MOVE_CFG.maxPitch, state.pitch - dy * MOVE_CFG.lookSensitivity)
    );
    syncCamera();
  }

  function recoil(dpitch = 0, dyaw = 0) {
    state.pitch = Math.max(-MOVE_CFG.maxPitch, Math.min(MOVE_CFG.maxPitch, state.pitch + dpitch));
    state.yaw += dyaw;
    syncCamera();
  }

  function triggerFrostStepDash(keys) {
    if (state.dashCooldown > 0 || state.dashTimer > 0) {
      return { triggered: false, cooldown: state.dashCooldown };
    }

    const fX = -Math.sin(state.yaw);
    const fZ = -Math.cos(state.yaw);
    const rX = Math.cos(state.yaw);
    const rZ = -Math.sin(state.yaw);

    let moveF = 0;
    let moveR = 0;
    if (hasKey(keys, 'KeyW') || hasKey(keys, 'ArrowUp')) moveF += 1;
    if (hasKey(keys, 'KeyS') || hasKey(keys, 'ArrowDown')) moveF -= 1;
    if (hasKey(keys, 'KeyD') || hasKey(keys, 'ArrowRight')) moveR += 1;
    if (hasKey(keys, 'KeyA') || hasKey(keys, 'ArrowLeft')) moveR -= 1;

    if (moveF === 0 && moveR === 0) moveF = 1;

    state.dashDir.set(fX * moveF + rX * moveR, 0, fZ * moveF + rZ * moveR).normalize();
    state.dashTimer = MOVE_CFG.dashDuration;
    state.dashCooldown = MOVE_CFG.dashCooldown;
    state.velocity.x = state.dashDir.x * MOVE_CFG.dashSpeed;
    state.velocity.z = state.dashDir.z * MOVE_CFG.dashSpeed;

    return { triggered: true, cooldown: state.dashCooldown, duration: state.dashTimer };
  }

  function resolveCollisions(playerHeight) {
    const r = MOVE_CFG.playerRadius;
    let supportY = 0;

    // Clamp to arena outer snow bounds
    state.position.x = Math.max(-MOVE_CFG.arenaBound, Math.min(MOVE_CFG.arenaBound, state.position.x));
    state.position.z = Math.max(-MOVE_CFG.arenaBound, Math.min(MOVE_CFG.arenaBound, state.position.z));

    for (let pass = 0; pass < 2; pass++) {
      for (const box of colliders) {
        if (!box || !box.min || !box.max) continue;

        const overlapX = state.position.x + r > box.min.x && state.position.x - r < box.max.x;
        const overlapZ = state.position.z + r > box.min.z && state.position.z - r < box.max.z;
        if (!overlapX || !overlapZ) continue;

        // Check if box surface acts as floor/platform support (e.g., snow floor y=0 or Site B dais y=0.6)
        if (box.max.y <= state.position.y + 0.45 && box.max.y >= state.position.y - 0.5) {
          if (box.max.y > supportY) supportY = box.max.y;
          continue;
        }

        // Ignore boxes entirely above head or below feet
        const footY = state.position.y + 0.14;
        const headY = state.position.y + playerHeight;
        if (box.max.y <= footY || box.min.y >= headY) continue;

        // Horizontal AABB push-out along shallowest penetration axis
        const penLeft = state.position.x + r - box.min.x;
        const penRight = box.max.x - (state.position.x - r);
        const penFront = state.position.z + r - box.min.z;
        const penBack = box.max.z - (state.position.z - r);

        const minPenX = Math.min(penLeft, penRight);
        const minPenZ = Math.min(penFront, penBack);

        if (minPenX < minPenZ) {
          if (penLeft < penRight) {
            state.position.x = box.min.x - r;
            if (state.velocity.x > 0) state.velocity.x = 0;
          } else {
            state.position.x = box.max.x + r;
            if (state.velocity.x < 0) state.velocity.x = 0;
          }
        } else {
          if (penFront < penBack) {
            state.position.z = box.min.z - r;
            if (state.velocity.z > 0) state.velocity.z = 0;
          } else {
            state.position.z = box.max.z + r;
            if (state.velocity.z < 0) state.velocity.z = 0;
          }
        }
      }
    }

    if (state.position.y <= supportY && state.velocity.y <= 0) {
      state.position.y = supportY;
      state.velocity.y = 0;
      state.grounded = true;
    } else {
      state.grounded = false;
    }
  }

  function step(dt, keys) {
    const clampedDt = Math.min(dt, 0.05);

    if (state.dashCooldown > 0) {
      state.dashCooldown = Math.max(0, state.dashCooldown - clampedDt);
    }

    const wantCrouch = hasKey(keys, 'ControlLeft') || hasKey(keys, 'ControlRight') || hasKey(keys, 'KeyC');
    const wantSprint = (hasKey(keys, 'ShiftLeft') || hasKey(keys, 'ShiftRight')) && !wantCrouch;
    state.crouching = wantCrouch;
    state.sprinting = wantSprint;

    const targetEye = wantCrouch ? MOVE_CFG.crouchEye : MOVE_CFG.standEye;
    state.eye += (targetEye - state.eye) * Math.min(1, clampedDt * 14);

    if (hasKey(keys, 'KeyQ') || hasKey(keys, 'KeyE')) {
      if (hasKey(keys, 'KeyQ')) triggerFrostStepDash(keys);
    }

    if (state.dashTimer > 0) {
      state.dashTimer = Math.max(0, state.dashTimer - clampedDt);
      state.velocity.x = state.dashDir.x * MOVE_CFG.dashSpeed;
      state.velocity.z = state.dashDir.z * MOVE_CFG.dashSpeed;
    } else {
      forward.set(-Math.sin(state.yaw), 0, -Math.cos(state.yaw));
      right.set(Math.cos(state.yaw), 0, -Math.sin(state.yaw));
      wishDir.set(0, 0, 0);

      if (hasKey(keys, 'KeyW') || hasKey(keys, 'ArrowUp')) wishDir.add(forward);
      if (hasKey(keys, 'KeyS') || hasKey(keys, 'ArrowDown')) wishDir.sub(forward);
      if (hasKey(keys, 'KeyD') || hasKey(keys, 'ArrowRight')) wishDir.add(right);
      if (hasKey(keys, 'KeyA') || hasKey(keys, 'ArrowLeft')) wishDir.sub(right);

      const speed = wantCrouch
        ? MOVE_CFG.crouchSpeed
        : wantSprint
          ? MOVE_CFG.sprintSpeed
          : MOVE_CFG.walkSpeed;

      if (wishDir.lengthSq() > 0.0001) {
        wishDir.normalize();
        const accel = state.grounded ? 18 : 7;
        state.velocity.x += (wishDir.x * speed - state.velocity.x) * Math.min(1, clampedDt * accel);
        state.velocity.z += (wishDir.z * speed - state.velocity.z) * Math.min(1, clampedDt * accel);
      } else {
        const friction = state.grounded ? 14 : 2.5;
        state.velocity.x *= Math.max(0, 1 - clampedDt * friction);
        state.velocity.z *= Math.max(0, 1 - clampedDt * friction);
      }
    }

    if (state.grounded && hasKey(keys, 'Space')) {
      state.velocity.y = MOVE_CFG.jumpVelocity;
      state.grounded = false;
    }

    state.velocity.y -= MOVE_CFG.gravity * clampedDt;

    state.position.x += state.velocity.x * clampedDt;
    state.position.y += state.velocity.y * clampedDt;
    state.position.z += state.velocity.z * clampedDt;

    const playerHeight = wantCrouch ? MOVE_CFG.crouchHeight : MOVE_CFG.standHeight;
    resolveCollisions(playerHeight);
    syncCamera();
  }

  function setCameraPose(x, y, z, yaw = 0, pitch = 0) {
    state.yaw = yaw;
    state.pitch = Math.max(-MOVE_CFG.maxPitch, Math.min(MOVE_CFG.maxPitch, pitch));
    state.velocity.set(0, 0, 0);
    state.dashTimer = 0;
    state.position.set(x, Math.max(0, y - state.eye), z);
    if (camera) {
      camera.position.set(x, y, z);
      camera.rotation.set(state.pitch, state.yaw, 0, 'YXZ');
    }
  }

  function groundSpeed() {
    return Math.hypot(state.velocity.x, state.velocity.z);
  }

  syncCamera();

  return {
    state,
    step,
    update: step,
    look,
    recoil,
    triggerFrostStepDash,
    setCameraPose,
    groundSpeed,
    syncCamera,
  };
}
