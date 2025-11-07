import { venueData } from '@/data/venues';
import { BASE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/seo';

interface ProducerStructuredDataProps {
  venueId: string;
}

export function ProducerStructuredData({ venueId }: ProducerStructuredDataProps) {
  const venue = venueData.brands
    .flatMap(brand => brand.locations)
    .find(location => location.id === venueId);

  if (!venue) return null;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/venues/${venue.id}`,
    name: venue.name,
    description: venue.description,
    url: venue.website ?? `${BASE_URL}/venues/${venue.id}`,
    image: `${BASE_URL}${venue.images.hero}`,
    ...(venue.logo && { logo: `${BASE_URL}${venue.logo}` }),
    ...(venue.website && { sameAs: [venue.website] }),
    ...(venue.impact?.metrics && venue.impact.metrics.length > 0
      ? {
          makesOffer: venue.impact.metrics.map(metric => ({
            '@type': 'Offer',
            name: metric.label,
            description: metric.supportingText,
          })),
        }
      : {}),
    parentOrganization: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
}

export function OrganizationStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}#organization`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: BASE_URL,
    logo: `${BASE_URL}/images/logos/wine-spectator.svg`,
    sameAs: [
      'https://www.instagram.com/winespectator',
      'https://twitter.com/WineSpectator',
      'https://www.facebook.com/WineSpectator',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-212-xxx-xxxx',
      contactType: 'press inquiries',
      availableLanguage: 'English',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Sustainability Storytelling Assets',
      itemListElement: venueData.brands.flatMap(brand =>
        brand.locations.map(location => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'CreativeWork',
            name: `${location.name} Sustainability Spotlight`,
            description: location.impact?.description ?? location.description,
            provider: {
              '@type': 'Organization',
              name: brand.name,
              url: `${BASE_URL}#producers`,
            },
          },
        })),
      ),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
}

export function BreadcrumbStructuredData({ venueId }: { venueId?: string }) {
  const breadcrumbs = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: BASE_URL,
    },
  ];

  if (venueId) {
    const venue = venueData.brands
      .flatMap(brand => brand.locations)
      .find(location => location.id === venueId);

    if (venue) {
      breadcrumbs.push(
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Producers',
          item: `${BASE_URL}#producers`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: venue.name,
          item: `${BASE_URL}/venues/${venue.id}`,
        },
      );
    }
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
}