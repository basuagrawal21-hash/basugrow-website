import { Hero } from '@/components/sections/hero';
import { TrustBar } from '@/components/sections/trust-bar';
import { Problem } from '@/components/sections/problem';
import { ServicesGrid } from '@/components/sections/services-grid';
import { HowItWorks } from '@/components/sections/how-it-works';
import { Results } from '@/components/sections/results';
import { IndustriesGrid } from '@/components/sections/industries-grid';
import { ToolsTeaser } from '@/components/sections/tools-teaser';
import { Testimonials } from '@/components/sections/testimonials';
import { PricingTable } from '@/components/sections/pricing-table';
import { FaqSection } from '@/components/sections/faq-section';
import { FinalCta } from '@/components/sections/final-cta';

/* Surfaces alternate: night, bone, bone, sand, bone, NIGHT, bone, sand, bone,
   sand, bone, NIGHT. Three dark sections on the page, no more. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Problem />
      <ServicesGrid />
      <HowItWorks />
      <Results />
      <IndustriesGrid />
      <ToolsTeaser />
      <Testimonials />
      <PricingTable surface="sand" />
      <FaqSection surface="bone" />
      <FinalCta />
    </>
  );
}
