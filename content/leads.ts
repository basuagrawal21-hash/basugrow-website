/**
 * The hero phone's sample inbox.
 *
 * These names and enquiries are illustrative. The caption is what
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
  caption: 'Sample — illustrative names and enquiries',
} as const;

/** WebGL arrival cadence. The flat phone keeps its own 2.2s tick. */
export const leadTiming = {
  firstArrivalMs: 2400,
  intervalMs: 2800,
  /** Cards resting on the screen before anything arrives, as on the flat phone. */
  seeded: 3,
} as const;
