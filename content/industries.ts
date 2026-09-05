import type { Industry } from './types';

export const industries: Industry[] = [
  {
    slug: 'gyms-and-fitness',
    name: 'Gyms & fitness',
    longName: 'gyms, fitness studios and personal trainers',
    icon: 'dumbbell',
    pain: 'Walk-ins dried up, the January rush is over, and the treadmills are emptier than the rent justifies.',
    heroHeadline: 'Gym kitni bhi acchi ho, leads ke bina floor khaali hai',
    heroSub:
      'A good gym does not sell itself in a city with four others within two kilometres. We run trial-offer campaigns to people who live near enough to actually turn up, and put every enquiry on your phone while they are still interested.',
    playbook: [
      {
        title: 'A trial offer, not a membership pitch',
        body: 'Nobody commits to twelve months from an Instagram ad. A three-day pass or a free body composition check gets them through the door, and the floor closes the sale.',
      },
      {
        title: 'Radius targeting that reflects reality',
        body: 'People join gyms they pass, not gyms they drive to. We target tight around your location and against the localities your existing members actually come from.',
      },
      {
        title: 'Creative shot on your floor',
        body: 'Your equipment, your trainers, your 6am regulars. Stock gym footage is instantly recognisable and it does not convert.',
      },
      {
        title: 'Speed on the callback',
        body: 'Fitness enquiries go cold within hours. The lead hits WhatsApp instantly and the auto-reply books the trial slot before you are off the floor.',
      },
      {
        title: 'Seasonality planned for',
        body: 'January and post-monsoon are cheap months to acquire. We plan the budget around your calendar instead of spending flat all year.',
      },
    ],
    cplRange: '₹80 – ₹250 per enquiry',
    caseStudySlug: 'gym-trial-campaign',
  },
  {
    slug: 'clinics-and-dental',
    name: 'Clinics & dental',
    longName: 'dental, derma and specialist clinics',
    icon: 'stethoscope',
    pain: 'The chair sits empty between appointments and the only new patients are the ones a neighbour sent.',
    heroHeadline: 'Fill the chair without discounting the treatment',
    heroSub:
      'Patients research quietly and enquire once. We run consultation-led campaigns that respect that, with copy that explains the procedure honestly and a booking route that does not make them phone during work hours.',
    playbook: [
      {
        title: 'Consultation-first offers',
        body: 'A paid or free first consultation converts far better than advertising a procedure price. It also filters for people who are serious.',
      },
      {
        title: 'Treatment-specific campaigns',
        body: 'Aligners, implants, acne, hair — separate campaigns with separate creative. One general "dental clinic" ad competes with everybody and stands for nothing.',
      },
      {
        title: 'Careful, compliant copy',
        body: 'No before-and-afters that overstate, no outcome promises. Meta rejects health claims and patients distrust them anyway.',
      },
      {
        title: 'Discreet enquiry routes',
        body: 'Many patients will not fill a form about a visible condition. WhatsApp gives them a private channel, which lifts enquiry rates on sensitive treatments.',
      },
      {
        title: 'Front desk follow-up',
        body: 'Scripts for the receptionist covering price questions, "I will discuss with family", and the no-show reminder.',
      },
    ],
    cplRange: '₹150 – ₹600 per enquiry',
    caseStudySlug: 'dental-clinic-consults',
  },
  {
    slug: 'real-estate',
    name: 'Real estate',
    longName: 'builders, brokers and property consultants',
    icon: 'building-2',
    pain: 'Portals sell you the same lead they sold to four other brokers, at a price that goes up every quarter.',
    heroHeadline: 'Your own pipeline, not a portal’s recycled list',
    heroSub:
      'Property leads are expensive everywhere, so the job is filtering, not volume. We qualify on budget, locality and timeline inside the ad itself, and route the ones worth a site visit straight to your sales team.',
    playbook: [
      {
        title: 'Qualification inside the form',
        body: 'Budget band, possession timeline and preferred locality asked before you ever pick up the phone. It cuts volume and raises the number of site visits.',
      },
      {
        title: 'Project-specific creative',
        body: 'Walkthroughs, floor plans and honest pricing. Renders alone attract browsers; a price band attracts buyers.',
      },
      {
        title: 'Retargeting the researchers',
        body: 'Property decisions take weeks. People who watched the walkthrough or opened the page get a different message than cold audiences do.',
      },
      {
        title: 'Site-visit booking as the conversion',
        body: 'The metric that matters is visits booked and visits attended, not leads collected. We optimise against the one you can bank.',
      },
      {
        title: 'Fast, hard follow-up',
        body: 'Property enquiries go to whoever calls first. The lead reaches your team in seconds and the reminder chases the ones nobody rang.',
      },
    ],
    cplRange: '₹300 – ₹1,500 per enquiry',
    caseStudySlug: 'real-estate-site-visits',
  },
  {
    slug: 'salons-and-spas',
    name: 'Salons & spas',
    longName: 'salons, spas and aesthetic studios',
    icon: 'scissors',
    pain: 'Weekends are packed, Tuesday afternoons are dead, and the discount posts only bring people who never return.',
    heroHeadline: 'Fill the quiet hours without cutting your prices',
    heroSub:
      'Discounting trains customers to wait for the next offer. We build campaigns around first-visit experiences and off-peak slots, so new faces come in at the times you actually have capacity.',
    playbook: [
      {
        title: 'Off-peak offers',
        body: 'A weekday-only first visit fills the hours that are currently costing you staff wages for nothing, without touching your weekend rate card.',
      },
      {
        title: 'Service-led creative',
        body: 'One service, shown properly, beats a list of everything you do. Short reels of the actual work outperform price graphics almost every time.',
      },
      {
        title: 'Tight local radius',
        body: 'Salon customers travel a few kilometres at most. Spending beyond that radius is spending on people who will never book.',
      },
      {
        title: 'Rebooking built in',
        body: 'The first visit is not the win — the second one is. Follow-up messages timed to the service cycle turn a trial into a regular.',
      },
      {
        title: 'Instagram as the shopfront',
        body: 'People check the profile before they book. We tell you what needs fixing there before we send paid traffic to it.',
      },
    ],
    cplRange: '₹60 – ₹200 per enquiry',
  },
  {
    slug: 'coaching-institutes',
    name: 'Coaching institutes',
    longName: 'coaching institutes and training academies',
    icon: 'graduation-cap',
    pain: 'Admission season is a scramble, and half the enquiries are students who will never pay a fee.',
    heroHeadline: 'Admission enquiries from parents who are ready to enrol',
    heroSub:
      'Ads that talk to students get engagement; ads that talk to parents get admissions. We target the person paying, qualify by class and stream, and build the demo-class booking into the campaign.',
    playbook: [
      {
        title: 'Talk to whoever pays',
        body: 'For school and entrance coaching that is usually a parent. Different message, different placement, different result.',
      },
      {
        title: 'Demo class as the offer',
        body: 'A free demo or diagnostic test converts better than a brochure download and shows off your teaching, which is the actual product.',
      },
      {
        title: 'Filter by class and stream',
        body: 'Two questions in the form remove the enquiries your batches cannot take.',
      },
      {
        title: 'Results shown honestly',
        body: 'Real selections with real names, used with permission. Inflated toppers claims are the norm in this category and parents have learned to discount them.',
      },
      {
        title: 'Season-aware budgets',
        body: 'Spend concentrated around admission windows and results season, not spread thin across twelve months.',
      },
    ],
    cplRange: '₹100 – ₹400 per enquiry',
  },
  {
    slug: 'restaurants-and-cafes',
    name: 'Restaurants & cafés',
    longName: 'restaurants, cafés and cloud kitchens',
    icon: 'utensils',
    pain: 'The food is good and the reviews say so, but nobody within three kilometres knows you exist.',
    heroHeadline: 'Get the neighbourhood through the door',
    heroSub:
      'Restaurant ads work when they are close, current and appetising. We run tight-radius campaigns around meal times and events you can actually fill, and measure them on bookings and covers rather than page likes.',
    playbook: [
      {
        title: 'Radius and timing',
        body: 'Ads served near your location in the hours before people decide where to eat. A great ad at 4pm beats the same ad at midnight.',
      },
      {
        title: 'Food shot close and warm',
        body: 'Phone footage of the actual dish arriving at a table outperforms polished product photography in the feed. It looks like something a friend posted.',
      },
      {
        title: 'A reason for tonight',
        body: 'A new menu, a live act, a weekend brunch. "Visit us" is not a reason and it does not fill tables.',
      },
      {
        title: 'Booking or WhatsApp, not a phone number',
        body: 'Tapping a number to call is friction. A chat that confirms a table for four at 8pm is not.',
      },
      {
        title: 'Repeat over reach',
        body: 'Retargeting past visitors is the cheapest cover you will ever buy, and most restaurants never do it.',
      },
    ],
    cplRange: '₹40 – ₹150 per enquiry',
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
