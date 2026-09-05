import Link from 'next/link';
import { ArrowUpRight, Calculator, PiggyBank } from 'lucide-react';
import { PageHero } from '@/components/sections/page-hero';
import { Section } from '@/components/ui/section';
import { SpotlightCard } from '@/components/motion/spotlight-card';
import { FinalCta } from '@/components/sections/final-cta';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Free tools',
  description:
    'Free calculators for Indian businesses running Meta ads: work out your cost per lead, your cost per customer, and the budget you need. No email required.',
  path: '/tools',
});

const tools = [
  {
    href: '/tools/cpl-calculator',
    icon: Calculator,
    title: 'Cost-per-lead calculator',
    body: 'Start from your budget and cost per enquiry, and see what a customer actually costs you and what comes back.',
  },
  {
    href: '/tools/ad-budget-calculator',
    icon: PiggyBank,
    title: 'Ad budget planner',
    body: 'Start from the customers you want next month and work backwards to the budget that gets you there.',
  },
];

export default function ToolsIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Free tools"
        title="Do the maths before you spend anything"
        lede="Both run in your browser and ask for nothing. No email wall, no results held hostage behind a booking link."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Free tools' }]}
      />

      <Section surface="bone">
        <ul className="grid gap-5 md:grid-cols-2">
          {tools.map((tool) => (
            <li key={tool.href}>
              <SpotlightCard className="bg-sand/50 h-full">
                <Link href={tool.href} className="group/tool block h-full p-8 focus:outline-none">
                  <span className="bg-ink/[0.05] text-ink grid h-11 w-11 place-items-center rounded-xl">
                    <tool.icon size={22} strokeWidth={1.75} aria-hidden />
                  </span>
                  <h2 className="text-ink mt-6 text-[1.25rem]">{tool.title}</h2>
                  <p className="text-slate mt-2.5 text-[1rem]">{tool.body}</p>
                  <span className="text-ink mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium">
                    Open it
                    <ArrowUpRight
                      size={16}
                      aria-hidden
                      className="transition-transform duration-300 group-hover/tool:translate-x-0.5 group-hover/tool:-translate-y-0.5"
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
