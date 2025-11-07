import { Fraunces, Manrope, Space_Grotesk } from 'next/font/google';

// Preload critical fonts with optimal settings
export const campaignDisplay = Fraunces({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  axes: ['SOFT', 'WONK'],
  fallback: ['"Times New Roman"', 'serif'],
  adjustFontFallback: true,
});

export const campaignBody = Manrope({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  adjustFontFallback: true,
});

export const campaignAccent = Space_Grotesk({
  variable: '--font-accent',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
});

// Font optimization utilities
export const fontOptimization = {
  // Critical font loading
  preloadFonts: () => {
    if (typeof window !== 'undefined') {
      // Preload critical fonts
      const fonts = [
        { family: 'Fraunces', weight: '400', style: 'normal' },
        { family: 'Fraunces', weight: '700', style: 'normal' },
        { family: 'Manrope', weight: '400', style: 'normal' },
        { family: 'Manrope', weight: '600', style: 'normal' },
        { family: 'Space Grotesk', weight: '500', style: 'normal' },
      ];

      fonts.forEach(font => {
        if ('fonts' in document) {
          (document as any).fonts.load(`${font.weight} ${font.style} ${font.family}`);
        }
      });
    }
  },

  // Font display optimization
  optimizeFontDisplay: () => {
    if (typeof window !== 'undefined') {
      // Set font-display for all fonts
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-family: 'Fraunces';
          font-display: swap;
        }
        @font-face {
          font-family: 'Manrope';
          font-display: swap;
        }
        @font-face {
          font-family: 'Space Grotesk';
          font-display: swap;
        }
      `;
      document.head.appendChild(style);
    }
  },
};

// Font loading performance monitoring
export const fontPerformanceMonitor = {
  measureFontLoad: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name.includes('font')) {
            console.log(`Font loaded: ${entry.name} in ${entry.duration}ms`);
            
            // Log to analytics if available
            if (window.gtag) {
              window.gtag('event', 'font_load', {
                font_name: entry.name,
                load_time: Math.round(entry.duration),
              });
            }
          }
        });
      });

      observer.observe({ entryTypes: ['resource'] });
    }
  },
};
