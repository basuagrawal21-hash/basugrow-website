/**
 * The hero phone's sample inbox. Shared by the flat CSS phone and the WebGL
 * scene so the two can never drift apart.
 *
 * These names, enquiries and figures are illustrative. The caption is what
 * says so on the page — it renders wherever the phone does and is not
 * optional. Do not swap in real client names without written permission.
 */
export type SampleLead = {
  name: string;
  enquiry: string;
  place: string;
};

// Cities rather than localities — campaigns run right across India, and the
// phone should read that way at a glance.
export const sampleLeads: readonly SampleLead[] = [
  { name: 'Rahul', enquiry: 'Gym trial enquiry', place: 'Indore' },
  { name: 'Priya', enquiry: 'Free trial booked', place: 'Pune' },
  { name: 'Imran', enquiry: 'Site visit requested', place: 'Jaipur' },
  { name: 'Sneha', enquiry: 'Consultation enquiry', place: 'Hyderabad' },
  { name: 'Vikas', enquiry: 'Membership enquiry', place: 'Jhansi' },
  { name: 'Fatima', enquiry: 'Salon first visit', place: 'Delhi NCR' },
];

export const phoneScreen = {
  time: '9:41',
  avatar: 'BG',
  title: 'New leads',
  subtitle: 'delivered instantly',
  arrivedLabel: 'now',
  footerLabel: 'Earlier today',
  footerCount: '14 enquiries',
  footerNote: 'Average reply time 6 min',
  caption: 'Sample — illustrative names and enquiries',
} as const;

/** Arrival cadence, shared by both renderers. */
export const leadTiming = {
  firstArrivalMs: 2400,
  intervalMs: 2800,
  /** Cards resting on the screen before anything arrives. */
  seeded: 4,
} as const;
