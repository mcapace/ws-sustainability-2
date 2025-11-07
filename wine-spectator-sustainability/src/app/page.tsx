'use client';

import { Navigation } from '@/components/ui/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { VenueShowcase } from '@/components/sections/VenueShowcase';
import { VenueDetails } from '@/components/sections/VenueDetails';
import { BrandComparison } from '@/components/sections/BrandComparison';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { Footer } from '@/components/ui/Footer';
import { ErrorBoundary, VenueErrorBoundary } from '@/components/ui/ErrorBoundary';
import { ResponsiveTest } from '@/components/ui/ResponsiveTest';
import { PerformanceMonitor } from '@/components/ui/PerformanceMonitor';
import { LuxuryCursor } from '@/components/ui/LuxuryCursor';
import { AccessibilityToolbar, SkipToMainContent, KeyboardNavigation, HighContrastStyles } from '@/components/ui/AccessibilityFeatures';
import { ContentValidator } from '@/components/ui/ContentValidator';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#F7FAF7]">
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
        <LuxuryCursor />
        <AccessibilityToolbar />
        <KeyboardNavigation />
        <HighContrastStyles />
        
        {/* Development tools */}
        <ResponsiveTest />
        <PerformanceMonitor />
        <ContentValidator />
      </div>
    </ErrorBoundary>
  );
}