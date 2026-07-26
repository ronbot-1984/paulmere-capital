"use client";

import { useEffect, useState } from "react";

type Office = {
  city: string;
  country: string;
  tz: string;
  role?: string;
  people: string;
  since: string;
  /* position on the equirectangular map, % */
  x: number;
  y: number;
};

const OFFICES: Office[] = [
  { city: "London", country: "United Kingdom", tz: "Europe/London", role: "Headquarters", people: "480", since: "1994", x: 48.6, y: 27.5 },
  { city: "New York", country: "United States", tz: "America/New_York", people: "310", since: "1997", x: 27.5, y: 34.5 },
  { city: "Zurich", country: "Switzerland", tz: "Europe/Zurich", people: "74", since: "2003", x: 51.5, y: 30.5 },
  { city: "Singapore", country: "Singapore", tz: "Asia/Singapore", people: "128", since: "2005", x: 75.5, y: 55.5 },
  { city: "Hong Kong", country: "SAR China", tz: "Asia/Hong_Kong", people: "96", since: "2007", x: 79.5, y: 44 },
  { city: "Tokyo", country: "Japan", tz: "Asia/Tokyo", people: "58", since: "2010", x: 86, y: 36.5 },
  { city: "Abu Dhabi", country: "United Arab Emirates", tz: "Asia/Dubai", people: "41", since: "2016", x: 63.5, y: 44 },
  { city: "Toronto", country: "Canada", tz: "America/Toronto", people: "37", since: "2018", x: 26.5, y: 31 },
  { city: "Sydney", country: "Australia", tz: "Australia/Sydney", people: "16", since: "2021", x: 89, y: 74 },
];

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
          <div className="map" aria-hidden="true">
            <div className="map__frame">
              {OFFICES.map((o, i) => (
                <button
                  key={o.city}
                  className={`pin ${i === active ? "pin--on" : ""}`}
                  style={{ left: `${o.x}%`, top: `${o.y}%` }}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  tabIndex={-1}
                >
                  <span className="pin__dot" />
                  <span className="pin__label mono">{o.city}</span>
                </button>
              ))}
              <span className="map__lat" style={{ top: "34.5%" }} />
              <span className="map__lat" style={{ top: "55.5%" }} />
            </div>
          </div>

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
