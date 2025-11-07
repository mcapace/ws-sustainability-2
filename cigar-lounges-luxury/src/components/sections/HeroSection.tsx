'use client';

import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="min-h-[70vh] bg-gradient-to-b from-white to-cream flex items-center">
      <div className="container mx-auto px-8 text-center max-w-6xl">
        
        {/* Subtle animation on load */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm tracking-[0.3em] text-medium-gray uppercase">
            Cigar Aficionado Select
          </span>
        </motion.div>
        
        {/* Large, elegant headline */}
        <motion.h1 
          className="hero-title text-charcoal mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Three Legendary
          <motion.span 
            className="block text-gold italic font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Destinations
          </motion.span>
        </motion.h1>
        
        {/* Refined subtext */}
        <motion.p 
          className="text-xl text-medium-gray max-w-2xl mx-auto mb-16 font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Davidoff's Swiss excellence and Barclay Rex's New York heritage 
          unite to offer unparalleled cigar experiences
        </motion.p>
        
        {/* Clean CTAs */}
        <motion.div 
          className="flex gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button className="btn-luxury-premium luxury-button">
            Explore Collections
          </button>
          <button className="btn-luxury-outline luxury-button">
            Reserve Your Visit
          </button>
        </motion.div>
      </div>
    </section>
  );
}
