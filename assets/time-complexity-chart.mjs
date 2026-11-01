// Generates the Big-O line chart used in TimeComplexity.md.
// Run: node assets/time-complexity-chart.mjs
// Output: assets/time-complexity-light.svg, assets/time-complexity-dark.svg

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

const THEMES = {
  light: {
    surface: "#fcfcfb",
    primary: "#0b0b0b",
    secondary: "#52514e",
    muted: "#898781",
    grid: "#e1e0d9",
    axis: "#c3c2b7",
    series: ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4"],
  },
  dark: {
    surface: "#1a1a19",
    primary: "#f0efec",
    secondary: "#c3c2b7",
    muted: "#898781",
    grid: "#2c2c2a",
    axis: "#383835",
    series: ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181"],
  },
};

const SERIES = [
  { label: "O(1)", f: () => 1 },
  { label: "O(log n)", f: (n) => Math.log2(n) },
  { label: "O(n)", f: (n) => n },
  { label: "O(n log n)", f: (n) => n * Math.log2(n) },
  { label: "O(n²)", f: (n) => n * n },
];

// Same scale on both axes: 1 step up = 1 step right, so O(n) is a 45° line.
const MAX = 200;
const PLOT = 400;
const M = { top: 104, right: 150, bottom: 64, left: 64 };
const W = M.left + PLOT + M.right;
const H = M.top + PLOT + M.bottom;
const X_MAX = MAX;
const Y_MAX = MAX;
const plotW = PLOT;
const plotH = PLOT;
const x = (n) => M.left + (n / X_MAX) * plotW;
const y = (v) => M.top + plotH - (v / Y_MAX) * plotH;
const r1 = (v) => Math.round(v * 10) / 10;

function linePoints(f) {
  const pts = [];
  let prev = null;
  // Points are packed near n = 1, where log n bends the most.
  const K = 600;
  for (let k = 0; k <= K; k++) {
    const n = 1 + (X_MAX - 1) * (k / K) ** 2;
    const v = f(n);
    if (v > Y_MAX) {
      // Stop exactly where the line leaves the top of the chart.
      let lo = prev.n;
      let hi = n;
      for (let k = 0; k < 40; k++) {
        const mid = (lo + hi) / 2;
        if (f(mid) > Y_MAX) hi = mid;
        else lo = mid;
      }
      pts.push({ n: lo, v: Y_MAX });
      return { pts, clipped: true };
    }
    pts.push({ n, v });
    prev = { n, v };
  }
  return { pts, clipped: false };
}

