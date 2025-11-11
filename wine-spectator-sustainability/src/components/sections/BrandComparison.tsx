'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Recycle, Waves, Users } from 'lucide-react';
import { gsap } from 'gsap';
import { useGsapTimeline } from '@/lib/animations';
import { MagneticHover } from '@/components/animations/UtilityAnimations';
import { useInteractionAnalytics } from '@/components/providers/AnalyticsProvider';

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
    producers: 'Lallier Champagne · WillaKenzie · Firetree',
  },
];

export function BrandComparison() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const { trackInteraction } = useInteractionAnalytics();

  useGsapTimeline(() => {
    if (!sectionRef.current || cardsRef.current.length === 0) return null;

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', duration: 0.7 },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
    });

    tl.from(headerRef.current, { y: 32, opacity: 0 })
      .from(
        cardsRef.current,
        { y: 48, opacity: 0, stagger: 0.15, rotateY: -6 },
        '-=0.3',
      );

    return tl;
  }, { deps: [] });

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="relative overflow-hidden bg-[#1F4D3B] py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(97,179,133,0.35),transparent_65%)]" />
      <div className="mx-auto max-w-6xl px-6 text-white lg:px-8">
        <motion.h2
          ref={headerRef}
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
              ref={element => {
                if (element) {
                  cardsRef.current[index] = element;
                }
              }}
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
              <MagneticHover>
                <button
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white hover:text-[#1F4D3B]"
                  onClick={() =>
                    trackInteraction('pillar_explore_click', {
                      pillar: pillar.title,
                    })
                  }
                >
                  Explore Pillar
                </button>
              </MagneticHover>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}