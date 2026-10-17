// Renders public/og.png (1200×630), the Open Graph / Twitter preview image.
// Run manually after changing the design: `node scripts/generate-og-image.mjs`
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const out = fileURLToPath(new URL("../public/og.png", import.meta.url));

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f8f1ec"/>
  <circle cx="1010" cy="140" r="230" fill="#a23e54" opacity="0.10"/>
  <circle cx="1090" cy="470" r="170" fill="#51624f" opacity="0.12"/>
  <circle cx="900" cy="560" r="110" fill="#d7a444" opacity="0.18"/>
  <text x="90" y="150" font-family="Work Sans, Helvetica Neue, Arial, sans-serif" font-size="26" font-weight="600" letter-spacing="5" fill="#a23e54">NOLABELS.LOVE</text>
  <text x="84" y="320" font-family="Fraunces, Georgia, serif" font-size="150" font-weight="500" fill="#241a2c">no labels<tspan fill="#a23e54">.</tspan></text>
  <text x="90" y="420" font-family="Georgia, serif" font-size="40" font-style="italic" fill="#4a3c4f">Polyamorie · Relationship Anarchy · Non-Monogamie</text>
  <text x="90" y="530" font-family="Work Sans, Helvetica Neue, Arial, sans-serif" font-size="28" fill="#7d6f78">Tools · Ressourcen · Bücher · Glossar · Events</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log(`wrote ${out}`);
