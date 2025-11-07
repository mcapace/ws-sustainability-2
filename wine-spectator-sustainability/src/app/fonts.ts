import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google';

// Preload critical fonts with optimal settings
export const playfairDisplay = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['serif'],
  adjustFontFallback: true,
});

export const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  adjustFontFallback: true,
});

export const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-accent',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  fallback: ['serif'],
  adjustFontFallback: true,
});

// Font optimization utilities
export const fontOptimization = {
  // Critical font loading
  preloadFonts: () => {
    if (typeof window !== 'undefined') {
      // Preload critical fonts
      const fonts = [
        { family: 'Playfair Display', weight: '400', style: 'normal' },
        { family: 'Playfair Display', weight: '700', style: 'normal' },
        { family: 'Inter', weight: '400', style: 'normal' },
        { family: 'Inter', weight: '600', style: 'normal' },
        { family: 'Cormorant Garamond', weight: '400', style: 'normal' },
        { family: 'Cormorant Garamond', weight: '600', style: 'normal' },
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
          font-family: 'Playfair Display';
          font-display: swap;
        }
        @font-face {
          font-family: 'Inter';
          font-display: swap;
        }
        @font-face {
          font-family: 'Cormorant Garamond';
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
