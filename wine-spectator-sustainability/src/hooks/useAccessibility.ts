'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

interface AccessibilityState {
  isReducedMotion: boolean;
  isHighContrast: boolean;
  isScreenReader: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  focusVisible: boolean;
  currentFocus: HTMLElement | null;
}

interface FocusTrapOptions {
  container: HTMLElement;
  initialFocus?: HTMLElement;
  returnFocus?: HTMLElement;
  escapeDeactivates?: boolean;
}

export function useAccessibility() {
  const [state, setState] = useState<AccessibilityState>({
    isReducedMotion: false,
    isHighContrast: false,
    isScreenReader: false,
    fontSize: 'medium',
    focusVisible: false,
    currentFocus: null
  });

  // Detect user preferences
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check for high contrast preference
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    // Detect screen reader (basic detection)
    const isScreenReader = 
      navigator.userAgent.includes('NVDA') ||
      navigator.userAgent.includes('JAWS') ||
      navigator.userAgent.includes('VoiceOver') ||
      window.speechSynthesis?.speaking;

    setState(prev => ({
      ...prev,
      isReducedMotion: prefersReducedMotion,
      isHighContrast: prefersHighContrast,
      isScreenReader: !!isScreenReader
    }));

    // Listen for preference changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setState(prev => ({ ...prev, isReducedMotion: e.matches }));
    };

    const handleContrastChange = (e: MediaQueryListEvent) => {
      setState(prev => ({ ...prev, isHighContrast: e.matches }));
    };

    motionQuery.addEventListener('change', handleMotionChange);
    contrastQuery.addEventListener('change', handleContrastChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
    };
  }, []);

  // Apply accessibility styles
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'accessibility-styles';
    
    let css = '';

    if (state.isReducedMotion) {
      css += `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
        
        .parallax-element {
          transform: none !important;
        }
      `;
    }

    if (state.isHighContrast) {
      css += `
        .text-luxury-cream {
          color: #ffffff !important;
        }
        
        .bg-luxury-charcoal {
          background-color: #000000 !important;
        }
        
        .border-luxury-slate {
          border-color: #ffffff !important;
        }
        
        .text-cigar-gold {
          color: #ffff00 !important;
        }
      `;
    }

    // Font size adjustments
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px',
      'extra-large': '20px'
    };

    css += `
      html {
        font-size: ${fontSizeMap[state.fontSize]} !important;
      }
    `;

    style.textContent = css;
    
    // Remove existing styles
    const existingStyle = document.getElementById('accessibility-styles');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    document.head.appendChild(style);

    return () => {
      const styleElement = document.getElementById('accessibility-styles');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [state.isReducedMotion, state.isHighContrast, state.fontSize]);

  // Keyboard navigation handler
  const handleKeyboardNavigation = useCallback((e: KeyboardEvent) => {
    const { key, target } = e;
    const element = target as HTMLElement;

    // Show focus indicators on keyboard navigation
    if (key === 'Tab') {
      setState(prev => ({ ...prev, focusVisible: true, currentFocus: element }));
    }

    // Handle escape key
    if (key === 'Escape') {
      // Close any open modals or menus
      const modals = document.querySelectorAll('[role="dialog"]');
      modals.forEach(modal => {
        const closeButton = modal.querySelector('[aria-label*="close"], [aria-label*="Close"]') as HTMLElement;
        if (closeButton) {
          closeButton.click();
        }
      });
    }

    // Handle arrow keys for custom components
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      const focusableElements = element.closest('[role="menu"], [role="tablist"], [role="listbox"]');
      if (focusableElements) {
        e.preventDefault();
        navigateFocusableElements(focusableElements as HTMLElement, key);
      }
    }
  }, []);

  // Navigate focusable elements with arrow keys
  const navigateFocusableElements = (container: HTMLElement, direction: string) => {
    const focusableElements = Array.from(
      container.querySelectorAll('button, [tabindex]:not([tabindex="-1"]), a, input, textarea, select')
    ) as HTMLElement[];

    const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);
    let nextIndex = currentIndex;

    switch (direction) {
      case 'ArrowDown':
      case 'ArrowRight':
        nextIndex = (currentIndex + 1) % focusableElements.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        nextIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1;
        break;
    }

    focusableElements[nextIndex]?.focus();
  };

  // Event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    return () => {
      document.removeEventListener('keydown', handleKeyboardNavigation);
    };
  }, [handleKeyboardNavigation]);

  // Hide focus indicators on mouse interaction
  useEffect(() => {
    const handleMouseInteraction = () => {
      setState(prev => ({ ...prev, focusVisible: false }));
    };

    document.addEventListener('mousedown', handleMouseInteraction);
    document.addEventListener('touchstart', handleMouseInteraction);

    return () => {
      document.removeEventListener('mousedown', handleMouseInteraction);
      document.removeEventListener('touchstart', handleMouseInteraction);
    };
  }, []);

  return {
    ...state,
    setFontSize: (size: 'small' | 'medium' | 'large' | 'extra-large') => {
      setState(prev => ({ ...prev, fontSize: size }));
    },
    announceToScreenReader: (message: string) => {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = message;
      
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }
  };
}

// Focus trap hook for modals
export function useFocusTrap(options: FocusTrapOptions) {
  const { container, initialFocus, returnFocus, escapeDeactivates = true } = options;
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!container) return;

    // Store the element that was focused before the trap
    previousFocus.current = document.activeElement as HTMLElement;

    // Get all focusable elements within the container
    const focusableElements = Array.from(
      container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];

    if (focusableElements.length === 0) return;

    // Focus the initial element or the first focusable element
    const elementToFocus = initialFocus || focusableElements[0];
    elementToFocus.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }

      if (e.key === 'Escape' && escapeDeactivates) {
        // Return focus to the element that was focused before the trap
        if (returnFocus || previousFocus.current) {
          (returnFocus || previousFocus.current)?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      
      // Return focus when the trap is removed
      if (returnFocus || previousFocus.current) {
        (returnFocus || previousFocus.current)?.focus();
      }
    };
  }, [container, initialFocus, returnFocus, escapeDeactivates]);
}

// ARIA live region for dynamic content
export function useAriaLiveRegion() {
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.textContent = message;
    
    document.body.appendChild(liveRegion);
    
    setTimeout(() => {
      if (document.body.contains(liveRegion)) {
        document.body.removeChild(liveRegion);
      }
    }, 1000);
  }, []);

  return { announce };
}

// Screen reader only utility - moved to components/ui/ScreenReaderOnly.tsx
