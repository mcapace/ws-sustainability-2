import { venueData } from '@/data/venues';

interface LocalBusinessStructuredDataProps {
  venueId: string;
}

export function LocalBusinessStructuredData({ venueId }: LocalBusinessStructuredDataProps) {
  const venue = venueData.brands
    .flatMap(brand => brand.locations)
    .find(location => location.id === venueId);

  if (!venue) return null;

  const brand = venueData.brands.find(b => b.locations.includes(venue));

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://bestcigarlounges.cigaraficionado.com/venues/${venue.id}`,
    name: venue.name,
    description: venue.description,
    url: `https://bestcigarlounges.cigaraficionado.com/venues/${venue.id}`,
    telephone: venue.phone,
    email: venue.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: venue.address.split(',')[0],
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: venue.address.split(' ').pop()?.replace(',', ''),
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: venue.coordinates.lat,
      longitude: venue.coordinates.lng,
    },
    openingHoursSpecification: Object.entries(venue.hours).map(([day, hours]) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
      opens: hours === 'Closed' ? undefined : hours.split(' - ')[0],
      closes: hours === 'Closed' ? undefined : hours.split(' - ')[1],
    })),
    image: venue.images.hero,
    logo: brand?.logo,
    sameAs: [
      'https://www.instagram.com/cigaraficionado',
      'https://twitter.com/cigaraficionado',
    ],
    priceRange: '$$$',
    amenityFeature: venue.features.map(feature => ({
      '@type': 'LocationFeatureSpecification',
      name: feature,
    })),
    ...(venue.history && {
      foundingDate: venue.history.founded.toString(),
      founder: {
        '@type': 'Person',
        name: venue.history.founder,
      },
    }),
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
    '@id': 'https://bestcigarlounges.cigaraficionado.com/#organization',
    name: 'Cigar Aficionado Select',
    description: 'Premium cigar lounge experiences featuring Davidoff of Geneva and Barclay Rex in Manhattan',
    url: 'https://bestcigarlounges.cigaraficionado.com',
    logo: 'https://bestcigarlounges.cigaraficionado.com/images/cigar-aficionado-logo.png',
    sameAs: [
      'https://www.instagram.com/cigaraficionado',
      'https://twitter.com/cigaraficionado',
      'https://www.facebook.com/cigaraficionado',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-CIGAR-AF',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Premium Cigar Experiences',
      itemListElement: venueData.brands.flatMap(brand => 
        brand.locations.map(location => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: `${location.name} Experience`,
            description: location.description,
            provider: {
              '@type': 'Organization',
              name: brand.name,
            },
          },
        }))
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
      item: 'https://bestcigarlounges.cigaraficionado.com',
    },
  ];

  if (venueId) {
    const venue = venueData.brands
      .flatMap(brand => brand.locations)
      .find(location => location.id === venueId);

    if (venue) {
      const brand = venueData.brands.find(b => b.locations.includes(venue));
      
      breadcrumbs.push(
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Venues',
          item: 'https://bestcigarlounges.cigaraficionado.com/venues',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: brand?.name || 'Brand',
          item: `https://bestcigarlounges.cigaraficionado.com/brands/${brand?.id}`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: venue.name,
          item: `https://bestcigarlounges.cigaraficionado.com/venues/${venue.id}`,
        }
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