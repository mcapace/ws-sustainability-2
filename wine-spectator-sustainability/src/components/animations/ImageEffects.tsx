'use client';

import { ReactNode } from 'react';
import { 
  useKenBurnsEffect, 
  useImageComparison, 
  useMaskReveal, 
  useDuotoneEffect, 
  useLiquidDistortion 
} from '@/hooks/useImageAnimations';
import { ImageAnimationConfig } from '@/lib/animations/types';

// Ken Burns Effect Component
interface KenBurnsProps {
  src: string;
  alt: string;
  config?: Partial<ImageAnimationConfig>;
  className?: string;
  trigger?: boolean;
}

export function KenBurns({ 
  src, 
  alt, 
  config, 
  className = '', 
  trigger = true 
}: KenBurnsProps) {
  const { elementRef, isActive } = useKenBurnsEffect({ ...config, trigger });

  return (
    <img
      ref={elementRef}
      src={src}
      alt={alt}
      className={`ken-burns ${className}`}
      data-active={isActive}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        willChange: 'transform',
      }}
    />
  );
}

// Image Comparison Slider Component
interface ImageComparisonProps {
  beforeSrc: string;
  afterSrc: string;
  config?: Partial<ImageAnimationConfig>;
  className?: string;
  trigger?: boolean;
  beforeLabel?: string;
  afterLabel?: string;
}

