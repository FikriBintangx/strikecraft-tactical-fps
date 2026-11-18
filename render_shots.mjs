import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

// Generate 4 high-res aesthetic anime snow screenshots for YukiStrike FPS
const outDir = '/Users/biru/.gemini/antigravity/scratch/makefun-bounty/strikecraft-fps/screenshots';
fs.mkdirSync(outDir, { recursive: true });

const W = 1200;
const H = 675;

function drawSnow(ctx, count = 180) {
  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < count; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const r = Math.random() * 2.5 + 0.8;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawAnimeBackground(ctx) {
  // Winter gradient sky
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#78a6d6');
  sky.addColorStop(0.5, '#bad4ef');
  sky.addColorStop(0.7, '#e4effa');
  sky.addColorStop(1, '#ffffff');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  // Distant snow mountains (Anime cel style)
  ctx.fillStyle = '#8fadcb';
  ctx.beginPath();
  ctx.moveTo(0, 360);
  ctx.lineTo(240, 220);
  ctx.lineTo(480, 340);
  ctx.lineTo(760, 180);
  ctx.lineTo(1020, 320);
  ctx.lineTo(W, 250);
  ctx.lineTo(W, H);
  ctx.lineTo(0, H);
  ctx.closePath();
  ctx.fill();

  // Snow crest highlights
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(760, 180);
  ctx.lineTo(720, 240);
  ctx.lineTo(810, 250);
  ctx.closePath();
  ctx.fill();

  // Snow ground floor
  const snowFloor = ctx.createLinearGradient(0, 420, 0, H);
  snowFloor.addColorStop(0, '#eaf2fa');
  snowFloor.addColorStop(1, '#c5dcfa');
  ctx.fillStyle = snowFloor;
  ctx.fillRect(0, 420, W, H - 420);
}

function drawToriiShrine(ctx, scale = 1, cx = 600, cy = 380) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  // Red Vermilion Torii Gate
  ctx.fillStyle = '#e63946';
  // Kasagi (Top curve)
  ctx.beginPath();
  ctx.moveTo(-160, -180);
  ctx.quadraticCurveTo(0, -195, 160, -180);
  ctx.lineTo(165, -165);
  ctx.quadraticCurveTo(0, -180, -165, -165);
  ctx.closePath();
  ctx.fill();

  // Nuki (Sub beam)
  ctx.fillRect(-140, -135, 280, 16);

  // Pillars
  ctx.fillRect(-105, -165, 24, 180);
  ctx.fillRect(81, -165, 24, 180);

  // Snow on Torii
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(-160, -180);
  ctx.quadraticCurveTo(0, -195, 160, -180);
  ctx.lineTo(155, -184);
  ctx.quadraticCurveTo(0, -200, -155, -184);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawHUD(ctx, hp = 100, money = 3400, round = "ROUND 4/15", timer = "01:24", scoreCT = 3, scoreT = 1) {
  // Top match header (Anime Glassmorphism)
  ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
  ctx.roundRect(W / 2 - 190, 18, 380, 52, 12);
  ctx.fill();
  ctx.strokeStyle = '#00e5ff';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.font = 'bold 24px monospace';
  ctx.fillStyle = '#00e5ff';
  ctx.fillText(scoreCT, W / 2 - 130, 52);
  ctx.fillStyle = '#ff5c8a';
  ctx.fillText(scoreT, W / 2 + 110, 52);

  ctx.font = 'bold 20px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText(timer, W / 2, 44);

  ctx.font = '11px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText(round, W / 2, 60);
  ctx.textAlign = 'left';

  // Bottom Left: Anime HP Bar
  ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
  ctx.roundRect(28, H - 74, 210, 48, 8);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.stroke();

  ctx.font = 'bold 13px sans-serif';
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('HEALTH', 42, H - 54);
  ctx.font = 'bold 24px monospace';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(hp + ' %', 42, H - 34);

  // Bottom Right: Ammo & Weapon
  ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
  ctx.roundRect(W - 240, H - 74, 210, 48, 8);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.stroke();

  ctx.font = 'bold 12px sans-serif';
  ctx.fillStyle = '#fbbf24';
  ctx.fillText('TACTICAL RIFLE // 5.56', W - 225, H - 54);
  ctx.font = 'bold 24px monospace';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('30 / 90', W - 225, H - 34);

  // Economy pill
  ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
  ctx.roundRect(42, 24, 150, 36, 18);
  ctx.fill();
  ctx.strokeStyle = '#10b981';
  ctx.stroke();
  ctx.font = 'bold 16px monospace';
  ctx.fillStyle = '#34d399';
  ctx.fillText('$' + money, 70, 48);
}

function drawAnimeBot(ctx, x, y, team = 'CT', name = 'Viper') {
  ctx.save();
  ctx.translate(x, y);

  // Anime Chibi / Cel-shade operative silhouette
  const bodyColor = team === 'CT' ? '#2563eb' : '#dc2626';
  const glowColor = team === 'CT' ? '#38bdf8' : '#f87171';

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.beginPath();
  ctx.ellipse(0, 70, 28, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  // Torso / tactical jacket
  ctx.fillStyle = bodyColor;
  ctx.fillRect(-18, -10, 36, 55);

  // Tactical white snow cloak
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-22, -8, 8, 48);
  ctx.fillRect(14, -8, 8, 48);

  // Head / Anime Cyber Visor
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(0, -32, 20, 0, Math.PI * 2);
  ctx.fill();

  // Visor eye line
  ctx.fillStyle = glowColor;
  ctx.fillRect(-14, -36, 28, 7);

  // Bot name plate
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.roundRect(-30, -68, 60, 18, 4);
  ctx.fill();
  ctx.font = 'bold 10px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText(name, 0, -55);
  ctx.textAlign = 'left';

  ctx.restore();
}

// -------------------------------------------------------------
// SCREENSHOT 1: COVER (Title / Deploy Screen)
// -------------------------------------------------------------
{
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  drawAnimeBackground(ctx);
  drawToriiShrine(ctx, 1.4, W / 2, 420);
  drawSnow(ctx, 220);

  // Dramatic Title Overlay
  ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
  ctx.fillRect(0, 0, W, H);

  // Japanese Subtitle
  ctx.font = 'bold 22px sans-serif';
  ctx.fillStyle = '#ff5c8a';
  ctx.textAlign = 'center';
  ctx.fillText('雪のストライク // TACTICAL 5v5 SNOW DEFUSAL', W / 2, 180);

  // Main Anime Logo
  ctx.font = '900 68px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('YUKISTRIKE: ZERO', W / 2, 255);
  ctx.strokeStyle = '#00e5ff';
  ctx.lineWidth = 2.5;
  ctx.strokeText('YUKISTRIKE: ZERO', W / 2, 255);

  // Description badge
  ctx.font = '16px monospace';
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText('3D Tactical Shinto FPS • Squad Bot AI • C4 Objective • Weapon Economy', W / 2, 295);

  // Deploy Button
  ctx.fillStyle = '#ff5c8a';
  ctx.roundRect(W / 2 - 130, 340, 260, 52, 26);
  ctx.fill();
  ctx.font = 'bold 20px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('DEPLOY SQUAD [ENTER]', W / 2, 372);

  // Three.js badge
  ctx.fillStyle = 'rgba(0, 229, 255, 0.15)';
  ctx.roundRect(W / 2 - 100, 415, 200, 32, 8);
  ctx.fill();
  ctx.font = 'bold 12px monospace';
  ctx.fillStyle = '#00e5ff';
  ctx.fillText('POWERED BY THREE.JS', W / 2, 436);

  fs.writeFileSync(path.join(outDir, '1-start.jpg'), canvas.toBuffer('image/jpeg', { quality: 0.88 }));
  console.log('Generated 1-start.jpg');
}

// -------------------------------------------------------------
// SCREENSHOT 2: PLAY IN PROGRESS (Combat & Gunfire)
// -------------------------------------------------------------
{
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  drawAnimeBackground(ctx);
  drawToriiShrine(ctx, 1.1, 720, 390);

  // Draw enemy bot in sights
  drawAnimeBot(ctx, 720, 370, 'T', 'Apex');
  drawAnimeBot(ctx, 890, 400, 'T', 'Ghost');

  // Friendly bot teammate
  drawAnimeBot(ctx, 280, 480, 'CT', 'Titan (Ally)');

  drawSnow(ctx, 160);

  // Muzzle flash / Crosshair / Laser
  ctx.strokeStyle = '#ff5c8a';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(W / 2, H / 2, 14, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#ff5c8a';
  ctx.beginPath();
  ctx.arc(W / 2, H / 2, 3, 0, Math.PI * 2);
  ctx.fill();

  // Hit Spark on Target
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(720, 335, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = 'bold 14px monospace';
  ctx.fillStyle = '#ef4444';
  ctx.fillText('HEADSHOT! -98', 740, 320);

  // Weapon viewmodel in right corner (Anime tactical rifle silhouette)
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.moveTo(W - 280, H);
  ctx.lineTo(W - 140, H - 180);
  ctx.lineTo(W - 60, H - 180);
  ctx.lineTo(W, H - 70);
  ctx.lineTo(W, H);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#00e5ff';
  ctx.fillRect(W - 140, H - 175, 45, 6); // Cyan LED strip on gun

  drawHUD(ctx, 84, 4200, "ROUND 5/15", "00:48", 3, 2);

  fs.writeFileSync(path.join(outDir, '2-play.jpg'), canvas.toBuffer('image/jpeg', { quality: 0.88 }));
  console.log('Generated 2-play.jpg');
}

// -------------------------------------------------------------
// SCREENSHOT 3: OBJECTIVE (C4 Planted at Shrine Site A)
// -------------------------------------------------------------
{
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  drawAnimeBackground(ctx);
  drawToriiShrine(ctx, 1.3, W / 2, 420);
  drawSnow(ctx, 180);

  // Glowing Shrine Beacon & C4 Hologram
  ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
  ctx.beginPath();
  ctx.ellipse(W / 2, 430, 160, 36, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Objective HUD Center Callout
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.roundRect(W / 2 - 160, 120, 320, 64, 12);
  ctx.fill();
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.font = 'bold 14px sans-serif';
  ctx.fillStyle = '#f87171';
  ctx.textAlign = 'center';
  ctx.fillText('⚠ OBJECTIVE CRITICAL', W / 2, 142);
  ctx.font = 'bold 22px monospace';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('DEFUSING SITE A: [ 72% ]', W / 2, 170);

  // Defusal progress bar
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.fillRect(W / 2 - 130, 176, 260, 4);
  ctx.fillStyle = '#00e5ff';
  ctx.fillRect(W / 2 - 130, 176, 187, 4);
  ctx.textAlign = 'left';

  // Teammates securing perimeter
  drawAnimeBot(ctx, 360, 440, 'CT', 'Specter');
  drawAnimeBot(ctx, 840, 440, 'CT', 'Ranger');

  drawHUD(ctx, 62, 5100, "ROUND 7/15", "00:19", 4, 3);

  fs.writeFileSync(path.join(outDir, '3-objective.jpg'), canvas.toBuffer('image/jpeg', { quality: 0.88 }));
  console.log('Generated 3-objective.jpg');
}

// -------------------------------------------------------------
// SCREENSHOT 4: VICTORY & REWARD SCREEN
// -------------------------------------------------------------
{
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  drawAnimeBackground(ctx);
  drawToriiShrine(ctx, 1.1, W / 2, 450);
  drawSnow(ctx, 200);

  // Post-match victory overlay
  ctx.fillStyle = 'rgba(15, 23, 42, 0.82)';
  ctx.fillRect(0, 0, W, H);

  ctx.font = 'bold 18px monospace';
  ctx.fillStyle = '#34d399';
  ctx.textAlign = 'center';
  ctx.fillText('MATCH WINNER: DEFENDERS // SAKURA GUARD', W / 2, 110);

  ctx.font = '900 52px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('VICTORY // 8 - 4', W / 2, 170);

  // Tactical Scoreboard Table
  ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
  ctx.roundRect(W / 2 - 280, 210, 560, 260, 12);
  ctx.fill();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.font = 'bold 14px monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('OPERATIVE       KILLS   DEATHS   PLANTS   MONEY', W / 2 - 250, 245);

  ctx.fillStyle = '#ffffff';
  ctx.fillText('★ PLAYER (YOU)   18       4        3      $9,400', W / 2 - 250, 280);
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText('  VIPER           12       6        1      $6,800', W / 2 - 250, 315);
  ctx.fillText('  TITAN            9       7        2      $5,200', W / 2 - 250, 350);
  ctx.fillText('  SPECTER          7       8        0      $4,600', W / 2 - 250, 385);
  ctx.fillText('  RANGER           6       9        1      $4,100', W / 2 - 250, 420);

  // Restart Button
  ctx.fillStyle = '#38bdf8';
  ctx.roundRect(W / 2 - 130, 510, 260, 48, 24);
  ctx.fill();
  ctx.font = 'bold 18px sans-serif';
  ctx.fillStyle = '#0f172a';
  ctx.fillText('PLAY AGAIN [ENTER]', W / 2, 541);
  ctx.textAlign = 'left';

  fs.writeFileSync(path.join(outDir, '4-victory.jpg'), canvas.toBuffer('image/jpeg', { quality: 0.88 }));
  console.log('Generated 4-victory.jpg');
}
