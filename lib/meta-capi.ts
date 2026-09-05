import crypto from 'node:crypto';

/**
 * Meta Conversions API.
 *
 * The browser pixel misses a large share of conversions to iOS restrictions
 * and ad blockers, so the Lead event is also sent from the server. Both carry
 * the same event_id, which is how Meta deduplicates them — without that you
 * count every lead twice and optimise against inflated numbers.
 *
 * Silently does nothing unless both env vars are set.
 */
const API_VERSION = 'v21.0';

/** Meta requires PII to be SHA-256 hashed, lowercased and trimmed first. */
function hash(value: string) {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

export type LeadEvent = {
  eventId: string;
  eventSourceUrl: string;
  /** Ten-digit Indian mobile, without the country code. */
  phone?: string;
  clientIp?: string;
  userAgent?: string;
  /** Meta's click and browser cookies, when the visitor has them. */
  fbc?: string;
  fbp?: string;
};

export async function sendLeadToMeta(event: LeadEvent) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !token) return { sent: false, reason: 'not configured' as const };

  const userData: Record<string, unknown> = {};
  // Country code included, as Meta expects an E.164-style number before hashing.
  if (event.phone) userData.ph = [hash(`91${event.phone}`)];
  if (event.clientIp && event.clientIp !== 'unknown') userData.client_ip_address = event.clientIp;
  if (event.userAgent) userData.client_user_agent = event.userAgent;
  if (event.fbc) userData.fbc = event.fbc;
  if (event.fbp) userData.fbp = event.fbp;

  try {
    const res = await fetch(`https://graph.facebook.com/${API_VERSION}/${pixelId}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_token: token,
        data: [
          {
            event_name: 'Lead',
            event_time: Math.floor(Date.now() / 1000),
            event_id: event.eventId,
            event_source_url: event.eventSourceUrl,
            action_source: 'website',
            user_data: userData,
          },
        ],
      }),
    });

    if (!res.ok) {
      // Never throw: a tracking failure must not cost a lead that has already
      // been emailed.
      console.error('[capi] Meta rejected the event', res.status, await res.text());
      return { sent: false, reason: 'rejected' as const };
    }
    return { sent: true, reason: 'ok' as const };
  } catch (err) {
    console.error('[capi] request failed', err);
    return { sent: false, reason: 'error' as const };
  }
}
