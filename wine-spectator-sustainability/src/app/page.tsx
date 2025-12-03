'use client';

import { useCallback, useMemo, useEffect } from 'react';
import { Navigation } from '@/components/ui/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { VenueShowcase } from '@/components/sections/VenueShowcase';
import { VenueDetails } from '@/components/sections/VenueDetails';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { Footer } from '@/components/ui/Footer';
import { ErrorBoundary, VenueErrorBoundary } from '@/components/ui/ErrorBoundary';
import dynamic from 'next/dynamic';
import { SkipToMainContent } from '@/components/ui/AccessibilityFeatures';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MobileProvider } from '@/components/providers/MobileProvider';
import type { MobileNavigationItem, QuickAction } from '@/types/mobile';
import { useInteractionAnalytics } from '@/components/providers/AnalyticsProvider';
import { venueData } from '@/data/venues';
import { shuffleArray } from '@/lib/shuffle';
import { AdSlot } from '@/components/ads/AdSlot';
import { GamAd } from '@/components/ads/GamAd';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ResponsiveTest = dynamic(
  () =>
    import('@/components/ui/ResponsiveTest').then(module => ({
      default: module.ResponsiveTest,
    })),
  { ssr: false, loading: () => null },
);

const PerformanceMonitor = dynamic(
  () =>
    import('@/components/ui/PerformanceMonitor').then(module => ({
      default: module.PerformanceMonitor,
    })),
  { ssr: false, loading: () => null },
);

const ContentValidator = dynamic(
  () =>
    import('@/components/ui/ContentValidator').then(module => ({
      default: module.ContentValidator,
    })),
  { ssr: false, loading: () => null },
);

const ENABLE_TOOLING = process.env.NEXT_PUBLIC_ENABLE_TOOLING === 'true';

export default function Home() {
  const { trackInteraction } = useInteractionAnalytics();
  const shuffledLocations = useMemo(
    () => shuffleArray(venueData.brands.flatMap(brand => brand.locations)),
    [],
  );
  const scrollToSelector = useCallback((selector: string) => {
    if (typeof document === 'undefined') return;
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Handle hash navigation on page load and hash changes
  useEffect(() => {
    const scrollToHashElement = (elementId: string) => {
      // Wait for the page to be ready and elements to be rendered
      let retryCount = 0;
      const maxRetries = 20; // Maximum 2 seconds of retries (20 * 100ms)
      
      const scrollToElement = () => {
        const element = document.getElementById(elementId);
        if (element) {
          // Account for fixed header/navigation (approximately 100px)
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        } else if (retryCount < maxRetries) {
          // If element not found yet, try again after a short delay
          retryCount++;
          setTimeout(scrollToElement, 100);
        }
      };

      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        // Add a small delay to ensure all components are rendered
        setTimeout(scrollToElement, 100);
      });
    };

    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (!hash) return;

      // Remove the # from the hash
      const elementId = hash.slice(1);
      scrollToHashElement(elementId);
    };

    // Handle clicks on hash links to ensure smooth scrolling
    const handleHashLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;
      
      if (link && link.hash) {
        const elementId = link.hash.slice(1);
        // Only prevent default if it's a hash link (not just #)
        if (elementId) {
          e.preventDefault();
          // Update the URL without triggering a page reload
          window.history.pushState(null, '', link.hash);
          scrollToHashElement(elementId);
        }
      }
    };

    // Handle initial hash on page load
    // Wait a bit longer on initial load to ensure all components are mounted
    const initialTimeout = setTimeout(() => {
      handleHashNavigation();
    }, 300);

    // Handle hash changes (when clicking links while on the page)
    const handleHashChange = () => {
      handleHashNavigation();
    };

    // Listen for clicks on hash links
    document.addEventListener('click', handleHashLinkClick, true);

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      clearTimeout(initialTimeout);
      document.removeEventListener('click', handleHashLinkClick, true);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const mobileNavigationItems: MobileNavigationItem[] = [
    {
      id: 'hero',
      label: 'Hero',
      icon: '🌿',
      action: () => {
        scrollToSelector('#top');
        trackInteraction('mobile_nav_click', { target: 'hero' });
      },
    },
    {
      id: 'producers',
      label: 'Producers',
      icon: '🥂',
      action: () => {
        scrollToSelector('#producers');
        trackInteraction('mobile_nav_click', { target: 'producers' });
      },
    },
    {
      id: 'footer',
      label: 'Contact',
      icon: '✉️',
      action: () => {
        scrollToSelector('footer');
        trackInteraction('mobile_nav_click', { target: 'footer' });
      },
    },
  ];

  const mobileQuickActions: QuickAction[] = [
    {
      id: 'reserve',
      label: 'Reserve',
      icon: '📅',
      action: () => {
        scrollToSelector('#producers');
        trackInteraction('mobile_quick_action', { action: 'reserve' });
      },
    },
    {
      id: 'metrics',
      label: 'Metrics',
      icon: '📊',
      action: () => {
        scrollToSelector('#impact');
        trackInteraction('mobile_quick_action', { action: 'impact_metrics' });
      },
    },
    {
      id: 'share',
      label: 'Share',
      icon: '🔗',
      action: () => {
        trackInteraction('mobile_quick_action', { action: 'share' });
        if (typeof navigator !== 'undefined' && 'share' in navigator) {
          navigator
            .share({
              title: 'Wine Spectator Sustainability',
              text: 'Explore visionary wineries leading climate stewardship.',
              url: window.location.href,
            })
            .catch(() => {
              // noop
            });
        } else {
          scrollToSelector('#impact');
        }
      },
    },
  ];

  return (
    <MobileProvider
      initialConfig={{
        enableGestures: true,
        enableHaptics: true,
        adaptiveQuality: true,
      }}
    >
      <ErrorBoundary>
        <div className="min-h-screen bg-transparent">
          <SkipToMainContent />

          {/* Top ad - fixed above navigation, always visible, full-width band */}
          <div className="fixed top-0 left-0 right-0 z-[70] bg-[#F6F2E8] shadow-[0_2px_12px_rgba(15,27,23,0.15)] border-b border-[#E4E8E0]">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-center py-1.5 md:py-2">
              <GamAd slotId="div-gpt-ad-top" variant="top" />
            </div>
          </div>
          {/* Spacer to offset the fixed top ad height (matches creative size + padding) */}
          <div className="h-[54px] md:h-[98px]" />

          <Navigation />

          <main id="main-content">
            <ErrorBoundary>
              <HeroSection />
            </ErrorBoundary>

            <VenueErrorBoundary>
              <VenueShowcase locations={shuffledLocations} />
            </VenueErrorBoundary>

            {/* Mid-page 300x250 - centered */}
            <GamAd slotId="div-gpt-ad-mid" variant="mid" className="mt-16 mb-16" />

            <ErrorBoundary>
              <VenueDetails locations={shuffledLocations} />
            </ErrorBoundary>

            {/* Bottom ad - centered */}
            <GamAd slotId="div-gpt-ad-bottom" variant="bottom" className="mt-16 mb-24" />
          </main>

          <Footer locations={shuffledLocations} />

          {/* Scroll Progress and Back to Top */}
          <ScrollProgress />

          {/* Removed bottom MobileNavigation per request */}
          {/* <MobileNavigation items={mobileNavigationItems} quickActions={mobileQuickActions} /> */}

          {/* Development tools */}
          {ENABLE_TOOLING && (
            <>
              <ResponsiveTest />
              <PerformanceMonitor />
              <ContentValidator />
            </>
          )}
        </div>
      </ErrorBoundary>
    </MobileProvider>
  );
}