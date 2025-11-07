'use client';

import { ReactNode, useEffect, useState, useCallback } from 'react';
import { 
  useFadeTransition, 
  useCurtainTransition, 
  useMorphTransition, 
  useLiquidTransition,
  useSlideTransition,
  useScaleTransition
} from '@/hooks/usePageTransitions';
import { TransitionConfig } from '@/lib/animations/types';

// Fade Transition Component
interface FadeTransitionProps {
  children: ReactNode;
  config?: Partial<TransitionConfig>;
  className?: string;
  isVisible?: boolean;
  onTransitionComplete?: () => void;
}

export function FadeTransition({ 
  children, 
  config, 
  className = '',
  isVisible = true,
  onTransitionComplete
}: FadeTransitionProps) {
  const { elementRef, isTransitioning, transitionIn, transitionOut } = useFadeTransition(config);

  useEffect(() => {
    if (isVisible) {
      transitionIn().then(() => {
        onTransitionComplete?.();
      });
    } else {
      transitionOut().then(() => {
        onTransitionComplete?.();
      });
    }
  }, [isVisible, transitionIn, transitionOut, onTransitionComplete]);

  return (
    <div 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`fade-transition ${className}`}
      data-transitioning={isTransitioning}
      style={{
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

// Curtain Transition Component
interface CurtainTransitionProps {
  children: ReactNode;
  config?: Partial<TransitionConfig>;
  className?: string;
  isVisible?: boolean;
  onTransitionComplete?: () => void;
}

export function CurtainTransition({ 
  children, 
  config, 
  className = '',
  isVisible = true,
  onTransitionComplete
}: CurtainTransitionProps) {
  const { elementRef, curtainRef, isTransitioning, transitionIn, transitionOut } = useCurtainTransition(config);

  useEffect(() => {
    if (isVisible) {
      transitionIn().then(() => {
        onTransitionComplete?.();
      });
    } else {
      transitionOut().then(() => {
        onTransitionComplete?.();
      });
    }
  }, [isVisible, transitionIn, transitionOut, onTransitionComplete]);

  return (
    <div className={`curtain-transition ${className}`} style={{ position: 'relative', overflow: 'hidden' }}>
      <div 
        ref={elementRef as React.RefObject<HTMLDivElement>}
        data-transitioning={isTransitioning}
        style={{
          willChange: 'opacity, transform',
        }}
      >
        {children}
      </div>
      
      {/* Curtain overlay */}
      <div
        ref={curtainRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

// Morph Transition Component
interface MorphTransitionProps {
  children: ReactNode;
  config?: Partial<TransitionConfig>;
  className?: string;
  isVisible?: boolean;
  onTransitionComplete?: () => void;
}

export function MorphTransition({ 
  children, 
  config, 
  className = '',
  isVisible = true,
  onTransitionComplete
}: MorphTransitionProps) {
  const { elementRef, isTransitioning, transitionIn, transitionOut } = useMorphTransition(config);

  useEffect(() => {
    if (isVisible) {
      transitionIn().then(() => {
        onTransitionComplete?.();
      });
    } else {
      transitionOut().then(() => {
        onTransitionComplete?.();
      });
    }
  }, [isVisible, transitionIn, transitionOut, onTransitionComplete]);

  return (
    <div 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`morph-transition ${className}`}
      data-transitioning={isTransitioning}
      style={{
        willChange: 'clip-path, opacity',
      }}
    >
      {children}
    </div>
  );
}

// Liquid Transition Component
interface LiquidTransitionProps {
  children: ReactNode;
  config?: Partial<TransitionConfig>;
  className?: string;
  isVisible?: boolean;
  onTransitionComplete?: () => void;
}

export function LiquidTransition({ 
  children, 
  config, 
  className = '',
  isVisible = true,
  onTransitionComplete
}: LiquidTransitionProps) {
  const { elementRef, isTransitioning, transitionIn, transitionOut } = useLiquidTransition(config);

  useEffect(() => {
    if (isVisible) {
      transitionIn().then(() => {
        onTransitionComplete?.();
      });
    } else {
      transitionOut().then(() => {
        onTransitionComplete?.();
      });
    }
  }, [isVisible, transitionIn, transitionOut, onTransitionComplete]);

  return (
    <div 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`liquid-transition ${className}`}
      data-transitioning={isTransitioning}
      style={{
        willChange: 'border-radius, transform, opacity',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}

// Slide Transition Component
interface SlideTransitionProps {
  children: ReactNode;
  config?: Partial<TransitionConfig>;
  className?: string;
  isVisible?: boolean;
  direction?: 'left' | 'right' | 'up' | 'down';
  onTransitionComplete?: () => void;
}

export function SlideTransition({ 
  children, 
  config, 
  className = '',
  isVisible = true,
  direction = 'right',
  onTransitionComplete
}: SlideTransitionProps) {
  const { elementRef, isTransitioning, transitionIn, transitionOut } = useSlideTransition({
    ...config,
    direction
  });

  useEffect(() => {
    if (isVisible) {
      transitionIn().then(() => {
        onTransitionComplete?.();
      });
    } else {
      transitionOut().then(() => {
        onTransitionComplete?.();
      });
    }
  }, [isVisible, transitionIn, transitionOut, onTransitionComplete]);

  return (
    <div 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`slide-transition ${className}`}
      data-transitioning={isTransitioning}
      data-direction={direction}
      style={{
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}

// Scale Transition Component
interface ScaleTransitionProps {
  children: ReactNode;
  config?: Partial<TransitionConfig>;
  className?: string;
  isVisible?: boolean;
  onTransitionComplete?: () => void;
}

export function ScaleTransition({ 
  children, 
  config, 
  className = '',
  isVisible = true,
  onTransitionComplete
}: ScaleTransitionProps) {
  const { elementRef, isTransitioning, transitionIn, transitionOut } = useScaleTransition(config);

  useEffect(() => {
    if (isVisible) {
      transitionIn().then(() => {
        onTransitionComplete?.();
      });
    } else {
      transitionOut().then(() => {
        onTransitionComplete?.();
      });
    }
  }, [isVisible, transitionIn, transitionOut, onTransitionComplete]);

  return (
    <div 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`scale-transition ${className}`}
      data-transitioning={isTransitioning}
      style={{
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}

// Combined Page Transition Component
interface PageTransitionProps {
  children: ReactNode;
  type?: 'fade' | 'curtain' | 'morph' | 'liquid' | 'slide' | 'scale';
  config?: Partial<TransitionConfig>;
  className?: string;
  isVisible?: boolean;
  direction?: 'left' | 'right' | 'up' | 'down';
  onTransitionComplete?: () => void;
}

export function PageTransition({ 
  children, 
  type = 'fade',
  config, 
  className = '', 
  isVisible = true,
  direction,
  onTransitionComplete
}: PageTransitionProps) {
  const baseProps = {
    config,
    className,
    isVisible,
    onTransitionComplete,
  };

  switch (type) {
    case 'curtain':
      return <CurtainTransition {...baseProps}>{children}</CurtainTransition>;
    case 'morph':
      return <MorphTransition {...baseProps}>{children}</MorphTransition>;
    case 'liquid':
      return <LiquidTransition {...baseProps}>{children}</LiquidTransition>;
    case 'slide':
      return <SlideTransition {...baseProps} direction={direction}>{children}</SlideTransition>;
    case 'scale':
      return <ScaleTransition {...baseProps}>{children}</ScaleTransition>;
    case 'fade':
    default:
      return <FadeTransition {...baseProps}>{children}</FadeTransition>;
  }
}

// Specialized Transition Components
export function ModalTransition({ 
  children, 
  ...props 
}: { children: ReactNode } & Omit<PageTransitionProps, 'children' | 'type'>) {
  return (
    <PageTransition
      {...props}
      type="scale"
      className={`modal-transition ${props.className || ''}`}
      config={{
        duration: 300,
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        ...props.config,
      }}
    >
      {children}
    </PageTransition>
  );
}

export function StandardPageTransition({ 
  children, 
  ...props 
}: { children: ReactNode } & Omit<PageTransitionProps, 'children' | 'type'>) {
  return (
    <PageTransition
      {...props}
      type="fade"
      className={`standard-page-transition ${props.className || ''}`}
      config={{
        duration: 500,
        easing: 'ease-in-out',
        ...props.config,
      }}
    >
      {children}
    </PageTransition>
  );
}

export function HeroTransition({ 
  children, 
  ...props 
}: { children: ReactNode } & Omit<PageTransitionProps, 'children' | 'type'>) {
  return (
    <PageTransition
      {...props}
      type="curtain"
      className={`hero-transition ${props.className || ''}`}
      config={{
        duration: 800,
        curtainColor: '#000000',
        easing: 'ease-in-out',
        ...props.config,
      }}
    >
      {children}
    </PageTransition>
  );
}

export function GalleryTransition({ 
  children, 
  ...props 
}: { children: ReactNode } & Omit<PageTransitionProps, 'children' | 'type'>) {
  return (
    <PageTransition
      {...props}
      type="liquid"
      className={`gallery-transition ${props.className || ''}`}
      config={{
        duration: 1000,
        liquidIntensity: 0.3,
        easing: 'ease-out',
        ...props.config,
      }}
    >
      {children}
    </PageTransition>
  );
}

export function SectionTransition({ 
  children, 
  direction = 'up',
  ...props 
}: { children: ReactNode; direction?: 'left' | 'right' | 'up' | 'down' } & Omit<PageTransitionProps, 'children' | 'type' | 'direction'>) {
  return (
    <PageTransition
      {...props}
      type="slide"
      direction={direction}
      className={`section-transition ${props.className || ''}`}
      config={{
        duration: 600,
        easing: 'ease-out',
        ...props.config,
      }}
    >
      {children}
    </PageTransition>
  );
}

// Transition Provider for managing global transitions
interface TransitionProviderProps {
  children: ReactNode;
  defaultTransition?: PageTransitionProps['type'];
  defaultConfig?: Partial<TransitionConfig>;
}

export function TransitionProvider({ 
  children, 
  defaultTransition = 'fade',
  defaultConfig = {}
}: TransitionProviderProps) {
  return (
    <div className="transition-provider" data-default-transition={defaultTransition}>
      {children}
    </div>
  );
}

// Transition Manager Hook
export function useTransitionManager() {
  const [currentTransition, setCurrentTransition] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = useCallback((transitionId: string, type: PageTransitionProps['type'] = 'fade') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentTransition(transitionId);
    
    // Transition logic would go here
    // This is a simplified version
    
    setTimeout(() => {
      setIsTransitioning(false);
      setCurrentTransition(null);
    }, 500);
  }, [isTransitioning]);

  const endTransition = useCallback(() => {
    setIsTransitioning(false);
    setCurrentTransition(null);
  }, []);

  return {
    currentTransition,
    isTransitioning,
    startTransition,
    endTransition,
  };
}
