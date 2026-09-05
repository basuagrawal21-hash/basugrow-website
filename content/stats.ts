/**
 * TODO(real-data): The three trust-bar figures below are placeholders.
 *
 * The owner needs to supply, from Ads Manager:
 *   - total leads generated across all client accounts, and the period it covers
 *   - total ad spend managed
 *   - a defensible average cost per lead, or the range across categories
 *
 * Until `isVerified` is true, the bar renders each figure with a "sample"
 * marker and the section is honest that the numbers are illustrative. Do not
 * flip that flag without real numbers behind it — the whole site's credibility
 * rests on the metrics being real.
 */
export const trustStats = {
  isVerified: false,
  items: [
    {
      label: 'Leads delivered to clients',
      value: 12000,
      prefix: '',
      suffix: '+',
      note: 'across all accounts',
    },
    {
      label: 'Ad spend managed',
      value: 45,
      prefix: '₹',
      suffix: 'L+',
      note: 'lifetime, client accounts',
    },
    {
      label: 'Typical cost per enquiry',
      value: 180,
      prefix: '₹',
      suffix: '',
      note: 'varies a lot by category',
    },
  ],
} as const;

/**
 * TODO(real-data): Client logos. Drop SVG or transparent PNG files into
 * /public/clients/ and list them here as { name, src }. The marquee only
 * renders real logos — while this array is empty it shows the categories
 * BasuGrow works with instead, which is honest and still fills the space.
 * Do not add a logo without written permission to display it.
 */
export const clientLogos: { name: string; src: string }[] = [];

/** Shown in place of logos until real ones are supplied. */
export const clientCategories = [
  'Gyms & fitness studios',
  'Dental & derma clinics',
  'Real estate',
  'Salons & spas',
  'Coaching institutes',
  'Restaurants & cafés',
];
