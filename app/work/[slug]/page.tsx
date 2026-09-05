import { notFound } from 'next/navigation';
import { PageHero } from '@/components/sections/page-hero';
import { Section, Eyebrow, SectionTitle } from '@/components/ui/section';
import { FinalCta } from '@/components/sections/final-cta';
import { caseStudies, getCaseStudy } from '@/content/case-studies';
import { pageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return pageMetadata({
    title: `${study.headline} — ${study.industry}`,
    description: study.problem.slice(0, 155),
    path: `/work/${study.slug}`,
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <PageHero
        eyebrow={`${study.industry} · ${study.city}`}
        title={study.headline}
        lede={`${study.timeframe} of work on one account.`}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Work', href: '/work' },
          { label: study.industry },
        ]}
      >
        {study.isSample && (
          <p className="border-bone/20 text-bone/60 inline-block rounded-full border px-4 py-1.5 text-[0.8125rem]">
            Sample data — illustrative figures, pending client approval
          </p>
        )}
      </PageHero>

      {/* Metric strip */}
      <Section surface="bone" className="!py-12">
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {study.metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="text-slate text-[0.875rem]">{metric.label}</dt>
              <dd className="text-ink tnum mt-1 text-[length:var(--text-xl)] leading-none font-extrabold">
                {metric.value}
              </dd>
              {metric.note && <p className="text-slate mt-1.5 text-[0.8125rem]">{metric.note}</p>}
            </div>
          ))}
        </dl>
      </Section>

      <Section surface="sand">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Eyebrow>The problem</Eyebrow>
          <div>
            <SectionTitle className="text-[length:var(--text-lg)]">
              What was going wrong
            </SectionTitle>
            <p className="text-slate prose-body mt-5 text-[1.0625rem]">{study.problem}</p>
          </div>
        </div>
      </Section>

      <Section surface="bone">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Eyebrow>The approach</Eyebrow>
          <div>
            <SectionTitle className="text-[length:var(--text-lg)]">What we changed</SectionTitle>
            <ol className="mt-6 space-y-5">
              {study.approach.map((step, i) => (
                <li key={step} className="border-ink/10 flex gap-5 border-t pt-5">
                  <span className="text-slate/60 tnum shrink-0 text-[0.875rem] font-semibold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-slate prose-body text-[1.0625rem]">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section surface="sand">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Eyebrow>The result</Eyebrow>
          <div>
            <SectionTitle className="text-[length:var(--text-lg)]">What it produced</SectionTitle>
            <p className="text-slate prose-body mt-5 text-[1.0625rem]">{study.result}</p>
            <div className="border-ink/12 bg-bone mt-8 rounded-[var(--radius-card)] border-[1.5px] p-7">
              <p className="text-slate text-[0.875rem] font-medium tracking-wide uppercase">
                The one change that mattered
              </p>
              <p className="text-ink mt-3 text-[1.25rem]">{study.whatChanged}</p>
            </div>
          </div>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
