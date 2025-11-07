'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ScrollAnimationConfig, PRESETS } from '@/lib/animations/types';
import { 
  delay, 
  getEasingFunction, 
  createKeyframes,
  getScrollProgress,
  createIntersectionObserver,
  throttle,
  lerp,
  clamp
} from '@/lib/animations/utils';

// Sticky sections with morphing content
export function useStickySection(
  config: Partial<ScrollAnimationConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const {
    pin = true,
    trigger = 0,
    endTrigger = 1,
    duration = 1000,
    easing = 'ease-out'
  } = config;

  const handleScroll = useCallback(() => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate if element should be sticky
    const shouldStick = rect.top <= 0 && rect.bottom > windowHeight;
    setIsSticky(shouldStick && pin);

    // Calculate scroll progress for morphing
    const elementHeight = rect.height;
    const scrollTop = window.pageYOffset;
    const elementTop = elementRef.current.offsetTop;
    const progress = clamp(
      (scrollTop - elementTop + windowHeight) / (elementHeight + windowHeight),
      0,
      1
    );
    
    setScrollProgress(progress);
  }, [pin]);

  useEffect(() => {
    if (!elementRef.current) return;

    const throttledScroll = throttle(handleScroll, 16);
    window.addEventListener('scroll', throttledScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [handleScroll]);

  return { elementRef, isSticky, scrollProgress };
}

// Horizontal scroll sections
export function useHorizontalScroll(
  config: Partial<ScrollAnimationConfig> = {}
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const {
    duration = 1000,
    easing = 'ease-out',
    trigger = 0.2,
    endTrigger = 0.8
  } = config;

  const handleScroll = useCallback(() => {
    if (!containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const content = contentRef.current;
    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Check if section is in view
    const inView = rect.top < windowHeight && rect.bottom > 0;
    setIsActive(inView);

    if (inView) {
      // Calculate horizontal scroll progress
      const containerHeight = rect.height;
      const contentWidth = content.scrollWidth;
      const containerWidth = rect.width;
      
      const scrollableDistance = contentWidth - containerWidth;
      const scrollProgress = clamp(
        (windowHeight - rect.top) / (windowHeight + containerHeight),
        0,
        1
      );
      
      setScrollProgress(scrollProgress);
      
      // Apply horizontal scroll
      const translateX = -scrollProgress * scrollableDistance;
      content.style.transform = `translateX(${translateX}px)`;
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const throttledScroll = throttle(handleScroll, 16);
    window.addEventListener('scroll', throttledScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [handleScroll]);

  return { containerRef, contentRef, scrollProgress, isActive };
}

// Scroll-linked animations
export function useScrollLinkedAnimation(
  config: Partial<ScrollAnimationConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const {
    trigger = 0.2,
    endTrigger = 0.8,
    scrub = true,
    duration = 1000,
    easing = 'ease-out'
  } = config;

  const handleScroll = useCallback(() => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate if element is in view
    const elementTop = rect.top;
    const elementBottom = rect.bottom;
    const elementHeight = rect.height;
    
    const inView = elementBottom > 0 && elementTop < windowHeight;
    setIsInView(inView);

    if (inView && scrub) {
      // Calculate animation progress based on scroll position
      const startPoint = windowHeight * (1 - trigger);
      const endPoint = -elementHeight + windowHeight * (1 - endTrigger);
      
      const progress = clamp(
        (startPoint - elementTop) / (startPoint - endPoint),
        0,
        1
      );
      
      setAnimationProgress(progress);
    }
  }, [trigger, endTrigger, scrub]);

  useEffect(() => {
    if (!elementRef.current) return;

    const throttledScroll = throttle(handleScroll, 16);
    window.addEventListener('scroll', throttledScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [handleScroll]);

  return { elementRef, animationProgress, isInView };
}

// Velocity-based effects
export function useVelocityAnimation(
  config: Partial<ScrollAnimationConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [velocity, setVelocity] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const {
    velocityThreshold = 1,
    duration = 300,
    easing = 'ease-out'
  } = config;

  let lastScrollY = 0;
  let lastTime = 0;

  const handleScroll = useCallback(() => {
    if (!elementRef.current) return;

    const currentScrollY = window.scrollY;
    const currentTime = performance.now();
    
    if (lastTime === 0) {
      lastTime = currentTime;
      lastScrollY = currentScrollY;
      return;
    }

    const deltaY = currentScrollY - lastScrollY;
    const deltaTime = currentTime - lastTime;
    const currentVelocity = Math.abs(deltaY / deltaTime);
    
    setVelocity(currentVelocity);
    setIsActive(currentVelocity > velocityThreshold);

    lastScrollY = currentScrollY;
    lastTime = currentTime;
  }, [velocityThreshold]);

  useEffect(() => {
    if (!elementRef.current) return;

    const throttledScroll = throttle(handleScroll, 16);
    window.addEventListener('scroll', throttledScroll);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [handleScroll]);

  return { elementRef, velocity, isActive };
}

// Scroll snapping with indicators
export function useScrollSnapping(
  snapPoints: number[],
  config: Partial<ScrollAnimationConfig> = {}
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSnapPoint, setCurrentSnapPoint] = useState(0);
  const [isSnapping, setIsSnapping] = useState(false);

  const {
    duration = 500,
    easing = 'ease-out'
  } = config;

  const snapToPoint = useCallback(async (index: number) => {
    if (!containerRef.current || isSnapping || index < 0 || index >= snapPoints.length) return;

    setIsSnapping(true);
    const container = containerRef.current;
    const targetScroll = snapPoints[index];
    
    // Smooth scroll to snap point
    container.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });

    await delay(duration);
    setCurrentSnapPoint(index);
    setIsSnapping(false);
  }, [snapPoints, duration, isSnapping]);

  const handleScroll = useCallback(() => {
    if (!containerRef.current || isSnapping) return;

    const container = containerRef.current;
    const scrollTop = container.scrollTop;
    
    // Find closest snap point
    let closestIndex = 0;
    let closestDistance = Math.abs(scrollTop - snapPoints[0]);
    
    for (let i = 1; i < snapPoints.length; i++) {
      const distance = Math.abs(scrollTop - snapPoints[i]);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    }
    
    setCurrentSnapPoint(closestIndex);
  }, [snapPoints, isSnapping]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { containerRef, currentSnapPoint, isSnapping, snapToPoint };
}

// Parallax scroll effect
export function useParallaxScroll(
  speed: number = 0.5,
  config: Partial<ScrollAnimationConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [translateY, setTranslateY] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const {
    trigger = 0,
    endTrigger = 1,
    easing = 'ease-out'
  } = config;

  const handleScroll = useCallback(() => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Check if element is in view
    const inView = rect.bottom > 0 && rect.top < windowHeight;
    setIsInView(inView);

    if (inView) {
      // Calculate parallax offset
      const elementHeight = rect.height;
      const scrollProgress = clamp(
        (windowHeight - rect.top) / (windowHeight + elementHeight),
        0,
        1
      );
      
      const offset = (scrollProgress - 0.5) * speed * 100;
      setTranslateY(offset);
    }
  }, [speed]);

  useEffect(() => {
    if (!elementRef.current) return;

    const throttledScroll = throttle(handleScroll, 16);
    window.addEventListener('scroll', throttledScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [handleScroll]);

  // Apply parallax transform
  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    element.style.transform = `translateY(${translateY}px)`;
    element.style.transition = 'transform 0.1s ease-out';
  }, [translateY]);

  return { elementRef, translateY, isInView };
}

// Reveal on scroll
export function useRevealOnScroll(
  config: Partial<ScrollAnimationConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const {
    trigger = 0.2,
    duration = 800,
    easing = 'ease-out'
  } = config;

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !isRevealed) {
        setIsRevealed(true);
      }
    });
  }, [isRevealed]);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = createIntersectionObserver(handleIntersection, {
      threshold: trigger,
      rootMargin: '0px'
    });

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection, trigger]);

  // Apply reveal animation
  useEffect(() => {
    if (!elementRef.current || !isRevealed) return;

    const element = elementRef.current;
    const cleanup = createKeyframes('revealIn', {
      '0%': {
        opacity: '0',
        transform: 'translateY(50px)',
      },
      '100%': {
        opacity: '1',
        transform: 'translateY(0)',
      },
    });

    element.style.animation = `revealIn ${duration}ms ${easing}`;

    return () => {
      cleanup();
    };
  }, [isRevealed, duration, easing]);

  return { elementRef, isRevealed };
}
