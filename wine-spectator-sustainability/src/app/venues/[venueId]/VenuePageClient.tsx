'use client';

import { venueData } from '@/data/venues';
import { WineryDetail } from '@/components/sections/VenueDetails';
import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

interface VenuePageClientProps {
  venueId: string;
}

export function VenuePageClient({ venueId }: VenuePageClientProps) {
  const location = venueData.brands
    .flatMap(brand => brand.locations)
    .find(entry => entry.id === venueId);

  if (!location) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#10301f]">
        <div className="text-center text-white">
          <h1 className="text-3xl font-semibold">Producer not found</h1>
          <p className="mt-2 text-sm text-white/70">
            The requested sustainability spotlight is unavailable.
          </p>
        </div>
      </div>
    );
  }

  const index = venueData.brands.flatMap(brand => brand.locations).findIndex(l => l.id === venueId);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#F7FAF7]">
        <Navigation />
        <main className="pt-16">
          <WineryDetail location={location} index={index} />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
