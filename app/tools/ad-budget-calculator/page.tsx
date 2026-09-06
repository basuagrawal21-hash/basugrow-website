import Link from 'next/link';
import { PageHero } from '@/components/sections/page-hero';
import { Section } from '@/components/ui/section';
import { BudgetCalculator } from '@/components/sections/budget-calculator';
import { FinalCta } from '@/components/sections/final-cta';
import { pageMetadata } from '@/lib/seo';
import { SoftwareApplicationLd, BreadcrumbLd } from '@/components/seo/json-ld';

const description =
  'Start from the customers you want next month and work backwards to the Meta ads budget that gets you there. Free, no email required.';

export const metadata = pageMetadata({
  title: 'Ad budget planner',
  description,
  path: '/tools/ad-budget-calculator',
});

export default function BudgetCalculatorPage() {
  return (
    <>
      <SoftwareApplicationLd
        name="Ad budget planner"
        description={description}
        path="/tools/ad-budget-calculator"
      />
      <BreadcrumbLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Free tools', path: '/tools' },
          { name: 'Ad budget planner', path: '/tools/ad-budget-calculator' },
        ]}
      />
      <PageHero
        eyebrow="Free tool"
        title="How much do you need to spend?"
        lede="Start from the number of customers you want, and work backwards. Runs in your browser — nothing is sent anywhere."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Free tools', href: '/tools' },
          { label: 'Ad budget planner' },
        ]}
      />

      <Section surface="bone">
        <BudgetCalculator />

        <div className="border-ink/12 mt-14 max-w-3xl border-t pt-8">
          <h2 className="text-ink text-[1.125rem]">A caveat worth reading</h2>
          <p className="text-slate mt-3 text-[1rem]">
            This assumes your cost per enquiry stays flat as you spend more. It usually does not.
            Past a certain point you have shown the ad to everyone nearby who was likely to respond,
            and each additional enquiry costs more than the last.
          </p>
          <p className="text-slate mt-3 text-[1rem]">
            In practice, plan the first month at the figure above, then look at what actually
            happened before scaling. Doubling a budget rarely doubles the leads.
          </p>
          <p className="text-slate mt-3 text-[1rem]">
            <Link
              href="/tools/cpl-calculator"
              className="text-ink hover:decoration-ink/60 underline decoration-[1.5px] underline-offset-4"
            >
              The other calculator
            </Link>{' '}
            runs it the other way — from a budget you already have.
          </p>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
