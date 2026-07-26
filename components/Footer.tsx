import Link from "next/link";
import { Mark } from "./Mark";

const COLUMNS = [
  {
    h: "Firm",
    links: [
      { l: "About", h: "/#firm" },
      { l: "People", h: "/#people" },
      { l: "Global reach", h: "/#reach" },
      { l: "Careers", h: "/#contact" },
    ],
  },
  {
    h: "Investing",
    links: [
      { l: "Strategies", h: "/#strategies" },
      { l: "Track record", h: "/#record" },
      { l: "Insights", h: "/#insights" },
      { l: "Responsible investment", h: "/disclosures" },
    ],
  },
  {
    h: "Legal",
    links: [
      { l: "Disclosures", h: "/disclosures" },
      { l: "Privacy", h: "/disclosures#privacy" },
      { l: "Terms of use", h: "/disclosures#terms" },
      { l: "Modern slavery statement", h: "/disclosures" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__top">
          <div className="footer__brand">
            <Mark size={40} />
            <p className="display footer__line">
              Compounding conviction <em className="italic-serif">across cycles.</em>
            </p>
          </div>

          <div className="footer__cols">
            {COLUMNS.map((c) => (
              <nav key={c.h} aria-label={c.h}>
                <h2 className="mono footer__h">{c.h}</h2>
                <ul>
                  {c.links.map((l) => (
                    <li key={l.l}>
                      <Link href={l.h} className="footer__link">
                        {l.l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="footer__disclaimer">
          <p>
            <strong>This is a fictional website.</strong> Paulmere Capital is not a
            real investment firm. It was created as a design demonstration — the
            firm, its people, its offices and all performance figures shown are
            invented. Nothing here is an offer to sell, a solicitation to buy, or
            investment advice of any kind.
          </p>
        </div>

        <div className="footer__bottom">
          <p className="mono">© {new Date().getFullYear()} Paulmere Capital — design demonstration</p>
          <ul className="footer__meta mono">
            <li>Authorised and regulated for illustrative purposes only</li>
            <li>
              <Link href="/disclosures">Important information</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
