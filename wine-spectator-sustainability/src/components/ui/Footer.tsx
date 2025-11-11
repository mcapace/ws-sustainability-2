'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const PRODUCERS = [
  { name: 'Firetree Vineyards', region: 'Napa, California', anchor: '#firetree' },
  { name: 'Gloria Ferrer', region: 'Sonoma, California', anchor: '#gloria-ferrer' },
  { name: 'Lallier Champagne', region: 'Champagne, France', anchor: '#lallier' },
  { name: 'Piccini 1882', region: 'Tuscany, Italy', anchor: '#piccini' },
  { name: 'San Simeon Wines', region: 'Monterey & Paso Robles, California', anchor: '#san-simeon' },
  { name: 'WillaKenzie Estate', region: 'Yamhill, Oregon', anchor: '#willakenzie' },
];

const PRODUCER_LOGOS = [
  { src: '/images/logos/firetree.png', alt: 'Firetree Vineyards logo' },
  { src: '/images/logos/gloria-ferrer.png', alt: 'Gloria Ferrer logo' },
  { src: '/images/logos/lallier.png', alt: 'Lallier Champagne logo' },
  { src: '/images/logos/piccini.png', alt: 'Piccini 1882 logo' },
  { src: '/images/logos/san-simeon.png', alt: 'San Simeon Wines logo' },
  { src: '/images/logos/willakenzie.png', alt: 'WillaKenzie Estate logo' },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0f1b17] text-white" id="footer">
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute -top-40 -left-32 h-80 w-80 rounded-full bg-[#1f3d2b]/50 blur-3xl"
          animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-10rem] right-[-6rem] h-96 w-96 rounded-full bg-[#356447]/40 blur-3xl"
          animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 0.92, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Image
              src="/images/logos/wine-spectator-white.png"
              alt="Wine Spectator"
              width={180}
              height={40}
              className="h-10 w-auto object-contain"
            />
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#9bc5a1]">
              Celebrating Our Partners
            </p>
            <h2 className="text-balance font-serif text-4xl leading-tight text-white">
              Keep sustainability in the spotlight.
            </h2>
            <p className="max-w-xl text-lg text-white/70">
              The Sustainability Collection spotlights six wineries redefining stewardship—from regenerative
              vineyards to coastal resilience. Explore each story below and share them with your audiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-[#9bc5a1]">
              Featured Producers
            </h3>
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              {PRODUCERS.map(producer => (
                <motion.li
                  key={producer.name}
                  whileHover={{ x: 6 }}
                  className="grid grid-cols-[minmax(0,_1fr)_auto] items-center gap-6"
                >
                  <a href={producer.anchor} className="font-medium hover:text-white">
                    {producer.name}
                  </a>
                  <span className="text-xs uppercase tracking-[0.25em] text-white/40 text-right whitespace-nowrap">
                    {producer.region}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 rounded-3xl border border-white/15 bg-white/15 p-6 backdrop-blur-2xl"
        >
          <div className="flex flex-wrap items-center justify-center gap-6 lg:justify-between">
            {PRODUCER_LOGOS.map(logo => (
              <motion.div
                key={logo.src}
                whileHover={{ scale: 1.05, y: -4 }}
                className="relative flex h-16 w-40 items-center justify-center overflow-hidden rounded-2xl bg-white p-3 shadow-[0_25px_55px_-35px_rgba(15,27,23,0.85)] transition"
              >
                <Image src={logo.src} alt={logo.alt} fill className="object-contain" sizes="160px" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mt-20 border-t border-white/10 pt-8 text-center text-xs uppercase tracking-[0.3em] text-white/40">
          © {new Date().getFullYear()} Wine Spectator · Sustainability Collection 2025
        </div>
      </div>
    </footer>
  );
}