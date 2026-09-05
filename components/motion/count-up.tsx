'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

/**
 * Counts once, on first view. Figures are tabular so the surrounding layout
 * never jitters mid-count. With reduced motion the final value renders
 * immediately.
 */
export function CountUp({
  to,
  duration = 1.6,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
  format = 'en-IN',
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  format?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();
  const [counted, setCounted] = useState(0);
  // With reduced motion the final figure is what renders — no state involved,
  // so the preference flipping mid-session is handled without an effect.
  const value = reduced ? to : counted;

  useEffect(() => {
    if (!inView || reduced) return;

    let frame = 0;
    const start = performance.now();
    const ms = duration * 1000;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      // easeOutExpo — fast start, soft landing on the real figure.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setCounted(to * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, to, duration]);

  const display = new Intl.NumberFormat(format, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

  return (
    <span ref={ref} className={cn('tnum', className)}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
