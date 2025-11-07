'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import {
  // Text Effects
  HeroTitle,
  GlitchTitle,
  TypewriterSubtitle,
  MorphingTagline,
  InteractiveText,
  LetterReveal,
  GlitchEffect,
  Typewriter,
  TextMorphing,
  Text3DDepth,
  
  // Image Effects
  HeroImage,
  GalleryImage,
  InteractiveImage,
  RevealImage,
  BeforeAfterSlider,
  KenBurns,
  ImageComparison,
  MaskReveal,
  DuotoneEffect,
  LiquidDistortion,
  
  // Scroll Effects
  HeroSection,
  GallerySection,
  AnimatedSection,
  ParallaxSection,
  StickySection,
  HorizontalScroll,
  ScrollLinkedAnimation,
  VelocityAnimation,
  ParallaxScroll,
  RevealOnScroll,
  
  // Page Transitions
  FadeTransition,
  CurtainTransition,
  MorphTransition,
  LiquidTransition,
  SlideTransition,
  ScaleTransition,
  ModalTransition,
  HeroTransition,
  GalleryTransition,
  SectionTransition,
  
  // Utility Animations
  PriceCounter,
  LoadingSkeleton,
  MagneticButton,
  FloatingIcon,
  ErrorShake,
  CounterAnimation,
  ProgressBar,
  ProgressRing,
  SkeletonScreen,
  PulseAnimation,
  MagneticHover,
  FloatingAnimation,
  ShakeAnimation,
  
  // Presets
  PRESETS,
  ANIMATION_LIBRARY_INFO,
} from '@/lib/animations';

