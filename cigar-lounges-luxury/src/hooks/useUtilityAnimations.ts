'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { UtilityAnimationConfig, PRESETS } from '@/lib/animations/types';
import { 
  delay, 
  getEasingFunction, 
  createKeyframes,
  lerp,
  clamp,
  throttle
} from '@/lib/animations/utils';

// Number counter with easing
export function useCounterAnimation(
  targetValue: number,
  config: Partial<UtilityAnimationConfig> = {}
) {
  const [currentValue, setCurrentValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const {
    duration = PRESETS.utility.counter.duration,
    easing = PRESETS.utility.counter.easing,
    counterFormat = PRESETS.utility.counter.counterFormat
  } = config;

  const animateTo = useCallback(async (newTarget: number) => {
    if (isAnimating) return;

    setIsAnimating(true);
    const startValue = currentValue;
    const easingFunc = getEasingFunction(easing);
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = clamp(elapsed / duration, 0, 1);
      const easedProgress = easingFunc(progress);
      
      const newValue = lerp(startValue, newTarget, easedProgress);
      setCurrentValue(newValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentValue(newTarget);
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  }, [currentValue, duration, easing, isAnimating]);

  useEffect(() => {
    animateTo(targetValue);
  }, [targetValue, animateTo]);

  const formatValue = (value: number) => {
    switch (counterFormat) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value);
      case 'percentage':
        return `${Math.round(value)}%`;
      case 'number':
      default:
        return Math.round(value).toLocaleString();
    }
  };

  return { currentValue, isAnimating, formattedValue: formatValue(currentValue) };
}

// Progress rings and bars
export function useProgressAnimation(
  progress: number,
  config: Partial<UtilityAnimationConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const {
    duration = PRESETS.utility.progress.duration,
    easing = PRESETS.utility.progress.easing,
    progressType = PRESETS.utility.progress.progressType
  } = config;

  const animateProgress = useCallback(async (newProgress: number) => {
    if (isAnimating) return;

    setIsAnimating(true);
    const startProgress = animatedProgress;
    const easingFunc = getEasingFunction(easing);
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressRatio = clamp(elapsed / duration, 0, 1);
      const easedProgress = easingFunc(progressRatio);
      
      const newValue = lerp(startProgress, newProgress, easedProgress);
      setAnimatedProgress(newValue);

      if (progressRatio < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedProgress(newProgress);
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  }, [animatedProgress, duration, easing, isAnimating]);

  useEffect(() => {
    animateProgress(progress);
  }, [progress, animateProgress]);

  // Apply progress to element
  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    if (progressType === 'ring') {
      const circumference = 2 * Math.PI * 45; // Assuming radius of 45
      const strokeDasharray = circumference;
      const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;
      
      element.style.setProperty('--stroke-dasharray', strokeDasharray.toString());
      element.style.setProperty('--stroke-dashoffset', strokeDashoffset.toString());
    } else {
      element.style.setProperty('--progress', `${animatedProgress}%`);
    }
  }, [animatedProgress, progressType]);

  return { elementRef, animatedProgress, isAnimating };
}

// Skeleton screens with wave effect
export function useSkeletonAnimation(
  config: Partial<UtilityAnimationConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const {
    duration = PRESETS.utility.skeleton.duration,
    repeat = PRESETS.utility.skeleton.repeat,
    easing = PRESETS.utility.skeleton.easing,
    skeletonVariant = PRESETS.utility.skeleton.skeletonVariant
  } = config;

  const startAnimation = useCallback(() => {
    if (!elementRef.current || isAnimating) return;

    setIsAnimating(true);
    const element = elementRef.current;
    
    // Create skeleton keyframes based on variant
    let keyframes = {};
    
    switch (skeletonVariant) {
      case 'wave':
        keyframes = {
          '0%': {
            backgroundPosition: '-200px 0',
          },
          '100%': {
            backgroundPosition: 'calc(200px + 100%) 0',
          },
        };
        break;
      case 'pulse':
        keyframes = {
          '0%, 100%': {
            opacity: '0.4',
          },
          '50%': {
            opacity: '0.8',
          },
        };
        break;
      case 'shimmer':
        keyframes = {
          '0%': {
            backgroundPosition: '-1000px 0',
          },
          '100%': {
            backgroundPosition: '1000px 0',
          },
        };
        break;
    }

    const cleanup = createKeyframes(`skeleton-${skeletonVariant}`, keyframes);
    
    element.style.animation = `skeleton-${skeletonVariant} ${duration}ms ${easing}`;
    element.style.animationIterationCount = repeat.toString();
    
    // Set appropriate background based on variant
    switch (skeletonVariant) {
      case 'wave':
        element.style.background = 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)';
        element.style.backgroundSize = '200px 100%';
        break;
      case 'shimmer':
        element.style.background = 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)';
        element.style.backgroundSize = '200px 100%';
        break;
    }

    const handleAnimationEnd = () => {
      setIsAnimating(false);
    };

    element.addEventListener('animationend', handleAnimationEnd);

    return () => {
      cleanup();
      element.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [duration, repeat, easing, skeletonVariant, isAnimating]);

  useEffect(() => {
    const cleanup = startAnimation();
    return cleanup;
  }, [startAnimation]);

  return { elementRef, isAnimating, startAnimation };
}

