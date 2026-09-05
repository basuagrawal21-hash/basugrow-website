import Link from 'next/link';
import { ArrowUpRight, Calculator, PiggyBank } from 'lucide-react';
import { Section, Eyebrow, SectionTitle, Lede } from '@/components/ui/section';
import { SpotlightCard } from '@/components/motion/spotlight-card';

const tools = [
  {
    href: '/tools/cpl-calculator',
    icon: Calculator,
    title: 'Cost-per-lead calculator',
    body: 'Put in your budget, your cost per lead and how many leads you close. It works out what a customer actually costs you and what you get back.',
    cta: 'Work out my cost per lead',
  },
  {
    href: '/tools/ad-budget-calculator',
    icon: PiggyBank,
    title: 'Ad budget planner',
    body: 'Start from the number of customers you want next month and work backwards to the budget that gets you there, at realistic costs for your category.',
    cta: 'Plan my budget',
  },
];

/** Free, ungated, no email required. That is the differentiator, so say it. */
export function ToolsTeaser() {
  return (
    <Section surface="sand" id="tools">
      <div className="max-w-2xl">
        <Eyebrow>Free tools</Eyebrow>
        <SectionTitle>Do the maths before you talk to anyone</SectionTitle>
        <Lede>
          Both are free, work in your browser, and ask for nothing. No email wall, no
          &ldquo;book a call to see your results&rdquo;. If the numbers say ads are not worth it for
          you, that is a useful answer too.
        </Lede>
      </div>

      <ul className="mt-12 grid gap-5 md:grid-cols-2">
        {tools.map((tool) => (
          <li key={tool.href}>
            <SpotlightCard className="bg-bone h-full">
              <Link href={tool.href} className="group/tool block h-full p-8 focus:outline-none">
                <span className="bg-moss/[0.08] text-moss grid h-11 w-11 place-items-center rounded-xl">
                  <tool.icon size={22} strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="text-ink mt-6 text-[1.25rem]">{tool.title}</h3>
                <p className="text-slate mt-2.5 max-w-[34rem] text-[1rem]">{tool.body}</p>
                <span className="text-ink mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium">
                  {tool.cta}
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
  );
}