export default function AnimationShowcase() {
  const [showModal, setShowModal] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [triggerShake, setTriggerShake] = useState(false);

  const morphingTexts = [
    'Luxury Cigar Lounge',
    'Premium Experience',
    'Exclusive Venue',
    'Sophisticated Atmosphere'
  ];

  return (
    <div className="min-h-screen bg-luxury-black text-luxury-cream">
      {/* Hero Section with Text Effects */}
      <HeroSection>
        <div className="text-center space-y-8">
          <HeroTitle>
            Animation Library Showcase
          </HeroTitle>
          
          <TypewriterSubtitle>
            Experience the power of luxury animations
          </TypewriterSubtitle>
          
          <MorphingTagline 
            texts={morphingTexts}
            config={{ delay: 3000 }}
          />
          
          <InteractiveText>
            Hover me for 3D depth effect
          </InteractiveText>
          
          <GlitchTitle trigger={true}>
            Glitch Effect Demo
          </GlitchTitle>
        </div>
      </HeroSection>

      {/* Text Effects Section */}
      <AnimatedSection>
        <Container>
          <div className="py-20 space-y-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-8 text-cigar-gold">Text Effects</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Letter Reveal</h3>
                  <LetterReveal 
                    text="Beautiful Typography"
                    config={{ stagger: 100, waveIntensity: 0.8 }}
                    className="text-lg"
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Typewriter</h3>
                  <Typewriter 
                    text="Classic typewriter effect with blinking cursor..."
                    config={{ typewriterSpeed: 80 }}
                    className="text-lg font-mono"
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">3D Depth</h3>
                  <Text3DDepth 
                    text="Move your mouse around me!"
                    className="text-lg cursor-pointer"
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Glitch Effect</h3>
                  <GlitchEffect 
                    text="SYSTEM ERROR"
                    config={{ glitchIntensity: 0.7 }}
                    className="text-lg font-bold text-red-500"
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Text Morphing</h3>
                  <TextMorphing 
                    texts={['Welcome', 'To', 'Luxury']}
                    config={{ delay: 2000 }}
                    className="text-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </AnimatedSection>

      {/* Image Effects Section */}
      <GallerySection>
        <Container>
          <div className="py-20 space-y-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-8 text-cigar-gold">Image Effects</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Ken Burns Effect</h3>
                  <div className="h-64 rounded-lg overflow-hidden">
                    <KenBurns 
                      src="/images/gallery/lounge-1.jpg"
                      alt="Lounge Interior"
                      config={{ kenBurnsIntensity: 0.2 }}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Duotone Effect</h3>
                  <div className="h-64 rounded-lg overflow-hidden">
                    <GalleryImage 
                      src="/images/gallery/cigar-selection.jpg"
                      alt="Cigar Selection"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Interactive Liquid Distortion</h3>
                  <div className="h-64 rounded-lg overflow-hidden">
                    <InteractiveImage 
                      src="/images/gallery/whiskey-pairing.jpg"
                      alt="Whiskey Pairing"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Mask Reveal</h3>
                  <div className="h-64 rounded-lg overflow-hidden">
                    <RevealImage 
                      src="/images/gallery/humidor.jpg"
                      alt="Humidor"
                      maskType="circle"
                    />
                  </div>
                </div>
                
                <div className="space-y-4 md:col-span-2">
                  <h3 className="text-xl font-semibold">Before/After Comparison</h3>
                  <BeforeAfterSlider
                    beforeSrc="/images/gallery/lounge-1.jpg"
                    afterSrc="/images/gallery/lounge-2.jpg"
                    beforeLabel="Before"
                    afterLabel="After"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </GallerySection>

      {/* Utility Animations Section */}
      <AnimatedSection>
        <Container>
          <div className="py-20 space-y-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-8 text-cigar-gold">Utility Animations</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Price Counter</h3>
                  <div className="text-2xl font-bold">
                    <PriceCounter value={129.99} />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Progress Ring</h3>
                  <ProgressRing 
                    progress={75}
                    showLabel={true}
                    size={120}
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Progress Bar</h3>
                  <ProgressBar 
                    progress={60}
                    showLabel={true}
                    label="Loading..."
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Magnetic Button</h3>
                  <MagneticButton>
                    <button className="px-6 py-3 bg-cigar-gold text-black rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
                      Hover Me
                    </button>
                  </MagneticButton>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Floating Icon</h3>
                  <div className="flex justify-center">
                    <FloatingIcon>
                      <div className="w-12 h-12 bg-cigar-gold rounded-full flex items-center justify-center">
                        <span className="text-2xl">✨</span>
                      </div>
                    </FloatingIcon>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Error Shake</h3>
                  <ErrorShake hasError={hasError}>
                    <div className="p-4 border border-red-500 rounded-lg bg-red-900/20">
                      <p className="text-red-400">This field has an error</p>
                    </div>
                  </ErrorShake>
                  <button 
                    onClick={() => setHasError(!hasError)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Toggle Error
                  </button>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Loading Skeleton</h3>
                  <LoadingSkeleton lines={3} />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Pulse Animation</h3>
                  <PulseAnimation>
                    <div className="w-16 h-16 bg-cigar-gold rounded-full"></div>
                  </PulseAnimation>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Shake Animation</h3>
                  <ShakeAnimation trigger={triggerShake}>
                    <div className="p-4 bg-blue-600 rounded-lg">
                      <p className="text-white">Shake me!</p>
                    </div>
                  </ShakeAnimation>
                  <button 
                    onClick={() => setTriggerShake(!triggerShake)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Trigger Shake
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </AnimatedSection>

      {/* Page Transitions Section */}
      <AnimatedSection>
        <Container>
          <div className="py-20 space-y-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-8 text-cigar-gold">Page Transitions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <button 
                  onClick={() => setShowModal(true)}
                  className="p-6 bg-luxury-charcoal border border-luxury-slate rounded-lg hover:border-cigar-gold transition-colors"
                >
                  <h3 className="text-lg font-semibold mb-2">Fade Transition</h3>
                  <p className="text-sm text-luxury-cream/70">Smooth fade with scale</p>
                </button>
                
                <button className="p-6 bg-luxury-charcoal border border-luxury-slate rounded-lg hover:border-cigar-gold transition-colors">
                  <h3 className="text-lg font-semibold mb-2">Curtain Reveal</h3>
                  <p className="text-sm text-luxury-cream/70">Curtain effect transition</p>
                </button>
                
                <button className="p-6 bg-luxury-charcoal border border-luxury-slate rounded-lg hover:border-cigar-gold transition-colors">
                  <h3 className="text-lg font-semibold mb-2">Liquid Transition</h3>
                  <p className="text-sm text-luxury-cream/70">Liquid morphing effect</p>
                </button>
                
                <button className="p-6 bg-luxury-charcoal border border-luxury-slate rounded-lg hover:border-cigar-gold transition-colors">
                  <h3 className="text-lg font-semibold mb-2">Slide Transition</h3>
                  <p className="text-sm text-luxury-cream/70">Directional slide effect</p>
                </button>
                
                <button className="p-6 bg-luxury-charcoal border border-luxury-slate rounded-lg hover:border-cigar-gold transition-colors">
                  <h3 className="text-lg font-semibold mb-2">Morph Transition</h3>
                  <p className="text-sm text-luxury-cream/70">Shape morphing effect</p>
                </button>
                
                <button className="p-6 bg-luxury-charcoal border border-luxury-slate rounded-lg hover:border-cigar-gold transition-colors">
                  <h3 className="text-lg font-semibold mb-2">Scale Transition</h3>
                  <p className="text-sm text-luxury-cream/70">Scale up/down effect</p>
                </button>
              </div>
            </div>
          </div>
        </Container>
      </AnimatedSection>

      {/* Parallax Section */}
      <ParallaxSection speed={0.5}>
        <Container>
          <div className="py-20 text-center">
            <h2 className="text-4xl font-bold mb-8 text-cigar-gold">Parallax Effect</h2>
            <p className="text-xl text-luxury-cream/80 max-w-3xl mx-auto">
              This section moves at a different speed as you scroll, creating a beautiful parallax effect.
              The text and elements here will move slower than the background, creating depth and immersion.
            </p>
          </div>
        </Container>
      </ParallaxSection>

      {/* Library Info Section */}
      <RevealOnScroll>
        <Container>
          <div className="py-20 text-center">
            <h2 className="text-3xl font-bold mb-8 text-cigar-gold">Animation Library Info</h2>
            
            <div className="bg-luxury-charcoal/50 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold mb-4">{ANIMATION_LIBRARY_INFO.name} v{ANIMATION_LIBRARY_INFO.version}</h3>
              <p className="text-luxury-cream/80 mb-6">{ANIMATION_LIBRARY_INFO.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-cigar-gold mb-2">Features:</h4>
                  <ul className="space-y-1 text-sm text-luxury-cream/70">
                    {ANIMATION_LIBRARY_INFO.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-cigar-gold mb-2">Available Presets:</h4>
                  <ul className="space-y-1 text-sm text-luxury-cream/70">
                    <li>• Luxury: Smooth, elegant animations</li>
                    <li>• Fast: Quick, snappy transitions</li>
                    <li>• Smooth: Fluid, cinematic effects</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </RevealOnScroll>

      {/* Modal Demo */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <ModalTransition isVisible={showModal} onTransitionComplete={() => !showModal && setShowModal(false)}>
            <div className="bg-luxury-charcoal rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold mb-4 text-cigar-gold">Modal Transition</h3>
              <p className="text-luxury-cream/80 mb-6">
                This modal demonstrates the scale transition effect with smooth entrance and exit animations.
              </p>
              <button 
                onClick={() => setShowModal(false)}
                className="w-full px-6 py-3 bg-cigar-gold text-black rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
              >
                Close Modal
              </button>
            </div>
          </ModalTransition>
        </div>
      )}
    </div>
  );
}
