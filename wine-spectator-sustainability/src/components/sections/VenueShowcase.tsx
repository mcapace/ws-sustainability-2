'use client';

import { motion } from 'framer-motion';
import { Leaf, Sparkles } from 'lucide-react';
import { venueData } from '@/data/venues';

const LOCATIONS = venueData.brands.flatMap(brand => brand.locations);

export function VenueShowcase() {
  return (
    <section id="producers" className="bg-[#F4F6F3] py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.4em] text-[#356447]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4 }}
          >
            The 2025 Producer Cohort
          </motion.p>
          <motion.h2
            className="mt-4 text-balance font-serif text-3xl text-[#132C24] sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            Climate-forward leaders curated by Wine Spectator
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-balance text-slate-600"
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
              className="group relative flex h-full flex-col rounded-2xl border border-[#DDE5DC] bg-white p-8 shadow-[0_20px_60px_-40px_rgba(15,49,31,0.45)] transition-transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#356447]">
                <Leaf className="h-5 w-5 text-[#B8E4B3]" />
                {location.shortName}
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-[#132C24]">{location.name}</h3>
              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[#6E8A7E]">
                {location.tagline}
              </p>

              <p className="mt-6 flex-1 text-slate-600">{location.description}</p>

              <ul className="mt-6 space-y-3 text-sm text-[#10301f]">
                {location.features.slice(0, 3).map(feature => (
                  <li key={feature} className="flex items-start gap-2">
                    <Sparkles className="mt-1 h-4 w-4 text-[#B8E4B3]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-[#6E8A7E]">
                <span>{location.neighborhood}</span>
                <span>{location.address}</span>
              </div>

              <a
                href={`#${location.id}`}
                className="mt-8 inline-flex items-center justify-center rounded-full border border-[#10301f] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#10301f] transition hover:bg-[#10301f] hover:text-[#B8E4B3]"
              >
                View spotlight
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}