function render(themeName) {
  const t = THEMES[themeName];
  const out = [];
  out.push(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" role="img" aria-label="Line chart: how the number of steps grows with n for O(1), O(log n), O(n), O(n log n), and O(n squared).">`,
  );
  out.push(`<rect width="${W}" height="${H}" fill="${t.surface}"/>`);

  // Title
  out.push(
    `<text x="${M.left}" y="34" font-size="18" font-weight="600" fill="${t.primary}">How the steps grow as n grows</text>`,
  );

  // Legend (one row)
  let lx = M.left;
  SERIES.forEach((s, i) => {
    out.push(
      `<line x1="${lx}" y1="62" x2="${lx + 18}" y2="62" stroke="${t.series[i]}" stroke-width="3" stroke-linecap="round"/>`,
    );
    out.push(
      `<text x="${lx + 24}" y="66.5" font-size="13" fill="${t.secondary}">${s.label}</text>`,
    );
    lx += 24 + s.label.length * 7.6 + 22;
  });

  // Grid + y ticks
  for (let v = 0; v <= Y_MAX; v += Y_MAX / 4) {
    out.push(
      `<line x1="${M.left}" y1="${y(v)}" x2="${M.left + plotW}" y2="${y(v)}" stroke="${v === 0 ? t.axis : t.grid}" stroke-width="1"/>`,
    );
    out.push(
      `<text x="${M.left - 10}" y="${y(v) + 4}" font-size="12" fill="${t.muted}" text-anchor="end" font-variant-numeric="tabular-nums">${v}</text>`,
    );
  }
  // x ticks
  for (let n = 0; n <= X_MAX; n += X_MAX / 4) {
    out.push(
      `<text x="${x(n)}" y="${M.top + plotH + 22}" font-size="12" fill="${t.muted}" text-anchor="middle" font-variant-numeric="tabular-nums">${n}</text>`,
    );
  }
  // Axis titles
  out.push(
    `<text x="${M.left + plotW / 2}" y="${H - 16}" font-size="13" fill="${t.secondary}" text-anchor="middle">n (size of the input)</text>`,
  );
  out.push(
    `<text transform="translate(18 ${M.top + plotH / 2}) rotate(-90)" font-size="13" fill="${t.secondary}" text-anchor="middle">steps</text>`,
  );

  // Lines
  const ends = [];
  SERIES.forEach((s, i) => {
    const { pts, clipped } = linePoints(s.f);
    const d = pts
      .map((p, k) => `${k === 0 ? "M" : "L"}${r1(x(p.n))} ${r1(y(p.v))}`)
      .join(" ");
    out.push(
      `<path d="${d}" fill="none" stroke="${t.series[i]}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`,
    );
    const last = pts[pts.length - 1];
    ends.push({ i, label: s.label, px: x(last.n), py: y(last.v), clipped, n: last.n });
  });

  // Direct labels. Clipped lines get a label just above the top edge.
  // The rest go in a column on the right, spread apart, with leader lines.
  const right = ends.filter((e) => !e.clipped).sort((a, b) => b.py - a.py);
  const GAP = 18;
  let floor = Infinity;
  for (const e of right) {
    e.ly = Math.min(e.py, floor - GAP);
    floor = e.ly;
  }
  const labelX = M.left + plotW + 26;
  for (const e of right) {
    out.push(
      `<path d="M${r1(e.px + 6)} ${r1(e.py)} L${labelX - 14} ${r1(e.py)} L${labelX - 4} ${r1(e.ly)}" fill="none" stroke="${t.muted}" stroke-width="1"/>`,
    );
    out.push(
      `<text x="${labelX}" y="${r1(e.ly + 4.5)}" font-size="13" font-weight="600" fill="${t.primary}">${e.label}</text>`,
    );
  }
  // They sit in one row, left to right, and never overlap.
  // A label pushed right of its exit point gets a leader line back to it.
  let nextX = M.left;
  for (const e of ends.filter((e) => e.clipped).sort((a, b) => a.px - b.px)) {
    const note = ` (n ≈ ${Math.round(e.n)})`;
    const width = e.label.length * 8 + note.length * 6.6;
    const lx = Math.max(e.px, nextX);
    const ly = e.py - 14;
    if (lx > e.px + 4) {
      out.push(
        `<path d="M${r1(e.px)} ${r1(e.py - 6)} L${r1(lx - 3)} ${r1(ly + 3)}" fill="none" stroke="${t.muted}" stroke-width="1"/>`,
      );
    }
    out.push(
      `<text x="${r1(lx)}" y="${r1(ly)}" font-size="13" font-weight="600" fill="${t.primary}">${e.label}<tspan font-weight="400" fill="${t.secondary}">${note}</tspan></text>`,
    );
    nextX = lx + width + 16;
  }
  // End dots with a surface ring
  for (const e of ends) {
    out.push(
      `<circle cx="${r1(e.px)}" cy="${r1(e.py)}" r="4.5" fill="${t.series[e.i]}" stroke="${t.surface}" stroke-width="2"/>`,
    );
  }

  out.push(`</svg>`);
  return out.join("\n") + "\n";
}

for (const name of Object.keys(THEMES)) {
  const file = join(here, `time-complexity-${name}.svg`);
  writeFileSync(file, render(name));
  console.log("wrote", file);
}
