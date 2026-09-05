import { PageHero } from '@/components/sections/page-hero';
import { Section, Eyebrow, SectionTitle, Lede } from '@/components/ui/section';
import { FinalCta } from '@/components/sections/final-cta';
import { site } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'About',
  description:
    'BasuGrow is a small performance marketing agency based in Jhansi, running Meta ads and lead systems for local businesses across India.',
  path: '/about',
});

/**
 * TODO(real-data): The "why this exists" section is written from what is known
 * — a small, owner-run agency in Jhansi running Meta ads across India — and
 * deliberately contains no invented biography.
 *
 * To finish this page the owner needs to supply:
 *   - how and why BasuGrow started, in their own words
 *   - what they did before this
 *   - a founder photo (/public/team/founder.jpg, 800px+ square)
 *   - any other team members
 */
const principles = [
  {
    title: 'The ad account stays yours',
    body: 'Everything is built inside your own Business Manager. If we stop working together you keep the account, the pixel, the audiences and the history. Agencies that hold your account hostage are relying on it.',
  },
  {
    title: 'The offer comes before the media buying',
    body: 'Most campaigns that fail were doomed at the offer. If what you sell is not compelling at the price you are asking, no amount of targeting rescues it, and we will say so before you pay us.',
  },
  {
    title: 'Numbers that map to money',
    body: 'Reach and impressions are not results. We report spend, enquiries, cost per enquiry and, where you can tell us, how many became customers. If a metric would not change a decision, it does not go in the report.',
  },
  {
    title: 'No guarantees, because nobody can give them',
    body: 'Lead volume depends on your offer, your budget, your market and how fast you follow up. Two of those are ours and two are yours. Anyone promising a fixed number of leads is guessing.',
  },
];

const notFor = [
  'Businesses that cannot answer an enquiry within a few hours',
  'Anyone looking for followers, reach or a content calendar',
  'Ad budgets under about ₹20,000 a month, where one month produces too little data to learn from',
  'Businesses that want a guaranteed number of leads written into a contract',
  'Anyone who wants us to hold their ad account so they cannot leave',
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A small agency that would rather be useful than impressive"
        lede={`BasuGrow runs Meta ads and lead systems for local businesses across India. We are based in ${site.base.city}, and we work with owners who need enquiries they can call, not a report they cannot read.`}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      <Section surface="bone">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Eyebrow>Why this exists</Eyebrow>
          <div className="prose-body">
            <SectionTitle className="text-[length:var(--text-lg)]">
              Most local businesses have already been burned once
            </SectionTitle>
            {/* TODO(real-data): replace with the founder's own account. */}
            <p className="text-slate mt-5 text-[1.0625rem]">
              Almost every owner we speak to has paid someone before. Usually they got a content
              calendar, a monthly report full of reach and impressions, and no way to tell whether
              any of it produced a customer. The money went somewhere and nothing arrived.
            </p>
            <p className="text-slate mt-4 text-[1.0625rem]">
              BasuGrow exists to do the narrow thing that actually moves a local business: build an
              offer worth responding to, put it in front of the right people, and get the enquiry
              onto the owner&rsquo;s phone fast enough to call while they are still interested.
            </p>
            <p className="text-slate mt-4 text-[1.0625rem]">
              We are small on purpose. A handful of accounts, each watched properly, is worth more
              than a long client list managed at arm&rsquo;s length.
            </p>
          </div>
        </div>
      </Section>

      <Section surface="sand">
        <div className="max-w-2xl">
          <Eyebrow>How we work</Eyebrow>
          <SectionTitle>Four things we will not bend on</SectionTitle>
        </div>
        <ul className="mt-12 grid gap-x-14 gap-y-10 md:grid-cols-2">
          {principles.map((item) => (
            <li key={item.title} className="border-ink/12 border-t pt-6">
              <h3 className="text-ink text-[1.125rem]">{item.title}</h3>
              <p className="text-slate mt-2.5 max-w-[36rem] text-[1rem]">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section surface="bone">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Eyebrow>Who we&rsquo;re not for</Eyebrow>
          <div>
            <SectionTitle className="text-[length:var(--text-lg)]">
              We would rather say no early
            </SectionTitle>
            <Lede>
              Taking on a business we cannot help wastes their money and our time. If you are on
              this list, we will say so on the first call.
            </Lede>
            <ul className="mt-8 space-y-3.5">
              {notFor.map((item) => (
                <li key={item} className="border-ink/10 text-slate border-t pt-3.5 text-[1rem]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
