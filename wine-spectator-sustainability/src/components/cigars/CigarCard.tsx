'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Cigar } from '@/types/cigars';
import { useTiltEffect } from '@/hooks/useTiltEffect';
import { useFavorites } from '@/hooks/useFavorites';
import { useCompare } from '@/hooks/useCompare';

interface CigarCardProps {
  cigar: Cigar;
  onCompare: (cigar: Cigar) => void;
  isInCompare: boolean;
}

export function CigarCard({ cigar, onCompare, isInCompare }: CigarCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { canAddToCompare } = useCompare();

  // Tilt effect
  useTiltEffect(cardRef, { max: 15, perspective: 1000 });

  const isCigarFavorite = isFavorite(cigar.id);

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="cigar-card group relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Glassmorphism Card */}
      <div className="relative bg-luxury-charcoal/30 backdrop-blur-xl rounded-2xl overflow-hidden border border-luxury-slate/20 hover:border-cigar-gold/30 transition-all duration-500">
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-noise-pattern" />
        
        {/* Featured Badge */}
        {cigar.featured && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute top-4 right-4 z-10"
          >
            <div className="bg-gradient-to-r from-cigar-gold to-amber-400 text-luxury-black px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
              <span>⭐</span>
              <span>Featured</span>
            </div>
          </motion.div>
        )}

        {/* Limited Edition Badge */}
        {cigar.limitedEdition && (
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1 }}
            className="absolute top-4 left-4 z-10"
          >
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg animate-pulse">
              <span>💎</span>
              <span>Limited</span>
            </div>
          </motion.div>
        )}

        {/* Cigar Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={cigar.image}
            alt={cigar.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-transparent to-transparent" />
          
          {/* Action Buttons */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleFavorite(cigar.id)}
              className={`p-2 rounded-full backdrop-blur-lg transition-all duration-300 ${
                isCigarFavorite
                  ? 'bg-red-500/80 text-white'
                  : 'bg-luxury-black/50 text-luxury-cream hover:bg-red-500/80'
              }`}
            >
              <svg className="w-4 h-4" fill={isCigarFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onCompare(cigar)}
              disabled={!canAddToCompare() && !isInCompare}
              className={`p-2 rounded-full backdrop-blur-lg transition-all duration-300 ${
                isInCompare
                  ? 'bg-cigar-gold text-luxury-black'
                  : canAddToCompare()
                  ? 'bg-luxury-black/50 text-luxury-cream hover:bg-cigar-gold hover:text-luxury-black'
                  : 'bg-luxury-black/30 text-luxury-cream/50 cursor-not-allowed'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Brand and Name */}
          <div className="mb-3">
            <p className="text-cigar-gold text-sm font-medium mb-1">{cigar.brand}</p>
            <h3 className="text-xl font-bold text-luxury-cream mb-2">{cigar.name}</h3>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <motion.svg
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`w-4 h-4 ${
                  i < Math.floor(cigar.rating) ? 'text-cigar-gold' : 'text-luxury-slate'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
            <span className="text-luxury-cream/70 text-sm ml-2">({cigar.rating})</span>
          </div>

          {/* Origin and Strength */}
          <div className="flex items-center space-x-4 mb-3 text-sm">
            <div className="flex items-center space-x-1">
              <span className="text-cigar-gold">🌍</span>
              <span className="text-luxury-cream/80">{cigar.origin}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-cigar-gold">🔥</span>
              <span className="text-luxury-cream/80">{cigar.strength}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl font-bold text-cigar-gold">
              <AnimatedPrice price={cigar.price} currency={cigar.currency} />
            </div>
            <div className="text-sm text-luxury-cream/70">
              {cigar.size.shape} • {cigar.size.length}&quot; • {cigar.size.ringGauge} RG
            </div>
          </div>

          {/* Expandable Details */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-2 px-4 bg-luxury-black/30 rounded-lg text-luxury-cream hover:bg-luxury-black/50 transition-all duration-300 flex items-center justify-between"
          >
            <span className="text-sm font-medium">View Details</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-3 pt-4 border-t border-luxury-slate/20">
                  <div>
                    <h4 className="text-luxury-cream font-medium mb-2">Tasting Notes</h4>
                    <div className="flex flex-wrap gap-1">
                      {cigar.tastingNotes.map((note, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-luxury-slate/30 text-luxury-cream/80 rounded text-xs"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-luxury-cream/70">Wrapper:</span>
                      <p className="text-luxury-cream">{cigar.wrapper}</p>
                    </div>
                    <div>
                      <span className="text-luxury-cream/70">Aging:</span>
                      <p className="text-luxury-cream">{cigar.aging} years</p>
                    </div>
                  </div>

                  {cigar.pairings.length > 0 && (
                    <div>
                      <h4 className="text-luxury-cream font-medium mb-2">Perfect Pairings</h4>
                      <div className="flex flex-wrap gap-1">
                        {cigar.pairings.map((pairing, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-cigar-gold/20 text-cigar-gold rounded text-xs"
                          >
                            {pairing}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-luxury-black/90 backdrop-blur-lg rounded-lg text-luxury-cream text-sm whitespace-nowrap z-20 shadow-xl border border-luxury-slate/30"
          >
            <div className="text-cigar-gold font-medium">{cigar.brand} {cigar.name}</div>
            <div className="text-luxury-cream/70">{cigar.origin} • {cigar.strength}</div>
            <div className="text-cigar-gold font-bold">${cigar.price}</div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-luxury-black/90" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Animated Price Component
interface AnimatedPriceProps {
  price: number;
  currency: string;
}

function AnimatedPrice({ price, currency }: AnimatedPriceProps) {
  const [displayPrice, setDisplayPrice] = useState(price);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayPrice(price);
    }, 100);

    return () => clearTimeout(timer);
  }, [price]);

  return (
    <motion.span
      key={displayPrice}
      initial={{ scale: 1.2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {currency} {displayPrice.toLocaleString()}
    </motion.span>
  );
}
