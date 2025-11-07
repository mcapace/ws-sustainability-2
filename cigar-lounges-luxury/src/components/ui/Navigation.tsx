'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDavidoffDropdownOpen, setIsDavidoffDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav 
        className={`
          fixed top-0 w-full z-50 transition-all duration-300
          ${isScrolled 
            ? 'bg-white/95 backdrop-blur-sm border-b border-light-gray' 
            : 'bg-transparent'
          }
        `}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-8 py-6 flex items-center justify-between">
          
          {/* Left: CA Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-charcoal">Cigar Aficionado</span>
          </div>
          
          {/* Center: Clean venue navigation */}
          <div className="flex items-center gap-12">
            <div className="relative group">
              <button 
                className="flex items-center gap-2 text-charcoal hover:text-gold transition"
                onMouseEnter={() => setIsDavidoffDropdownOpen(true)}
                onMouseLeave={() => setIsDavidoffDropdownOpen(false)}
              >
                Davidoff
                <ChevronDown className="w-4 h-4" />
              </button>
              {/* Dropdown for 2 locations */}
              <AnimatePresence>
                {isDavidoffDropdownOpen && (
                  <motion.div 
                    className="absolute top-full left-0 mt-2 bg-white shadow-lg p-4 min-w-[200px]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setIsDavidoffDropdownOpen(true)}
                    onMouseLeave={() => setIsDavidoffDropdownOpen(false)}
                  >
                    <a href="#davidoff-madison" className="block py-2 hover:text-gold transition">Madison Avenue</a>
                    <a href="#davidoff-sixth" className="block py-2 hover:text-gold transition">6th Avenue</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <a href="#barclay-rex" className="text-charcoal hover:text-gold transition">
              Barclay Rex
            </a>
          </div>
          
          {/* Right: Single CTA */}
          <button className="btn-luxury-premium">
            Reserve Experience
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Button */}
      <motion.button
        className="lg:hidden text-charcoal fixed top-6 right-6 z-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        whileTap={{ scale: 0.95 }}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-white/95 backdrop-blur-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              className="relative h-full flex flex-col justify-center items-center text-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="space-y-12">
                
                {/* Navigation Links */}
                <div className="space-y-8">
                  <a 
                    href="#davidoff-madison" 
                    className="block text-2xl text-charcoal hover:text-gold transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Davidoff
                  </a>
                  <a 
                    href="#barclay-rex" 
                    className="block text-2xl text-charcoal hover:text-gold transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Barclay Rex
                  </a>
                </div>

                {/* Reserve CTA */}
                <motion.button
                  className="btn-luxury-premium px-8 py-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reserve Experience
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
