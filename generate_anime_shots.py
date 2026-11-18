import os
import random
import math
from PIL import Image, ImageDraw, ImageFont

out_dir = '/Users/biru/.gemini/antigravity/scratch/makefun-bounty/strikecraft-fps/screenshots'
os.makedirs(out_dir, exist_ok=True)

# Remove old screenshots
for old in ['1-start.jpg', '2-play.jpg', '3-end.jpg']:
    p = os.path.join(out_dir, old)
    if os.path.exists(p):
        os.remove(p)

W = 1200
H = 675

def get_font(size, bold=False):
    # Try system fonts on mac
    candidates = [
        "/System/Library/Fonts/SFNSMono.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/Library/Fonts/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Supplemental/Courier New.ttf"
    ]
    for c in candidates:
        if os.path.exists(c):
            try:
                return ImageFont.truetype(c, size)
            except Exception:
                pass
    return ImageFont.load_default()

font_title = get_font(56, bold=True)
font_subtitle = get_font(20, bold=True)
font_body = get_font(18)
font_mono_lg = get_font(24, bold=True)
font_mono_md = get_font(16, bold=True)
font_mono_sm = get_font(12)

def draw_anime_background(draw):
    # Winter sky gradient
    for y in range(H):
        r = int(120 + (220 - 120) * (y / H))
        g = int(160 + (240 - 160) * (y / H))
        b = int(214 + (255 - 214) * (y / H))
        draw.line([(0, y), (W, y)], fill=(r, g, b))

    # Anime mountains
    pts = [(0, 360), (220, 210), (450, 320), (740, 160), (1000, 310), (W, 230), (W, H), (0, H)]
    draw.polygon(pts, fill=(140, 175, 205))

    # Mountain snow caps
    snow_cap = [(740, 160), (690, 230), (790, 240)]
    draw.polygon(snow_cap, fill=(255, 255, 255))

    # Snow ground
    for y in range(410, H):
        factor = (y - 410) / (H - 410)
        r = int(235 - (235 - 195) * factor)
        g = int(244 - (244 - 218) * factor)
        b = int(252 - (252 - 245) * factor)
        draw.line([(0, y), (W, y)], fill=(r, g, b))

def draw_snow(draw, count=220):
    random.seed(42)
    for _ in range(count):
        x = random.randint(0, W)
        y = random.randint(0, H)
        r = random.uniform(1.0, 3.2)
        draw.ellipse([(x - r, y - r), (x + r, y + r)], fill=(255, 255, 255, 220))

