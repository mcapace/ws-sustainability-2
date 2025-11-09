'use client';

import { useCallback } from 'react';
import { Navigation } from '@/components/ui/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { VenueShowcase } from '@/components/sections/VenueShowcase';
import { VenueDetails } from '@/components/sections/VenueDetails';
import { BrandComparison } from '@/components/sections/BrandComparison';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { Footer } from '@/components/ui/Footer';
import { ErrorBoundary, VenueErrorBoundary } from '@/components/ui/ErrorBoundary';
import dynamic from 'next/dynamic';
import { AccessibilityToolbar, SkipToMainContent, KeyboardNavigation, HighContrastStyles } from '@/components/ui/AccessibilityFeatures';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MobileProvider } from '@/components/providers/MobileProvider';
import { MobileNavigation } from '@/components/mobile/MobileNavigation';
import type { MobileNavigationItem, QuickAction } from '@/types/mobile';
import { useInteractionAnalytics } from '@/components/providers/AnalyticsProvider';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const LuxuryCursor = dynamic(
  () =>
    import('@/components/ui/LuxuryCursor').then(module => ({
      default: module.LuxuryCursor,
    })),
  { ssr: false, loading: () => null },
);

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
const ENABLE_LUXURY_CURSOR = process.env.NEXT_PUBLIC_ENABLE_LUXURY_CURSOR !== 'false';

export default function Home() {
  const { trackInteraction } = useInteractionAnalytics();
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
          
          <main id="main-content">
            <ErrorBoundary>
              <HeroSection />
            </ErrorBoundary>
            
            <VenueErrorBoundary>
              <VenueShowcase />
            </VenueErrorBoundary>
            
            <ErrorBoundary>
              <VenueDetails />
            </ErrorBoundary>
            
            <ErrorBoundary>
              <BrandComparison />
            </ErrorBoundary>
          </main>
          
          <Footer />
          
          {/* Scroll Progress and Back to Top */}
          <ScrollProgress />
          
          {/* Luxury features */}
          {ENABLE_LUXURY_CURSOR && <LuxuryCursor />}
          <AccessibilityToolbar />
          <KeyboardNavigation />
          <HighContrastStyles />
          
          {/* Development tools */}
          {ENABLE_TOOLING && (
            <>
              <ResponsiveTest />
              <PerformanceMonitor />
              <ContentValidator />
            </>
          )}

          <MobileNavigation items={mobileNavigationItems} quickActions={mobileQuickActions} />
        </div>
      </ErrorBoundary>
    </MobileProvider>
  );
}