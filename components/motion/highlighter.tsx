'use client';

import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

/**
 * The brand's signature device: a skewed gold marker block behind a key
 * phrase, wiping in left to right once when scrolled into view.
 *
 * Rules of use — at most one per screen, and never as decoration. Emphasis in
 * a headline is done with this, never by colouring a single word.
 */
export function Highlighter({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <span className={cn('relative isolate inline-block', className)}>
      <motion.span
        aria-hidden
        className="bg-gold absolute -inset-x-[0.18em] -inset-y-[0.06em] -z-10 origin-left rounded-[0.28em]"
        style={{ transform: 'skewX(-4deg)' }}
        initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={reduced ? { duration: 0 } : { duration: 0.45, delay, ease: [0.2, 0.8, 0.2, 1] }}
      />
      <span className="text-ink relative">{children}</span>
    </span>
  );
}
