export function Statement() {
  return (
    <section className="statement">
      <div className="shell">
        <figure>
          <blockquote className="display statement__q" data-reveal-mask>
            <p>
              “Most firms are organised to survive a good year. We are organised
              to survive a <em className="italic-serif">bad decade</em> — which,
              it turns out, is the same thing as being organised to compound.”
            </p>
          </blockquote>
          <figcaption className="statement__cite" data-reveal>
            <span className="mono">Henrik Vaszary</span>
            <span className="statement__cite-role">
              Chief Investment Officer — Annual Letter, 2025
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
