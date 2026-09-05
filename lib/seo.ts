import type { Metadata } from 'next';
import { site } from '@/content/site';

/** Builds per-route metadata with a canonical URL. Used by every generateMetadata. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${site.name}`,
      description,
      url,
      type: 'website',
      siteName: site.name,
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}
