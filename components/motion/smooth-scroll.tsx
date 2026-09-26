'use client';

import { useEffect } from 'react';

/**
 * Lenis smooth scroll. Mounted once in the root layout.
 *
 * Desktop only — a mouse or trackpad (`pointer: fine` and `hover: hover`).
 * Phones and tablets already have well-tuned native momentum scrolling, and
 * Lenis keeps a requestAnimationFrame loop running every frame for the life
 * of the page, which on a mid-range Android is lag and battery for nothing.
 * The library is imported only when it will run, so touch devices never
 * download it.
 *
 * Also bails out when the user prefers reduced motion — native scrolling is
 * the correct behaviour there, not a slower version of ours.
 */
export function SmoothScroll() {
  useEffect(() => {
    const wanted = window.matchMedia(
      '(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)',
    );
    if (!wanted.matches) return;

    let cancelled = false;
    let frame = 0;
    let destroy = () => {};

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
      destroy = () => lenis.destroy();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      destroy();
    };
  }, []);

  return null;
}
