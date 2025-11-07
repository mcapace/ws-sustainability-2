'use client';

import { motion } from 'framer-motion';
import { Leaf, Sparkles } from 'lucide-react';
import { venueData } from '@/data/venues';

const LOCATIONS = venueData.brands.flatMap(brand => brand.locations);

export function VenueShowcase() {
  return (
    <section id="producers" className="bg-[#F6F2E8] py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.4em] text-[#2F6B4C]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4 }}
          >
            The 2025 Producer Cohort
          </motion.p>
          <motion.h2
            className="mt-4 text-balance font-serif text-3xl text-[#1F4D3B] sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            Climate-forward leaders curated by Wine Spectator
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-balance text-[#365A47]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            Each winery activates a different pillar of stewardship—from blue-carbon restoration to
            Indigenous-led fire resilience. Explore their stories and dig into the playbooks ready
            for partners, trade, and press.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {LOCATIONS.map((location, index) => (
            <motion.article
              key={location.id}
              className="group relative flex h-full flex-col rounded-3xl border border-[#E4E8E0] bg-white/90 p-8 shadow-[0_28px_80px_-40px_rgba(31,77,59,0.35)] backdrop-blur-xl transition-transform hover:-translate-y-1 hover:shadow-[0_36px_90px_-40px_rgba(31,77,59,0.45)]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#2F6B4C]">
                <Leaf className="h-5 w-5 text-[#E3C77D]" />
                {location.shortName}
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-[#1F4D3B]">{location.name}</h3>
              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[#6F8277]">
                {location.tagline}
              </p>

              <p className="mt-6 flex-1 text-[#365A47]">{location.description}</p>

              {location.features && location.features.length > 0 && (
                <ul className="mt-6 space-y-3 text-sm text-[#1F4D3B]">
                  {location.features.slice(0, 3).map(feature => (
                    <li key={feature} className="flex items-start gap-2">
                      <Sparkles className="mt-1 h-4 w-4 text-[#E3C77D]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={`#${location.id}`}
                  className="inline-flex items-center justify-center rounded-full border border-[#1F4D3B] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#1F4D3B] transition hover:bg-[#1F4D3B] hover:text-[#F6F2E8]"
                >
                  View spotlight
                </a>
                {location.website && (
                  <a
                    href={location.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#D86C3B] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_16px_40px_-24px_rgba(216,108,59,0.55)] transition hover:bg-[#E27D4E]"
                  >
                    Visit winery
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}