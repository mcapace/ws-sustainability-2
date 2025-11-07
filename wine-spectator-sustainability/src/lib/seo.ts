// SEO utilities and schema markup
import { Metadata } from 'next';

// Base URL configuration
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://campaign.winespectator.com/sustainability';
export const SITE_NAME = 'Wine Spectator Sustainability';
export const SITE_DESCRIPTION =
  'Discover six visionary wineries driving climate stewardship—from regenerative Californian vineyards to Champagne houses reimagining tradition.';

// Default metadata configuration
export const defaultMetadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Stewardship in Every Pour`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'wine sustainability',
    'regenerative viticulture',
    'Wine Spectator campaign',
    'climate positive wineries',
    'biodiversity in vineyards',
    'renewable energy winery',
    'circular wine packaging',
    'wine stewardship',
    'sustainable sparkling wine',
    'environmental storytelling',
    'wine ESG',
  ],
  authors: [{ name: 'Wine Spectator' }],
  creator: 'Wine Spectator',
  publisher: 'Wine Spectator',
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
    title: `${SITE_NAME} | Stewardship in Every Pour`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${BASE_URL}/api/og`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} hero`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Stewardship in Every Pour`,
    description: SITE_DESCRIPTION,
    images: [`${BASE_URL}/api/og`],
    creator: '@WineSpectator',
    site: '@WineSpectator',
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
  category: 'Wine & Sustainability',
  classification: 'Sustainable Wine Campaign',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': SITE_NAME,
    'application-name': SITE_NAME,
    'msapplication-TileColor': '#1F3D2B',
    'theme-color': '#1F3D2B',
  },
};

// Schema.org structured data
export const generateCollectionSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${BASE_URL}#collection`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: BASE_URL,
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'Organization',
      name: 'Wine Spectator',
      url: 'https://www.winespectator.com',
    },
  };
};

export const generateProducerSchema = (params: {
  name: string;
  description: string;
  region: string;
  website?: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: params.name,
    description: params.description,
    areaServed: params.region,
    url: params.website || BASE_URL,
    parentOrganization: {
      '@type': 'Organization',
      name: 'Wine Spectator',
      url: 'https://www.winespectator.com',
    },
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
    offers: event.price
      {
        '@type': 'Offer',
        price: event.price,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      }
        : undefined,
    organizer: {
      '@type': 'Organization',
      name: 'Wine Spectator',
      url: 'https://www.winespectator.com',
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
