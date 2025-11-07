import { notFound } from 'next/navigation';
import { venueData } from '@/data/venues';
import { VenuePageClient } from './VenuePageClient';
import { ProducerStructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData';

interface VenuePageProps {
  params: {
    venueId: string;
  };
}

export default function VenuePage({ params }: VenuePageProps) {
  const venue = venueData.brands
    .flatMap(brand => brand.locations)
    .find(location => location.id === params.venueId);

  if (!venue) {
    notFound();
  }

  return (
    <>
      <ProducerStructuredData venueId={params.venueId} />
      <BreadcrumbStructuredData venueId={params.venueId} />
      <VenuePageClient venueId={params.venueId} />
    </>
  );
}

// Generate static params for all venues
export async function generateStaticParams() {
  const venues = venueData.brands.flatMap(brand => brand.locations);
  
  return venues.map((venue) => ({
    venueId: venue.id,
  }));
}

// Generate metadata for each venue page
export async function generateMetadata({ params }: VenuePageProps) {
  const venue = venueData.brands
    .flatMap(brand => brand.locations)
    .find(location => location.id === params.venueId);

  if (!venue) {
    return {
      title: 'Venue Not Found',
    };
  }

  return {
    title: `${venue.name} | Wine Spectator Sustainability`,
    description: venue.description,
    keywords: [
      venue.name,
      venue.shortName,
      'Wine Spectator Sustainability',
      ...(venue.tagline ? [venue.tagline] : []),
    ],
    openGraph: {
      title: `${venue.name} | Wine Spectator Sustainability`,
      description: venue.description,
      images: [
        {
          url: `/og?venueId=${venue.id}`,
          width: 1200,
          height: 630,
          alt: `${venue.name} - ${venue.tagline}`,
        }
      ],
      url: `https://campaign.winespectator.com/sustainability/venues/${venue.id}`,
      siteName: 'Wine Spectator Sustainability',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${venue.name} | Wine Spectator Sustainability`,
      description: venue.description,
      images: [`/og?venueId=${venue.id}`],
      creator: '@WineSpectator',
    },
    alternates: {
      canonical: `https://campaign.winespectator.com/sustainability/venues/${venue.id}`,
    },
  };
}
