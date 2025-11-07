'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { DeviceInfo, MobileConfig, PerformanceLevel, TouchGesture } from '@/types/mobile';
import { 
  detectDevice, 
  getPerformanceConfig, 
  getAdaptiveQuality,
  triggerHapticFeedback,
  getSafeAreaInsets,
  isInThumbZone,
  prefersReducedMotion,
  prefersHighContrast,
  prefersDarkMode
} from '@/lib/mobile/utils';

// Device detection hook
export function useDevice() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [performanceConfig, setPerformanceConfig] = useState<PerformanceLevel | null>(null);

  useEffect(() => {
    const info = detectDevice();
    setDeviceInfo(info);
    setPerformanceConfig(getPerformanceConfig(info));
  }, []);

  const updateDeviceInfo = useCallback(() => {
    const info = detectDevice();
    setDeviceInfo(info);
    setPerformanceConfig(getPerformanceConfig(info));
  }, []);

  useEffect(() => {
    const handleResize = () => updateDeviceInfo();
    const handleOrientationChange = () => updateDeviceInfo();

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [updateDeviceInfo]);

  return { deviceInfo, performanceConfig, updateDeviceInfo };
}

// Mobile configuration hook
export function useMobileConfig(initialConfig?: Partial<MobileConfig>) {
  const { deviceInfo } = useDevice();
  const [config, setConfig] = useState<MobileConfig>({
    enableHaptics: true,
    enableGestures: true,
    reducedMotion: prefersReducedMotion(),
    adaptiveQuality: true,
    particleCount: 500,
    shaderComplexity: 'medium',
    ...initialConfig,
  });

  const updateConfig = useCallback((newConfig: Partial<MobileConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  // Auto-adjust config based on device
  useEffect(() => {
    if (!deviceInfo) return;

    setConfig(prev => ({
      ...prev,
      reducedMotion: prefersReducedMotion(),
      particleCount: deviceInfo.performanceLevel === 'high' ? 1000 : 
                    deviceInfo.performanceLevel === 'medium' ? 500 : 200,
      shaderComplexity: deviceInfo.performanceLevel === 'high' ? 'high' :
                       deviceInfo.performanceLevel === 'medium' ? 'medium' : 'low',
    }));
  }, [deviceInfo]);

  return { config, updateConfig };
}

// Thumb zone detection hook
export function useThumbZone() {
  const [isInThumbZone, setIsInThumbZone] = useState(false);
  const [thumbZoneBounds, setThumbZoneBounds] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  useEffect(() => {
    const updateThumbZone = () => {
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const thumbZoneHeight = screenHeight * 0.3;
      const thumbZoneWidth = screenHeight * 0.2;

      setThumbZoneBounds({
        top: screenHeight - thumbZoneHeight,
        bottom: screenHeight,
        left: thumbZoneWidth,
        right: screenWidth - thumbZoneWidth,
      });
    };

    updateThumbZone();
    window.addEventListener('resize', updateThumbZone);
    window.addEventListener('orientationchange', updateThumbZone);

    return () => {
      window.removeEventListener('resize', updateThumbZone);
      window.removeEventListener('orientationchange', updateThumbZone);
    };
  }, []);

  const checkThumbZone = useCallback((x: number, y: number) => {
    const inZone = y >= thumbZoneBounds.top && 
                   x >= thumbZoneBounds.left && 
                   x <= thumbZoneBounds.right;
    setIsInThumbZone(inZone);
    return inZone;
  }, [thumbZoneBounds]);

  return { isInThumbZone, thumbZoneBounds, checkThumbZone };
}

// Safe area hook
export function useSafeArea() {
  const [safeArea, setSafeArea] = useState(getSafeAreaInsets());

  useEffect(() => {
    const updateSafeArea = () => {
      setSafeArea(getSafeAreaInsets());
    };

    updateSafeArea();
    window.addEventListener('resize', updateSafeArea);
    window.addEventListener('orientationchange', updateSafeArea);

    return () => {
      window.removeEventListener('resize', updateSafeArea);
      window.removeEventListener('orientationchange', updateSafeArea);
    };
  }, []);

  return safeArea;
}

// Haptic feedback hook
export function useHapticFeedback() {
  const triggerHaptic = useCallback((type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' | 'selection') => {
    triggerHapticFeedback(type);
  }, []);

  const triggerSuccess = useCallback(() => triggerHaptic('success'), [triggerHaptic]);
  const triggerError = useCallback(() => triggerHaptic('error'), [triggerHaptic]);
  const triggerWarning = useCallback(() => triggerHaptic('warning'), [triggerHaptic]);
  const triggerSelection = useCallback(() => triggerHaptic('selection'), [triggerHaptic]);
  const triggerLight = useCallback(() => triggerHaptic('light'), [triggerHaptic]);
  const triggerMedium = useCallback(() => triggerHaptic('medium'), [triggerHaptic]);
  const triggerHeavy = useCallback(() => triggerHaptic('heavy'), [triggerHaptic]);

  return {
    triggerHaptic,
    triggerSuccess,
    triggerError,
    triggerWarning,
    triggerSelection,
    triggerLight,
    triggerMedium,
    triggerHeavy,
  };
}

// Adaptive quality hook
export function useAdaptiveQuality() {
  const [quality, setQuality] = useState(getAdaptiveQuality());

  useEffect(() => {
    const updateQuality = () => {
      setQuality(getAdaptiveQuality());
    };

    updateQuality();
    
    // Listen for network changes
    if ('connection' in navigator) {
      const connection = (navigator as unknown as { connection?: EventTarget }).connection;
      connection?.addEventListener('change', updateQuality);
    }

    // Listen for memory pressure
    const handleMemoryPressure = () => updateQuality();
    window.addEventListener('beforeunload', handleMemoryPressure);

    return () => {
      if ('connection' in navigator) {
        const connection = (navigator as unknown as { connection?: EventTarget }).connection;
        connection?.removeEventListener('change', updateQuality);
      }
      window.removeEventListener('beforeunload', handleMemoryPressure);
    };
  }, []);

  return quality;
}

// Collapsible section hook
export function useCollapsibleSection(isOpen: boolean, duration: number = 300) {
  const [height, setHeight] = useState(isOpen ? 'auto' : '0px');
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const content = contentRef.current;
    const scrollHeight = content.scrollHeight;

    if (isOpen) {
      setHeight('0px');
      setIsAnimating(true);
      
      // Force reflow
      void content.offsetHeight;
      
      setHeight(`${scrollHeight}px`);
      
      setTimeout(() => {
        setHeight('auto');
        setIsAnimating(false);
      }, duration);
    } else {
      setHeight(`${scrollHeight}px`);
      setIsAnimating(true);
      
      // Force reflow
      void content.offsetHeight;
      
      setHeight('0px');
      
      setTimeout(() => {
        setIsAnimating(false);
      }, duration);
    }
  }, [isOpen, duration]);

  return { height, isAnimating, contentRef };
}

