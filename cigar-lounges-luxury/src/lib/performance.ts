// Performance monitoring and optimization utilities
'use client';

// Web Vitals monitoring
export const reportWebVitals = (metric: any) => {
  // Send to Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }

  // Send to custom analytics
  if (typeof window !== 'undefined' && window.customAnalytics) {
    window.customAnalytics.track('web_vital', {
      name: metric.name,
      value: metric.value,
      delta: metric.delta,
      id: metric.id,
    });
  }
};

// Performance budget monitoring
export const performanceBudget = {
  // Core Web Vitals thresholds
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100,  // First Input Delay (ms)
  CLS: 0.1,  // Cumulative Layout Shift
  
  // Additional metrics
  FCP: 1800, // First Contentful Paint (ms)
  TTFB: 800, // Time to First Byte (ms)
  TTI: 3800, // Time to Interactive (ms)
  
  // Bundle size limits (KB)
  JS_BUNDLE_SIZE: 500,
  CSS_BUNDLE_SIZE: 100,
  IMAGE_SIZE: 500,
};

// Check if performance metrics meet budget
export const checkPerformanceBudget = (metrics: Record<string, number>): {
  passed: boolean;
  violations: string[];
} => {
  const violations: string[] = [];

  Object.entries(metrics).forEach(([metric, value]) => {
    const threshold = performanceBudget[metric as keyof typeof performanceBudget];
    if (threshold && value > threshold) {
      violations.push(`${metric}: ${value}ms (threshold: ${threshold}ms)`);
    }
  });

  return {
    passed: violations.length === 0,
    violations,
  };
};

// Resource timing analysis
export const analyzeResourceTiming = () => {
  if (typeof window === 'undefined' || !window.performance) return null;

  const resources = window.performance.getEntriesByType('resource');
  const analysis = {
    totalResources: resources.length,
    totalSize: 0,
    slowResources: [] as any[],
    resourceTypes: {
      script: 0,
      stylesheet: 0,
      image: 0,
      font: 0,
      other: 0,
    },
  };

  resources.forEach((resource: any) => {
    const duration = resource.responseEnd - resource.startTime;
    const size = resource.transferSize || 0;
    
    analysis.totalSize += size;
    
    // Identify slow resources (>1s)
    if (duration > 1000) {
      analysis.slowResources.push({
        name: resource.name,
        duration: Math.round(duration),
        size: Math.round(size / 1024), // KB
      });
    }
    
    // Categorize resources
    const initiatorType = resource.initiatorType;
    if (analysis.resourceTypes.hasOwnProperty(initiatorType)) {
      analysis.resourceTypes[initiatorType]++;
    } else {
      analysis.resourceTypes.other++;
    }
  });

  return analysis;
};

// Image optimization utilities
export const optimizeImageUrl = (
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'jpeg' | 'png';
  } = {}
): string => {
  const { width, height, quality = 75, format = 'webp' } = options;
  
  // If using Next.js Image Optimization API
  if (src.startsWith('/') || src.includes('vercel.app')) {
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    if (quality) params.set('q', quality.toString());
    if (format) params.set('f', format);
    
    return `${src}?${params.toString()}`;
  }
  
  // For external images, you might use a service like Cloudinary
  if (src.includes('cloudinary.com')) {
    const transformations = [];
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    if (quality) transformations.push(`q_${quality}`);
    if (format) transformations.push(`f_${format}`);
    
    const transformString = transformations.join(',');
    return src.replace('/upload/', `/upload/${transformString}/`);
  }
  
  return src;
};

// Lazy loading utilities
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };
  
  return new IntersectionObserver(callback, defaultOptions);
};

// Preloading utilities
export const preloadResource = (
  href: string,
  as: 'script' | 'style' | 'image' | 'font' | 'fetch',
  crossorigin?: 'anonymous' | 'use-credentials'
) => {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  
  if (crossorigin) {
    link.crossOrigin = crossorigin;
  }
  
  document.head.appendChild(link);
};

// Critical resource preloading
export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return;
  
  // Preload critical fonts
  preloadResource('/fonts/playfair-display.woff2', 'font', 'anonymous');
  preloadResource('/fonts/inter.woff2', 'font', 'anonymous');
  
  // Preload critical images
  preloadResource('/images/hero-bg.jpg', 'image');
  preloadResource('/images/logo.svg', 'image');
  
  // Preload critical CSS
  preloadResource('/styles/critical.css', 'style');
};

// Performance monitoring initialization
export const initPerformanceMonitoring = () => {
  if (typeof window === 'undefined') return;
  
  // Monitor Core Web Vitals
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(reportWebVitals);
    getFID(reportWebVitals);
    getFCP(reportWebVitals);
    getLCP(reportWebVitals);
    getTTFB(reportWebVitals);
  });
  
  // Monitor resource timing
  window.addEventListener('load', () => {
    setTimeout(() => {
      const analysis = analyzeResourceTiming();
      if (analysis) {
        console.log('Resource Timing Analysis:', analysis);
        
        // Send to analytics
        if (window.gtag) {
          window.gtag('event', 'resource_analysis', {
            event_category: 'Performance',
            custom_map: {
              total_resources: analysis.totalResources,
              total_size: Math.round(analysis.totalSize / 1024), // KB
              slow_resources: analysis.slowResources.length,
            },
          });
        }
      }
    }, 2000);
  });
  
  // Preload critical resources
  preloadCriticalResources();
};

// Bundle size monitoring
export const monitorBundleSize = () => {
  if (typeof window === 'undefined') return;
  
  const scripts = Array.from(document.querySelectorAll('script[src]'));
  let totalScriptSize = 0;
  
  scripts.forEach(script => {
    const src = script.getAttribute('src');
    if (src && !src.includes('data:')) {
      // This is a simplified approach - in production you'd want more sophisticated monitoring
      fetch(src, { method: 'HEAD' })
        .then(response => {
          const size = response.headers.get('content-length');
          if (size) {
            totalScriptSize += parseInt(size);
          }
        })
        .catch(() => {
          // Ignore errors for external scripts
        });
    }
  });
  
  // Report bundle size
  setTimeout(() => {
    if (totalScriptSize > performanceBudget.JS_BUNDLE_SIZE * 1024) {
      console.warn(`Bundle size exceeds budget: ${Math.round(totalScriptSize / 1024)}KB`);
    }
  }, 5000);
};

// Type declarations
declare global {
  interface Window {
    customAnalytics?: {
      track: (event: string, data: any) => void;
    };
  }
}
