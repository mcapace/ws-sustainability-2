// Mobile utilities and device detection

import { DeviceInfo, PerformanceLevel, TouchGesture, BREAKPOINTS, Breakpoint } from '@/types/mobile';

// Device detection utilities
export function detectDevice(): DeviceInfo {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      screenWidth: 1920,
      screenHeight: 1080,
      pixelRatio: 1,
      orientation: 'landscape',
      deviceType: 'desktop',
      performanceLevel: 'high',
    };
  }

  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isTablet = /ipad|android(?!.*mobile)|tablet/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;

  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const pixelRatio = window.devicePixelRatio || 1;
  const orientation = screenHeight > screenWidth ? 'portrait' : 'landscape';

  let deviceType: 'phone' | 'tablet' | 'desktop';
  if (isMobile && !isTablet) deviceType = 'phone';
  else if (isTablet) deviceType = 'tablet';
  else deviceType = 'desktop';

  const performanceLevel = getPerformanceLevel(deviceType, pixelRatio, screenWidth);

  return {
    isMobile,
    isTablet,
    isDesktop,
    screenWidth,
    screenHeight,
    pixelRatio,
    orientation,
    deviceType,
    performanceLevel,
  };
}

// Performance level detection
export function getPerformanceLevel(
  deviceType: 'phone' | 'tablet' | 'desktop',
  pixelRatio: number,
  screenWidth: number
): 'low' | 'medium' | 'high' {
  if (deviceType === 'desktop') return 'high';
  
  // High-end mobile devices
  if (pixelRatio >= 3 && screenWidth >= 375) return 'high';
  
  // Mid-range devices
  if (pixelRatio >= 2 && screenWidth >= 320) return 'medium';
  
  // Low-end devices
  return 'low';
}

// Get performance configuration based on device
export function getPerformanceConfig(deviceInfo: DeviceInfo): PerformanceLevel {
  const { performanceLevel, deviceType, pixelRatio } = deviceInfo;

  switch (performanceLevel) {
    case 'high':
      return {
        level: 'high',
        particleCount: deviceType === 'desktop' ? 2000 : 1000,
        shaderQuality: 'high',
        animationFrameRate: 60,
        enableComplexAnimations: true,
        enableParticleEffects: true,
        enableAdvancedShaders: true,
      };
    
    case 'medium':
      return {
        level: 'medium',
        particleCount: 500,
        shaderQuality: 'medium',
        animationFrameRate: 30,
        enableComplexAnimations: true,
        enableParticleEffects: true,
        enableAdvancedShaders: false,
      };
    
    case 'low':
      return {
        level: 'low',
        particleCount: 200,
        shaderQuality: 'low',
        animationFrameRate: 30,
        enableComplexAnimations: false,
        enableParticleEffects: false,
        enableAdvancedShaders: false,
      };
  }
}

// Touch gesture utilities
export function getTouchCenter(touches: TouchList): { x: number; y: number } {
  if (touches.length === 0) return { x: 0, y: 0 };
  
  let x = 0;
  let y = 0;
  
  for (let i = 0; i < touches.length; i++) {
    x += touches[i].clientX;
    y += touches[i].clientY;
  }
  
  return {
    x: x / touches.length,
    y: y / touches.length,
  };
}

export function getTouchDistance(touch1: Touch, touch2: Touch): number {
  const dx = touch1.clientX - touch2.clientX;
  const dy = touch1.clientY - touch2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

export function calculateSwipeVelocity(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  duration: number
): number {
  const distance = Math.sqrt(
    Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
  );
  return distance / duration;
}

export function getSwipeDirection(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  threshold: number = 50
): 'up' | 'down' | 'left' | 'right' | null {
  const deltaX = endX - startX;
  const deltaY = endY - startY;
  
  if (Math.abs(deltaX) < threshold && Math.abs(deltaY) < threshold) {
    return null;
  }
  
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    return deltaX > 0 ? 'right' : 'left';
  } else {
    return deltaY > 0 ? 'down' : 'up';
  }
}

// Responsive utilities
export function getCurrentBreakpoint(width: number): Breakpoint {
  if (width >= BREAKPOINTS['4k']) return '4k';
  if (width >= BREAKPOINTS['3xl']) return '3xl';
  if (width >= BREAKPOINTS['2xl']) return '2xl';
  if (width >= BREAKPOINTS.xl) return 'xl';
  if (width >= BREAKPOINTS.lg) return 'lg';
  if (width >= BREAKPOINTS.md) return 'md';
  if (width >= BREAKPOINTS.sm) return 'sm';
  return 'xs';
}

export function isBreakpoint(breakpoint: Breakpoint, width: number): boolean {
  return width >= BREAKPOINTS[breakpoint];
}

export function isMobileBreakpoint(width: number): boolean {
  return width < BREAKPOINTS.md;
}

export function isTabletBreakpoint(width: number): boolean {
  return width >= BREAKPOINTS.md && width < BREAKPOINTS.lg;
}

export function isDesktopBreakpoint(width: number): boolean {
  return width >= BREAKPOINTS.lg;
}

