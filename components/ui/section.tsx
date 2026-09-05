import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { CursorGlow } from '@/components/motion/cursor-glow';

type Surface = 'bone' | 'sand' | 'night';

const surfaces: Record<Surface, string> = {
  bone: 'bg-bone text-ink',
  sand: 'bg-sand text-ink',
  night: 'bg-night text-bone',
};

/**
 * Section edges alternate bone -> sand -> bone -> night.
 * Night sections get the cursor spotlight; light sections never do.
 */
export function Section({
  children,
  surface = 'bone',
  id,
  className,
  containerClassName,
  glow = true,
}: {
  children: ReactNode;
  surface?: Surface;
  id?: string;
  className?: string;
  containerClassName?: string;
  glow?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn('section relative isolate overflow-hidden', surfaces[surface], className)}
    >
      {surface === 'night' && glow && <CursorGlow />}
      <div className={cn('container-page relative z-10', containerClassName)}>{children}</div>
    </section>
  );
}

/** Small label above a section heading. Willow on night, ink on light. */
export function Eyebrow({
  children,
  tone = 'dark',
  className,
}: {
  children: ReactNode;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  return (
    <p
      className={cn(
        'mb-4 flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase',
        tone === 'light' ? 'text-bone/65' : 'text-ink',
        className,
      )}
    >
      <span aria-hidden className={cn('h-px w-6', tone === 'light' ? 'bg-bone/35' : 'bg-ink/40')} />
      {children}
    </p>
  );
}

/** Section heading. Sentence case, big, tight. */
export function SectionTitle({
  children,
  tone = 'dark',
  className,
  as: Tag = 'h2',
}: {
  children: ReactNode;
  tone?: 'dark' | 'light';
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}) {
  return (
    <Tag
      className={cn(
        'text-[length:var(--text-2xl)]',
        tone === 'light' ? 'text-bone' : 'text-ink',
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Standard paragraph under a section title. */
export function Lede({
  children,
  tone = 'dark',
  className,
}: {
  children: ReactNode;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  return (
    <p
      className={cn(
        'prose-body mt-5 text-[length:var(--text-base)]',
        tone === 'light' ? 'text-bone/75' : 'text-slate',
        className,
      )}
    >
      {children}
    </p>
  );
}
