'use client';

import { Suspense, lazy, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Lazy load components with loading boundaries
export const LazyImmersiveHero = lazy(() => 
  import('@/components/sections/ImmersiveHero').then(module => ({ 
    default: module.ImmersiveHero 
  }))
);

export const LazyLoungeSelector = lazy(() => 
  import('@/components/sections/LoungeSelector').then(module => ({ 
    default: module.LoungeSelector 
  }))
);

export const LazyPremiumGallery = lazy(() => 
  import('@/components/sections/PremiumGallery').then(module => ({ 
    default: module.PremiumGallery 
  }))
);

export const LazyCigarCollection = lazy(() => 
  import('@/components/sections/CigarCollection').then(module => ({ 
    default: module.CigarCollection 
  }))
);

export const LazyPremiumReservation = lazy(() => 
  import('@/components/sections/PremiumReservation').then(module => ({ 
    default: module.PremiumReservation 
  }))
);

// Skeleton screens for loading states
export function HeroSkeleton() {
  return (
    <div className="hero-skeleton min-h-screen bg-luxury-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-charcoal via-luxury-black to-luxury-charcoal">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-r from-cigar-gold/10 via-transparent to-cigar-gold/10 animate-pulse" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center space-y-8">
          {/* Logo skeleton */}
          <motion.div
            className="w-32 h-32 mx-auto bg-luxury-slate/30 rounded-full"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Title skeleton */}
          <div className="space-y-4">
            <div className="w-96 h-12 bg-luxury-slate/30 rounded-lg mx-auto animate-pulse" />
            <div className="w-80 h-8 bg-luxury-slate/20 rounded-lg mx-auto animate-pulse" />
          </div>
          
          {/* Button skeleton */}
          <div className="w-48 h-12 bg-cigar-gold/30 rounded-lg mx-auto animate-pulse" />
        </div>
      </div>

      {/* Floating particles skeleton */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cigar-gold/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function GallerySkeleton() {
  return (
    <div className="gallery-skeleton py-20 bg-luxury-charcoal">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title skeleton */}
        <div className="text-center mb-16">
          <div className="w-80 h-12 bg-luxury-slate/30 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="w-96 h-6 bg-luxury-slate/20 rounded-lg mx-auto animate-pulse" />
        </div>

        {/* Masonry grid skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`bg-luxury-slate/30 rounded-lg animate-pulse ${
                i % 3 === 0 ? 'h-64' : i % 3 === 1 ? 'h-80' : 'h-48'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ReservationSkeleton() {
  return (
    <div className="reservation-skeleton py-20 bg-luxury-black">
      <div className="max-w-4xl mx-auto px-4">
        {/* Title skeleton */}
        <div className="text-center mb-16">
          <div className="w-80 h-12 bg-luxury-slate/30 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="w-96 h-6 bg-luxury-slate/20 rounded-lg mx-auto mb-8 animate-pulse" />
          <div className="w-48 h-12 bg-cigar-gold/30 rounded-lg mx-auto animate-pulse" />
        </div>

        {/* Form skeleton */}
        <div className="bg-luxury-charcoal/20 backdrop-blur-xl rounded-3xl p-8 border border-luxury-slate/20">
          <div className="space-y-6">
            {/* Progress bar skeleton */}
            <div className="w-full h-2 bg-luxury-slate/30 rounded-full">
              <div className="w-1/3 h-full bg-cigar-gold/50 rounded-full animate-pulse" />
            </div>
            
            {/* Form fields skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 bg-luxury-slate/20 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Progressive image loading component
export function ProgressiveImage({
  src,
  alt,
  placeholder,
  className = '',
  ...props
}: {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  [key: string]: unknown;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-luxury-slate/30 animate-pulse flex items-center justify-center">
          {placeholder && (
            <img
              src={placeholder}
              alt=""
              className="w-full h-full object-cover opacity-50"
            />
          )}
        </div>
      )}

      {/* Main image */}
      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
          {...props}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-luxury-slate/50 flex items-center justify-center text-luxury-cream/50">
          <div className="text-center">
            <div className="text-4xl mb-2">📷</div>
            <div className="text-sm">Image unavailable</div>
          </div>
        </div>
      )}
    </div>
  );
}

// Critical CSS injection
export function CriticalCSS() {
  useEffect(() => {
    const criticalCSS = `
      /* Critical above-the-fold styles */
      .hero-skeleton {
        background: linear-gradient(135deg, #1a1a1a, #000000);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid rgba(212, 175, 55, 0.3);
        border-top: 3px solid #d4af37;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .skeleton-shimmer {
        background: linear-gradient(90deg, 
          rgba(255, 255, 255, 0.1) 0%, 
          rgba(255, 255, 255, 0.2) 50%, 
          rgba(255, 255, 255, 0.1) 100%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
      }
      
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `;

    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return null;
}

// Asset preloader
export function AssetPreloader() {
  useEffect(() => {
    const preloadAssets = [
      // Critical images
      '/images/lounges/manhattan-lounge.jpg',
      '/images/lounges/hamptons-lounge.jpg',
      '/images/cigars/cohiba-behike-56.jpg',
      
      // Critical fonts
      'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap',
      
      // Critical scripts (if any)
    ];

    // Preload images
    preloadAssets.forEach(asset => {
      if (asset.endsWith('.jpg') || asset.endsWith('.png') || asset.endsWith('.webp')) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = asset;
        document.head.appendChild(link);
      } else if (asset.endsWith('.css')) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = asset;
        document.head.appendChild(link);
      }
    });

    // DNS prefetch for external resources
    const externalDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://api.mapbox.com',
    ];

    externalDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });
  }, []);

  return null;
}

// Loading boundary wrapper
export function LoadingBoundary({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <Suspense fallback={fallback || <DefaultLoadingSpinner />}>
      {children}
    </Suspense>
  );
}

export function DefaultLoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="loading-spinner" />
    </div>
  );
}
