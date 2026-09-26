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
import { FaqLd } from '@/components/seo/json-ld';
import { homeFaqs } from '@/content/faqs';

/* Surfaces: night (hero), bone, bone, sand, NIGHT (how it works), sand
   (results), bone, sand, bone, NIGHT (pricing), bone, NIGHT (final CTA).
   Three dark mid-page beats, never two in a row, and sand keeps the quieter
   bands. */
export default function HomePage() {
  return (
    <>
      <FaqLd items={homeFaqs} />
      <Hero />
      <TrustBar />
      <Problem />
      <ServicesGrid />
      <HowItWorks />
      <Results />
      <IndustriesGrid />
      <ToolsTeaser />
      <Testimonials />
      <PricingTable surface="night" />
      <FaqSection surface="bone" />
      <FinalCta />
    </>
  );
}
