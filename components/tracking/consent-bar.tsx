'use client';

import Link from 'next/link';
import { useConsent } from './analytics';
import { writeConsent } from '@/lib/consent';

/**
 * A slim bar along the bottom, not a modal.
 *
 * It does not block the page, cover the content, or trap focus, and declining
 * is exactly as easy as accepting — the brief rules out intrusive popups and a
 * consent wall would be one. It only renders at all if there is something to
 * consent to.
 */
export function ConsentBar() {
  const consent = useConsent();
  const hasTracking = Boolean(
    process.env.NEXT_PUBLIC_META_PIXEL_ID || process.env.NEXT_PUBLIC_GA_ID,
  );

  if (!hasTracking || consent !== null) return null;

  return (
    <div
      role="region"
      aria-label="Cookie choices"
      className="border-bone/15 bg-night/95 fixed inset-x-0 bottom-0 z-[55] border-t backdrop-blur-xl"
    >
      <div className="container-page flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-bone/70 max-w-2xl text-[0.9375rem]">
          We would like to measure which pages are useful and whether our own ads work. Only if you
          are happy with that.{' '}
          <Link
            href="/privacy"
            className="text-bone hover:decoration-bone/60 underline decoration-[1.5px] underline-offset-4"
          >
            What we collect
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => writeConsent('denied')}
            className="border-bone/30 text-bone hover:border-bone/60 hover:bg-bone/10 inline-flex h-11 items-center rounded-full border-[1.5px] px-5 text-[0.9375rem] font-medium transition-colors"
          >
            No thanks
          </button>
          <button
            type="button"
            onClick={() => writeConsent('granted')}
            className="bg-gold text-ink hover:bg-[#FFD37A] inline-flex h-11 items-center rounded-full px-5 text-[0.9375rem] font-medium transition-colors"
          >
            That&rsquo;s fine
          </button>
        </div>
      </div>
    </div>
  );
}
