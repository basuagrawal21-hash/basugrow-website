import type { CaseStudy } from './types';

/**
 * TODO(real-data): Every case study below is illustrative. Replace with real
 * campaign data before launch.
 *
 * For each one the owner needs to supply:
 *   - client name + written permission to name them (or keep them anonymised
 *     as "a gym in Gomti Nagar" — that is fine and still credible)
 *   - actual spend, actual lead count, actual cost per lead, actual date range
 *   - one sentence from the client about what changed for their business
 *
 * Until `isSample` is set to false, every card renders a visible "Sample"
 * badge and the numbers are shown as illustrative. Do not remove that badge
 * without replacing the numbers.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'gym-trial-campaign',
    client: 'Fitness studio',
    industry: 'Gyms & fitness',
    city: 'Lucknow',
    headline: 'Trial passes booked from a two-kilometre radius',
    timeframe: '90 days',
    isSample: true,
    metrics: [
      { label: 'Ad spend', value: '₹60,000' },
      { label: 'Enquiries', value: '500' },
      { label: 'Cost per enquiry', value: '₹120' },
      { label: 'Trials attended', value: '180', note: 'of 500 enquiries' },
    ],
    problem:
      'The studio was boosting posts a few times a month and judging them on reach. Enquiries arrived as Instagram DMs that nobody checked until closing time, and most were from people too far away to ever attend.',
    approach: [
      'Replaced boosted posts with a lead campaign built around a three-day trial pass instead of a membership pitch.',
      'Cut the targeting radius to two kilometres and added the localities existing members already came from.',
      'Shot creative on the floor during peak hours — real trainers, real members, captions burned in for muted viewing.',
      'Routed every enquiry to WhatsApp instantly, with an automatic reply offering two trial slots.',
    ],
    result:
      'Enquiries arrived at a cost the studio could justify against a membership value, and roughly a third of them turned up for the trial. The floor team handled conversion from there.',
    whatChanged:
      'The offer. A trial pass asks for an afternoon; a membership asks for a year, and no ad closes that.',
  },
  {
    slug: 'dental-clinic-consults',
    client: 'Dental clinic',
    industry: 'Clinics & dental',
    city: 'Lucknow',
    headline: 'Aligner consultations booked without discounting treatment',
    timeframe: '120 days',
    isSample: true,
    metrics: [
      { label: 'Ad spend', value: '₹90,000' },
      { label: 'Enquiries', value: '250' },
      { label: 'Cost per enquiry', value: '₹360' },
      { label: 'Consults booked', value: '95', note: 'of 250 enquiries' },
    ],
    problem:
      'One general "best dental clinic" campaign was running against every other clinic in the city, and the enquiries that came in asked only about price. Nothing distinguished the practice from the one two streets away.',
    approach: [
      'Split the account into treatment-specific campaigns, starting with clear aligners where the ticket value justified the spend.',
      'Led with a paid first consultation rather than a discounted treatment price, which filtered out price-shoppers.',
      'Wrote copy that explained the process and the realistic timeline, with no outcome claims that Meta would reject or patients would distrust.',
      'Added WhatsApp as an enquiry route, which patients used far more than the form for a visible-appearance treatment.',
    ],
    result:
      'Fewer enquiries than the general campaign produced, at a higher cost each, but a much larger share booked and attended a consultation.',
    whatChanged:
      'Narrowing to one treatment. A specific ad for one procedure beats a general ad for a whole clinic.',
  },
  {
    slug: 'real-estate-site-visits',
    client: 'Property consultancy',
    industry: 'Real estate',
    city: 'Lucknow',
    headline: 'Site visits from qualified buyers instead of portal leads',
    timeframe: '60 days',
    isSample: true,
    metrics: [
      { label: 'Ad spend', value: '₹1,50,000' },
      { label: 'Enquiries', value: '200' },
      { label: 'Cost per enquiry', value: '₹750' },
      { label: 'Site visits', value: '42', note: 'attended, not just booked' },
    ],
    problem:
      'The team was buying leads from a property portal that sold the same enquiry to several brokers. Callers were already annoyed by the third call and the sales team was burning hours on people who had no budget for the project.',
    approach: [
      'Built a campaign around one project with an honest price band stated in the ad, which removed most of the mismatched enquiries immediately.',
      'Asked budget, timeline and preferred locality in the form, before anyone spent a call on them.',
      'Retargeted people who watched most of the walkthrough video with a site-visit invitation rather than the same cold message.',
      'Set the conversion event to site visits booked, so the account optimised for the thing that leads to a sale.',
    ],
    result:
      'Cost per enquiry was higher than the portal charged, but a far larger proportion reached an attended site visit, and the leads were exclusive.',
    whatChanged:
      'Putting the price in the ad. It cut enquiry volume and raised the number of people worth driving to a site.',
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
