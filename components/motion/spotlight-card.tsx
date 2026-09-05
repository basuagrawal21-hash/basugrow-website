'use client';

import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Service and industry cards. The pointer position is written to CSS custom
 * properties, which drive a warm glow that tracks the cursor along the card
 * edge, plus a 3 degree tilt. No React state, no re-renders.
 */
export function SpotlightCard({
  children,
  className,
  href,
  tilt = 3,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  tilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || frame.current) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const { clientX, clientY } = event;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const rect = node.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width;
      const py = (clientY - rect.top) / rect.height;
      node.style.setProperty('--mx', `${px * 100}%`);
      node.style.setProperty('--my', `${py * 100}%`);
      node.style.setProperty('--rx', `${(0.5 - py) * tilt}deg`);
      node.style.setProperty('--ry', `${(px - 0.5) * tilt}deg`);
      node.style.setProperty('--lift', '1');
    });
  };

  const reset = () => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty('--rx', '0deg');
    node.style.setProperty('--ry', '0deg');
    node.style.setProperty('--lift', '0');
  };

  const Wrapper = href ? 'a' : 'div';

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn('spotlight-card group card relative isolate overflow-hidden', className)}
    >
      {/* Glow that follows the cursor. Sits behind content, above the fill. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[var(--lift,0)] transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--color-ink) 10%, transparent), transparent 65%)',
        }}
      />
      {/* Border that brightens toward the cursor. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-[var(--radius-card)] opacity-[var(--lift,0)] transition-opacity duration-300"
        style={{
          padding: '1.5px',
          background:
            'radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), var(--color-ink), transparent 70%)',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {href ? (
        <Wrapper href={href} className="block h-full focus:outline-none">
          {children}
        </Wrapper>
      ) : (
        children
      )}
    </div>
  );
}
