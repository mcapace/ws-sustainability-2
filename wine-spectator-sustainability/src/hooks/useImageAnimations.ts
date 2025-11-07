'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ImageAnimationConfig, PRESETS } from '@/lib/animations/types';
import { 
  delay, 
  getEasingFunction, 
  createKeyframes,
  randomBetween,
  clamp,
  lerp 
} from '@/lib/animations/utils';

// Ken Burns effect on scroll
export function useKenBurnsEffect(
  config: Partial<ImageAnimationConfig> = {}
) {
  const elementRef = useRef<HTMLImageElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const {
    duration = PRESETS.image.kenBurns.duration,
    kenBurnsIntensity = PRESETS.image.kenBurns.kenBurnsIntensity,
    easing = PRESETS.image.kenBurns.easing,
    trigger = true
  } = config;

  const handleScroll = useCallback(() => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementHeight = rect.height;
    
    // Calculate scroll progress for this element
    const elementTop = rect.top;
    const elementBottom = rect.bottom;
    const viewportCenter = windowHeight / 2;
    
    // Element is in view when it crosses the viewport center
    const progress = clamp(
      (viewportCenter - elementTop) / (windowHeight + elementHeight),
      0,
      1
    );
    
    setScrollProgress(progress);
    setIsActive(progress > 0.1 && progress < 0.9);
  }, []);

  useEffect(() => {
    if (!trigger) return;

    const element = elementRef.current;
    if (!element) return;

    // Set up Ken Burns effect
    element.style.overflow = 'hidden';
    element.style.transform = 'scale(1.1)';
    element.style.transition = 'transform 0.3s ease-out';

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [trigger, handleScroll]);

  // Apply Ken Burns animation based on scroll progress
  useEffect(() => {
    if (!elementRef.current || !isActive) return;

    const element = elementRef.current;
    const easingFunc = getEasingFunction(easing);
    const easedProgress = easingFunc(scrollProgress);
    
    // Calculate scale and position based on scroll progress
    const scale = 1.1 + (easedProgress * kenBurnsIntensity);
    const translateX = (easedProgress - 0.5) * kenBurnsIntensity * 50;
    const translateY = (easedProgress - 0.5) * kenBurnsIntensity * 30;
    
    element.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
  }, [scrollProgress, isActive, kenBurnsIntensity, easing]);

  return { elementRef, isActive, scrollProgress };
}

// Image comparison slider
export function useImageComparison(
  beforeSrc: string,
  afterSrc: string,
  config: Partial<ImageAnimationConfig> = {}
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [comparisonPosition, setComparisonPosition] = useState(50);

  const {
    comparisonThreshold = 0.5,
    trigger = true
  } = config;

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!trigger) return;
    setIsDragging(true);
  }, [trigger]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = clamp((x / rect.width) * 100, 0, 100);
    
    setComparisonPosition(percentage);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!trigger) return;
    setIsDragging(true);
  }, [trigger]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = clamp((x / rect.width) * 100, 0, 100);
    
    setComparisonPosition(percentage);
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!trigger) return;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd, trigger]);

  return {
    containerRef,
    sliderRef,
    isDragging,
    comparisonPosition,
    handleMouseDown,
    handleTouchStart,
    beforeSrc,
    afterSrc
  };
}

// Reveal with animated masks
export function useMaskReveal(
  config: Partial<ImageAnimationConfig> = {}
) {
  const elementRef = useRef<HTMLImageElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const {
    duration = 1000,
    maskType = 'circle',
    easing = 'ease-out',
    trigger = true
  } = config;

  const reveal = useCallback(async () => {
    if (!elementRef.current || isRevealed) return;

    const element = elementRef.current;
    
    // Create mask animation keyframes
    let maskAnimation = '';
    
    switch (maskType) {
      case 'circle':
        maskAnimation = 'circle-mask-reveal';
        break;
      case 'rectangle':
        maskAnimation = 'rectangle-mask-reveal';
        break;
      case 'wave':
        maskAnimation = 'wave-mask-reveal';
        break;
      default:
        maskAnimation = 'circle-mask-reveal';
    }

    // Create keyframes for mask animation
    const cleanup = createKeyframes(maskAnimation, {
      '0%': {
        clipPath: maskType === 'circle' 
          ? 'circle(0% at 50% 50%)'
          : maskType === 'rectangle'
          ? 'inset(50% 50% 50% 50%)'
          : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
      },
      '100%': {
        clipPath: maskType === 'circle'
          ? 'circle(100% at 50% 50%)'
          : maskType === 'rectangle'
          ? 'inset(0% 0% 0% 0%)'
          : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      },
    });

    element.style.animation = `${maskAnimation} ${duration}ms ${easing}`;
    
    await delay(duration);
    
    element.style.animation = '';
    setIsRevealed(true);
    cleanup();
  }, [duration, maskType, easing, isRevealed]);

  useEffect(() => {
    if (trigger) {
      reveal();
    }
  }, [trigger, reveal]);

  return { elementRef, isRevealed, reveal };
}