export function ImageComparison({ 
  beforeSrc, 
  afterSrc, 
  config, 
  className = '', 
  trigger = true,
  beforeLabel = 'Before',
  afterLabel = 'After'
}: ImageComparisonProps) {
  const {
    containerRef,
    sliderRef,
    isDragging,
    comparisonPosition,
    handleMouseDown,
    handleTouchStart
  } = useImageComparison(beforeSrc, afterSrc, { ...config, trigger });

  return (
    <div 
      ref={containerRef}
      className={`image-comparison ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '400px',
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      {/* Before Image */}
      <img
        src={beforeSrc}
        alt={beforeLabel}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />
      
      {/* After Image */}
      <img
        src={afterSrc}
        alt={afterLabel}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 2,
          clipPath: `inset(0 ${100 - comparisonPosition}% 0 0)`,
        }}
      />
      
      {/* Slider Handle */}
      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{
          position: 'absolute',
          top: 0,
          left: `${comparisonPosition}%`,
          width: '4px',
          height: '100%',
          background: '#d4af37',
          zIndex: 3,
          cursor: 'ew-resize',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'translateX(-50%)',
        }}
      >
        <div
          style={{
            width: '20px',
            height: '20px',
            background: '#d4af37',
            borderRadius: '50%',
            border: '2px solid white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        />
      </div>
      
      {/* Labels */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '14px',
          zIndex: 4,
        }}
      >
        {beforeLabel}
      </div>
      
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '14px',
          zIndex: 4,
        }}
      >
        {afterLabel}
      </div>
    </div>
  );
}

// Mask Reveal Component
interface MaskRevealProps {
  src: string;
  alt: string;
  config?: Partial<ImageAnimationConfig>;
  className?: string;
  trigger?: boolean;
}

export function MaskReveal({ 
  src, 
  alt, 
  config, 
  className = '', 
  trigger = true 
}: MaskRevealProps) {
  const { elementRef, isRevealed } = useMaskReveal({ ...config, trigger });

  return (
    <img
      ref={elementRef}
      src={src}
      alt={alt}
      className={`mask-reveal ${className}`}
      data-revealed={isRevealed}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        willChange: 'clip-path',
      }}
    />
  );
}

// Duotone Effect Component
interface DuotoneEffectProps {
  src: string;
  alt: string;
  config?: Partial<ImageAnimationConfig>;
  className?: string;
  trigger?: boolean;
}

export function DuotoneEffect({ 
  src, 
  alt, 
  config, 
  className = '', 
  trigger = true 
}: DuotoneEffectProps) {
  const { elementRef, isHovered } = useDuotoneEffect({ ...config, trigger });

  return (
    <img
      ref={elementRef}
      src={src}
      alt={alt}
      className={`duotone-effect ${className}`}
      data-hovered={isHovered}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        willChange: 'filter',
      }}
    />
  );
}

// Liquid Distortion Component
interface LiquidDistortionProps {
  src: string;
  alt: string;
  config?: Partial<ImageAnimationConfig>;
  className?: string;
  trigger?: boolean;
}

export function LiquidDistortion({ 
  src, 
  alt, 
  config, 
  className = '', 
  trigger = true 
}: LiquidDistortionProps) {
  const { elementRef, isDragging, handleMouseDown } = useLiquidDistortion({ ...config, trigger });

  return (
    <img
      ref={elementRef}
      src={src}
      alt={alt}
      onMouseDown={handleMouseDown}
      className={`liquid-distortion ${className}`}
      data-dragging={isDragging}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        willChange: 'transform, filter',
        cursor: 'grab',
      }}
    />
  );
}

// Combined Image Animation Component
interface AnimatedImageProps {
  src: string;
  alt: string;
  effect?: 'kenBurns' | 'maskReveal' | 'duotone' | 'liquidDistortion';
  config?: Partial<ImageAnimationConfig>;
  className?: string;
  trigger?: boolean;
  beforeSrc?: string; // For comparison effect
  afterSrc?: string; // For comparison effect
  beforeLabel?: string;
  afterLabel?: string;
}

export function AnimatedImage({ 
  src, 
  alt, 
  effect = 'kenBurns',
  config, 
  className = '', 
  trigger = true,
  beforeSrc,
  afterSrc,
  beforeLabel,
  afterLabel
}: AnimatedImageProps) {
  const baseProps = {
    config,
    className,
    trigger,
  };

  switch (effect) {
    case 'maskReveal':
      return <MaskReveal {...baseProps} src={src} alt={alt} />;
    case 'duotone':
      return <DuotoneEffect {...baseProps} src={src} alt={alt} />;
    case 'liquidDistortion':
      return <LiquidDistortion {...baseProps} src={src} alt={alt} />;
    case 'kenBurns':
    default:
      return <KenBurns {...baseProps} src={src} alt={alt} />;
  }
}

// Specialized Image Components
export function HeroImage({ 
  src, 
  alt, 
  ...props 
}: { src: string; alt: string } & Omit<AnimatedImageProps, 'src' | 'alt' | 'effect'>) {
  return (
    <AnimatedImage
      {...props}
      src={src}
      alt={alt}
      effect="kenBurns"
      className={`hero-image ${props.className || ''}`}
      config={{
        kenBurnsIntensity: 0.2,
        duration: 15000,
        ...props.config,
      }}
    />
  );
}

export function GalleryImage({ 
  src, 
  alt, 
  ...props 
}: { src: string; alt: string } & Omit<AnimatedImageProps, 'src' | 'alt' | 'effect'>) {
  return (
    <AnimatedImage
      {...props}
      src={src}
      alt={alt}
      effect="duotone"
      className={`gallery-image ${props.className || ''}`}
      config={{
        duotoneColors: ['#000000', '#d4af37'],
        duration: 400,
        ...props.config,
      }}
    />
  );
}

export function InteractiveImage({ 
  src, 
  alt, 
  ...props 
}: { src: string; alt: string } & Omit<AnimatedImageProps, 'src' | 'alt' | 'effect'>) {
  return (
    <AnimatedImage
      {...props}
      src={src}
      alt={alt}
      effect="liquidDistortion"
      className={`interactive-image ${props.className || ''}`}
      config={{
        liquidDistortion: 0.3,
        duration: 200,
        ...props.config,
      }}
    />
  );
}

export function RevealImage({ 
  src, 
  alt, 
  maskType = 'circle',
  ...props 
}: { 
  src: string; 
  alt: string; 
  maskType?: 'circle' | 'rectangle' | 'wave' | 'custom';
} & Omit<AnimatedImageProps, 'src' | 'alt' | 'effect'>) {
  return (
    <AnimatedImage
      {...props}
      src={src}
      alt={alt}
      effect="maskReveal"
      className={`reveal-image ${props.className || ''}`}
      config={{
        maskType,
        duration: 1200,
        ...props.config,
      }}
    />
  );
}

export function BeforeAfterSlider({ 
  beforeSrc, 
  afterSrc, 
  beforeLabel = 'Before',
  afterLabel = 'After',
  ...props 
}: { 
  beforeSrc: string; 
  afterSrc: string; 
  beforeLabel?: string;
  afterLabel?: string;
} & Omit<ImageComparisonProps, 'beforeSrc' | 'afterSrc' | 'beforeLabel' | 'afterLabel'>) {
  return (
    <ImageComparison
      {...props}
      beforeSrc={beforeSrc}
      afterSrc={afterSrc}
      beforeLabel={beforeLabel}
      afterLabel={afterLabel}
      className={`before-after-slider ${props.className || ''}`}
    />
  );
}
