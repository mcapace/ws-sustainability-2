export const SITE_CONFIG = {
  name: 'Cigar Aficionado Select',
  description: 'Premium cigar lounge experiences featuring Davidoff of Geneva and Barclay Rex',
  url: 'https://bestcigarlounges.cigaraficionado.com',
  ogImage: '/images/og-image.jpg',
} as const;

export const BRAND_COLORS = {
  davidoff: {
    primary: '#D4AF37', // Gold
    secondary: '#B8860B', // Dark goldenrod
    accent: '#FFD700', // Gold
    text: '#1A1A1A', // Dark charcoal
  },
  'barclay-rex': {
    primary: '#8B4513', // Saddle brown
    secondary: '#A0522D', // Sienna
    accent: '#CD853F', // Peru
    text: '#1A1A1A', // Dark charcoal
  },
  luxury: {
    charcoal: '#1A1A1A',
    cream: '#F5F5DC',
    gold: '#D4AF37',
    copper: '#8B4513',
    slate: '#2D3748',
  },
} as const;

export const BREAKPOINTS = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  large: '1440px',
} as const;

export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.6,
  },
  easing: {
    easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
    easeIn: 'cubic-bezier(0.7, 0, 0.84, 0)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

export const PERFORMANCE_CONFIG = {
  imageSizes: {
    mobile: 320,
    tablet: 768,
    desktop: 1024,
    large: 1920,
  },
  lazyLoadOffset: 100,
  animationReducedMotion: 'prefers-reduced-motion: reduce',
} as const;
