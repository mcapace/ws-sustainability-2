'use client';

import { venueData } from '@/data/venues';
import { VenueContent } from '@/components/sections/VenueContent';
import { Timeline } from '@/components/ui/Timeline';
import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

interface VenuePageClientProps {
  venueId: string;
}

export function VenuePageClient({ venueId }: VenuePageClientProps) {
  const venue = venueData.brands
    .flatMap(brand => brand.locations)
    .find(location => location.id === venueId);

  if (!venue) {
    return (
      <div className="min-h-screen bg-luxury-charcoal flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-luxury-cream mb-4">Venue Not Found</h1>
          <p className="text-luxury-cream/70">The requested venue could not be found.</p>
        </div>
      </div>
    );
  }

  const brand = venueData.brands.find(b => b.locations.includes(venue));
  const isBarclayRex = venue.id === 'barclay-rex-wall-st';

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-luxury-charcoal">
        <Navigation />
        
        <main>
          {/* Hero Section for Individual Venue */}
          <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={venue.images.hero}
                alt={venue.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/70 to-luxury-black/50" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 text-center text-luxury-cream px-4 max-w-4xl mx-auto">
              <div className="mb-8">
                {brand && (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-16 w-auto mx-auto mb-6 filter brightness-0 invert"
                  />
                )}
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                {venue.name}
              </h1>
              
              <p className="text-2xl md:text-3xl italic mb-8" 
                 style={{ color: brand?.accentColor || '#D4AF37' }}>
                {venue.experience?.headline || venue.tagline}
              </p>
              
              <p className="text-xl text-luxury-cream/80 max-w-2xl mx-auto leading-relaxed">
                {venue.description}
              </p>
            </div>
          </section>

          {/* Main Content */}
          <ErrorBoundary>
            <VenueContent venueId={venue.id} />
          </ErrorBoundary>

          {/* Barclay Rex History Timeline */}
          {isBarclayRex && venue.history && (
            <section className="py-20 bg-luxury-black">
              <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-4xl lg:text-5xl font-bold text-luxury-cream mb-6">
                    <span className="gradient-text">113 Years</span> of Heritage
                  </h2>
                  <p className="text-xl text-luxury-cream/70 max-w-3xl mx-auto">
                    From Vincent Nastri's vision in 1910 to today's fourth generation, 
                    discover the milestones that shaped New York's most storied tobacco institution.
                  </p>
                </div>
                
                <ErrorBoundary>
                  <Timeline history={venue.history} />
                </ErrorBoundary>
              </div>
            </section>
          )}
        </main>
        
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
