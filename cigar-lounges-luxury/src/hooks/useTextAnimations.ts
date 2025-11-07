'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { TextAnimationConfig, PRESETS } from '@/lib/animations/types';
import { 
  splitText, 
  wrapText, 
  delay, 
  getEasingFunction, 
  randomBetween,
  createKeyframes 
} from '@/lib/animations/utils';

// Letter by letter reveal with wave effect
export function useLetterReveal(
  text: string,
  config: Partial<TextAnimationConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const {
    duration = PRESETS.text.reveal.duration,
    stagger = PRESETS.text.reveal.stagger,
    easing = PRESETS.text.reveal.easing,
    splitBy = PRESETS.text.reveal.splitBy,
    waveIntensity = 0.5,
    trigger = true
  } = config;

  const startAnimation = useCallback(async () => {
    if (!elementRef.current || isAnimating) return;

    setIsAnimating(true);
    const element = elementRef.current;
    const parts = splitText(text, splitBy);
    
    // Wrap text with animation-ready elements
    element.innerHTML = wrapText(text, splitBy);
    const partElements = element.querySelectorAll('.text-part');
    
    // Set initial state
    partElements.forEach(part => {
      const el = part as HTMLElement;
      el.style.opacity = '0';
      el.style.transform = 'translateY(100px) rotateX(90deg)';
      el.style.transformOrigin = 'bottom';
      el.style.display = 'inline-block';
    });

    // Animate parts with wave effect
    for (let i = 0; i < partElements.length; i++) {
      const el = partElements[i] as HTMLElement;
      const waveOffset = Math.sin((i / partElements.length) * Math.PI * 2) * waveIntensity * 50;
      
      setTimeout(() => {
        el.style.transition = `all ${duration}ms ${easing}`;
        el.style.opacity = '1';
        el.style.transform = `translateY(${waveOffset}px) rotateX(0deg)`;
      }, i * stagger);
    }

    await delay(duration + (partElements.length * stagger));
    setIsAnimating(false);
  }, [text, duration, stagger, easing, splitBy, waveIntensity, isAnimating]);

  useEffect(() => {
    if (trigger) {
      startAnimation();
    }
  }, [trigger, startAnimation]);

  return { elementRef, isAnimating, startAnimation };
}

// Glitch effect for emphasis
export function useGlitchEffect(
  text: string,
  config: Partial<TextAnimationConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [isGlitching, setIsGlitching] = useState(false);

  const {
    duration = PRESETS.text.glitch.duration,
    repeat = PRESETS.text.glitch.repeat,
    easing = PRESETS.text.glitch.easing,
    glitchIntensity = PRESETS.text.glitch.glitchIntensity,
    trigger = true
  } = config;

  const startGlitch = useCallback(async () => {
    if (!elementRef.current || isGlitching) return;

    setIsGlitching(true);
    const element = elementRef.current;
    const originalText = element.textContent || '';
    
    // Create glitch keyframes
    const cleanup = createKeyframes('glitch', {
      '0%': {
        transform: 'translate(0)',
        filter: 'hue-rotate(0deg)',
      },
      '10%': {
        transform: `translate(${randomBetween(-2, 2)}px, ${randomBetween(-2, 2)}px)`,
        filter: `hue-rotate(${randomBetween(-10, 10)}deg)`,
      },
      '20%': {
        transform: `translate(${randomBetween(-2, 2)}px, ${randomBetween(-2, 2)}px)`,
        filter: `hue-rotate(${randomBetween(-10, 10)}deg)`,
      },
      '30%': {
        transform: `translate(${randomBetween(-2, 2)}px, ${randomBetween(-2, 2)}px)`,
        filter: `hue-rotate(${randomBetween(-10, 10)}deg)`,
      },
      '40%': {
        transform: `translate(${randomBetween(-2, 2)}px, ${randomBetween(-2, 2)}px)`,
        filter: `hue-rotate(${randomBetween(-10, 10)}deg)`,
      },
      '50%': {
        transform: `translate(${randomBetween(-2, 2)}px, ${randomBetween(-2, 2)}px)`,
        filter: `hue-rotate(${randomBetween(-10, 10)}deg)`,
      },
      '60%': {
        transform: `translate(${randomBetween(-2, 2)}px, ${randomBetween(-2, 2)}px)`,
        filter: `hue-rotate(${randomBetween(-10, 10)}deg)`,
      },
      '70%': {
        transform: `translate(${randomBetween(-2, 2)}px, ${randomBetween(-2, 2)}px)`,
        filter: `hue-rotate(${randomBetween(-10, 10)}deg)`,
      },
      '80%': {
        transform: `translate(${randomBetween(-2, 2)}px, ${randomBetween(-2, 2)}px)`,
        filter: `hue-rotate(${randomBetween(-10, 10)}deg)`,
      },
      '90%': {
        transform: `translate(${randomBetween(-2, 2)}px, ${randomBetween(-2, 2)}px)`,
        filter: `hue-rotate(${randomBetween(-10, 10)}deg)`,
      },
      '100%': {
        transform: 'translate(0)',
        filter: 'hue-rotate(0deg)',
      },
    });

    // Apply glitch animation
    element.style.animation = `glitch ${duration}ms ${easing}`;
    element.style.animationIterationCount = repeat.toString();
    
    // Random character substitution during glitch
    const glitchInterval = setInterval(() => {
      if (Math.random() < glitchIntensity) {
        const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        const randomChar = chars[Math.floor(Math.random() * chars.length)];
        const randomIndex = Math.floor(Math.random() * originalText.length);
        const glitchedText = originalText.split('');
        glitchedText[randomIndex] = randomChar;
        element.textContent = glitchedText.join('');
        
        setTimeout(() => {
          element.textContent = originalText;
        }, 50);
      }
    }, 50);

    await delay(duration * (typeof repeat === 'number' ? repeat : 3));
    
    clearInterval(glitchInterval);
    element.style.animation = '';
    element.textContent = originalText;
    cleanup();
    setIsGlitching(false);
  }, [text, duration, repeat, easing, glitchIntensity, isGlitching]);

  useEffect(() => {
    if (trigger) {
      startGlitch();
    }
  }, [trigger, startGlitch]);

  return { elementRef, isGlitching, startGlitch };
}

