"use client";

import { useMemo, useRef, useState } from "react";

/* Annual net returns, % — illustrative composite vs a global 60/40 reference. */
const START_YEAR = 1994;

const COMPOSITE = [
  4.1, 18.6, 14.2, 16.8, 9.3, 21.4, 12.7, 8.9, 6.4, 19.2, 11.5, 13.1, 15.7,
  12.9, -3.8, 17.4, 12.2, 4.6, 10.8, 14.9, 9.7, 5.2, 11.3, 13.6, -1.9, 15.1,
  18.9, 14.4, 7.8, 11.9, 13.2, 8.6,
];

const BENCHMARK = [
  -1.2, 24.1, 12.4, 18.9, 15.2, 11.3, -2.1, -5.4, -9.8, 20.4, 9.1, 5.7, 13.2,
  6.4, -22.1, 18.6, 11.4, 1.2, 11.8, 15.4, 7.2, -0.6, 6.9, 14.1, -5.2, 19.4,
  12.8, 12.1, -16.9, 15.8, 11.2, 6.4,
];

/* ---- derived series -------------------------------------------------- */

function compound(returns: number[]) {
  const out = [100];
  returns.forEach((r) => out.push(out[out.length - 1] * (1 + r / 100)));
  return out;
}

function cagr(series: number[]) {
  const years = series.length - 1;
  return (Math.pow(series[series.length - 1] / series[0], 1 / years) - 1) * 100;
}

function stdev(returns: number[]) {
  const m = returns.reduce((a, b) => a + b, 0) / returns.length;
  const v = returns.reduce((a, b) => a + (b - m) ** 2, 0) / (returns.length - 1);
  return Math.sqrt(v);
}

function maxDrawdown(series: number[]) {
  let peak = series[0];
  let worst = 0;
  series.forEach((v) => {
    if (v > peak) peak = v;
    const dd = (v / peak - 1) * 100;
    if (dd < worst) worst = dd;
  });
  return worst;
}

/* ---- geometry -------------------------------------------------------- */

const W = 1000;
const H = 420;
const PAD = { t: 24, r: 16, b: 40, l: 52 };

