import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/sections/page-hero';
import { Section } from '@/components/ui/section';
import { SpotlightCard } from '@/components/motion/spotlight-card';
import { Icon } from '@/components/ui/icon';
import { FinalCta } from '@/components/sections/final-cta';
import { industries } from '@/content/industries';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Industries',
  description:
    'Meta ads for gyms, clinics, real estate, salons, coaching institutes and restaurants — with the benchmarks and offers that work in each.',
  path: '/industries',
});

export default function IndustriesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="We know what works in these six"
        lede="Different businesses fail at different points. These are the categories where we already know the offers, the objections and what an enquiry should cost."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Industries' }]}
      />

      <Section surface="bone">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <li key={industry.slug}>
              <SpotlightCard className="bg-sand/50 h-full">
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group/card flex h-full flex-col p-7 focus:outline-none"
                >
                  <span className="bg-ink/[0.05] text-ink grid h-11 w-11 place-items-center rounded-xl">
                    <Icon name={industry.icon} />
                  </span>
                  <h2 className="text-ink mt-6 text-[1.25rem]">{industry.name}</h2>
                  <p className="text-slate mt-2.5 text-[1rem]">{industry.pain}</p>
                  <span className="text-ink mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium">
                    See the playbook
                    <ArrowUpRight
                      size={16}
                      aria-hidden
                      className="transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      </Section>

      <FinalCta />
    </>
  );
}
