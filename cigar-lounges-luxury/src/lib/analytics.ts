// Google Analytics 4 and custom event tracking

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined' || !GA_TRACKING_ID) return;

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('config', GA_TRACKING_ID, {
    page_title: title || document.title,
    page_location: url,
  });
};

// Track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', eventName, {
    event_category: 'engagement',
    event_label: parameters?.label,
    value: parameters?.value,
    ...parameters,
  });
};

// Venue-specific tracking events
export const trackVenueView = (venueId: string, venueName: string) => {
  trackEvent('venue_view', {
    venue_id: venueId,
    venue_name: venueName,
    event_category: 'venue_interaction',
  });
};

export const trackVenueCTA = (venueId: string, ctaType: string, venueName: string) => {
  trackEvent('venue_cta_click', {
    venue_id: venueId,
    venue_name: venueName,
    cta_type: ctaType,
    event_category: 'conversion',
  });
};

export const trackReservationAttempt = (venueId: string, venueName: string) => {
  trackEvent('reservation_attempt', {
    venue_id: venueId,
    venue_name: venueName,
    event_category: 'conversion',
    value: 1,
  });
};

export const trackPhoneClick = (venueId: string, phoneNumber: string) => {
  trackEvent('phone_click', {
    venue_id: venueId,
    phone_number: phoneNumber,
    event_category: 'contact',
  });
};

export const trackDirectionsRequest = (venueId: string, venueName: string) => {
  trackEvent('directions_request', {
    venue_id: venueId,
    venue_name: venueName,
    event_category: 'navigation',
  });
};

export const trackGalleryInteraction = (venueId: string, imageIndex: number) => {
  trackEvent('gallery_interaction', {
    venue_id: venueId,
    image_index: imageIndex,
    event_category: 'engagement',
  });
};

export const trackBrandComparison = (selectedBrand: string, selectedVenue: string) => {
  trackEvent('brand_comparison', {
    selected_brand: selectedBrand,
    selected_venue: selectedVenue,
    event_category: 'engagement',
  });
};

export const trackScrollDepth = (depth: number, page: string) => {
  trackEvent('scroll_depth', {
    scroll_depth: depth,
    page: page,
    event_category: 'engagement',
  });
};

export const trackTimeOnPage = (timeInSeconds: number, page: string) => {
  trackEvent('time_on_page', {
    time_seconds: timeInSeconds,
    page: page,
    event_category: 'engagement',
  });
};

export const trackError = (errorType: string, errorMessage: string, page: string) => {
  trackEvent('error', {
    error_type: errorType,
    error_message: errorMessage,
    page: page,
    event_category: 'error',
  });
};

export const trackPerformance = (metric: string, value: number, page: string) => {
  trackEvent('performance_metric', {
    metric_name: metric,
    metric_value: value,
    page: page,
    event_category: 'performance',
  });
};

// Web Vitals tracking
export const trackWebVitals = () => {
  if (typeof window === 'undefined' || !window.gtag) return;

  // Track Core Web Vitals
  const trackMetric = (metric: any) => {
    trackEvent('web_vital', {
      metric_name: metric.name,
      metric_value: Math.round(metric.value),
      metric_delta: Math.round(metric.delta),
      page: window.location.pathname,
      event_category: 'performance',
    });
  };

  // First Contentful Paint
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'paint') {
          trackEvent('paint_metric', {
            metric_name: entry.name,
            metric_value: Math.round(entry.startTime),
            page: window.location.pathname,
            event_category: 'performance',
          });
        }
      });
    });

    observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
  }

  // Track page load time
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    trackEvent('page_load_time', {
      load_time: Math.round(loadTime),
      page: window.location.pathname,
      event_category: 'performance',
    });
  });
};

// Enhanced ecommerce tracking for premium experiences
export const trackPremiumExperienceView = (experienceType: string, venueId: string) => {
  trackEvent('premium_experience_view', {
    experience_type: experienceType,
    venue_id: venueId,
    event_category: 'premium_content',
    value: 100, // Premium experience value
  });
};

export const trackMembershipInterest = (venueId: string, membershipType: string) => {
  trackEvent('membership_interest', {
    venue_id: venueId,
    membership_type: membershipType,
    event_category: 'conversion',
    value: 500, // Estimated membership value
  });
};

// User journey tracking
export const trackUserJourney = (step: string, venueId?: string, additionalData?: Record<string, any>) => {
  trackEvent('user_journey_step', {
    journey_step: step,
    venue_id: venueId,
    timestamp: new Date().toISOString(),
    ...additionalData,
    event_category: 'user_journey',
  });
};

// A/B testing support
export const trackExperiment = (experimentName: string, variant: string, venueId?: string) => {
  trackEvent('experiment_view', {
    experiment_name: experimentName,
    variant: variant,
    venue_id: venueId,
    event_category: 'experiment',
  });
};

// Export all tracking functions
export const analytics = {
  initGA,
  trackPageView,
  trackEvent,
  trackVenueView,
  trackVenueCTA,
  trackReservationAttempt,
  trackPhoneClick,
  trackDirectionsRequest,
  trackGalleryInteraction,
  trackBrandComparison,
  trackScrollDepth,
  trackTimeOnPage,
  trackError,
  trackPerformance,
  trackWebVitals,
  trackPremiumExperienceView,
  trackMembershipInterest,
  trackUserJourney,
  trackExperiment,
};