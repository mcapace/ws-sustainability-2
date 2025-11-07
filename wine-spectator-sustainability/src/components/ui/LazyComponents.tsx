'use client';

import React, { lazy, Suspense } from 'react';
import { LoadingStates } from './LoadingStates';

// Lazy load heavy components
export const LazyVenueContent = lazy(() => 
  import('../sections/VenueContent').then(module => ({ default: module.VenueContent }))
);

export const LazyTimeline = lazy(() => 
  import('./Timeline').then(module => ({ default: module.Timeline }))
);

export const LazyBrandComparison = lazy(() => 
  import('../sections/BrandComparison').then(module => ({ default: module.BrandComparison }))
);

export const LazyGallery = lazy(() => 
  import('./Gallery').then(module => ({ default: module.Gallery }))
);

// Wrapper components with loading states
export function VenueContentWrapper({ venueId, className }: { venueId: string; className?: string }) {
  return (
    <Suspense fallback={<LoadingStates.ContentSkeleton />}>
      <LazyVenueContent venueId={venueId} className={className} />
    </Suspense>
  );
}

export function TimelineWrapper({ history, className }: { history: any; className?: string }) {
  return (
    <Suspense fallback={<LoadingStates.TimelineSkeleton />}>
      <LazyTimeline history={history} className={className} />
    </Suspense>
  );
}

export function BrandComparisonWrapper({ className }: { className?: string }) {
  return (
    <Suspense fallback={<LoadingStates.ContentSkeleton />}>
      <LazyBrandComparison className={className} />
    </Suspense>
  );
}

export function GalleryWrapper({ images, className }: { images: string[]; className?: string }) {
  return (
    <Suspense fallback={<LoadingStates.GallerySkeleton />}>
      <LazyGallery images={images} className={className} />
    </Suspense>
  );
}

// Dynamic import utility for conditional loading
export const dynamicImport = (importFn: () => Promise<any>) => {
  return lazy(importFn);
};

// Intersection Observer hook for lazy loading
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, options]);

  return isIntersecting;
}

// Progressive loading component
export function ProgressiveLoader({ 
  children, 
  fallback,
  threshold = 0.1 
}: { 
  children: React.ReactNode; 
  fallback: React.ReactNode;
  threshold?: number;
}) {
  const elementRef = React.useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(elementRef, { threshold });

  return (
    <div ref={elementRef}>
      {isIntersecting ? children : fallback}
    </div>
  );
}
