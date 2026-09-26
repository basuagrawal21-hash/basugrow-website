'use client';

import { useRef, type ReactNode } from 'react';

const RADIUS = 90;
const PULL = 8;

/**
 * Primary CTAs lean toward the cursor within a 90px radius and spring back.
 * Transform only — no layout properties are touched. The pointer handler
 * writes three custom properties; the spring is a CSS transition with a small
 * overshoot (.magnetic in globals.css), so no animation library is loaded.
 */
export function Magnetic({
  children,
  className,
  strength = PULL,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const set = (x: number, y: number, s: number) => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty('--mx', `${x}px`);
    node.style.setProperty('--my', `${y}px`);
    node.style.setProperty('--ms', `${s}`);
  };

  const onMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = node.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const distance = Math.hypot(dx, dy);

    if (distance > RADIUS + Math.max(rect.width, rect.height) / 2) return;

    const pull = Math.min(1, RADIUS / Math.max(distance, 1));
    set((dx / RADIUS) * strength * pull, (dy / RADIUS) * strength * pull, 1.03);
  };

  const reset = () => set(0, 0, 1);

  return (
    <span
      ref={ref}
      className={className ? `magnetic ${className}` : 'magnetic'}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </span>
  );
}
