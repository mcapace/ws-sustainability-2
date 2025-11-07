module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:4000'],
      startServerCommand: 'npm run dev',
      startServerReadyPattern: 'Ready in',
      startServerReadyTimeout: 30000,
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --disable-setuid-sandbox',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        
        // Core Web Vitals
        'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'speed-index': ['error', { maxNumericValue: 3000 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        
        // Performance metrics
        'unused-css-rules': ['warn', { maxLength: 0 }],
        'unused-javascript': ['warn', { maxLength: 0 }],
        'modern-image-formats': 'error',
        'uses-optimized-images': 'error',
        'uses-webp-images': 'error',
        'uses-text-compression': 'error',
        'uses-responsive-images': 'error',
        
        // Accessibility
        'color-contrast': 'error',
        'heading-order': 'error',
        'html-has-lang': 'error',
        'image-alt': 'error',
        'label': 'error',
        'link-name': 'error',
        'meta-description': 'error',
        
        // Best practices
        'is-on-https': 'error',
        'no-vulnerable-libraries': 'error',
        'uses-https': 'error',
        'uses-passive-event-listeners': 'error',
        
        // SEO
        'canonical': 'error',
        'hreflang': 'error',
        'meta-description': 'error',
        'robots-txt': 'error',
        'structured-data': 'error',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    server: {
      command: 'npm run dev',
      port: 4000,
    },
  },
};
