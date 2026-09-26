import { ArrowRight, MessageCircle, Check } from 'lucide-react';
import { site, trustRow, whatsappLink } from '@/content/site';
import { Button, ButtonLink } from '@/components/ui/button';
import { CursorGlow } from '@/components/motion/cursor-glow';
import { PointerField } from '@/components/motion/pointer-field';
import { HeroPhone } from './hero-phone';

/**
 * No entrance. Everything in the left column is in the server HTML at rest and
 * is painted in the first frame — on a slow 4G connection a fade-in from zero
 * is a blank dark screen for as long as the JS takes to arrive. What moves
 * here moves from its resting state: the pointer drift on desktop, and the
 * phone's cards.
 */
const HEADLINE = ['Ads that put', 'real leads in', 'your WhatsApp.'];

export function Hero() {
  return (
    <section className="bg-night relative isolate overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20">
      <PointerField />
      <CursorGlow size={520} opacity={0.09} />

      {/* Dot grid, lifted from the brand's own creatives. The lit copy is
          revealed only around the pointer. */}
      <div
        aria-hidden
        className="hero-dots hero-dots-base pointer-events-none absolute inset-0 -z-10"
      />
      <div
        aria-hidden
        className="hero-dots hero-dots-lit pointer-events-none absolute inset-0 -z-10"
      />

      {/* Static warm wash in the top-right so the section is never flat. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 -z-10 h-[36rem] w-[36rem] rounded-full opacity-[0.07] blur-3xl"
        style={{ background: 'var(--color-willow)' }}
      />

      <div className="container-page relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          <div>
            <p className="text-willow mb-6 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-xs font-semibold tracking-[0.14em] uppercase">
              <span aria-hidden className="bg-willow/50 h-px w-6" />
              Meta ads
              <span aria-hidden className="text-willow/40">
                ·
              </span>
              Clients across India
              {/* Third item is dropped on narrow screens so the eyebrow holds one line. */}
              <span aria-hidden className="text-willow/40 hidden sm:inline">
                ·
              </span>
              <span className="hidden sm:inline">Based in {site.base.city}</span>
            </p>

            <h1 className="text-bone text-[length:var(--text-4xl)] leading-[0.95]">
              {HEADLINE.map((text, i) => (
                <span key={text} className="block">
                  <span
                    className="hero-drift"
                    // Each line drifts a little more than the one above it.
                    style={{ ['--drift' as string]: `${4 + i * 2}px` }}
                  >
                    {i === 2 ? (
                      <>
                        your{' '}
                        <span className="relative isolate inline-block">
                          {/* CSS, not motion — see .hero-marker in globals.css.
                              This block is what makes the word readable. */}
                          <span
                            aria-hidden
                            className="hero-marker bg-gold absolute -inset-x-[0.1em] -inset-y-[0.02em] -z-10 rounded-[0.2em]"
                          />
                          <span className="text-ink relative">WhatsApp</span>
                        </span>
                        .
                      </>
                    ) : (
                      text
                    )}
                  </span>
                </span>
              ))}
            </h1>

            <p className="text-bone/75 mt-6 max-w-[36rem] text-[length:var(--text-base)]">
              BasuGrow runs Meta ads for gyms, clinics, salons and local businesses across India —
              and sends every qualified enquiry straight to your phone.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                href="/contact"
                variant="gold"
                magnetic
                className="btn-sheen w-full sm:w-auto"
              >
                Get a free ad audit
                <ArrowRight size={18} aria-hidden />
              </Button>
              <ButtonLink
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline-dark"
                className="w-full sm:w-auto"
              >
                <MessageCircle size={18} aria-hidden />
                WhatsApp us
              </ButtonLink>
            </div>

            <ul className="border-bone/15 text-bone/55 mt-9 flex flex-col gap-x-6 gap-y-2.5 border-t pt-5 text-[0.9375rem] sm:flex-row sm:flex-wrap">
              {trustRow.map((item) => (
                <li key={item} className="trust-item flex items-center gap-2">
                  <Check size={15} className="text-willow shrink-0" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* No entrance: the phone is in the server HTML at rest, four cards
              already on screen. */}
          <HeroPhone />
        </div>
      </div>
    </section>
  );
}
