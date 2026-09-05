import { PageHero } from '@/components/sections/page-hero';
import { Section } from '@/components/ui/section';
import { LegalProse } from '@/components/ui/legal-prose';
import { site } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Privacy policy',
  description: `How ${site.name} collects, uses and stores the information you give us through this website.`,
  path: '/privacy',
});

/**
 * TODO(legal): This is a plain-language policy written to describe what the
 * site actually does. It is not legal advice and has not been reviewed by a
 * lawyer. Before launch, have it checked against India's DPDP Act 2023,
 * confirm the retention period, and add a registered business address if one
 * exists.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="What we collect, and what we do with it"
        lede="Short version: we collect what you type into the contact form so we can reply to you, plus anonymous analytics. We do not sell anything to anyone."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy' }]}
      />

      <Section surface="bone">
        <div className="max-w-[44rem]">
          <LegalProse>
            <p className="text-slate text-[0.9375rem]">Last updated: September 2026</p>

            <h2>Who we are</h2>
            <p>
              {site.name} is a performance marketing agency based in {site.base.city},{' '}
              {site.base.state}, India. You can reach us at{' '}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> or on WhatsApp at{' '}
              {site.contact.phoneDisplay}.
            </p>

            <h2>What we collect</h2>
            <ul>
              <li>
                <strong>What you send us.</strong> Your name, business name, WhatsApp number,
                industry, budget range and anything you write in the message field of the contact
                form.
              </li>
              <li>
                <strong>Usage data.</strong> If analytics is enabled, anonymous information about
                which pages you visited and roughly where in the world you are. This does not
                identify you.
              </li>
              <li>
                <strong>Advertising data.</strong> If the Meta Pixel is enabled, Meta may record
                that you visited this site so we can measure our own advertising. Meta&rsquo;s use
                of that data is governed by their policies, not ours.
              </li>
            </ul>
            <p>
              Our free calculators run entirely in your browser. The numbers you put into them are
              never sent to us or to anyone else.
            </p>

            <h2>Why we collect it</h2>
            <p>
              To reply to your enquiry, to prepare the audit you asked for, and to understand which
              pages of this site are useful. That is all. We do not sell, rent or share your details
              with third parties for their own marketing.
            </p>

            <h2>Who can see it</h2>
            <p>
              Your enquiry reaches our email inbox and, where configured, a private spreadsheet only
              we can access. We use Resend to deliver the email and Vercel to host the site; both
              process data on our behalf. Nobody else sees your enquiry.
            </p>

            <h2>How long we keep it</h2>
            <p>
              Enquiries are kept for as long as we might reasonably be working together, and for up
              to two years afterwards for our own records. Ask us to delete yours sooner and we
              will.
            </p>

            <h2>Your choices</h2>
            <ul>
              <li>Ask for a copy of what we hold about you.</li>
              <li>Ask us to correct anything that is wrong.</li>
              <li>Ask us to delete it.</li>
              <li>Tell us to stop contacting you, at any time, and we will.</li>
            </ul>
            <p>
              Email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> and we will
              action it within 30 days.
            </p>

            <h2>Cookies</h2>
            <p>
              This site sets no cookies of its own. Analytics and the Meta Pixel, where enabled, set
              their own — you can block these in your browser settings or with any ad blocker, and
              the site will work exactly the same.
            </p>

            <h2>Changes</h2>
            <p>
              If this policy changes we will update the date at the top. Material changes will be
              obvious rather than buried.
            </p>
          </LegalProse>
        </div>
      </Section>
    </>
  );
}
