'use client';

import Script from 'next/script';
import { useSyncExternalStore } from 'react';
import { CONSENT_KEY, readConsent, type ConsentValue } from '@/lib/consent';

/**
 * Subscribes to consent changes from both this tab (custom event) and other
 * tabs (storage event), so accepting in one place applies everywhere.
 */
function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === CONSENT_KEY) onChange();
  };
  window.addEventListener('basugrow:consent', onChange);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener('basugrow:consent', onChange);
    window.removeEventListener('storage', onStorage);
  };
}

export function useConsent(): ConsentValue | null {
  return useSyncExternalStore(
    subscribe,
    () => readConsent(),
    () => null, // Server render: undecided, so no script tags are emitted.
  );
}

/**
 * Meta Pixel and GA4.
 *
 * Neither is added to the page unless its ID is configured AND the visitor has
 * accepted. `next/script` with afterInteractive keeps them off the critical
 * path either way — this is an ads agency's own site, so the tracking has to be
 * both correct and cheap.
 */
export function Analytics() {
  const consent = useConsent();
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (consent !== 'granted') return null;

  return (
    <>
      {pixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
            t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}
    </>
  );
}
