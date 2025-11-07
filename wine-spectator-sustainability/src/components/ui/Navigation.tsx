'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';

const PRODUCERS = [
  { label: 'Firetree', href: '#firetree' },
  { label: 'Gloria Ferrer', href: '#gloria-ferrer' },
  { label: 'Champagne Lallier', href: '#lallier' },
  { label: 'Piccini 1882', href: '#piccini' },
  { label: 'San Simeon', href: '#san-simeon' },
  { label: 'WillaKenzie', href: '#willakenzie' },
];

const PRIMARY_LINKS = [
  { label: 'Impact', href: '#impact' },
  { label: 'Activation', href: '#activation' },
  { label: 'Media Kit', href: '#media' },
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

  const desktopNavBackground = isScrolled ? 'bg-white/85 backdrop-blur-md shadow-sm' : 'bg-transparent';

  return (
    <>
      <motion.nav
        className={`fixed top-0 z-50 w-full transition-colors duration-300 ${desktopNavBackground}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          <a
            href="#top"
            className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.4em] text-[#1F3D2B]"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#B8E4B3] text-[#10301f]">
              WS
            </span>
            Sustainability
          </a>

          <div className="hidden items-center gap-10 lg:flex">
            <div className="relative">
              <button
                className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[#1F3D2B] hover:text-[#356447]"
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
                    <ul className="space-y-2 text-[#10301f]">
                      {PRODUCERS.map(producer => (
                        <li key={producer.label}>
                          <a
                            href={producer.href}
                            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-[#B8E4B3]/40 hover:text-[#10301f]"
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
                className="text-sm font-medium uppercase tracking-[0.2em] text-[#1F3D2B] hover:text-[#356447]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <a
              href="#download"
              className="rounded-full bg-[#10301f] px-6 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#B8E4B3] transition hover:bg-[#16472f]"
            >
              Download Deck
            </a>
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
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-lg lg:hidden"
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
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#356447]">
                  Producers
                </p>
                <div className="grid gap-4">
                  {PRODUCERS.map(link => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-xl font-semibold text-[#132C24]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#356447]">
                  Campaign
                </p>
                <div className="grid gap-4">
                  {PRIMARY_LINKS.map(link => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-xl font-semibold text-[#132C24]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <a
                href="#download"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-full bg-[#10301f] px-8 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#B8E4B3]"
              >
                Download Deck
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
