import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/sections/page-hero';
import { Section } from '@/components/ui/section';
import { SpotlightCard } from '@/components/motion/spotlight-card';
import { Icon } from '@/components/ui/icon';
import { FinalCta } from '@/components/sections/final-cta';
import { services } from '@/content/services';
import { pageMetadata } from '@/lib/seo';
import { BreadcrumbLd } from '@/components/seo/json-ld';

export const metadata = pageMetadata({
  title: 'Services',
  description:
    'Meta ads management, lead generation campaigns, WhatsApp lead delivery, ad creative, landing pages and conversion tracking for businesses across India.',
  path: '/services',
});

export default function ServicesIndexPage() {
  return (
    <>
      <BreadcrumbLd items={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]} />
      <PageHero
        eyebrow="Services"
        title="Everything between your budget and a booked customer"
        lede="Six services that work as one system. Take all of them, or take the one piece that is broken."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
      />

      <Section surface="bone">
        <ul className="grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug}>
              <SpotlightCard className="bg-sand/50 h-full">
                <Link
                  href={`/services/${service.slug}`}
                  className="group/card flex h-full flex-col p-8 focus:outline-none"
                >
                  <span className="bg-ink/[0.05] text-ink grid h-11 w-11 place-items-center rounded-xl">
                    <Icon name={service.icon} />
                  </span>
                  <h2 className="text-ink mt-6 text-[1.375rem]">{service.name}</h2>
                  <p className="text-slate mt-2.5 text-[1rem]">{service.summary}</p>
                  <span className="text-ink mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium">
                    What&rsquo;s included
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
