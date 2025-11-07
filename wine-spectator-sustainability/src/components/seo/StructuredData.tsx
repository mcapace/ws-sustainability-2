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

  const brand = venueData.brands.find(b => b.locations.includes(venue));
  const localeParts = venue.address.split(',');

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/venues/${venue.id}`,
    name: venue.name,
    description: venue.description,
    url: `${BASE_URL}/venues/${venue.id}`,
    telephone: venue.phone,
    email: venue.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: localeParts[0]?.trim(),
      addressLocality: localeParts[1]?.trim(),
      addressRegion: localeParts[2]?.trim()?.split(' ')[0] ?? '',
      postalCode: venue.address.match(/\b\d{5}(-\d{4})?\b/)?.[0] ?? '',
      addressCountry: 'US',
    },
    ...(venue.coordinates && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: venue.coordinates.lat,
        longitude: venue.coordinates.lng,
      },
    }),
    image: venue.images.hero,
    logo: brand?.logo,
    makesOffer: venue.impact.metrics.map(metric => ({
      '@type': 'Offer',
      name: metric.label,
      description: metric.supportingText,
    })),
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
            description: location.impact.description,
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