import { site } from '@/content/site';
import type { Faq, PricingTier } from '@/content/types';

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
        // Square brand mark, meets Google's logo requirements (min 112x112, 1:1).
        logo: `${site.url}/logo-mark-willow.png`,
        sameAs: [site.contact.instagramUrl],
        address: {
          '@type': 'PostalAddress',
          addressLocality: site.base.city,
          addressRegion: site.base.state,
          addressCountry: site.base.country,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          telephone: `+${site.contact.whatsapp}`,
          email: site.contact.email,
          areaServed: 'IN',
          availableLanguage: ['English', 'Hindi'],
        },
        // One base, clients nationally — list the country plus the cities we
        // actively run campaigns in, so city-specific queries can match too.
        areaServed: [
          { '@type': 'Country', name: 'India' },
          ...site.cities.map((city) => ({ '@type': 'City', name: city })),
        ],
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

/** Rendered once, in the root layout, alongside OrganizationLd. */
export function WebSiteLd() {
  return (
    <Ld
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        name: site.name,
        url: site.url,
        publisher: { '@id': `${site.url}/#organization` },
        inLanguage: 'en-IN',
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

/** Rendered on the blog post page. Values come from MDX frontmatter, not user input. */
export function ArticleLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
  tag,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  tag: string;
}) {
  return (
    <Ld
      data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        image: `${site.url}/opengraph-image`,
        datePublished,
        dateModified: dateModified || datePublished,
        articleSection: tag,
        author: { '@id': `${site.url}/#organization` },
        publisher: { '@id': `${site.url}/#organization` },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${site.url}${path}` },
        url: `${site.url}${path}`,
        inLanguage: 'en-IN',
      }}
    />
  );
}

/** Rendered on the pricing page, so plans and their inclusions are machine-readable. */
export function PricingLd({ tiers }: { tiers: PricingTier[] }) {
  return (
    <Ld
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Meta ads management',
        provider: { '@id': `${site.url}/#organization` },
        areaServed: { '@type': 'Country', name: 'India' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'BasuGrow pricing plans',
          itemListElement: tiers.map((tier) => ({
            '@type': 'Offer',
            name: tier.name,
            description: tier.tagline,
            itemOffered: {
              '@type': 'Service',
              name: `${tier.name} plan`,
              description: tier.includes.join('; '),
            },
            ...(tier.priceMonthly
              ? {
                  price: tier.priceMonthly,
                  priceCurrency: 'INR',
                  priceSpecification: {
                    '@type': 'UnitPriceSpecification',
                    price: tier.priceMonthly,
                    priceCurrency: 'INR',
                    unitCode: 'MON',
                  },
                }
              : { priceSpecification: { '@type': 'PriceSpecification', description: 'Custom quote' } }),
          })),
        },
      }}
    />
  );
}

/** Rendered on the free calculator tool pages. */
export function SoftwareApplicationLd({
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
        '@type': 'WebApplication',
        name,
        description,
        url: `${site.url}${path}`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Any (runs in browser)',
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        publisher: { '@id': `${site.url}/#organization` },
      }}
    />
  );
}