// Bottom sheet hook
export function useBottomSheet(
  initialSnapIndex: number = 0,
  snapPoints: number[] = [0.25, 0.5, 0.9]
) {
  const [currentSnapIndex, setCurrentSnapIndex] = useState(initialSnapIndex);
  const [isDragging, setIsDragging] = useState(false);
  const [translateY, setTranslateY] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const startTranslateY = useRef(0);

  const snapToIndex = useCallback((index: number) => {
    if (index >= 0 && index < snapPoints.length) {
      setCurrentSnapIndex(index);
      setTranslateY(0);
    }
  }, [snapPoints.length]);

  const snapToNext = useCallback(() => {
    snapToIndex(Math.min(currentSnapIndex + 1, snapPoints.length - 1));
  }, [currentSnapIndex, snapToIndex]);

  const snapToPrevious = useCallback(() => {
    snapToIndex(Math.max(currentSnapIndex - 1, 0));
  }, [currentSnapIndex, snapToIndex]);

  const close = useCallback(() => {
    snapToIndex(0);
  }, [snapToIndex]);

  const open = useCallback(() => {
    snapToIndex(snapPoints.length - 1);
  }, [snapToIndex, snapPoints.length]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    startY.current = e.touches[0].clientY;
    startTranslateY.current = translateY;
    setIsDragging(true);
  }, [translateY]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;

    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY.current;
    setTranslateY(startTranslateY.current + deltaY);
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);
    
    // Snap to closest point
    const threshold = 50;
    if (translateY > threshold) {
      snapToPrevious();
    } else if (translateY < -threshold) {
      snapToNext();
    } else {
      setTranslateY(0);
    }
  }, [isDragging, translateY, snapToNext, snapToPrevious]);

  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;

    sheet.addEventListener('touchstart', handleTouchStart, { passive: false });
    sheet.addEventListener('touchmove', handleTouchMove, { passive: false });
    sheet.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      sheet.removeEventListener('touchstart', handleTouchStart);
      sheet.removeEventListener('touchmove', handleTouchMove);
      sheet.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return {
    sheetRef,
    currentSnapIndex,
    translateY,
    isDragging,
    snapPoints,
    snapToIndex,
    snapToNext,
    snapToPrevious,
    close,
    open,
  };
}

// Gesture-based navigation hook
export function useGestureNavigation() {
  const [navigationState, setNavigationState] = useState({
    canGoBack: false,
    canGoForward: false,
    isNavigating: false,
  });

  const navigateBack = useCallback(() => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      setNavigationState(prev => ({ ...prev, isNavigating: true }));
      window.history.back();
      setTimeout(() => {
        setNavigationState(prev => ({ ...prev, isNavigating: false }));
      }, 300);
    }
  }, []);

  const navigateForward = useCallback(() => {
    if (typeof window !== 'undefined') {
      setNavigationState(prev => ({ ...prev, isNavigating: true }));
      window.history.forward();
      setTimeout(() => {
        setNavigationState(prev => ({ ...prev, isNavigating: false }));
      }, 300);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setNavigationState(prev => ({
        ...prev,
        canGoBack: window.history.length > 1,
        isNavigating: false,
      }));
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return {
    ...navigationState,
    navigateBack,
    navigateForward,
  };
}

// Mobile viewport hook
export function useMobileViewport() {
  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
    isLandscape: false,
    isPortrait: false,
  });

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isLandscape = width > height;
      
      setViewport({
        width,
        height,
        isLandscape,
        isPortrait: !isLandscape,
      });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    window.addEventListener('orientationchange', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('orientationchange', updateViewport);
    };
  }, []);

  return viewport;
}
