import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { CursorGlow } from '@/components/motion/cursor-glow';

type Surface = 'paper' | 'mint' | 'pine';

const surfaces: Record<Surface, string> = {
  paper: 'bg-paper text-ink',
  mint: 'bg-mint text-ink',
  pine: 'bg-pine text-paper',
};

/**
 * Section edges alternate paper -> mint -> paper -> pine.
 * Pine sections get the cursor spotlight; light sections never do.
 */
export function Section({
  children,
  surface = 'paper',
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
      {surface === 'pine' && glow && <CursorGlow />}
      <div className={cn('container-page relative z-10', containerClassName)}>{children}</div>
    </section>
  );
}

/** Small label above a section heading. Willow on pine, forest on light. */
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
        tone === 'light' ? 'text-willow' : 'text-forest',
        className,
      )}
    >
      <span
        aria-hidden
        className={cn('h-px w-6', tone === 'light' ? 'bg-willow/60' : 'bg-forest/40')}
      />
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
        tone === 'light' ? 'text-paper' : 'text-forest',
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
        tone === 'light' ? 'text-paper/75' : 'text-slate',
        className,
      )}
    >
      {children}
    </p>
  );
}
