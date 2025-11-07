'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { analytics } from '@/lib/analytics';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize Google Analytics
    analytics.initGA();
    analytics.trackWebVitals();
  }, []);

  useEffect(() => {
    // Track page views on route change
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    analytics.trackPageView(url);

    // Track user journey step
    analytics.trackUserJourney('page_view', undefined, {
      page_url: url,
      page_title: document.title,
    });

    // Track scroll depth
    let maxScrollDepth = 0;
    const handleScroll = () => {
      const scrollDepth = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      maxScrollDepth = Math.max(maxScrollDepth, scrollDepth);
    };

    const handleScrollEnd = () => {
      if (maxScrollDepth > 0) {
        analytics.trackScrollDepth(maxScrollDepth, pathname);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Track scroll depth on page unload
    const handleBeforeUnload = () => {
      handleScrollEnd();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Track time on page
    const startTime = Date.now();
    const handlePageHide = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      analytics.trackTimeOnPage(timeOnPage, pathname);
    };

    window.addEventListener('pagehide', handlePageHide);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, [pathname, searchParams]);

  useEffect(() => {
    // Track performance metrics
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        const metrics = {
          domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.navigationStart),
          loadComplete: Math.round(navigation.loadEventEnd - navigation.navigationStart),
          firstByte: Math.round(navigation.responseStart - navigation.navigationStart),
        };

        Object.entries(metrics).forEach(([metric, value]) => {
          analytics.trackPerformance(metric, value, pathname);
        });
      }
    }
  }, [pathname]);

  return <>{children}</>;
}

// Hook for tracking venue-specific events
export function useVenueAnalytics(venueId: string, venueName: string) {
  const trackVenueEvent = (eventType: string, additionalData?: Record<string, any>) => {
    switch (eventType) {
      case 'view':
        analytics.trackVenueView(venueId, venueName);
        break;
      case 'cta_click':
        analytics.trackVenueCTA(venueId, additionalData?.ctaType || 'unknown', venueName);
        break;
      case 'reservation_attempt':
        analytics.trackReservationAttempt(venueId, venueName);
        break;
      case 'phone_click':
        analytics.trackPhoneClick(venueId, additionalData?.phoneNumber || '');
        break;
      case 'directions_request':
        analytics.trackDirectionsRequest(venueId, venueName);
        break;
      case 'gallery_interaction':
        analytics.trackGalleryInteraction(venueId, additionalData?.imageIndex || 0);
        break;
      default:
        analytics.trackEvent(eventType, {
          venue_id: venueId,
          venue_name: venueName,
          ...additionalData,
        });
    }
  };

  return { trackVenueEvent };
}

// Hook for tracking user interactions
export function useInteractionAnalytics() {
  const trackInteraction = (interactionType: string, data?: Record<string, any>) => {
    analytics.trackEvent('user_interaction', {
      interaction_type: interactionType,
      ...data,
    });
  };

  const trackError = (errorType: string, errorMessage: string) => {
    analytics.trackError(errorType, errorMessage, window.location.pathname);
  };

  return { trackInteraction, trackError };
}