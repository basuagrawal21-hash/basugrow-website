import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Section, Eyebrow, SectionTitle, Lede } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';
import { caseStudies } from '@/content/case-studies';

/**
 * One of exactly three home sections that reveal on scroll, and one of three
 * night sections on the page.
 *
 * Every card here is currently sample data, so each carries a visible badge.
 * See content/case-studies.ts for what the owner needs to supply.
 */
export function Results() {
  const featured = caseStudies.slice(0, 3);

  return (
    <Section surface="night" id="results">
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow tone="light">Results</Eyebrow>
          <SectionTitle tone="light">What a working account looks like</SectionTitle>
          <Lede tone="light">
            Spend, enquiries and cost per enquiry, with the one change that mattered most. The
            figures below are illustrative until our clients approve their real numbers.
          </Lede>
        </div>
      </Reveal>

      <ul className="mt-14 grid gap-5 lg:grid-cols-3">
        {featured.map((study, i) => (
          <Reveal as="li" key={study.slug} delay={i * 0.08} className="h-full">
            <Link
              href={`/work/${study.slug}`}
              className="card card-on-dark group/case flex h-full flex-col p-7 transition-colors duration-300 hover:border-bone/25"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-bone/55 text-[0.875rem] font-medium">{study.industry}</p>
                {study.isSample && (
                  <span className="border-bone/20 text-bone/50 rounded-full border px-2.5 py-0.5 text-[0.6875rem] font-semibold tracking-wide uppercase">
                    Sample
                  </span>
                )}
              </div>

              <h3 className="text-bone mt-4 text-[1.25rem]">{study.headline}</h3>

              <dl className="border-bone/12 mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-t pt-6">
                {study.metrics.slice(0, 4).map((metric) => (
                  <div key={metric.label}>
                    <dt className="text-bone/50 text-[0.8125rem]">{metric.label}</dt>
                    <dd className="text-bone tnum mt-0.5 text-[1.375rem] font-extrabold">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="text-bone/65 mt-6 text-[0.9375rem]">{study.whatChanged}</p>

              <span className="text-bone mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium">
                Read the case study
                <ArrowUpRight
                  size={16}
                  aria-hidden
                  className="transition-transform duration-300 group-hover/case:translate-x-0.5 group-hover/case:-translate-y-0.5"
                />
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
