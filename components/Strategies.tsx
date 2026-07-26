"use client";

import { useState } from "react";

type Strategy = {
  id: string;
  n: string;
  name: string;
  blurb: string;
  aum: string;
  share: number; // % of firm AUM
  inception: string;
  vol: string;
  tags: string[];
};

const STRATEGIES: Strategy[] = [
  {
    id: "macro",
    n: "01",
    name: "Global Macro",
    blurb:
      "Discretionary rates, currency and sovereign credit positioning, expressed through liquid instruments across thirty-one markets. The book is built to be long volatility when policy regimes break.",
    aum: "$41.2B",
    share: 22,
    inception: "1994",
    vol: "10–12% target",
    tags: ["Rates", "FX", "Sovereign credit", "Commodities"],
  },
  {
    id: "systematic",
    n: "02",
    name: "Systematic & Quantitative",
    blurb:
      "Medium-frequency statistical strategies trading 9,400 instruments. Signals are researched, retired and replaced on a fixed cadence — the median signal in production today is nineteen months old.",
    aum: "$52.8B",
    share: 29,
    inception: "2001",
    vol: "8–10% target",
    tags: ["Equity market neutral", "Trend", "Carry", "Microstructure"],
  },
  {
    id: "relative-value",
    n: "03",
    name: "Multi-Strategy Relative Value",
    blurb:
      "Sixty-one autonomous portfolio teams operating under a common risk framework and a shared execution stack. Capital is reallocated monthly on realised risk-adjusted contribution, not on tenure.",
    aum: "$46.5B",
    share: 25,
    inception: "2006",
    vol: "6–8% target",
    tags: ["Fundamental equity", "Volatility", "Convertibles", "Basis"],
  },
  {
    id: "credit",
    n: "04",
    name: "Credit & Special Situations",
    blurb:
      "Stressed, distressed and process-driven credit in developed markets. We underwrite to documents, not to ratings — and we are prepared to hold illiquid positions through a full restructuring.",
    aum: "$27.4B",
    share: 15,
    inception: "2009",
    vol: "Opportunistic",
    tags: ["Distressed", "Capital solutions", "Structured", "Litigation"],
  },
  {
    id: "private",
    n: "05",
    name: "Private Capital",
    blurb:
      "Long-duration control and structured minority investments in infrastructure, energy transition and financial services. Average hold period is seven years; average diligence period is eleven months.",
    aum: "$16.1B",
    share: 9,
    inception: "2014",
    vol: "Locked capital",
    tags: ["Infrastructure", "Energy transition", "Financials", "Real assets"],
  },
];

export function Strategies() {
  const [active, setActive] = useState(0);
  const s = STRATEGIES[active];

  return (
    <section id="strategies" className="section strategies">
      <div className="shell">
        <div className="strategies__head">
          <p className="eyebrow" data-reveal>
            Strategies
          </p>
          <h2 className="display strategies__title" data-reveal>
            Five mandates. One risk language.
          </h2>
        </div>

        <div className="strategies__body">
          <ul className="strategies__list" role="tablist" aria-label="Investment strategies">
            {STRATEGIES.map((item, i) => (
              <li key={item.id} data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
                <button
                  role="tab"
                  id={`tab-${item.id}`}
                  aria-selected={i === active}
                  aria-controls="strategy-panel"
                  className={`strat ${i === active ? "strat--on" : ""}`}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className="mono strat__n">{item.n}</span>
                  <span className="strat__name">{item.name}</span>
                  <span className="mono strat__aum">{item.aum}</span>
                  <span className="strat__bar" aria-hidden="true">
                    <span style={{ width: `${item.share}%` }} />
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div
            className="panel"
            id="strategy-panel"
            role="tabpanel"
            aria-labelledby={`tab-${s.id}`}
            data-reveal
          >
            <div key={s.id} className="panel__fade">
              <p className="mono panel__kicker">
                {s.n} — {s.name}
              </p>
              <p className="lead panel__blurb">{s.blurb}</p>

              <dl className="panel__meta">
                <div>
                  <dt>Strategy assets</dt>
                  <dd className="mono">{s.aum}</dd>
                </div>
                <div>
                  <dt>Inception</dt>
                  <dd className="mono">{s.inception}</dd>
                </div>
                <div>
                  <dt>Risk profile</dt>
                  <dd className="mono">{s.vol}</dd>
                </div>
                <div>
                  <dt>Share of firm AUM</dt>
                  <dd className="mono">{s.share}%</dd>
                </div>
              </dl>

              <ul className="panel__tags">
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
