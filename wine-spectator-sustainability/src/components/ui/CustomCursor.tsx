'use client';

import { useCursor } from '@/hooks/useCursor';
import { cn } from '@/lib/utils';

interface CustomCursorProps {
  className?: string;
}

export function CustomCursor({ className }: CustomCursorProps) {
  const { cursorState, cursorRef } = useCursor();

  // Don't render cursor on mobile
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={cn(
        'custom-cursor fixed pointer-events-none z-50',
        cursorState.isHovering && 'hover',
        className
      )}
      style={{
        transform: `translate3d(${cursorState.x - 10}px, ${cursorState.y - 10}px, 0)`,
      }}
    />
  );
}
