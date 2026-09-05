import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Section, Eyebrow, SectionTitle, Lede } from '@/components/ui/section';
import { SpotlightCard } from '@/components/motion/spotlight-card';
import { Icon } from '@/components/ui/icon';
import { services } from '@/content/services';

export function ServicesGrid() {
  return (
    <Section surface="sand" id="services">
      <div className="max-w-2xl">
        <Eyebrow>What we do</Eyebrow>
        <SectionTitle>Six things, done properly</SectionTitle>
        <Lede>
          Most of our clients need all six, and they work best together. You can also take one on
          its own — a tracking rebuild or a landing page, for instance.
        </Lede>
      </div>

      <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li key={service.slug} className="h-full">
            <SpotlightCard className="h-full bg-bone">
              <Link
                href={`/services/${service.slug}`}
                className="group/card flex h-full flex-col p-7 focus:outline-none"
              >
                <span className="bg-ink/[0.04] text-ink grid h-11 w-11 place-items-center rounded-xl">
                  <Icon name={service.icon} />
                </span>
                <h3 className="text-ink mt-6 text-[1.25rem]">{service.name}</h3>
                <p className="text-slate mt-2.5 text-[1rem]">{service.summary}</p>
                <span className="text-ink mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium">
                  Read more
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
  );
}
