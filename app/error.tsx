'use client';

import { useEffect } from 'react';
import { site, whatsappLink } from '@/content/site';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Surfaces in Vercel logs with the digest so a report can be traced.
    console.error('[app error]', error);
  }, [error]);

  return (
    <section className="bg-night text-bone flex min-h-[70vh] items-center py-24">
      <div className="container-page">
        <p className="text-bone/50 text-[0.875rem] font-semibold tracking-[0.14em] uppercase">
          Something broke
        </p>
        <h1 className="text-bone mt-4 max-w-2xl text-[length:var(--text-3xl)]">
          This page failed to load
        </h1>
        <p className="text-bone/70 mt-5 max-w-xl text-[length:var(--text-base)]">
          The error is on our side, not yours. Trying again often works — the fault is usually
          momentary. If it keeps happening, message us and we will look into it.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="btn-sheen bg-gold text-ink hover:bg-[#FFD37A] inline-flex h-14 items-center justify-center rounded-full px-7 text-[1.0625rem] font-medium transition-colors"
          >
            Try again
          </button>
          <a
            href={whatsappLink('Hi BasuGrow, a page on your site is showing an error')}
            target="_blank"
            rel="noopener noreferrer"
            className="border-bone/30 text-bone hover:border-bone/60 hover:bg-bone/10 inline-flex h-14 items-center justify-center rounded-full border-[1.5px] px-7 text-[1.0625rem] font-medium transition-colors"
          >
            Report it on WhatsApp
          </a>
        </div>

        {error.digest && (
          <p className="text-bone/40 mt-8 text-[0.875rem]">
            Reference: <span className="tnum">{error.digest}</span> — quoting this helps us find it.
          </p>
        )}
        <p className="text-bone/40 mt-2 text-[0.875rem]">
          Or email {site.contact.email}.
        </p>
      </div>
    </section>
  );
}
