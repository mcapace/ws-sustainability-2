'use client';

import { ReactNode } from 'react';
import { 
  useStickySection, 
  useHorizontalScroll, 
  useScrollLinkedAnimation, 
  useVelocityAnimation, 
  useScrollSnapping, 
  useParallaxScroll,
  useRevealOnScroll
} from '@/hooks/useScrollAnimations';
import { ScrollAnimationConfig } from '@/lib/animations/types';

// Sticky Section Component
interface StickySectionProps {
  children: ReactNode;
  config?: Partial<ScrollAnimationConfig>;
  className?: string;
}

export function StickySection({ 
  children, 
  config, 
  className = '' 
}: StickySectionProps) {
  const { elementRef, isSticky, scrollProgress } = useStickySection(config);

  return (
    <div 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`sticky-section ${className}`}
      data-sticky={isSticky}
      data-progress={scrollProgress}
      style={{
        position: isSticky ? 'sticky' : 'relative',
        top: 0,
        zIndex: isSticky ? 10 : 'auto',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  );
}

// Horizontal Scroll Component
interface HorizontalScrollProps {
  children: ReactNode;
  config?: Partial<ScrollAnimationConfig>;
  className?: string;
}

export function HorizontalScroll({ 
  children, 
  config, 
  className = '' 
}: HorizontalScrollProps) {
  const { containerRef, contentRef, scrollProgress, isActive } = useHorizontalScroll(config);

  return (
    <div 
      ref={containerRef}
      className={`horizontal-scroll ${className}`}
      data-active={isActive}
      data-progress={scrollProgress}
      style={{
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <div 
        ref={contentRef}
        style={{
          display: 'flex',
          height: '100%',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Scroll Linked Animation Component
interface ScrollLinkedAnimationProps {
  children: ReactNode;
  config?: Partial<ScrollAnimationConfig>;
  className?: string;
}

export function ScrollLinkedAnimation({ 
  children, 
  config, 
  className = '' 
}: ScrollLinkedAnimationProps) {
  const { elementRef, animationProgress, isInView } = useScrollLinkedAnimation(config);

  return (
    <div 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`scroll-linked-animation ${className}`}
      data-in-view={isInView}
      data-progress={animationProgress}
      style={{
        opacity: animationProgress,
        transform: `translateY(${(1 - animationProgress) * 50}px)`,
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
      }}
    >
      {children}
    </div>
  );
}

// Velocity Animation Component
interface VelocityAnimationProps {
  children: ReactNode;
  config?: Partial<ScrollAnimationConfig>;
  className?: string;
}

export function VelocityAnimation({ 
  children, 
  config, 
  className = '' 
}: VelocityAnimationProps) {
  const { elementRef, velocity, isActive } = useVelocityAnimation(config);

  return (
    <div 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`velocity-animation ${className}`}
      data-active={isActive}
      data-velocity={velocity}
      style={{
        transform: isActive ? `scale(${1 + velocity * 0.1})` : 'scale(1)',
        filter: isActive ? `blur(${velocity * 0.5}px)` : 'blur(0px)',
        transition: 'transform 0.3s ease-out, filter 0.3s ease-out',
      }}
    >
      {children}
    </div>
  );
}

// Scroll Snapping Component
interface ScrollSnappingProps {
  children: ReactNode;
  snapPoints: number[];
  config?: Partial<ScrollAnimationConfig>;
  className?: string;
}

export function ScrollSnapping({ 
  children, 
  snapPoints, 
  config, 
  className = '' 
}: ScrollSnappingProps) {
  const { containerRef, currentSnapPoint, isSnapping, snapToPoint } = useScrollSnapping(snapPoints, config);

  return (
    <div className={`scroll-snapping-container ${className}`}>
      <div 
        ref={containerRef}
        style={{
          height: '100vh',
          overflow: 'auto',
          scrollSnapType: 'y mandatory',
        }}
      >
        {children}
      </div>
      
      {/* Snap Indicators */}
      <div
        style={{
          position: 'fixed',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 1000,
        }}
      >
        {snapPoints.map((_, index) => (
          <button
            key={index}
            onClick={() => snapToPoint(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: 'none',
              background: index === currentSnapPoint ? '#d4af37' : 'rgba(255,255,255,0.3)',
              cursor: 'pointer',
              transition: 'background 0.3s ease-out',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Parallax Scroll Component
interface ParallaxScrollProps {
  children: ReactNode;
  speed?: number;
  config?: Partial<ScrollAnimationConfig>;
  className?: string;
}

export function ParallaxScroll({ 
  children, 
  speed = 0.5, 
  config, 
  className = '' 
}: ParallaxScrollProps) {
  const { elementRef, translateY, isInView } = useParallaxScroll(speed, config);

  return (
    <div 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`parallax-scroll ${className}`}
      data-in-view={isInView}
      data-translate-y={translateY}
      style={{
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

// Reveal on Scroll Component
interface RevealOnScrollProps {
  children: ReactNode;
  config?: Partial<ScrollAnimationConfig>;
  className?: string;
}

export function RevealOnScroll({ 
  children, 
  config, 
  className = '' 
}: RevealOnScrollProps) {
  const { elementRef, isRevealed } = useRevealOnScroll(config);

  return (
    <div 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`reveal-on-scroll ${className}`}
      data-revealed={isRevealed}
      style={{
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? 'translateY(0)' : 'translateY(50px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}
    >
      {children}
    </div>
  );
}

// Combined Scroll Animation Component
interface ScrollAnimationProps {
  children: ReactNode;
  effect?: 'sticky' | 'horizontal' | 'linked' | 'velocity' | 'snapping' | 'parallax' | 'reveal';
  config?: Partial<ScrollAnimationConfig>;
  className?: string;
  snapPoints?: number[];
  speed?: number;
}

export function ScrollAnimation({ 
  children, 
  effect = 'reveal',
  config, 
  className = '', 
  snapPoints,
  speed
}: ScrollAnimationProps) {
  const baseProps = {
    config,
    className,
  };

  switch (effect) {
    case 'sticky':
      return <StickySection {...baseProps}>{children}</StickySection>;
    case 'horizontal':
      return <HorizontalScroll {...baseProps}>{children}</HorizontalScroll>;
    case 'linked':
      return <ScrollLinkedAnimation {...baseProps}>{children}</ScrollLinkedAnimation>;
    case 'velocity':
      return <VelocityAnimation {...baseProps}>{children}</VelocityAnimation>;
    case 'snapping':
      return snapPoints ? (
        <ScrollSnapping {...baseProps} snapPoints={snapPoints}>{children}</ScrollSnapping>
      ) : null;
    case 'parallax':
      return <ParallaxScroll {...baseProps} speed={speed}>{children}</ParallaxScroll>;
    case 'reveal':
    default:
      return <RevealOnScroll {...baseProps}>{children}</RevealOnScroll>;
  }
}

// Specialized Scroll Components
export function HeroSection({ 
  children, 
  ...props 
}: { children: ReactNode } & Omit<ScrollAnimationProps, 'children' | 'effect'>) {
  return (
    <ScrollAnimation
      {...props}
      effect="sticky"
      className={`hero-section ${props.className || ''}`}
      config={{
        pin: true,
        triggerPoint: 0,
        endTriggerPoint: 1,
        ...props.config,
      }}
    >
      {children}
    </ScrollAnimation>
  );
}

export function GallerySection({ 
  children, 
  ...props 
}: { children: ReactNode } & Omit<ScrollAnimationProps, 'children' | 'effect'>) {
  return (
    <ScrollAnimation
      {...props}
      effect="horizontal"
      className={`gallery-section ${props.className || ''}`}
      config={{
        triggerPoint: 0.2,
        endTriggerPoint: 0.8,
        ...props.config,
      }}
    >
      {children}
    </ScrollAnimation>
  );
}

export function AnimatedSection({ 
  children, 
  ...props 
}: { children: ReactNode } & Omit<ScrollAnimationProps, 'children' | 'effect'>) {
  return (
    <ScrollAnimation
      {...props}
      effect="linked"
      className={`animated-section ${props.className || ''}`}
      config={{
        triggerPoint: 0.3,
        endTriggerPoint: 0.7,
        scrub: true,
        ...props.config,
      }}
    >
      {children}
    </ScrollAnimation>
  );
}

export function ParallaxSection({ 
  children, 
  speed = 0.5,
  ...props 
}: { children: ReactNode; speed?: number } & Omit<ScrollAnimationProps, 'children' | 'effect' | 'speed'>) {
  return (
    <ScrollAnimation
      {...props}
      effect="parallax"
      speed={speed}
      className={`parallax-section ${props.className || ''}`}
      config={{
        triggerPoint: 0,
        endTriggerPoint: 1,
        ...props.config,
      }}
    >
      {children}
    </ScrollAnimation>
  );
}

export function SnapSection({ 
  children, 
  snapPoints,
  ...props 
}: { children: ReactNode; snapPoints: number[] } & Omit<ScrollAnimationProps, 'children' | 'effect' | 'snapPoints'>) {
  return (
    <ScrollAnimation
      {...props}
      effect="snapping"
      snapPoints={snapPoints}
      className={`snap-section ${props.className || ''}`}
      config={{
        duration: 800,
        ...props.config,
      }}
    >
      {children}
    </ScrollAnimation>
  );
}
