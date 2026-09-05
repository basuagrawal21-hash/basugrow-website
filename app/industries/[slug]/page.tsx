import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/sections/page-hero';
import { Section, Eyebrow, SectionTitle, Lede } from '@/components/ui/section';
import { Button, ButtonLink } from '@/components/ui/button';
import { FinalCta } from '@/components/sections/final-cta';
import { industries, getIndustry } from '@/content/industries';
import { getCaseStudy } from '@/content/case-studies';
import { whatsappLink } from '@/content/site';
import { pageMetadata } from '@/lib/seo';
import { BreadcrumbLd } from '@/components/seo/json-ld';

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return pageMetadata({
    title: `Meta ads for ${industry.longName}`,
    description: industry.heroSub,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const study = industry.caseStudySlug ? getCaseStudy(industry.caseStudySlug) : undefined;

  return (
    <>
      <BreadcrumbLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' },
          { name: industry.name, path: `/industries/${industry.slug}` },
        ]}
      />
      <PageHero
        eyebrow={`Meta ads for ${industry.name.toLowerCase()}`}
        title={industry.heroHeadline}
        lede={industry.heroSub}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Industries', href: '/industries' },
          { label: industry.name },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" variant="gold" magnetic className="btn-sheen w-full sm:w-auto">
            Get a free ad audit
          </Button>
          <ButtonLink
            href={whatsappLink(`Hi BasuGrow, I run a business in ${industry.name} and want more leads`)}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline-dark"
            className="w-full sm:w-auto"
          >
            WhatsApp us
          </ButtonLink>
        </div>
      </PageHero>

      {/* The problem, stated plainly */}
      <Section surface="bone">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Eyebrow>The usual problem</Eyebrow>
            <SectionTitle>{industry.pain}</SectionTitle>
          </div>
          <div className="border-ink/12 bg-sand/60 rounded-[var(--radius-card)] border-[1.5px] p-8">
            <p className="text-slate text-[0.875rem] font-medium tracking-wide uppercase">
              Typical cost per enquiry
            </p>
            <p className="text-ink tnum mt-2 text-[length:var(--text-xl)] leading-none font-extrabold">
              {industry.cplRange}
            </p>
            <p className="text-slate mt-4 text-[0.9375rem]">
              A wide range on purpose. Where you land inside it depends on your city, your offer and
              how competitive your category is locally. Anyone quoting you one number without asking
              those things is guessing.
            </p>
          </div>
        </div>
      </Section>

      {/* Playbook */}
      <Section surface="sand">
        <div className="max-w-2xl">
          <Eyebrow>The playbook</Eyebrow>
          <SectionTitle>What a campaign for you actually contains</SectionTitle>
          <Lede>
            Not a generic funnel with your logo on it. These are the specific moves that work in
            this category.
          </Lede>
        </div>
        <ul className="mt-12 grid gap-x-14 gap-y-10 md:grid-cols-2">
          {industry.playbook.map((item, i) => (
            <li key={item.title} className="border-ink/12 border-t pt-6">
              <p className="text-slate/60 tnum text-[0.875rem] font-semibold">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="text-ink mt-3 text-[1.125rem]">{item.title}</h3>
              <p className="text-slate mt-2.5 max-w-[36rem] text-[1rem]">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Related case study */}
      {study && (
        <Section surface="bone">
          <div className="max-w-2xl">
            <Eyebrow>Related work</Eyebrow>
            <SectionTitle>{study.headline}</SectionTitle>
          </div>
          <Link
            href={`/work/${study.slug}`}
            className="card group/case bg-sand/50 hover:border-ink/25 mt-10 block p-8 transition-colors duration-300"
          >
            <div className="flex items-center gap-3">
              <p className="text-slate text-[0.9375rem]">
                {study.industry} · {study.city} · {study.timeframe}
              </p>
              {study.isSample && (
                <span className="border-ink/20 text-slate rounded-full border px-2.5 py-0.5 text-[0.6875rem] font-semibold tracking-wide uppercase">
                  Sample
                </span>
              )}
            </div>
            <dl className="border-ink/10 mt-6 grid grid-cols-2 gap-6 border-t pt-6 md:grid-cols-4">
              {study.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt className="text-slate text-[0.8125rem]">{metric.label}</dt>
                  <dd className="text-ink tnum mt-0.5 text-[1.375rem] font-extrabold">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
            <span className="text-ink mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium">
              Read the case study
              <ArrowUpRight
                size={16}
                aria-hidden
                className="transition-transform duration-300 group-hover/case:translate-x-0.5 group-hover/case:-translate-y-0.5"
              />
            </span>
          </Link>
        </Section>
      )}

      <FinalCta />
    </>
  );
}
