import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * Inline SVG rather than next/image so the mark inherits currentColor and
 * costs no network request.
 *
 * TODO(brand): replace these paths with the supplied logo files. This is a
 * placeholder built to the described mark — BG monogram in a circle with an
 * arrow breaking out of the top right.
 */
export function Logo({
  className,
  tone = 'light',
  showWordmark = true,
}: {
  className?: string;
  /** 'light' = for pine backgrounds. 'dark' = for paper backgrounds. */
  tone?: 'light' | 'dark';
  showWordmark?: boolean;
}) {
  const color = tone === 'light' ? 'text-willow' : 'text-forest';
  const word = tone === 'light' ? 'text-paper' : 'text-forest';

  return (
    <Link
      href="/"
      className={cn('inline-flex items-center gap-2.5 rounded-lg', className)}
      aria-label="BasuGrow — home"
    >
      <svg
        viewBox="0 0 80 80"
        className={cn('h-9 w-9 shrink-0', color)}
        fill="none"
        aria-hidden
      >
        <path
          d="M64 44a28 28 0 1 1-9.6-21.1"
          stroke="currentColor"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <path
          d="M52 28h20v20"
          stroke="currentColor"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M43 57 72 28" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
        <text
          x="36"
          y="53"
          fontSize="27"
          fontWeight="800"
          letterSpacing="-1.6"
          fill="currentColor"
          textAnchor="middle"
          fontFamily="var(--font-display)"
        >
          BG
        </text>
      </svg>
      {showWordmark && (
        <span
          className={cn('font-display text-[1.375rem] font-extrabold tracking-[-0.04em]', word)}
        >
          BasuGrow
        </span>
      )}
    </Link>
  );
}
