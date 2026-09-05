import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/sections/page-hero';
import { Section } from '@/components/ui/section';
import { FinalCta } from '@/components/sections/final-cta';
import { caseStudies } from '@/content/case-studies';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Work',
  description:
    'Campaign breakdowns: the problem, what we changed, and what it produced. Spend, enquiries and cost per enquiry for each account.',
  path: '/work',
});

const anySample = caseStudies.some((c) => c.isSample);

export default function WorkIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="The problem, the change, and what it cost"
        lede="Every account here shows the spend, the enquiries and the cost per enquiry. No screenshots of reach, no vanity charts."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Work' }]}
      />

      <Section surface="bone">
        {anySample && (
          <p className="border-ink/12 bg-sand/60 text-slate mb-10 rounded-[var(--radius-card)] border-[1.5px] p-5 text-[0.9375rem]">
            <strong className="text-ink font-medium">A note on these numbers.</strong> BasuGrow is
            early and our clients have not yet approved their real figures for publication. The
            case studies below use illustrative round numbers and are labelled as samples. They
            will be replaced with audited numbers, not quietly upgraded.
          </p>
        )}

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <li key={study.slug}>
              <Link
                href={`/work/${study.slug}`}
                className="card group/case bg-sand/50 hover:border-ink/25 flex h-full flex-col p-7 transition-colors duration-300"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-slate text-[0.875rem] font-medium">{study.industry}</p>
                  {study.isSample && (
                    <span className="border-ink/20 text-slate rounded-full border px-2.5 py-0.5 text-[0.6875rem] font-semibold tracking-wide uppercase">
                      Sample
                    </span>
                  )}
                </div>
                <h2 className="text-ink mt-4 text-[1.25rem]">{study.headline}</h2>
                <dl className="border-ink/10 mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-t pt-6">
                  {study.metrics.slice(0, 4).map((metric) => (
                    <div key={metric.label}>
                      <dt className="text-slate text-[0.8125rem]">{metric.label}</dt>
                      <dd className="text-ink tnum mt-0.5 text-[1.25rem] font-extrabold">
                        {metric.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <span className="text-ink mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium">
                  Read it
                  <ArrowUpRight
                    size={16}
                    aria-hidden
                    className="transition-transform duration-300 group-hover/case:translate-x-0.5 group-hover/case:-translate-y-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <FinalCta />
    </>
  );
}
