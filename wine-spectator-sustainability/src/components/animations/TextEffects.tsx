'use client';

import React, { ReactNode } from 'react';
import { 
  useLetterReveal, 
  useGlitchEffect, 
  useTypewriter, 
  useTextMorphing, 
  useText3DDepth 
} from '@/hooks/useTextAnimations';
import { TextAnimationConfig } from '@/lib/animations/types';

// Letter Reveal Component
interface LetterRevealProps {
  text: string;
  config?: Partial<TextAnimationConfig>;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  trigger?: boolean;
}

export function LetterReveal({ 
  text, 
  config, 
  className = '', 
  as: Component = 'div',
  trigger = true 
}: LetterRevealProps) {
  const { elementRef, isAnimating } = useLetterReveal(text, { ...config, trigger });

  return (
    <Component 
      ref={elementRef as any} 
      className={`letter-reveal ${className}`}
      data-animating={isAnimating}
    />
  );
}

// Glitch Effect Component
interface GlitchEffectProps {
  text: string;
  config?: Partial<TextAnimationConfig>;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  trigger?: boolean;
  children?: ReactNode;
}

export function GlitchEffect({ 
  text, 
  config, 
  className = '', 
  as: Component = 'span',
  trigger = true,
  children 
}: GlitchEffectProps) {
  const { elementRef, isGlitching } = useGlitchEffect(text, { ...config, trigger });

  return (
    <Component 
      ref={elementRef as any} 
      className={`glitch-effect ${className}`}
      data-glitching={isGlitching}
      style={{
        position: 'relative',
        display: 'inline-block',
      }}
    >
      {children || text}
    </Component>
  );
}

// Typewriter Component
interface TypewriterProps {
  text: string;
  config?: Partial<TextAnimationConfig>;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  trigger?: boolean;
}

export function Typewriter({ 
  text, 
  config, 
  className = '', 
  as: Component = 'span',
  trigger = true 
}: TypewriterProps) {
  const { elementRef, isTyping, displayedText } = useTypewriter(text, { ...config, trigger });

  return (
    <Component 
      ref={elementRef as any} 
      className={`typewriter ${className}`}
      data-typing={isTyping}
      style={{
        fontFamily: 'monospace',
        whiteSpace: 'pre',
      }}
    >
      {displayedText}
    </Component>
  );
}

// Text Morphing Component
interface TextMorphingProps {
  texts: string[];
  config?: Partial<TextAnimationConfig>;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  trigger?: boolean;
}

export function TextMorphing({ 
  texts, 
  config, 
  className = '', 
  as: Component = 'span',
  trigger = true 
}: TextMorphingProps) {
  const { elementRef, currentIndex, isMorphing } = useTextMorphing(texts, { ...config, trigger });

  return (
    <Component 
      ref={elementRef as any} 
      className={`text-morphing ${className}`}
      data-morphing={isMorphing}
      data-current-index={currentIndex}
      style={{
        display: 'inline-block',
        transition: 'all 0.3s ease-out',
      }}
    />
  );
}

// 3D Text Depth Component
interface Text3DDepthProps {
  text: string;
  config?: Partial<TextAnimationConfig>;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  trigger?: boolean;
}

export function Text3DDepth({ 
  text, 
  config, 
  className = '', 
  as: Component = 'span',
  trigger = true 
}: Text3DDepthProps) {
  const { elementRef, isActive } = useText3DDepth(text, { ...config, trigger });

  return (
    <Component 
      ref={elementRef as any} 
      className={`text-3d-depth ${className}`}
      data-active={isActive}
      style={{
        display: 'inline-block',
        cursor: 'pointer',
        transformStyle: 'preserve-3d',
      }}
    />
  );
}

// Combined Text Animation Component
interface AnimatedTextProps {
  text: string;
  effect?: 'reveal' | 'glitch' | 'typewriter' | 'morphing' | '3d';
  config?: Partial<TextAnimationConfig>;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  trigger?: boolean;
  texts?: string[]; // For morphing effect
}

export function AnimatedText({ 
  text, 
  effect = 'reveal',
  config, 
  className = '', 
  as: Component = 'div',
  trigger = true,
  texts 
}: AnimatedTextProps) {
  const baseProps = {
    config,
    className,
    as: Component,
    trigger,
  };

  switch (effect) {
    case 'glitch':
      return <GlitchEffect {...baseProps} text={text} />;
    case 'typewriter':
      return <Typewriter {...baseProps} text={text} />;
    case 'morphing':
      return <TextMorphing {...baseProps} texts={texts || [text]} />;
    case '3d':
      return <Text3DDepth {...baseProps} text={text} />;
    case 'reveal':
    default:
      return <LetterReveal {...baseProps} text={text} />;
  }
}

// Text Animation Preset Components
export function HeroTitle({ children, ...props }: { children: React.ReactNode } & Omit<AnimatedTextProps, 'text'>) {
  return (
    <AnimatedText
      {...props}
      effect="reveal"
      className={`text-4xl md:text-6xl font-bold ${props.className || ''}`}
      config={{
        duration: 1500,
        stagger: 100,
        waveIntensity: 0.8,
        ...props.config,
      }}
      as="h1"
    >
      {children}
    </AnimatedText>
  );
}

export function GlitchTitle({ children, ...props }: { children: React.ReactNode } & Omit<AnimatedTextProps, 'text'>) {
  return (
    <GlitchEffect
      {...props}
      className={`text-2xl md:text-4xl font-bold text-cigar-gold ${props.className || ''}`}
      config={{
        duration: 500,
        repeat: 2,
        glitchIntensity: 0.7,
        ...props.config,
      }}
      as="h2"
    >
      {children}
    </GlitchEffect>
  );
}

export function TypewriterSubtitle({ children, ...props }: { children: React.ReactNode } & Omit<AnimatedTextProps, 'text'>) {
  return (
    <Typewriter
      {...props}
      className={`text-lg md:text-xl text-luxury-cream/80 ${props.className || ''}`}
      config={{
        typewriterSpeed: 80,
        cursorBlinkSpeed: 600,
        ...props.config,
      }}
      as="p"
    >
      {children}
    </Typewriter>
  );
}

export function MorphingTagline({ texts, ...props }: { texts: string[] } & Omit<AnimatedTextProps, 'text' | 'effect'>) {
  return (
    <TextMorphing
      {...props}
      texts={texts}
      className={`text-xl md:text-2xl font-medium text-cigar-gold ${props.className || ''}`}
      config={{
        duration: 800,
        delay: 3000,
        ...props.config,
      }}
      as="h3"
    />
  );
}

export function InteractiveText({ children, ...props }: { children: React.ReactNode } & Omit<AnimatedTextProps, 'text'>) {
  return (
    <Text3DDepth
      {...props}
      className={`text-lg font-medium cursor-pointer ${props.className || ''}`}
      config={{
        duration: 200,
        ...props.config,
      }}
      as="span"
    >
      {children}
    </Text3DDepth>
  );
}
