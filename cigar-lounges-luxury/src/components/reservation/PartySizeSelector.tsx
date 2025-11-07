'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface PartySizeSelectorProps {
  partySize: number;
  onPartySizeChange: (size: number) => void;
  minSize?: number;
  maxSize?: number;
}

export function PartySizeSelector({ 
  partySize, 
  onPartySizeChange, 
  minSize = 1, 
  maxSize = 12 
}: PartySizeSelectorProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const increment = () => {
    if (partySize < maxSize && !isAnimating) {
      setIsAnimating(true);
      onPartySizeChange(partySize + 1);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const decrement = () => {
    if (partySize > minSize && !isAnimating) {
      setIsAnimating(true);
      onPartySizeChange(partySize - 1);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const getPartySizeLabel = (size: number) => {
    if (size === 1) return 'Solo';
    if (size === 2) return 'Couple';
    if (size <= 4) return 'Small Group';
    if (size <= 6) return 'Medium Group';
    if (size <= 8) return 'Large Group';
    return 'Party';
  };

  const getPartySizeDescription = (size: number) => {
    if (size === 1) return 'Perfect for a quiet evening';
    if (size === 2) return 'Ideal for date night';
    if (size <= 4) return 'Great for intimate gatherings';
    if (size <= 6) return 'Perfect for small celebrations';
    if (size <= 8) return 'Excellent for group events';
    return 'Perfect for large celebrations';
  };

  return (
    <div className="party-size-selector bg-luxury-charcoal/30 backdrop-blur-xl rounded-2xl p-6 border border-luxury-slate/20">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-luxury-cream mb-2">Party Size</h3>
        <p className="text-luxury-cream/70">How many guests will be joining you?</p>
      </div>

      {/* 3D Counter */}
      <div className="flex items-center justify-center mb-6">
        {/* Decrement Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={decrement}
          disabled={partySize <= minSize}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 ${
            partySize <= minSize
              ? 'bg-luxury-black/30 text-luxury-cream/30 cursor-not-allowed'
              : 'bg-luxury-black/50 text-luxury-cream hover:bg-cigar-gold hover:text-luxury-black shadow-lg'
          }`}
        >
          −
        </motion.button>

        {/* 3D Number Display */}
        <div className="relative mx-8">
          <motion.div
            key={partySize}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative"
          >
            {/* 3D Effect */}
            <div className="relative transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
              {/* Front Face */}
              <div className="relative z-10 bg-gradient-to-br from-cigar-gold to-amber-400 text-luxury-black w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-2xl">
                {partySize}
              </div>
              
              {/* Side Face */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-yellow-700 rounded-2xl transform translate-x-2 translate-y-2 -z-10" />
              
              {/* Back Face */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-800 to-amber-900 rounded-2xl transform translate-x-4 translate-y-4 -z-20" />
            </div>

            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-cigar-gold/20 rounded-2xl blur-xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </motion.div>

          {/* Floating Particles */}
          {isAnimating && (
            <>
              <motion.div
                className="absolute top-0 left-1/2 w-2 h-2 bg-cigar-gold rounded-full"
                initial={{ y: 0, x: 0, opacity: 1 }}
                animate={{ y: -30, x: -20, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
              <motion.div
                className="absolute top-0 left-1/2 w-2 h-2 bg-amber-400 rounded-full"
                initial={{ y: 0, x: 0, opacity: 1 }}
                animate={{ y: -30, x: 20, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              />
            </>
          )}
        </div>

        {/* Increment Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={increment}
          disabled={partySize >= maxSize}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 ${
            partySize >= maxSize
              ? 'bg-luxury-black/30 text-luxury-cream/30 cursor-not-allowed'
              : 'bg-luxury-black/50 text-luxury-cream hover:bg-cigar-gold hover:text-luxury-black shadow-lg'
          }`}
        >
          +
        </motion.button>
      </div>

      {/* Party Size Info */}
      <motion.div
        key={partySize}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h4 className="text-lg font-semibold text-cigar-gold mb-2">
          {getPartySizeLabel(partySize)}
        </h4>
        <p className="text-luxury-cream/70 text-sm">
          {getPartySizeDescription(partySize)}
        </p>
      </motion.div>

      {/* Quick Select Buttons */}
      <div className="flex justify-center space-x-2 mt-6">
        {[1, 2, 4, 6, 8].map((size) => (
          <motion.button
            key={size}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPartySizeChange(size)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
              partySize === size
                ? 'bg-cigar-gold text-luxury-black'
                : 'bg-luxury-black/30 text-luxury-cream hover:bg-luxury-black/50'
            }`}
          >
            {size}
          </motion.button>
        ))}
      </div>

      {/* Capacity Warning */}
      {partySize >= 8 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 p-3 bg-amber-500/20 border border-amber-500/30 rounded-lg"
        >
          <p className="text-amber-400 text-sm text-center">
            💡 Large groups may require advance notice for optimal seating arrangements
          </p>
        </motion.div>
      )}
    </div>
  );
}
