# YUKISTRIKE: ZERO — Cel-Shaded 5v5 Anime Snow Tactical FPS

[![make.fun · best-game-01](https://make.fun/badge/best-game-01.svg)](https://make.fun/bounty/best-game-01?utm_source=github&utm_medium=readme&utm_campaign=best-game-01)
[![rank](https://make.fun/badge/best-game-01/FikriBintangx/strikecraft-tactical-fps/rank.svg)](https://make.fun/bounty/best-game-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-game-01)
[![reward](https://make.fun/badge/best-game-01/FikriBintangx/strikecraft-tactical-fps/reward.svg)](https://make.fun/bounty/best-game-01/reward?utm_source=github&utm_medium=readme&utm_campaign=best-game-01)

A high-fidelity, cel-shaded anime 3D tactical shooter built in Three.js for the **make.fun** `best-game-01` competition ($1,000 USDC). Set in the snow-blanketed courtyard of an ancient Shinto mountain shrine, operatives engage in rigorous 5v5 round-based defusal skirmishes combining tactical economy, autonomous squad AI, and precise ballistic physics.

---

## Complete Architectural Overview

**YUKISTRIKE: ZERO** is engineered as a modular, dependency-free ES6 application running on Three.js r165. The codebase is strictly partitioned into specialized modules:

```
strikecraft-fps/
├── index.html            # Main entry point and canvas viewport
├── css/
│   └── style.css         # Cyberpunk/anime HUD and buy-menu overlays
└── js/
    ├── main.js           # Core game loop, scene lifecycle, state machine
    ├── shrine-world.js   # Procedural Shinto Shrine map, snow particles & lighting
    ├── weapons-armoury.js# 10 tactical firearms & 8 Spirit Relics ballistics
    ├── squad-bots.js     # 5v5 autonomous squad behavior trees & pathfinding
    ├── round-defusal.js  # Bomb plant/defusal, round economy, and win states
    ├── player-controller.js# First-person pointer-lock physics, recoil & stamina
    ├── audio-synth.js    # Procedural WebAudio synthesizer (gunshots, footsteps)
    └── hud-minimap.js    # Real-time tactical minimap & dynamic HUD overlays
```

### Module Specifications

1. **`shrine-world.js`**: Constructs the tactical arena featuring Torii gates, sacred pagodas, glacial cover barriers, and dynamic particle systems for falling snow and wind simulation. Manages raycast colliders and light baking.
2. **`weapons-armoury.js`**: Implements 10 primary/secondary firearms (Assault Rifles, SMGs, Snipers, Shotguns) and 8 mystical Spirit Relics with unique fire rates, recoil patterns, damage drop-offs, and reload timings.
3. **`squad-bots.js`**: Powers the 5v5 bot AI using finite state machines (Patrol, Engage, Plant, Defuse, Retreat). Bots evaluate threat levels, utilize line-of-sight raycasting, and coordinate tactical pushes.
4. **`round-defusal.js`**: Handles the competitive round loop: Buy Phase ($800 starting cash, kill rewards, loss bonuses), C4 Plant/Defuse mechanics at Site A (Torii Shrine) and Site B (Glacial Pagoda), and match point tracking.
5. **`player-controller.js`**: Manages first-person movement, gravity, jumping, crouch sliding, weapon bobbing, camera recoil recovery, and pointer-lock integration.
6. **`audio-synth.js`**: Synthesizes all audio in real-time via WebAudio API oscillators and noise buffers—eliminating external asset latency for gunfire, reloads, footsteps, and bomb beeps.
7. **`hud-minimap.js`**: Renders dynamic canvas overlays for player health, ammunition, active economy, round timer, team status, and real-time minimap tracking of allies and spotted enemies.
8. **`main.js`**: Orchestrates initialization, requestAnimationFrame render loop, window resizing, and global event dispatching across subsystems.

---

## 5v5 Shinto Shrine Defusal Gameplay Loop

- **Economy Phase**: Players buy weapons, armor, and utility items using credits earned from kills, objective plants, and round outcomes.
- **Engagement Phase**: Attackers attempt to infiltrate the shrine courtyards and plant the C4 Spirit Catalyst at Site A or Site B. Defenders coordinate crossfire and defensive positioning.
- **Resolution**: Rounds conclude via elimination, successful C4 detonation (45s timer), or successful defusal (7s duration with defusal kit modifier).

---

## Complete Controls Reference

| Key / Input | Action |
| :--- | :--- |
| `W`, `A`, `S`, `D` | Move Operative (Forward, Left, Backward, Right) |
| `Mouse Look` | Aim / Direct View (Pointer Lock) |
| `Left Click` | Fire Active Weapon |
| `Right Click` | Scope / ADS (Aim Down Sights) |
| `R` | Tactical Reload |
| `E` | Plant / Defuse C4 Objective |
| `B` | Open / Close Round Buy Menu |
| `Space` | Jump / Mantle Cover |
| `Shift` | Sprint |
| `Ctrl` | Crouch / Slide |
| `1` - `3` | Weapon Slot Selection |

---

## Quick Start & Local Play

```bash
# Serve static files locally
npx serve . -l 8080
```
Open `http://localhost:8080` in any modern WebGL-enabled browser.

## License

MIT License — Built with precision for the **make.fun** `best-game-01` competition.
