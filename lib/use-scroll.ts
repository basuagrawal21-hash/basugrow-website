'use client';

import { useSyncExternalStore } from 'react';

function subscribe(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true });
  window.addEventListener('resize', onChange, { passive: true });
  return () => {
    window.removeEventListener('scroll', onChange);
    window.removeEventListener('resize', onChange);
  };
}

/**
 * True once the page has scrolled past `offset`.
 *
 * useSyncExternalStore rather than useEffect + setState: scroll position is
 * external state we are subscribing to, and reading it this way avoids the
 * cascading render that calling setState inside an effect causes.
 */
export function useScrolledPast(offset: number) {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > offset,
    () => false, // Server and first paint: treat the page as at the top.
  );
}

/** True once the page is more than `ratio` (0-1) of the way down. */
export function useScrolledRatio(ratio: number) {
  return useSyncExternalStore(
    subscribe,
    () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 && window.scrollY / max > ratio;
    },
    () => false,
  );
}
