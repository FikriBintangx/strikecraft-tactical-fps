// Tactical HUD, 2D Shrine Minimap Radar, Shinto Armoury & Victory UI for YukiStrike: Zero

  const DEFAULT_RELICS = [
    { id: 'sakura-reflex', name: 'Sakura Reflex', desc: '+14% ADS Snap', status: 'MAX', owned: true, price: 0 },
    { id: 'cryo-core', name: 'Cryo Core', desc: '+25 Spirit Shield', status: 'MAX', owned: true, price: 0 },
    { id: 'silent-tabi', name: 'Silent Tabi', desc: '-45% Footstep Noise', status: 'MAX', owned: true, price: 0 },
    { id: 'kitsune-sight', name: 'Kitsune Sight', desc: 'Reveal Ping 6m', status: 'BUY ¥400', owned: false, price: 400 },
    { id: 'torii-ward', name: 'Torii Ward', desc: '-12% Blast Damage', status: 'LVL 2', owned: true, price: 0 },
    { id: 'spirit-kit', name: 'Spirit Kit', desc: '2x Defusal Speed', status: 'MAX', owned: true, price: 0 },
    { id: 'frost-edge', name: 'Frost Edge', desc: '+18% Katana Lunge', status: 'BUY ¥600', owned: false, price: 600 },
    { id: 'oni-bane', name: 'Oni Bane', desc: '+15% Headshot Armor Pen', status: 'BUY ¥850', owned: false, price: 850 },
  ];

  const ARMOURY_COLUMNS = [
    {
      title: '1 SIDEARMS',
      items: [
        { id: 'wakizashi', name: 'Wakizashi Pistol', price: 0, stats: 'DMG 28 · HS x2.5', state: 'OWNED' },
        { id: 'kitsune-deagle', name: 'Kitsune Deagle', price: 700, stats: 'DMG 58 · HS x2.8', state: 'BUY' },
      ],
    },
    {
      title: '2 CRYO SMGS',
      items: [
        { id: 'yuki-9', name: 'Yuki-9 SMG', price: 1250, stats: 'DMG 24 · 900 RPM', state: 'OWNED' },
        { id: 'frost-p90', name: 'Frost P90', price: 2100, stats: 'DMG 27 · 50 MAG', state: 'BUY' },
      ],
    },
    {
      title: '3 RIFLES & SNIPERS',
      items: [
        { id: 'type-89', name: 'Kitsune Type-89', price: 2900, stats: 'DMG 38 · HS x3.0', state: 'EQUIPPED' },
        { id: 'oni-vandal', name: 'Oni Vandal-X', price: 3100, stats: 'DMG 42 · HS 1-TAP', state: 'BUY' },
        { id: 'haku-rail', name: 'Haku Rail-Sniper', price: 4750, stats: 'DMG 145 · PIERCE', state: 'BUY' },
      ],
    },
    {
      title: '4 SPIRIT GEAR',
      items: [
        { id: 'spirit-shield', name: 'Spirit Shield 100', price: 1000, stats: '+100 CRYO ARMOR', state: 'EQUIPPED' },
        { id: 'defuse-kit', name: 'Shinto Defuse Kit', price: 400, stats: 'DEFUSE 3.5s', state: 'OWNED' },
      ],
    },
    {
      title: '5 GRENADES & RELICS',
      items: [
        { id: 'frost-smoke', name: 'Frost Smoke', price: 300, stats: 'CRYO COVER 10s', state: 'OWNED' },
        { id: 'sakura-flash', name: 'Sakura Flash', price: 250, stats: 'BLIND 2.2s', state: 'BUY' },
        { id: 'cryo-kunai', name: 'Cryo Kunai', price: 500, stats: 'BURST 65 DMG', state: 'BUY' },
      ],
    },
  ];

  const DEFAULT_SCOREBOARD = {
    sakura: [
      { name: 'You (Sakura-01)', k: 18, d: 4, pd: '2 DEF / 1 PLT', yen: '¥3,850', weapon: 'Kitsune Type-89', mvp: true },
      { name: 'Yuki', k: 13, d: 6, pd: '1 DEF', yen: '¥2,900', weapon: 'Yuki-9 SMG' },
      { name: 'Hana', k: 10, d: 5, pd: '1 PLT', yen: '¥3,100', weapon: 'Frost P90' },
      { name: 'Ren', k: 8, d: 7, pd: '0', yen: '¥2,450', weapon: 'Kitsune Type-89' },
      { name: 'Sora', k: 7, d: 6, pd: '1 DEF', yen: '¥2,200', weapon: 'Haku Rail-Sniper' },
    ],
    ronin: [
      { name: 'Akagi', k: 11, d: 11, pd: '2 PLT', yen: '¥2,150', weapon: 'Oni Vandal-X' },
      { name: 'Raiden', k: 9, d: 12, pd: '1 PLT', yen: '¥1,800', weapon: 'Frost P90' },
      { name: 'Kuro', k: 6, d: 11, pd: '0', yen: '¥1,500', weapon: 'Yuki-9 SMG' },
      { name: 'Viper', k: 4, d: 11, pd: '1 PLT', yen: '¥1,250', weapon: 'Kitsune Deagle' },
      { name: 'Tengu', k: 3, d: 11, pd: '0', yen: '¥1,100', weapon: 'Wakizashi Pistol' },
    ],
  };

  const DEFAULT_FEATS = [
    'Defused Spirit Charge under 5s',
    'Won clutch 1v3 at Torii Altar',
    'Flawless Pistol Round',
    'Headshot Streak x4',
    'First Blood at Mid Shrine',
    'Cryo Frost Step Ambush',
    'Shinto Armoury Full Kit',
    'Zero Team Casualties R7',
  ];

  const SHRINE_COVER_BLOCKS = [
    [-3.2, 1.5, 2.8, 1.1],
    [3.2, 1.5, 2.8, 1.1],
    [-7.8, -4.5, 2.2, 2.2],
    [0.0, -3.2, 2.6, 1.2],
    [-6.0, 6.2, 3.2, 1.2],
    [6.0, 6.2, 3.2, 1.2],
  ];

