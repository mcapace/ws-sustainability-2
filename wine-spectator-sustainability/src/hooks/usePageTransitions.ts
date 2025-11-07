'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { TransitionConfig, PRESETS } from '@/lib/animations/types';
import { 
  delay, 
  getEasingFunction, 
  createKeyframes,
  randomBetween
} from '@/lib/animations/utils';

// Smooth fade with scale
export function useFadeTransition(
  config: Partial<TransitionConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const {
    duration = PRESETS.transition.fade.duration,
    easing = PRESETS.transition.fade.easing,
    type = 'fade'
  } = config;

  const transitionIn = useCallback(async () => {
    if (!elementRef.current || isTransitioning) return;

    setIsTransitioning(true);
    const element = elementRef.current;
    
    // Create fade in keyframes
    const cleanup = createKeyframes('fadeIn', {
      '0%': {
        opacity: '0',
        transform: 'scale(0.95)',
      },
      '100%': {
        opacity: '1',
        transform: 'scale(1)',
      },
    });

    element.style.animation = `fadeIn ${duration}ms ${easing}`;
    setIsVisible(true);
    
    await delay(duration);
    element.style.animation = '';
    setIsTransitioning(false);
    cleanup();
  }, [duration, easing, isTransitioning]);

  const transitionOut = useCallback(async () => {
    if (!elementRef.current || isTransitioning) return;

    setIsTransitioning(true);
    const element = elementRef.current;
    
    // Create fade out keyframes
    const cleanup = createKeyframes('fadeOut', {
      '0%': {
        opacity: '1',
        transform: 'scale(1)',
      },
      '100%': {
        opacity: '0',
        transform: 'scale(1.05)',
      },
    });

    element.style.animation = `fadeOut ${duration}ms ${easing}`;
    
    await delay(duration);
    setIsVisible(false);
    element.style.animation = '';
    setIsTransitioning(false);
    cleanup();
  }, [duration, easing, isTransitioning]);

  return { elementRef, isTransitioning, isVisible, transitionIn, transitionOut };
}

// Curtain reveal effect
export function useCurtainTransition(
  config: Partial<TransitionConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const {
    duration = PRESETS.transition.curtain.duration,
    easing = PRESETS.transition.curtain.easing,
    curtainColor = PRESETS.transition.curtain.curtainColor
  } = config;

  const transitionIn = useCallback(async () => {
    if (!elementRef.current || !curtainRef.current || isTransitioning) return;

    setIsTransitioning(true);
    const element = elementRef.current;
    const curtain = curtainRef.current;
    
    // Create curtain keyframes
    const cleanup = createKeyframes('curtainReveal', {
      '0%': {
        clipPath: 'inset(0 0 0 0)',
      },
      '50%': {
        clipPath: 'inset(0 50% 0 0)',
      },
      '100%': {
        clipPath: 'inset(0 100% 0 0)',
      },
    });

    curtain.style.background = curtainColor;
    curtain.style.animation = `curtainReveal ${duration}ms ${easing}`;
    setIsVisible(true);
    
    await delay(duration);
    curtain.style.animation = '';
    setIsTransitioning(false);
    cleanup();
  }, [duration, easing, curtainColor, isTransitioning]);

  const transitionOut = useCallback(async () => {
    if (!elementRef.current || !curtainRef.current || isTransitioning) return;

    setIsTransitioning(true);
    const element = elementRef.current;
    const curtain = curtainRef.current;
    
    // Create curtain hide keyframes
    const cleanup = createKeyframes('curtainHide', {
      '0%': {
        clipPath: 'inset(0 100% 0 0)',
      },
      '50%': {
        clipPath: 'inset(0 50% 0 0)',
      },
      '100%': {
        clipPath: 'inset(0 0 0 0)',
      },
    });

    curtain.style.background = curtainColor;
    curtain.style.animation = `curtainHide ${duration}ms ${easing}`;
    
    await delay(duration);
    setIsVisible(false);
    curtain.style.animation = '';
    setIsTransitioning(false);
    cleanup();
  }, [duration, easing, curtainColor, isTransitioning]);

  return { elementRef, curtainRef, isTransitioning, isVisible, transitionIn, transitionOut };
}

