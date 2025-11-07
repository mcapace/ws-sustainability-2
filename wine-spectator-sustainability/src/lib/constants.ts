export const SITE_CONFIG = {
  name: 'Wine Spectator Sustainability',
  description:
    'A campaign landing experience highlighting six wineries transforming climate action into extraordinary wine.',
  url: 'https://campaign.winespectator.com/sustainability',
  ogImage: '/images/hero/sustainability-header.jpg',
} as const;

export const BRAND_COLORS = {
  campaign: {
    evergreen: '#1F3D2B',
    sage: '#A5C99B',
    clay: '#C16A3A',
    cream: '#F3F0E6',
    charcoal: '#131A1C',
  },
  firetree: {
    primary: '#A53A2B',
    secondary: '#F3A712',
    accent: '#F4D06F',
    text: '#1F1A17',
  },
  'gloria-ferrer': {
    primary: '#0D4B61',
    secondary: '#88C9C4',
    accent: '#F7E4C3',
    text: '#122029',
  },
  lallier: {
    primary: '#1B1B2D',
    secondary: '#D5B59C',
    accent: '#F0EAE2',
    text: '#151515',
  },
  piccini: {
    primary: '#EB5E28',
    secondary: '#F2B872',
    accent: '#FFEAD0',
    text: '#2F1F14',
  },
  'san-simeon': {
    primary: '#1F4E79',
    secondary: '#73B8D4',
    accent: '#C8E3F4',
    text: '#132C44',
  },
  willakenzie: {
    primary: '#0D5C54',
    secondary: '#7AB497',
    accent: '#F1F7F2',
    text: '#13312E',
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
