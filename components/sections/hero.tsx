'use client';

import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, MessageCircle, Check } from 'lucide-react';
import { site, trustRow, whatsappLink } from '@/content/site';
import { Button, ButtonLink } from '@/components/ui/button';
import { CursorGlow } from '@/components/motion/cursor-glow';
import { PointerField } from '@/components/motion/pointer-field';
import { LeadTicker } from './lead-ticker';

/**
 * The one choreographed entrance on the site. Headline lines stagger 60ms,
 * then the ticker. Nothing else on the page animates without the user asking.
 */
const line = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

const HEADLINE = ['Ads that put', 'real leads in', 'your WhatsApp.'];

export function Hero() {
  const reduced = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduced ? 0 : 0.06, delayChildren: reduced ? 0 : 0.08 },
    },
  };

  const transition = reduced
    ? { duration: 0 }
    : { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const };

  return (
    <section className="bg-pine relative isolate overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20">
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

      {/* Static willow wash in the top-right so the section is never flat. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 -z-10 h-[36rem] w-[36rem] rounded-full opacity-[0.07] blur-3xl"
        style={{ background: 'var(--color-willow)' }}
      />

      <div className="container-page relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-14"
        >
          <div>
            <motion.p
              variants={line}
              transition={transition}
              className="text-willow mb-6 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-xs font-semibold tracking-[0.14em] uppercase"
            >
              <span aria-hidden className="bg-willow/60 h-px w-6" />
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
            </motion.p>

            <h1 className="text-paper text-[length:var(--text-4xl)] leading-[0.95]">
              {HEADLINE.map((text, i) => (
                <motion.span key={text} variants={line} transition={transition} className="block">
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
                </motion.span>
              ))}
            </h1>

            <motion.p
              variants={line}
              transition={transition}
              className="text-paper/75 mt-6 max-w-[36rem] text-[length:var(--text-base)]"
            >
              BasuGrow runs Meta ads for gyms, clinics, salons and local businesses across India —
              and sends every qualified enquiry straight to your phone.
            </motion.p>

            <motion.div
              variants={line}
              transition={transition}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
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
            </motion.div>

            <motion.ul
              variants={line}
              transition={transition}
              className="border-willow/15 text-paper/60 mt-9 flex flex-col gap-x-6 gap-y-2.5 border-t pt-5 text-[0.9375rem] sm:flex-row sm:flex-wrap"
            >
              {trustRow.map((item) => (
                <li key={item} className="trust-item flex items-center gap-2">
                  <Check size={15} className="text-willow shrink-0" aria-hidden />
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduced ? { duration: 0 } : { duration: 0.65, delay: 0.34, ease: [0.2, 0.8, 0.2, 1] }
            }
          >
            <div className="hero-tilt">
              <LeadTicker />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
