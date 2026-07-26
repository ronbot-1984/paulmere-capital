"use client";

import { useEffect } from "react";

/**
 * Single IntersectionObserver drives every [data-reveal] / [data-reveal-mask]
 * element on the page, so section markup can stay in server components.
 */
export function RevealEngine() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-mask]")
    );

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      nodes.forEach((n) => {
        if (n.hasAttribute("data-reveal")) n.setAttribute("data-reveal", "in");
        if (n.hasAttribute("data-reveal-mask"))
          n.setAttribute("data-reveal-mask", "in");
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          if (el.hasAttribute("data-reveal")) el.setAttribute("data-reveal", "in");
          if (el.hasAttribute("data-reveal-mask"))
            el.setAttribute("data-reveal-mask", "in");
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return null;
}
