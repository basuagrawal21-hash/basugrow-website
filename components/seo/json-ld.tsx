import { site } from '@/content/site';
import type { Faq } from '@/content/types';

/**
 * All values here come from our own content files, never from user input, so
 * serialising them into a script tag is safe.
 */
function Ld({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

/** Rendered once, in the root layout. */
export function OrganizationLd() {
  return (
    <Ld
      data={{
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': `${site.url}/#organization`,
        name: site.name,
        description: site.description,
        url: site.url,
        email: site.contact.email,
        telephone: `+${site.contact.whatsapp}`,
        foundingDate: site.founded,
        image: `${site.url}/opengraph-image`,
        sameAs: [site.contact.instagramUrl],
        address: {
          '@type': 'PostalAddress',
          addressLocality: site.base.city,
          addressRegion: site.base.state,
          addressCountry: site.base.country,
        },
        // One base, clients nationally.
        areaServed: { '@type': 'Country', name: 'India' },
        knowsAbout: [
          'Meta advertising',
          'Facebook ads',
          'Instagram ads',
          'Lead generation',
          'WhatsApp lead delivery',
          'Conversion tracking',
        ],
        priceRange: '₹₹',
      }}
    />
  );
}

export function BreadcrumbLd({ items }: { items: { name: string; path: string }[] }) {
  return (
    <Ld
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: `${site.url}${item.path}`,
        })),
      }}
    />
  );
}

export function FaqLd({ items }: { items: Faq[] }) {
  return (
    <Ld
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }}
    />
  );
}

export function ServiceLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return (
    <Ld
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        url: `${site.url}${path}`,
        serviceType: name,
        provider: { '@id': `${site.url}/#organization` },
        areaServed: { '@type': 'Country', name: 'India' },
      }}
    />
  );
}
