import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Luxury Cigar Lounges';
    const description = searchParams.get('description') || 'Premium Venues & Exquisite Atmosphere';

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
            backgroundColor: '#1A1A1A',
            backgroundImage: 'linear-gradient(45deg, #1A1A1A 0%, #2D2D2D 50%, #1A1A1A 100%)',
            position: 'relative',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(139, 69, 19, 0.1) 0%, transparent 50%)
              `,
            }}
          />
          
          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px',
              textAlign: 'center',
              maxWidth: '1000px',
            }}
          >
            {/* Logo/Icon */}
            <div
              style={{
                fontSize: '120px',
                marginBottom: '40px',
                filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.5))',
              }}
            >
              🚬
            </div>
            
            {/* Title */}
            <div
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: '#D4AF37',
                marginBottom: '20px',
                textShadow: '0 0 30px rgba(212, 175, 55, 0.5)',
                lineHeight: 1.2,
              }}
            >
              {title}
            </div>
            
            {/* Description */}
            <div
              style={{
                fontSize: '32px',
                color: '#F5F5DC',
                opacity: 0.9,
                lineHeight: 1.4,
                maxWidth: '800px',
              }}
            >
              {description}
            </div>
            
            {/* Decorative Elements */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '40px',
                gap: '20px',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '2px',
                  backgroundColor: '#D4AF37',
                }}
              />
              <div
                style={{
                  fontSize: '24px',
                  color: '#8B4513',
                }}
              >
                ✦
              </div>
              <div
                style={{
                  width: '60px',
                  height: '2px',
                  backgroundColor: '#D4AF37',
                }}
              />
            </div>
          </div>
          
          {/* Bottom Accent */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              height: '8px',
              background: 'linear-gradient(90deg, #D4AF37 0%, #8B4513 50%, #D4AF37 100%)',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    
    // Fallback simple image
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1A1A1A',
            color: '#D4AF37',
            fontSize: '48px',
            fontWeight: 'bold',
          }}
        >
          Luxury Cigar Lounges
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}