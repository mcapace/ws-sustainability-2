'use client';

import { useRef, useEffect, useState } from 'react';

interface SwipeGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  preventDefault?: boolean;
}

interface SwipeState {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  isDragging: boolean;
}

export function useSwipeGestures(options: SwipeGestureOptions = {}) {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = 50,
    preventDefault = true
  } = options;

  const elementRef = useRef<HTMLElement | null>(null);
  const [swipeState, setSwipeState] = useState<SwipeState>({
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    isDragging: false
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleStart = (e: TouchEvent | MouseEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      setSwipeState({
        startX: clientX,
        startY: clientY,
        currentX: clientX,
        currentY: clientY,
        isDragging: true
      });

      if (preventDefault) {
        e.preventDefault();
      }
    };

    const handleMove = (e: TouchEvent | MouseEvent) => {
      if (!swipeState.isDragging) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      setSwipeState(prev => ({
        ...prev,
        currentX: clientX,
        currentY: clientY
      }));

      if (preventDefault) {
        e.preventDefault();
      }
    };

    const handleEnd = () => {
      if (!swipeState.isDragging) return;

      const deltaX = swipeState.currentX - swipeState.startX;
      const deltaY = swipeState.currentY - swipeState.startY;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      // Determine if it's a swipe (not just a tap)
      if (Math.max(absDeltaX, absDeltaY) < threshold) {
        setSwipeState(prev => ({ ...prev, isDragging: false }));
        return;
      }

      // Determine swipe direction
      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > 0) {
          onSwipeRight?.();
        } else {
          onSwipeLeft?.();
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          onSwipeDown?.();
        } else {
          onSwipeUp?.();
        }
      }

      setSwipeState(prev => ({ ...prev, isDragging: false }));
    };

    // Touch events
    element.addEventListener('touchstart', handleStart, { passive: !preventDefault });
    element.addEventListener('touchmove', handleMove, { passive: !preventDefault });
    element.addEventListener('touchend', handleEnd);

    // Mouse events for desktop testing
    element.addEventListener('mousedown', handleStart);
    element.addEventListener('mousemove', handleMove);
    element.addEventListener('mouseup', handleEnd);
    element.addEventListener('mouseleave', handleEnd);

    return () => {
      element.removeEventListener('touchstart', handleStart);
      element.removeEventListener('touchmove', handleMove);
      element.removeEventListener('touchend', handleEnd);
      element.removeEventListener('mousedown', handleStart);
      element.removeEventListener('mousemove', handleMove);
      element.removeEventListener('mouseup', handleEnd);
      element.removeEventListener('mouseleave', handleEnd);
    };
  }, [swipeState, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold, preventDefault]);

  return {
    ref: elementRef,
    isDragging: swipeState.isDragging,
    deltaX: swipeState.currentX - swipeState.startX,
    deltaY: swipeState.currentY - swipeState.startY
  };
}
