import { MessageCircle, Mail, MapPin, Clock } from 'lucide-react';
import { PageHero } from '@/components/sections/page-hero';
import { Section } from '@/components/ui/section';
import { LeadForm } from '@/components/sections/lead-form';
import { InstagramGlyph } from '@/components/ui/icons';
import { site, whatsappLink } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Get a free ad audit. Tell us what you sell and we will give you a realistic range for what your budget could produce. We reply within 2 working hours.',
  path: '/contact',
});

export default function ContactPage() {
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you sell"
        lede="We will look at your offer, your market and what you are spending now, then give you a realistic range for what your budget could produce. Free, and there is no deck."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <Section surface="bone">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div>
            <h2 className="text-ink text-[length:var(--text-lg)]">Send us the details</h2>
            <p className="text-slate mt-3 max-w-[38rem] text-[1rem]">
              Six fields. The more you tell us about the offer, the more useful the audit is.
            </p>
            <div className="mt-8">
              <LeadForm />
            </div>
          </div>

          <aside className="space-y-5">
            <div className="border-ink/12 bg-sand/60 rounded-[var(--radius-card)] border-[1.5px] p-7">
              <h2 className="text-ink text-[1.125rem]">Rather just message?</h2>
              <p className="text-slate mt-2 text-[0.9375rem]">
                WhatsApp is the fastest way to reach us, and it is a person on the other end.
              </p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ink text-bone hover:bg-night mt-5 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full px-5 font-medium transition-colors"
              >
                <MessageCircle size={18} aria-hidden />
                WhatsApp {site.contact.phoneDisplay}
              </a>
            </div>

            {calLink && (
              <div className="border-ink/12 bg-sand/60 rounded-[var(--radius-card)] border-[1.5px] p-7">
                <h2 className="text-ink text-[1.125rem]">Book a 20-minute call</h2>
                <p className="text-slate mt-2 text-[0.9375rem]">
                  Pick a slot that suits you and we will call on WhatsApp.
                </p>
                <a
                  href={`https://cal.com/${calLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-ink/25 text-ink hover:border-ink/50 hover:bg-bone mt-5 inline-flex h-12 w-full items-center justify-center rounded-full border-[1.5px] px-5 font-medium transition-colors"
                >
                  See available times
                </a>
              </div>
            )}

            <div className="border-ink/12 rounded-[var(--radius-card)] border-[1.5px] p-7">
              <ul className="space-y-4 text-[0.9375rem]">
                <li className="flex gap-3">
                  <Clock size={17} className="text-slate mt-0.5 shrink-0" aria-hidden />
                  <span className="text-slate">{site.contact.responsePromise}</span>
                </li>
                <li className="flex gap-3">
                  <Mail size={17} className="text-slate mt-0.5 shrink-0" aria-hidden />
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="text-ink hover:decoration-ink/60 break-all underline decoration-[1.5px] underline-offset-4"
                  >
                    {site.contact.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <InstagramGlyph size={17} className="text-slate mt-0.5 shrink-0" />
                  <a
                    href={site.contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:decoration-ink/60 underline decoration-[1.5px] underline-offset-4"
                  >
                    @{site.contact.instagram}
                  </a>
                </li>
                <li className="flex gap-3">
                  <MapPin size={17} className="text-slate mt-0.5 shrink-0" aria-hidden />
                  <span className="text-slate">
                    {site.base.city}, {site.base.state} — working with clients across India
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
