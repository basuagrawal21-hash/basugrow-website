import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { PageHero } from '@/components/sections/page-hero';
import { Section } from '@/components/ui/section';
import { site, whatsappLink } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = {
  ...pageMetadata({
    title: 'Thanks — we have your enquiry',
    description: 'We have your details and will be in touch within 2 working hours.',
    path: '/thank-you',
  }),
  // Nothing to index here, and it should never appear in search results.
  robots: { index: false, follow: false },
};

const steps = [
  {
    title: 'We read it properly',
    body: 'Not an auto-responder. Someone looks at what you sell, who you are competing with locally, and what you said you are spending.',
  },
  {
    title: 'You hear from us within 2 working hours',
    body: `We message the WhatsApp number you gave us from ${site.contact.phoneDisplay}. Save it so it does not look like a spam number.`,
  },
  {
    title: 'We send the audit, then you decide',
    body: 'A realistic range for what your budget could produce, and what we would change first. If we do not think ads are right for you yet, we will say that instead.',
  },
];

export default function ThankYouPage() {
  return (
    <>
      <PageHero
        eyebrow="Enquiry received"
        title="Got it. We'll be in touch shortly."
        lede="Your details are with us. Here is exactly what happens next, so you are not left wondering."
      />

      <Section surface="bone">
        <ol className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title}>
              <p className="text-slate/60 tnum text-[0.875rem] font-semibold">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h2 className="text-ink mt-3 text-[1.125rem]">{step.title}</h2>
              <p className="text-slate mt-2.5 text-[1rem]">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="border-ink/12 bg-sand/60 mt-14 flex flex-col items-start gap-5 rounded-[var(--radius-card)] border-[1.5px] p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-ink text-[1.125rem]">In a hurry?</h2>
            <p className="text-slate mt-1.5 text-[0.9375rem]">
              Message us directly and we will pick it up straight away.
            </p>
          </div>
          <a
            href={whatsappLink('Hi BasuGrow, I just submitted the form on your site')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-ink text-bone hover:bg-night inline-flex h-12 shrink-0 items-center gap-2.5 rounded-full px-6 font-medium transition-colors"
          >
            <MessageCircle size={18} aria-hidden />
            WhatsApp us
          </a>
        </div>

        <p className="text-slate mt-10 text-[0.9375rem]">
          While you wait,{' '}
          <Link
            href="/tools/cpl-calculator"
            className="text-ink hover:decoration-ink/60 underline decoration-[1.5px] underline-offset-4"
          >
            work out what a customer costs you
          </Link>{' '}
          — it makes the call more useful.
        </p>
      </Section>
    </>
  );
}
