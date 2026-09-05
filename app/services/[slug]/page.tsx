import { notFound } from 'next/navigation';
import { Check, X } from 'lucide-react';
import { PageHero } from '@/components/sections/page-hero';
import { Section, Eyebrow, SectionTitle } from '@/components/ui/section';
import { Button, ButtonLink } from '@/components/ui/button';
import { FaqSection } from '@/components/sections/faq-section';
import { FinalCta } from '@/components/sections/final-cta';
import { Icon } from '@/components/ui/icon';
import { services, getService } from '@/content/services';
import { whatsappLink } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.name,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <PageHero
        eyebrow={service.name}
        title={service.heroHeadline}
        lede={service.heroSub}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.name },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" variant="gold" magnetic className="btn-sheen w-full sm:w-auto">
            Get a free ad audit
          </Button>
          <ButtonLink
            href={whatsappLink(`Hi BasuGrow, I want to know more about ${service.name}`)}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline-dark"
            className="w-full sm:w-auto"
          >
            Ask a question on WhatsApp
          </ButtonLink>
        </div>
      </PageHero>

      {/* What's included */}
      <Section surface="bone">
        <div className="max-w-2xl">
          <Eyebrow>What&rsquo;s included</Eyebrow>
          <SectionTitle>What you actually get</SectionTitle>
        </div>
        <ul className="mt-12 grid gap-x-14 gap-y-10 md:grid-cols-2">
          {service.includes.map((item) => (
            <li key={item.title} className="border-ink/10 border-t pt-6">
              <h3 className="text-ink text-[1.125rem]">{item.title}</h3>
              <p className="text-slate mt-2.5 max-w-[36rem] text-[1rem]">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Fit */}
      <Section surface="sand">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="bg-ink/[0.05] text-ink mb-6 grid h-11 w-11 place-items-center rounded-xl">
              <Icon name={service.icon} />
            </span>
            <h2 className="text-ink text-[length:var(--text-lg)]">Right for you if</h2>
            <ul className="mt-6 space-y-3.5">
              {service.bestFor.map((item) => (
                <li key={item} className="text-slate flex gap-3 text-[1rem]">
                  <Check size={18} className="text-ink/50 mt-1 shrink-0" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-ink/12 bg-bone rounded-[var(--radius-card)] border-[1.5px] p-8">
            <span className="bg-ink/[0.05] text-ink mb-6 grid h-11 w-11 place-items-center rounded-xl">
              <X size={22} strokeWidth={1.75} aria-hidden />
            </span>
            <h2 className="text-ink text-[length:var(--text-lg)]">Not right if</h2>
            <p className="text-slate mt-6 text-[1rem]">{service.notFor}</p>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section surface="bone">
        <div className="max-w-2xl">
          <Eyebrow>How we run it</Eyebrow>
          <SectionTitle>The order things happen in</SectionTitle>
        </div>
        <ol className="mt-12 grid gap-8 md:grid-cols-4">
          {service.process.map((step, i) => (
            <li key={step.step}>
              <p className="text-slate/60 tnum text-[0.875rem] font-semibold">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="text-ink mt-3 text-[1.125rem]">{step.step}</h3>
              <p className="text-slate mt-2.5 text-[1rem]">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <FaqSection
        items={service.faqs}
        surface="sand"
        title={`${service.name}: common questions`}
        lede="Anything else, ask on WhatsApp and you will get a straight answer."
      />

      <FinalCta />
    </>
  );
}
