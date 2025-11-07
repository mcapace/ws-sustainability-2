'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section id="top" className="relative flex min-h-[80vh] items-center overflow-hidden bg-[#0f1b17]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/sustainability-collection-hero.jpeg"
          alt="Sunlit vineyard terraces with sustainable farming"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0f1b17]/70 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-24 text-center sm:px-10">
        <motion.span
          className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-[#D8F2D2]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Wine Spectator Sustainability 2025
        </motion.span>

        <motion.h1
          className="max-w-3xl text-balance font-serif text-4xl text-white sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Stewardship in Every Pour
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-balance text-lg text-slate-100/80 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Six wineries across three continents prove that regenerative farming, circular design,
          and community investment can sit at the same table as world-class wine.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <a
            href="#producers"
            className="rounded-full bg-[#B8E4B3] px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#10301f] transition hover:bg-[#CFEEC8]"
          >
            Meet the producers
          </a>
          <a
            href="#impact"
            className="rounded-full border border-white/60 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
          >
            Explore impact metrics
          </a>
        </motion.div>

        <motion.dl
          className="mt-14 grid w-full max-w-4xl grid-cols-2 gap-6 text-left text-white/80 sm:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <div>
            <dt className="text-xs uppercase tracking-[0.3em] text-white/50">Producers</dt>
            <dd className="mt-2 text-3xl font-semibold text-white">6</dd>
            <p className="text-sm text-white/60">Regenerative leaders curated by Wine Spectator.</p>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.3em] text-white/50">Pillars</dt>
            <dd className="mt-2 text-3xl font-semibold text-white">12</dd>
            <p className="text-sm text-white/60">From blue-carbon projects to circular packaging.</p>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.3em] text-white/50">Regions</dt>
            <dd className="mt-2 text-3xl font-semibold text-white">3</dd>
            <p className="text-sm text-white/60">California, Oregon, Tuscany &amp; Champagne.</p>
          </div>
        </motion.dl>
      </div>
    </section>
  );
}
