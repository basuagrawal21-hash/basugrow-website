import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Nothing to index on the confirmation page, and it should never rank.
      disallow: ['/thank-you'],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
