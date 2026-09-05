import Link from 'next/link';
import { PageHero } from '@/components/sections/page-hero';
import { Section } from '@/components/ui/section';
import { CplCalculator } from '@/components/sections/cpl-calculator';
import { FinalCta } from '@/components/sections/final-cta';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Cost-per-lead calculator',
  description:
    'Work out what a lead and a customer actually cost you from Meta ads, and what your return on ad spend looks like. Free, no email required.',
  path: '/tools/cpl-calculator',
});

export default function CplCalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Free tool"
        title="What is a customer actually costing you?"
        lede="Move the four sliders to match your business. Everything happens in your browser — nothing is sent anywhere and nothing is stored."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Free tools', href: '/tools' },
          { label: 'Cost-per-lead calculator' },
        ]}
      />

      <Section surface="bone">
        <CplCalculator />

        <div className="border-ink/12 mt-14 max-w-3xl border-t pt-8">
          <h2 className="text-ink text-[1.125rem]">How to read this</h2>
          <p className="text-slate mt-3 text-[1rem]">
            Cost per enquiry is the number most agencies sell on, and it is the least important of
            the four. A ₹60 lead that never answers the phone is worse than a ₹400 lead that books.
            What matters is cost per customer, and that is driven mostly by your close rate.
          </p>
          <p className="text-slate mt-3 text-[1rem]">
            If the return looks bad, try raising the close rate by a few points before you touch
            anything else. Answering enquiries within minutes rather than hours usually moves it
            more than any targeting change we could make.
          </p>
          <p className="text-slate mt-3 text-[1rem]">
            Want the same maths the other way round?{' '}
            <Link
              href="/tools/ad-budget-calculator"
              className="text-ink hover:decoration-ink/60 underline decoration-[1.5px] underline-offset-4"
            >
              Start from the customers you want
            </Link>{' '}
            and work back to a budget.
          </p>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
