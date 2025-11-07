'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface ScrollEffects {
  parallaxLayers: ParallaxLayer[];
  progressBar: ProgressBarConfig;
  revealAnimations: RevealConfig[];
  videoSequence: VideoSequenceConfig;
}

interface ParallaxLayer {
  element: HTMLElement;
  speed: number;
  direction: 'vertical' | 'horizontal';
  offset: number;
}

interface ProgressBarConfig {
  element: HTMLElement;
  gradient: string;
  thickness: number;
}

interface RevealConfig {
  element: HTMLElement;
  trigger: number;
  animation: 'fade' | 'slide' | 'scale' | 'rotate';
  delay: number;
  duration: number;
}

interface VideoSequenceConfig {
  container: HTMLElement;
  frames: string[];
  currentFrame: number;
  isPlaying: boolean;
}

export function useAdvancedScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [isScrolling, setIsScrolling] = useState(false);
  
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);
  const effectsRef = useRef<ScrollEffects>({
    parallaxLayers: [],
    progressBar: {} as ProgressBarConfig,
    revealAnimations: [],
    videoSequence: {} as VideoSequenceConfig
  });

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const initLenis = async () => {
      const Lenis = (await import('lenis')).default;
      
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      // Animation loop
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Scroll event
      lenis.on('scroll', ({ scroll, progress, direction, velocity }) => {
        setScrollY(scroll);
        setScrollProgress(progress);
        setScrollDirection(direction === 1 ? 'down' : 'up');
        setIsScrolling(Math.abs(velocity) > 0.5);

        // Update scroll effects
        updateScrollEffects(scroll, progress);
      });

      return () => {
        lenis.destroy();
      };
    };

    const cleanup = initLenis();
    return () => {
      cleanup.then(cleanupFn => cleanupFn?.());
    };
  }, []);

  // Update scroll effects
  const updateScrollEffects = useCallback((scroll: number, progress: number) => {
    const effects = effectsRef.current;

    // Update parallax layers
    effects.parallaxLayers.forEach((layer) => {
      const rect = layer.element.getBoundingClientRect();
      const speed = layer.speed;
      const offset = layer.offset;
      
      if (layer.direction === 'vertical') {
        const yPos = -(scroll * speed) + offset;
        layer.element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      } else {
        const xPos = -(scroll * speed) + offset;
        layer.element.style.transform = `translate3d(${xPos}px, 0, 0)`;
      }
    });

    // Update progress bar
    if (effects.progressBar.element) {
      const bar = effects.progressBar.element;
      const progressPercent = progress * 100;
      
      bar.style.width = `${progressPercent}%`;
      
      // Update gradient based on progress
      if (effects.progressBar.gradient) {
        const hue = progress * 60; // 0 to 60 degrees (red to yellow)
        bar.style.background = `linear-gradient(90deg, 
          hsl(${hue}, 100%, 50%), 
          hsl(${hue + 30}, 100%, 50%)
        )`;
      }
    }

    // Update reveal animations
    effects.revealAnimations.forEach((config) => {
      const rect = config.element.getBoundingClientRect();
      const elementProgress = (scroll - rect.top + window.innerHeight) / window.innerHeight;
      
      if (elementProgress >= config.trigger && elementProgress <= 1) {
        const animationProgress = (elementProgress - config.trigger) / (1 - config.trigger);
        
        switch (config.animation) {
          case 'fade':
            config.element.style.opacity = animationProgress.toString();
            break;
          case 'slide':
            const slideDistance = 100 * (1 - animationProgress);
            config.element.style.transform = `translateY(${slideDistance}px)`;
            config.element.style.opacity = animationProgress.toString();
            break;
          case 'scale':
            const scale = 0.8 + (0.2 * animationProgress);
            config.element.style.transform = `scale(${scale})`;
            config.element.style.opacity = animationProgress.toString();
            break;
          case 'rotate':
            const rotation = 180 * (1 - animationProgress);
            config.element.style.transform = `rotateY(${rotation}deg)`;
            config.element.style.opacity = animationProgress.toString();
            break;
        }
      }
    });

    // Update video sequence
    if (effects.videoSequence.container && effects.videoSequence.frames.length > 0) {
      const totalFrames = effects.videoSequence.frames.length;
      const currentFrame = Math.floor(progress * totalFrames);
      
      if (currentFrame !== effects.videoSequence.currentFrame && currentFrame < totalFrames) {
        effects.videoSequence.currentFrame = currentFrame;
        effects.videoSequence.container.style.backgroundImage = 
          `url(${effects.videoSequence.frames[currentFrame]})`;
      }
    }
  }, []);

  // Add parallax layer
  const addParallaxLayer = useCallback((
    element: HTMLElement,
    speed: number = 0.5,
    direction: 'vertical' | 'horizontal' = 'vertical',
    offset: number = 0
  ) => {
    effectsRef.current.parallaxLayers.push({
      element,
      speed,
      direction,
      offset
    });

    // Add CSS for hardware acceleration
    element.style.willChange = 'transform';
    element.style.transform = 'translateZ(0)';
  }, []);

  // Add progress bar
  const addProgressBar = useCallback((
    element: HTMLElement,
    gradient: string = 'linear-gradient(90deg, #d4af37, #ffd700)',
    thickness: number = 4
  ) => {
    effectsRef.current.progressBar = {
      element,
      gradient,
      thickness
    };

    element.style.height = `${thickness}px`;
    element.style.background = gradient;
    element.style.willChange = 'width';
  }, []);

  // Add reveal animation
  const addRevealAnimation = useCallback((
    element: HTMLElement,
    trigger: number = 0.2,
    animation: 'fade' | 'slide' | 'scale' | 'rotate' = 'fade',
    delay: number = 0,
    duration: number = 1000
  ) => {
    effectsRef.current.revealAnimations.push({
      element,
      trigger,
      animation,
      delay,
      duration
    });

    // Set initial state
    switch (animation) {
      case 'fade':
        element.style.opacity = '0';
        break;
      case 'slide':
        element.style.transform = 'translateY(100px)';
        element.style.opacity = '0';
        break;
      case 'scale':
        element.style.transform = 'scale(0.8)';
        element.style.opacity = '0';
        break;
      case 'rotate':
        element.style.transform = 'rotateY(180deg)';
        element.style.opacity = '0';
        break;
    }

    element.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
    element.style.willChange = 'transform, opacity';
  }, []);

  // Add video sequence
  const addVideoSequence = useCallback((
    container: HTMLElement,
    frames: string[]
  ) => {
    effectsRef.current.videoSequence = {
      container,
      frames,
      currentFrame: 0,
      isPlaying: false
    };

    container.style.backgroundSize = 'cover';
    container.style.backgroundPosition = 'center';
    container.style.backgroundRepeat = 'no-repeat';
    container.style.willChange = 'background-image';
  }, []);

  // Cleanup function
  const cleanup = useCallback(() => {
    effectsRef.current.parallaxLayers = [];
    effectsRef.current.revealAnimations = [];
    effectsRef.current.progressBar = {} as ProgressBarConfig;
    effectsRef.current.videoSequence = {} as VideoSequenceConfig;
  }, []);

  return {
    scrollY,
    scrollProgress,
    scrollDirection,
    isScrolling,
    addParallaxLayer,
    addProgressBar,
    addRevealAnimation,
    addVideoSequence,
    cleanup
  };
}

// Scroll-based progress indicator
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return progress;
}