// Typewriter with blinking cursor
export function useTypewriter(
  text: string,
  config: Partial<TextAnimationConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  const {
    duration = PRESETS.text.typewriter.duration,
    typewriterSpeed = PRESETS.text.typewriter.typewriterSpeed,
    cursorBlinkSpeed = PRESETS.text.typewriter.cursorBlinkSpeed,
    trigger = true
  } = config;

  const startTypewriter = useCallback(async () => {
    if (!elementRef.current || isTyping) return;

    setIsTyping(true);
    setDisplayedText('');
    
    // Create cursor element
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    cursor.textContent = '|';
    cursor.style.animation = `blink ${cursorBlinkSpeed}ms infinite`;
    
    if (elementRef.current) {
      elementRef.current.appendChild(cursor);
    }

    // Typewriter effect
    for (let i = 0; i <= text.length; i++) {
      setDisplayedText(text.slice(0, i));
      await delay(typewriterSpeed);
    }

    // Remove cursor after typing
    setTimeout(() => {
      if (elementRef.current) {
        const cursorEl = elementRef.current.querySelector('.typewriter-cursor');
        if (cursorEl) {
          elementRef.current.removeChild(cursorEl);
        }
      }
    }, cursorBlinkSpeed * 2);

    setIsTyping(false);
  }, [text, duration, typewriterSpeed, cursorBlinkSpeed, isTyping]);

  useEffect(() => {
    if (trigger) {
      startTypewriter();
    }
  }, [trigger, startTypewriter]);

  // Create cursor blink animation
  useEffect(() => {
    const cleanup = createKeyframes('blink', {
      '0%, 50%': { opacity: '1' },
      '51%, 100%': { opacity: '0' },
    });
    return cleanup;
  }, []);

  return { elementRef, isTyping, displayedText, startTypewriter };
}

// Text morphing between states
export function useTextMorphing(
  texts: string[],
  config: Partial<TextAnimationConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMorphing, setIsMorphing] = useState(false);

  const {
    duration = 1000,
    delay: morphDelay = 2000,
    trigger = true
  } = config;

  const morphToNext = useCallback(async () => {
    if (!elementRef.current || isMorphing || texts.length <= 1) return;

    setIsMorphing(true);
    const element = elementRef.current;
    const nextIndex = (currentIndex + 1) % texts.length;
    const currentText = texts[currentIndex];
    const nextText = texts[nextIndex];

    // Create morphing animation
    const cleanup = createKeyframes('textMorph', {
      '0%': {
        transform: 'scale(1)',
        opacity: '1',
      },
      '50%': {
        transform: 'scale(0.8)',
        opacity: '0',
      },
      '100%': {
        transform: 'scale(1)',
        opacity: '1',
      },
    });

    element.style.animation = `textMorph ${duration}ms ease-in-out`;
    
    // Change text at midpoint
    setTimeout(() => {
      element.textContent = nextText;
    }, duration / 2);

    await delay(duration);
    element.style.animation = '';
    cleanup();
    
    setCurrentIndex(nextIndex);
    setIsMorphing(false);
  }, [texts, currentIndex, duration, morphDelay, isMorphing]);

  // Auto-morph loop
  useEffect(() => {
    if (!trigger || texts.length <= 1) return;

    const interval = setInterval(() => {
      morphToNext();
    }, morphDelay + duration);

    return () => clearInterval(interval);
  }, [trigger, morphDelay, duration, morphToNext, texts.length]);

  // Set initial text
  useEffect(() => {
    if (elementRef.current && texts.length > 0) {
      elementRef.current.textContent = texts[currentIndex];
    }
  }, [texts, currentIndex]);

  return { elementRef, currentIndex, isMorphing, morphToNext };
}

// 3D text depth on mouse move
export function useText3DDepth(
  text: string,
  config: Partial<TextAnimationConfig> = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useState(false);

  const {
    duration = 300,
    trigger = true
  } = config;

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!elementRef.current || !isActive) return;

    const element = elementRef.current;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / rect.width;
    const deltaY = (e.clientY - centerY) / rect.height;
    
    const rotateX = deltaY * 20;
    const rotateY = deltaX * 20;
    const translateZ = Math.sqrt(deltaX * deltaX + deltaY * deltaY) * 50;
    
    element.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
    element.style.transition = `transform ${duration}ms ease-out`;
  }, [isActive, duration]);

  const handleMouseEnter = useCallback(() => {
    setIsActive(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!elementRef.current) return;
    
    setIsActive(false);
    elementRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  }, []);

  useEffect(() => {
    if (!elementRef.current || !trigger) return;

    const element = elementRef.current;
    element.textContent = text;
    element.style.transformStyle = 'preserve-3d';
    element.style.transition = `transform ${duration}ms ease-out`;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [text, trigger, handleMouseMove, handleMouseEnter, handleMouseLeave, duration]);

  return { elementRef, isActive };
}
