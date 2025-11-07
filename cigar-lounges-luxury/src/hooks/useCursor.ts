'use client';

import { useState, useEffect, useRef } from 'react';
import { CursorState } from '@/types';

export function useCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    target: undefined
  });

  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorState(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY
      }));
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.matches('a, button, [role="button"], input, textarea, select');
      
      setCursorState(prev => ({
        ...prev,
        isHovering: isInteractive,
        target: isInteractive ? target.tagName.toLowerCase() : undefined
      }));
    };

    const handleMouseLeave = () => {
      setCursorState(prev => ({
        ...prev,
        isHovering: false,
        target: undefined
      }));
    };

    // Only add cursor functionality on desktop
    if (window.innerWidth > 768) {
      document.addEventListener('mousemove', updateCursor);
      document.addEventListener('mouseenter', handleMouseEnter, true);
      document.addEventListener('mouseleave', handleMouseLeave, true);
    }

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${cursorState.x - 10}px, ${cursorState.y - 10}px, 0)`;
    }
  }, [cursorState.x, cursorState.y]);

  return {
    cursorState,
    cursorRef
  };
}
