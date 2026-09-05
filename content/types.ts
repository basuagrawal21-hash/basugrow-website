/**
 * Shared content types.
 *
 * Everything the site renders as marketing copy lives in `content/` as typed
 * objects so it can be edited without touching JSX. See README "Editing content".
 */

export type IconName =
  | 'target'
  | 'megaphone'
  | 'message-circle'
  | 'palette'
  | 'layout-template'
  | 'line-chart'
  | 'dumbbell'
  | 'stethoscope'
  | 'building-2'
  | 'scissors'
  | 'graduation-cap'
  | 'utensils';

export type Service = {
  slug: string;
  /** Nav/card label. Short. */
  name: string;
  /** One line, outcome-first. Used on cards and in meta descriptions. */
  summary: string;
  icon: IconName;
  /** Page h1. Says what you get, not what we do. */
  heroHeadline: string;
  heroSub: string;
  /** Concrete deliverables — the things that actually land in the client's inbox. */
  includes: { title: string; body: string }[];
  /** Who this is right for, plainly. */
  bestFor: string[];
  /** Who it is not for. Honesty beats reach. */
  notFor: string;
  process: { step: string; body: string }[];
  faqs: Faq[];
};

export type Industry = {
  slug: string;
  name: string;
  /** Plural noun used mid-sentence, e.g. "gyms and fitness studios". */
  longName: string;
  icon: IconName;
  /** The specific thing that goes wrong for this industry's ads. */
  pain: string;
  heroHeadline: string;
  heroSub: string;
  /** Bullet list of what a campaign for this industry actually contains. */
  playbook: { title: string; body: string }[];
  /** Illustrative benchmark range. Always rendered with a "typical range" caveat. */
  cplRange: string;
  /** Slug of the case study to feature on this page, if any. */
  caseStudySlug?: string;
};

export type CaseStudyMetric = {
  label: string;
  value: string;
  /** Optional smaller note under the figure. */
  note?: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  city: string;
  /** Headline result, one line. */
  headline: string;
  timeframe: string;
  metrics: CaseStudyMetric[];
  problem: string;
  approach: string[];
  result: string;
  /** One line summarising the single change that mattered most. */
  whatChanged: string;
  /** True until real client data replaces the illustrative figures. */
  isSample: boolean;
};

export type Testimonial = {
  quote: string;
  name: string;
  business: string;
  city: string;
  /** Path under /public. Null renders a monogram avatar instead. */
  photo: string | null;
  isSample: boolean;
};

export type Faq = {
  q: string;
  /** Plain text. Rendered into JSON-LD FAQPage as-is, so no markup. */
  a: string;
};

export type PricingTier = {
  slug: string;
  name: string;
  /** Who should pick this one. */
  tagline: string;
  /** Monthly management fee in rupees, or null for "custom". */
  priceMonthly: number | null;
  /** Ad spend the tier is designed around. Not charged by us. */
  adSpendRange: string;
  includes: string[];
  /** Rendered as the emphasised tier. Exactly one tier should set this. */
  featured: boolean;
  ctaLabel: string;
};

export type ProcessStep = {
  n: number;
  title: string;
  body: string;
};

export type FailureMode = {
  wrong: string;
  right: string;
};
