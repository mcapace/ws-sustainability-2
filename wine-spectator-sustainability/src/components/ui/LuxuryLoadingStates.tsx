'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { LuxurySpinner } from '@/components/animations/LuxuryAnimations';

// Premium page loading with brand reveal
export function LuxuryPageLoader() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const loadingSteps = [
    { progress: 20, text: 'Loading premium experiences...' },
    { progress: 40, text: 'Preparing luxury venues...' },
    { progress: 60, text: 'Curating collections...' },
    { progress: 80, text: 'Finalizing details...' },
    { progress: 100, text: 'Welcome to excellence' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const nextProgress = prev + 2;
        const currentStepData = loadingSteps.find(step => nextProgress >= step.progress);
        if (currentStepData) {
          setCurrentStep(currentStepData.text);
        }
        return nextProgress;
      });
    }, 50);

    if (loadingProgress >= 100) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [loadingProgress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-luxury-charcoal flex items-center justify-center z-[9999]"
    >
      <div className="text-center">
        {/* Brand Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-12"
        >
          <div className="text-4xl font-bold text-cigar-gold mb-2">
            Cigar Aficionado
          </div>
          <div className="text-xl text-luxury-cream/80">
            Select
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto mb-8">
          <div className="h-1 bg-luxury-slate/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cigar-gold to-cigar-copper"
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Loading Text */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-luxury-cream/70 text-lg mb-8 min-h-[2rem]"
        >
          {currentStep}
        </motion.div>

        {/* Luxury Spinner */}
        <div className="flex justify-center">
          <LuxurySpinner size={32} />
        </div>
      </div>
    </motion.div>
  );
}

// Premium skeleton for content
export function LuxurySkeleton({ 
  variant = 'text',
  lines = 3,
  className = '' 
}: { 
  variant?: 'text' | 'image' | 'card';
  lines?: number;
  className?: string;
}) {
  if (variant === 'image') {
    return (
      <div className={`bg-luxury-slate/20 rounded-lg overflow-hidden ${className}`}>
        <motion.div
          className="aspect-video bg-gradient-to-r from-luxury-slate/20 via-luxury-slate/30 to-luxury-slate/20"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`bg-luxury-slate/10 backdrop-blur-sm rounded-2xl p-6 border border-luxury-slate/20 ${className}`}>
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-luxury-slate/20 rounded-lg animate-pulse" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-luxury-slate/20 rounded w-3/4 animate-pulse" />
            <div className="h-3 bg-luxury-slate/20 rounded w-1/2 animate-pulse" />
          </div>
        </div>
        <div className="space-y-3">
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={`h-3 bg-luxury-slate/20 rounded animate-pulse ${
                i === lines - 1 ? 'w-4/6' : 'w-full'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className={`h-4 bg-luxury-slate/20 rounded animate-pulse ${
            i === lines - 1 ? 'w-5/6' : 'w-full'
          }`}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}

// Premium loading overlay
export function LoadingOverlay({ 
  isLoading, 
  children, 
  message = 'Loading...' 
}: { 
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
}) {
  return (
    <div className="relative">
      {children}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-luxury-charcoal/80 backdrop-blur-sm flex items-center justify-center z-10"
          >
            <div className="text-center">
              <LuxurySpinner size={40} className="mb-4" />
              <p className="text-luxury-cream/80">{message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Progressive image loading with luxury effect
export function ProgressiveImageLoader({ 
  src, 
  alt, 
  className = '',
  ...props 
}: { 
  src: string;
  alt: string;
  className?: string;
  [key: string]: any;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton placeholder */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-luxury-slate/20"
          >
            <motion.div
              className="w-full h-full bg-gradient-to-r from-luxury-slate/20 via-luxury-slate/30 to-luxury-slate/20"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actual image */}
      <motion.img
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className="w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        {...props}
      />

      {/* Error state */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-luxury-slate/50 flex items-center justify-center"
          >
            <div className="text-center text-luxury-cream/60">
              <div className="text-4xl mb-2">🖼️</div>
              <p className="text-sm">Image unavailable</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Loading state for buttons
export function LoadingButton({ 
  children, 
  isLoading, 
  loadingText = 'Loading...',
  className = '',
  ...props 
}: { 
  children: React.ReactNode;
  isLoading: boolean;
  loadingText?: string;
  className?: string;
  [key: string]: any;
}) {
  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      disabled={isLoading}
      whileHover={{ scale: isLoading ? 1 : 1.02 }}
      whileTap={{ scale: isLoading ? 1 : 0.98 }}
      {...props}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center space-x-2"
          >
            <LuxurySpinner size={16} />
            <span>{loadingText}</span>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// Loading state for forms
export function LoadingForm({ 
  children, 
  isLoading, 
  ...props 
}: { 
  children: React.ReactNode;
  isLoading: boolean;
  [key: string]: any;
}) {
  return (
    <div className="relative" {...props}>
      {children}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-luxury-charcoal/50 backdrop-blur-sm flex items-center justify-center z-10"
          >
            <div className="text-center">
              <LuxurySpinner size={32} className="mb-2" />
              <p className="text-luxury-cream/80 text-sm">Processing...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
