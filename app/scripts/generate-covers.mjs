// Generates minimalist, brand-consistent SVG book covers (600x900, 2:3).
// Run: node scripts/generate-covers.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const outDir = join(root, "..", "public", "covers");
mkdirSync(outDir, { recursive: true });

const NAVY = "#2c2e3e";
const DEEP = "#302b70";
const CREAM = "#fdf6ec";
const WARM = "#f9f5f0";
const PARCHMENT = "#efe5d3";

const covers = [
  {
    file: "do-rascunho-a-publicacao",
    bg: NAVY,
    fg: CREAM,
    accent: CREAM,
    kicker: "GUIA DO AUTOR",
    titleLines: ["Do Rascunho", "à Publicação"],
    author: "KARINE Z. LAZZARETTI",
    grid: false,
  },
  {
    file: "metodologia-da-pesquisa",
    bg: CREAM,
    fg: NAVY,
    accent: DEEP,
    kicker: "COLEÇÃO ACADÊMICA",
    titleLines: ["Metodologia", "da Pesquisa", "Científica"],
    author: "RODRIGO S. LAZZARETTI",
    grid: true,
  },
  {
    file: "fe-e-palavra",
    bg: DEEP,
    fg: CREAM,
    accent: CREAM,
    kicker: "REFLEXÕES",
    titleLines: ["Fé", "e Palavra"],
    author: "VÁRIOS AUTORES",
    grid: false,
  },
  {
    file: "escrita-academica-sem-medo",
    bg: WARM,
    fg: DEEP,
    accent: DEEP,
    kicker: "E-BOOK · ESCRITA",
    titleLines: ["Escrita", "Acadêmica", "sem Medo"],
    author: "KARINE Z. LAZZARETTI",
    grid: true,
  },
  {
    file: "memorias-do-vale",
    bg: PARCHMENT,
    fg: NAVY,
    accent: NAVY,
    kicker: "ROMANCE",
    titleLines: ["Memórias", "do Vale"],
    author: "HELENA DUARTE",
    grid: false,
  },
  {
    file: "gestao-escolar-na-pratica",
    bg: NAVY,
    fg: CREAM,
    accent: CREAM,
    kicker: "PUBLICAÇÃO INSTITUCIONAL",
    titleLines: ["Gestão Escolar", "na Prática"],
    author: "INSTITUTO EDUCAR",
    grid: true,
  },
];

const esc = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function gridPattern(color) {
  return `
  <defs>
    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="${color}" stroke-opacity="0.08" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="600" height="900" fill="url(#grid)"/>`;
}

function svg({ bg, fg, accent, kicker, titleLines, author, grid }) {
  const titleSize = titleLines.some((line) => line.length > 12) ? 58 : 68;
  const lineHeight = titleSize * 1.18;
  const titleBlockH = titleLines.length * lineHeight;
  const titleStartY = 420 - titleBlockH / 2 + titleSize;

  const title = titleLines
    .map(
      (line, index) =>
        `<tspan x="300" ${index === 0 ? `y="${titleStartY}"` : `dy="${lineHeight}"`}>${esc(line)}</tspan>`,
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900">
  <rect width="600" height="900" fill="${bg}"/>${grid ? gridPattern(fg) : ""}
  <rect x="30" y="30" width="540" height="840" fill="none" stroke="${accent}" stroke-opacity="0.55" stroke-width="2"/>
  <rect x="42" y="42" width="516" height="816" fill="none" stroke="${accent}" stroke-opacity="0.25" stroke-width="1"/>
  <text x="300" y="140" text-anchor="middle" fill="${fg}" fill-opacity="0.75"
        font-family="Georgia, 'Times New Roman', serif" font-size="19" letter-spacing="6">${esc(kicker)}</text>
  <line x1="240" y1="175" x2="360" y2="175" stroke="${accent}" stroke-opacity="0.6" stroke-width="1.5"/>
  <text text-anchor="middle" fill="${fg}"
        font-family="Georgia, 'Times New Roman', serif" font-size="${titleSize}" font-weight="bold">${title}</text>
  <line x1="240" y1="660" x2="360" y2="660" stroke="${accent}" stroke-opacity="0.6" stroke-width="1.5"/>
  <text x="300" y="712" text-anchor="middle" fill="${fg}" fill-opacity="0.9"
        font-family="Georgia, 'Times New Roman', serif" font-size="22" letter-spacing="3">${esc(author)}</text>
  <g transform="translate(300 800)" fill="none" stroke="${fg}" stroke-opacity="0.85" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M -26 6 C -18 -2 -8 -4 0 0 C 8 -4 18 -2 26 6"/>
    <path d="M -26 6 L -26 10 C -16 4 -6 3 0 6 C 6 3 16 4 26 10 L 26 6"/>
    <path d="M 4 2 L 20 -18 L 23 -15 L 8 4 Z"/>
  </g>
  <text x="300" y="846" text-anchor="middle" fill="${fg}" fill-opacity="0.7"
        font-family="Georgia, 'Times New Roman', serif" font-size="15" letter-spacing="4">KR EDITORIAL</text>
</svg>
`;
}

for (const cover of covers) {
  writeFileSync(join(outDir, `${cover.file}.svg`), svg(cover));
  console.log(`covers/${cover.file}.svg`);
}
