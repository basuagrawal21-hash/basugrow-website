import type { Testimonial } from './types';

/**
 * TODO(real-data): These are illustrative and must not go live as-is.
 *
 * The owner needs to supply, for each real testimonial:
 *   - the exact words the client wrote or said (WhatsApp screenshots are fine
 *     as a source; transcribe them, do not invent a tidier version)
 *   - name, business name and city
 *   - written permission to use all three publicly
 *   - optionally a photo at 200x200 or larger, saved to /public/testimonials/
 *
 * Set `isSample: false` once a testimonial is real. The section only renders
 * testimonials where isSample is false; while every entry is a sample, the
 * home page shows an honest "no reviews published yet" panel instead. That is
 * deliberate — invented praise is worse than none.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      'We were boosting posts every week and getting nothing we could call. Now the enquiries come to my phone and my floor manager books the trials.',
    name: 'Client name',
    business: 'Fitness studio',
    city: 'Sample city',
    photo: null,
    isSample: true,
  },
  {
    quote:
      'The reports finally make sense. I know what a consultation costs me and I can decide whether to spend more.',
    name: 'Client name',
    business: 'Dental clinic',
    city: 'Sample city',
    photo: null,
    isSample: true,
  },
];

/** Only real, permissioned testimonials are ever rendered. */
export const publishedTestimonials = testimonials.filter((t) => !t.isSample);
