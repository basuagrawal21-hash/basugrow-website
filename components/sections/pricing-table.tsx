import { Check } from 'lucide-react';
import { Section, Eyebrow, SectionTitle, Lede } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/reveal';
import { pricingTiers, pricingNote } from '@/content/pricing';
import { inr } from '@/lib/utils';
import { cn } from '@/lib/utils';

/**
 * One of the three home sections that reveal on scroll. Night on the home
 * page, where it is a moment to slow down; light on /pricing.
 */
export function PricingTable({ surface = 'sand' }: { surface?: 'bone' | 'sand' | 'night' }) {
  const dark = surface === 'night';
  const tone = dark ? 'light' : 'dark';

  return (
    <Section surface={surface} id="pricing">
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow tone={tone}>Pricing</Eyebrow>
          <SectionTitle tone={tone}>What it costs, before you have to ask</SectionTitle>
          <Lede tone={tone}>
            Three plans built around how much you are spending on ads. Move up or down from any
            billing month.
          </Lede>
        </div>
      </Reveal>

      <ul className="mt-14 grid gap-5 lg:grid-cols-4">
        {pricingTiers.map((tier, i) => {
          // The recommended tier is always the inverse of its surface.
          const darkCard = dark ? !tier.featured : tier.featured;
          return (
            <Reveal
              as="li"
              key={tier.slug}
              delay={i * 0.06}
              className={cn('h-full', tier.featured && 'lg:-mt-5 lg:mb-5')}
            >
              {/* The recommended tier is the one inverted card in the row: dark
                among cream on light surfaces, cream among dark on night.
                Inverting does the highlighting on its own, so the badge can
                stay small and the eye still lands here first. */}
              <div
                className={cn(
                  'relative flex h-full flex-col rounded-[var(--radius-card)] p-6 sm:p-7',
                  tier.featured
                    ? dark
                      ? 'bg-bone text-ink border-gold border-2'
                      : 'bg-night text-bone border-gold/35 border-2'
                    : dark
                      ? 'card card-on-dark'
                      : 'card bg-bone',
                )}
              >
                {tier.featured && (
                  <p className="bg-gold text-ink absolute -top-3 left-6 rounded-full px-3 py-1 text-[0.75rem] font-semibold sm:left-7">
                    Most businesses start here
                  </p>
                )}

                <h3
                  className={cn(
                    'text-[1.25rem]',
                    darkCard ? 'text-bone' : 'text-ink',
                    tier.featured && 'mt-2',
                  )}
                >
                  {tier.name}
                </h3>
                <p
                  className={cn(
                    'mt-2 min-h-[3.25rem] text-[0.9375rem]',
                    darkCard ? 'text-bone/70' : 'text-slate',
                  )}
                >
                  {tier.tagline}
                </p>

                <p
                  className={cn(
                    'mt-5 text-[length:var(--text-lg)] leading-none font-extrabold',
                    darkCard ? 'text-bone' : 'text-ink',
                  )}
                >
                  {tier.priceMonthly === null ? (
                    <span className="text-[length:var(--text-md)]">Let&rsquo;s talk</span>
                  ) : (
                    <>
                      <span className="tnum">{inr(tier.priceMonthly)}</span>
                      <span
                        className={cn(
                          'text-[0.9375rem] font-medium',
                          darkCard ? 'text-bone/65' : 'text-slate',
                        )}
                      >
                        {' '}
                        /month
                      </span>
                    </>
                  )}
                </p>
                <p className={cn('mt-2 text-[0.875rem]', darkCard ? 'text-bone/65' : 'text-slate')}>
                  Built for {tier.adSpendRange} in ad spend
                </p>

                <ul
                  className={cn(
                    'mt-6 flex-1 space-y-2.5 border-t pt-6',
                    darkCard ? 'border-bone/15' : 'border-ink/10',
                  )}
                >
                  {tier.includes.map((item) => (
                    <li
                      key={item}
                      className={cn(
                        'flex gap-2.5 text-[0.9375rem]',
                        darkCard ? 'text-bone/80' : 'text-slate',
                      )}
                    >
                      <Check
                        size={16}
                        className={cn('mt-1 shrink-0', darkCard ? 'text-willow' : 'text-moss/60')}
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <Button
                  href="/contact"
                  variant={
                    tier.featured
                      ? dark
                        ? 'ink'
                        : 'gold'
                      : darkCard
                        ? 'outline-dark'
                        : 'outline-light'
                  }
                  size="md"
                  className={cn('mt-7 w-full', tier.featured && !dark && 'btn-sheen')}
                >
                  {tier.ctaLabel}
                </Button>
              </div>
            </Reveal>
          );
        })}
      </ul>

      <p
        className={cn(
          'mt-10 max-w-3xl border-t pt-6 text-[0.9375rem]',
          dark ? 'text-bone/70 border-bone/12' : 'text-slate border-ink/10',
        )}
      >
        {pricingNote} {/* Same colour as the sentence: slate at 80% measured 3.25:1 on sand. */}
        <span className="italic">
          Prices are indicative while we finalise our rate card — confirm on a call.
        </span>
      </p>
    </Section>
  );
}
