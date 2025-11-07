'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ResponsiveTest() {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const getBreakpoint = (width: number) => {
    if (width < 640) return 'Mobile (sm)';
    if (width < 768) return 'Large Mobile';
    if (width < 1024) return 'Tablet (md)';
    if (width < 1280) return 'Desktop (lg)';
    if (width < 1536) return 'Large Desktop (xl)';
    return 'Extra Large (2xl)';
  };

  const getOrientation = (width: number, height: number) => {
    return width > height ? 'Landscape' : 'Portrait';
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          className="fixed left-4 top-1/2 transform -translate-y-1/2 z-[9999] bg-luxury-charcoal/95 backdrop-blur-lg border border-luxury-slate/20 rounded-lg p-4 text-xs text-luxury-cream"
        >
          <div className="space-y-2">
            <div className="font-bold text-cigar-gold">Responsive Test</div>
            <div>Size: {screenSize.width} × {screenSize.height}</div>
            <div>Breakpoint: {getBreakpoint(screenSize.width)}</div>
            <div>Orientation: {getOrientation(screenSize.width, screenSize.height)}</div>
            <div>Device Pixel Ratio: {window.devicePixelRatio}</div>
          </div>
          
          <button
            onClick={() => setIsVisible(false)}
            className="mt-3 w-full bg-cigar-gold text-luxury-charcoal py-1 px-2 rounded text-xs font-semibold hover:bg-cigar-gold/90"
          >
            Close
          </button>
        </motion.div>
      )}
      
      {!isVisible && (
        <motion.button
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setIsVisible(true)}
          className="fixed left-4 top-1/2 transform -translate-y-1/2 z-[9999] bg-cigar-gold text-luxury-charcoal p-2 rounded-full shadow-lg hover:bg-cigar-gold/90 transition-colors"
          title="Responsive Test Panel"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Hook to get current screen size
export function useScreenSize() {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return screenSize;
}

// Hook to get current breakpoint
export function useBreakpoint() {
  const { width } = useScreenSize();

  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    isLargeDesktop: width >= 1280,
    current: width < 640 ? 'sm' : width < 768 ? 'md' : width < 1024 ? 'lg' : width < 1280 ? 'xl' : '2xl'
  };
}
