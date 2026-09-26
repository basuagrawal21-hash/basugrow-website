'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * A stat that is always the real figure. It used to count up from zero, so
 * anyone scrolling past mid-count read "₹9" or "573+" — on the one strip of
 * the page that is careful about honesty. Now the final value is in the server
 * HTML and the digits never change. What animates on first view is a short
 * rule drawing in underneath, and only with no reduced-motion preference.
 */
export function StatFigure({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
  format = 'en-IN',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  format?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSeen(true);
        io.disconnect();
      },
      { rootMargin: '0px 0px -15% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const display = new Intl.NumberFormat(format, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

  return (
    <span ref={ref} className={cn('tnum stat-figure', seen && 'is-seen', className)}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
