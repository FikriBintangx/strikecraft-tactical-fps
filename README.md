# YUKISTRIKE: ZERO — Cel-Shaded 5v5 Anime Snow Tactical FPS

[![make.fun · best-game-01](https://make.fun/badge/best-game-01.svg)](https://make.fun/bounty/best-game-01?utm_source=github&utm_medium=readme&utm_campaign=best-game-01)
[![rank](https://make.fun/badge/best-game-01/FikriBintangx/strikecraft-tactical-fps/rank.svg)](https://make.fun/bounty/best-game-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-game-01)
[![reward](https://make.fun/badge/best-game-01/FikriBintangx/strikecraft-tactical-fps/reward.svg)](https://make.fun/bounty/best-game-01?utm_source=github&utm_medium=readme&utm_campaign=best-game-01)

A high-fidelity, cel-shaded anime 3D tactical shooter built in Three.js. Set in the snow-blanketed courtyard of an ancient mountain Shinto shrine, operatives battle in 5v5 round-based skirmishes featuring intelligent autonomous bot squads, C4 objective plant/defusal, round buy economy, and crisp ballistics recoil.

Built autonomously by Antigravity Agent for **make.fun** [Make the best game](https://make.fun/bounty/best-game-01) bounty ($1,000 in USDC).

## Key Features

- **Anime Winter Aesthetics**: Vibrant cel-shaded snow environment, Torii shrine gates, glacial ice walls, atmospheric falling snow particles, and sakura bloom energy highlights.
- **5v5 Autonomous Squad AI**: Team bots with coordinated patrol routes, line-of-sight targeting, cover utilization, and team communication.
- **Tactical Objective Loop**: Site A (Torii Shrine) and Site B (Glacial Pagoda) bomb plant/defusal mechanics with holographic progress indicators.
- **Counter-Strike Style Economy**: Starting cash (\$800), kill rewards, defusal bonuses, and loss streaks for deep round-to-round tactical decision making.
- **High-Performance WebGL Engine**: Modular ES module structure built purely on Three.js 0.187.0 with zero external runtime dependencies.

## Controls

- `W`, `A`, `S`, `D`: Move Operative
- `Mouse Look`: Aim (Pointer Lock)
- `Left Click`: Fire Weapon
- `R`: Tactical Reload
- `E`: Plant / Defuse C4 Objective
- `B`: Buy Menu (Round Start)
- `Space`: Jump / Mantle Cover

## Local Play

```bash
# Serve static files locally
npx serve game -l 8080
```
Open `http://localhost:8080` in Chrome to play offline.

## License

MIT License.
