'use client';

import { ReactNode, useEffect } from 'react';
import { 
  useCounterAnimation, 
  useProgressAnimation, 
  useSkeletonAnimation, 
  usePulseAnimation, 
  useMagneticHover,
  useFloatingAnimation,
  useShakeAnimation
} from '@/hooks/useUtilityAnimations';
import { UtilityAnimationConfig } from '@/lib/animations/types';

// Counter Animation Component
interface CounterAnimationProps {
  targetValue: number;
  config?: Partial<UtilityAnimationConfig>;
  className?: string;
  format?: 'number' | 'currency' | 'percentage';
  prefix?: string;
  suffix?: string;
}

export function CounterAnimation({ 
  targetValue, 
  config, 
  className = '',
  format = 'number',
  prefix = '',
  suffix = ''
}: CounterAnimationProps) {
  const { currentValue, isAnimating, formattedValue } = useCounterAnimation(targetValue, {
    ...config,
    counterFormat: format
  });

  return (
    <span 
      className={`counter-animation ${className}`}
      data-animating={isAnimating}
      style={{
        display: 'inline-block',
        willChange: 'contents',
      }}
    >
      {prefix}{formattedValue}{suffix}
    </span>
  );
}

// Progress Bar Component
interface ProgressBarProps {
  progress: number;
  config?: Partial<UtilityAnimationConfig>;
  className?: string;
  showLabel?: boolean;
  label?: string;
}

export function ProgressBar({ 
  progress, 
  config, 
  className = '',
  showLabel = false,
  label
}: ProgressBarProps) {
  const { elementRef, animatedProgress } = useProgressAnimation(progress, {
    ...config,
    progressType: 'bar'
  });

  return (
    <div className={`progress-bar-container ${className}`}>
      {showLabel && (
        <div className="progress-label">
          {label || `${Math.round(animatedProgress)}%`}
        </div>
      )}
      <div 
        ref={elementRef}
        className="progress-bar"
        style={{
          width: '100%',
          height: '8px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          className="progress-fill"
          style={{
            height: '100%',
            width: `var(--progress, ${animatedProgress}%)`,
            background: 'linear-gradient(90deg, #d4af37, #ffd700)',
            borderRadius: '4px',
            transition: 'width 0.3s ease-out',
          }}
        />
      </div>
    </div>
  );
}

// Progress Ring Component
interface ProgressRingProps {
  progress: number;
  config?: Partial<UtilityAnimationConfig>;
  className?: string;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  label?: string;
}

export function ProgressRing({ 
  progress, 
  config, 
  className = '',
  size = 100,
  strokeWidth = 8,
  showLabel = false,
  label
}: ProgressRingProps) {
  const { elementRef, animatedProgress } = useProgressAnimation(progress, {
    ...config,
    progressType: 'ring'
  });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className={`progress-ring-container ${className}`} style={{ position: 'relative', width: size, height: size }}>
      <svg
        ref={elementRef}
        width={size}
        height={size}
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={`var(--stroke-dashoffset, ${circumference})`}
          style={{
            transition: 'stroke-dashoffset 0.3s ease-out',
          }}
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#ffd700" />
          </linearGradient>
        </defs>
      </svg>
      
      {showLabel && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: '#d4af37',
            fontWeight: 'bold',
          }}
        >
          {label || `${Math.round(animatedProgress)}%`}
        </div>
      )}
    </div>
  );
}

// Skeleton Screen Component
interface SkeletonScreenProps {
  config?: Partial<UtilityAnimationConfig>;
  className?: string;
  variant?: 'wave' | 'pulse' | 'shimmer';
  width?: string | number;
  height?: string | number;
  shape?: 'rect' | 'circle';
}

