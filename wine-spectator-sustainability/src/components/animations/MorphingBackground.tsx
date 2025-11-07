'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface MorphingBackgroundProps {
  shapes: string[];
  duration?: number;
  className?: string;
}

export function MorphingBackground({ 
  shapes, 
  duration = 3,
  className = ''
}: MorphingBackgroundProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);

  useEffect(() => {
    if (!pathRef.current || shapes.length === 0) return;

    const morphToNext = () => {
      const nextIndex = (currentShapeIndex + 1) % shapes.length;
      
      gsap.to(pathRef.current, {
        attr: { d: shapes[nextIndex] },
        duration,
        ease: 'power2.inOut',
        onComplete: () => {
          setCurrentShapeIndex(nextIndex);
        }
      });
    };

    const interval = setInterval(morphToNext, duration * 1000);

    return () => clearInterval(interval);
  }, [shapes, duration, currentShapeIndex]);

  // Luxury-themed morphing shapes
  const luxuryShapes = [
    // Cigar shape
    'M50,20 Q30,15 20,30 Q15,45 25,60 Q35,75 50,80 Q65,75 75,60 Q85,45 80,30 Q70,15 50,20 Z',
    // Wine glass
    'M50,10 Q45,10 45,25 L40,65 Q40,75 50,75 Q60,75 60,65 L55,25 Q55,10 50,10 Z M45,25 Q50,25 55,25',
    // Diamond
    'M50,10 L65,30 L50,70 L35,30 Z',
    // Smoke swirl
    'M50,20 Q30,25 25,40 Q30,55 50,60 Q70,55 75,40 Q70,25 50,20 Q45,30 40,40 Q45,50 50,50 Q55,50 60,40 Q55,30 50,20 Z',
    // Luxury crown
    'M30,60 L35,40 L40,50 L45,35 L50,45 L55,35 L60,50 L65,40 L70,60 Z M30,60 L70,60 L70,70 L30,70 Z'
  ];

  const shapesToUse = shapes.length > 0 ? shapes : luxuryShapes;

  return (
    <svg
      ref={svgRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Gradient definitions */}
        <linearGradient id="luxuryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#b87333" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#cd7f32" stopOpacity="0.1" />
        </linearGradient>
        
        <radialGradient id="radialGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.8" />
        </radialGradient>

        {/* Filter for liquid motion effect */}
        <filter id="liquidMotion" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence
            baseFrequency="0.02 0.03"
            numOctaves="3"
            result="turbulence"
            seed="1"
          >
            <animateTransform
              attributeName="baseFrequency"
              type="baseFrequency"
              values="0.02 0.03;0.03 0.04;0.02 0.03"
              dur="10s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="3"
          />
        </filter>

        {/* Glow effect */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background shapes */}
      <path
        ref={pathRef}
        d={shapesToUse[0]}
        fill="url(#luxuryGradient)"
        filter="url(#liquidMotion)"
        opacity="0.6"
      />
      
      <path
        ref={pathRef}
        d={shapesToUse[0]}
        fill="url(#radialGradient)"
        filter="url(#glow)"
        opacity="0.4"
      />

      {/* Animated particles */}
      <circle cx="20" cy="30" r="2" fill="#d4af37" opacity="0.8">
        <animateMotion dur="8s" repeatCount="indefinite">
          <path d="M0,0 Q20,-10 40,0 Q60,10 80,0" />
        </animateMotion>
        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="4s" repeatCount="indefinite" />
      </circle>
      
      <circle cx="80" cy="70" r="1.5" fill="#b87333" opacity="0.6">
        <animateMotion dur="6s" repeatCount="indefinite">
          <path d="M0,0 Q-30,5 -60,0 Q-30,-5 0,0" />
        </animateMotion>
        <animate attributeName="opacity" values="0.6;0.1;0.6" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
