import { Arrow } from "./Arrow";

const PIECES = [
  {
    cat: "Macro",
    date: "July 2026",
    title: "The term premium is back, and nobody has repriced for it",
    read: "12 min",
    feature: true,
    dek: "For fifteen years, duration was free. It is not free any more — and the institutional portfolio has not been rebuilt for a world where the long end sets the price of everything else.",
  },
  { cat: "Systematic", date: "June 2026", title: "What a signal owes you before it gets capital", read: "8 min" },
  { cat: "Credit", date: "May 2026", title: "Underwriting to documents in a covenant-light market", read: "10 min" },
  { cat: "Risk", date: "April 2026", title: "Correlation is not a number. It is a regime.", read: "7 min" },
];

export function Insights() {
  const [feature, ...rest] = PIECES;

  return (
    <section id="insights" className="section on-bone insights">
      <div className="shell">
        <div className="insights__head">
          <p className="eyebrow" data-reveal>
            Insights
          </p>
          <h2 className="display insights__title" data-reveal>
            What we are working on.
          </h2>
        </div>

        <div className="insights__body">
          <article className="feature" data-reveal>
            <div className="feature__meta mono">
              <span className="tag">{feature.cat}</span>
              <span>{feature.date}</span>
              <span>{feature.read}</span>
            </div>
            <h3 className="display feature__title">{feature.title}</h3>
            <p className="prose feature__dek">{feature.dek}</p>
            <span className="link feature__link">
              Read the paper
              <Arrow className="arrow" />
            </span>
            <div className="feature__art" aria-hidden="true">
              <svg viewBox="0 0 400 240" preserveAspectRatio="none">
                {Array.from({ length: 26 }).map((_, i) => (
                  <line
                    key={i}
                    x1={i * 16}
                    y1={240}
                    x2={i * 16}
                    y2={240 - (Math.sin(i / 2.4) * 55 + i * 5.4 + 30)}
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity={0.15 + i * 0.028}
                  />
                ))}
              </svg>
            </div>
          </article>

          <ul className="pieces">
            {rest.map((p, i) => (
              <li key={p.title} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}>
                <article className="piece">
                  <div className="piece__meta mono">
                    <span className="tag">{p.cat}</span>
                    <span>{p.date}</span>
                  </div>
                  <h3 className="piece__title">{p.title}</h3>
                  <span className="mono piece__read">{p.read}</span>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
