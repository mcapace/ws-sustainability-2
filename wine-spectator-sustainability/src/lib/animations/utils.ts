// Core animation utilities and helpers

import { EasingType } from './types';

// CSS animation utilities
export function createKeyframes(name: string, keyframes: Record<string, Record<string, string | number>>) {
  const style = document.createElement('style');
  let css = `@keyframes ${name} {\n`;
  
  for (const [percentage, properties] of Object.entries(keyframes)) {
    css += `  ${percentage} {\n`;
    for (const [property, value] of Object.entries(properties)) {
      css += `    ${property}: ${value};\n`;
    }
    css += `  }\n`;
  }
  
  css += '}\n';
  style.textContent = css;
  document.head.appendChild(style);
  
  return () => {
    if (document.head.contains(style)) {
      document.head.removeChild(style);
    }
  };
}

// Easing functions
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function easeOutElastic(t: number): number {
  const c4 = (2 * Math.PI) / 3;
  return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
}

export function easeOutBounce(t: number): number {
  const n1 = 7.5625;
  const d1 = 2.75;
  
  if (t < 1 / d1) {
    return n1 * t * t;
  } else if (t < 2 / d1) {
    return n1 * (t -= 1.5 / d1) * t + 0.75;
  } else if (t < 2.5 / d1) {
    return n1 * (t -= 2.25 / d1) * t + 0.9375;
  } else {
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  }
}

// Get easing function
export function getEasingFunction(easing: EasingType): (t: number) => number {
  switch (easing) {
    case 'linear':
      return (t: number) => t;
    case 'cubic-bezier(0.4, 0, 1, 1)':
      return (t: number) => t * t * t;
    case 'cubic-bezier(0, 0, 0.2, 1)':
      return (t: number) => 1 - Math.pow(1 - t, 3);
    case 'cubic-bezier(0.4, 0, 0.2, 1)':
      return easeInOutCubic;
    case 'cubic-bezier(0.68, -0.55, 0.265, 1.55)':
      return easeOutBounce;
    case 'cubic-bezier(0.175, 0.885, 0.32, 1.275)':
      return easeOutElastic;
    default:
      return (t: number) => t;
  }
}

// Animation timing utilities
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function createAnimationFrame(callback: (time: number) => void): () => void {
  let rafId: number;
  
  const animate = (time: number) => {
    callback(time);
    rafId = requestAnimationFrame(animate);
  };
  
  rafId = requestAnimationFrame(animate);
  
  return () => cancelAnimationFrame(rafId);
}

// Text utilities
export function splitText(text: string, splitBy: 'char' | 'word' | 'line' = 'char'): string[] {
  switch (splitBy) {
    case 'char':
      return text.split('');
    case 'word':
      return text.split(' ');
    case 'line':
      return text.split('\n');
    default:
      return [text];
  }
}

export function wrapText(text: string, splitBy: 'char' | 'word' | 'line' = 'char'): string {
  const parts = splitText(text, splitBy);
  const wrapper = splitBy === 'char' ? 'span' : splitBy === 'word' ? 'span' : 'div';
  
  return parts
    .map(part => `<${wrapper} class="text-part">${part}</${wrapper}>`)
    .join(splitBy === 'line' ? '' : '');
}

// Random utilities
export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Math utilities
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function map(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

// Color utilities
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// DOM utilities
export function getElementBounds(element: Element): DOMRect {
  return element.getBoundingClientRect();
}

export function isElementInViewport(element: Element, threshold = 0): boolean {
  const rect = getElementBounds(element);
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  return (
    rect.top >= -threshold &&
    rect.left >= -threshold &&
    rect.bottom <= windowHeight + threshold &&
    rect.right <= windowWidth + threshold
  );
}

// Performance utilities
export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function(this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return function(this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Intersection Observer utilities
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): IntersectionObserver {
  return new IntersectionObserver(callback, {
    threshold: 0.1,
    rootMargin: '0px',
    ...options
  });
}

// Scroll utilities
export function getScrollProgress(element?: Element): number {
  const target = element || document.documentElement;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = target.scrollHeight - target.clientHeight;
  return scrollHeight > 0 ? scrollTop / scrollHeight : 0;
}

export function getScrollVelocity(): number {
  let lastScrollY = window.scrollY;
  let lastTime = performance.now();
  
  return (): number => {
    const currentScrollY = window.scrollY;
    const currentTime = performance.now();
    const velocity = (currentScrollY - lastScrollY) / (currentTime - lastTime);
    
    lastScrollY = currentScrollY;
    lastTime = currentTime;
    
    return velocity;
  };
}
