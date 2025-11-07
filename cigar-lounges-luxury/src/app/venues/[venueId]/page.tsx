import { notFound } from 'next/navigation';
import { venueData } from '@/data/venues';
import { VenuePageClient } from './VenuePageClient';
import { LocalBusinessStructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData';

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
      <LocalBusinessStructuredData venueId={params.venueId} />
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

  const brand = venueData.brands.find(b => b.locations.includes(venue));

  return {
    title: `${venue.name} | ${brand?.name || 'Cigar Aficionado Select'}`,
    description: venue.description,
    keywords: [
      venue.name,
      venue.neighborhood,
      brand?.name,
      ...venue.features,
      ...(venue.perfectFor || [])
    ],
    openGraph: {
      title: `${venue.name} | ${brand?.name || 'Cigar Aficionado Select'}`,
      description: venue.description,
      images: [
        {
          url: `/og?venueId=${venue.id}`,
          width: 1200,
          height: 630,
          alt: `${venue.name} - ${venue.tagline}`,
        }
      ],
      url: `https://bestcigarlounges.cigaraficionado.com/venues/${venue.id}`,
      siteName: 'Cigar Aficionado Select',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${venue.name} | ${brand?.name || 'Cigar Aficionado Select'}`,
      description: venue.description,
      images: [`/og?venueId=${venue.id}`],
      creator: '@cigaraficionado',
    },
    alternates: {
      canonical: `https://bestcigarlounges.cigaraficionado.com/venues/${venue.id}`,
    },
  };
}
