"use client";

import { useEffect, useState } from "react";

type Office = {
  city: string;
  short: string;
  country: string;
  tz: string;
  role?: string;
  people: string;
  since: string;
};

const OFFICES: Office[] = [
  { city: "London", short: "LDN", country: "United Kingdom", tz: "Europe/London", role: "Headquarters", people: "480", since: "1994" },
  { city: "New York", short: "NYC", country: "United States", tz: "America/New_York", people: "310", since: "1997" },
  { city: "Zurich", short: "ZRH", country: "Switzerland", tz: "Europe/Zurich", people: "74", since: "2003" },
  { city: "Singapore", short: "SIN", country: "Singapore", tz: "Asia/Singapore", people: "128", since: "2005" },
  { city: "Hong Kong", short: "HKG", country: "SAR China", tz: "Asia/Hong_Kong", people: "96", since: "2007" },
  { city: "Tokyo", short: "TYO", country: "Japan", tz: "Asia/Tokyo", people: "58", since: "2010" },
  { city: "Abu Dhabi", short: "AUH", country: "United Arab Emirates", tz: "Asia/Dubai", people: "41", since: "2016" },
  { city: "Toronto", short: "YYZ", country: "Canada", tz: "America/Toronto", people: "37", since: "2018" },
  { city: "Sydney", short: "SYD", country: "Australia", tz: "Australia/Sydney", people: "16", since: "2021" },
];

/* Desk hours, local time, mapped onto a 24h UTC axis. */
const DESK_OPEN = 7;
const DESK_CLOSE = 19;

/** UTC offset in hours for a timezone at a given instant (handles DST). */
function utcOffset(d: Date, tz: string) {
  const name = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    timeZoneName: "shortOffset",
  })
    .formatToParts(d)
    .find((p) => p.type === "timeZoneName")?.value;

  const m = name?.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
  if (!m) return 0;
  const sign = m[1] === "-" ? -1 : 1;
  return sign * (Number(m[2]) + Number(m[3] ?? 0) / 60);
}

/** Desk window in UTC hours, split into segments so a wrap past midnight renders. */
function deskSegments(d: Date, tz: string) {
  const off = utcOffset(d, tz);
  const start = ((DESK_OPEN - off) % 24 + 24) % 24;
  const end = start + (DESK_CLOSE - DESK_OPEN);
  return end <= 24
    ? [[start, end]]
    : [
        [start, 24],
        [0, end - 24],
      ];
}

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 10_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function localTime(d: Date, tz: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: tz,
  }).format(d);
}

function isOpen(d: Date, tz: string) {
  const h = Number(
    new Intl.DateTimeFormat("en-GB", { hour: "2-digit", hour12: false, timeZone: tz }).format(d)
  );
  const day = new Intl.DateTimeFormat("en-GB", { weekday: "short", timeZone: tz }).format(d);
  const weekend = day === "Sat" || day === "Sun";
  return !weekend && h >= 7 && h < 19;
}

export function Reach() {
  const now = useClock();
  const [active, setActive] = useState(0);

  return (
    <section id="reach" className="section on-bone reach">
      <div className="shell">
        <div className="reach__head">
          <p className="eyebrow" data-reveal>
            Global reach
          </p>
          <h2 className="display reach__title" data-reveal>
            Nine offices. One book.
          </h2>
          <p className="prose reach__sub" data-reveal>
            Risk is passed between London, New York and Singapore on a continuous
            handover. The firm has never held an unmanaged position overnight.
          </p>
        </div>

        <div className="reach__body" data-reveal>
          <figure className="sun">
            <figcaption className="sun__cap mono">
              Follow the sun — desk coverage, 24h UTC
            </figcaption>

            <div className="sun__frame">
              <div className="sun__axis mono" aria-hidden="true">
                {[0, 6, 12, 18, 24].map((h) => (
                  <span key={h} style={{ left: `${(h / 24) * 100}%` }}>
                    {String(h).padStart(2, "0")}
                  </span>
                ))}
              </div>

              <div className="sun__rows">
                {[0, 6, 12, 18].map((h) => (
                  <span
                    key={h}
                    className="sun__vline"
                    style={{ left: `${(h / 24) * 100}%` }}
                    aria-hidden="true"
                  />
                ))}

                {OFFICES.map((o, i) => (
                  <div
                    key={o.city}
                    className={`sun__row ${i === active ? "sun__row--on" : ""}`}
                    onMouseEnter={() => setActive(i)}
                  >
                    <span className="mono sun__label">{o.short}</span>
                    <span className="sun__track">
                      {now &&
                        deskSegments(now, o.tz).map(([s, e], j) => (
                          <span
                            key={j}
                            className="sun__bar"
                            style={{
                              left: `${(s / 24) * 100}%`,
                              width: `${((e - s) / 24) * 100}%`,
                            }}
                          />
                        ))}
                    </span>
                  </div>
                ))}

                {now && (
                  <span
                    className="sun__now"
                    style={{
                      left: `${
                        ((now.getUTCHours() + now.getUTCMinutes() / 60) / 24) * 100
                      }%`,
                    }}
                  >
                    <i />
                  </span>
                )}
              </div>
            </div>

            <p className="sun__note">
              Twenty-four hour cover, every trading day. No position is left
              unattended at a handover.
            </p>
          </figure>

          <ul className="offices">
            {OFFICES.map((o, i) => (
              <li key={o.city}>
                <button
                  className={`office ${i === active ? "office--on" : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span className="office__city">
                    {o.city}
                    {o.role && <em className="office__role">{o.role}</em>}
                  </span>
                  <span className="office__meta mono">
                    <span className="office__people">{o.people}</span>
                    <span className="office__since">Est. {o.since}</span>
                    <span className="office__time">
                      {now ? (
                        <>
                          <i className={isOpen(now, o.tz) ? "on" : ""} />
                          {localTime(now, o.tz)}
                        </>
                      ) : (
                        <>&nbsp;</>
                      )}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