// Morph transitions
export function useMorphTransition(
  config: Partial<TransitionConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const {
    duration = 1000,
    easing = 'ease-in-out',
    morphPath = 'M0,0 L100,0 L100,100 L0,100 Z'
  } = config;

  const transitionIn = useCallback(async () => {
    if (!elementRef.current || isTransitioning) return;

    setIsTransitioning(true);
    const element = elementRef.current;
    
    // Create morph keyframes
    const cleanup = createKeyframes('morphIn', {
      '0%': {
        clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
        opacity: '0',
      },
      '50%': {
        clipPath: morphPath,
        opacity: '0.5',
      },
      '100%': {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        opacity: '1',
      },
    });

    element.style.animation = `morphIn ${duration}ms ${easing}`;
    setIsVisible(true);
    
    await delay(duration);
    element.style.animation = '';
    setIsTransitioning(false);
    cleanup();
  }, [duration, easing, morphPath, isTransitioning]);

  const transitionOut = useCallback(async () => {
    if (!elementRef.current || isTransitioning) return;

    setIsTransitioning(true);
    const element = elementRef.current;
    
    // Create morph out keyframes
    const cleanup = createKeyframes('morphOut', {
      '0%': {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        opacity: '1',
      },
      '50%': {
        clipPath: morphPath,
        opacity: '0.5',
      },
      '100%': {
        clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
        opacity: '0',
      },
    });

    element.style.animation = `morphOut ${duration}ms ${easing}`;
    
    await delay(duration);
    setIsVisible(false);
    element.style.animation = '';
    setIsTransitioning(false);
    cleanup();
  }, [duration, easing, morphPath, isTransitioning]);

  return { elementRef, isTransitioning, isVisible, transitionIn, transitionOut };
}

// Liquid page transitions
export function useLiquidTransition(
  config: Partial<TransitionConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const {
    duration = 1200,
    easing = 'ease-out',
    liquidIntensity = 0.5
  } = config;

  const transitionIn = useCallback(async () => {
    if (!elementRef.current || isTransitioning) return;

    setIsTransitioning(true);
    const element = elementRef.current;
    
    // Create liquid keyframes
    const cleanup = createKeyframes('liquidIn', {
      '0%': {
        borderRadius: '50%',
        transform: 'scale(0) rotate(0deg)',
        opacity: '0',
      },
      '25%': {
        borderRadius: `${randomBetween(20, 40)}%`,
        transform: `scale(0.5) rotate(${randomBetween(-180, 180)}deg)`,
        opacity: '0.3',
      },
      '50%': {
        borderRadius: `${randomBetween(10, 30)}%`,
        transform: `scale(0.8) rotate(${randomBetween(-360, 360)}deg)`,
        opacity: '0.7',
      },
      '75%': {
        borderRadius: `${randomBetween(5, 15)}%`,
        transform: `scale(1.1) rotate(${randomBetween(-540, 540)}deg)`,
        opacity: '0.9',
      },
      '100%': {
        borderRadius: '0%',
        transform: 'scale(1) rotate(0deg)',
        opacity: '1',
      },
    });

    element.style.animation = `liquidIn ${duration}ms ${easing}`;
    setIsVisible(true);
    
    await delay(duration);
    element.style.animation = '';
    setIsTransitioning(false);
    cleanup();
  }, [duration, easing, liquidIntensity, isTransitioning]);

  const transitionOut = useCallback(async () => {
    if (!elementRef.current || isTransitioning) return;

    setIsTransitioning(true);
    const element = elementRef.current;
    
    // Create liquid out keyframes
    const cleanup = createKeyframes('liquidOut', {
      '0%': {
        borderRadius: '0%',
        transform: 'scale(1) rotate(0deg)',
        opacity: '1',
      },
      '25%': {
        borderRadius: `${randomBetween(5, 15)}%`,
        transform: `scale(1.1) rotate(${randomBetween(-180, 180)}deg)`,
        opacity: '0.8',
      },
      '50%': {
        borderRadius: `${randomBetween(10, 30)}%`,
        transform: `scale(0.8) rotate(${randomBetween(-360, 360)}deg)`,
        opacity: '0.6',
      },
      '75%': {
        borderRadius: `${randomBetween(20, 40)}%`,
        transform: `scale(0.5) rotate(${randomBetween(-540, 540)}deg)`,
        opacity: '0.3',
      },
      '100%': {
        borderRadius: '50%',
        transform: 'scale(0) rotate(0deg)',
        opacity: '0',
      },
    });

    element.style.animation = `liquidOut ${duration}ms ${easing}`;
    
    await delay(duration);
    setIsVisible(false);
    element.style.animation = '';
    setIsTransitioning(false);
    cleanup();
  }, [duration, easing, liquidIntensity, isTransitioning]);

  return { elementRef, isTransitioning, isVisible, transitionIn, transitionOut };
}

