'use client';

import { useEffect, useRef } from 'react';
import { useConsent } from './analytics';

/**
 * Fires the browser-side Lead conversion.
 *
 * Deliberately on /thank-you rather than on a button click: a click is not a
 * lead, and counting it as one teaches Meta to optimise for people who click
 * and abandon. The eventId matches the one the server sent through the
 * Conversions API so Meta deduplicates the pair.
 */
export function LeadEvent({ eventId }: { eventId?: string }) {
  const consent = useConsent();
  const fired = useRef(false);

  useEffect(() => {
    if (consent !== 'granted' || fired.current) return;

    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (fbq) {
      fbq('track', 'Lead', {}, eventId ? { eventID: eventId } : undefined);
      fired.current = true;
    }

    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (gtag) gtag('event', 'generate_lead', { event_id: eventId });
  }, [consent, eventId]);

  return null;
}