// Thumb zone utilities
export function getThumbZone(screenHeight: number): {
  top: number;
  bottom: number;
  left: number;
  right: number;
} {
  const thumbZoneHeight = screenHeight * 0.3; // 30% from bottom
  const thumbZoneWidth = screenHeight * 0.2; // 20% from edges
  
  return {
    top: screenHeight - thumbZoneHeight,
    bottom: screenHeight,
    left: thumbZoneWidth,
    right: screenHeight - thumbZoneWidth,
  };
}

export function isInThumbZone(x: number, y: number, screenWidth: number, screenHeight: number): boolean {
  const thumbZone = getThumbZone(screenHeight);
  return y >= thumbZone.top && x >= thumbZone.left && x <= thumbZone.right;
}

// Safe area utilities
export function getSafeAreaInsets(): {
  top: number;
  bottom: number;
  left: number;
  right: number;
} {
  if (typeof window === 'undefined') {
    return { top: 0, bottom: 0, left: 0, right: 0 };
  }

  // Try to get safe area from CSS environment variables
  const computedStyle = getComputedStyle(document.documentElement);
  
  return {
    top: parseInt(computedStyle.getPropertyValue('--sat') || '0'),
    bottom: parseInt(computedStyle.getPropertyValue('--sab') || '0'),
    left: parseInt(computedStyle.getPropertyValue('--sal') || '0'),
    right: parseInt(computedStyle.getPropertyValue('--sar') || '0'),
  };
}

// Haptic feedback utilities
export function triggerHapticFeedback(type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' | 'selection'): void {
  if (typeof window === 'undefined') return;
  
  // Check if device supports haptic feedback
  if (!('vibrate' in navigator)) return;
  
  const patterns: { [key: string]: number | number[] } = {
    light: 10,
    medium: 20,
    heavy: 50,
    success: [10, 50, 10],
    warning: [50, 100, 50],
    error: [100, 50, 100],
    selection: 5,
  };
  
  navigator.vibrate(patterns[type]);
}

// Memory and performance monitoring
export function getMemoryInfo(): {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
} | null {
  if (typeof window === 'undefined') return null;
  
  const memory = (performance as unknown as { memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  }}).memory;
  
  if (!memory) return null;
  
  return {
    usedJSHeapSize: memory.usedJSHeapSize,
    totalJSHeapSize: memory.totalJSHeapSize,
    jsHeapSizeLimit: memory.jsHeapSizeLimit,
  };
}

export function isLowMemory(): boolean {
  const memoryInfo = getMemoryInfo();
  if (!memoryInfo) return false;
  
  const memoryUsage = memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit;
  return memoryUsage > 0.8; // 80% memory usage threshold
}

// Battery API utilities
export function getBatteryInfo(): Promise<{
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
} | null> {
  if (typeof window === 'undefined') return Promise.resolve(null);
  
  const battery = (navigator as unknown as { battery?: BatteryManager }).battery || 
                  (navigator as unknown as { webkitBattery?: BatteryManager }).webkitBattery;
  if (!battery) return Promise.resolve(null);
  
  return Promise.resolve({
    level: battery.level,
    charging: battery.charging,
    chargingTime: battery.chargingTime,
    dischargingTime: battery.dischargingTime,
  });
}

// Reduced motion detection
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// High contrast detection
export function prefersHighContrast(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-contrast: high)').matches;
}

// Dark mode detection
export function prefersDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Network information
export function getNetworkInfo(): {
  effectiveType: string;
  downlink: number;
  rtt: number;
  saveData: boolean;
} | null {
  if (typeof window === 'undefined') return null;
  
  const connection = (navigator as unknown as { 
    connection?: NetworkInformation;
    mozConnection?: NetworkInformation;
    webkitConnection?: NetworkInformation;
  }).connection || 
  (navigator as unknown as { 
    mozConnection?: NetworkInformation;
  }).mozConnection || 
  (navigator as unknown as { 
    webkitConnection?: NetworkInformation;
  }).webkitConnection;
  
  if (!connection) return null;
  
  return {
    effectiveType: connection.effectiveType || 'unknown',
    downlink: connection.downlink || 0,
    rtt: connection.rtt || 0,
    saveData: connection.saveData || false,
  };
}

// Adaptive quality based on network and device
export function getAdaptiveQuality(): {
  imageQuality: 'low' | 'medium' | 'high';
  animationQuality: 'low' | 'medium' | 'high';
  enableAdvancedFeatures: boolean;
} {
  const deviceInfo = detectDevice();
  const networkInfo = getNetworkInfo();
  const memoryInfo = getMemoryInfo();
  
  // Low quality if poor network or low memory
  if (
    networkInfo?.saveData ||
    (networkInfo?.effectiveType === 'slow-2g' || networkInfo?.effectiveType === '2g') ||
    isLowMemory() ||
    deviceInfo.performanceLevel === 'low'
  ) {
    return {
      imageQuality: 'low',
      animationQuality: 'low',
      enableAdvancedFeatures: false,
    };
  }
  
  // Medium quality for mid-range devices or slower networks
  if (
    deviceInfo.performanceLevel === 'medium' ||
    networkInfo?.effectiveType === '3g'
  ) {
    return {
      imageQuality: 'medium',
      animationQuality: 'medium',
      enableAdvancedFeatures: true,
    };
  }
  
  // High quality for high-end devices and fast networks
  return {
    imageQuality: 'high',
    animationQuality: 'high',
    enableAdvancedFeatures: true,
  };
}
