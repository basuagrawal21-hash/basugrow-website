'use client';

import { Children, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * CSS-only infinite marquee. The track is duplicated once and translated by
 * exactly -50%, which loops seamlessly. Pauses on hover and on focus within,
 * and stops entirely under reduced motion (handled in globals.css).
 */
export function Marquee({
  children,
  speed = 38,
  className,
  reverse = false,
}: {
  children: ReactNode;
  /** Seconds for one full pass. Higher is slower. */
  speed?: number;
  className?: string;
  reverse?: boolean;
}) {
  const items = Children.toArray(children);

  return (
    <div
      className={cn('marquee group relative overflow-hidden', className)}
      style={{ ['--marquee-duration' as string]: `${speed}s` }}
    >
      <div
        className={cn('marquee-track flex w-max items-center', reverse && 'marquee-reverse')}
        // The duplicate is decorative; screen readers read the first copy only.
      >
        <ul className="flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16">
          {items.map((child, i) => (
            <li key={i} className="shrink-0">
              {child}
            </li>
          ))}
        </ul>
        <ul aria-hidden className="flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16">
          {items.map((child, i) => (
            <li key={`dup-${i}`} className="shrink-0">
              {child}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
