'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

const RADIUS = 90;
const PULL = 8;

/**
 * Primary CTAs lean toward the cursor within a 90px radius and spring back.
 * Transform only — no layout properties are touched.
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
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  const spring = { stiffness: 260, damping: 20, mass: 0.6 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);
  const sScale = useSpring(scale, spring);

  if (reduced) {
    return <span className={className}>{children}</span>;
  }

  const onMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = event.clientX - cx;
    const dy = event.clientY - cy;
    const distance = Math.hypot(dx, dy);

    if (distance > RADIUS + Math.max(rect.width, rect.height) / 2) return;

    const pull = Math.min(1, RADIUS / Math.max(distance, 1));
    x.set((dx / RADIUS) * strength * pull);
    y.set((dy / RADIUS) * strength * pull);
    scale.set(1.03);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, scale: sScale, display: 'inline-flex' }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </motion.span>
  );
}
