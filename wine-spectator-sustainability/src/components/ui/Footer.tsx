'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { VenueLocation } from '@/data/venues';

const PRODUCERS = [
  { name: 'Firetree Vineyards', region: 'Napa, California', anchor: '#firetree' },
  { name: 'Gloria Ferrer', region: 'Sonoma, California', anchor: '#gloria-ferrer' },
  { name: 'Lallier Champagne', region: 'Champagne, France', anchor: '#lallier' },
  { name: 'Piccini 1882', region: 'Tuscany, Italy', anchor: '#piccini' },
  { name: 'San Simeon Wines', region: 'Central Coast, California', anchor: '#san-simeon' },
  { name: 'WillaKenzie Estate', region: 'Yamhill, Oregon', anchor: '#willakenzie' },
];

interface FooterProps {
  locations?: VenueLocation[];
}

export function Footer({ locations }: FooterProps = {}) {
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
                  className="flex items-center justify-between gap-6"
                >
                  <a href={producer.anchor} className="font-medium hover:text-white flex-shrink-0">
                    {producer.name}
                  </a>
                  <span className="text-xs uppercase tracking-[0.25em] text-white/40 whitespace-nowrap flex-shrink-0">
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
          className="mt-16 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-2xl"
        >
          <div className="flex flex-nowrap items-center justify-center gap-3 overflow-x-auto lg:justify-between lg:overflow-visible">
            {(locations || []).map(location => (
              <motion.a
                key={location.id}
                href={location.website}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -4 }}
                className="relative flex h-10 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/75 p-1.5 shadow-[0_25px_55px_-35px_rgba(15,27,23,0.85)] transition"
              >
                {location.logo && (
                  <Image
                    src={location.logo}
                    alt={`${location.name} logo`}
                    fill
                    className="object-contain object-center p-1"
                    sizes="80px"
                    unoptimized={true}
                  />
                )}
              </motion.a>
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