'use client';

import { ReactNode, useEffect } from 'react';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';
import { useAdvancedScroll } from '@/hooks/useAdvancedScroll';
import { useEasterEggs } from '@/hooks/useEasterEggs';
import { useAccessibility } from '@/hooks/useAccessibility';

interface OptimizationProviderProps {
  children: ReactNode;
}

export function OptimizationProvider({ children }: OptimizationProviderProps) {
  const { qualitySettings, isLowPerformance } = usePerformanceOptimization();
  const { addProgressBar, addParallaxLayer, scrollProgress } = useAdvancedScroll();
  const { isKonamiActive, unlocked } = useEasterEggs();
  const { isReducedMotion, isHighContrast, announceToScreenReader } = useAccessibility();

  // Apply performance-based optimizations
  useEffect(() => {
    const body = document.body;
    
    // Add performance classes based on device capabilities
    if (isLowPerformance) {
      body.classList.add('low-performance-mode');
    } else {
      body.classList.remove('low-performance-mode');
    }

    // Add quality settings classes
    body.classList.add(`quality-${qualitySettings.animationQuality}`);
    
    // Apply reduced motion preferences
    if (isReducedMotion) {
      body.classList.add('reduced-motion');
    } else {
      body.classList.remove('reduced-motion');
    }

    // Apply high contrast preferences
    if (isHighContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }

    // Apply Easter egg states
    if (isKonamiActive) {
      body.classList.add('konami-active');
    } else {
      body.classList.remove('konami-active');
    }

    // Add unlocked Easter eggs classes
    unlocked.forEach(eggId => {
      body.classList.add(`easter-egg-${eggId}`);
    });

    return () => {
      // Cleanup classes on unmount
      body.classList.remove(
        'low-performance-mode',
        'reduced-motion',
        'high-contrast',
        'konami-active',
        'quality-low',
        'quality-medium',
        'quality-high'
      );
      
      unlocked.forEach(eggId => {
        body.classList.remove(`easter-egg-${eggId}`);
      });
    };
  }, [isLowPerformance, qualitySettings.animationQuality, isReducedMotion, isHighContrast, isKonamiActive, unlocked]);

  // Initialize scroll progress bar
  useEffect(() => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.width = '0%';
    document.body.appendChild(progressBar);

    addProgressBar(progressBar);

    return () => {
      if (document.body.contains(progressBar)) {
        document.body.removeChild(progressBar);
      }
    };
  }, [addProgressBar]);

  // Performance monitoring
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const logPerformance = () => {
        console.log('🚀 Performance Metrics:', {
          qualitySettings,
          isLowPerformance,
          isKonamiActive,
          unlocked: unlocked.length,
          isReducedMotion,
          isHighContrast
        });
      };

      // Log performance info after initial load
      const timer = setTimeout(logPerformance, 3000);
      return () => clearTimeout(timer);
    }
  }, [qualitySettings, isLowPerformance, isKonamiActive, unlocked, isReducedMotion, isHighContrast]);

  // Announce important state changes to screen readers
  useEffect(() => {
    if (isKonamiActive && unlocked.length === 1) {
      announceToScreenReader('Developer mode activated. Secret features unlocked.');
    }
  }, [isKonamiActive, unlocked.length, announceToScreenReader]);

  return (
    <div className="optimization-provider">
      {children}
      
      {/* Performance overlay for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-luxury-black/90 text-luxury-cream p-3 rounded-lg text-xs z-[10000] backdrop-blur-sm border border-luxury-slate/30">
          <div>FPS: {qualitySettings.animationQuality}</div>
          <div>Performance: {isLowPerformance ? 'Low' : 'High'}</div>
          <div>Easter Eggs: {unlocked.length}</div>
          <div>Konami: {isKonamiActive ? 'Active' : 'Inactive'}</div>
        </div>
      )}
    </div>
  );
}
