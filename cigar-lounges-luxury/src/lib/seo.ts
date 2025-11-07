// SEO utilities and schema markup
import { Metadata } from 'next';

// Base URL configuration
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://luxurycigarlounges.com';
export const SITE_NAME = 'Luxury Cigar Lounges';
export const SITE_DESCRIPTION = 'Experience the epitome of luxury at our premium cigar lounges. Two exclusive venues offering world-class cigars, fine spirits, and sophisticated ambiance for the discerning connoisseur.';

// Default metadata configuration
export const defaultMetadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Premium Venues & Exquisite Atmosphere`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'luxury cigar lounge',
    'premium cigars',
    'cigar bar',
    'fine spirits',
    'exclusive venue',
    'cigar connoisseur',
    'luxury experience',
    'premium atmosphere',
    'cigar tasting',
    'whiskey pairing',
    'manhattan cigar lounge',
    'hamptons cigar lounge',
    'luxury bar',
    'premium drinks',
    'cigar collection',
    'rare cigars',
    'vintage cigars',
    'cigar humidor',
    'private lounge',
    'membership club',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Premium Venues & Exquisite Atmosphere`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${BASE_URL}/api/og`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Premium Venues & Exquisite Atmosphere`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Premium Venues & Exquisite Atmosphere`,
    description: SITE_DESCRIPTION,
    images: [`${BASE_URL}/api/og`],
    creator: '@luxurycigarlounges',
    site: '@luxurycigarlounges',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || '',
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION || '',
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: 'Lifestyle',
  classification: 'Luxury Cigar Lounges',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': SITE_NAME,
    'application-name': SITE_NAME,
    'msapplication-TileColor': '#D4AF37',
    'theme-color': '#1A1A1A',
  },
};

// Schema.org structured data
export const generateLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#business`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    image: `${BASE_URL}/api/og`,
    telephone: '+1-555-LUXURY',
    email: 'info@luxurycigarlounges.com',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: '123 Park Avenue',
        addressLocality: 'New York',
        addressRegion: 'NY',
        postalCode: '10001',
        addressCountry: 'US',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: '456 Main Street',
        addressLocality: 'East Hampton',
        addressRegion: 'NY',
        postalCode: '11937',
        addressCountry: 'US',
      },
    ],
    geo: [
      {
        '@type': 'GeoCoordinates',
        latitude: '40.7589',
        longitude: '-73.9851',
      },
      {
        '@type': 'GeoCoordinates',
        latitude: '40.9634',
        longitude: '-72.1848',
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '17:00',
        closes: '02:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '18:00',
        closes: '01:00',
      },
    ],
    priceRange: '$$$',
    servesCuisine: 'Premium Cigars & Spirits',
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Premium Cigar Collection',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Fine Spirits Selection',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Private Lounges',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Expert Cigar Sommelier',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Valet Parking',
        value: true,
      },
    ],
    paymentAccepted: ['Cash', 'Credit Card', 'American Express'],
    currenciesAccepted: 'USD',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cigar Collection',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Premium Cigar Tasting',
            description: 'Curated selection of world-class cigars',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Private Lounge Reservation',
            description: 'Exclusive private lounge experience',
          },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'John Smith',
        },
        reviewBody: 'Exceptional service and the finest cigar collection in the city.',
      },
    ],
    sameAs: [
      'https://www.facebook.com/luxurycigarlounges',
      'https://www.instagram.com/luxurycigarlounges',
      'https://www.twitter.com/luxurycigarlounges',
    ],
  };
};

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

export const generateEventSchema = (event: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  price?: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    location: {
      '@type': 'Place',
      name: event.location,
    },
    offers: event.price ? {
      '@type': 'Offer',
      price: event.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    } : undefined,
    organizer: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
    },
  };
};

// Meta tags for specific pages
export const generatePageMetadata = (page: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}): Metadata => {
  const url = `${BASE_URL}${page.path}`;
  const image = page.image || `${BASE_URL}/api/og?title=${encodeURIComponent(page.title)}`;

  return {
    title: page.title,
    description: page.description,
    robots: page.noIndex ? { index: false, follow: false } : defaultMetadata.robots,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: page.title,
      description: page.description,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: page.title,
      description: page.description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
};
