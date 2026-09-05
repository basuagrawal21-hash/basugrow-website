/**
 * Consent is stored in localStorage, read synchronously before any tracking
 * script is added to the page. Nothing loads until someone has said yes.
 */
export const CONSENT_KEY = 'basugrow.consent';
export type ConsentValue = 'granted' | 'denied';

export function readConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    return stored === 'granted' || stored === 'denied' ? stored : null;
  } catch {
    // Private mode, or the browser blocks site data. Treat as undecided,
    // which means nothing loads.
    return null;
  }
}

export function writeConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Nothing to do — the choice just will not persist to the next visit.
  }
  window.dispatchEvent(new CustomEvent('basugrow:consent', { detail: value }));
}
