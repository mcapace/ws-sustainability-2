'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CompareItem } from '@/types/cigars';
import { useCompare } from '@/hooks/useCompare';

interface CompareModeProps {
  compareItems: CompareItem[];
  isOpen: boolean;
  onClose: () => void;
}

export function CompareMode({ compareItems, isOpen, onClose }: CompareModeProps) {
  const { clearCompare, swapCompareItems } = useCompare();

  if (!isOpen || compareItems.length === 0) return null;

  const leftCigar = compareItems.find(item => item.position === 'left')?.cigar;
  const rightCigar = compareItems.find(item => item.position === 'right')?.cigar;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-luxury-black/95 backdrop-blur-lg"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-luxury-slate/20">
          <h2 className="text-2xl font-bold text-luxury-cream">Compare Cigars</h2>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={swapCompareItems}
              className="px-4 py-2 bg-luxury-slate/50 hover:bg-luxury-slate/70 rounded-lg text-luxury-cream transition-colors duration-300"
            >
              ↔️ Swap
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearCompare}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors duration-300"
            >
              Clear All
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="p-2 bg-luxury-slate/50 hover:bg-luxury-slate/70 rounded-lg text-luxury-cream transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-2 gap-8 p-6 h-full">
            {/* Left Cigar */}
            <div className="space-y-4">
              {leftCigar && (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-luxury-charcoal/30 backdrop-blur-xl rounded-2xl p-6 border border-luxury-slate/20 h-full"
                >
                  <CompareCard cigar={leftCigar} />
                </motion.div>
              )}
            </div>

            {/* Right Cigar */}
            <div className="space-y-4">
              {rightCigar && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-luxury-charcoal/30 backdrop-blur-xl rounded-2xl p-6 border border-luxury-slate/20 h-full"
                >
                  <CompareCard cigar={rightCigar} />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Compare Card Component
interface CompareCardProps {
  cigar: {
    id: string;
    name: string;
    brand: string;
    origin: string;
    strength: string;
    price: number;
    rating: number;
    size: { shape: string };
    wrapper: string;
    aging: number;
    strengthProfile: { body: number; flavor: number; strength: number };
    tastingNotes: string[];
  };
}

function CompareCard({ cigar }: CompareCardProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-luxury-cream mb-2">{cigar.name}</h3>
        <p className="text-cigar-gold font-medium">{cigar.brand}</p>
        <div className="flex items-center justify-center space-x-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < Math.floor(cigar.rating) ? 'text-cigar-gold' : 'text-luxury-slate'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-luxury-cream/70 text-sm ml-2">({cigar.rating})</span>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-luxury-cream/70">Origin:</span>
          <p className="text-luxury-cream font-medium">{cigar.origin}</p>
        </div>
        <div>
          <span className="text-luxury-cream/70">Strength:</span>
          <p className="text-luxury-cream font-medium">{cigar.strength}</p>
        </div>
        <div>
          <span className="text-luxury-cream/70">Price:</span>
          <p className="text-cigar-gold font-bold">${cigar.price}</p>
        </div>
        <div>
          <span className="text-luxury-cream/70">Size:</span>
          <p className="text-luxury-cream font-medium">{cigar.size.shape}</p>
        </div>
        <div>
          <span className="text-luxury-cream/70">Wrapper:</span>
          <p className="text-luxury-cream font-medium">{cigar.wrapper}</p>
        </div>
        <div>
          <span className="text-luxury-cream/70">Aging:</span>
          <p className="text-luxury-cream font-medium">{cigar.aging} years</p>
        </div>
      </div>

      {/* Strength Profile */}
      <div className="mt-6">
        <h4 className="text-luxury-cream font-medium mb-3">Strength Profile</h4>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs text-luxury-cream/70 mb-1">
              <span>Body</span>
              <span>{cigar.strengthProfile.body}/10</span>
            </div>
            <div className="w-full bg-luxury-slate/30 rounded-full h-2">
              <div 
                className="bg-cigar-gold h-2 rounded-full transition-all duration-500"
                style={{ width: `${cigar.strengthProfile.body * 10}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-luxury-cream/70 mb-1">
              <span>Flavor</span>
              <span>{cigar.strengthProfile.flavor}/10</span>
            </div>
            <div className="w-full bg-luxury-slate/30 rounded-full h-2">
              <div 
                className="bg-cigar-gold h-2 rounded-full transition-all duration-500"
                style={{ width: `${cigar.strengthProfile.flavor * 10}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-luxury-cream/70 mb-1">
              <span>Strength</span>
              <span>{cigar.strengthProfile.strength}/10</span>
            </div>
            <div className="w-full bg-luxury-slate/30 rounded-full h-2">
              <div 
                className="bg-cigar-gold h-2 rounded-full transition-all duration-500"
                style={{ width: `${cigar.strengthProfile.strength * 10}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tasting Notes */}
      <div className="mt-6 flex-1">
        <h4 className="text-luxury-cream font-medium mb-3">Tasting Notes</h4>
        <div className="flex flex-wrap gap-1">
          {cigar.tastingNotes.map((note: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 bg-luxury-slate/30 text-luxury-cream/80 rounded text-xs"
            >
              {note}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
