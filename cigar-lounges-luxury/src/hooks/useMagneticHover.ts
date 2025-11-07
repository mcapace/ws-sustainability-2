'use client';

import { useRef, useState } from 'react';

export function useMagneticHover() {
  const ref = useRef<HTMLButtonElement>(null);
  const [magneticStyle, setMagneticStyle] = useState({});

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;

    setMagneticStyle({
      transform: `translate(${deltaX}px, ${deltaY}px)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setMagneticStyle({
      transform: 'translate(0px, 0px)',
      transition: 'transform 0.3s ease-out'
    });
  };

  // Add event listeners
  const element = ref.current;
  if (element) {
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
  }

  return {
    ref,
    magneticStyle
  };
}
