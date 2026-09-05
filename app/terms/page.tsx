import { PageHero } from '@/components/sections/page-hero';
import { Section } from '@/components/ui/section';
import { LegalProse } from '@/components/ui/legal-prose';
import { site } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Terms',
  description: `The terms that apply to using the ${site.name} website and to working with us.`,
  path: '/terms',
});

/**
 * TODO(legal): Plain-language terms describing how the site and the service
 * actually work. Not drafted or reviewed by a lawyer. Have these checked, and
 * confirm the notice period and payment terms match what is actually agreed
 * with clients, before launch.
 */
export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="The rules, in language you can actually read"
        lede="What this website is, what we promise, and what we do not."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Terms' }]}
      />

      <Section surface="bone">
        <div className="max-w-[44rem]">
          <LegalProse>
            <p className="text-slate text-[0.9375rem]">Last updated: September 2026</p>

            <h2>About this site</h2>
            <p>
              This website is operated by {site.name}, based in {site.base.city},{' '}
              {site.base.state}, India. By using it you accept the terms below.
            </p>

            <h2>What is on here is information, not a promise</h2>
            <p>
              The benchmark ranges, calculator outputs, pricing and case studies on this site are
              provided to help you make a decision. They are estimates and examples, not
              commitments. Any figures marked as samples are illustrative and do not describe a
              specific client account.
            </p>
            <p>
              Advertising results depend on your offer, your budget, your market, your competition
              and how quickly you follow up on enquiries. Several of those are outside our control.
              We do not guarantee a number of leads, a cost per lead, a return on ad spend, or any
              other outcome, and nothing on this site should be read as such a guarantee.
            </p>

            <h2>The calculators</h2>
            <p>
              They run in your browser and are deliberately simple. They assume costs stay flat as
              budgets grow, which in practice they usually do not. Use them to think, not to plan
              your finances.
            </p>

            <h2>Working with us</h2>
            <ul>
              <li>Management fees are separate from your ad spend. You pay Meta directly.</li>
              <li>We never take a percentage of, or a mark-up on, your ad spend.</li>
              <li>The ad account, pixel, audiences and data belong to you and stay with you.</li>
              <li>
                Engagements start with an initial three months, then continue monthly with 30 days
                notice from either side.
              </li>
              <li>
                Work delivered — creative files, landing pages, tracking setup — is yours once
                invoices for it are paid.
              </li>
            </ul>
            <p>
              Where a signed proposal or agreement says something different from this page, the
              signed document wins.
            </p>

            <h2>Our relationship with Meta</h2>
            <p>
              We buy advertising on Meta&rsquo;s platforms. We are an independent agency and are not
              affiliated with, certified by, endorsed by, or acting on behalf of Meta Platforms,
              Facebook, Instagram or WhatsApp. Those platforms set their own rules and can change
              them, reject ads, or restrict accounts at their discretion.
            </p>

            <h2>Content on this site</h2>
            <p>
              The words, design and code here belong to {site.name}. Quote us with a link — please
              do not republish pages wholesale.
            </p>

            <h2>Liability</h2>
            <p>
              We do our best to keep this site accurate and available, but we provide it as is. We
              are not liable for losses arising from decisions made on the basis of information on
              this site. Nothing here limits liability that cannot be limited under Indian law.
            </p>

            <h2>Questions</h2>
            <p>
              Email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. These terms
              are governed by the laws of India.
            </p>
          </LegalProse>
        </div>
      </Section>
    </>
  );
}
