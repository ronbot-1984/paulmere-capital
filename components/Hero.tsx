"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Arrow } from "./Arrow";

const FIGURES = [
  { v: "$184B", k: "Assets under management" },
  { v: "1994", k: "Year founded" },
  { v: "9", k: "Global offices" },
  { v: "1,240", k: "Professionals" },
];

export function Hero() {
  const [ready, setReady] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (bgRef.current && y < window.innerHeight * 1.2) {
          bgRef.current.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
          bgRef.current.style.opacity = String(Math.max(0, 1 - y / 900));
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className={`hero ${ready ? "hero--ready" : ""}`}>
      <div className="hero__bg" ref={bgRef} aria-hidden="true">
        <div className="hero__glow" />
        <div className="hero__grid" />
        <svg className="hero__curve" viewBox="0 0 1440 620" preserveAspectRatio="none">
          <path
            className="hero__curve-path"
            d="M0 600C120 596 210 578 300 540C390 502 452 452 540 430C628 408 690 440 780 404C870 368 918 286 1010 236C1102 186 1180 176 1260 128C1340 80 1392 44 1440 8"
            fill="none"
            stroke="url(#heroGrad)"
            strokeWidth="1.25"
          />
          <defs>
            <linearGradient id="heroGrad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#a8834e" stopOpacity="0" />
              <stop offset="45%" stopColor="#a8834e" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#c6a06a" stopOpacity="0.9" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="shell hero__inner">
        <p className="eyebrow hero__eyebrow">
          Global investment management — established 1994
        </p>

        <h1 className="display hero__title">
          <span className="line">
            <span>Compounding</span>
          </span>
          <span className="line">
            <span>
              <em className="italic-serif">conviction</em> across
            </span>
          </span>
          <span className="line">
            <span>market cycles.</span>
          </span>
        </h1>

        <div className="hero__aside">
          <p className="prose hero__blurb">
            We manage $184 billion for pension funds, endowments, sovereign wealth
            funds and family offices — through five independent, research-led
            strategies designed to behave differently when it matters most.
          </p>
          <div className="hero__actions">
            <Link href="/#strategies" className="btn">
              Our strategies
              <Arrow />
            </Link>
            <Link href="/#firm" className="link">
              The firm
              <Arrow className="arrow" />
            </Link>
          </div>
        </div>

        <dl className="hero__figures">
          {FIGURES.map((f, i) => (
            <div key={f.k} className="hero__fig" style={{ transitionDelay: `${520 + i * 90}ms` }}>
              <dt className="mono hero__fig-v">{f.v}</dt>
              <dd className="hero__fig-k">{f.k}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span className="mono">Scroll</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}