// Pulse/breathing animations
export function usePulseAnimation(
  config: Partial<UtilityAnimationConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [isPulsing, setIsPulsing] = useState(false);

  const {
    duration = 1000,
    easing = 'ease-in-out',
    pulseIntensity = 0.1,
    repeat = 'infinite'
  } = config;

  const startPulse = useCallback(() => {
    if (!elementRef.current || isPulsing) return;

    setIsPulsing(true);
    const element = elementRef.current;
    
    // Create pulse keyframes
    const cleanup = createKeyframes('pulse', {
      '0%, 100%': {
        transform: 'scale(1)',
        opacity: '1',
      },
      '50%': {
        transform: `scale(${1 + pulseIntensity})`,
        opacity: `${1 - pulseIntensity}`,
      },
    });

    element.style.animation = `pulse ${duration}ms ${easing}`;
    element.style.animationIterationCount = repeat.toString();
    element.style.animationDirection = 'alternate';

    const handleAnimationEnd = () => {
      if (repeat !== 'infinite') {
        setIsPulsing(false);
      }
    };

    element.addEventListener('animationend', handleAnimationEnd);

    return () => {
      cleanup();
      element.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [duration, easing, pulseIntensity, repeat, isPulsing]);

  const stopPulse = useCallback(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    element.style.animation = '';
    setIsPulsing(false);
  }, []);

  useEffect(() => {
    const cleanup = startPulse();
    return cleanup;
  }, [startPulse]);

  return { elementRef, isPulsing, startPulse, stopPulse };
}

// Magnetic hover effects
export function useMagneticHover(
  config: Partial<UtilityAnimationConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });

  const {
    magneticStrength = 0.3,
    magneticRadius = 100,
    duration = 200
  } = config;

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!elementRef.current || !isHovered) return;

    const element = elementRef.current;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance < magneticRadius) {
      const force = (magneticRadius - distance) / magneticRadius;
      const offsetX = deltaX * force * magneticStrength;
      const offsetY = deltaY * force * magneticStrength;
      
      setMagneticOffset({ x: offsetX, y: offsetY });
    } else {
      setMagneticOffset({ x: 0, y: 0 });
    }
  }, [isHovered, magneticStrength, magneticRadius]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMagneticOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  // Apply magnetic transform
  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    element.style.transform = `translate(${magneticOffset.x}px, ${magneticOffset.y}px)`;
    element.style.transition = `transform ${duration}ms ease-out`;
  }, [magneticOffset, duration]);

  return { elementRef, isHovered, magneticOffset };
}

// Floating animation
export function useFloatingAnimation(
  config: Partial<UtilityAnimationConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [isFloating, setIsFloating] = useState(false);

  const {
    duration = 3000,
    easing = 'ease-in-out',
    repeat = 'infinite',
    direction = 'up'
  } = config;

  const startFloating = useCallback(() => {
    if (!elementRef.current || isFloating) return;

    setIsFloating(true);
    const element = elementRef.current;
    
    // Create floating keyframes based on direction
    let keyframes = {};
    
    switch (direction) {
      case 'up':
        keyframes = {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        };
        break;
      case 'down':
        keyframes = {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(20px)',
          },
        };
        break;
      case 'left':
        keyframes = {
          '0%, 100%': {
            transform: 'translateX(0px)',
          },
          '50%': {
            transform: 'translateX(-20px)',
          },
        };
        break;
      case 'right':
        keyframes = {
          '0%, 100%': {
            transform: 'translateX(0px)',
          },
          '50%': {
            transform: 'translateX(20px)',
          },
        };
        break;
    }

    const cleanup = createKeyframes(`float-${direction}`, keyframes);
    
    element.style.animation = `float-${direction} ${duration}ms ${easing}`;
    element.style.animationIterationCount = repeat.toString();
    element.style.animationDirection = 'alternate';

    const handleAnimationEnd = () => {
      if (repeat !== 'infinite') {
        setIsFloating(false);
      }
    };

    element.addEventListener('animationend', handleAnimationEnd);

    return () => {
      cleanup();
      element.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [duration, easing, repeat, direction, isFloating]);

  const stopFloating = useCallback(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    element.style.animation = '';
    setIsFloating(false);
  }, []);

  useEffect(() => {
    const cleanup = startFloating();
    return cleanup;
  }, [startFloating]);

  return { elementRef, isFloating, startFloating, stopFloating };
}

// Shake animation
export function useShakeAnimation(
  config: Partial<UtilityAnimationConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [isShaking, setIsShaking] = useState(false);

  const {
    duration = 500,
    easing = 'ease-in-out',
    intensity = 10
  } = config;

  const startShake = useCallback(async () => {
    if (!elementRef.current || isShaking) return;

    setIsShaking(true);
    const element = elementRef.current;
    
    // Create shake keyframes
    const cleanup = createKeyframes('shake', {
      '0%, 100%': {
        transform: 'translateX(0)',
      },
      '10%, 30%, 50%, 70%, 90%': {
        transform: `translateX(-${intensity}px)`,
      },
      '20%, 40%, 60%, 80%': {
        transform: `translateX(${intensity}px)`,
      },
    });

    element.style.animation = `shake ${duration}ms ${easing}`;

    await delay(duration);
    
    element.style.animation = '';
    cleanup();
    setIsShaking(false);
  }, [duration, easing, intensity, isShaking]);

  return { elementRef, isShaking, startShake };
}
