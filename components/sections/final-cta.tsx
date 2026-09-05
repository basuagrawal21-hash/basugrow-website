import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button, ButtonLink } from '@/components/ui/button';
import { Reveal } from '@/components/motion/reveal';
import { CursorGlow } from '@/components/motion/cursor-glow';
import { site, whatsappLink } from '@/content/site';

/**
 * The only centred section on the site, and the third night section.
 *
 * The Cal.com embed is deliberately not loaded unless NEXT_PUBLIC_CAL_LINK is
 * set — a third-party script on the highest-intent section of the page is a
 * real performance cost, and with no link configured it would buy nothing.
 */
export function FinalCta() {
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK;

  return (
    <section className="bg-bone pb-[var(--spacing-section)]">
      <div className="container-page">
        <div className="bg-night text-bone relative isolate overflow-hidden rounded-[1.75rem] px-6 py-[var(--spacing-section)] md:rounded-[2.5rem] md:px-12">
          <CursorGlow size={560} opacity={0.1} />

          <div className="relative z-10">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="text-bone/60 mb-5 text-xs font-semibold tracking-[0.14em] uppercase">
                Free ad audit
              </p>
              <h2 className="text-bone text-[length:var(--text-3xl)]">
                Tell us what you sell. We&rsquo;ll tell you what it takes.
              </h2>
              <p className="text-bone/70 mx-auto mt-6 max-w-xl text-[length:var(--text-base)]">
                A 20-minute call. We look at your offer, your market and what you are spending now,
                and give you a realistic range for what your budget could produce. No deck, no
                pressure, and we will say so if we are not the right fit.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                {calLink ? (
                  <ButtonLink
                    href={`https://cal.com/${calLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="gold"
                    magnetic
                    className="btn-sheen w-full sm:w-auto"
                  >
                    Book the call
                    <ArrowRight size={18} aria-hidden />
                  </ButtonLink>
                ) : (
                  <Button
                    href="/contact"
                    variant="gold"
                    magnetic
                    className="btn-sheen w-full sm:w-auto"
                  >
                    Get a free ad audit
                    <ArrowRight size={18} aria-hidden />
                  </Button>
                )}

                <ButtonLink
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline-dark"
                  className="w-full sm:w-auto"
                >
                  <MessageCircle size={18} aria-hidden />
                  WhatsApp {site.contact.phoneDisplay}
                </ButtonLink>
              </div>

              <p className="text-bone/45 mt-7 text-[0.875rem]">{site.contact.responsePromise}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
