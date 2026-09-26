'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode, type RefObject } from 'react';

/**
 * Scroll reveal. Used on exactly three home sections — Results, Pricing and
 * the final CTA. Putting this on every section is the tell of a generated
 * page, so it is deliberately not a default wrapper.
 *
 * Content is never hidden. The server HTML is at rest and fully opaque, so a
 * slow connection, a fast scroller or a failed script all see the real thing.
 * After hydration, anything still below the fold is nudged down a few pixels
 * while it is off screen, and rises into place when it scrolls in. Anything
 * already on screen is left alone, so nothing visibly jumps.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'li';
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.reveal = 'pending';
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = 'in';
        io.disconnect();
      },
      { rootMargin: '0px 0px -60px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as RefObject<HTMLDivElement & HTMLLIElement>}
      className={className}
      style={{ ['--reveal-delay' as string]: `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
