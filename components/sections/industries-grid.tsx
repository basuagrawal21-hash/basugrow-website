import Link from 'next/link';
import { Section, Eyebrow, SectionTitle, Lede } from '@/components/ui/section';
import { Icon } from '@/components/ui/icon';
import { industries } from '@/content/industries';

export function IndustriesGrid() {
  return (
    <Section surface="bone" id="industries">
      <div className="max-w-2xl">
        <Eyebrow>Who we work with</Eyebrow>
        <SectionTitle>Businesses where a phone call closes the sale</SectionTitle>
        <Lede>
          We know the benchmarks, the objections and the offers that work in these six. If you are
          not on the list, ask — we will tell you honestly whether we are the right fit.
        </Lede>
      </div>

      <ul className="mt-12 flex flex-wrap gap-3">
        {industries.map((industry) => (
          <li key={industry.slug}>
            <Link
              href={`/industries/${industry.slug}`}
              className="border-ink/12 text-ink hover:border-ink/30 hover:bg-sand inline-flex items-center gap-2.5 rounded-full border-[1.5px] px-5 py-3 text-[1rem] font-medium transition-colors duration-200"
            >
              <Icon name={industry.icon} size={18} className="text-slate" />
              {industry.name}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