export function SkeletonScreen({ 
  config, 
  className = '',
  variant = 'wave',
  width = '100%',
  height = '20px',
  shape = 'rect'
}: SkeletonScreenProps) {
  const { elementRef, isAnimating } = useSkeletonAnimation({
    ...config,
    skeletonVariant: variant
  });

  const shapeStyles = {
    rect: {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      borderRadius: '4px',
    },
    circle: {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      borderRadius: '50%',
    },
  };

  return (
    <div 
      ref={elementRef}
      className={`skeleton-screen ${className}`}
      data-animating={isAnimating}
      data-variant={variant}
      style={{
        ...shapeStyles[shape],
        backgroundColor: '#f0f0f0',
        willChange: variant === 'wave' || variant === 'shimmer' ? 'background-position' : 'opacity',
      }}
    />
  );
}

// Pulse Animation Component
interface PulseAnimationProps {
  children: ReactNode;
  config?: Partial<UtilityAnimationConfig>;
  className?: string;
  trigger?: boolean;
}

export function PulseAnimation({ 
  children, 
  config, 
  className = '',
  trigger = true
}: PulseAnimationProps) {
  const { elementRef, isPulsing } = usePulseAnimation(config);

  useEffect(() => {
    if (!trigger) {
      stopPulse();
    }
  }, [trigger]);

  return (
    <div 
      ref={elementRef}
      className={`pulse-animation ${className}`}
      data-pulsing={isPulsing}
      style={{
        display: 'inline-block',
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}

// Magnetic Hover Component
interface MagneticHoverProps {
  children: ReactNode;
  config?: Partial<UtilityAnimationConfig>;
  className?: string;
  trigger?: boolean;
}

export function MagneticHover({ 
  children, 
  config, 
  className = '',
  trigger = true
}: MagneticHoverProps) {
  const { elementRef, isHovered, magneticOffset } = useMagneticHover(config);

  if (!trigger) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div 
      ref={elementRef}
      className={`magnetic-hover ${className}`}
      data-hovered={isHovered}
      style={{
        display: 'inline-block',
        cursor: 'pointer',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

// Floating Animation Component
interface FloatingAnimationProps {
  children: ReactNode;
  config?: Partial<UtilityAnimationConfig>;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  trigger?: boolean;
}

export function FloatingAnimation({ 
  children, 
  config, 
  className = '',
  direction = 'up',
  trigger = true
}: FloatingAnimationProps) {
  const { elementRef, isFloating } = useFloatingAnimation({
    ...config,
    direction
  });

  if (!trigger) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div 
      ref={elementRef}
      className={`floating-animation ${className}`}
      data-floating={isFloating}
      data-direction={direction}
      style={{
        display: 'inline-block',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

// Shake Animation Component
interface ShakeAnimationProps {
  children: ReactNode;
  config?: Partial<UtilityAnimationConfig>;
  className?: string;
  trigger?: boolean;
}

export function ShakeAnimation({ 
  children, 
  config, 
  className = '',
  trigger = false
}: ShakeAnimationProps) {
  const { elementRef, isShaking, startShake } = useShakeAnimation(config);

  useEffect(() => {
    if (trigger) {
      startShake();
    }
  }, [trigger, startShake]);

  return (
    <div 
      ref={elementRef}
      className={`shake-animation ${className}`}
      data-shaking={isShaking}
      style={{
        display: 'inline-block',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

// Combined Utility Animation Component
interface UtilityAnimationProps {
  children?: ReactNode;
  type?: 'counter' | 'progress' | 'skeleton' | 'pulse' | 'magnetic' | 'floating' | 'shake';
  config?: Partial<UtilityAnimationConfig>;
  className?: string;
  trigger?: boolean;
  
  // Counter specific
  targetValue?: number;
  format?: 'number' | 'currency' | 'percentage';
  prefix?: string;
  suffix?: string;
  
  // Progress specific
  progress?: number;
  showLabel?: boolean;
  label?: string;
  
  // Skeleton specific
  variant?: 'wave' | 'pulse' | 'shimmer';
  width?: string | number;
  height?: string | number;
  shape?: 'rect' | 'circle';
  
  // Floating specific
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function UtilityAnimation({ 
  children,
  type = 'pulse',
  config, 
  className = '', 
  trigger = true,
  targetValue,
  format,
  prefix,
  suffix,
  progress,
  showLabel,
  label,
  variant,
  width,
  height,
  shape,
  direction
}: UtilityAnimationProps) {
  const baseProps = {
    config,
    className,
  };

  switch (type) {
    case 'counter':
      return (
        <CounterAnimation
          {...baseProps}
          targetValue={targetValue || 0}
          format={format}
          prefix={prefix}
          suffix={suffix}
        />
      );
    case 'progress':
      return (
        <ProgressBar
          {...baseProps}
          progress={progress || 0}
          showLabel={showLabel}
          label={label}
        />
      );
    case 'skeleton':
      return (
        <SkeletonScreen
          {...baseProps}
          variant={variant}
          width={width}
          height={height}
          shape={shape}
        />
      );
    case 'pulse':
      return (
        <PulseAnimation
          {...baseProps}
          trigger={trigger}
        >
          {children}
        </PulseAnimation>
      );
    case 'magnetic':
      return (
        <MagneticHover
          {...baseProps}
          trigger={trigger}
        >
          {children}
        </MagneticHover>
      );
    case 'floating':
      return (
        <FloatingAnimation
          {...baseProps}
          direction={direction}
          trigger={trigger}
        >
          {children}
        </FloatingAnimation>
      );
    case 'shake':
      return (
        <ShakeAnimation
          {...baseProps}
          trigger={trigger}
        >
          {children}
        </ShakeAnimation>
      );
    default:
      return <div className={className}>{children}</div>;
  }
}

// Specialized Utility Components
export function PriceCounter({ 
  value, 
  currency = '$',
  ...props 
}: { value: number; currency?: string } & Omit<UtilityAnimationProps, 'type' | 'targetValue' | 'format'>) {
  return (
    <UtilityAnimation
      {...props}
      type="counter"
      targetValue={value}
      format="currency"
      className={`price-counter ${props.className || ''}`}
      config={{
        duration: 2000,
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        ...props.config,
      }}
    />
  );
}

export function LoadingSkeleton({ 
  lines = 3,
  ...props 
}: { lines?: number } & Omit<UtilityAnimationProps, 'type' | 'children'>) {
  return (
    <div className={`loading-skeleton ${props.className || ''}`}>
      {Array.from({ length: lines }, (_, i) => (
        <UtilityAnimation
          key={i}
          {...props}
          type="skeleton"
          variant="wave"
          width="100%"
          height={i === lines - 1 ? '60%' : '20px'}
          shape="rect"
          config={{
            duration: 1500,
            repeat: 'infinite',
            ...props.config,
          }}
        />
      ))}
    </div>
  );
}

export function MagneticButton({ 
  children,
  ...props 
}: { children: ReactNode } & Omit<UtilityAnimationProps, 'type' | 'children'>) {
  return (
    <UtilityAnimation
      {...props}
      type="magnetic"
      className={`magnetic-button ${props.className || ''}`}
      config={{
        magneticStrength: 0.3,
        magneticRadius: 100,
        duration: 200,
        ...props.config,
      }}
    >
      {children}
    </UtilityAnimation>
  );
}

export function FloatingIcon({ 
  children,
  ...props 
}: { children: ReactNode } & Omit<UtilityAnimationProps, 'type' | 'children'>) {
  return (
    <UtilityAnimation
      {...props}
      type="floating"
      direction="up"
      className={`floating-icon ${props.className || ''}`}
      config={{
        duration: 3000,
        easing: 'ease-in-out',
        repeat: 'infinite',
        ...props.config,
      }}
    >
      {children}
    </UtilityAnimation>
  );
}

export function ErrorShake({ 
  children,
  hasError = false,
  ...props 
}: { children: ReactNode; hasError?: boolean } & Omit<UtilityAnimationProps, 'type' | 'children' | 'trigger'>) {
  return (
    <UtilityAnimation
      {...props}
      type="shake"
      trigger={hasError}
      className={`error-shake ${props.className || ''}`}
      config={{
        duration: 500,
        intensity: 10,
        ...props.config,
      }}
    >
      {children}
    </UtilityAnimation>
  );
}
