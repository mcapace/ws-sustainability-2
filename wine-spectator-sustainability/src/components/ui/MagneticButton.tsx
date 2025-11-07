'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useMouse } from '@/hooks/useMouse';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  hapticFeedback?: boolean;
}

export function MagneticButton({ 
  children, 
  className = '',
  onClick,
  strength = 0.3,
  hapticFeedback = true
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mouse = useMouse();
  const [isHovered, setIsHovered] = useState(false);
  const [buttonRect, setButtonRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  useEffect(() => {
    const updateButtonRect = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setButtonRect({
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height
        });
      }
    };

    updateButtonRect();
    window.addEventListener('resize', updateButtonRect);
    window.addEventListener('scroll', updateButtonRect);

    return () => {
      window.removeEventListener('resize', updateButtonRect);
      window.removeEventListener('scroll', updateButtonRect);
    };
  }, []);

  useEffect(() => {
    if (!isHovered) {
      x.set(0);
      y.set(0);
      return;
    }

    const mouseX = mouse.x * window.innerWidth;
    const mouseY = mouse.y * window.innerHeight;

    const centerX = buttonRect.x + buttonRect.width / 2;
    const centerY = buttonRect.y + buttonRect.height / 2;

    const deltaX = (mouseX - centerX) * strength;
    const deltaY = (mouseY - centerY) * strength;

    x.set(deltaX);
    y.set(deltaY);
  }, [mouse.x, mouse.y, isHovered, buttonRect, strength, x, y]);

  const handleClick = () => {
    // Haptic feedback
    if (hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }

    // Micro-animation feedback
    if (buttonRef.current) {
      buttonRef.current.style.transform = 'scale(0.95)';
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.style.transform = 'scale(1)';
        }
      }, 100);
    }

    onClick?.();
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`relative ${className}`}
      style={{
        x,
        y,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.div
        style={{
          transform: 'translateZ(50px)'
        }}
        className="relative"
      >
        {children}
      </motion.div>
      
      {/* Magnetic field indicator */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute inset-0 rounded-lg border-2 border-cigar-gold/30 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)'
          }}
        />
      )}
    </motion.button>
  );
}
