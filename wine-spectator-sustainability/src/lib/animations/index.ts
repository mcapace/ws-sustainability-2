// Custom Animation Library - Main Export
// A comprehensive animation library with reusable hooks and components

// Types and configurations
export * from './types';
export * from './utils';

// Text Animation Hooks
export {
  useLetterReveal,
  useGlitchEffect,
  useTypewriter,
  useTextMorphing,
  useText3DDepth,
} from '@/hooks/useTextAnimations';

// Text Animation Components
export {
  LetterReveal,
  GlitchEffect,
  Typewriter,
  TextMorphing,
  Text3DDepth,
  AnimatedText,
  HeroTitle,
  GlitchTitle,
  TypewriterSubtitle,
  MorphingTagline,
  InteractiveText,
} from '@/components/animations/TextEffects';

// Image Animation Hooks
export {
  useKenBurnsEffect,
  useImageComparison,
  useMaskReveal,
  useDuotoneEffect,
  useLiquidDistortion,
} from '@/hooks/useImageAnimations';

// Image Animation Components
export {
  KenBurns,
  ImageComparison,
  MaskReveal,
  DuotoneEffect,
  LiquidDistortion,
  AnimatedImage,
  HeroImage,
  GalleryImage,
  InteractiveImage,
  RevealImage,
  BeforeAfterSlider,
} from '@/components/animations/ImageEffects';

// Scroll Animation Hooks
export {
  useStickySection,
  useHorizontalScroll,
  useScrollLinkedAnimation,
  useVelocityAnimation,
  useScrollSnapping,
  useParallaxScroll,
  useRevealOnScroll,
} from '@/hooks/useScrollAnimations';

// Scroll Animation Components
export {
  StickySection,
  HorizontalScroll,
  ScrollLinkedAnimation,
  VelocityAnimation,
  ScrollSnapping,
  ParallaxScroll,
  RevealOnScroll,
  ScrollAnimation,
  HeroSection,
  GallerySection,
  AnimatedSection,
  ParallaxSection,
  SnapSection,
} from '@/components/animations/ScrollEffects';

// Page Transition Hooks
export {
  useFadeTransition,
  useCurtainTransition,
  useMorphTransition,
  useLiquidTransition,
  useSlideTransition,
  useScaleTransition,
} from '@/hooks/usePageTransitions';

// Page Transition Components
export {
  FadeTransition,
  CurtainTransition,
  MorphTransition,
  LiquidTransition,
  SlideTransition,
  ScaleTransition,
  PageTransition,
  ModalTransition,
  StandardPageTransition,
  HeroTransition,
  GalleryTransition,
  SectionTransition,
  TransitionProvider,
  useTransitionManager,
} from '@/components/animations/PageTransitions';

// Utility Animation Hooks
export {
  useCounterAnimation,
  useProgressAnimation,
  useSkeletonAnimation,
  usePulseAnimation,
  useMagneticHover,
  useFloatingAnimation,
  useShakeAnimation,
} from '@/hooks/useUtilityAnimations';

// Utility Animation Components
export {
  CounterAnimation,
  ProgressBar,
  ProgressRing,
  SkeletonScreen,
  PulseAnimation,
  MagneticHover,
  FloatingAnimation,
  ShakeAnimation,
  UtilityAnimation,
  PriceCounter,
  LoadingSkeleton,
  MagneticButton,
  FloatingIcon,
  ErrorShake,
} from '@/components/animations/UtilityAnimations';

// Animation Library Info
export const ANIMATION_LIBRARY_INFO = {
  name: 'Luxury Animation Library',
  version: '1.0.0',
  description: 'A comprehensive animation library for luxury web experiences',
  features: [
    'Text Effects: Letter reveal, glitch, typewriter, morphing, 3D depth',
    'Image Effects: Ken Burns, comparison slider, masks, duotone, liquid distortion',
    'Scroll Triggers: Sticky sections, horizontal scroll, velocity effects',
    'Page Transitions: Fade, curtain, morph, liquid transitions',
    'Utility Animations: Counters, progress, skeleton, pulse, magnetic hover',
    'Performance Optimized: Hardware acceleration, reduced motion support',
    'Accessibility: Screen reader support, keyboard navigation',
    'TypeScript: Full type safety and IntelliSense support',
  ],
  usage: {
    basic: `
import { AnimatedText, KenBurns, ScrollAnimation } from '@/lib/animations';

// Text animations
<AnimatedText text="Hello World" effect="reveal" />

// Image animations  
<KenBurns src="/image.jpg" alt="Hero" />

// Scroll animations
<ScrollAnimation effect="sticky">
  <div>Sticky content</div>
</ScrollAnimation>
    `,
    advanced: `
import { 
  useLetterReveal, 
  useKenBurnsEffect, 
  useCounterAnimation 
} from '@/lib/animations';

// Custom hook usage
const { elementRef, isAnimating } = useLetterReveal(text, {
  duration: 1000,
  stagger: 50,
  waveIntensity: 0.8
});

const { currentValue, formattedValue } = useCounterAnimation(1000, {
  duration: 2000,
  counterFormat: 'currency'
});
    `,
  },
  presets: {
    luxury: {
      text: { duration: 1500, stagger: 100, waveIntensity: 0.8 },
      image: { kenBurnsIntensity: 0.2, duration: 15000 },
      scroll: { duration: 800, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
      transition: { duration: 800, easing: 'ease-in-out' },
      utility: { duration: 2000, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
    },
    fast: {
      text: { duration: 500, stagger: 25, waveIntensity: 0.5 },
      image: { kenBurnsIntensity: 0.1, duration: 5000 },
      scroll: { duration: 300, easing: 'ease-out' },
      transition: { duration: 300, easing: 'ease-out' },
      utility: { duration: 1000, easing: 'ease-out' },
    },
    smooth: {
      text: { duration: 2000, stagger: 150, waveIntensity: 1.0 },
      image: { kenBurnsIntensity: 0.3, duration: 20000 },
      scroll: { duration: 1200, easing: 'ease-in-out' },
      transition: { duration: 1000, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
      utility: { duration: 3000, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    },
  },
} as const;
