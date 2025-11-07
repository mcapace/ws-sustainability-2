'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from './Container';
import { Button } from './Button';

const navigationItems = [
  { label: 'Home', href: '#home' },
  { label: 'Lounges', href: '#lounges' },
  { label: 'Experience', href: '#experience' },
  { label: 'Events', href: '#events' },
  { label: 'Contact', href: '#contact' }
];

export function GlassNavigation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <div className="backdrop-blur-luxury border-b border-cigar-gold/20">
            <Container>
              <div className="flex items-center justify-between py-4">
                {/* Logo */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-xl font-bold gradient-text text-display"
                >
                  Luxury Cigar Lounges
                </motion.div>

                {/* Navigation Items */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="hidden lg:flex items-center space-x-8"
                >
                  {navigationItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -2 }}
                      className="text-luxury-cream hover:text-cigar-gold transition-colors duration-300 font-medium relative group"
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cigar-gold transition-all duration-300 group-hover:w-full" />
                    </motion.a>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="hidden lg:block"
                >
                  <Button variant="primary" size="sm">
                    Reserve Now
                  </Button>
                </motion.div>

                {/* Mobile Menu Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="lg:hidden text-luxury-cream hover:text-cigar-gold transition-colors duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </motion.button>
              </div>
            </Container>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