export function Record() {
  const [hover, setHover] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const model = useMemo(() => {
    const cSeries = compound(COMPOSITE);
    const bSeries = compound(BENCHMARK);
    const all = [...cSeries, ...bSeries];
    const min = Math.min(...all);
    const max = Math.max(...all);

    const lo = Math.log10(min * 0.9);
    const hi = Math.log10(max * 1.1);

    const x = (i: number) =>
      PAD.l + (i / (cSeries.length - 1)) * (W - PAD.l - PAD.r);
    const y = (v: number) =>
      PAD.t + (1 - (Math.log10(v) - lo) / (hi - lo)) * (H - PAD.t - PAD.b);

    const path = (s: number[]) =>
      s.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(2)} ${y(v).toFixed(2)}`).join(" ");

    const area = (s: number[]) =>
      `${path(s)} L${x(s.length - 1).toFixed(2)} ${H - PAD.b} L${x(0).toFixed(2)} ${H - PAD.b} Z`;

    const ticks = [100, 300, 1000, 3000].filter((t) => t >= min * 0.9 && t <= max * 1.1);

    return {
      cSeries,
      bSeries,
      x,
      y,
      cPath: path(cSeries),
      bPath: path(bSeries),
      cArea: area(cSeries),
      ticks,
      stats: {
        cagrC: cagr(cSeries),
        cagrB: cagr(bSeries),
        volC: stdev(COMPOSITE),
        volB: stdev(BENCHMARK),
        ddC: maxDrawdown(cSeries),
        ddB: maxDrawdown(bSeries),
        posC: COMPOSITE.filter((r) => r > 0).length,
        totalC: COMPOSITE.length,
        multipleC: cSeries[cSeries.length - 1] / 100,
        multipleB: bSeries[bSeries.length - 1] / 100,
      },
    };
  }, []);

  const { stats } = model;

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const rel = ((e.clientX - rect.left) / rect.width) * W;
    const frac = (rel - PAD.l) / (W - PAD.l - PAD.r);
    const idx = Math.round(frac * (model.cSeries.length - 1));
    setHover(Math.max(0, Math.min(model.cSeries.length - 1, idx)));
  };

  const hi = hover ?? model.cSeries.length - 1;
  const hoverYear = START_YEAR + hi - 1;

  return (
    <section id="record" className="section record">
      <div className="shell">
        <div className="record__head">
          <p className="eyebrow" data-reveal>
            Track record
          </p>
          <h2 className="display record__title" data-reveal>
            Thirty-one years, measured the{" "}
            <em className="italic-serif">boring way.</em>
          </h2>
          <p className="prose record__sub" data-reveal>
            Growth of $100 invested at inception in the PS Composite, net of
            all fees, against a global 60/40 reference portfolio. Logarithmic
            scale — because the shape of compounding matters more than the
            headline.
          </p>
        </div>

        <div className="chart" data-reveal>
          <div className="chart__legend">
            <span className="lg lg--c">
              <i /> PS Composite
            </span>
            <span className="lg lg--b">
              <i /> Global 60/40 reference
            </span>
            <span className="mono chart__readout">
              {hoverYear === START_YEAR - 1 ? "Inception" : hoverYear}
              <b>${model.cSeries[hi].toFixed(0)}</b>
              <s>${model.bSeries[hi].toFixed(0)}</s>
            </span>
          </div>

          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            className="chart__svg"
            role="img"
            aria-label={`Growth of $100 from ${START_YEAR} to ${
              START_YEAR + COMPOSITE.length - 1
            }. PS Composite reaches $${model.cSeries[
              model.cSeries.length - 1
            ].toFixed(0)}; the 60/40 reference reaches $${model.bSeries[
              model.bSeries.length - 1
            ].toFixed(0)}.`}
            onPointerMove={onMove}
            onPointerLeave={() => setHover(null)}
          >
            <defs>
              <linearGradient id="cFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a8834e" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#a8834e" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* horizontal gridlines */}
            {model.ticks.map((t) => (
              <g key={t}>
                <line
                  x1={PAD.l}
                  x2={W - PAD.r}
                  y1={model.y(t)}
                  y2={model.y(t)}
                  className="chart__grid"
                />
                <text x={PAD.l - 10} y={model.y(t) + 4} className="chart__ylab mono">
                  ${t.toLocaleString()}
                </text>
              </g>
            ))}

            {/* decade markers */}
            {[0, 6, 16, 26, COMPOSITE.length].map((i) => (
              <text
                key={i}
                x={model.x(i)}
                y={H - PAD.b + 22}
                className="chart__xlab mono"
                textAnchor={i === 0 ? "start" : i === COMPOSITE.length ? "end" : "middle"}
              >
                {START_YEAR + i - 1 < START_YEAR ? START_YEAR : START_YEAR + i - 1}
              </text>
            ))}

            <path d={model.cArea} fill="url(#cFill)" className="chart__area" />
            <path d={model.bPath} className="chart__line chart__line--b" />
            <path d={model.cPath} className="chart__line chart__line--c" />

            {/* crosshair */}
            <g className={`chart__cross ${hover !== null ? "is-on" : ""}`}>
              <line
                x1={model.x(hi)}
                x2={model.x(hi)}
                y1={PAD.t}
                y2={H - PAD.b}
                className="chart__crossline"
              />
              <circle cx={model.x(hi)} cy={model.y(model.bSeries[hi])} r="3.5" className="dot dot--b" />
              <circle cx={model.x(hi)} cy={model.y(model.cSeries[hi])} r="4" className="dot dot--c" />
            </g>
          </svg>
        </div>

        <div className="record__stats" data-reveal>
          <Stat
            k="Annualised, net"
            a={`${stats.cagrC.toFixed(1)}%`}
            b={`${stats.cagrB.toFixed(1)}%`}
          />
          <Stat
            k="Growth of $100"
            a={`${stats.multipleC.toFixed(1)}×`}
            b={`${stats.multipleB.toFixed(1)}×`}
          />
          <Stat
            k="Annual volatility"
            a={`${stats.volC.toFixed(1)}%`}
            b={`${stats.volB.toFixed(1)}%`}
          />
          <Stat
            k="Peak-to-trough"
            a={`${stats.ddC.toFixed(1)}%`}
            b={`${stats.ddB.toFixed(1)}%`}
          />
          <Stat k="Positive years" a={`${stats.posC}/${stats.totalC}`} b="24/32" />
        </div>

        <p className="record__note">
          Past performance is not a reliable indicator of future results. Figures
          are illustrative and shown for design demonstration purposes only — see{" "}
          <a href="/disclosures" className="record__note-link">
            important disclosures
          </a>
          .
        </p>
      </div>
    </section>
  );
}

function Stat({ k, a, b }: { k: string; a: string; b: string }) {
  return (
    <div className="stat">
      <p className="stat__k">{k}</p>
      <p className="mono stat__a">{a}</p>
      <p className="mono stat__b">
        <i /> {b}
      </p>
    </div>
  );
}
