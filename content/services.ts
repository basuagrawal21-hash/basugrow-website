import type { Service } from './types';

export const services: Service[] = [
  {
    slug: 'meta-ads-management',
    name: 'Meta Ads Management',
    summary:
      'Campaigns built, tested and cut every week on Facebook and Instagram — with the ad account in your name.',
    icon: 'target',
    heroHeadline: 'Meta ads run like a budget, not a hobby',
    heroSub:
      'Most local businesses boost a post, watch the reach number climb, and get nothing they can call. We build proper campaigns in Ads Manager, test them against each other, and kill what does not produce enquiries.',
    includes: [
      {
        title: 'Account and Business Manager setup',
        body: 'Ad account, Business Manager, page roles and payment method configured under your ownership. If you already have an account, we audit it before we spend anything in it.',
      },
      {
        title: 'Campaign architecture',
        body: 'Objectives, audiences and budgets structured so results are readable. One campaign that mixes cold and warm audiences tells you nothing, so we do not build them that way.',
      },
      {
        title: 'Weekly testing',
        body: 'New creative and new angles go live every week against the current best performer. Losers are switched off, winners get the budget.',
      },
      {
        title: 'Audience and placement work',
        body: 'Interest, lookalike and retargeting audiences built from your own customer data where you have it. Placements pruned to the ones that actually convert for your offer.',
      },
      {
        title: 'Budget pacing',
        body: 'Spend monitored against your monthly number so you are not surprised on the 28th. Scaling happens in steps that the algorithm can absorb.',
      },
      {
        title: 'A named person, not a ticket queue',
        body: 'You have one contact on WhatsApp who knows your account. Questions get answered the same working day.',
      },
    ],
    bestFor: [
      'Local businesses with a clear offer and someone who can call leads back',
      'Owners spending ₹20,000 a month or more on ads, or ready to start there',
      'Businesses that have tried boosting posts and want to see the difference',
    ],
    notFor:
      'If nobody at your business can call a new enquiry within a few hours, ads will not fix that — and we will say so before you pay us.',
    process: [
      {
        step: 'Audit and offer',
        body: 'We look at what you sell, at what price, and against whom. If the offer is the problem, we fix that first — no amount of media buying rescues a weak offer.',
      },
      {
        step: 'Build',
        body: 'Campaign structure, audiences, creative and the form or landing page go up together. Tracking is verified before the first rupee is spent.',
      },
      {
        step: 'Learn',
        body: 'The first two to three weeks are for finding which audience and angle produce enquiries at a sane cost. Expect volatility here; it is normal and we explain it as it happens.',
      },
      {
        step: 'Scale and maintain',
        body: 'Budget shifts to what works, creative gets refreshed before it fatigues, and you get a report you can actually read.',
      },
    ],
    faqs: [
      {
        q: 'Do I need a Facebook page and an Instagram account already?',
        a: 'A Facebook page is required to run ads. An Instagram account is strongly recommended because a large share of enquiries in India come through Instagram placements. If you do not have either, we set them up as part of onboarding.',
      },
      {
        q: 'Who pays Meta for the ads?',
        a: 'You do, directly, with your own card or account on your own ad account. Our management fee is separate and is invoiced by us. We never mark up your ad spend.',
      },
      {
        q: 'What happens to the ad account if we stop working together?',
        a: 'It stays with you, along with the pixel, the audiences and the historical data. We remove our access and nothing else changes.',
      },
    ],
  },
  {
    slug: 'lead-generation-campaigns',
    name: 'Lead Generation Campaigns',
    summary:
      'Offer, form and follow-up designed together so the enquiries that come in are worth calling.',
    icon: 'megaphone',
    heroHeadline: 'Enquiries you would actually want to call back',
    heroSub:
      'Cheap leads are easy to buy and useless to work. We design the offer, the form questions and the follow-up sequence as one thing, so the person on the other end knows what they signed up for.',
    includes: [
      {
        title: 'Offer design',
        body: 'A specific reason to enquire this week — a trial, a consultation, a first-visit price, a site visit. "Contact us" is not an offer and it does not fill a form.',
      },
      {
        title: 'Instant forms or landing page',
        body: 'We pick based on your sales process, not on habit. Instant forms produce volume; landing pages produce intent. Sometimes we run both and compare.',
      },
      {
        title: 'Qualifying questions',
        body: 'Two or three questions that filter out people you cannot serve — wrong locality, wrong budget, wrong timeline. Fewer, better leads beats a full inbox of dead numbers.',
      },
      {
        title: 'Lead volume forecasting',
        body: 'Before we start, you get a range of what your budget could produce at realistic costs for your category, so nobody is guessing.',
      },
      {
        title: 'Follow-up scripts',
        body: 'What to say on the first call, what to send if they do not pick up, and when to stop. Written for your business, not a generic template.',
      },
      {
        title: 'Lead quality review',
        body: 'Every fortnight we go through what came in with you. Bad leads are a targeting signal, and we use them.',
      },
    ],
    bestFor: [
      'Service businesses where a phone call closes the sale',
      'Anyone whose current ads produce clicks but no conversations',
      'Businesses ready to answer enquiries within the hour',
    ],
    notFor:
      'E-commerce stores selling low-value products at scale. That is a different job with different metrics and you would be better served by a specialist.',
    process: [
      {
        step: 'Map the sale',
        body: 'We work out how someone actually becomes your customer today — who calls, how fast, what they say. The campaign is built to feed that, not to replace it.',
      },
      {
        step: 'Write the offer',
        body: 'One clear thing to say yes to, with a reason to do it now that is genuinely true.',
      },
      {
        step: 'Build and launch',
        body: 'Form, creative and delivery route go live together, tested end to end with a real submission before traffic starts.',
      },
      {
        step: 'Tighten',
        body: 'Questions, audiences and creative get adjusted based on which leads turned into customers, not on which ads got the most likes.',
      },
    ],
    faqs: [
      {
        q: 'How many leads will I get?',
        a: 'That depends on your budget, your offer, your city and your category, so we give you a realistic range after looking at all four rather than a number up front. We do not guarantee lead volumes, and you should be careful with anyone who does.',
      },
      {
        q: 'What counts as a qualified lead?',
        a: 'We agree the definition with you before launch — usually someone in your service area, in your price range, who asked for the specific thing you offered. Anything outside that is a targeting problem for us to fix, not a lead you should be paying for.',
      },
      {
        q: 'Can you also handle calling the leads?',
        a: 'No. We build the system that delivers enquiries to you and we write the scripts, but your team makes the calls. Nobody sells your service as well as you do.',
      },
    ],
  },
  {
    slug: 'whatsapp-lead-delivery',
    name: 'WhatsApp Lead Delivery & Automation',
    summary:
      'Every enquiry lands on your phone within seconds, with an automatic first reply while you get free.',
    icon: 'message-circle',
    heroHeadline: 'The lead reaches your phone before they close the app',
    heroSub:
      'A lead that sits in a spreadsheet until evening is a lead someone else called at 2pm. We route every submission to WhatsApp instantly and send an automatic first message so the conversation starts even when you are mid-session.',
    includes: [
      {
        title: 'Instant WhatsApp notification',
        body: 'Name, number, and their answers arrive on your phone as a message, not as an email you will read tomorrow. Multiple team members can be on the route.',
      },
      {
        title: 'Automatic first reply',
        body: 'The person who just enquired gets a message from you within seconds confirming what they asked for and when you will call. Response time is the single biggest lever on close rate.',
      },
      {
        title: 'Click-to-WhatsApp campaigns',
        body: 'Where it suits the business, ads open a WhatsApp chat directly instead of a form. Fewer steps, warmer conversations, and the number is real by definition.',
      },
      {
        title: 'Lead log',
        body: 'Everything also appends to a Google Sheet or your CRM so nothing lives only in a chat thread. Sortable, exportable, yours.',
      },
      {
        title: 'Follow-up reminders',
        body: 'Nudges for leads nobody has replied to, so the ones that slip through the busy hours still get called.',
      },
      {
        title: 'Team routing',
        body: 'Enquiries split by location, service or shift where you have more than one person handling them.',
      },
    ],
    bestFor: [
      'Businesses where the owner or manager is on the floor, not at a desk',
      'Multi-branch operations that need leads split by location',
      'Anyone whose leads currently arrive by email and go cold',
    ],
    notFor:
      'Businesses that prefer to work leads in bulk once a day. The whole point of this is speed, and if you do not want speed you are paying for something you will not use.',
    process: [
      {
        step: 'Pick the route',
        body: 'Instant form, landing page or click-to-WhatsApp — chosen on how your team actually works during the day.',
      },
      {
        step: 'Connect',
        body: 'The delivery pipeline is built and tested with real submissions on real phones before any ad goes live.',
      },
      {
        step: 'Write the auto-reply',
        body: 'A first message that sounds like you and sets a clear expectation for the call. Not a robot greeting.',
      },
      {
        step: 'Watch response times',
        body: 'We track how long leads wait for a reply and tell you when it slips. This number moves your revenue more than your cost per lead does.',
      },
    ],
    faqs: [
      {
        q: 'Do I need the WhatsApp Business API for this?',
        a: 'Not for basic instant notifications and click-to-WhatsApp ads, which work with a normal WhatsApp Business account. Automated template messages at volume do need the API, and we will tell you plainly when your volume justifies that cost.',
      },
      {
        q: 'Will leads come to more than one phone?',
        a: 'Yes. We can route the same enquiry to several numbers, or split enquiries by branch or service so the right person gets them.',
      },
      {
        q: 'What if I miss a lead anyway?',
        a: 'The lead is also written to your sheet or CRM and a reminder fires if nobody has responded. Nothing depends on one notification being seen.',
      },
    ],
  },
  {
    slug: 'ad-creative-design',
    name: 'Ad Creative & Design',
    summary:
      'Statics, reels and hooks made for the feed — shot around your actual business, not a stock library.',
    icon: 'palette',
    heroHeadline: 'Ads that do not look like ads',
    heroSub:
      'People scroll past anything that announces itself as advertising. We make creative that earns a stop — your space, your staff, your customers, cut with hooks that work in the first second.',
    includes: [
      {
        title: 'Hook-first scripting',
        body: 'The first line and the first frame get written before anything else, because that is what decides whether the rest is seen.',
      },
      {
        title: 'Static ads',
        body: 'Feed and story sizes, offer-led, readable at thumb size with the text weight where the eye lands. Built in your brand colours once we have them.',
      },
      {
        title: 'Reel and video edits',
        body: 'Cut from footage you shoot on a phone to a shot list we send you, or from what you already have. Captions burned in, because most of the feed is watched on mute.',
      },
      {
        title: 'Shot lists for your team',
        body: 'A plain checklist of what to film this week — angles, length, what to say. No crew required, no studio day to book.',
      },
      {
        title: 'Angle testing',
        body: 'The same offer said three different ways — price, outcome, objection. The feed decides which one is right, not us.',
      },
      {
        title: 'Refresh cycle',
        body: 'New creative before the current set fatigues, on a schedule set by how fast your audience is being repeated.',
      },
    ],
    bestFor: [
      'Businesses with a physical space, real staff and real customers to film',
      'Anyone running the same three images for six months',
      'Owners who are willing to appear on camera, or have someone who is',
    ],
    notFor:
      'If nobody at your business can spare twenty minutes a week to film on a phone, we can still work with stock and graphics — but the results will be softer and we would rather you knew that first.',
    process: [
      {
        step: 'Angles',
        body: 'We list the three or four reasons somebody buys from you, and the objections that stop them. Those become the creative brief.',
      },
      {
        step: 'Shoot list',
        body: 'You get a checklist. Phone footage is fine and usually better — it looks native to the feed.',
      },
      {
        step: 'Cut and caption',
        body: 'We edit, caption, size for each placement and hand back files ready to run.',
      },
      {
        step: 'Read the data',
        body: 'Hold rate and cost per enquiry tell us which angle to make more of. That drives the next batch.',
      },
    ],
    faqs: [
      {
        q: 'Do you shoot the video yourselves?',
        a: 'Usually not — we send a shot list and your team films on a phone, which keeps costs down and looks more native than produced footage. For clients in and around Lucknow we can arrange a shoot day where the business genuinely needs it.',
      },
      {
        q: 'How many creatives do I get?',
        a: 'It varies by plan, but the aim is always to have new creative ready before the current set tires, rather than a fixed count sitting unused.',
      },
      {
        q: 'Do I own the files?',
        a: 'Yes. Source files and exports are handed over and remain yours.',
      },
    ],
  },
  {
    slug: 'landing-pages',
    name: 'Landing Pages that Convert',
    summary:
      'Fast, single-purpose pages built around one offer and one form — not your homepage with a button.',
    icon: 'layout-template',
    heroHeadline: 'One page, one offer, one thing to do next',
    heroSub:
      'Sending ad traffic to a homepage is where most budgets quietly die. We build a page for the specific offer in the ad, load it in under two seconds on a mid-range phone, and put the form where the decision happens.',
    includes: [
      {
        title: 'Message match',
        body: 'The headline on the page repeats the promise in the ad. If those two disagree, people leave, and the ad gets blamed for it.',
      },
      {
        title: 'Mobile-first build',
        body: 'Designed at 375px and tested on real phones on Indian mobile data. Nearly all of your traffic is on a phone; the desktop view is the afterthought, not the other way round.',
      },
      {
        title: 'Form or WhatsApp, chosen deliberately',
        body: 'Some audiences fill forms, some only tap through to chat. We test which yours does instead of assuming.',
      },
      {
        title: 'Proof placement',
        body: 'Reviews, photos, before-and-afters and prices positioned at the exact points where people hesitate.',
      },
      {
        title: 'Speed budget',
        body: 'Images compressed, fonts subset, scripts kept off the critical path. A page that takes five seconds on 4G has already lost a third of the traffic you paid for.',
      },
      {
        title: 'Tracking wired in',
        body: 'Pixel, conversion event and thank-you page connected and verified before launch, so the campaign can optimise against real submissions.',
      },
    ],
    bestFor: [
      'Offers that need explaining — pricing, packages, a consultation',
      'Higher-value services where people want to read before they enquire',
      'Anyone currently sending ad clicks to a homepage or a Linktree',
    ],
    notFor:
      'Very low-ticket, impulse offers where an instant form on Meta will out-convert any page. We will recommend the form and save you the build.',
    process: [
      {
        step: 'Strip it down',
        body: 'One offer per page. Every section that does not move someone toward the form gets cut.',
      },
      {
        step: 'Write, then design',
        body: 'The copy is written first and the layout is built around it. Design that comes first tends to need filler text to look right.',
      },
      {
        step: 'Build and speed-test',
        body: 'Built, then measured on a throttled mobile connection. If it is slow, it is not finished.',
      },
      {
        step: 'Test against the alternative',
        body: 'Where volume allows, the page runs against an instant form so you can see which one produces cheaper customers.',
      },
    ],
    faqs: [
      {
        q: 'Where does the page live?',
        a: 'On your own domain, usually as a subpage or a subdomain, so the traffic and the SEO value stay with you. If you have no site at all we can host it and hand it over later.',
      },
      {
        q: 'Can you work with my existing website?',
        a: 'Yes, if it can take a new page without a fight. If your site is slow or locked down by an old developer, a standalone page is usually faster and cheaper than negotiating with it.',
      },
      {
        q: 'Do I need a new page for every campaign?',
        a: 'No. One good page per core offer is normally enough, and we only build another when the offer genuinely differs.',
      },
    ],
  },
  {
    slug: 'tracking-and-reporting',
    name: 'Tracking, Pixel & Reporting',
    summary:
      'Conversions measured properly, and a monthly report that says what happened and what it cost.',
    icon: 'line-chart',
    heroHeadline: 'Know what your ads actually did',
    heroSub:
      'If the pixel is wrong, every decision after it is a guess. We set up conversion tracking end to end, verify it with real submissions, and send you a report in numbers you already use — enquiries, cost per enquiry, customers.',
    includes: [
      {
        title: 'Pixel and dataset setup',
        body: 'Meta pixel installed, events named consistently and deduplicated. No stray page-view-as-conversion nonsense inflating your results.',
      },
      {
        title: 'Conversions API',
        body: 'Server-side events alongside the browser pixel so iOS and ad blockers stop eating your data. Meta optimises better when it can see what happened.',
      },
      {
        title: 'Event verification',
        body: 'We submit real test leads and confirm each event fires once, with the right value, in Events Manager. Nothing goes live on the assumption that it works.',
      },
      {
        title: 'Offline conversion feedback',
        body: 'Where you can tell us which leads became customers, that goes back into the account so the algorithm chases buyers rather than form-fillers.',
      },
      {
        title: 'Monthly report',
        body: 'Spend, enquiries, cost per enquiry, best and worst creative, and what we are changing next month. One page, no vanity metrics.',
      },
      {
        title: 'A dashboard you can open yourself',
        body: 'Live numbers you can check at 11pm without messaging anyone. Access to your own data is not a premium feature.',
      },
    ],
    bestFor: [
      'Anyone who has been given a report full of reach and impressions',
      'Businesses running ads where nobody can say what a customer cost',
      'Accounts with tracking set up years ago by someone unreachable',
    ],
    notFor:
      'Businesses that do not want to share which leads closed. We can still report on cost per enquiry, but the account will never optimise as well and it is worth knowing that trade-off.',
    process: [
      {
        step: 'Audit what exists',
        body: 'We check what is currently firing, what is double-counting and what is silently broken. This alone often explains a bad quarter.',
      },
      {
        step: 'Rebuild the events',
        body: 'A clean event structure with one clear conversion that matches how you make money.',
      },
      {
        step: 'Add the server side',
        body: 'Conversions API wired up and matched against the browser events so nothing is counted twice.',
      },
      {
        step: 'Report and act',
        body: 'The monthly report exists to drive a decision. If a number does not change what we do next, it does not go in.',
      },
    ],
    faqs: [
      {
        q: 'My pixel is already installed. Do I need this?',
        a: 'Possibly not, but an audit is worth the hour. Installed and firing correctly are different things, and we find broken or duplicated events on most accounts we take over.',
      },
      {
        q: 'Is the Conversions API compulsory?',
        a: 'No, but on a lead-generation account it usually pays for itself in match quality within a month. We set it up as standard and you can decline it.',
      },
      {
        q: 'How often do I get reports?',
        a: 'A monthly written report, a fortnightly check-in on lead quality, and a live dashboard you can open any time.',
      },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
