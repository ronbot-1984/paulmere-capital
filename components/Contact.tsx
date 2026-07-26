import { Arrow } from "./Arrow";

export function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="shell">
        <div className="contact__inner">
          <p className="eyebrow" data-reveal>
            Investor access
          </p>

          <h2 className="display contact__title" data-reveal>
            We take on a small number of new relationships each year.
          </h2>

          <p className="prose contact__sub" data-reveal>
            PS Capital accepts capital from qualifying institutional and
            professional investors only. Several strategies are closed. If you
            would like to be considered, our investor relations team will respond
            within five business days.
          </p>

          <div className="contact__actions" data-reveal>
            <a href="mailto:ir@pscapital.example" className="btn">
              Contact investor relations
              <Arrow />
            </a>
            <a href="/disclosures" className="link">
              Regulatory disclosures
              <Arrow className="arrow" />
            </a>
          </div>

          <dl className="contact__details" data-reveal>
            <div>
              <dt className="mono">Headquarters</dt>
              <dd>
                12 Bevis Marks
                <br />
                London EC3A 7BA
              </dd>
            </div>
            <div>
              <dt className="mono">Investor relations</dt>
              <dd>ir@pscapital.example</dd>
            </div>
            <div>
              <dt className="mono">Media</dt>
              <dd>press@pscapital.example</dd>
            </div>
            <div>
              <dt className="mono">Careers</dt>
              <dd>We hire around forty people a year.</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
