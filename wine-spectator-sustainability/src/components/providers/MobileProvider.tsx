'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { DeviceInfo, MobileConfig, PerformanceLevel, TouchGesture } from '@/types/mobile';
import { useDevice, useMobileConfig, useAdaptiveQuality } from '@/hooks/useMobile';
import { useTouchGestures } from '@/hooks/useTouchGestures';

interface MobileContextType {
  deviceInfo: DeviceInfo | null;
  mobileConfig: MobileConfig | null;
  performanceConfig: PerformanceLevel | null;
  adaptiveQuality: {
    imageQuality: 'low' | 'medium' | 'high';
    animationQuality: 'low' | 'medium' | 'high';
    enableAdvancedFeatures: boolean;
  };
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  orientation: 'portrait' | 'landscape' | null;
  updateMobileConfig: (config: Partial<MobileConfig>) => void;
}

const MobileContext = createContext<MobileContextType | undefined>(undefined);

interface MobileProviderProps {
  children: ReactNode;
  initialConfig?: Partial<MobileConfig>;
}

export function MobileProvider({ children, initialConfig }: MobileProviderProps) {
  const { deviceInfo, performanceConfig } = useDevice();
  const { config: mobileConfig, updateConfig: updateMobileConfig } = useMobileConfig(initialConfig);
  const adaptiveQuality = useAdaptiveQuality();

  const [orientation, setOrientation] = useState<'portrait' | 'landscape' | null>(null);

  useEffect(() => {
    if (deviceInfo) {
      setOrientation(deviceInfo.orientation);
    }
  }, [deviceInfo]);

  // Listen for orientation changes
  useEffect(() => {
    const handleOrientationChange = () => {
      if (deviceInfo) {
        setOrientation(deviceInfo.orientation);
      }
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, [deviceInfo]);

  const contextValue: MobileContextType = {
    deviceInfo,
    mobileConfig,
    performanceConfig,
    adaptiveQuality,
    isMobile: deviceInfo?.isMobile || false,
    isTablet: deviceInfo?.isTablet || false,
    isDesktop: deviceInfo?.isDesktop || false,
    orientation,
    updateMobileConfig,
  };

  return (
    <MobileContext.Provider value={contextValue}>
      {children}
    </MobileContext.Provider>
  );
}

export function useMobileContext() {
  const context = useContext(MobileContext);
  if (context === undefined) {
    throw new Error('useMobileContext must be used within a MobileProvider');
  }
  return context;
}

// Mobile-optimized component wrapper
interface MobileOptimizedWrapperProps {
  children: ReactNode;
  mobileProps?: Record<string, unknown>;
  desktopProps?: Record<string, unknown>;
  className?: string;
}

export function MobileOptimizedWrapper({ 
  children, 
  mobileProps = {}, 
  desktopProps = {}, 
  className = '' 
}: MobileOptimizedWrapperProps) {
  const { isMobile } = useMobileContext();

  return (
    <div 
      className={`${className} ${isMobile ? 'mobile-optimized' : 'desktop-optimized'}`}
      {...(isMobile ? mobileProps : desktopProps)}
    >
      {children}
    </div>
  );
}

// Performance-aware component wrapper
interface PerformanceAwareWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  minPerformanceLevel?: 'low' | 'medium' | 'high';
  className?: string;
}

export function PerformanceAwareWrapper({ 
  children, 
  fallback, 
  minPerformanceLevel = 'low',
  className = '' 
}: PerformanceAwareWrapperProps) {
  const { performanceConfig } = useMobileContext();

  const performanceLevels = { low: 1, medium: 2, high: 3 };
  const currentLevel = performanceConfig?.level ? performanceLevels[performanceConfig.level] : 1;
  const requiredLevel = performanceLevels[minPerformanceLevel];

  if (currentLevel < requiredLevel) {
    return fallback ? <div className={className}>{fallback}</div> : null;
  }

  return <div className={className}>{children}</div>;
}

// Network-aware component wrapper
interface NetworkAwareWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  requireFastNetwork?: boolean;
  className?: string;
}

export function NetworkAwareWrapper({ 
  children, 
  fallback, 
  requireFastNetwork = false,
  className = '' 
}: NetworkAwareWrapperProps) {
  const { adaptiveQuality } = useMobileContext();

  if (requireFastNetwork && adaptiveQuality?.imageQuality === 'low') {
    return fallback ? <div className={className}>{fallback}</div> : null;
  }

  return <div className={className}>{children}</div>;
}

// Touch gesture wrapper
interface TouchGestureWrapperProps {
  children: ReactNode;
  onSwipe?: (direction: 'left' | 'right' | 'up' | 'down') => void;
  onPinch?: (scale: number) => void;
  onLongPress?: () => void;
  enableGestures?: boolean;
  className?: string;
}

export function TouchGestureWrapper({ 
  children, 
  onSwipe, 
  onPinch, 
  onLongPress,
  enableGestures = true,
  className = '' 
}: TouchGestureWrapperProps) {
  const { isMobile, mobileConfig } = useMobileContext();

  const handleSwipe = (data: { direction: 'left' | 'right' | 'up' | 'down' }) => {
    if (data.direction) {
      onSwipe?.(data.direction);
    }
  };

  const handlePinch = (data: { scale: number }) => {
    onPinch?.(data.scale);
  };

  const handleLongPress = () => {
    onLongPress?.();
  };

  const gestures = useTouchGestures({
    swipe: enableGestures && isMobile && mobileConfig?.enableGestures ? handleSwipe : undefined,
    pinch: enableGestures && isMobile && mobileConfig?.enableGestures ? handlePinch : undefined,
    longPress: enableGestures && isMobile && mobileConfig?.enableGestures ? handleLongPress : undefined,
  });

  if (!enableGestures || !isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div 
      ref={gestures.swipe.elementRef}
      className={`${className} touch-optimized`}
    >
      {children}
    </div>
  );
}

// Responsive breakpoint wrapper
interface ResponsiveWrapperProps {
  children: ReactNode;
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4k';
  showAbove?: boolean;
  showBelow?: boolean;
  className?: string;
}

export function ResponsiveWrapper({ 
  children, 
  breakpoint = 'md', 
  showAbove = true,
  showBelow = false,
  className = '' 
}: ResponsiveWrapperProps) {
  const { deviceInfo } = useMobileContext();
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (!deviceInfo) return;

    const breakpoints = {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
      '3xl': 1920,
      '4k': 3840,
    };

    const currentWidth = deviceInfo.screenWidth;
    const breakpointWidth = breakpoints[breakpoint];

    if (showAbove && currentWidth >= breakpointWidth) {
      setShouldShow(true);
    } else if (showBelow && currentWidth < breakpointWidth) {
      setShouldShow(true);
    } else {
      setShouldShow(false);
    }
  }, [deviceInfo, breakpoint, showAbove, showBelow]);

  if (!shouldShow) return null;

  return <div className={className}>{children}</div>;
}
