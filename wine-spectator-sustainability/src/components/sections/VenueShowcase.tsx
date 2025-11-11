'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Leaf, Globe, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import type { VenueLocation } from '@/data/venues';
import { gsap } from 'gsap';
import { useGsapTimeline } from '@/lib/animations';
import { MagneticHover } from '@/components/animations/UtilityAnimations';
import { useInteractionAnalytics } from '@/components/providers/AnalyticsProvider';

const SOCIAL_ICON_MAP = {
  website: Globe,
  instagram: Instagram,
  facebook: Facebook,
  x: Twitter,
  youtube: Youtube,
} as const;

interface VenueShowcaseProps {
  locations: VenueLocation[];
}

export function VenueShowcase({ locations }: VenueShowcaseProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const { trackInteraction } = useInteractionAnalytics();

  useGsapTimeline(() => {
    if (!sectionRef.current || cardsRef.current.length === 0) return null;

    const timeline = gsap.timeline({
      defaults: { ease: 'power3.out', duration: 0.7 },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
      },
    });

    timeline.fromTo(
      cardsRef.current,
      { y: 48, opacity: 0, rotateX: -6 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.12,
        immediateRender: false,
      },
    );

    return timeline;
  }, { deps: [locations] });

  return (
    <section
      ref={sectionRef}
      id="producers"
      className="relative overflow-hidden bg-[#F6F2E8] py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(227,199,125,0.22),transparent_60%)]" />
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.4em] text-[#2F6B4C]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4 }}
          >
            The 2025 Producers
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

        <div className="relative mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {locations.map((location, index) => {
            const logoWidth = 200 * (location.logoScale ?? 1);
            return (
              <motion.article
                key={location.id}
                className="group relative flex h-full flex-col rounded-3xl border border-[#E4E8E0] bg-white/90 p-8 shadow-[0_28px_80px_-40px_rgba(31,77,59,0.35)] backdrop-blur-xl transition-transform hover:-translate-y-1 hover:shadow-[0_36px_90px_-40px_rgba(31,77,59,0.45)]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                ref={element => {
                  if (element) {
                    cardsRef.current[index] = element;
                  }
                }}
              >
                <div className="relative mb-6 flex flex-col items-center gap-5 rounded-2xl bg-gradient-to-b from-[#F6F2E8] via-white to-[#F6F2E8] pb-8 pt-8 shadow-[inset_0_-1px_0_rgba(227,199,125,0.25)]">
                  {location.logo ? (
                    <div className="relative h-16" style={{ width: logoWidth }}>
                      <Image
                        src={location.logo}
                        alt={`${location.shortName} logo`}
                        fill
                        className="object-contain"
                        sizes="200px"
                      />
                    </div>
                  ) : (
                    <Leaf className="h-6 w-6 text-[#E3C77D]" />
                  )}
                  {location.images.bottle && (
                    <div className="relative flex h-64 w-full items-end justify-center">
                      <div className="relative h-full w-[170px] sm:w-[200px]">
                        <Image
                          src={location.images.bottle}
                          alt={`${location.shortName} hero bottle`}
                          fill
                          className="object-contain drop-shadow-[0_30px_40px_rgba(20,48,36,0.2)]"
                          sizes="(min-width: 1280px) 200px, (min-width: 768px) 180px, 160px"
                          priority={index < 2}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-[#1F4D3B]">{location.name}</h3>
                <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[#6F8277]">
                  {location.tagline}
                </p>

                <p className="mt-6 flex-1 text-[#365A47]">
                  {location.cardIntro}
                </p>

                {location.socials && (
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    {Object.entries(location.socials).map(([key, href]) => {
                      if (!href) return null;
                      const Icon = SOCIAL_ICON_MAP[key as keyof typeof SOCIAL_ICON_MAP];
                      if (!Icon) return null;
                      return (
                        <a
                          key={key}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1F4D3B]/30 text-[#1F4D3B] transition hover:border-[#1F4D3B] hover:text-[#D86C3B]"
                          aria-label={key === 'x' ? 'X' : key.charAt(0).toUpperCase() + key.slice(1)}
                        >
                          <Icon className="h-4 w-4" />
                        </a>
                      );
                    })}
                  </div>
                )}

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <MagneticHover>
                    <a
                      href={`#${location.id}`}
                      className="inline-flex items-center justify-center rounded-full border border-[#1F4D3B] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#1F4D3B] transition hover:bg-[#1F4D3B] hover:text-[#F6F2E8]"
                      onClick={() =>
                        trackInteraction('showcase_cta_click', {
                          cta: 'spotlight',
                          locationId: location.id,
                        })
                      }
                    >
                      View spotlight
                    </a>
                  </MagneticHover>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}