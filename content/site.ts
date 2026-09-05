/** Global site facts. Change a phone number or a city here, not in a component. */

export const site = {
  name: 'BasuGrow',
  /** Used in the <title> template and OG images. */
  tagline: 'Meta ads that put real leads in your WhatsApp',
  description:
    'BasuGrow runs Meta ads for gyms, clinics, salons and local businesses across India, and sends every qualified enquiry straight to your phone.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://basugrow.com',
  locale: 'en_IN',
  founded: '2024',
  base: {
    city: 'Jhansi',
    state: 'Uttar Pradesh',
    country: 'IN',
  },
  contact: {
    /** Digits only, country code first. Used to build wa.me links. */
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '917400841035',
    /** Human-readable, for display. */
    phoneDisplay: '+91 74008 41035',
    email: 'hello@basugrow.com',
    instagram: 'basugrow',
    instagramUrl: 'https://instagram.com/basugrow',
    /** Shown next to forms and on the contact page. Keep it true. */
    responsePromise: 'We reply to every enquiry within 2 working hours.',
  },
  /** Prefilled WhatsApp message. Kept short so it survives URL encoding cleanly. */
  whatsappMessage: 'Hi BasuGrow, I want more leads for my business',
  /** Cities we actively run campaigns in. Used in the footer and LocalBusiness JSON-LD. */
  cities: [
    'Jhansi',
    'Delhi NCR',
    'Mumbai',
    'Bengaluru',
    'Hyderabad',
    'Pune',
    'Jaipur',
    'Indore',
    'Lucknow',
    'Kanpur',
    'Bhopal',
    'Chandigarh',
  ],
} as const;

export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Process', href: '/#how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '/tools/cpl-calculator' },
  { label: 'Contact', href: '/contact' },
] as const;

/** Footer link groups. Services and industries are generated from their content files. */
export const footerNav = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Case studies', href: '/work' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  tools: [
    { label: 'Cost-per-lead calculator', href: '/tools/cpl-calculator' },
    { label: 'Ad budget planner', href: '/tools/ad-budget-calculator' },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
} as const;

/** Three claims in the hero trust row. Every one of these is true on day one. */
export const trustRow = [
  'Reply within 2 working hours',
  'No lock-in contracts',
  'You own your ad account',
] as const;

export function whatsappLink(message: string = site.whatsappMessage) {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
