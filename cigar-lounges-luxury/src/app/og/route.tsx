import { ImageResponse } from 'next/og';
import { venueData } from '@/data/venues';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const venueId = searchParams.get('venueId');

    if (!venueId) {
      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0a0a0a',
              backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D4AF37',
                fontSize: 48,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Cigar Aficionado Select
            </div>
            <div
              style={{
                color: '#f5f5f5',
                fontSize: 24,
                marginTop: 20,
                textAlign: 'center',
              }}
            >
              Three Legendary Destinations, One Exceptional Standard
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    const venue = venueData.brands
      .flatMap(brand => brand.locations)
      .find(location => location.id === venueId);

    if (!venue) {
      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0a0a0a',
              color: '#f5f5f5',
              fontSize: 32,
            }}
          >
            Venue Not Found
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    const brand = venueData.brands.find(b => b.locations.includes(venue));

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
          }}
        >
          {/* Left side - Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '60px',
              flex: 1,
              color: '#f5f5f5',
            }}
          >
            <div
              style={{
                fontSize: 18,
                color: '#D4AF37',
                marginBottom: 10,
                fontWeight: '600',
              }}
            >
              {brand?.name || 'Premium Experience'}
            </div>
            
            <div
              style={{
                fontSize: 48,
                fontWeight: 'bold',
                marginBottom: 20,
                lineHeight: 1.2,
              }}
            >
              {venue.name}
            </div>
            
            <div
              style={{
                fontSize: 24,
                color: '#D4AF37',
                fontStyle: 'italic',
                marginBottom: 30,
              }}
            >
              {venue.tagline}
            </div>
            
            <div
              style={{
                fontSize: 18,
                color: '#cccccc',
                lineHeight: 1.4,
                maxWidth: '500px',
              }}
            >
              {venue.description.substring(0, 150)}...
            </div>
            
            <div
              style={{
                marginTop: 40,
                fontSize: 16,
                color: '#D4AF37',
                fontWeight: '600',
              }}
            >
              Cigar Aficionado Select
            </div>
          </div>
          
          {/* Right side - Visual element */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              backgroundImage: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
              opacity: 0.1,
            }}
          >
            <div
              style={{
                width: '200px',
                height: '200px',
                border: '4px solid #D4AF37',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: 'bold',
                color: '#D4AF37',
              }}
            >
              {venue.neighborhood.charAt(0)}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
