import type { Metadata } from "next";
import { RevealEngine } from "@/components/RevealEngine";

export const metadata: Metadata = {
  title: "Important information",
  description:
    "Disclosures, terms of use and privacy information for the PS Capital design demonstration site.",
};

const SECTIONS = [
  {
    id: "nature",
    h: "Nature of this website",
    body: [
      "PS Capital is not a real investment firm. This website is a fictional design demonstration built to illustrate the visual and editorial language of an institutional asset manager.",
      "The firm's history, assets under management, offices, employees, named individuals, strategies, commentary and all performance figures presented on this site are invented. Any resemblance to an actual firm or person is coincidental and unintended.",
    ],
  },
  {
    id: "not-advice",
    h: "Not an offer and not advice",
    body: [
      "Nothing on this website constitutes an offer to sell, or a solicitation of an offer to buy, any security or investment product in any jurisdiction. Nothing here is investment, legal, tax or accounting advice, and no part of it should be relied upon in making a financial decision.",
      "No regulated activity is carried on through this website. No entity described here is authorised or regulated by the Financial Conduct Authority, the Securities and Exchange Commission, or any other regulator.",
    ],
  },
  {
    id: "performance",
    h: "Performance figures",
    body: [
      "The chart and statistics shown under “Track record” are generated from a fixed, invented series of annual returns held in the site's source code. They are not derived from any real portfolio, index or account, and they have not been audited, verified or calculated in accordance with any performance presentation standard.",
      "Where the site displays derived measures — annualised return, volatility, peak-to-trough decline, growth multiples — these are computed at page render time from that invented series, so they are internally consistent with the chart. They remain fictional.",
      "Past performance is not a reliable indicator of future results. The value of investments can fall as well as rise, and investors may not get back the amount originally invested.",
    ],
  },
  {
    id: "terms",
    h: "Terms of use",
    body: [
      "This site is provided on an “as is” basis for demonstration purposes. No warranty is given as to the accuracy or completeness of any content, and no liability is accepted for any loss arising from its use.",
      "The design, code and written content of this site are the work of its author. The PS Capital name and mark are fictional and used here solely as a demonstration brand.",
    ],
  },
  {
    id: "privacy",
    h: "Privacy",
    body: [
      "This website does not use cookies, does not run analytics, and does not collect, store or process any personal data. No forms on this site transmit information anywhere — the contact addresses shown use the reserved “.example” domain and are non-functional by design.",
      "The site is served as static content from Vercel's edge network. Vercel may log standard request metadata such as IP address and user agent as part of operating its infrastructure; that processing is governed by Vercel's own privacy policy.",
    ],
  },
];

export default function Disclosures() {
  return (
    <>
      <RevealEngine />
      <article className="legal">
        <div className="shell">
          <header className="legal__head">
            <p className="eyebrow" data-reveal>
              Important information
            </p>
            <h1 className="display legal__title" data-reveal>
              Disclosures
            </h1>
            <p className="lead legal__lead" data-reveal>
              Please read this page before drawing any conclusion from anything
              else on this website.
            </p>
          </header>

          <nav className="legal__toc" aria-label="On this page" data-reveal>
            <h2 className="mono legal__toc-h">On this page</h2>
            <ol>
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>
                    <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                    {s.h}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="legal__body">
            {SECTIONS.map((s, i) => (
              <section key={s.id} id={s.id} className="legal__section" data-reveal>
                <h2 className="legal__h">
                  <span className="mono legal__n">{String(i + 1).padStart(2, "0")}</span>
                  {s.h}
                </h2>
                <div className="prose legal__prose">
                  {s.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
