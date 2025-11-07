'use client';

import { useRef, useEffect, useState } from 'react';

interface TextScrambleProps {
  text: string;
  duration?: number;
  delay?: number;
  scrambleChars?: string;
  className?: string;
}

export function TextScramble({ 
  text, 
  duration = 1.5, 
  delay = 0,
  scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()',
  className = ''
}: TextScrambleProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [currentText, setCurrentText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;

    let frame = 0;
    const frameRate = 5;
    let animationId: number;

    const animate = () => {
      frame++;
      
      if (frame % frameRate === 0) {
        const progress = Math.min(frame / (duration * 60), 1);
        const currentLength = Math.floor(progress * text.length);
        
        let scrambledText = '';
        
        for (let i = 0; i < text.length; i++) {
          if (i < currentLength) {
            scrambledText += text[i];
          } else if (i === currentLength) {
            scrambledText += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          } else {
            scrambledText += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          }
        }
        
        setCurrentText(scrambledText);
        
        if (progress >= 1) {
          setCurrentText(text);
          setIsAnimating(false);
          return;
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      setIsAnimating(true);
      frame = 0;
      animate();
    };

    const timer = setTimeout(startAnimation, delay * 1000);

    return () => {
      clearTimeout(timer);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [text, duration, delay, scrambleChars]);

  return (
    <div 
      ref={elementRef} 
      className={`inline-block ${className}`}
      style={{ 
        fontFamily: 'monospace',
        minHeight: '1.2em',
        display: 'inline-block'
      }}
    >
      {currentText}
      {isAnimating && (
        <span className="animate-pulse text-cigar-gold">|</span>
      )}
    </div>
  );
}
