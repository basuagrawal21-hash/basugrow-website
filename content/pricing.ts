import type { PricingTier } from './types';

/**
 * TODO(real-data): Confirm the three monthly management fees below with the
 * owner before launch. They are placeholders positioned at plausible Indian
 * market rates for a small performance agency, but they are not BasuGrow's
 * actual published prices until confirmed.
 *
 * Set `priceMonthly` to null on any tier that should show "Let's talk" instead
 * of a figure.
 */
export const pricingTiers: PricingTier[] = [
  {
    slug: 'starter',
    name: 'Starter',
    tagline: 'One location, one offer, getting the first predictable enquiries in.',
    priceMonthly: 15000,
    adSpendRange: '₹20,000 – ₹50,000 a month',
    featured: false,
    ctaLabel: 'Start here',
    includes: [
      'One lead campaign, managed daily',
      'Ad account, Business Manager and pixel setup',
      'Meta instant form or a single landing page',
      'WhatsApp lead delivery with an automatic first reply',
      '4 new creatives a month',
      'Monthly report and a live dashboard',
      'WhatsApp support, same working day',
    ],
  },
  {
    slug: 'growth',
    name: 'Growth',
    tagline: 'Multiple offers or locations, with creative refreshed before it tires.',
    priceMonthly: 30000,
    adSpendRange: '₹50,000 – ₹2,00,000 a month',
    featured: true,
    ctaLabel: 'Most businesses start here',
    includes: [
      'Everything in Starter',
      'Up to three campaigns — cold, retargeting and one test',
      'Conversions API set up alongside the pixel',
      'A landing page per core offer, speed-tested',
      '8–10 new creatives a month, including reels',
      'Fortnightly lead-quality review with your team',
      'Follow-up scripts and reminder automation',
    ],
  },
  {
    slug: 'scale',
    name: 'Scale',
    tagline: 'Several branches or a serious monthly budget that needs watching daily.',
    priceMonthly: 60000,
    adSpendRange: '₹2,00,000+ a month',
    featured: false,
    ctaLabel: 'Talk to us',
    includes: [
      'Everything in Growth',
      'Multi-location or multi-branch campaign structure',
      'Offline conversion feedback so the account optimises on customers',
      'Structured creative testing with a documented test log',
      'Weekly call, not just a monthly report',
      'Landing page A/B testing where volume allows',
      'Quarterly strategy session on offer and pricing',
    ],
  },
  {
    slug: 'custom',
    name: 'Something else',
    tagline: 'A one-off audit, a rescue on an account that broke, or a build you own afterwards.',
    priceMonthly: null,
    adSpendRange: 'Whatever fits',
    featured: false,
    ctaLabel: 'Tell us what you need',
    includes: [
      'Standalone ad account audit',
      'Tracking and Conversions API rebuild',
      'Landing page build without ongoing management',
      'Creative production only',
      'Training for an in-house marketer',
    ],
  },
];

/** Displayed under the pricing grid. Non-negotiable clarity about what the fee is. */
export const pricingNote =
  'Management fees are separate from ad spend. You pay Meta directly from your own ad account, and we never take a cut of it or mark it up. Prices are exclusive of GST.';
