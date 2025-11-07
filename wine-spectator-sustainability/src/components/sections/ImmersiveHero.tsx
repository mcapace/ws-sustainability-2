'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

import { ParticleSmoke } from '@/components/3d/ParticleSmoke';
import { SplitText } from '@/components/animations/SplitText';
import { GlassNavigation } from '@/components/ui/GlassNavigation';
import { AnimatedScrollIndicator } from '@/components/ui/AnimatedScrollIndicator';
import { VideoBackground } from '@/components/ui/VideoBackground';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ImmersiveHero() {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !textRef.current || !ctaRef.current) return;

    // Create GSAP timeline for orchestrated animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true,
        pinSpacing: false,
      }
    });

    // Parallax text layers
    tl.to(textRef.current, {
      y: -window.innerHeight * 0.3,
      ease: 'none'
    }, 0)
    .to(ctaRef.current, {
      y: -window.innerHeight * 0.1,
      ease: 'none'
    }, 0);

    // Particle system parallax
    const particleContainer = document.querySelector('#particle-container');
    if (particleContainer) {
      tl.to(particleContainer, {
        y: window.innerHeight * 0.5,
        ease: 'none'
      }, 0);
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      {/* Glass Navigation */}
      <GlassNavigation />
      
      {/* Animated Scroll Indicator */}
      <AnimatedScrollIndicator />

      {/* Main Hero Section */}
      <section
        ref={heroRef}
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Video Background */}
        <VideoBackground />

        {/* Three.js Particle System */}
        <div id="particle-container" className="absolute inset-0 z-10">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            style={{ background: 'transparent' }}
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={0.6} color="#d4af37" />
              <ParticleSmoke count={1200} />
              <Environment preset="night" />
            </Suspense>
          </Canvas>
        </div>

        {/* Content Layers */}
        <Container className="relative z-20">
          <div className="text-center">
            {/* Main Headlines with Split Text */}
            <div ref={textRef} className="space-y-6 mb-12">
              {/* Primary Headline */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              >
                <SplitText
                  splitBy="words"
                  delay={0.5}
                  stagger={0.1}
                  className="text-6xl md:text-8xl lg:text-9xl font-bold text-display"
                >
                  CURATED
                </SplitText>
              </motion.div>

              {/* Secondary Headline */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2, ease: 'easeOut' }}
              >
                <SplitText
                  splitBy="chars"
                  delay={1.5}
                  stagger={0.03}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-display text-luxury-cream"
                >
                  LUXURY EXPERIENCE
                </SplitText>
              </motion.div>

              {/* Tertiary Text */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2, ease: 'easeOut' }}
                className="max-w-4xl mx-auto"
              >
                <SplitText
                  splitBy="words"
                  delay={2.3}
                  stagger={0.05}
                  duration={0.6}
                  className="text-xl md:text-2xl text-luxury-cream/80 text-accent leading-relaxed"
                >
                  Where premium cigars, fine spirits, and sophisticated ambiance create unforgettable moments for the discerning connoisseur.
                </SplitText>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div
              ref={ctaRef}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.8, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="primary" size="lg" className="px-12 py-4 text-lg">
                  Explore Lounges
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="lg" className="px-12 py-4 text-lg">
                  Reserve Experience
                </Button>
              </motion.div>
            </motion.div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Floating Cigar Icon */}
              <motion.div
                initial={{ opacity: 0, x: -100, rotate: -45 }}
                animate={{ opacity: 0.6, x: 0, rotate: 0 }}
                transition={{ duration: 2, delay: 3, ease: 'easeOut' }}
                className="absolute top-1/4 left-10 text-cigar-gold/40"
                style={{ fontSize: '4rem' }}
              >
                🚬
              </motion.div>

              {/* Floating Whiskey Glass */}
              <motion.div
                initial={{ opacity: 0, x: 100, rotate: 45 }}
                animate={{ opacity: 0.6, x: 0, rotate: 0 }}
                transition={{ duration: 2, delay: 3.5, ease: 'easeOut' }}
                className="absolute top-1/3 right-10 text-cigar-copper/40"
                style={{ fontSize: '3rem' }}
              >
                🥃
              </motion.div>

              {/* Floating Luxury Elements */}
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 0.3, y: 0 }}
                transition={{ duration: 3, delay: 4, ease: 'easeOut' }}
                className="absolute bottom-1/4 left-1/4 text-cigar-amber/30"
                style={{ fontSize: '2rem' }}
              >
                ✨
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 0.4, y: 0 }}
                transition={{ duration: 2.5, delay: 4.5, ease: 'easeOut' }}
                className="absolute bottom-1/3 right-1/4 text-cigar-gold/30"
                style={{ fontSize: '1.5rem' }}
              >
                💎
              </motion.div>
            </div>
          </div>
        </Container>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-cigar-gold cursor-pointer group"
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-sm font-medium tracking-widest uppercase group-hover:text-cigar-copper transition-colors duration-300">
                Discover
              </span>
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