// Slide transitions
export function useSlideTransition(
  config: Partial<TransitionConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const {
    duration = 600,
    easing = 'ease-out',
    direction = 'right'
  } = config;

  const transitionIn = useCallback(async () => {
    if (!elementRef.current || isTransitioning) return;

    setIsTransitioning(true);
    const element = elementRef.current;
    
    // Create slide in keyframes based on direction
    let slideInKeyframes = {};
    
    switch (direction) {
      case 'left':
        slideInKeyframes = {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        };
        break;
      case 'right':
        slideInKeyframes = {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        };
        break;
      case 'up':
        slideInKeyframes = {
          '0%': {
            transform: 'translateY(100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        };
        break;
      case 'down':
        slideInKeyframes = {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        };
        break;
    }

    const cleanup = createKeyframes('slideIn', slideInKeyframes);
    element.style.animation = `slideIn ${duration}ms ${easing}`;
    setIsVisible(true);
    
    await delay(duration);
    element.style.animation = '';
    setIsTransitioning(false);
    cleanup();
  }, [duration, easing, direction, isTransitioning]);

  const transitionOut = useCallback(async () => {
    if (!elementRef.current || isTransitioning) return;

    setIsTransitioning(true);
    const element = elementRef.current;
    
    // Create slide out keyframes based on direction
    let slideOutKeyframes = {};
    
    switch (direction) {
      case 'left':
        slideOutKeyframes = {
          '0%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
        };
        break;
      case 'right':
        slideOutKeyframes = {
          '0%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
        };
        break;
      case 'up':
        slideOutKeyframes = {
          '0%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(-100%)',
            opacity: '0',
          },
        };
        break;
      case 'down':
        slideOutKeyframes = {
          '0%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(100%)',
            opacity: '0',
          },
        };
        break;
    }

    const cleanup = createKeyframes('slideOut', slideOutKeyframes);
    element.style.animation = `slideOut ${duration}ms ${easing}`;
    
    await delay(duration);
    setIsVisible(false);
    element.style.animation = '';
    setIsTransitioning(false);
    cleanup();
  }, [duration, easing, direction, isTransitioning]);

  return { elementRef, isTransitioning, isVisible, transitionIn, transitionOut };
}

// Scale transitions
export function useScaleTransition(
  config: Partial<TransitionConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const {
    duration = 500,
    easing = 'ease-out'
  } = config;

  const transitionIn = useCallback(async () => {
    if (!elementRef.current || isTransitioning) return;

    setIsTransitioning(true);
    const element = elementRef.current;
    
    // Create scale in keyframes
    const cleanup = createKeyframes('scaleIn', {
      '0%': {
        transform: 'scale(0.8)',
        opacity: '0',
      },
      '100%': {
        transform: 'scale(1)',
        opacity: '1',
      },
    });

    element.style.animation = `scaleIn ${duration}ms ${easing}`;
    setIsVisible(true);
    
    await delay(duration);
    element.style.animation = '';
    setIsTransitioning(false);
    cleanup();
  }, [duration, easing, isTransitioning]);

  const transitionOut = useCallback(async () => {
    if (!elementRef.current || isTransitioning) return;

    setIsTransitioning(true);
    const element = elementRef.current;
    
    // Create scale out keyframes
    const cleanup = createKeyframes('scaleOut', {
      '0%': {
        transform: 'scale(1)',
        opacity: '1',
      },
      '100%': {
        transform: 'scale(1.2)',
        opacity: '0',
      },
    });

    element.style.animation = `scaleOut ${duration}ms ${easing}`;
    
    await delay(duration);
    setIsVisible(false);
    element.style.animation = '';
    setIsTransitioning(false);
    cleanup();
  }, [duration, easing, isTransitioning]);

  return { elementRef, isTransitioning, isVisible, transitionIn, transitionOut };
}
