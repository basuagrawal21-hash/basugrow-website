import type { Faq } from './types';

/** Home page FAQ. Rendered as an accordion and as FAQPage JSON-LD. */
export const homeFaqs: Faq[] = [
  {
    q: 'What is the minimum ad budget I need?',
    a: 'We recommend starting at ₹20,000 a month in ad spend for most local businesses, and ₹40,000 or more for real estate and higher-value services. Below that, there is not enough data in a month to tell a good campaign from a bad one, and you end up paying for learning rather than leads.',
  },
  {
    q: 'How soon will leads start coming in?',
    a: 'Usually within the first few days of launch, though the first two to three weeks are a learning period where costs move around a lot. Judge the account at the end of the first month, not in the first week.',
  },
  {
    q: 'Do you guarantee a number of leads?',
    a: 'No, and we would be careful with anyone who does. Lead volume depends on your offer, your budget, your city, your competition and how fast you follow up — several of those are yours, not ours. What we commit to is the work: the campaigns, the creative, the tracking and the weekly changes.',
  },
  {
    q: 'Who owns the ad account and the data?',
    a: 'You do. The ad account, the pixel, the audiences and the historical data sit under your Business Manager, and we work inside it as a partner. If we stop working together we remove our access and you lose nothing.',
  },
  {
    q: 'Is the management fee separate from ad spend?',
    a: 'Yes. You pay Meta directly for the ads from your own account, and you pay us a monthly management fee for the work. We do not mark up ad spend or take a cut of it.',
  },
  {
    q: 'How long is the contract?',
    a: 'We ask for an initial three months because the first month is largely learning and judging an account on four weeks is unfair to everyone. After that it is monthly, and you can stop with 30 days notice.',
  },
  {
    q: 'Do you make the ad creatives, or do I have to send them?',
    a: 'We make them. For most clients that means we send a short shot list, you or your team film on a phone, and we cut, caption and size everything. Where you already have footage or a designer, we work with what you have.',
  },
  {
    q: 'Which cities do you work in?',
    a: 'All of them. We run campaigns for clients right across India — metros, tier-two cities and towns — and the work does not require us to be in your city. We are based in Jhansi, Uttar Pradesh, and everything from strategy to reporting happens over calls and WhatsApp.',
  },
  {
    q: 'How do I know what is happening with my money?',
    a: 'You get a live dashboard you can open whenever you like, a written monthly report covering spend, enquiries and cost per enquiry, and a fortnightly conversation about lead quality. You also have direct access to the ad account itself.',
  },
  {
    q: 'What do you need from me to get started?',
    a: 'Access to your Facebook page and ad account (or twenty minutes to set them up), a clear picture of what you sell and at what price, someone who can call new enquiries the same day, and about twenty minutes a week to film. That is genuinely it.',
  },
];

/** Shown on /pricing. Deliberately about money only. */
export const pricingFaqs: Faq[] = [
  {
    q: 'What exactly am I paying you for?',
    a: 'The management fee covers strategy, campaign build and daily management, creative production, the landing page or form, tracking setup, and reporting. Your ad spend is separate and goes straight to Meta from your own account.',
  },
  {
    q: 'Can I change plans later?',
    a: 'Yes, up or down, from the next billing month. Most clients start on Starter or Growth and move once they can see what a lead is worth to them.',
  },
  {
    q: 'Is there a setup fee?',
    a: 'The first month includes account setup, tracking, creative and the landing page, which is the heaviest month of work. We do not charge a separate setup fee on top of it.',
  },
  {
    q: 'What if I want to pause for a month?',
    a: 'Tell us before the billing date and we pause the campaigns and the fee. Pausing has a cost in performance, because the account partly relearns when it restarts, and we will explain that before you decide.',
  },
  {
    q: 'Do you work on a commission or revenue share?',
    a: 'Not usually. It requires visibility into your sales data that most local businesses cannot practically give, and it creates an incentive to chase volume over quality. For the right business with clean numbers we will discuss it.',
  },
];