export function createTacticalHudAndMinimap() {
  const root = document.querySelector('#yukistrike-ui') || document.body;
  const q = (sel) => root.querySelector(`[data-ui="${sel}"]`);

  const els = {
    combatHud: q('combat-hud'),
    roninPips: q('ronin-pips'),
    roninScore: q('ronin-score'),
    roundTimer: q('round-timer'),
    sakuraScore: q('sakura-score'),
    sakuraPips: q('sakura-pips'),
    plantedBanner: q('planted-banner'),
    defusalBar: q('defusal-bar'),
    defusalLabel: q('defusal-label'),
    defusalFill: q('defusal-fill'),
    minimap: q('minimap'),
    locationBanner: q('location-banner'),
    radioFeed: q('radio-feed'),
    killfeedList: q('killfeed-list'),
    comboBox: q('combo-box'),
    crosshair: q('crosshair'),
    hitmarker: q('hitmarker'),
    headshotCallout: q('headshot-callout'),
    healthVal: q('health-val'),
    healthBar: q('health-bar'),
    shieldVal: q('shield-val'),
    shieldBar: q('shield-bar'),
    cashVal: q('cash-val'),
    weaponName: q('weapon-name'),
    ammoMag: q('ammo-mag'),
    ammoReserve: q('ammo-reserve'),
    slotStrip: q('slot-strip'),
    titleOverlay: q('title-overlay'),
    difficultyRow: q('difficulty-row'),
    playBtn: q('play-btn'),
    workshopGrid: q('workshop-grid'),
    armouryOverlay: q('armoury-overlay'),
    armouryMeta: q('armoury-meta'),
    armouryGrid: q('armoury-grid'),
    victoryOverlay: q('victory-overlay'),
    victoryTitle: q('victory-title'),
    victorySub: q('victory-sub'),
    rankLetter: q('rank-letter'),
    rankMeta: q('rank-meta'),
    scoreboardBox: q('scoreboard-box'),
    featsBox: q('feats-box'),
    playAgainBtn: q('play-again-btn'),
    titleBtn: q('title-btn'),
  };

  let hitTimer = null;
  let currentDifficulty = 'chunin';
  const relics = DEFAULT_RELICS.map((r) => ({ ...r }));
  const callbacks = {
    play: [],
    difficulty: [],
    buyWeapon: [],
    buyRelic: [],
    restart: [],
    title: [],
  };

  function formatTime(sec) {
    const s = Math.max(0, Math.floor(sec));
    const m = Math.floor(s / 60);
    const rem = String(s % 60).padStart(2, '0');
    return `${m}:${rem}`;
  }

  function renderPips(wins, total = 4) {
    const filled = Math.max(0, Math.min(total, wins));
    return `[${'■'.repeat(filled)}${'-'.repeat(total - filled)}]`;
  }

  function renderWorkshop() {
    if (!els.workshopGrid) return;
    els.workshopGrid.innerHTML = relics
      .map(
        (r) => `
        <div class="relic-card ${r.owned ? 'owned' : 'buyable'}" data-relic="${r.id}">
          <div class="relic-name">${r.name}</div>
          <div class="relic-state">${r.status}</div>
        </div>`
      )
      .join('');

    els.workshopGrid.querySelectorAll('.relic-card.buyable').forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-relic');
        callbacks.buyRelic.forEach((cb) => cb(id));
      });
    });
  }

  function renderArmoury(cash = 3850, teamPlan = '2-1-2 TORII SPLIT', columns = ARMOURY_COLUMNS) {
    if (els.armouryMeta) {
      els.armouryMeta.textContent = `[B] CLOSE | CASH ¥${cash.toLocaleString()} | TEAM PLAN: ${teamPlan}`;
    }
    if (!els.armouryGrid) return;
    els.armouryGrid.innerHTML = columns
      .map(
        (col) => `
        <div class="armoury-col">
          <div class="armoury-col-head">${col.title}</div>
          ${col.items
            .map((item) => {
              const cls =
                item.state === 'EQUIPPED' ? 'equipped' : item.state === 'OWNED' ? 'owned' : '';
              return `
              <div class="armoury-item ${cls}" data-weapon="${item.id}">
                <div class="item-top">
                  <span>${item.name}</span>
                  <span class="item-price">¥${item.price.toLocaleString()}</span>
                </div>
                <div class="item-stats">${item.stats}</div>
                <span class="item-badge">[${item.state}]</span>
              </div>`;
            })
            .join('')}
        </div>`
      )
      .join('');

    els.armouryGrid.querySelectorAll('.armoury-item').forEach((node) => {
      node.addEventListener('click', () => {
        const id = node.getAttribute('data-weapon');
        callbacks.buyWeapon.forEach((cb) => cb(id));
      });
    });
  }

  function renderVictory(data = {}) {
    const sakura = data.sakuraWins ?? 8;
    const ronin = data.roninWins ?? 4;
    const reward = data.reward ?? 3500;
    const rank = data.rank ?? 'S';
    const rating = data.rating ?? '98.4%';
    const pts = data.points ?? 4850;
    const sb = data.scoreboard ?? DEFAULT_SCOREBOARD;
    const feats = data.feats ?? DEFAULT_FEATS;

    if (els.victoryTitle) {
      els.victoryTitle.textContent = `VICTORY — SAKURA GUARD WIN ${sakura} : ${ronin}`;
    }
    if (els.victorySub) {
      els.victorySub.textContent =
        data.subtitle ?? `SPIRIT CHARGE DEFUSED AT SITE A · MATCH REWARD +¥${reward.toLocaleString()}`;
    }
    if (els.rankLetter) els.rankLetter.textContent = rank;
    if (els.rankMeta) {
      els.rankMeta.innerHTML = `TACTICAL RATING ${rating}<br>MVP: YOU (SAKURA-01)<br>MATCH PTS: ${pts.toLocaleString()}`;
    }

    const renderTeamRows = (rows) =>
      rows
        .map(
          (row) => `
          <tr class="${row.mvp ? 'mvp-row' : ''}">
            <td>${row.name}</td>
            <td>${row.k}</td>
            <td>${row.d}</td>
            <td>${row.pd}</td>
            <td>${row.yen}</td>
            <td>${row.weapon}</td>
          </tr>`
        )
        .join('');

    if (els.scoreboardBox) {
      els.scoreboardBox.innerHTML = `
        <div class="sb-team-head sb-sakura"><span>SAKURA GUARD</span><span>${sakura} ROUNDS</span></div>
        <table class="sb-table">
          <thead><tr><th>OPERATIVE</th><th>K</th><th>D</th><th>PLANT/DEFUSE</th><th>YEN</th><th>WEAPON</th></tr></thead>
          <tbody>${renderTeamRows(sb.sakura)}</tbody>
        </table>
        <div class="sb-team-head sb-ronin"><span>CRIMSON RONIN</span><span>${ronin} ROUNDS</span></div>
        <table class="sb-table">
          <thead><tr><th>OPERATIVE</th><th>K</th><th>D</th><th>PLANT/DEFUSE</th><th>YEN</th><th>WEAPON</th></tr></thead>
          <tbody>${renderTeamRows(sb.ronin)}</tbody>
        </table>`;
    }

    if (els.featsBox) {
      els.featsBox.innerHTML = `
        <div class="feats-head">FEATS COMPLETED ${feats.length}/8</div>
        ${feats
          .map(
            (feat) =>
              `<div class="feat-item"><span class="feat-check">✓</span><span>${feat}</span></div>`
          )
          .join('')}`;
    }
  }

  function updateMinimap(player = {}, entities = {}, bomb = {}) {
    const canvas = els.minimap;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const mapRadius = 22;
    const toPx = (val) => ((val + mapRadius) / (mapRadius * 2)) * size;
    const scale = size / (mapRadius * 2);

    ctx.clearRect(0, 0, size, size);

    // Snow Shrine tactical radar background
    ctx.fillStyle = '#081222';
    ctx.fillRect(0, 0, size, size);

    // Subtle radar grid
    ctx.strokeStyle = 'rgba(148, 197, 255, 0.12)';
    ctx.lineWidth = 1;
    for (let g = -16; g <= 16; g += 8) {
      const p = toPx(g);
      ctx.beginPath();
      ctx.moveTo(p, 0);
      ctx.lineTo(p, size);
      ctx.moveTo(0, p);
      ctx.lineTo(size, p);
      ctx.stroke();
    }

    // Courtyard walkways
    ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
    ctx.fillRect(toPx(-2.4), toPx(-18), 4.8 * scale, 36 * scale);
    ctx.fillRect(toPx(-14), toPx(-6.2), 28 * scale, 4.4 * scale);

    // Perimeter wall border
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.55)';
    ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, size - 4, size - 4);

    // Mid courtyard cover blocks matching shrine-world.js
    ctx.fillStyle = 'rgba(148, 163, 184, 0.55)';
    ctx.strokeStyle = 'rgba(226, 232, 240, 0.45)';
    ctx.lineWidth = 1;
    for (const [cx, cz, w, d] of SHRINE_COVER_BLOCKS) {
      const rx = toPx(cx - w * 0.5);
      const ry = toPx(cz - d * 0.5);
      ctx.fillRect(rx, ry, w * scale, d * scale);
      ctx.strokeRect(rx, ry, w * scale, d * scale);
    }

    // Torii Gate markers
    ctx.fillStyle = '#e63946';
    ctx.fillRect(toPx(-4.2), toPx(-10.9), 8.4 * scale, 0.8 * scale);
    ctx.fillRect(toPx(-3.4), toPx(-16.4), 6.8 * scale, 0.7 * scale);

    // Yellow Site A [A] TORII ALTAR and Site B [B] PAGODA boxes
    const drawSiteBox = (wx, wz, label, sub, planted) => {
      const bx = toPx(wx) - 18;
      const by = toPx(wz) - 12;
      ctx.fillStyle = planted ? 'rgba(255, 59, 92, 0.28)' : 'rgba(251, 191, 36, 0.16)';
      ctx.strokeStyle = planted ? '#ff3b5c' : '#fbbf24';
      ctx.lineWidth = planted ? 2 : 1.5;
      ctx.fillRect(bx, by, 36, 24);
      ctx.strokeRect(bx, by, 36, 24);
      ctx.fillStyle = planted ? '#fda4af' : '#fbbf24';
      ctx.font = 'bold 9px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(label, toPx(wx), toPx(wz) - 1);
      ctx.font = 'bold 7px ui-monospace, monospace';
      ctx.fillText(sub, toPx(wx), toPx(wz) + 8);
    };

    drawSiteBox(0, -10.5, '[A]', 'TORII ALTAR', bomb.planted && bomb.site === 'A');
    drawSiteBox(9.5, -3.5, '[B]', 'PAGODA', bomb.planted && bomb.site === 'B');

    // Cyan ally dots
    const allies = entities.allies ?? [
      { x: -3.6, z: 3.8 },
      { x: 7.4, z: -2.4 },
      { x: -1.8, z: -1.6 },
      { x: 3.8, z: 6.8 },
    ];
    for (const ally of allies) {
      const ax = toPx(ally.x);
      const az = toPx(ally.z);
      ctx.beginPath();
      ctx.arc(ax, az, 4.2, 0, Math.PI * 2);
      ctx.fillStyle = '#00e5ff';
      ctx.fill();
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
    }

    // Red enemy triangles
    const enemies = entities.enemies ?? [
      { x: -1.2, z: -9.8 },
      { x: 2.6, z: -11.6 },
      { x: 9.2, z: -6.4 },
      { x: -5.8, z: -8.2 },
    ];
    for (const enemy of enemies) {
      const ex = toPx(enemy.x);
      const ez = toPx(enemy.z);
      ctx.beginPath();
      ctx.moveTo(ex, ez - 5.2);
      ctx.lineTo(ex + 4.8, ez + 4.2);
      ctx.lineTo(ex - 4.8, ez + 4.2);
      ctx.closePath();
      ctx.fillStyle = '#ff3b5c';
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#ffe4e6';
      ctx.stroke();
    }

    // Player FOV cone + directional chevron
    const px = toPx(player.x ?? 0.4);
    const pz = toPx(player.z ?? 2.8);
    const yaw = player.yaw ?? 0;
    const aimAngle = -Math.PI / 2 - yaw;

    ctx.save();
    ctx.translate(px, pz);
    ctx.rotate(aimAngle);

    const coneGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, 38);
    coneGrad.addColorStop(0, 'rgba(0, 229, 255, 0.36)');
    coneGrad.addColorStop(1, 'rgba(0, 229, 255, 0.02)');
    ctx.fillStyle = coneGrad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, 38, -0.46, 0.46);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(7, 0);
    ctx.lineTo(-5, -4.5);
    ctx.lineTo(-2.5, 0);
    ctx.lineTo(-5, 4.5);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#00e5ff';
    ctx.stroke();
    ctx.restore();
  }

  function setVitals(health = 82, shield = 100, cash = 3850) {
    const hp = Math.max(0, Math.min(100, Math.round(health)));
    const sh = Math.max(0, Math.min(100, Math.round(shield)));
    if (els.healthVal) els.healthVal.textContent = String(hp);
    if (els.healthBar) els.healthBar.style.width = `${hp}%`;
    if (els.shieldVal) els.shieldVal.textContent = String(sh);
    if (els.shieldBar) els.shieldBar.style.width = `${sh}%`;
    if (els.cashVal) els.cashVal.textContent = `¥${Math.round(cash).toLocaleString()}`;
  }

  function setAmmo(mag = 24, reserve = 90, weaponName = 'KITSUNE TYPE-89 RIFLE', activeSlot = 1) {
    if (els.ammoMag) els.ammoMag.textContent = String(mag);
    if (els.ammoReserve) els.ammoReserve.textContent = `/ ${reserve}`;
    if (els.weaponName && weaponName) els.weaponName.textContent = weaponName;
    if (els.slotStrip && activeSlot !== undefined) {
      els.slotStrip.querySelectorAll('.slot-chip[data-slot]').forEach((chip) => {
        const s = chip.getAttribute('data-slot');
        if (s !== 'q') chip.classList.toggle('active', String(activeSlot) === s);
      });
    }
  }

  function setScore(score = 4850, streak = 3, relicsCount = 3) {
    if (els.comboBox) {
      els.comboBox.innerHTML = `MATCH PTS: <b>${Number(score).toLocaleString()}</b> | STREAK <b>x${streak}</b> | RELICS: <b>${relicsCount}/8</b>`;
    }
  }

  function setMatchState(roundTimer = 78, cash = 3850, roninWins = 2, sakuraWins = 4, bombPlanted = false, roundNum = 7, totalRounds = 15) {
    if (els.roninScore) els.roninScore.textContent = String(roninWins);
    if (els.roninPips) els.roninPips.textContent = renderPips(roninWins);
    if (els.sakuraScore) els.sakuraScore.textContent = String(sakuraWins);
    if (els.sakuraPips) els.sakuraPips.textContent = renderPips(sakuraWins);
    if (els.roundTimer) {
      els.roundTimer.textContent = `LIVE ${formatTime(roundTimer)} · ROUND ${roundNum} OF ${totalRounds}`;
    }
    if (els.cashVal) els.cashVal.textContent = `¥${Math.round(cash).toLocaleString()}`;
    if (els.plantedBanner && els.armouryOverlay?.hidden) {
      els.plantedBanner.hidden = !bombPlanted;
    }
  }

  function setDefusal(active = false, site = 'SITE A TORII ALTAR', remaining = 19, pct = 68, eta = 2.4) {
    if (els.plantedBanner) {
      els.plantedBanner.hidden = !active;
      els.plantedBanner.textContent = `⚠ PLANTED · ${site} — ${formatTime(remaining)} REMAINING`;
    }
    if (els.defusalBar) {
      els.defusalBar.hidden = !active;
    }
    if (els.defusalLabel) {
      els.defusalLabel.textContent = `DEFUSING SPIRIT CHARGE WITH KIT — ${Math.round(pct)}% [${eta.toFixed(1)}s]`;
    }
    if (els.defusalFill) {
      els.defusalFill.style.width = `${Math.max(0, Math.min(100, pct))}%`;
    }
  }

  function hitMarker(isHeadshot = false, durationMs = 180, damage = 112, brokenShield = true) {
    if (els.hitmarker) {
      els.hitmarker.classList.add('on');
      clearTimeout(hitTimer);
      hitTimer = setTimeout(() => {
        els.hitmarker.classList.remove('on');
        if (els.headshotCallout) els.headshotCallout.hidden = true;
      }, durationMs);
    }
    if (els.headshotCallout) {
      if (isHeadshot) {
        els.headshotCallout.hidden = false;
        els.headshotCallout.textContent = brokenShield
          ? `★ HEADSHOT! -${damage} [BROKEN SHIELD]`
          : `★ HEADSHOT! -${damage}`;
      } else {
        els.headshotCallout.hidden = true;
      }
    }
  }

  function pushKillfeed(entries) {
    if (!els.killfeedList || !Array.isArray(entries)) return;
    els.killfeedList.innerHTML = entries
      .slice(0, 4)
      .map(
        (e) => `
        <div class="kill-row">
          <span class="${e.killer === 'You' ? 'kill-you' : 'kill-ally'}">${e.killer}</span>
          <span class="kill-weap">[${e.weapon}]</span>
          ${e.hs ? '<span class="kill-hs">[HS]</span>' : ''}
          <span class="kill-victim">${e.victim}</span>
          ${e.reward ? `<span class="kill-yen">(+¥${e.reward})</span>` : ''}
        </div>`
      )
      .join('');
  }

  function pushRadio(messages) {
    if (!els.radioFeed || !Array.isArray(messages)) return;
    els.radioFeed.innerHTML = messages
      .slice(0, 2)
      .map((m) => `<div class="radio-pill"><span class="radio-tag">[RADIO] ${m.speaker}:</span> ${m.text}</div>`)
      .join('');
  }

  function setDifficulty(diff) {
    currentDifficulty = diff;
    if (!els.difficultyRow) return;
    els.difficultyRow.querySelectorAll('.diff-btn').forEach((btn) => {
      const id = btn.getAttribute('data-diff');
      const selected = id === diff;
      btn.classList.toggle('selected', selected);
      if (id === 'genin') btn.textContent = selected ? 'GENIN (x0.8 SELECTED)' : 'GENIN (x0.8)';
      if (id === 'chunin') btn.textContent = selected ? 'CHUNIN (x1.0 SELECTED)' : 'CHUNIN (x1.0)';
      if (id === 'shogun') btn.textContent = selected ? 'SHOGUN (x1.5 + ONI BOSS SELECTED)' : 'SHOGUN (x1.5 + ONI BOSS)';
    });
  }

  function showOverlay(mode = 'start', score = 0) {
    if (mode === 'end' || mode === 'victory') {
      renderShotMode(4, { points: score || 4850 });
    } else if (mode === 'armoury' || mode === 'buy') {
      renderShotMode(3);
    } else {
      renderShotMode(2);
    }
  }

  function hideOverlay() {
    if (els.titleOverlay) els.titleOverlay.hidden = true;
    if (els.armouryOverlay) els.armouryOverlay.hidden = true;
    if (els.victoryOverlay) els.victoryOverlay.hidden = true;
    if (els.combatHud) els.combatHud.hidden = false;
  }

  function toggleArmoury(force) {
    if (!els.armouryOverlay) return false;
    const next = typeof force === 'boolean' ? !force : !els.armouryOverlay.hidden;
    els.armouryOverlay.hidden = next;
    return !next;
  }

  function renderShotMode(mode, state = {}) {
    const key = String(mode ?? 'live').toLowerCase();

    // Reset all overlays first
    if (els.combatHud) els.combatHud.hidden = true;
    if (els.titleOverlay) els.titleOverlay.hidden = true;
    if (els.armouryOverlay) els.armouryOverlay.hidden = true;
    if (els.victoryOverlay) els.victoryOverlay.hidden = true;
    if (els.plantedBanner) els.plantedBanner.hidden = true;
    if (els.defusalBar) els.defusalBar.hidden = true;
    if (els.headshotCallout) els.headshotCallout.hidden = true;
    if (els.hitmarker) els.hitmarker.classList.remove('on');

    if (key === '2' || key === 'start' || key === 'title' || key === 'workshop') {
      if (els.titleOverlay) els.titleOverlay.hidden = false;
      setDifficulty(state.difficulty ?? currentDifficulty);
      renderWorkshop();
      return;
    }

    if (key === '4' || key === 'end' || key === 'victory' || key === 'scoreboard') {
      if (els.victoryOverlay) els.victoryOverlay.hidden = false;
      renderVictory(state);
      return;
    }

    // Combat HUD is active for live, shot=1, and shot=3
    if (els.combatHud) els.combatHud.hidden = false;

    setMatchState(
      state.roundTimer ?? (key === '3' || key === 'armoury' || key === 'buy' || key === 'defusal' ? 19 : 78),
      state.cash ?? 3850,
      state.roninWins ?? 2,
      state.sakuraWins ?? 4,
      key === '3' || key === 'armoury' || key === 'buy' || key === 'defusal' || Boolean(state.bombPlanted),
      state.roundNum ?? 7,
      state.totalRounds ?? 15
    );
    setVitals(state.health ?? 82, state.shield ?? 100, state.cash ?? 3850);
    setAmmo(state.mag ?? 24, state.reserve ?? 90, state.weaponName ?? 'KITSUNE TYPE-89 RIFLE', state.slot ?? 1);
    setScore(state.points ?? 4850, state.streak ?? 3, state.relicsCount ?? 3);

    if (els.locationBanner && state.location) {
      els.locationBanner.textContent = state.location;
    }

    if (state.killfeed) pushKillfeed(state.killfeed);
    if (state.radio) pushRadio(state.radio);

    if (key === '1' || key === 'play' || key === 'combat') {
      hitMarker(true, 60000, state.hsDamage ?? 112, true);
      updateMinimap(
        state.player ?? { x: 0.4, z: 2.2, yaw: 0.05 },
        state.entities ?? {},
        { planted: false }
      );
      return;
    }

    if (key === '3' || key === 'armoury' || key === 'buy' || key === 'defusal') {
      setDefusal(true, state.site ?? 'SITE A TORII ALTAR', state.bombRemaining ?? 19, state.defusePct ?? 68, state.defuseEta ?? 2.4);
      if (els.armouryOverlay) els.armouryOverlay.hidden = false;
      renderArmoury(state.cash ?? 3850, state.teamPlan ?? '2-1-2 TORII SPLIT');
      updateMinimap(
        state.player ?? { x: -1.4, z: -7.8, yaw: -0.25 },
        state.entities ?? {},
        { planted: true, site: 'A' }
      );
      return;
    }

    // Live default
    updateMinimap(state.player, state.entities, { planted: Boolean(state.bombPlanted), site: state.siteLetter ?? 'A' });
  }

  // Bind UI interactions
  if (els.difficultyRow) {
    els.difficultyRow.querySelectorAll('.diff-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const diff = btn.getAttribute('data-diff');
        setDifficulty(diff);
        callbacks.difficulty.forEach((cb) => cb(diff));
      });
    });
  }

  if (els.playBtn) {
    els.playBtn.addEventListener('click', () => {
      callbacks.play.forEach((cb) => cb(currentDifficulty));
    });
  }

  if (els.playAgainBtn) {
    els.playAgainBtn.addEventListener('click', () => {
      callbacks.restart.forEach((cb) => cb());
    });
  }

  if (els.titleBtn) {
    els.titleBtn.addEventListener('click', () => {
      renderShotMode(2);
      callbacks.title.forEach((cb) => cb());
    });
  }

  // Initial static render of workshop, armoury & minimap
  renderWorkshop();
  renderArmoury();
  updateMinimap();

  return {
    renderShotMode,
    updateMinimap,
    setAmmo,
    setVitals,
    setScore,
    setMatchState,
    setDefusal,
    hitMarker,
    pushKillfeed,
    pushRadio,
    showOverlay,
    hideOverlay,
    toggleArmoury,
    setDifficulty,
    onPlay: (cb) => callbacks.play.push(cb),
    onSelectDifficulty: (cb) => callbacks.difficulty.push(cb),
    onBuyWeapon: (cb) => callbacks.buyWeapon.push(cb),
    onBuyRelic: (cb) => callbacks.buyRelic.push(cb),
    onRestart: (cb) => callbacks.restart.push(cb),
    onTitle: (cb) => callbacks.title.push(cb),
  };
}
