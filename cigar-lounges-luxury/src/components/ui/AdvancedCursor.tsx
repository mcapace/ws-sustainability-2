'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
  target: HTMLElement | null;
  blendMode: 'normal' | 'difference' | 'multiply' | 'screen';
  scale: number;
  trail: { x: number; y: number; timestamp: number }[];
}

interface AdvancedCursorProps {
  blendMode?: 'normal' | 'difference' | 'multiply' | 'screen';
  enableTrail?: boolean;
  trailLength?: number;
  enableMagnetic?: boolean;
  magneticStrength?: number;
  hideOnMobile?: boolean;
}

export function AdvancedCursor({
  blendMode = 'difference',
  enableTrail = true,
  trailLength = 10,
  enableMagnetic = true,
  magneticStrength = 0.3,
  hideOnMobile = true
}: AdvancedCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    isClicking: false,
    target: null,
    blendMode,
    scale: 1,
    trail: []
  });

  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                            ('ontouchstart' in window) ||
                            (navigator.maxTouchPoints > 0);
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hide cursor on mobile if enabled
  useEffect(() => {
    if (hideOnMobile && isMobile) {
      document.body.style.cursor = 'default';
      return;
    }

    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'default';
    };
  }, [hideOnMobile, isMobile]);

  // Mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (hideOnMobile && isMobile) return;

    const { clientX, clientY, target } = e;
    
    setCursorState(prev => ({
      ...prev,
      x: clientX,
      y: clientY,
      target: target as HTMLElement
    }));

    // Add to trail
    if (enableTrail) {
      setCursorState(prev => ({
        ...prev,
        trail: [
          { x: clientX, y: clientY, timestamp: Date.now() },
          ...prev.trail.slice(0, trailLength - 1)
        ]
      }));
    }

    // Update cursor position with magnetic effect
    if (cursorRef.current) {
      const cursor = cursorRef.current;
      
      // Apply magnetic effect to buttons and interactive elements
      if (enableMagnetic && target) {
        const element = target as HTMLElement;
        const isInteractive = element.matches('button, a, [role="button"], input, textarea, select');
        
        if (isInteractive) {
          const rect = element.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const deltaX = centerX - clientX;
          const deltaY = centerY - clientY;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          
          if (distance < 100) { // Magnetic radius
            const magneticX = clientX + deltaX * magneticStrength;
            const magneticY = clientY + deltaY * magneticStrength;
            
            cursor.style.transform = `translate3d(${magneticX}px, ${magneticY}px, 0) scale(1.2)`;
            return;
          }
        }
      }
      
      // Normal positioning
      cursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
    }
  }, [hideOnMobile, isMobile, enableTrail, trailLength, enableMagnetic, magneticStrength]);

  // Mouse enter/leave handlers
  const handleMouseEnter = useCallback((e: MouseEvent) => {
    if (hideOnMobile && isMobile) return;

    const target = e.target as HTMLElement;
    const isInteractive = target.matches('button, a, [role="button"], input, textarea, select, .interactive');
    
    setCursorState(prev => ({
      ...prev,
      isHovering: isInteractive,
      scale: isInteractive ? 1.5 : 1,
      blendMode: isInteractive ? 'normal' : blendMode
    }));
  }, [hideOnMobile, isMobile, blendMode]);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (hideOnMobile && isMobile) return;

    setCursorState(prev => ({
      ...prev,
      isHovering: false,
      scale: 1,
      blendMode: blendMode
    }));
  }, [hideOnMobile, isMobile, blendMode]);

  // Mouse click handler
  const handleMouseDown = useCallback(() => {
    if (hideOnMobile && isMobile) return;

    setCursorState(prev => ({
      ...prev,
      isClicking: true,
      scale: prev.scale * 0.8
    }));
  }, [hideOnMobile, isMobile]);

  const handleMouseUp = useCallback(() => {
    if (hideOnMobile && isMobile) return;

    setCursorState(prev => ({
      ...prev,
      isClicking: false,
      scale: prev.isHovering ? 1.5 : 1
    }));
  }, [hideOnMobile, isMobile]);

  // Event listeners
  useEffect(() => {
    if (hideOnMobile && isMobile) return;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, handleMouseDown, handleMouseUp, hideOnMobile, isMobile]);

  // Don't render on mobile if hideOnMobile is enabled
  if (hideOnMobile && isMobile) {
    return null;
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          mixBlendMode: cursorState.blendMode,
          willChange: 'transform'
        }}
        animate={{
          scale: cursorState.scale,
          backgroundColor: cursorState.isHovering ? '#d4af37' : '#ffffff',
          opacity: cursorState.isClicking ? 0.7 : 1
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-current" />
      </motion.div>

      {/* Cursor trail */}
      {enableTrail && (
        <div
          ref={trailRef}
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
        >
          {cursorState.trail.map((point, index) => {
            const opacity = (trailLength - index) / trailLength;
            const scale = 0.5 + (opacity * 0.5);
            
            return (
              <motion.div
                key={`${point.timestamp}-${index}`}
                className="absolute w-2 h-2 bg-cigar-gold rounded-full mix-blend-difference"
                style={{
                  mixBlendMode: cursorState.blendMode,
                  willChange: 'transform'
                }}
                initial={{
                  x: point.x - 4,
                  y: point.y - 4,
                  scale: 0,
                  opacity: 0
                }}
                animate={{
                  scale,
                  opacity
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut'
                }}
              />
            );
          })}
        </div>
      )}

      {/* Cursor text (for special interactions) */}
      {cursorState.isHovering && cursorState.target && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997] text-cigar-gold font-bold text-sm mix-blend-difference"
          style={{
            transform: `translate3d(${cursorState.x + 20}px, ${cursorState.y - 20}px, 0)`,
            mixBlendMode: cursorState.blendMode,
            willChange: 'transform'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          {cursorState.target.getAttribute('data-cursor-text') || 
           (cursorState.target.tagName === 'BUTTON' ? 'Click' : 
            cursorState.target.tagName === 'A' ? 'Visit' : 'Hover')}
        </motion.div>
      )}
    </>
  );
}

// Cursor provider for global cursor management
export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorConfig, setCursorConfig] = useState({
    blendMode: 'difference' as const,
    enableTrail: true,
    enableMagnetic: true
  });

  return (
    <>
      <AdvancedCursor {...cursorConfig} />
      {children}
    </>
  );
}
