const PRINCIPLES = [
  {
    n: "01",
    t: "Research is the product",
    b: "Two hundred and ten researchers, forty of them PhDs, working on a single shared data platform. Every position traces back to a written thesis, a falsifiable test and a named author.",
  },
  {
    n: "02",
    t: "Risk is a budget, not a byproduct",
    b: "Capital is allocated in units of risk, not dollars. Each strategy runs to an explicit volatility target and a hard drawdown mandate, monitored independently of the investment teams.",
  },
  {
    n: "03",
    t: "Independence compounds",
    b: "The firm is wholly owned by its partners. No external shareholders, no product cycle, no pressure to gather assets we cannot deploy well. We have closed strategies to new capital eleven times.",
  },
];

export function Firm() {
  return (
    <section id="firm" className="section on-bone firm">
      <div className="shell">
        <div className="grid firm__head">
          <div className="firm__head-l">
            <p className="eyebrow" data-reveal>
              The firm
            </p>
          </div>
          <div className="firm__head-r">
            <h2 className="display firm__statement" data-reveal>
              We were built for the part of the cycle{" "}
              <em className="italic-serif">nobody puts in the brochure.</em>
            </h2>
            <div className="prose firm__prose" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
              <p>
                PS Capital was founded in 1994 by four traders who had just watched a
                bond market unravel in a fortnight. The lesson was not that risk
                should be avoided — it was that most institutions never really knew
                what they owned.
              </p>
              <p>
                Three decades later, the firm is still organised around that
                question. We build our own data, write our own systems, and hold
                every strategy to a mandate it cannot quietly drift away from.
              </p>
            </div>
          </div>
        </div>

        <ol className="firm__principles">
          {PRINCIPLES.map((p, i) => (
            <li
              key={p.n}
              className="principle"
              data-reveal
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            >
              <span className="mono principle__n">{p.n}</span>
              <h3 className="principle__t">{p.t}</h3>
              <p className="principle__b">{p.b}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
