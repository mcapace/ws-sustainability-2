'use client';

import { motion } from 'framer-motion';
import { Recycle, Waves, Users } from 'lucide-react';

const PILLARS = [
  {
    icon: Recycle,
    title: 'Regenerative Agriculture',
    description:
      'Soil-first farming, agroforestry, carbon-smart barrels, and vineyard design that captures more than it emits.',
    producers: 'Firetree · Piccini · WillaKenzie',
  },
  {
    icon: Waves,
    title: 'Blue & Coastal Stewardship',
    description:
      'Wind-powered wineries, desalination offsets with kelp reefs, and fog harvesting that protects marine ecosystems.',
    producers: 'Gloria Ferrer · San Simeon',
  },
  {
    icon: Users,
    title: 'Community & Equity',
    description:
      'Indigenous fire councils, inclusive fellowships, and circular economies that reinvest in people and place.',
    producers: 'Champagne Lallier · WillaKenzie · Firetree',
  },
];

export function BrandComparison() {
  return (
    <section id="impact" className="bg-[#1F4D3B] py-24">
      <div className="mx-auto max-w-6xl px-6 text-white lg:px-8">
        <motion.h2
          className="text-center text-balance font-serif text-4xl sm:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          Three pillars, one shared playbook
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-2xl text-center text-base text-white/70"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Wine Spectator’s sustainability cohort shows how regenerative farming, coastal
          stewardship, and community equity compound. Choose a pillar to find stories, metrics, and
          assets tailored to your audience.
        </motion.p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {PILLARS.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              className="relative rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-lg transition hover:bg-white/15"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E3C77D]/25 text-[#E3C77D]">
                <pillar.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold">{pillar.title}</h3>
              <p className="mt-4 text-sm text-white/70">{pillar.description}</p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-[#B8E4B3]">
                Spotlight Producers
              </p>
              <p className="mt-2 text-sm text-white/80">{pillar.producers}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}