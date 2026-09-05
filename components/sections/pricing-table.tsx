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
            className={cn('h-full', tier.featured && 'lg:-mt-4 lg:mb-4')}
          >
            <div
              className={cn(
                'card flex h-full flex-col p-7',
                tier.featured ? 'border-ink/30 bg-bone border-2' : 'bg-bone',
              )}
            >
              {tier.featured && (
                <p className="bg-gold text-ink mb-5 -mt-1 w-fit rounded-full px-3 py-1 text-[0.75rem] font-semibold">
                  Most businesses start here
                </p>
              )}

              <h3 className="text-ink text-[1.25rem]">{tier.name}</h3>
              <p className="text-slate mt-2 min-h-[3.25rem] text-[0.9375rem]">{tier.tagline}</p>

              <p className="text-ink mt-5 text-[length:var(--text-lg)] leading-none font-extrabold">
                {tier.priceMonthly === null ? (
                  <span className="text-[length:var(--text-md)]">Let&rsquo;s talk</span>
                ) : (
                  <>
                    <span className="tnum">{inr(tier.priceMonthly)}</span>
                    <span className="text-slate text-[0.9375rem] font-medium"> /month</span>
                  </>
                )}
              </p>
              <p className="text-slate mt-2 text-[0.875rem]">
                Built for {tier.adSpendRange} in ad spend
              </p>

              <ul className="border-ink/10 mt-6 flex-1 space-y-2.5 border-t pt-6">
                {tier.includes.map((item) => (
                  <li key={item} className="text-slate flex gap-2.5 text-[0.9375rem]">
                    <Check size={16} className="text-ink/50 mt-1 shrink-0" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>

              <Button
                href="/contact"
                variant={tier.featured ? 'gold' : 'outline-light'}
                size="md"
                className="mt-7 w-full"
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
