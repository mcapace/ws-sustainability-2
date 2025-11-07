'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { TouchGesture, SwipeData, PinchData, LongPressData, SwipeConfig, PinchConfig, LongPressConfig, PullToRefreshConfig } from '@/types/mobile';
import { triggerHapticFeedback, getTouchCenter, getTouchDistance, calculateSwipeVelocity, getSwipeDirection } from '@/lib/mobile/utils';

// Swipe gesture hook
export function useSwipeGesture(
  onSwipe: (data: SwipeData) => void,
  config: Partial<SwipeConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startTime = useRef<number>(0);

  const {
    threshold = 50,
    velocity = 0.3,
    resistance = 0.8,
    enableRubberBand = true
  } = config;

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    startPos.current = { x: touch.clientX, y: touch.clientY };
    startTime.current = Date.now();
    setIsSwipeActive(true);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isSwipeActive || e.touches.length !== 1) return;
    
    e.preventDefault();
  }, [isSwipeActive]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!isSwipeActive) return;
    
    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;
    const endTime = Date.now();
    
    const deltaX = endX - startPos.current.x;
    const deltaY = endY - startPos.current.y;
    const duration = endTime - startTime.current;
    const swipeVelocity = calculateSwipeVelocity(
      startPos.current.x,
      startPos.current.y,
      endX,
      endY,
      duration
    );
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const direction = getSwipeDirection(
      startPos.current.x,
      startPos.current.y,
      endX,
      endY,
      threshold
    );

    if (direction && (distance > threshold || swipeVelocity > velocity)) {
      const swipeData: SwipeData = {
        startX: startPos.current.x,
        startY: startPos.current.y,
        endX,
        endY,
        deltaX,
        deltaY,
        velocity: swipeVelocity,
        direction,
        distance,
      };
      
      triggerHapticFeedback('light');
      onSwipe(swipeData);
    }
    
    setIsSwipeActive(false);
  }, [isSwipeActive, threshold, velocity, onSwipe]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return { elementRef, isSwipeActive };
}

// Pinch gesture hook
export function usePinchGesture(
  onPinch: (data: PinchData) => void,
  config: Partial<PinchConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [isPinchActive, setIsPinchActive] = useState(false);
  const startDistance = useRef<number>(0);
  const startScale = useRef<number>(1);
  const center = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const {
    minScale = 0.5,
    maxScale = 3,
    initialScale = 1,
    enablePan = true
  } = config;

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length !== 2) return;
    
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    
    startDistance.current = getTouchDistance(touch1, touch2);
    startScale.current = initialScale;
    center.current = getTouchCenter(e.touches);
    setIsPinchActive(true);
  }, [initialScale]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isPinchActive || e.touches.length !== 2) return;
    
    e.preventDefault();
    
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    const currentDistance = getTouchDistance(touch1, touch2);
    const scale = Math.max(minScale, Math.min(maxScale, (currentDistance / startDistance.current) * startScale.current));
    
    const pinchData: PinchData = {
      startDistance: startDistance.current,
      currentDistance,
      scale,
      centerX: center.current.x,
      centerY: center.current.y,
      deltaScale: scale - startScale.current,
    };
    
    onPinch(pinchData);
  }, [isPinchActive, minScale, maxScale, onPinch]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!isPinchActive) return;
    
    triggerHapticFeedback('light');
    setIsPinchActive(false);
  }, [isPinchActive]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return { elementRef, isPinchActive };
}

// Long press gesture hook
export function useLongPressGesture(
  onLongPress: (data: LongPressData) => void,
  config: Partial<LongPressConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [isLongPressActive, setIsLongPressActive] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startTarget = useRef<EventTarget | null>(null);

  const {
    duration = 500,
    hapticFeedback = { type: 'medium' },
    enableVibration = true
  } = config;

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    startPos.current = { x: touch.clientX, y: touch.clientY };
    startTarget.current = e.target;
    
    longPressTimer.current = setTimeout(() => {
      setIsLongPressActive(true);
      
      if (enableVibration) {
        triggerHapticFeedback(hapticFeedback.type);
      }
      
      const longPressData: LongPressData = {
        x: startPos.current.x,
        y: startPos.current.y,
        duration,
        target: startTarget.current,
      };
      
      onLongPress(longPressData);
    }, duration);
  }, [duration, hapticFeedback, enableVibration, onLongPress]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - startPos.current.x);
    const deltaY = Math.abs(touch.clientY - startPos.current.y);
    
    // Cancel long press if moved too much
    if (deltaX > 10 || deltaY > 10) {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    setIsLongPressActive(false);
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return { elementRef, isLongPressActive };
}

// Pull to refresh hook
export function usePullToRefresh(
  onRefresh: () => void,
  config: Partial<PullToRefreshConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);

  const {
    threshold = 100,
    resistance = 0.6,
    refreshHeight = 60,
    enableHaptics = true
  } = config;

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length !== 1 || window.scrollY > 0) return;
    
    startY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (window.scrollY > 0) return;
    
    currentY.current = e.touches[0].clientY;
    const deltaY = currentY.current - startY.current;
    
    if (deltaY > 0) {
      e.preventDefault();
      const distance = Math.min(deltaY * resistance, threshold * 1.5);
      setPullDistance(distance);
      
      if (distance >= threshold && enableHaptics) {
        triggerHapticFeedback('light');
      }
    }
  }, [threshold, resistance, enableHaptics]);

  const handleTouchEnd = useCallback(async () => {
    if (pullDistance >= threshold) {
      setIsRefreshing(true);
      setPullDistance(0);
      
      if (enableHaptics) {
        triggerHapticFeedback('success');
      }
      
      await onRefresh();
      setIsRefreshing(false);
    } else {
      setPullDistance(0);
    }
  }, [pullDistance, threshold, enableHaptics, onRefresh]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return { elementRef, isRefreshing, pullDistance, threshold };
}

// Combined touch gestures hook
export function useTouchGestures(
  gestures: {
    swipe?: (data: SwipeData) => void;
    pinch?: (data: PinchData) => void;
    longPress?: (data: LongPressData) => void;
    pullToRefresh?: () => void;
  },
  config?: {
    swipe?: Partial<SwipeConfig>;
    pinch?: Partial<PinchConfig>;
    longPress?: Partial<LongPressConfig>;
    pullToRefresh?: Partial<PullToRefreshConfig>;
  }
) {
  const swipeGesture = useSwipeGesture(gestures.swipe || (() => {}), config?.swipe);
  const pinchGesture = usePinchGesture(gestures.pinch || (() => {}), config?.pinch);
  const longPressGesture = useLongPressGesture(gestures.longPress || (() => {}), config?.longPress);
  const pullToRefreshGesture = usePullToRefresh(gestures.pullToRefresh || (() => {}), config?.pullToRefresh);

  return {
    swipe: swipeGesture,
    pinch: pinchGesture,
    longPress: longPressGesture,
    pullToRefresh: pullToRefreshGesture,
  };
}
