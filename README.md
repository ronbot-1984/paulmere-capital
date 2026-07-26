# Paulmere Capital

A premium marketing site for a **fictional** global investment firm, built as a design
demonstration in the visual language of tier-one institutional asset managers
(Bridgewater, Citadel, Man Group, Brevan Howard, Millennium, Point72, AQR,
Two Sigma, Baupost, Elliott).

**Live:** https://paul.ronbot1984.com

> Paulmere Capital is not a real firm. Every figure, person, office and
> performance number on the site is invented. See `/disclosures`.

## Design notes

- **Palette** — near-black ink `#0a0b0d`, warm bone `#f2efe9`, antique brass `#a8834e`
  used sparingly for rules, figures and emphasis. Sections alternate ink/bone for rhythm.
- **Type** — Newsreader (editorial display serif, 200–400), Inter (UI sans, tight
  tracking), JetBrains Mono (tabular figures, labels, eyebrows).
- **Layout** — 12-column grid, 1440px max, fluid `clamp()` type and spacing
  throughout so there are no layout breakpoints that "snap".
- **Motion** — single `IntersectionObserver` drives every reveal so section markup
  stays in server components. Hero uses a staggered line-mask entrance and a
  scroll-linked parallax. Everything is disabled under `prefers-reduced-motion`.

## Track record chart

The performance section is driven by one fixed array of invented annual returns in
[`components/Record.tsx`](components/Record.tsx). Every statistic shown — annualised
return, growth multiple, volatility, peak-to-trough drawdown, positive years — is
*computed from that series at render time* rather than hardcoded, so the numbers and
the curve can never drift apart. Log scale, hover crosshair with a live readout.

## Stack

Next.js 15 (App Router, static export of all routes), React 19, TypeScript, hand-written
CSS. No UI framework, no CSS framework, three runtime dependencies.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deployment

Vercel, auto-deploying from `main`.
