'use client';

import { useCallback, useMemo } from 'react';
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
import { MobileNavigation } from '@/components/mobile/MobileNavigation';
import type { MobileNavigationItem, QuickAction } from '@/types/mobile';
import { useInteractionAnalytics } from '@/components/providers/AnalyticsProvider';
import { venueData } from '@/data/venues';
import { shuffleArray } from '@/lib/shuffle';
import { AdSlot } from '@/components/ads/AdSlot';

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
      id: 'impact',
      label: 'Impact',
      icon: '📈',
      action: () => {
        scrollToSelector('#impact');
        trackInteraction('mobile_nav_click', { target: 'impact' });
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
          <Navigation />
          <AdSlot
            slotId="gam-leaderboard-top"
            label="Top Leaderboard"
            desktop={[728, 90]}
            tablet={[728, 90]}
            mobile={[300, 50]}
            className="mt-6"
          />

          <main id="main-content">
            <ErrorBoundary>
              <HeroSection />
            </ErrorBoundary>

            <VenueErrorBoundary>
              <VenueShowcase locations={shuffledLocations} />
            </VenueErrorBoundary>

            <AdSlot
              slotId="gam-mid-rectangle"
              label="Mid-Page Rectangle"
              desktop={[300, 600]}
              tablet={[300, 250]}
              mobile={[300, 250]}
              className="mt-16"
            />

            <ErrorBoundary>
              <VenueDetails locations={shuffledLocations} />
            </ErrorBoundary>

            <AdSlot
              slotId="gam-bottom-banner"
              label="Bottom Banner"
              desktop={[728, 90]}
              tablet={[468, 60]}
              mobile={[300, 50]}
              className="mt-16"
            />

          </main>

          <Footer />

          {/* Scroll Progress and Back to Top */}
          <ScrollProgress />

          <MobileNavigation items={mobileNavigationItems} quickActions={mobileQuickActions} />

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