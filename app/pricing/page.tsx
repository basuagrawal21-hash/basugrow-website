import { PageHero } from '@/components/sections/page-hero';
import { PricingTable } from '@/components/sections/pricing-table';
import { FaqSection } from '@/components/sections/faq-section';
import { FinalCta } from '@/components/sections/final-cta';
import { pricingFaqs } from '@/content/faqs';
import { pricingTiers } from '@/content/pricing';
import { pageMetadata } from '@/lib/seo';
import { FaqLd, PricingLd, BreadcrumbLd } from '@/components/seo/json-ld';

export const metadata = pageMetadata({
  title: 'Pricing',
  description:
    'Three monthly plans built around your ad spend. Management fees are separate from ad spend, and we never take a cut of it.',
  path: '/pricing',
});

export default function PricingPage() {
  return (
    <>
      <FaqLd items={pricingFaqs} />
      <PricingLd tiers={pricingTiers} />
      <BreadcrumbLd items={[{ name: 'Home', path: '/' }, { name: 'Pricing', path: '/pricing' }]} />
      <PageHero
        eyebrow="Pricing"
        title="Published, so you don't have to sit through a call to find out"
        lede="You pay Meta directly for your ads from your own account. Our fee is for the work — strategy, campaigns, creative, tracking and reporting."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Pricing' }]}
      />
      <PricingTable surface="bone" />
      <FaqSection
        items={pricingFaqs}
        surface="sand"
        title="Questions about money"
        lede="The ones people are too polite to ask on a first call."
      />
      <FinalCta />
    </>
  );
}
