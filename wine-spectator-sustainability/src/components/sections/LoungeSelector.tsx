'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { LoungeCard3D } from '@/components/3d/LoungeCard3D';
import { TextScramble } from '@/components/animations/TextScramble';
import { MorphingBackground } from '@/components/animations/MorphingBackground';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Container } from '@/components/ui/Container';
import { lounges } from '@/data/lounges';
import { CigarLounge } from '@/types';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function LoungeSelector() {
  const [selectedLounge, setSelectedLounge] = useState<CigarLounge>(lounges[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle lounge selection
  const selectLounge = useCallback((lounge: CigarLounge, index: number) => {
    if (isTransitioning || index === selectedIndex) return;
    
    setIsTransitioning(true);
    setSelectedLounge(lounge);
    setSelectedIndex(index);
    
    // Reset transition after animation
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [isTransitioning, selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : lounges.length - 1;
        selectLounge(lounges[prevIndex], prevIndex);
      } else if (e.key === 'ArrowRight') {
        const nextIndex = selectedIndex < lounges.length - 1 ? selectedIndex + 1 : 0;
        selectLounge(lounges[nextIndex], nextIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, selectLounge]);

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
      }
    });

    tl.fromTo(contentRef.current, 
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1 }
    );

    return () => {
      tl.kill();
    };
  }, []);

  // Calculate 3D positions for cards
  const getCardPosition = (index: number): [number, number, number] => {
    const angle = (index / lounges.length) * Math.PI * 2;
    const radius = 4;
    return [
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    ];
  };

  const getCardRotation = (index: number): [number, number, number] => {
    const angle = (index / lounges.length) * Math.PI * 2;
    return [0, -angle, 0];
  };

  return (
    <section ref={sectionRef} id="lounges" className="section-padding bg-luxury-black relative overflow-hidden">
      {/* Morphing Background */}
      <MorphingBackground 
        shapes={[]}
        className="absolute inset-0 opacity-20"
      />

      <Container>
        <div ref={contentRef} className="relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-display mb-6">
              <span className="gradient-text">Choose Your</span>
              <br />
              <TextScramble 
                text="LUXURY EXPERIENCE"
                duration={2}
                className="text-luxury-cream"
              />
            </h2>
            <p className="text-xl text-luxury-cream/80 max-w-3xl mx-auto text-accent">
              Each venue offers a unique atmosphere while maintaining our unwavering 
              commitment to luxury and excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 3D Carousel */}
            <div className="relative h-96 lg:h-[500px]">
              <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <Environment preset="night" />
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={0.6} color="#d4af37" />
                <spotLight 
                  position={[0, 10, 0]} 
                  intensity={0.8} 
                  color="#d4af37"
                  angle={Math.PI / 6}
                  penumbra={0.5}
                />
                
                {lounges.map((lounge, index) => (
                  <LoungeCard3D
                    key={lounge.id}
                    lounge={lounge}
                    position={getCardPosition(index)}
                    rotation={getCardRotation(index)}
                    scale={index === selectedIndex ? 1 : 0.8}
                    isActive={index === selectedIndex}
                    onClick={() => selectLounge(lounge, index)}
                  />
                ))}
                
                <OrbitControls 
                  enableZoom={false}
                  enablePan={false}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 4}
                />
              </Canvas>

              {/* Navigation Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {lounges.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => selectLounge(lounges[index], index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === selectedIndex 
                        ? 'bg-cigar-gold scale-125' 
                        : 'bg-cigar-gold/40 hover:bg-cigar-gold/60'
                    }`}
                  />
                ))}
              </div>

              {/* Keyboard Navigation Hint */}
              <div className="absolute top-4 right-4 text-cigar-gold/60 text-sm hidden lg:block">
                <div className="flex items-center space-x-2">
                  <span>← →</span>
                  <span>Navigate</span>
                </div>
              </div>
            </div>

            {/* Content Panel */}
            <motion.div
              key={selectedLounge.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="space-y-6"
            >
              {/* Lounge Name with Scramble Effect */}
              <div>
                <TextScramble 
                  text={selectedLounge.name}
                  duration={1.5}
                  className="text-3xl md:text-4xl font-bold text-display gradient-text mb-2"
                />
                <TextScramble 
                  text={selectedLounge.tagline}
                  duration={1}
                  delay={0.5}
                  className="text-xl text-cigar-copper text-accent"
                />
              </div>

              {/* Atmosphere */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-cigar-gold">Atmosphere</h4>
                <div className="grid grid-cols-1 gap-2 text-luxury-cream/80">
                  <div className="flex items-center space-x-3">
                    <span className="text-cigar-gold">🎵</span>
                    <span>{selectedLounge.atmosphere.music}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-cigar-gold">🎨</span>
                    <span>{selectedLounge.atmosphere.style}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-cigar-gold">👔</span>
                    <span>{selectedLounge.atmosphere.dressCode}</span>
                  </div>
                </div>
              </div>

              {/* Collection Preview */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-cigar-gold">Featured Collection</h4>
                <div className="grid grid-cols-1 gap-2">
                  {selectedLounge.collection.featured.slice(0, 3).map((cigar, index) => (
                    <motion.div
                      key={cigar.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex items-center justify-between p-3 bg-luxury-charcoal/50 rounded-lg border border-cigar-gold/20"
                    >
                      <div>
                        <div className="font-medium text-luxury-cream">{cigar.name}</div>
                        <div className="text-sm text-cigar-gold">{cigar.brand}</div>
                      </div>
                      <div className="text-cigar-copper font-semibold">
                        ${cigar.price}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <MagneticButton
                  className="flex-1 btn-luxury-premium"
                  onClick={() => window.open(selectedLounge.reservations.link, '_blank')}
                  strength={0.4}
                >
                  Reserve Experience
                </MagneticButton>
                
                <MagneticButton
                  className="flex-1 px-6 py-3 border-2 border-cigar-gold text-cigar-gold hover:bg-cigar-gold hover:text-luxury-black transition-all duration-300 rounded-lg font-medium"
                  onClick={() => window.open(`tel:${selectedLounge.reservations.phone}`)}
                  strength={0.3}
                >
                  Call Now
                </MagneticButton>
              </div>

              {/* Preferred Times */}
              <div className="text-sm text-luxury-cream/60">
                <span className="text-cigar-gold">Preferred times:</span>{' '}
                {selectedLounge.reservations.preferredTimes.join(', ')}
              </div>
            </motion.div>
          </div>

          {/* Mobile Swipe Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="lg:hidden text-center mt-8 text-cigar-gold/60 text-sm"
          >
            <div className="flex items-center justify-center space-x-2">
              <span>← Swipe →</span>
              <span>to explore</span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