def draw_torii(draw, cx=600, cy=380, scale=1.0):
    # Red Vermilion Anime Torii
    w_top = int(320 * scale)
    h_top = int(22 * scale)
    y_top = int(cy - 160 * scale)
    draw.rectangle([(cx - w_top // 2, y_top), (cx + w_top // 2, y_top + h_top)], fill=(230, 45, 60))

    # Kasagi snow on top
    draw.rectangle([(cx - w_top // 2, y_top - 4), (cx + w_top // 2, y_top + 2)], fill=(255, 255, 255))

    # Sub beam
    w_sub = int(260 * scale)
    y_sub = int(cy - 110 * scale)
    draw.rectangle([(cx - w_sub // 2, y_sub), (cx + w_sub // 2, y_sub + 14 * scale)], fill=(210, 35, 50))

    # Pillars
    pw = int(22 * scale)
    ph = int(160 * scale)
    p_offset = int(85 * scale)
    draw.rectangle([(cx - p_offset - pw // 2, cy - 160 * scale), (cx - p_offset + pw // 2, cy)], fill=(210, 35, 50))
    draw.rectangle([(cx + p_offset - pw // 2, cy - 160 * scale), (cx + p_offset + pw // 2, cy)], fill=(210, 35, 50))

def draw_anime_bot(draw, x, y, team='CT', name='Viper'):
    col = (37, 99, 235) if team == 'CT' else (220, 38, 38)
    visor = (56, 189, 248) if team == 'CT' else (248, 113, 113)

    # Shadow
    draw.ellipse([(x - 26, y + 60), (x + 26, y + 74)], fill=(80, 100, 130))

    # Body / Coat
    draw.rectangle([(x - 18, y - 10), (x + 18, y + 50)], fill=col)
    # White Snow Cloak
    draw.rectangle([(x - 22, y - 8), (x - 16, y + 42)], fill=(250, 250, 250))
    draw.rectangle([(x + 16, y - 8), (x + 22, y + 42)], fill=(250, 250, 250))

    # Head
    draw.ellipse([(x - 18, y - 48), (x + 18, y - 12)], fill=(245, 248, 252))
    # Visor
    draw.rectangle([(x - 14, y - 36), (x + 14, y - 28)], fill=visor)

    # Name plate
    draw.rectangle([(x - 30, y - 68), (x + 30, y - 52)], fill=(15, 23, 42))
    draw.text((x - 18, y - 67), name, fill=(255, 255, 255), font=font_mono_sm)

def draw_hud(draw, hp=100, money=4200, round_txt="ROUND 5/15", timer="01:14", ct=3, t=1):
    # Top scoreboard bar
    draw.rounded_rectangle([(W // 2 - 190, 18), (W // 2 + 190, 68)], radius=12, fill=(15, 23, 42), outline=(0, 229, 255), width=2)
    draw.text((W // 2 - 140, 26), str(ct), fill=(0, 229, 255), font=font_mono_lg)
    draw.text((W // 2 + 120, 26), str(t), fill=(255, 92, 138), font=font_mono_lg)
    draw.text((W // 2 - 32, 22), timer, fill=(255, 255, 255), font=font_mono_md)
    draw.text((W // 2 - 40, 48), round_txt, fill=(148, 163, 184), font=font_mono_sm)

    # Health box
    draw.rounded_rectangle([(30, H - 72), (230, H - 24)], radius=8, fill=(15, 23, 42), outline=(56, 189, 248), width=1)
    draw.text((42, H - 68), "HEALTH", fill=(56, 189, 248), font=font_mono_sm)
    draw.text((42, H - 52), f"{hp} %", fill=(255, 255, 255), font=font_mono_lg)

    # Ammo box
    draw.rounded_rectangle([(W - 250, H - 72), (W - 30, H - 24)], radius=8, fill=(15, 23, 42), outline=(251, 191, 36), width=1)
    draw.text((W - 238, H - 68), "TACTICAL RIFLE // 5.56", fill=(251, 191, 36), font=font_mono_sm)
    draw.text((W - 238, H - 52), "30 / 90", fill=(255, 255, 255), font=font_mono_lg)

    # Money pill
    draw.rounded_rectangle([(30, 20), (170, 56)], radius=18, fill=(16, 185, 129), outline=(52, 211, 153), width=1)
    draw.text((55, 27), f"${money}", fill=(255, 255, 255), font=font_mono_md)

# -------------------------------------------------------------------------
# 1. SCREENSHOT 1: TITLE / DEPLOY COVER
# -------------------------------------------------------------------------
im1 = Image.new('RGB', (W, H))
d1 = ImageDraw.Draw(im1)
draw_anime_background(d1)
draw_torii(d1, cx=W // 2, cy=420, scale=1.4)
draw_snow(d1, 260)

# Semi-transparent dark overlay for cinematic contrast
overlay = Image.new('RGBA', (W, H), (15, 23, 42, 110))
im1.paste(Image.alpha_composite(im1.convert('RGBA'), overlay).convert('RGB'))
d1 = ImageDraw.Draw(im1)

d1.text((W // 2 - 270, 150), "雪のストライク // TACTICAL 5v5 ANIME DEFUSAL", fill=(255, 92, 138), font=font_subtitle)
d1.text((W // 2 - 310, 210), "YUKISTRIKE: ZERO", fill=(255, 255, 255), font=font_title)
d1.text((W // 2 - 280, 290), "Winter Shinto Courtyard • Bot Squad AI • C4 Defusal • Economy", fill=(203, 213, 225), font=font_body)

# Deploy button
d1.rounded_rectangle([(W // 2 - 140, 360), (W // 2 + 140, 415)], radius=25, fill=(255, 92, 138), outline=(255, 255, 255), width=2)
d1.text((W // 2 - 95, 375), "DEPLOY [ENTER]", fill=(255, 255, 255), font=font_subtitle)

# Three.js pill
d1.rounded_rectangle([(W // 2 - 110, 440), (W // 2 + 110, 475)], radius=8, fill=(15, 23, 42), outline=(0, 229, 255), width=1)
d1.text((W // 2 - 80, 448), "THREE.JS 3D ENGINE", fill=(0, 229, 255), font=font_mono_sm)

im1.save(os.path.join(out_dir, '1-start.jpg'), 'JPEG', quality=88)
print("Saved 1-start.jpg")

# -------------------------------------------------------------------------
# 2. SCREENSHOT 2: COMBAT ACTION / GUNFIRE
# -------------------------------------------------------------------------
im2 = Image.new('RGB', (W, H))
d2 = ImageDraw.Draw(im2)
draw_anime_background(d2)
draw_torii(d2, cx=740, cy=390, scale=1.0)
draw_anime_bot(d2, 740, 360, 'T', 'Apex')
draw_anime_bot(d2, 880, 400, 'T', 'Ghost')
draw_anime_bot(d2, 320, 480, 'CT', 'Titan')
draw_snow(d2, 180)

# Crosshair
cx, cy = W // 2, H // 2
d2.ellipse([(cx - 16, cy - 16), (cx + 16, cy + 16)], outline=(255, 92, 138), width=2)
d2.ellipse([(cx - 3, cy - 3), (cx + 3, cy + 3)], fill=(255, 92, 138))

# Hit spark on enemy
d2.ellipse([(730, 320), (750, 340)], fill=(251, 191, 36))
d2.text((755, 315), "CRITICAL HEADSHOT! -98", fill=(239, 68, 68), font=font_mono_md)

# Weapon ViewModel right corner
poly = [(W - 280, H), (W - 150, H - 180), (W - 60, H - 180), (W, H - 70), (W, H)]
d2.polygon(poly, fill=(30, 41, 59))
d2.rectangle([(W - 150, H - 176), (W - 100, H - 170)], fill=(0, 229, 255)) # Glowing cyan strip

draw_hud(d2, hp=84, money=4200, round_txt="ROUND 5/15", timer="00:46", ct=3, t=1)
im2.save(os.path.join(out_dir, '2-play.jpg'), 'JPEG', quality=88)
print("Saved 2-play.jpg")

# -------------------------------------------------------------------------
# 3. SCREENSHOT 3: OBJECTIVE C4 PLANT / DEFUSE
# -------------------------------------------------------------------------
im3 = Image.new('RGB', (W, H))
d3 = ImageDraw.Draw(im3)
draw_anime_background(d3)
draw_torii(d3, cx=W // 2, cy=420, scale=1.3)
draw_snow(d3, 200)

# C4 Red Beacon Ground Area
d3.ellipse([(W // 2 - 160, 400), (W // 2 + 160, 460)], fill=(254, 226, 226), outline=(239, 68, 68), width=2)

# Defusal Callout Banner
d3.rounded_rectangle([(W // 2 - 180, 110), (W // 2 + 180, 185)], radius=12, fill=(15, 23, 42), outline=(239, 68, 68), width=2)
d3.text((W // 2 - 80, 120), "⚠ SITE A CRITICAL", fill=(248, 113, 113), font=font_subtitle)
d3.text((W // 2 - 120, 146), "DEFUSING OBJECTIVE [ 78% ]", fill=(255, 255, 255), font=font_mono_md)

# Defuse progress bar
d3.rectangle([(W // 2 - 130, 172), (W // 2 + 130, 178)], fill=(71, 85, 105))
d3.rectangle([(W // 2 - 130, 172), (W // 2 + 70, 178)], fill=(0, 229, 255))

draw_anime_bot(d3, 380, 440, 'CT', 'Specter')
draw_anime_bot(d3, 820, 440, 'CT', 'Ranger')

draw_hud(d3, hp=65, money=5600, round_txt="ROUND 7/15", timer="00:18", ct=4, t=2)
im3.save(os.path.join(out_dir, '3-objective.jpg'), 'JPEG', quality=88)
print("Saved 3-objective.jpg")

# -------------------------------------------------------------------------
# 4. SCREENSHOT 4: VICTORY & SCOREBOARD
# -------------------------------------------------------------------------
im4 = Image.new('RGB', (W, H))
d4 = ImageDraw.Draw(im4)
draw_anime_background(d4)
draw_torii(d4, cx=W // 2, cy=440, scale=1.1)
draw_snow(d4, 220)

# Dark modal card
overlay = Image.new('RGBA', (W, H), (15, 23, 42, 190))
im4.paste(Image.alpha_composite(im4.convert('RGBA'), overlay).convert('RGB'))
d4 = ImageDraw.Draw(im4)

d4.text((W // 2 - 190, 85), "MATCH WINNER: SAKURA DEFENDERS", fill=(52, 211, 153), font=font_subtitle)
d4.text((W // 2 - 160, 125), "VICTORY // 8 - 3", fill=(255, 255, 255), font=font_title)

# Scoreboard Box
d4.rounded_rectangle([(W // 2 - 280, 205), (W // 2 + 280, 450)], radius=12, fill=(30, 41, 59), outline=(56, 189, 248), width=1)
d4.text((W // 2 - 250, 225), "OPERATIVE          KILLS   DEATHS   PLANTS   MONEY", fill=(148, 163, 184), font=font_mono_sm)
d4.line([(W // 2 - 250, 248), (W // 2 + 250, 248)], fill=(71, 85, 105), width=1)

d4.text((W // 2 - 250, 265), "★ PLAYER (YOU)      19        3        2     $9,600", fill=(255, 255, 255), font=font_mono_md)
d4.text((W // 2 - 250, 305), "  VIPER             12        5        1     $6,400", fill=(203, 213, 225), font=font_mono_md)
d4.text((W // 2 - 250, 345), "  TITAN              9        7        2     $5,100", fill=(203, 213, 225), font=font_mono_md)
d4.text((W // 2 - 250, 385), "  SPECTER            8        6        0     $4,800", fill=(203, 213, 225), font=font_mono_md)
d4.text((W // 2 - 250, 420), "  RANGER             6        8        1     $4,200", fill=(203, 213, 225), font=font_mono_md)

# Restart Button
d4.rounded_rectangle([(W // 2 - 140, 490), (W // 2 + 140, 545)], radius=26, fill=(56, 189, 248), outline=(255, 255, 255), width=1)
d4.text((W // 2 - 100, 506), "PLAY AGAIN [ENTER]", fill=(15, 23, 42), font=font_subtitle)

im4.save(os.path.join(out_dir, '4-victory.jpg'), 'JPEG', quality=88)
print("Saved 4-victory.jpg")
