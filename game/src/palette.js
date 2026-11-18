// Winter Frostbite Cel-Shaded Anime Palette for YukiStrike FPS
// Inspired by Japanese winter aesthetics, cel-shading outlines, crystal ice, and cherry blossom sakura accents.
export const PALETTE = {
  canvas: '#dce8f5',    // Powder Snow Field
  surface: '#b8d0eb',   // Glacier Ice Wall
  hairline: '#6b8cae',  // Cel-shade Indigo Outlines
  ink: '#ffffff',       // Pure Sunlit Snow White
  muted: '#8da5be',     // Frost Mist Atmosphere
  accent: '#ff5c8a',    // Sakura Pink / Anime Energy Glow
  crystal: '#00e5ff',   // Cyan Plasma Beam / Ice Prism
  torii: '#ff3b30',     // Crimson Shrine Accent
};

export function shade(name) {
  return PALETTE[name] || '#ffffff';
}
