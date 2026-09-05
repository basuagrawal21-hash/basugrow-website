import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { CursorGlow } from '@/components/motion/cursor-glow';

type Surface = 'bone' | 'sand' | 'night';

const lightSurfaces: Record<'bone' | 'sand', string> = {
  bone: 'bg-bone text-ink',
  sand: 'bg-sand text-ink',
};

/**
 * Light sections are full-bleed bands. Dark ones are not.
 *
 * A dark section mid-page used to run edge to edge, which put a hard
 * cream-to-black line across the viewport every time you scrolled past one.
 * That single straight edge is what made the page feel like a template. Now a
 * dark section is an inset rounded block floating on the cream page, so the
 * cream is continuous top to bottom and the dark reads as an object placed on
 * it rather than a stripe cut out of it.
 *
 * The hero and footer are deliberately still full-bleed — a hard edge at the
 * very top and very bottom of a page is a boundary, not an interruption.
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
  if (surface === 'night') {
    return (
      <section id={id} className={cn('bg-bone', className)}>
        <div className="container-page">
          <div className="bg-night text-bone relative isolate overflow-hidden rounded-[1.75rem] px-6 py-[var(--spacing-section)] md:rounded-[2.5rem] md:px-12 lg:px-16">
            {glow && <CursorGlow />}
            <div className={cn('relative z-10', containerClassName)}>{children}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      className={cn('section relative isolate overflow-hidden', lightSurfaces[surface], className)}
    >
      <div className={cn('container-page relative z-10', containerClassName)}>{children}</div>
    </section>
  );
}

/** Small label above a section heading. Willow on dark, moss on light. */
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
        tone === 'light' ? 'text-willow' : 'text-moss',
        className,
      )}
    >
      <span
        aria-hidden
        className={cn('h-px w-6', tone === 'light' ? 'bg-willow/50' : 'bg-moss/45')}
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
