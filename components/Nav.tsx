"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wordmark } from "./Mark";

const LINKS = [
  { href: "/#firm", label: "Firm" },
  { href: "/#strategies", label: "Strategies" },
  { href: "/#record", label: "Track record" },
  { href: "/#reach", label: "Global reach" },
  { href: "/#people", label: "People" },
  { href: "/#insights", label: "Insights" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__inner shell">
          <Link href="/" className="nav__brand" aria-label="Paulmere Capital, home">
            <Wordmark />
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="nav__link">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="nav__end">
            <Link href="/#contact" className="nav__cta">
              Investor access
            </Link>
            <button
              className="nav__burger"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className={`burger ${open ? "burger--open" : ""}`} aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`sheet ${open ? "sheet--open" : ""}`}
        hidden={!open}
      >
        <nav className="sheet__nav" aria-label="Mobile">
          {LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className="sheet__link"
              style={{ transitionDelay: `${80 + i * 45}ms` }}
              onClick={() => setOpen(false)}
            >
              <span className="mono sheet__idx">{String(i + 1).padStart(2, "0")}</span>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="sheet__foot">
          <Link href="/#contact" className="btn" onClick={() => setOpen(false)}>
            Investor access
          </Link>
        </div>
      </div>
    </>
  );
}
