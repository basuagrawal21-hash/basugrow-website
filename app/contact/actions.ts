'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { leadSchema, type LeadFormState } from '@/lib/lead-schema';
import { checkRateLimit } from '@/lib/rate-limit';
import { site } from '@/content/site';

/**
 * Every failure path returns a specific message. "Something went wrong" tells
 * the person nothing and loses the lead — which on this site is the entire
 * product, so it is worth the extra branches.
 */
export async function submitLead(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  // Echoed back so a failed submit does not wipe what they typed.
  const values = { ...raw, website: '' };

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: LeadFormState['errors'] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof typeof errors;
      if (field && !errors[field]) errors[field] = issue.message;
    }
    return {
      ok: false,
      errors,
      values,
      message: 'Please check the highlighted fields.',
    };
  }

  const data = parsed.data;

  // Honeypot: a filled hidden field means a bot. Accept silently so it does
  // not learn, but send nothing.
  if (data.website) redirect('/thank-you');

  const headerList = await headers();
  const ip =
    headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headerList.get('x-real-ip') ??
    'unknown';

  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    return {
      ok: false,
      values,
      message: `That is a few submissions in a short time. Try again in ${limit.retryAfterMinutes} minutes, or just message us on WhatsApp at ${site.contact.phoneDisplay}.`,
    };
  }

  const inbox = process.env.LEAD_INBOX_EMAIL;
  const resendKey = process.env.RESEND_API_KEY;

  const summary = [
    `Name: ${data.name}`,
    `Business: ${data.business}`,
    `WhatsApp: +91 ${data.whatsapp}`,
    `Industry: ${data.industry}`,
    `Monthly ad budget: ${data.budget}`,
    '',
    data.message ? `Message:\n${data.message}` : 'No message left.',
  ].join('\n');

  // With no email configured the form still works — the lead is logged and the
  // person is thanked rather than shown an error for our missing config.
  if (!resendKey || !inbox) {
    console.warn(
      '[lead] RESEND_API_KEY or LEAD_INBOX_EMAIL is not set, so this lead was not emailed:\n' +
        summary,
    );
  } else {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(resendKey);
      const { error } = await resend.emails.send({
        from: `${site.name} website <onboarding@resend.dev>`,
        to: inbox,
        replyTo: undefined,
        subject: `New enquiry: ${data.business} (${data.industry})`,
        text: summary,
      });
      if (error) {
        console.error('[lead] Resend rejected the message', error);
        return {
          ok: false,
          values,
          message: `We could not send that just now. Please message us on WhatsApp at ${site.contact.phoneDisplay} — it reaches us straight away.`,
        };
      }
    } catch (err) {
      console.error('[lead] Resend threw', err);
      return {
        ok: false,
        values,
        message: `Our email is having a moment. Please message us on WhatsApp at ${site.contact.phoneDisplay} and we will pick it up immediately.`,
      };
    }
  }

  // Optional Google Sheets append. A failure here must never cost the lead,
  // because the email has already gone.
  const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (sheetsUrl) {
    try {
      await fetch(sheetsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, receivedAt: new Date().toISOString() }),
      });
    } catch (err) {
      console.error('[lead] Google Sheets append failed, lead was still emailed', err);
    }
  }

  redirect('/thank-you');
}
