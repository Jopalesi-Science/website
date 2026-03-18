/**
 * generate-poster.mjs
 *
 * Generates public/meetings/template/poster.svg
 * Instagram portrait (1080×1350) in the Jopalesi website aesthetic.
 *
 * Usage:  node scripts/generate-poster.mjs
 *         npm run poster
 *
 * To customise event details, edit the POSTER_CONTENT block below.
 */

import fs   from "fs";
import path from "path";
import { fileURLToPath } from "url";
import QRCode from "qrcode";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.join(__dirname, "..");

// ── Editable event content ────────────────────────────────────────────────────
const POSTER_CONTENT = {
  qrUrl:      "https://jopalesi.science",
  eventTitle: "Citizen Research Meetup",
  // Use "" for a blank line between paragraphs
  eventDesc:  [
    "Script. Scrape. Vibe. Type!",
    "",
    "Crunching Data and Munching Cookies!",
    "Do your own research?! Lets do it together!",
  ],
  eventWhen:  "TUESDAY · 10 MARCH 2026 · 18:00 – 20:00",
  eventWhere: "RAA.SPACE · MATĪSA IELA 8 · RĪGA",
};

// ── Design constants ──────────────────────────────────────────────────────────
const W         = 1080;
const H         = 1350;
const BG        = "#0a0a0c";
const STICK     = "#bdb2a3";
const TIME      = 137.3;       // shader DEFAULT_SNAPSHOT

// Layout
const PANEL_Y        = 1050;   // bottom logo strip starts here
const BORDER_W       = 5;      // info-box border thickness (px)
const TITLE_FONT     = 54;     // Box 1 title — large
const FONT_SIZE      = 30;     // Box 2 / 3 body font size
const TITLE_PAD_X    = 30;     // title box horizontal padding
const TITLE_PAD_Y    = 28;     // title box vertical padding
const BOX_PAD_X      = 26;     // body box horizontal padding
const BOX_PAD_Y      = 22;     // body box vertical padding
const LINE_H         = Math.round(FONT_SIZE * 1.55); // 46px

// ── Shader math ───────────────────────────────────────────────────────────────
function fract(x) { return x - Math.floor(x); }

function computeSticks() {
  const numSticks = 40;
  const stickFill = 0.45;
  const maxH      = 0.62;
  const t         = TIME * 0.38;    // 52.174

  const colW = W / numSticks;
  const offX = colW * (1 - stickFill) / 2;
  const sW   = colW * stickFill;

  const rects = [];
  for (let col = 0; col < numSticks; col++) {
    const h1 = fract(Math.sin(col * 127.1 + 311.7) * 43758.5453) * 6.28318;
    const h2 = fract(Math.sin(col * 269.5  + 183.3) * 43758.5453) * 6.28318;

    // cursor at centre → pure mode-0 (random-phase sticks)
    const topH = (Math.sin(t        + h1) * 0.5 + 0.5) * maxH;
    const botH = (Math.sin(t * 0.77 + h2) * 0.5 + 0.5) * maxH;

    const x = col * colW + offX;
    rects.push({ x, y: 0,              w: sW, h: topH * H });   // top → down
    rects.push({ x, y: (1 - botH) * H, w: sW, h: botH * H });   // bottom → up
  }
  return rects;
}

// ── QR code ───────────────────────────────────────────────────────────────────
async function makeQRGroup(url, x, y, size) {
  const svgStr  = await QRCode.toString(url, {
    type:   "svg",
    width:  size,
    margin: 1,
    color:  { dark: STICK, light: BG },
  });

  const vbMatch = svgStr.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
  const vbW     = vbMatch ? parseFloat(vbMatch[1]) : size;
  const scale   = size / vbW;

  const inner = svgStr
    .replace(/<\?xml[^>]*\?>/g, "")
    .replace(/<!DOCTYPE[^>]*>/g, "")
    .replace(/<svg[^>]*>/, "")
    .replace(/<\/svg>/, "")
    .trim();

  return `<g transform="translate(${x},${y}) scale(${scale.toFixed(6)})">\n${inner}\n</g>`;
}

// ── Jopalesi Science wide logo (from public/jopalesi-science-logo-wide.svg) ───
function jopalesiWideLogo(x, y, targetH) {
  const SRC_W = 300, SRC_H = 80;
  const scale  = targetH / SRC_H;
  const targetW = Math.round(SRC_W * scale);

  const raw = fs.readFileSync(
    path.join(ROOT, "public/jopalesi-science-logo-wide.svg"), "utf8"
  );
  const inner = raw
    .replace(/<\?xml[^>]*\?>/g, "")
    .replace(/<svg[^>]*>/,      "")
    .replace(/<\/svg>/,         "")
    .trim();

  return {
    svg: `<g transform="translate(${x},${y}) scale(${scale.toFixed(6)})">\n${inner}\n</g>`,
    w:   targetW,
  };
}

