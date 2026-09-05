import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * The mark is the real BasuGrow logo, lifted from a brand creative by
 * scripts/extract-logo.mjs and stored as an alpha mask. It is painted with
 * `background-color: currentColor` through a CSS mask, so one file serves both
 * the willow-on-night and ink-on-bone variants and always matches the token.
 *
 * TODO(brand): swap in the original vector when it is supplied — drop an SVG at
 * public/logo-mark.svg and point `maskImage` at it. The mask approach keeps
 * working unchanged with an SVG source.
 */
const MASK = 'url(/logo-mark-mask.png)';

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn('inline-block shrink-0 bg-current', className)}
      style={{
        maskImage: MASK,
        WebkitMaskImage: MASK,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  );
}

export function Logo({
  className,
  tone = 'light',
  showWordmark = true,
}: {
  className?: string;
  /** 'light' = for night backgrounds. 'dark' = for bone backgrounds. */
  tone?: 'light' | 'dark';
  showWordmark?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn('inline-flex items-center gap-2.5 rounded-lg', className)}
      aria-label="BasuGrow — home"
    >
      <LogoMark className={cn('h-9 w-9', tone === 'light' ? 'text-willow' : 'text-ink')} />
      {showWordmark && (
        <span
          className={cn(
            'font-display text-[1.375rem] font-extrabold tracking-[-0.04em]',
            tone === 'light' ? 'text-bone' : 'text-ink',
          )}
        >
          BasuGrow
        </span>
      )}
    </Link>
  );
}
