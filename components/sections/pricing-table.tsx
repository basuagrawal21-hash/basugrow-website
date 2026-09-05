import { Check } from 'lucide-react';
import { Section, Eyebrow, SectionTitle, Lede } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/reveal';
import { pricingTiers, pricingNote } from '@/content/pricing';
import { inr } from '@/lib/utils';
import { cn } from '@/lib/utils';

/** One of the three home sections that reveal on scroll. */
export function PricingTable({ surface = 'sand' }: { surface?: 'bone' | 'sand' }) {
  return (
    <Section surface={surface} id="pricing">
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow>Pricing</Eyebrow>
          <SectionTitle>What it costs, before you have to ask</SectionTitle>
          <Lede>
            Three plans built around how much you are spending on ads. Move up or down from any
            billing month.
          </Lede>
        </div>
      </Reveal>

      <ul className="mt-14 grid gap-5 lg:grid-cols-4">
        {pricingTiers.map((tier, i) => (
          <Reveal
            as="li"
            key={tier.slug}
            delay={i * 0.06}
            className={cn('h-full', tier.featured && 'lg:-mt-5 lg:mb-5')}
          >
            {/* The recommended tier is the one dark card in a row of cream
                ones. Inverting the surface does the highlighting on its own,
                so the badge can stay small and the eye still lands here
                first. */}
            <div
              className={cn(
                'relative flex h-full flex-col rounded-[var(--radius-card)] p-7',
                tier.featured ? 'bg-night text-bone border-gold/35 border-2' : 'card bg-bone',
              )}
            >
              {tier.featured && (
                <p className="bg-gold text-ink absolute -top-3 left-7 rounded-full px-3 py-1 text-[0.75rem] font-semibold">
                  Most businesses start here
                </p>
              )}

              <h3 className={cn('text-[1.25rem]', tier.featured ? 'text-bone mt-2' : 'text-ink')}>
                {tier.name}
              </h3>
              <p
                className={cn(
                  'mt-2 min-h-[3.25rem] text-[0.9375rem]',
                  tier.featured ? 'text-bone/70' : 'text-slate',
                )}
              >
                {tier.tagline}
              </p>

              <p
                className={cn(
                  'mt-5 text-[length:var(--text-lg)] leading-none font-extrabold',
                  tier.featured ? 'text-bone' : 'text-ink',
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
                        tier.featured ? 'text-bone/60' : 'text-slate',
                      )}
                    >
                      {' '}
                      /month
                    </span>
                  </>
                )}
              </p>
              <p
                className={cn(
                  'mt-2 text-[0.875rem]',
                  tier.featured ? 'text-bone/60' : 'text-slate',
                )}
              >
                Built for {tier.adSpendRange} in ad spend
              </p>

              <ul
                className={cn(
                  'mt-6 flex-1 space-y-2.5 border-t pt-6',
                  tier.featured ? 'border-bone/15' : 'border-ink/10',
                )}
              >
                {tier.includes.map((item) => (
                  <li
                    key={item}
                    className={cn(
                      'flex gap-2.5 text-[0.9375rem]',
                      tier.featured ? 'text-bone/80' : 'text-slate',
                    )}
                  >
                    <Check
                      size={16}
                      className={cn(
                        'mt-1 shrink-0',
                        tier.featured ? 'text-willow' : 'text-moss/60',
                      )}
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <Button
                href="/contact"
                variant={tier.featured ? 'gold' : 'outline-light'}
                size="md"
                className={cn('mt-7 w-full', tier.featured && 'btn-sheen')}
              >
                {tier.ctaLabel}
              </Button>
            </div>
          </Reveal>
        ))}
      </ul>

      <p className="text-slate border-ink/10 mt-10 max-w-3xl border-t pt-6 text-[0.9375rem]">
        {pricingNote}{' '}
        <span className="text-slate/80 italic">
          Prices are indicative while we finalise our rate card — confirm on a call.
        </span>
      </p>
    </Section>
  );
}
