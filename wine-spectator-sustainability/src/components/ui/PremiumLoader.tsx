'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PremiumLoaderProps {
  onComplete: () => void;
}

export function PremiumLoader({ onComplete }: PremiumLoaderProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setShowContent(true);
            setTimeout(onComplete, 2000);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 bg-luxury-black flex items-center justify-center"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-cigar-gold/20 via-transparent to-cigar-copper/20" />
          <div className="absolute inset-0 bg-[url('/images/textures/luxury-pattern.svg')] opacity-5" />
        </div>

        <div className="relative z-10 text-center">
          {/* Logo Reveal */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateY: 90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="mb-12"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-display">
              <span className="gradient-text">Luxury</span>
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-display text-luxury-cream mt-2">
              Cigar Lounges
            </h2>
          </motion.div>

          {/* Loading Bar */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '100%', opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-80 mx-auto mb-8"
          >
            <div className="h-1 bg-luxury-slate rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cigar-gold to-cigar-copper"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
          </motion.div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-cigar-gold text-lg font-medium"
          >
            {loadingProgress < 100 ? `Loading... ${Math.round(loadingProgress)}%` : 'Welcome'}
          </motion.div>

          {/* Animated Elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 border border-cigar-gold/20 rounded-full animate-spin-slow" />
          <div className="absolute -bottom-20 -right-20 w-32 h-32 border border-cigar-copper/20 rounded-full animate-spin-reverse" />
        </div>

        {/* Content Reveal */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute inset-0 flex items-center justify-center bg-luxury-black/95 backdrop-blur-sm"
            >
              <div className="text-center">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-3xl font-bold text-display gradient-text mb-4"
                >
                  Experience Luxury
                </motion.div>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-luxury-cream/80 text-lg"
                >
                  Entering our world of sophistication...
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
