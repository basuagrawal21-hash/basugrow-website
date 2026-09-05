'use client';

import { useEffect, useRef } from 'react';

/**
 * Soft willow glow that follows the pointer across a pine section.
 * Desktop pointer devices only, rAF-throttled, and it writes to CSS custom
 * properties rather than React state so it never triggers a render.
 */
export function CursorGlow({ size = 420, opacity = 0.1 }: { size?: number; opacity?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    const parent = node?.parentElement;
    if (!node || !parent) return;

    const fine = window.matchMedia('(pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduced.matches) return;

    let frame = 0;
    let nextX = 0;
    let nextY = 0;

    const paint = () => {
      frame = 0;
      node.style.setProperty('--gx', `${nextX}px`);
      node.style.setProperty('--gy', `${nextY}px`);
    };

    const onMove = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      nextX = event.clientX - rect.left;
      nextY = event.clientY - rect.top;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onEnter = () => {
      node.style.opacity = '1';
    };
    const onLeave = () => {
      node.style.opacity = '0';
    };

    parent.addEventListener('pointermove', onMove);
    parent.addEventListener('pointerenter', onEnter);
    parent.addEventListener('pointerleave', onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      parent.removeEventListener('pointermove', onMove);
      parent.removeEventListener('pointerenter', onEnter);
      parent.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500"
      style={{
        mixBlendMode: 'soft-light',
        background: `radial-gradient(${size}px circle at var(--gx, 50%) var(--gy, 50%), color-mix(in srgb, var(--color-willow) ${opacity * 100}%, transparent), transparent 70%)`,
      }}
    />
  );
}
