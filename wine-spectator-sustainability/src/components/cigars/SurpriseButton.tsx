'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cigar } from '@/types/cigars';

interface SurpriseButtonProps {
  cigars: Cigar[];
  onSurpriseSelect: (cigar: Cigar) => void;
}

export function SurpriseButton({ cigars, onSurpriseSelect }: SurpriseButtonProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayCigars, setDisplayCigars] = useState<Cigar[]>([]);
  const [selectedCigar, setSelectedCigar] = useState<Cigar | null>(null);
  const [showResult, setShowResult] = useState(false);
  const spinIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setShowResult(false);
    setSelectedCigar(null);
    
    // Create display array with random cigars
    const randomCigars = Array.from({ length: 10 }, () => 
      cigars[Math.floor(Math.random() * cigars.length)]
    );
    setDisplayCigars(randomCigars);

    // Spin animation
    let spinCount = 0;
    const maxSpins = 20;
    
    spinIntervalRef.current = setInterval(() => {
      spinCount++;
      
      if (spinCount < maxSpins) {
        // Continue spinning with random cigars
        const newRandomCigars = Array.from({ length: 10 }, () => 
          cigars[Math.floor(Math.random() * cigars.length)]
        );
        setDisplayCigars(newRandomCigars);
      } else {
        // Stop spinning and select final cigar
        const finalCigar = cigars[Math.floor(Math.random() * cigars.length)];
        setSelectedCigar(finalCigar);
        setDisplayCigars([finalCigar]);
        
        if (spinIntervalRef.current) {
          clearInterval(spinIntervalRef.current);
        }
        
        setTimeout(() => {
          setIsSpinning(false);
          setShowResult(true);
          onSurpriseSelect(finalCigar);
        }, 500);
      }
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (spinIntervalRef.current) {
        clearInterval(spinIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="surprise-button-container">
      {/* Main Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={startSpin}
        disabled={isSpinning}
        className={`relative overflow-hidden px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
          isSpinning
            ? 'bg-gradient-to-r from-cigar-gold to-amber-400 text-luxury-black cursor-not-allowed'
            : 'bg-gradient-to-r from-luxury-charcoal to-luxury-slate text-luxury-cream hover:from-cigar-gold hover:to-amber-400 hover:text-luxury-black border border-cigar-gold/30'
        }`}
      >
        {/* Slot Machine Animation */}
        <AnimatePresence mode="wait">
          {isSpinning ? (
            <motion.div
              key="spinning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-2"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
                className="w-6 h-6"
              >
                🎰
              </motion.div>
              <span>Spinning...</span>
            </motion.div>
          ) : (
            <motion.div
              key="ready"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-2"
            >
              <span>🎲</span>
              <span>Surprise Me!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: isSpinning ? ['-100%', '100%'] : 0,
          }}
          transition={{
            duration: 1,
            repeat: isSpinning ? Infinity : 0,
            ease: 'easeInOut'
          }}
        />
      </motion.button>

      {/* Slot Machine Display */}
      <AnimatePresence>
        {(isSpinning || showResult) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-6 bg-luxury-black/50 backdrop-blur-lg rounded-2xl p-6 border border-luxury-slate/30"
          >
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-luxury-cream mb-2">
                {isSpinning ? '🎰 Spinning...' : '🎉 Your Surprise Cigar!'}
              </h3>
            </div>

            {/* Slot Machine Reels */}
            <div className="relative overflow-hidden h-32 bg-luxury-charcoal/50 rounded-lg border border-luxury-slate/20">
              <motion.div
                className="absolute inset-0 flex flex-col"
                animate={{
                  y: isSpinning ? -2000 : 0,
                }}
                transition={{
                  duration: isSpinning ? 2 : 0.5,
                  ease: isSpinning ? 'linear' : 'easeOut'
                }}
              >
                {displayCigars.map((cigar, index) => (
                  <div
                    key={`${cigar.id}-${index}`}
                    className="flex items-center justify-center h-32 px-4"
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cigar-gold">{cigar.name}</div>
                      <div className="text-sm text-luxury-cream/80">{cigar.brand}</div>
                      <div className="text-lg font-bold text-luxury-cream">${cigar.price}</div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Center Indicator */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-8 bg-gradient-to-r from-transparent via-cigar-gold/30 to-transparent border-y border-cigar-gold/50" />
              </div>
            </div>

            {/* Result Display */}
            {showResult && selectedCigar && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-center"
              >
                <div className="bg-gradient-to-r from-cigar-gold/20 to-amber-400/20 rounded-lg p-4 border border-cigar-gold/30">
                  <h4 className="text-xl font-bold text-luxury-cream mb-2">
                    {selectedCigar.name}
                  </h4>
                  <p className="text-cigar-gold font-medium mb-2">{selectedCigar.brand}</p>
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <span className="text-luxury-cream/80">
                      🌍 {selectedCigar.origin}
                    </span>
                    <span className="text-luxury-cream/80">
                      🔥 {selectedCigar.strength}
                    </span>
                    <span className="text-cigar-gold font-bold">
                      ${selectedCigar.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
