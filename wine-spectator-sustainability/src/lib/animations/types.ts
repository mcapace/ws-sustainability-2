// Core animation types and interfaces

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  stagger?: number;
  repeat?: number | 'infinite';
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
}

export interface TextAnimationConfig extends AnimationConfig {
  splitBy?: 'char' | 'word' | 'line';
  staggerDelay?: number;
  revealDelay?: number;
  waveIntensity?: number;
  glitchIntensity?: number;
  typewriterSpeed?: number;
  cursorBlinkSpeed?: number;
  trigger?: boolean;
}

export interface ImageAnimationConfig extends AnimationConfig {
  kenBurnsIntensity?: number;
  comparisonThreshold?: number;
  maskType?: 'circle' | 'rectangle' | 'wave' | 'custom';
  duotoneColors?: [string, string];
  liquidDistortion?: number;
  trigger?: boolean;
}

export interface ScrollAnimationConfig extends AnimationConfig {
  triggerPoint?: number; // 0-1, when animation should start
  endTriggerPoint?: number; // 0-1, when animation should end
  pin?: boolean;
  scrub?: boolean;
  velocityThreshold?: number;
  snapPoints?: number[];
  trigger?: boolean;
}

export interface TransitionConfig extends AnimationConfig {
  type?: 'fade' | 'curtain' | 'morph' | 'liquid' | 'slide' | 'scale';
  direction?: 'up' | 'down' | 'left' | 'right';
  curtainColor?: string;
  morphPath?: string;
  liquidIntensity?: number;
  trigger?: boolean;
}

export interface UtilityAnimationConfig extends AnimationConfig {
  counterFormat?: 'number' | 'currency' | 'percentage';
  progressType?: 'bar' | 'ring' | 'circular';
  skeletonVariant?: 'wave' | 'pulse' | 'shimmer';
  pulseIntensity?: number;
  magneticStrength?: number;
  magneticRadius?: number;
  trigger?: boolean;
}

// Animation states
export type AnimationState = 'idle' | 'running' | 'paused' | 'completed';

// Easing functions
export const EASING = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  back: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

export type EasingType = typeof EASING[keyof typeof EASING];

// Animation presets
export const PRESETS = {
  // Text presets
  text: {
    reveal: {
      duration: 1000,
      stagger: 50,
      easing: EASING.easeOut,
      splitBy: 'char' as const,
    },
    glitch: {
      duration: 300,
      repeat: 3,
      easing: EASING.linear,
      glitchIntensity: 0.5,
    },
    typewriter: {
      duration: 2000,
      typewriterSpeed: 100,
      cursorBlinkSpeed: 500,
      easing: EASING.linear,
    },
  },
  
  // Image presets
  image: {
    kenBurns: {
      duration: 10000,
      kenBurnsIntensity: 0.1,
      easing: EASING.linear,
    },
    duotone: {
      duration: 300,
      duotoneColors: ['#000000', '#d4af37'] as [string, string],
      easing: EASING.easeOut,
    },
  },
  
  // Scroll presets
  scroll: {
    fadeIn: {
      trigger: 0.2,
      duration: 800,
      easing: EASING.easeOut,
    },
    slideUp: {
      trigger: 0.3,
      duration: 1000,
      easing: EASING.easeOut,
    },
  },
  
  // Transition presets
  transition: {
    fade: {
      duration: 500,
      type: 'fade' as const,
      easing: EASING.easeInOut,
    },
    curtain: {
      duration: 800,
      type: 'curtain' as const,
      curtainColor: '#000000',
      easing: EASING.easeInOut,
    },
  },
  
  // Utility presets
  utility: {
    counter: {
      duration: 2000,
      easing: EASING.easeOut,
      counterFormat: 'number' as const,
    },
    progress: {
      duration: 1500,
      easing: EASING.easeOut,
      progressType: 'bar' as const,
    },
    skeleton: {
      duration: 1500,
      repeat: 'infinite' as const,
      skeletonVariant: 'wave' as const,
      easing: EASING.linear,
    },
  },
} as const;
