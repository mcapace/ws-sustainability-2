'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  splitBy?: 'chars' | 'words' | 'lines';
}

export function SplitText({ 
  children, 
  className = '',
  delay = 0,
  stagger = 0.02,
  duration = 0.8,
  splitBy = 'chars'
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;
    let splitElements: HTMLElement[] = [];

    if (splitBy === 'chars') {
      splitElements = children.split('').map((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.overflow = 'hidden';
        return span;
      });
    } else if (splitBy === 'words') {
      splitElements = children.split(' ').map((word) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.display = 'inline-block';
        span.style.overflow = 'hidden';
        span.style.marginRight = '0.25em';
        return span;
      });
    }

    // Clear container and add split elements
    element.innerHTML = '';
    splitElements.forEach(span => {
      element.appendChild(span);
    });

    // Create inner spans for animation
    splitElements.forEach(span => {
      const innerSpan = document.createElement('span');
      innerSpan.textContent = span.textContent;
      innerSpan.style.display = 'inline-block';
      span.innerHTML = '';
      span.appendChild(innerSpan);
    });

    // Set initial state
    gsap.set(splitElements.map(el => el.children[0]), {
      y: '100%',
      opacity: 0,
    });

    // Animate
    gsap.to(splitElements.map(el => el.children[0]), {
      y: '0%',
      opacity: 1,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
    });

    return () => {
      // Cleanup
      splitElements.forEach(el => el.remove());
    };
  }, [children, delay, stagger, duration, splitBy]);

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{ display: 'inline-block' }}
    />
  );
}
