'use client';

import { useEffect, useRef } from 'react';

/**
 * Fires the browser-side Lead conversion.
 *
 * Deliberately on /thank-you rather than on a button click: a click is not a
 * lead, and counting it as one teaches Meta to optimise for people who click
 * and abandon. The eventId matches the one the server sent through the
 * Conversions API so Meta deduplicates the pair.
 */
export function LeadEvent({ eventId }: { eventId?: string }) {
  const fired = useRef(false);

  useEffect(() => {
    // The pixel loads afterInteractive, so it may not exist on first paint.
    // Without this retry the conversion would be dropped on fast navigations.
    const attempt = () => {
      if (fired.current) return true;

      const w = window as unknown as {
        fbq?: (...args: unknown[]) => void;
        gtag?: (...args: unknown[]) => void;
      };
      if (!w.fbq) return false;

      w.fbq('track', 'Lead', {}, eventId ? { eventID: eventId } : undefined);
      if (w.gtag) w.gtag('event', 'generate_lead', { event_id: eventId });
      fired.current = true;
      return true;
    };

    if (attempt()) return;

    const timer = setInterval(() => {
      if (attempt()) clearInterval(timer);
    }, 200);
    const giveUp = setTimeout(() => clearInterval(timer), 10_000);

    return () => {
      clearInterval(timer);
      clearTimeout(giveUp);
    };
  }, [eventId]);

  return null;
}
