// Mobile-specific types and interfaces

export interface TouchGesture {
  type: 'swipe' | 'pinch' | 'longPress' | 'pullToRefresh' | 'tap' | 'doubleTap';
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  velocity?: number;
  duration?: number;
  scale?: number;
  center?: { x: number; y: number };
}

export interface HapticFeedback {
  type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' | 'selection';
  duration?: number;
}

export interface MobileConfig {
  enableHaptics: boolean;
  enableGestures: boolean;
  reducedMotion: boolean;
  adaptiveQuality: boolean;
  particleCount: number;
  shaderComplexity: 'low' | 'medium' | 'high';
}

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  pixelRatio: number;
  orientation: 'portrait' | 'landscape';
  deviceType: 'phone' | 'tablet' | 'desktop';
  performanceLevel: 'low' | 'medium' | 'high';
}

export interface BottomSheetConfig {
  snapPoints: number[];
  initialSnapIndex?: number;
  enablePanDownToClose?: boolean;
  enableOverDrag?: boolean;
  backdropOpacity?: number;
  backdropBlur?: number;
}

export interface CollapsibleSectionConfig {
  isOpen: boolean;
  animationDuration: number;
  easing: string;
  maxHeight?: number;
  minHeight?: number;
}

export interface ThumbZoneConfig {
  enabled: boolean;
  safeAreaBottom: number;
  ctaHeight: number;
  ctaMargin: number;
}

export interface SwipeConfig {
  threshold: number;
  velocity: number;
  resistance: number;
  enableRubberBand?: boolean;
}

export interface PinchConfig {
  minScale: number;
  maxScale: number;
  initialScale: number;
  enablePan?: boolean;
}

export interface PullToRefreshConfig {
  threshold: number;
  resistance: number;
  refreshHeight: number;
  enableHaptics?: boolean;
}

export interface LongPressConfig {
  duration: number;
  hapticFeedback?: HapticFeedback;
  enableVibration?: boolean;
}

export interface MobileNavigationItem {
  id: string;
  label: string;
  icon: string;
  href?: string;
  action?: () => void;
  badge?: number;
  disabled?: boolean;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  action: () => void;
  color?: string;
  haptic?: HapticFeedback;
}

export interface MobileMenuConfig {
  items: MobileNavigationItem[];
  quickActions?: QuickAction[];
  enableGestures?: boolean;
  enableHaptics?: boolean;
  animationDuration?: number;
}

// Touch event types
export interface TouchEventData {
  touches: Touch[];
  changedTouches: Touch[];
  targetTouches: Touch[];
  timeStamp: number;
}

export interface SwipeData {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  deltaX: number;
  deltaY: number;
  velocity: number;
  direction: 'up' | 'down' | 'left' | 'right';
  distance: number;
}

export interface PinchData {
  startDistance: number;
  currentDistance: number;
  scale: number;
  centerX: number;
  centerY: number;
  deltaScale: number;
}

export interface LongPressData {
  x: number;
  y: number;
  duration: number;
  target: EventTarget | null;
}

// Mobile optimization types
export interface PerformanceLevel {
  level: 'low' | 'medium' | 'high';
  particleCount: number;
  shaderQuality: 'low' | 'medium' | 'high';
  animationFrameRate: number;
  enableComplexAnimations: boolean;
  enableParticleEffects: boolean;
  enableAdvancedShaders: boolean;
}

export interface AdaptiveConfig {
  enableAdaptiveQuality: boolean;
  performanceThresholds: {
    fps: number;
    memory: number;
    battery: number;
  };
  fallbackLevels: PerformanceLevel[];
}

// Responsive breakpoints
export const BREAKPOINTS = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
  '4k': 3840,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

// Mobile-specific CSS classes
export const MOBILE_CLASSES = {
  thumbZone: 'thumb-zone',
  safeArea: 'safe-area',
  collapsible: 'collapsible',
  bottomSheet: 'bottom-sheet',
  swipeable: 'swipeable',
  pinchable: 'pinchable',
  haptic: 'haptic-feedback',
  reducedMotion: 'reduced-motion',
  highContrast: 'high-contrast',
  touchTarget: 'touch-target',
} as const;
