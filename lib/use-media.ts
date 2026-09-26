'use client';

import { useSyncExternalStore } from 'react';

/**
 * Live media-query match. The server snapshot is `false`, so anything gated on
 * this must render its resting state first and only add behaviour on match.
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const useReducedMotionPref = () => useMediaQuery('(prefers-reduced-motion: reduce)');
