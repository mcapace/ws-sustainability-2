'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown, Menu, X } from 'lucide-react';

const PRODUCERS = [
  { label: 'Lallier Champagne', href: '#lallier' },
  { label: 'Firetree Vineyards', href: '#firetree' },
  { label: 'Gloria Ferrer', href: '#gloria-ferrer' },
  { label: 'Piccini 1882', href: '#piccini' },
  { label: 'San Simeon Wines', href: '#san-simeon' },
  { label: 'WillaKenzie Estate', href: '#willakenzie' },
];

const PRIMARY_LINKS = [
  { label: 'Impact', href: '#impact' },
  { label: 'Wineries', href: '#producers' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProducerDropdownOpen, setIsProducerDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const desktopNavBackground = isScrolled
    ? 'bg-[#F6F2E8]/95 backdrop-blur-lg shadow-[0_18px_40px_-30px_rgba(31,77,59,0.45)]'
    : 'bg-gradient-to-b from-[#0f1b17]/95 to-transparent backdrop-blur-lg';
  const linkColor = isScrolled ? 'text-[#1F4D3B]' : 'text-white';
  const hoverColor = isScrolled ? 'hover:text-[#2F6B4C]' : 'hover:text-[#E3C77D]';

  return (
    <>
      <motion.nav
        className={`fixed top-0 z-50 w-full transition-colors duration-300 ${desktopNavBackground}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="bg-[#D86C3B] text-white text-[10px] tracking-[0.55em] uppercase text-center py-2">
          Paid partnership · Wine Spectator Sustainability Showcase
        </div>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          <a
            href="#top"
            className={`flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.35em] ${linkColor}`}
          >
            <Image
              src="/images/logos/wine-spectator-white.png"
              alt="Wine Spectator"
              width={132}
              height={32}
              className={`h-8 w-auto object-contain transition-all ${isScrolled ? 'invert-0 brightness-0 saturate-150' : ''}`}
            />
            <span className="hidden md:inline tracking-[0.4em] text-xs uppercase">Sustainability</span>
          </a>

          <div className="hidden items-center gap-10 lg:flex">
            <div className="relative">
              <button
                className={`flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] ${linkColor} ${hoverColor}`}
                onMouseEnter={() => setIsProducerDropdownOpen(true)}
                onMouseLeave={() => setIsProducerDropdownOpen(false)}
              >
                Producers
                <ChevronDown className="h-4 w-4" />
              </button>

              <AnimatePresence>
                {isProducerDropdownOpen && (
                  <motion.div
                    className="absolute right-0 top-full mt-4 w-64 rounded-lg border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur-sm"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    onMouseEnter={() => setIsProducerDropdownOpen(true)}
                    onMouseLeave={() => setIsProducerDropdownOpen(false)}
                  >
                    <ul className="space-y-2 text-[#1F4D3B]">
                      {PRODUCERS.map(producer => (
                        <li key={producer.label}>
                          <a
                            href={producer.href}
                            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-[#E3C77D]/35 hover:text-[#1F4D3B]"
                          >
                            {producer.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {PRIMARY_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium uppercase tracking-[0.2em] ${linkColor} ${hoverColor}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <motion.button
            className="lg:hidden text-[#1F3D2B]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#F6F2E8]/95 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="mx-auto flex h-full max-w-md flex-col items-center justify-center gap-12 px-8 text-center"
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 32, opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
            >
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2F6B4C]">
                  Producers
                </p>
                <div className="grid gap-4">
                  {PRODUCERS.map(link => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-xl font-semibold text-[#1F4D3B]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2F6B4C]">
                  Navigate
                </p>
                <div className="grid gap-4">
                  {PRIMARY_LINKS.map(link => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-xl font-semibold text-[#1F4D3B]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