// Duotone to full color on hover
export function useDuotoneEffect(
  config: Partial<ImageAnimationConfig> = {}
) {
  const elementRef = useRef<HTMLImageElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const {
    duration = PRESETS.image.duotone.duration,
    duotoneColors = PRESETS.image.duotone.duotoneColors,
    easing = PRESETS.image.duotone.easing,
    trigger = true
  } = config;

  const handleMouseEnter = useCallback(() => {
    if (!trigger) return;
    setIsHovered(true);
  }, [trigger]);

  const handleMouseLeave = useCallback(() => {
    if (!trigger) return;
    setIsHovered(false);
  }, [trigger]);

  useEffect(() => {
    if (!elementRef.current || !trigger) return;

    const element = elementRef.current;
    
    // Create duotone filter
    const [color1, color2] = duotoneColors;
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    
    if (rgb1 && rgb2) {
      const filter = `sepia(1) saturate(2) hue-rotate(${getHueRotation(rgb1)}deg) brightness(1.2) contrast(1.2)`;
      element.style.filter = filter;
      element.style.transition = `filter ${duration}ms ${easing}`;
    }

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [trigger, duotoneColors, duration, easing, handleMouseEnter, handleMouseLeave]);

  // Apply color transition on hover
  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    if (isHovered) {
      element.style.filter = 'none';
    } else {
      const [color1, color2] = duotoneColors;
      const rgb1 = hexToRgb(color1);
      
      if (rgb1) {
        const filter = `sepia(1) saturate(2) hue-rotate(${getHueRotation(rgb1)}deg) brightness(1.2) contrast(1.2)`;
        element.style.filter = filter;
      }
    }
  }, [isHovered, duotoneColors]);

  return { elementRef, isHovered };
}

// Liquid distortion on drag
export function useLiquidDistortion(
  config: Partial<ImageAnimationConfig> = {}
) {
  const elementRef = useRef<HTMLImageElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [distortion, setDistortion] = useState({ x: 0, y: 0, intensity: 0 });

  const {
    liquidDistortion = 0.5,
    duration = 300,
    trigger = true
  } = config;

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!trigger) return;
    setIsDragging(true);
  }, [trigger]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / rect.width;
    const deltaY = (e.clientY - centerY) / rect.height;
    
    setDistortion({
      x: deltaX * liquidDistortion * 100,
      y: deltaY * liquidDistortion * 100,
      intensity: liquidDistortion
    });
  }, [isDragging, liquidDistortion]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    
    // Animate back to normal
    setDistortion({ x: 0, y: 0, intensity: 0 });
  }, []);

  useEffect(() => {
    if (!trigger) return;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, trigger]);

  // Apply liquid distortion effect
  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const { x, y, intensity } = distortion;
    
    // Create liquid distortion using CSS transforms and filters
    const skewX = Math.sin(Date.now() * 0.01) * intensity * 5;
    const skewY = Math.cos(Date.now() * 0.01) * intensity * 3;
    
    element.style.transform = `translate(${x}px, ${y}px) skew(${skewX}deg, ${skewY}deg)`;
    element.style.filter = `blur(${intensity * 2}px) contrast(${1 + intensity})`;
    element.style.transition = isDragging ? 'none' : `all ${duration}ms ease-out`;
  }, [distortion, isDragging, duration]);

  return { elementRef, isDragging, handleMouseDown };
}

// Helper functions
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getHueRotation(rgb: { r: number; g: number; b: number }): number {
  // Convert RGB to HSL and return hue rotation value
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  
  if (max !== min) {
    const d = max - min;
    switch (max) {
      case r: h = ((g - b) / d) % 6; break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
  }
  
  return h * 60;
}
