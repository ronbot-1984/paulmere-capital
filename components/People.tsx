const LEADERS = [
  { name: "Adaeze Okonkwo-Bright", role: "Chief Executive Officer", since: "Joined 2002", note: "Previously head of the firm's rates book. Chairs the Risk Committee." },
  { name: "Henrik Vaszary", role: "Chief Investment Officer", since: "Joined 1998", note: "Built the systematic platform from a two-person desk." },
  { name: "Marisol Reyes-Kahn", role: "Head of Research", since: "Joined 2011", note: "PhD, statistical physics. Owns the signal lifecycle." },
  { name: "Tomás Lindqvist", role: "Chief Risk Officer", since: "Joined 2009", note: "Reports independently to the Board, not to investing." },
  { name: "Priya Raghunathan", role: "Head of Credit", since: "Joined 2013", note: "Restructuring counsel before joining the buy side." },
  { name: "Callum Ashworth-Bell", role: "Chief Operating Officer", since: "Joined 2016", note: "Runs the execution, technology and treasury stack." },
];

function initials(name: string) {
  const parts = name.split(" ");
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function People() {
  return (
    <section id="people" className="section people">
      <div className="shell">
        <div className="people__head">
          <p className="eyebrow" data-reveal>
            People
          </p>
          <h2 className="display people__title" data-reveal>
            Partners, not passengers.
          </h2>
          <p className="prose people__sub" data-reveal>
            Every member of the Executive Committee has a material share of their
            own net worth invested alongside clients. The average tenure below is
            seventeen years.
          </p>
        </div>

        <ul className="people__grid">
          {LEADERS.map((p, i) => (
            <li
              key={p.name}
              className="person"
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}
            >
              <span className="person__mono display" aria-hidden="true">
                {initials(p.name)}
              </span>
              <div className="person__body">
                <h3 className="person__name">{p.name}</h3>
                <p className="person__role">{p.role}</p>
                <p className="mono person__since">{p.since}</p>
                <p className="person__note">{p.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