// ── Veldze logo (SVG, fill recolored to STICK) ───────────────────────────────
function veldzeLogo(x, y, targetH) {
  const SRC_W = 906, SRC_H = 291;
  const scale  = targetH / SRC_H;
  const targetW = Math.round(SRC_W * scale);

  const raw = fs.readFileSync(path.join(ROOT, "public/VeldzeLogo.svg"), "utf8");
  const inner = raw
    .replace(/#2C2E35/gi, STICK)
    .replace(/<svg[^>]*>/,  "")
    .replace(/<\/svg>/,     "")
    .trim();

  return {
    svg: `<g transform="translate(${x},${y}) scale(${scale.toFixed(6)})">\n${inner}\n</g>`,
    w:   targetW,
  };
}

// ── RAA logo (public/raa_logo.svg, colors inverted) ──────────────────────────
// Embedded as a base64 SVG data-URI <image> to keep CSS scoped.
function raaLogoImage(x, y, targetH) {
  const SRC_W = 560, SRC_H = 960;
  const targetW = Math.round(SRC_W * targetH / SRC_H);

  let raw = fs.readFileSync(path.join(ROOT, "public/raa_logo.svg"), "utf8");

  // Invert colours: black strokes → STICK; text and filled shapes → STICK
  raw = raw
    .replaceAll("stroke: #000;",  `stroke: ${STICK};`)
    .replace(".cls-1 {",           `.cls-1 { fill: ${STICK};`)
    .replace("<g>",                `<g fill="${STICK}">`);   // outer <g> first occurrence

  const b64 = Buffer.from(raw, "utf8").toString("base64");
  return {
    svg: `<image href="data:image/svg+xml;base64,${b64}" ` +
         `x="${x}" y="${y}" width="${targetW}" height="${targetH}"/>`,
    w: targetW,
  };
}

// ── SVG helpers ───────────────────────────────────────────────────────────────
const FONT_ATTRS =
  `font-family="'Courier New', monospace" font-size="${FONT_SIZE}" font-weight="700"`;

// infoBox: blank lines ("") in contentLines produce a paragraph gap (2× LINE_H).
function infoBox(x, y, w, h, label, contentLines) {
  const textY  = y + BOX_PAD_Y + FONT_SIZE;
  const tspans = [];
  let pendingDy = 0;   // extra dy accumulated from blank lines
  let first = true;

  for (const ln of contentLines) {
    if (ln === "") {
      pendingDy += LINE_H;   // blank line → extra gap
      continue;
    }
    const dy = first ? 0 : LINE_H + pendingDy;
    tspans.push(`<tspan x="${x + BOX_PAD_X}" dy="${dy}">${ln}</tspan>`);
    pendingDy = 0;
    first = false;
  }

  return `
  <!-- ${label} -->
  <rect x="${x}" y="${y}" width="${w}" height="${h}"
        fill="${BG}" stroke="${STICK}" stroke-width="${BORDER_W}"/>
  <text x="${x + BOX_PAD_X}" y="${textY}"
        fill="${STICK}" ${FONT_ATTRS} letter-spacing="2">${tspans.join("")}</text>`;
}

// boxHeight: total pixel height for an info box including paragraph breaks.
function boxHeight(padY, fontSize, lines, lineH) {
  let advance = 0;
  for (let i = 1; i < lines.length; i++) {
    advance += lineH;               // normal line advance
    if (lines[i - 1] === "") advance += lineH;  // extra for blank-line gap
  }
  return padY * 2 + fontSize + advance;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const { qrUrl, eventTitle, eventDesc, eventWhen, eventWhere } = POSTER_CONTENT;

  // ── Sticks ─────────────────────────────────────────────────────────────────
  const sticks = computeSticks();
  const stickRects = sticks
    .map(r =>
      `    <rect x="${r.x.toFixed(2)}" y="${r.y.toFixed(2)}" ` +
      `width="${r.w.toFixed(2)}" height="${r.h.toFixed(2)}"/>`
    )
    .join("\n");

  // ── Info boxes (floating in stick area, like website draggable buttons) ──

  //   Box 1 — TITLE: large font, top-left
  const BOX1_X = 44, BOX1_Y = 44, BOX1_W = 992;
  const BOX1_H = TITLE_PAD_Y * 2 + TITLE_FONT;    // 56 + 54 = 110px

  const box1 = `
  <!-- Event title -->
  <rect x="${BOX1_X}" y="${BOX1_Y}" width="${BOX1_W}" height="${BOX1_H}"
        fill="${BG}" stroke="${STICK}" stroke-width="${BORDER_W}"/>
  <text x="${BOX1_X + TITLE_PAD_X}" y="${BOX1_Y + TITLE_PAD_Y + TITLE_FONT}"
        fill="${STICK}"
        font-family="'Courier New', monospace"
        font-size="${TITLE_FONT}"
        font-weight="700"
        letter-spacing="4">${eventTitle}</text>`;

  //   Box 2 — description: middle, slightly right (blank lines → paragraph gaps)
  const BOX2_W = 960;
  const BOX2_H = boxHeight(BOX_PAD_Y, FONT_SIZE, eventDesc, LINE_H);
  const BOX2_X = 88;
  const BOX2_Y = Math.round((PANEL_Y - BOX2_H) / 2);   // vertically centred

  const box2 = infoBox(BOX2_X, BOX2_Y, BOX2_W, BOX2_H, "Event description", eventDesc);

  //   Box 3 — when/where: more left, towards bottom
  const BOX3_H = BOX_PAD_Y * 2 + FONT_SIZE + LINE_H;
  const BOX3_X = 44, BOX3_W = 880;
  const BOX3_Y = PANEL_Y - BOX3_H - 110;   // 110px gap above logo strip

  const box3 = infoBox(BOX3_X, BOX3_Y, BOX3_W, BOX3_H, "When / Where",
    [eventWhen, eventWhere]
  );

  // ── Bottom logo strip ─────────────────────────────────────────────────────
  const STRIP_CENTER_Y = PANEL_Y + Math.round((H - PANEL_Y) / 2);   // 1200px

  // Logo target heights
  const QR_SIZE        = 130;
  const JOPW_H         = 95;   // Jopalesi wide
  const VELDZE_H       = 72;
  const RAA_H          = 160;

  // Pre-compute logo widths
  const JOPW_W   = Math.round(300 * JOPW_H   / 80);    // 356
  const VELDZE_W = Math.round(906 * VELDZE_H  / 291);  // 224
  const RAA_W    = Math.round(560 * RAA_H     / 960);  // 93

  const PAD      = 44;
  const INNER_W  = W - PAD * 2;

  const totalW   = QR_SIZE + JOPW_W + VELDZE_W + RAA_W;
  const gap      = Math.round((INNER_W - totalW) / 3);

  const QR_X     = PAD;
  const JOPW_X   = QR_X    + QR_SIZE   + gap;
  const VELDZE_X = JOPW_X  + JOPW_W    + gap;
  const RAA_X    = VELDZE_X + VELDZE_W  + gap;

  // Vertical: centre each logo on STRIP_CENTER_Y
  const QR_Y     = STRIP_CENTER_Y - Math.round(QR_SIZE  / 2);
  const JOPW_Y   = STRIP_CENTER_Y - Math.round(JOPW_H   / 2);
  const VELDZE_Y = STRIP_CENTER_Y - Math.round(VELDZE_H / 2);
  const RAA_Y    = STRIP_CENTER_Y - Math.round(RAA_H    / 2);

  const qrGroup     = await makeQRGroup(qrUrl, QR_X, QR_Y, QR_SIZE);
  const { svg: jopwSvg }   = jopalesiWideLogo(JOPW_X,   JOPW_Y,   JOPW_H);
  const { svg: veldzeSvg } = veldzeLogo(      VELDZE_X, VELDZE_Y, VELDZE_H);
  const { svg: raaSvg }    = raaLogoImage(    RAA_X,    RAA_Y,    RAA_H);

  // ── Assemble SVG ───────────────────────────────────────────────────────────
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"
     xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">

  <!-- ── Background ──────────────────────────────────────────────────────── -->
  <rect width="${W}" height="${H}" fill="${BG}"/>

  <!-- ── Sticks (DEFAULT_SNAPSHOT t=${TIME}, cursor=centre) ──────────────── -->
  <g fill="${STICK}">
${stickRects}
  </g>

  <!-- ── Info boxes (floating over sticks, website-button aesthetic) ──────── -->
  ${box1}
  ${box2}
  ${box3}

  <!-- ── Bottom logo strip ─────────────────────────────────────────────────── -->
  <rect x="0" y="${PANEL_Y}" width="${W}" height="${H - PANEL_Y}" fill="${BG}"/>
  <rect x="0" y="${PANEL_Y}" width="${W}" height="3"              fill="${STICK}"/>

  <!-- QR (${qrUrl}) -->
  ${qrGroup}

  <!-- Jopalesi Science logo (wide) -->
  ${jopwSvg}

  <!-- Veldze logo -->
  ${veldzeSvg}

  <!-- RAA logo -->
  ${raaSvg}

</svg>
`;

  const outDir  = path.join(ROOT, "public/meetings/template");
  const outFile = path.join(outDir, "poster.svg");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, svg, "utf8");

  const kb = Math.round(fs.statSync(outFile).size / 1024);
  console.log(`✓  poster.svg  →  public/meetings/template/poster.svg  (${kb} KB)`);
  console.log(`   Info boxes:  BOX1 y=${BOX1_Y}  BOX2 y=${BOX2_Y}  BOX3 y=${BOX3_Y}`);
  console.log(`   Logo strip:  QR x=${QR_X}  Jopalesi x=${JOPW_X}  Veldze x=${VELDZE_X}  RAA x=${RAA_X}`);
}

main().catch(err => { console.error(err); process.exit(1); });
