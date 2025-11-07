'use client';

import { useEffect } from 'react';

interface TiltOptions {
  max?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  transition?: boolean;
  axis?: 'x' | 'y' | null;
  reset?: boolean;
}

export function useTiltEffect(
  ref: React.RefObject<HTMLElement | null>,
  options: TiltOptions = {}
) {
  const {
    max = 25,
    perspective = 1000,
    scale = 1,
    speed = 400,
    transition = true,
    axis = null,
    reset = true
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let isMouseOver = false;

    const handleMouseEnter = () => {
      isMouseOver = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseOver) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const rotateX = (mouseY / rect.height) * max;
      const rotateY = (mouseX / rect.width) * max;
      
      const transform = `
        perspective(${perspective}px)
        rotateX(${axis === 'y' ? 0 : -rotateX}deg)
        rotateY(${axis === 'x' ? 0 : rotateY}deg)
        scale(${scale})
      `;
      
      element.style.transform = transform;
      
      if (transition) {
        element.style.transition = `transform ${speed}ms ease-out`;
      }
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
      
      if (reset) {
        element.style.transform = `
          perspective(${perspective}px)
          rotateX(0deg)
          rotateY(0deg)
          scale(1)
        `;
      }
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, max, perspective, scale, speed, transition, axis, reset]);
}
