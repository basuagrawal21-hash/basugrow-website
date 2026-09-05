import { z } from 'zod';

/**
 * Indian mobile numbers. Accepts the shapes people actually type:
 * 9876543210, +91 98765 43210, 091-9876543210, 0 9876543210.
 * Normalised to digits before validation, then required to be a 10-digit
 * number starting 6-9, optionally prefixed with 91 or 0.
 */
export const normaliseWhatsapp = (raw: string) => raw.replace(/[^\d]/g, '');

const whatsapp = z
  .string()
  .trim()
  .min(1, 'We need a WhatsApp number to send your audit to.')
  .transform(normaliseWhatsapp)
  .refine((digits) => /^(?:91|0)?[6-9]\d{9}$/.test(digits), {
    message: 'That does not look like an Indian mobile number. Ten digits starting 6, 7, 8 or 9.',
  })
  .transform((digits) => digits.replace(/^(?:91|0)/, ''));

export const industryOptions = [
  'Gym or fitness studio',
  'Clinic, dental or derma',
  'Real estate',
  'Salon or spa',
  'Coaching institute',
  'Restaurant or café',
  'Something else',
] as const;

export const budgetOptions = [
  'Not spending anything yet',
  'Under ₹20,000 a month',
  '₹20,000 – ₹50,000 a month',
  '₹50,000 – ₹2,00,000 a month',
  'Over ₹2,00,000 a month',
] as const;

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please tell us your name.')
    .max(80, 'That name is longer than we can store.'),
  business: z
    .string()
    .trim()
    .min(2, 'Please tell us your business name.')
    .max(120, 'That business name is longer than we can store.'),
  whatsapp,
  industry: z.enum(industryOptions, { message: 'Please pick the closest option.' }),
  budget: z.enum(budgetOptions, { message: 'Please pick the closest option.' }),
  message: z
    .string()
    .trim()
    .max(2000, 'Please keep this under 2000 characters.')
    .optional()
    .or(z.literal('')),
  /** Honeypot. Real people never see this field, so anything in it is a bot. */
  website: z.string().max(0).optional().or(z.literal('')),
});

export type LeadInput = z.infer<typeof leadSchema>;

/** Field-keyed errors plus a form-level message, shaped for useActionState. */
export type LeadFormState = {
  ok: boolean;
  message?: string;
  errors?: Partial<Record<keyof LeadInput | 'form', string>>;
  values?: Record<string, string>;
};
