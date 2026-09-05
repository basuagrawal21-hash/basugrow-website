'use client';

import { useEffect, useRef } from 'react';

/**
 * One pointer listener for a whole section.
 *
 * Writes four custom properties on the parent element and nothing else:
 *   --px, --py    pointer position in pixels, for masks and gradients
 *   --pxn, --pyn  the same normalised to -1..1, for parallax and tilt
 *   --pointer     0 or 1, so effects can fade in only while the pointer is over
 *
 * Every effect that depends on the pointer reads these in CSS. That keeps the
 * cost at one rAF-throttled handler per section regardless of how many things
 * react to it, and no React state is touched, so nothing re-renders on move.
 *
 * Desktop pointers only, and disabled under reduced motion.
 */
export function PointerField() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host) return;

    if (
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      const rect = host.getBoundingClientRect();
      const px = x - rect.left;
      const py = y - rect.top;
      host.style.setProperty('--px', `${px}px`);
      host.style.setProperty('--py', `${py}px`);
      // -1 at the left/top edge, 1 at the right/bottom edge.
      host.style.setProperty('--pxn', `${(px / rect.width) * 2 - 1}`);
      host.style.setProperty('--pyn', `${(py / rect.height) * 2 - 1}`);
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onEnter = () => host.style.setProperty('--pointer', '1');
    const onLeave = () => {
      host.style.setProperty('--pointer', '0');
      // Settle the parallax back to centre rather than freezing it off-axis.
      host.style.setProperty('--pxn', '0');
      host.style.setProperty('--pyn', '0');
    };

    host.addEventListener('pointermove', onMove, { passive: true });
    host.addEventListener('pointerenter', onEnter);
    host.addEventListener('pointerleave', onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerenter', onEnter);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <span ref={ref} hidden />;
}
