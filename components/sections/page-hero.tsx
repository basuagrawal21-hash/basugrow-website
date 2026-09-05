import type { ReactNode } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { CursorGlow } from '@/components/motion/cursor-glow';

export type Crumb = { label: string; href?: string };

/**
 * Standard night hero for inner pages. The home page has its own.
 * Keeps every route's h1 in one place so the heading structure stays honest.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="bg-night text-bone relative isolate overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
      <CursorGlow size={520} opacity={0.08} />

      <div className="container-page relative z-10">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="text-bone/45 flex flex-wrap items-center gap-1.5 text-[0.875rem]">
              {crumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight size={13} aria-hidden className="text-bone/25" />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-bone transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-bone/70">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <p className="text-bone/60 mb-5 flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase">
            <span aria-hidden className="bg-bone/35 h-px w-6" />
            {eyebrow}
          </p>
        )}

        <h1 className="text-bone max-w-4xl text-[length:var(--text-3xl)]">{title}</h1>

        {lede && (
          <p className="text-bone/70 mt-6 max-w-2xl text-[length:var(--text-base)]">{lede}</p>
        )}

        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
  );
}
