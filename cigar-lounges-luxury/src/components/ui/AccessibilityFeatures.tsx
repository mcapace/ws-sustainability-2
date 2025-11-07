'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Eye, EyeOff, Keyboard, MousePointer } from 'lucide-react';

// Skip to main content link
export function SkipToMainContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-cigar-gold focus:text-luxury-charcoal focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold focus:outline-none focus:ring-2 focus:ring-cigar-gold focus:ring-offset-2 focus:ring-offset-luxury-charcoal"
    >
      Skip to main content
    </a>
  );
}

// Accessibility toolbar
export function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    highContrast: false,
    reducedMotion: false,
    largeText: false,
    screenReader: false,
  });

  useEffect(() => {
    // Check for user preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPreferences(prev => ({ ...prev, reducedMotion: true }));
    }
    
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      setPreferences(prev => ({ ...prev, highContrast: true }));
    }
  }, []);

  useEffect(() => {
    // Apply accessibility preferences
    const root = document.documentElement;
    
    if (preferences.reducedMotion) {
      root.style.setProperty('--animation-duration', '0.01ms');
      root.style.setProperty('--animation-iteration-count', '1');
    } else {
      root.style.removeProperty('--animation-duration');
      root.style.removeProperty('--animation-iteration-count');
    }
    
    if (preferences.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    if (preferences.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }
    
    if (preferences.screenReader) {
      root.classList.add('screen-reader-optimized');
    } else {
      root.classList.remove('screen-reader-optimized');
    }
  }, [preferences]);

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed top-4 right-4 z-[9998]">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-luxury-charcoal/90 backdrop-blur-lg border border-luxury-slate/20 text-luxury-cream p-3 rounded-lg hover:bg-luxury-charcoal transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Accessibility options"
      >
        <Eye className="w-5 h-5" />
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-12 right-0 bg-luxury-charcoal/95 backdrop-blur-lg border border-luxury-slate/20 rounded-lg p-4 min-w-[200px] shadow-xl"
          >
            <h3 className="text-sm font-semibold text-luxury-cream mb-3">Accessibility</h3>
            
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm text-luxury-cream/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.highContrast}
                  onChange={() => togglePreference('highContrast')}
                  className="rounded border-luxury-slate/30"
                />
                <span>High Contrast</span>
              </label>
              
              <label className="flex items-center space-x-2 text-sm text-luxury-cream/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.reducedMotion}
                  onChange={() => togglePreference('reducedMotion')}
                  className="rounded border-luxury-slate/30"
                />
                <span>Reduce Motion</span>
              </label>
              
              <label className="flex items-center space-x-2 text-sm text-luxury-cream/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.largeText}
                  onChange={() => togglePreference('largeText')}
                  className="rounded border-luxury-slate/30"
                />
                <span>Large Text</span>
              </label>
              
              <label className="flex items-center space-x-2 text-sm text-luxury-cream/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.screenReader}
                  onChange={() => togglePreference('screenReader')}
                  className="rounded border-luxury-slate/30"
                />
                <span>Screen Reader</span>
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Focus trap for modals
export function FocusTrap({ children, isActive }: { children: React.ReactNode; isActive: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus();
    
    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive]);
  
  return (
    <div ref={containerRef} className="focus-trap">
      {children}
    </div>
  );
}

// Screen reader only text
export function ScreenReaderText({ children }: { children: React.ReactNode }) {
  return (
    <span className="sr-only">
      {children}
    </span>
  );
}

// Accessible image with proper alt text
export function AccessibleImage({ 
  src, 
  alt, 
  ...props 
}: { 
  src: string; 
  alt: string; 
  [key: string]: any;
}) {
  const [imageError, setImageError] = useState(false);
  
  return (
    <img
      src={src}
      alt={imageError ? 'Image failed to load' : alt}
      onError={() => setImageError(true)}
      loading="lazy"
      {...props}
    />
  );
}

// Keyboard navigation helper
export function KeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip to main content with 'S' key
      if (e.key === 's' || e.key === 'S') {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          const mainContent = document.getElementById('main-content');
          if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
      
      // Toggle accessibility toolbar with 'A' key
      if (e.key === 'a' || e.key === 'A') {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          const toolbar = document.querySelector('[aria-label="Accessibility options"]') as HTMLButtonElement;
          if (toolbar) {
            toolbar.click();
          }
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  return null;
}

// ARIA live region for announcements
export function LiveRegion({ children }: { children: React.ReactNode }) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {children}
    </div>
  );
}

// High contrast mode styles
export function HighContrastStyles() {
  return (
    <style jsx global>{`
      .high-contrast {
        --luxury-cream: #ffffff;
        --luxury-charcoal: #000000;
        --luxury-slate: #333333;
        --cigar-gold: #ffff00;
        --cigar-copper: #ff8800;
        --accent-tobacco: #ff6600;
      }
      
      .high-contrast * {
        background-image: none !important;
        box-shadow: none !important;
        text-shadow: none !important;
      }
      
      .high-contrast .gradient-text {
        background: none !important;
        -webkit-background-clip: unset !important;
        -webkit-text-fill-color: unset !important;
        color: var(--cigar-gold) !important;
      }
      
      .large-text {
        font-size: 1.25em;
      }
      
      .large-text h1 { font-size: 3em; }
      .large-text h2 { font-size: 2.5em; }
      .large-text h3 { font-size: 2em; }
      .large-text h4 { font-size: 1.75em; }
      .large-text h5 { font-size: 1.5em; }
      .large-text h6 { font-size: 1.25em; }
      
      .screen-reader-optimized * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
      
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `}</style>
  );
}
